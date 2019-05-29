<template>
    <b-container fluid>
        <b-row>
            <div id="star-rating" v-if="isRatingAllowed() == null">
                <img class="star" src="../../assets/star.png" @click="addRatingToUser(5)" />
                <img class="star" src="../../assets/star.png" @click="addRatingToUser(4)" />
                <img class="star" src="../../assets/star.png" @click="addRatingToUser(3)" />
                <img class="star" src="../../assets/star.png" @click="addRatingToUser(2)" />
                <img class="star" src="../../assets/star.png" @click="addRatingToUser(1)" />
            </div>
            <div id="star-rating-rated" v-if="isRatingAllowed() != null">
                <h3>You rated {{isRatingAllowed()}} stars</h3>
                <img class="star" src="../../assets/star.png" :class="{'rated' : isRatingAllowed() == 5}" />
                <img class="star" src="../../assets/star.png" :class="{'rated' : isRatingAllowed() == 4}" />
                <img class="star" src="../../assets/star.png" :class="{'rated' : isRatingAllowed() == 3}" />
                <img class="star" src="../../assets/star.png" :class="{'rated' : isRatingAllowed() == 2}" />
                <img class="star" src="../../assets/star.png" :class="{'rated' : isRatingAllowed() == 1}" />
            </div>
        </b-row>
    </b-container>
</template>


<script>
import * as settings from '../../settings'
import store from '../../repositories/profiles'
import contractStore from '../../repositories/contracts'

export default {
    name: 'rating',
    props: ['contract'],
    data: function(){ 
        return {
            profile: null
        }
    },
    mounted: function(){
        if(settings.getCurrentUser().uid == this.contract.uid){
            store.get(this.contract.winningBid.uid).then(profile => {
                    this.profile = profile
                })
            console.log("from " +  settings.getCurrentUser().uid + " to " + this.contract.winningBid.uid)
        } else if(settings.getCurrentUser().uid == this.contract.winningBid.uid){
            store.get(this.contract.uid).then(profile => {
                    this.profile = profile
                })
            console.log("from " +  settings.getCurrentUser().uid + " to " + this.contract.uid)
        }
        console.log(this.contract)
    },
    methods: {
        addRatingToUser(numberRating){
            if(numberRating >=0 && numberRating <= 5){
                
                this.profile.totalRating += numberRating
                this.profile.numberOfRatings += 1
                this.profile.averageRating = this.profile.totalRating / this.profile.numberOfRatings

                store.update(this.profile.uid, this.profile).then(error => {
                if(error){
                    console.log(error)
                } else {
                    console.log("Contract updated/created with uid: " + this.profile.uid)
                    
                    this.$emit('rating-complete')
                }

                if(settings.getCurrentUser().uid == this.contract.uid){
                    this.contract.contractorHasRated = numberRating
                } else if(settings.getCurrentUser().uid == this.contract.winningBid.uid){
                    this.contract.employeeHasRated = numberRating
                }

                contractStore.update(this.contract.id, this.contract).then(error => {
                if(error){
                    console.log(error)
                } else {
                    console.log("Contract updated/created")
                }
                })
                
            })
            }
        },
        isRatingAllowed(){
            console.log("contracter rating: " + this.contract.contractorHasRated)
            console.log("employee rating: " + this.contract.employeeHasRated)
            if(settings.getCurrentUser().uid == this.contract.uid){
                return this.contract.contractorHasRated
            } else if(settings.getCurrentUser().uid == this.contract.winningBid.uid  ){
                return this.contract.employeeHasRated
            }
        }
        
    }
}
</script>

<style scoped>
img.star {
    cursor:pointer;
    filter:grayscale(100%);
    -webkit-transition: filter 500ms;
    -moz-transition: filter 500ms;
    transition: filter 500ms;
}
#star-rating {
    unicode-bidi: bidi-override;
    direction: rtl;
}
#star-rating img:hover,
#star-rating img:hover ~ img {
    filter:none;
}

#star-rating-rated {
    unicode-bidi: bidi-override;
    direction: rtl;
}
#star-rating-rated img.rated,
#star-rating-rated img.rated ~ img {
    filter:none;
}

</style>