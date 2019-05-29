<template>
    <b-container fluid>
        <contract-list-componet>
        </contract-list-componet>
    </b-container>
</template>

<script>
import * as settings from '../../settings'
import contractListComponet from './contract-list'
export default {
    name : 'contracts-component',
    data : function(){
        return {
            profile:null
        }
    },
    monuted : function() {},
    components: {
        contractListComponet
    }, 
    methods : {}
}
</script>

<style>

</style>
