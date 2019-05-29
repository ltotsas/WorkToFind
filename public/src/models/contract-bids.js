//@ts-check
import Bid from './bid'
import Contract from './contract'
/**
 * An index linking contract with bids
 * Index are built a little differnetly from the other types Consider the following;
*/

/** root : {
 *      contracts : {
 *          1234: {
 *              description:"John Doe",
 *              uid:1234
 *          }
 *      },
 *      bids : {
 *          43231 : {
 *              by : "jane doe",
 *              id:43231,
 *              value: "123"
 *          },
 *          54322 : {
 *              by : "john doe",
 *              id:54322,
 *              value: "233"
 *          }
 *      },
 *      contractBids: {
 *          1234: {             <-- Index by ContractID
 *              43231 : true    <-- A Bid id
 *              54322 : true    <-- Another Bid ID
 *          }
 *      }
 * }
*/

 /**
  * we cant have the ids nested inside the doc, therefore we are required to add it and retrive it for saving later.
  * ie. always remember to provide the id for a bid
*/
export default class ProfileBids {
    /**
     * 
     * @param {string} contractId The user/owner id is very required
     * @param {Object<string,boolean>} bids An object of booleans witch is the actual content of the child
     */
    constructor(
        contractId,
        bids={}
    ){
        if(!contractId){
            console.warn("do not init indexes with out contractId")
        }
        this._contractId = contractId

        this.bids = bids
    }

    get contractId(){
        return this._contractId
    }

    set contractId(v){
        this._contractId = v
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
     * @param {string} contractId contract id must be provided 
     * @param {Object} fb 
     */
    static fromFirebase(contractId, fb){
        return new this(contractId, fb)
    }

}