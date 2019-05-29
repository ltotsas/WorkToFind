<template>
<div>
    <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
              <b-nav-item to="/contracts">List of contracts</b-nav-item>
              <b-nav-item to="/new-contract" v-if="profile && profile.type == 'CONTRACTOR'">Add contract</b-nav-item>
            </b-navbar-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

            <b-nav-item-dropdown right>
                <!-- Using button-content slot -->
                <template slot="button-content">
                <em>{{this.user.displayName}}</em>
                </template>
                <b-dropdown-item :to="'/profile/'+ this.user.uid">Profile</b-dropdown-item>
                <b-dropdown-item v-on:click="logout()">Signout</b-dropdown-item>
            </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <div id="main-content">
        <b-container fluid>
          <b-row style="margin:2em 0; margin-right:0">
            <notification-component></notification-component>
                <b-col cols="8" offset-md="2">
                    <router-view v-if="profile && !profile.isPristine()">
                    </router-view>
                    <template v-if="profile && profile.isPristine()">
                        <h2>Please update your profile to carry on</h2>
                        <profile-form-component :profile="profile" 
                                                @updated="updatedProfile">
                        </profile-form-component>
                    </template>
                </b-col>
          </b-row>
        </b-container>
      </div>
</div>
</template>

<script>
import * as settings from "./../settings";
import ProfileStore from "../repositories/profiles";
import ProfileFormComponent from "./profile/profile-form";
import NotificationComponent from './notifications';

export default {
  name : "app-container-component",
  components : {
    ProfileFormComponent,
    NotificationComponent
    },
  props : ["user"],
  data : function() {
    return {
      profile : null
    };
  },
  mounted : function() {
    let _this = this;
    ProfileStore.get(this.user.uid).then(profile => {
      /** Trying to make sure that we are fed the latest profile on first login */
      if (profile == null) {
        ProfileStore.watchOnce(_this.user.uid).then(profile => {
          _this.profile = profile;
        });
      }
      _this.profile = profile;
    });
  },
  methods: {
    profileCallback(profile) {},
    updatedProfile(profile) {
      this.profile = profile;
      this.$set(this.profile, profile);
    },
    logout() {
      settings.logOut();
      window.location.replace("/");
    }
  }
};
</script>

<style>
  #main-content {
    margin-right: 0px;
  }
</style>
