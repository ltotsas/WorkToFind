<template>
    <b-container fluid v-if="model">
        <b-row>
            <b-col>
                <form>
                    <b-form-group
                    id="label"
                    description="Name/Label/ID of your contract"
                    label="Name">
                        <b-form-input id="label_input" v-model="model.label" type="text"></b-form-input>
                    </b-form-group>
                    <b-form-group
                    id="fieldset1"
                    description="Describe the contract."
                    label="Describe the contract">
                        <b-form-textarea id="textarea1"
                            v-model="model.description"
                            placeholder="Describe the contract here..."
                            :rows="3"
                            :max-rows="6">
                        </b-form-textarea>
                    </b-form-group>
                    <b-form-group
                    id="fieldset2"
                    description="Estimated number of hours to complete contract."
                    label="Number of hours">
                        <b-form-input id="input2" v-model.number="model.hours" type="number" ></b-form-input>
                    </b-form-group>
                    <b-form-group
                    id="maxprice"
                    description="Max Price pr hour, the bidding starts here"
                    label="Max Price pr hour">
                        <b-form-input id="maxprice_input" v-model.number="model.maxPrice" type="number"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group
                    id="date"
                    description="Date of contract"
                    label="Date">
                        <b-form-input id="date_input" v-model="model.date" type="date"></b-form-input>
                    </b-form-group>

                    <b-button @click='submitContract' variant="primary">Submit</b-button>
                    <b-button @click='resetBid' variant="primary">Reset Bid</b-button>
                </form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Contract from '../../models/contract'
import * as helpers from '../../helpers'
import * as settings from '../../settings'
import store from '../../repositories/contracts'

export default {
    name: 'contract-form',
    props: ["contract"],
    data : function() {
        return {
            model : null
        }
    },
    mounted: function(){
        if( this.contract){
            this.model = this.contract
        } else {
            this.model = new Contract(helpers.uuidv4(), settings.getCurrentUser().uid)
        }
    },
    methods: {
        submitContract(){
            if(this.model.nextBid == null){
                this.model.nextBid = this.model.maxPrice
            }
            store.update(this.model.id, this.model).then(error => {
                if(error){
                    console.log(error)
                } else {
                    this.$router.push('/contracts')
                }
            })
        },
        resetBid(){
            this.model.nextBid = this.model.maxPrice
        }
    }
}
</script>

<style>

</style>
