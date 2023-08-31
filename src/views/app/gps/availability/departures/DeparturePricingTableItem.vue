<template>

<div>

  <!-- info tarifa -->
  <b-row>
    <b-col cols="8">


      <span class="d-block ">
        <strong>{{rate.catName}}</strong>
      </span>
      <span class="text-muted d-block"><small>Base Rack {{ baseRack | currency('USD', 2, { spaceBetweenAmountAndSymbol: true }) }} </small></span>


    </b-col>

    <b-col cols="4" class="text-right">
      <div>
          <h4><strong><span>{{ currentRate | currency('$', 2, { spaceBetweenAmountAndSymbol: true }) }}</span></strong></h4>
      </div>
    </b-col>
  </b-row>
  <!-- comisión cliente -->
  <b-row  v-if="discount > 0">
    <b-col cols="8">
      <div class="d-inline">
      <div class="d-flex flex-column">
        <div>
          <span><small>COMISIÓN {{ discountPercent | percent }}</small></span>
        </div>
        <div>
          <span><strong>USD {{ discountAmount }}</strong></span>
        </div>
      </div>
      </div>

    </b-col>
    <b-col cols="4" class="text-right">
      <small>Net Rate</small>
      <h6><span>{{ netRate | currency('$', 2, { spaceBetweenAmountAndSymbol: true }) }}</span></h6>
    </b-col>
  </b-row>


</div>

</template>

<script>

export default {

  name: 'DeparturePricingTableItem',

  props: ['rate', 'discount'],

  data() {
    return {

    }
  },

  computed: {

    baseRack() {

     return this.rate.acaBaseRate ?? this.rate.offGrossRate

    },

    currentRate() {

      return this.rate.ratePromo ?? this.rate.offNetRate

    },

    discountPercent() {

      return this.discount / 100

    },

    discountAmount(){

      return (this.currentRate * this.discount / 100).toFixed(2)

    },

    netRate() {

      return ( this.currentRate - this.discountAmount ).toFixed(2)

    }


  },

  mounted() {

  },

  created() {

  },

}

</script>

<style scoped>

</style>
