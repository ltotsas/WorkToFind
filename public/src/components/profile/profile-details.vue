<template>
    <b-container fluid v-if="profile">
        <b-row>
            <b-col cols="8">
        <b-card no-body>
        <b-img slot="header"rounded="circle" center v-if="profile.photoURL" :src=profile.photoURL width="100" height="100" blank-color="#777" alt="img" class="m-1" />
        <b-img slot="header"rounded="circle" center v-else  src="http://www.freeiconspng.com/uploads/profile-icon-9.png" width="100" height="100" blank-color="#777" alt="img" class="m-1" />
        <b-list-group flush>
            <b-list-group-item>Name : {{profile.displayName}}</b-list-group-item>
            <b-list-group-item>Profile Type : {{profile.type}}</b-list-group-item>
            <b-list-group-item v-if="profile.state">Current State : {{profile.state}}</b-list-group-item>
        </b-list-group>
        <b-card-body v-if="profile.numberOfRatings">
            <b-row class="text-center">
                <b-col>Number Of Ratings : {{profile.numberOfRatings}}</b-col>
                <b-col>Average Rating : {{profile.averageRating}}</b-col>
            </b-row>
        </b-card-body>
        <b-card-footer>
            <a v-if="canEdit" @click="toggleEdit"
               class="card-link">Edit</a>
            </b-card-footer>
        </b-card>
        <b-row v-if="edits">
            <profile-form :profile="profile" @updated="toggleEdit"></profile-form>
        </b-row>
            </b-col>
            <b-col cols="4" class="text-center">
                <contracts-widget :id="id"></contracts-widget>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ProfileStore from '../../repositories/profiles'
import * as settings from '../../settings'
import store from '../../repositories/profiles'
import ProfileForm from './profile-form.vue'
import ContractsWidget from '../contract/contract-short-list-info'

export default {
    name : 'profile-details-component',
    props : ['id'],
    components : {
        ProfileForm,
        ContractsWidget
    },
    data : function() {
        return {
            profile : null,
            edits : false,      
        }
    },
    mounted : function(){
        ProfileStore.get(this.id).then( profile => {
            this.profile = profile
        })
    },
    computed : {
        canEdit(){
            return this.profile.uid == settings.getCurrentUser().uid
        }
    }, 
    methods : {
        toggleEdit(){
            this.edits = !this.edits
        },
        submitProfile(){
            store.update(this.profile.id, this.profile).then(error => {
                if(error){
                    console.log(error)
                } else {
                    console.log("Profile updated/created")
                    this.edits = !this.edits
                }
            })
        },
        updatedProfile(profile) {
            console.log("skata", profile)
        }
    } 
}
</script>

<style scoped>
     div.card-footer > a {
        color: blue;
        cursor: pointer;
    }
</style>
