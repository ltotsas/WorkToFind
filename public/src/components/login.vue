<template>
  <b-container fluid>
      <b-row>
          <b-col>
            <div id="firebaseui-auth-container">
            </div>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
import * as firebase from 'firebase'
import firebaseui from 'firebaseui'
import * as FirebaseProvider from '../settings'
import Profile from '../models/profile'
import ProfileStore from '../repositories/profiles'

export default {
    name : 'login-component',
    data : function() {
        return {
        }
    },
    mounted() {
        let firebaseApp = FirebaseProvider.getFirebase()
        let _this = this
        let uiConfig = {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            signInFlow : "popup",
            callbacks : {
                signInSuccess : (currentUser, credential, redirectUrl) => {
                    firebaseui.auth.AuthUI(firebaseApp.auth()).delete()
                }
            }
        }
        if(this.$root.ui != null){
            this.$root.ui.reset()
        } else {
            this.$root.ui = new firebaseui.auth.AuthUI(firebaseApp.auth());
        }
        this.$root.ui.start('#firebaseui-auth-container', uiConfig);
    },
    methods : {
    }
}
</script>

<style>

</style>
