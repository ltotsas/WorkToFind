//@ts-check
const functions = require('firebase-functions');
const admin = require('firebase-admin');

/** Firebase DB init */
admin.initializeApp(functions.config().firebase);


exports.createProfileInDB = functions.auth.user().onCreate(event => {
    let profile = {}
    profile.uid = event.data.uid
    profile.displayName = event.data.displayName
    profile.photoURL = event.data.photoURL
    return admin.database().ref("profiles").child(profile.uid).set(profile,(error) => {
        if(error){
            console.log(error)
        } else {
            console.log("User created", profile.displayName)
        }
    })
});

exports.reactToNewBid = functions.database.ref('bids/{bidId}').onWrite(event => {
    let bidId = event.params.bidId

    let contractId = event.data.val().contractId
    let uid = event.data.val().profile.uid
    let model = {}
    model[bidId] = true
    console.log("got bid", model, bidId)
    return admin.database().ref("contractBidsIndex").child(contractId).update(model, function(error){
        if(error){
            console.error("got error contract bids", error)
        } 
        return admin.database().ref("profileBidsIndex").child(uid).update(model, function(error) {
            if(error){
                console.error("got error profile bids", error)
            }
        })
    })
})