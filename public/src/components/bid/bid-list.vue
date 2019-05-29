<template>
    <div>
        <b-list-group v-if="bidList">
            <b-list-group-item v-for="bid in bidList" :key="bid.id" class="list-group-item-action">
                <b-row>
                    <b-col>
                        {{bid.value}} - by 
                        <span v-if="bid.profile"> 
                            <router-link :to="'/profile/' + bid.profile.uid">
                            {{bid.profile.displayName}} 
                            </router-link>
                        </span>
                    </b-col>
                    <b-col v-if="addSelect && profile && profile.uid == contractId">
                        <b-button @click="select(bid)" variant="primary">Select Winning Bid</b-button>
                    </b-col>
                </b-row>
            </b-list-group-item>
        </b-list-group>
        <b-list-group v-if="error">
            <b-list-group-item>
                {{error}}
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import ContractBidsStore from '../../repositories/contract-bids'
import ProfileBidsStore from '../../repositories/profile-bids'
import BidsStore from '../../repositories/bids'
import Profiles from '../../repositories/profiles'
import * as Settings from '../../settings'

export default {
    name : 'bid-list-component',
    props : ['contractId', 'profileId', 'addSelect'],
    data : function(){
        return {
            bidList : [],
            error : null,
            profile: null
        }
    },
    mounted : function(){
        Profiles.get(Settings.getCurrentUser().uid).then( profile => {
			this.profile = profile
        })
        
        if(this.contractId && this.profileId){
            console.error("only profile id or contract id not both", "using the contract id")
        }

        ContractBidsStore.get(this.contractId).then(idList => {
            if(idList.bids){
                for(let id in idList.bids){
                    this.fetchBid(id)
                }
            } else {
                this.error = "No bids found for contract"
            }
        })
    },
    methods : {
        fetchBid(id){
            BidsStore.get(id).then(bid => {
                this.bidList.unshift(bid)
            })
        },
        select(bid){
            this.$emit('select', bid)
        }
    }
}
</script>

<style>

</style>
