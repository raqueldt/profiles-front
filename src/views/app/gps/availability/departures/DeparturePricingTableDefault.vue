<template>

  <div>


    <!-- comision  -->
    <b-row class="mt-3 mb-5">
      <b-col cols="2" >
        <label for="discount-percent">Comisión</label>
      </b-col>
      <b-col>
      <vue-slider
        ref="discount-percent"
        v-model="discountPercent"
        :min="0"
        :max="40"
        :marks="discountMarks"
        :tooltip="'active'"
      ></vue-slider>
      </b-col>
    </b-row>

    <!-- 2022-08-26 | fg | vista condensada -->
    <b-row class="mb-3">
      <b-col>
        <b-list-group>
          <b-list-group-item
            v-for="rate in rates" :key="rate.offId"
            class="flex-column align-items-start"
          >

            <departure-pricing-table-item
              :rate="rate"
              :discount="discountPercent"
            />

          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>

    <!-- cards -->
    <b-row v-if="false" >
      <b-col v-for="rate in rates" :key="rate.offId">

        <departure-pricing-card-default
          :rate="rate"
          :discount="discountPercent"
        />
      </b-col>
    </b-row>



  </div>

</template>

<script>

import VueSlider from "vue-slider-component"
import "vue-slider-component/theme/antd.css"


export default {

  name: 'DeparturePricingTableDefault',

  props: ['rates', 'price'],

  components: {

    "vue-slider": VueSlider,
    DeparturePricingCardDefault: () => import('@/views/app/gps/availability/departures/DeparturePricingCardDefault'),
    DeparturePricingTableItem: () => import('@/views/app/gps/availability/departures/DeparturePricingTableItem'),

  },

  data() {
    return {
      discountPercent: 0,
      discountMarks: [15, 20, 25, 30, 35]
    }
  },

  computed: {


  },

  async created() {


  }





}
</script>
