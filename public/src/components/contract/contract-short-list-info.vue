<template>
    <b-container fluid>
        <b-row v-if="profile && profile.type == 'CONTRACTOR'">
            <b-col>
                <h3>My Contracts</h3>
                <b-list-group >
                    <b-list-group-item v-for="contract in contractList" :key="contract.id">
                        <router-link :to="'/contracts/' + contract.id">{{contract.label}}</router-link>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
        <b-row v-if="profile && profile.type == 'EMPLOYEE'">
            <b-col>
                <h3>Bid list</h3>
                <b-list-group>
                    <b-list-group-item v-if="ready" v-for="contract in employeeContractList" :key="contract.id">
                        <p>{{ contract.label }}
                            <img src="../../assets/check.png" v-if="contract.winningBid && contract.winningBid.uid == profile.uid"/>
                        </p>
                        <h6> Bids : </h6>
                        <span v-for="bid in contract.bids" :key="bid.id">
                            {{bid.value}} ->
                        </span>
                        </br>
                        <router-link :to="'/contracts/' + contract.id">Go to Contract</router-link>
                    </b-list-group-item> 
                </b-list-group>
            </b-col>
        </b-row>
    </b-container>
</template>
  
<script>
import ContractStore from '../../repositories/contracts'
import ProfileBidsStore from '../../repositories/profile-bids'
import store from '../../repositories/contracts'
import Profiles from '../../repositories/profiles'
import * as Settings from '../../settings'
import BidsStore from '../../repositories/bids'

export default {
    name: 'contract-short-info-component',
    props : ['id'],
    component : {

    },
    data : function() {
        return {
            contractList : [],
            bidList : [],
            employeeContractList : [],
            profile : null,
            ready : false
        }
    },
    mounted : function() {
        Profiles.get(Settings.getCurrentUser().uid).then( profile => {
			this.profile = profile
		})
        ContractStore.getByUID(this.id).then ( contractList => {
            this.contractList = contractList;
        })
        
        ProfileBidsStore.get(Settings.getCurrentUser().uid).then(idList => {
            if(idList.bids){
                for(let id in idList.bids){
                    this.fetchBid(id)
                }
                this.ready = true
            } else {
                this.error = "No bids found for contract"
            }
        })
    },
    methods: {
        fetchBid(id){
            BidsStore.get(id).then(bid => {
                ContractStore.get(bid.contractId).then(contract => {
                    if(contract){
                        this.addContractToList(contract, bid)
                    }
                    console.log(this.employeeContractList)
                })
            })
        },
        getContractByBid(bid){
            ContractStore.get(bid.contractId).then( contract => {
                console.log(contract)
            })
        },
        test(bid){
            ContractStore.get(bid.contractId).then( contract => {
                this.contractList[contract.id] = contract
            })
        },
        addContractToList(contract, bid){
            let found = false
            for (const c of this.employeeContractList) {
                if(c.id == bid.contractId){
                    c.bids.unshift(bid)
                    found = true
                }
            }
            if(!found){
                contract.bids = []
                contract.bids.unshift(bid)
                this.employeeContractList.unshift(contract)
            }
        }
    }
  
}
</script>

<style>

</style>
