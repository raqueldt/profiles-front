<template>


    <b-card class="text-center" style="background: #f3f3f3;">

      <b-badge variant="light">{{ rate.priName }}</b-badge>
      <span><h4><strong>{{ rate.catName }}</strong></h4></span>
      <span class="text-muted"><small>Base Rack</small></span>
      <span class="text-muted"><small>{{ rate.offGrossRate | currency('$', 2, { spaceBetweenAmountAndSymbol: true }) }}</small></span>


      <hr class="mt-0">


      <span>Current Rack</span><br>
      <h1><strong><span style="font-size: 25px;">{{ rate.offNetRate | currency('$', 2, { spaceBetweenAmountAndSymbol: true }) }}</span></strong></h1>

      <hr class="mt-0">

      <p>
        <span><small>COMISIÓN</small></span>
        <span><strong>{{ discountPercent | percent }}</strong></span><br>
        <b-badge class="mb-1" variant="dark">{{ discountAmount | currency('$', 2, { spaceBetweenAmountAndSymbol: true }) }}</b-badge>
      </p>


      <span>Net Rate</span>
      <h4>{{ netRate | currency('$', 2, { spaceBetweenAmountAndSymbol: true }) }}</h4>



    </b-card>





</template>

<script>

import VueSlider from "vue-slider-component"
import "vue-slider-component/theme/antd.css"


export default {

  name: 'DeparturePricingCardDefault',

  props: ['rate', 'discount'],

  components: {
    "vue-slider": VueSlider,
  },

  data() {

    return {
    }

  },

  computed: {

    discountPercent() {

      return this.discount / 100

    },

    discountAmount(){

      return (this.rate.offNetRate * this.discount / 100).toFixed(2)

    },

    netRate() {

      return (this.rate.offNetRate - this.discountAmount).toFixed(2)

    }


  }






}

</script>
