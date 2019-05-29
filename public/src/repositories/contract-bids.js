import BaseRepository from "./base";
import ContractBidsModel from '../models/contract-bids'
//@ts-check

/** This is an index repository */

const KEY = "contractBidsIndex"

class ContractBids extends BaseRepository {
    constructor(){
        super(KEY)
    }

    get(contractId){
        if(!contractId){
            return this.unwrapList(super.getReference(contractId).once("value"))
        }
        return this.unwrap(super.getReference(contractId).once("value"))
    }

    /**
     * 
     * @param {Promise<any>} promise 
     * @returns {Promise<ContractBidsModel>} 
     */
    unwrap(promise){
        return promise.then(snap => {
            if(snap.exists()){
                return ContractBidsModel.fromFirebase(snap.key, snap.val())
            }
        })
    }

    /**
     * 
     * @param {Promise<any>} promise 
     * @returns {Promise<Array<ContractBidsModel>>} 
     */
    unwrapList(promise){
        return promise.then(snaps => {
            let list = new Array()
            snaps.forEach(snap => {
                if(snap.exists()){
                    list.push(ContractBidsModel.fromFirebase(snap.key, snap.val()))
                }
            })
            return list
        })
    }

    update(contractId, bidId){
        if(contractId == null){
            throw "We require a contract id update the index"
        }
        if(bidId == null){
            throw "We require a contract id update the index"
        }
    }
}

const instance = new ContractBids

Object.freeze(instance)

export default instance