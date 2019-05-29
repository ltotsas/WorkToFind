import BaseRepository from "./base";
import ProfileBidsModel from '../models/profile-bids'
//@ts-check

/** This is an index repository */

const KEY = "profileBidsIndex"

class ProfileBids extends BaseRepository {
    constructor(){
        super(KEY)
    }

    get(profileId){
        if(!profileId){
            return this.unwrapList(super.getReference(profileId).once("value"))
        }
        return this.unwrap(super.getReference(profileId).once("value"))
    }

    /**
     * 
     * @param {Promise<any>} promise 
     * @returns {Promise<ProfileBidsModel>} 
     */
    unwrap(promise){
        return promise.then(snap => {
            if(snap.exists()){
                return ProfileBidsModel.fromFirebase(snap.key, snap.val())
            }
        })
    }

    /**
     * 
     * @param {Promise<any>} promise 
     * @returns {Promise<Array<ProfileBidsModel>>} 
     */
    unwrapList(promise){
        return promise.then(snaps => {
            let list = new Array()
            snaps.forEach(snap => {
                if(snap.exists()){
                    list.push(ProfileBidsModel.fromFirebase(snap.key, snap.val()))
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

const instance = new ProfileBids

Object.freeze(instance)

export default instance