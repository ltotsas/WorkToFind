import BaseRepository from "./base";
import Contract from "../models/contract";

//@ts-check

const KEY = "contracts"

class Contracts extends BaseRepository {
    constructor(){
        super(KEY)
    }

    /**
     * Get without id, returns all with ID returns just the one
     * @param {string} id The ID of the profile you want
     * @returns {Promise<Contract>} the promise, make sure to handle errors
     */
    get(id=null){
        if(!id){
            return this.unwrapList(super.getReference().orderByChild("date").limitToLast(5).once('value'))
        }
        return this.unwrap(super.getReference(id).once('value'))
    }

    getByUID(id) {
        return this.unwrapList(super.getReference().orderByChild("uid").equalTo(id).once("value"));
    }

    Subscribe(cb, id = null, type="value"){
        return super.getReference(id).on(type, (snap, prevChildKey) => { cb(snap, prevChildKey) })
    }

    SubscribeToBids(cb, id, type="child_added"){
        return super.getReference(id).child("bids").on(type, (snap, prevChildKey) => { cb(snap, prevChildKey) })
    }

    SubscribeToNotifications(callback){
       super.getReference().on("child_changed", function(snapshot) {
            snapshot.ref.child("winningBid").on("child_added", function (winnerSnapshot) {
                let addedWinner = winnerSnapshot.val();
                let contract = snapshot.val();
                callback(addedWinner, contract);
            });
        });
    }

    /**
     * 
     * @param {Promise<any>} promise 
     * @returns {Promise<Contract>} 
     */
    unwrap(promise){
        return promise.then(snap => {
            if(snap.exists()){
                return Contract.fromFirebase(snap.val())
            }
        })
    }

    /**
     * 
     * @param {Promise<any>} promise 
     * @returns {Promise<Array<Contract>>} 
     */
    unwrapList(promise){
        return promise.then(snaps => {
            let list = new Array()
            snaps.forEach(snap => {
                if(snap.exists()){
                    list.push(Contract.fromFirebase(snap.val()))
                }
            })
            return list
        })
    }


    /**
     * Updates given value at existing location
     * @param {string} id
     * @param {Contract} entity
     * @returns {Promise<any>}
     */
    update(id, entity){
        entity.updateTime = Date.now()
        this.removeEmpty(entity)
        if(!id || id == ''){
            throw("No id when updating contracts are not allowed")
        }
        return this.getReference(id).update(entity)
    }
}


const instance = new Contracts

Object.freeze(instance)

export default instance