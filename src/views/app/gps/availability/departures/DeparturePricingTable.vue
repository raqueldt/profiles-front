<template>

  <div>

    <!-- header promotion -->
    <b-row class="mb-3">

      <b-col lg="4" class="pr-0">

        <span class="text-muted"><small>Tarifa aplicada</small></span><br>
        <b-badge variant="success">{{ promotion.priName}}</b-badge>

        <span v-if="promotion.dprPercent">
          <small>
            <strong>{{ formatValue(promotion.dprPercent) }}%</strong>
            <b-icon
              v-if="promotion.dprPercent < 0"
              icon="arrow-down-circle-fill"
              variant="warning"
            />
          </small>
        </span>

        <span v-if="promotion.dprAmount">
          <small>
            <strong><small>USD </small>{{ formatValue(promotion.dprAmount) }}</strong>
            <b-icon
              v-if="promotion.dprAmount < 0"
              icon="arrow-down-circle-fill"
              variant="warning"
            />
          </small>
        </span>


      </b-col>

      <b-col lg="5">

        <span class="text-muted"><small>Referencia</small></span><br>
        <small>{{ promotion.rseReference }}</small>

      </b-col>



      <b-col lg="3">

        <span class="text-muted"><small>Vigencia</small></span><br>
        <span><small>{{ promotion.rseDateFrom }} to {{ promotion.rseDateTo }}</small></span>
        <!--span><small>{{ formatDatePromotion(promotion) }}</small></span-->

      </b-col>


    </b-row>

    <!-- comision -->
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

    <!-- 2022-08-15 | fg | vista condensada -->
    <b-row class="mb-3">
      <b-col>
        <b-list-group>
          <b-list-group-item
            v-for="rate in ratesItems" :key="rate.offId"
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
    <b-row v-if="false">

      <b-col v-for="rate in ratesItems" :key="rate.offId">
        <departure-pricing-card
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
import { getDayHumanized, resolveFormatNumber } from '@/utils/common.js'

export default {

  name: 'DeparturePricingTable',

  props: ['promotion'],

  components: {

    "vue-slider": VueSlider,
    DeparturePricingCard: () => import('@/views/app/gps/availability/departures/DeparturePricingCard'),
    DeparturePricingTableItem: () => import('@/views/app/gps/availability/departures/DeparturePricingTableItem'),


  },

  data() {
    return {
      discountPercent: 0,
      discountMarks: [15, 20, 25, 30, 35]
    }
  },

  computed: {

    promoSettings () {
      return {
        percent : this.promotion.dprPercent,
        amount: this.promotion.dprAmount
      }
    },

    ratesItems () {


      return this.promotion.rates.map( function (rate) {

        const { percent, amount } = this.settings

        let ratePromo = parseFloat(rate.offNetRate)

        // existe promocion como porcentaje
        if ( percent ) {

          const promoValue = parseFloat(rate.offNetRate) * percent / 100

          ratePromo = parseFloat(rate.offNetRate) + promoValue

        }

        // existe promocion como monto
        if ( amount ) {

          ratePromo = parseFloat(rate.offNetRate) + parseFloat(amount)

        }

        return Object.assign( rate , { ratePromo })

      }, { settings: this.promoSettings})

    }


  },

  methods: {

    formatValue( value ){

      return resolveFormatNumber(value)

    },

    formatDatePromotion( promotion ){

      return getDayHumanized(new Date(), promotion.rseDateFrom , promotion.rseDateTo)

    }
  },

  async created() {



  }





}
</script>
