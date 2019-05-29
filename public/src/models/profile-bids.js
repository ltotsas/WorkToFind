//@ts-check
import Bid from './bid'
/**
 * An index linking profiles with bids
 * Index are built a little differnetly from the other types Consider the following;
*/

/** root : {
 *      profiles : {
 *          1234: {
 *              name:"John Doe",
 *              uid:1234
 *          }
 *      },
 *      bids : {
 *          43231 : {
 *              name:"Brilliant case",
 *              id:43231,
 *              value: "123"
 *          },
 *          54322 : {
 *              name:"Another case, and tabs are bad in comments",
 *              id:54322,
 *              value: "233"
 *          }
 *      },
 *      profileBids: {
 *          1234: {             <-- Index by UID
 *              43231 : true    <-- A Bid id
 *              54322 : true    <-- Another Bid ID
 *          }
 *      }
 * }
*/

 /**
  * we cant have the uids nested inside the doc, therefore we are required to add it and retrive it for saving later.
  * ie. always remember to provide the UID for a bid
*/
export default class ProfileBids {
    /**
     * 
     * @param {string} uid The user/owner id is very required
     * @param {Object<string,boolean>} bids An object of booleans witch is the actual content of the child
     */
    constructor(
        uid,
        bids={}
    ){
        if(!uid){
            console.warn("do not init indexes with out id")
        }
        this._uid = uid

        this.bids = bids
    }

    get uid(){
        return this._uid
    }

    set uid(v){
        this._uid = v
    }

    /**
     * adds the id to the list of profile bids
     * @param {string} v 
     */
    add(v){
        this.bids[v] = true
        return this
    }

    /**
     * adds the id (from the provided bid) to the list of bids
     * @param {Bid} v 
     */
    addObject(v){
        this.bids[v.id] = true
        return this
    }

    /**
     * removes the bid from the list, ie removing the index
     * @param {string} v 
     */
    remove(v){
        delete this.bids[v]
        return this
    }

    /**
     * removes the bid from the list, ie removing the index
     * @param {Bid} v 
     */
    removeObject(v){
        delete this.bids[v.id]
        return this
    }

    /**
     * Test if any bids are present
     * @returns boolean 
     */
    hasCases(){
        return Object.keys(this.bids).length > 0
    }
    

    /**
     * 
     * @param {string} uid user id must be provided 
     * @param {Object} fb 
     */
    static fromFirebase(uid, fb){
        return new this(uid, fb)
    }

}