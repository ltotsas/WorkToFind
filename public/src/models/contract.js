//@ts-check
import Bid from './bid'

export default class Contract {
    /**
     * 
     * @param {*} id 
     * @param {*} uid 
     * @param {*} description 
     * @param {*} employee 
     * @param {*} hours 
     * @param {*} updateTime 
     * @param {*} deleteTime 
     * @param {*} maxPrice 
     * @param {*} nextBid 
     * @param {*} label 
     * @param {*} contractorHasRated
     * @param {*} employeeHasRated
     * @param {Bid} currentBid
     * @param {Bid} winningBid
     * @param {Object<string, boolean>} completedBy
     */
    constructor(id,
        uid, 
        description = '',
        employee = null,
        hours = 0,
        updateTime = null,
        deleteTime = null,
        maxPrice = 0,
        nextBid = null,
        label = null,
        currentBid = null,
        winningBid = null,
        contractorHasRated = null,
        employeeHasRated = null,
        completedBy = {}){
            
            if(id == null){
                throw "Contract initialized with no id"
            }
            if(uid == null){
                throw "Contract initialized with no uid"
            }
            this.id = id
            this.uid = uid
            this.employee = employee
            this.hours = hours
            this.maxPrice = maxPrice
            this.nextBid = nextBid
            this.label = label
            this.currentBid = currentBid
            this.contractorHasRated = contractorHasRated
            this.employeeHasRated = employeeHasRated
            this.updateTime = updateTime
            this.deleteTime = deleteTime
            
            this.winningBid = winningBid

            this.completedBy = completedBy
    }

    static fromFirebase(fb){
        let entity = new Contract(fb.id, fb.uid)
        for(var key in fb){
            if(fb.hasOwnProperty(key)){
                if(key == 'bids'){
                    /** Do nothing */
                } else if( key == 'currentBid' ){
                    entity[key] == Bid.fromFirebase(fb[key])
                } else if( key == 'winningBid' ){
                    entity[key] == Bid.fromFirebase(fb[key])
                }
                entity[key] = fb[key]
            }
        }
        return entity
    }

    isPristine(){
        return this.updateTime == null
    }

    /**
     * 
     * @param {Bid} bid 
     */
    pushBid(bid){
        this.currentBid = bid;
        
        return this
    }
    
    canComplete(uid){
        if(this.winningBid == null){
            return false;
        }
        return this.uid == uid || this.winningBid.profile.uid == uid
    }

    hasCompleted(uid){
        return this.canComplete(uid) && this.completedBy[uid]
    }

    doComplete(uid){
        if(!this.hasCompleted(uid)){
            this.completedBy[uid] = true
        }
    }
    /** Dump test by now */
    isComplete(){
        return Object.keys(this.completedBy).length > 1
    }
}