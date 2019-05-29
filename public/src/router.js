//@ts-check
import VueRouter from 'vue-router'

import contractContainer from './components/contract/contract-container.vue'
import contractDetailComponent from './components/contract/contract-details.vue'
import contractEditComponent from './components/contract/contract-form.vue'
import contractListComponent from './components/contract/contract-list.vue'
import contractFormComponent from './components/contract/contract-form.vue'
import profileDetailsComponent from './components/profile/profile-details.vue'

const routes = [
    {path : '/contracts/:id', name: 'contract-view', component : contractDetailComponent, props : true},
    {path : '/contracts/:id/edit', component : contractEditComponent, props : true},
    {path : '/contracts', component : contractListComponent, props : true},
    {path : '/new-contract', component : contractFormComponent, props : true},
    {path : '/profile/:id', name : 'profile-view', component : profileDetailsComponent, props : true},
    {path : '*', component : contractContainer}
]

export default new VueRouter({mode:"history", routes})