<template>
    <b-container fluid v-if="contract" v-bind:class="{ updated: isUpdated }">
        <b-row v-if="!edits" class="my-2">
            <b-col>
                <b-card no-body>
                    <b-card-body slot="header">
                        <b-row>
                            <b-col>
                                <h4>Contract</h4>
                                {{contract.label}}
                            </b-col>
                            <b-col v-if="isAllowedToComplete()">
                                <b-button
                                variant="primary" 
                                v-if="!isCompleted() && !hasCompleted()"
                                @click="doComplete()">Complete</b-button>
                                <p v-if="!hasCompleted() && !isCompleted()">Confirm that the contract has been completed</p>
                                <p v-if="hasCompleted() && !isCompleted()">Waiting for the other peer to complete this contract</p>
                                <p v-if="isCompleted()">This contract is completed</p>
                                <rating-form :contract="contract" v-if="isCompleted()" ></rating-form> 
                            </b-col>
                        </b-row>
                    </b-card-body>
                    <b-list-group flush>
                        <b-list-group-item>Description: {{contract.description}}</b-list-group-item>
                        <b-list-group-item>Number of hours: {{contract.hours}}</b-list-group-item>
                        <b-list-group-item>Max price : {{contract.maxPrice}}</b-list-group-item>
                        <b-list-group-item>Current bid : <span v-if="contract.currentBid">{{contract.currentBid.value}}</span></b-list-group-item>
                        <b-list-group-item>Bid By : <span v-if="contract.currentBid && contract.currentBid.profile">{{contract.currentBid.profile.displayName}}</span></b-list-group-item>                    
                    </b-list-group>
                    <b-card-footer v-if="canEdit">
                        <a @click="toggleEdit"
                        class="card-link" style="cursor:default">Edit</a>
                    </b-card-footer>
                </b-card>
            </b-col>
        </b-row>
        
        <b-row v-if="edits" class="my-2">
            <contract-form :contract="contract"></contract-form>
        </b-row>

        <b-row v-if="contract.currentBid" class="current-bid my-2" v-show="!contract.winningBid">
            <b-col>
                <b-card title="Current Bid" :subTitle="getSub(contract.currentBid)">
                <b-row>
                    <b-col>
                        <span>By: </span>
                        <h4 style="display:inline-block">
                            <router-link :to="'/profile/' + contract.currentBid.profile.uid">
                                {{contract.currentBid.profile.displayName}}
                            </router-link>
                        </h4>
                    </b-col>
                    <b-col v-if="profile && profile.uid == contract.uid">
                        <b-button
                        @click="selectWinningBid(contract.currentBid)"
                        variant="primary">Select Winning Bid</b-button>
                    </b-col>
                </b-row>
                </b-card>
            </b-col>
        </b-row>

        <b-row class="my-2" v-show="!contract.winningBid">
            <b-col>
                <bid-list-component :contractId="id" 
                                    :addSelect="true" 
                                    @select="selectWinningBid">
                </bid-list-component>
            </b-col>
        </b-row>

        <b-row class="winnig-bid my-2" v-if="contract.winningBid">
            <b-col>
                <b-card title="Winning Bid" :subTitle="getSub(contract.winningBid)">
                <b-row>
                    <b-col>
                        <span>By: </span>
                        <h4 style="display:inline-block">
                            <router-link :to="'/profile/' + contract.winningBid.profile.uid">
                                {{contract.winningBid.profile.displayName}}
                            </router-link>
                        </h4>
                    </b-col>
                </b-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ContractStore from '../../repositories/contracts'
import BidStore from '../../repositories/bids'
import Profiles from '../../repositories/profiles'
import * as settings from '../../settings'
import store from '../../repositories/contracts'
import ContractForm from './contract-form.vue'
import Bid, {STATES} from '../../models/bid'
import BidListComponent from '../bid/bid-list'
import ratingForm from '../profile/rating'

export default {
    name : 'contract-details-component',
    props : ['id'],
    components : {
        ContractForm,
        BidListComponent,
        ratingForm
    },
    data : function() {
        return {
            contract : null,
            edits : false,
            isUpdated : false,
            profile: null,
            profileName : {}     
        }
    },
    mounted : function(){
        Profiles.get(settings.getCurrentUser().uid).then( profile => {
			this.profile = profile
		})
        if(!this.id){
            console.error("You not welcome here")
        }
        ContractStore.get(this.id).then( contract => {
            console.info(contract)
            this.contract = contract
        })
		ContractStore.Subscribe( (snap, prevChildKey) => {
			this.updateContract(snap)
        }, this.id, "child_changed")
    },
    computed : {
        canEdit(){
            return this.contract.uid == settings.getCurrentUser().uid
        }
    }, 
    methods : {
        toggleEdit(){
            this.edits = !this.edits
        },
        submitContract(){
            store.update(this.contract.id, this.contract).then(error => {
                if(error){
                    console.log(error)
                } else {
                    console.log("Contract updated/created")
                    this.edits = !this.edits
                }
            })
        },
        updateContract(snap){
            if(snap.key == "currentBid"){
                let b = Bid.fromFirebase(snap.val())
                this.contract.currentBid = b

                this.isUpdated = true
                let _this = this
                setTimeout(function(){
                    _this.isUpdated = false;
                }, 2000);
            }
        },
        getSub(bid){
            if(bid && bid.value){
                return 'Value ' + bid.value
            }
            return 'Not yet placed'
        },
        selectWinningBid(bid){
            if(bid.uid == this.contract.uid){
                alert("No way Jose")
                return;
            }
            bid.state = STATES.WINNING
            this.contract.winningBid = bid
            ContractStore.update(this.contract.id, this.contract)
            BidStore.update(bid.id, bid)
        },
        isAllowedToComplete(){
            return this.contract.canComplete(settings.getCurrentUser().uid)
        },
        doComplete(){
           this.contract.doComplete(settings.getCurrentUser().uid)
           ContractStore.update(this.contract.id, this.contract)
        },
        isCompleted(){
            return this.contract.isComplete()
        },
        hasCompleted(){
            return this.contract.hasCompleted(settings.getCurrentUser().uid)
        }
    } 
}
</script>

<style scoped>
    div.container-fluid .current-bid .card {
        background-color: rgba(0,0,0,0);
        -webkit-transition: background-color 200ms;
        -moz-transition: background-color 200ms;
        transition: background-color 200ms;
    }
    div.container-fluid.updated .current-bid .card {
        background-color: rgba(255,0,0,0.2);
        -webkit-transition: background-color 200ms;
        -moz-transition: background-color 200ms;
        transition: background-color 200ms;
    }
</style>
