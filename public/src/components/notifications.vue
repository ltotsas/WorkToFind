<template>
  
</template>

<script>
import ContractStore from '../repositories/contracts'
import * as Settings from '../settings'
import Contract from '../models/contract'

export default {
    name : 'notification-component',
    data : function (){
        return {
            fireTimes : 0,
        }
    },
    mounted : function (){
        ContractStore.SubscribeToNotifications( (addedWinner,contract) =>{
            this.fireNotification(addedWinner, contract,  this.fireTimes += 1)
        })
    },
    methods : {
        fireNotification(addedWinner, contract, fireTimes){
            if (addedWinner != null && fireTimes == 1 && contract.completedBy == null) {
                // if (Settings.getCurrentUser().uid == addedWinner) {
                    console.log("selection")
                    let text = `<a href="/profile/${contract.uid}">The Employer</a> selected your bidding <br>`
                    this.show("success", "success", text, contract)
                // }
            }
            if (contract.completedBy != null && fireTimes == 1){
                console.log("complettion")
                let completedContracts = Object.keys(contract.completedBy)
                for ( let index in  completedContracts) {
                    // if (Settings.getCurrentUser().uid == completedContracts[index]) {
                        let text = `<a href="/profile/${contract.uid}">The Employer</a> marked the task as completed <br>`
                        this.show("success", "success", text, contract)
                    // }
                }
            }
        },
        show (group, type = '', mytext, contract) {
            let title = `<a href="/contracts/${contract.id}">${contract.label}</a> `
            let now = new Date()
            let text = `${mytext} ${now}`
            this.$notify({ group, title , duration:-1, text ,type})
        }
    }
}
</script>