//@ts-check
import firebase from 'firebase'

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "worktofind-49ccf",
    storageBucket: "worktofind-49ccf.appspot.com",
    messagingSenderId: "992421744328"
};

export function getFirebase(){
    if (firebase.apps.length === 0) {
        firebase.initializeApp(config)
    }
    return firebase
}

export function getCurrentUser() {
    return getFirebase().auth().currentUser
}

export function logOut() {
    firebase.auth().signOut()
}
