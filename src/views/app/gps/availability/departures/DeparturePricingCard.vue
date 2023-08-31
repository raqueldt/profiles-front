<template>


  <b-card class="text-center" style="background: #f3f3f3;">

    <span><h4><strong>{{ rate.catName }}</strong></h4></span>
    <span class="text-muted"><small>Base Rack</small></span>
    <span class="text-muted">{{ rate.acaBaseRate | currency }}</span>


    <hr class="mt-0">

    <span>Current Rack</span><br>
    <h1><strong><span style="font-size: 25px;">{{ rate.ratePromo | currency('$', 2, { spaceBetweenAmountAndSymbol: true }) }}</span></strong></h1>


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

export default {

  name: 'DeparturePricingCard',

  props: ['rate', 'discount'],

  computed: {

    discountPercent() {

      return this.discount / 100

    },

    discountAmount(){

      return (this.rate.ratePromo * this.discount / 100).toFixed(2)

    },

    netRate() {

      return (this.rate.ratePromo - this.discountAmount).toFixed(2)

    }


  }






}

</script>
