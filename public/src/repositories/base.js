//@ts-check
import firebase from 'firebase'

import * as settings from '../settings'

export default class BaseRepository {
    constructor(key){
        this.key = key
        this._dbRef = settings.getFirebase().database().ref()
    }

    /**
     * Returns a specific reference,
     * Be advised that this should not be called directly
     * @param {string} id 
     * @returns {firebase.database.Reference} Unwrap the reference yourself or modify it and pass it to the Repository
     */
    getReference(id=null){
        let addr = id ? this.key + "/" + id : this.key
        return this._dbRef.child(addr)
    }

    /** Traverse removal, useful in dogdy saves as firebase does not allow null properties */
    removeEmpty(obj){
        Object.keys(obj).forEach(key => {
          if (obj[key] && typeof obj[key] === 'object'){ 
              this.removeEmpty(obj[key]);
          }
          else if (obj[key] == null){
            delete obj[key];
          } 
        });
        return obj;
    };
}