import BaseRepository from "./base";
import Bid from "../models/bid";

//@ts-check
const KEY = "bids"

class Bids extends BaseRepository {
    constructor(){
        super(KEY)
    }

    /**
     * Get without id, returns all with ID returns just the one
     * @param {string} id The ID of the profile you want
     * @returns {Promise<Bid>} the promise, make sure to handle errors
     */
    get(id=null){
        if(!id){
            return this.unwrapList(super.getReference().once('value'))
        }
        return this.unwrap(super.getReference(id).once('value'))
    }

    /**
     * 
     * @param {Promise<any>} promise 
     * @returns {Promise<Bid>} 
     */
    unwrap(promise){
        return promise.then(snap => {
            if(snap.exists()){
                return Bid.fromFirebase(snap.val())
            }
        })
    }

    /**
     * 
     * @param {Promise<any>} promise 
     * @returns {Promise<Array<Bid>>} 
     */
    unwrapList(promise){
        return promise.then(snaps => {
            let list = new Array()
            snaps.forEach(snap => {
                if(snap.exists()){
                    list.push(Bid.fromFirebase(snap.val()))
                }
            })
            return list
        })
    }


    /**
     * Updates given value at existing location
     * @param {string} id
     * @param {Bid} entity
     * @returns {Promise<any>}
     */
    update(id, entity){
        this.removeEmpty(entity)
        entity.updateTime = Date.now()
        if(!id || id == ''){
            throw("No id when updating Bids are not allowed")
        }
        return this.getReference(id).update(entity)
    }
}


const instance = new Bids

Object.freeze(instance)

export default instance