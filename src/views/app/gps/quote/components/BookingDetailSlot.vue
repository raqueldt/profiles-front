<template>

    <div>
        <div class="d-flex w-100 justify-content-between">
          <span><strong><b-badge variant="light">{{ slotBooking.avsTag }}</b-badge> {{ slotBooking.cabCode }}</strong></span>
          
          <b-badge pill  variant="light">
            <span style="font-size: 12px;">{{ slotBooking.bosNetRate | currency}}</span>
          </b-badge>
          
        </div>

        <small class="text-muted">{{  slotBooking.catName }}</small>

 
    </div>

</template>

<script>

import { mapActions, mapMutations, mapGetters } from 'vuex'


export default {

  name: 'ItineraryCruiseCustomizeRateSlot',

  props: ['slot-booking'],

  data() {

    return {

      isEditMode: false,
      isBusy: false,

      slot: {
        bosId: null,
        bosNetRate: null
      }


    }

  },

  methods: {

    ...mapActions('booking-price', ['updateSlotRate']),

    ...mapMutations('booking-price', ['setEditMode']),

    slotInit() {

      this.slot.bosId = this.slotBooking.bosId
      this.slot.bosNetRate = this.slotBooking.bosNetRate

    },

   


  },

  created() {




  },

  mounted() {

  }



}

</script>
