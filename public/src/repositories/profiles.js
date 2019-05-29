import BaseRepository from "./base";
import Profile from '../models/profile';

//@ts-check

const KEY = "profiles"

class Profiles extends BaseRepository {
    constructor(){
        super(KEY)
    }

    /**
     * Get without id, returns all with ID returns just the one
     * @param {string} id The ID of the profile you want
     * @returns {Promise<Profile>} the promise, make sure to handle errors
     */
    get(uid=null){
        if(!uid){
            return this.unwrapList(super.getReference().once('value'))
        }
        return this.unwrap(super.getReference(uid).once('value'))
    }

    /**
     * Get without id, returns all with ID returns just the one
     * @param {string} id The ID of the profile you want
     * @returns {Promise<Profile>} the promise, make sure to handle errors
     */
    watchOnce(id=null){
        if(!id){
            return this.unwrapList(super.getReference().once('child_added'))
        }
        return this.unwrap(super.getReference(id).once('child_added'))
    }
    
    /**
     * 
     * @param {Promise<any>} promise 
     * @returns {Promise<Profile>} 
     */
    unwrap(promise){
        return promise.then(snap => {
            if(snap.exists()){
                return Profile.fromFirebase(snap.val())
            }
        })
    }

    /**
     * Updates given value at existing location
     * @param {string} propertyId
     * @param {Profile} entity
     * @returns {Promise<any>}
     */
    update(uid, entity){
        entity.updateTime = Date.now()
        this.removeEmpty(entity)
        if(!uid || uid == ''){
            throw("No uid when updating profiles are not allowed")
        }
        return this.getReference(uid).update(entity)
    }
}


const instance = new Profiles

Object.freeze(instance)

export default instance