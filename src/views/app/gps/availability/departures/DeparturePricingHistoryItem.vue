<template>

  <div>

    <div class="d-flex w-100 justify-content-between">
      <div>
        <small><strong>{{ pricing.rseReference }}</strong></small>
        <small><span class="text-muted"> by {{ pricing.userName }}</span></small>
      </div>

      <!--small class="text-muted"><strong>{{ pricing.rseDateFrom }} to {{ pricing.rseDateTo }}</strong></small-->
      <small class="text-muted"><strong>{{ formatDatePromotion( pricing ) }}</strong></small>


    </div>

    <div class="d-flex w-100 justify-content-between">

      <div>

        <b-badge variant="light">{{ pricing.priName }}</b-badge>

        <template v-if="pricing.dprAmount">
          <span>
            <small>USD {{formatValue(pricing.dprAmount)}}</small>
            <b-icon
              v-if="pricing.dprAmount > 0"
              icon="arrow-up-circle-fill"
              variant="danger"
            />
            <b-icon
              v-else
              icon="arrow-down-circle-fill"
              variant="warning"
            />
          </span>
        </template>

        <template v-if="pricing.dprPercent">
          <span><small>{{formatValue(pricing.dprPercent)}}%</small></span>
          <b-icon
            v-if="pricing.dprPercent > 0"
            icon="arrow-up-circle-fill"
            variant="danger"
          />
          <b-icon
            v-if="pricing.dprPercent < 0"
            icon="arrow-down-circle-fill"
            variant="warning"
          />
        </template>

      </div>

      <div>

        <template v-if="activePromotion">
          <b-badge
            variant="success"
            v-if="pricing.rseId == activePromotion.rseId"
          >
          IN USE
          </b-badge>
        </template>

        <!--b-badge variant="info">{{ pricing.nameStatus }}</b-badge-->
        <span class="ml-2"><small :class="resolveFormatText"><strong>{{ pricing.nameStatus }}</strong></small></span>
        <b-button
          v-if="showControlOptions"
          variant="outline-light"
          squared
          size="sm"
          @click="handleOptions"
          :disabled="isFormMode"
          class="p-1 border-0"
        >
          <b-icon
            :icon="resolveIconOption"
            variant="secondary"
            font-scale="0.90"
            class="mx-1"
          />
        </b-button>

      </div>

    </div>

    <!-- opciones de la promocion -->
    <b-row class="my-2" v-if="showOptions">
      <b-col>
        <b-button block variant="warning" size="sm" @click="handleExtend">Extender</b-button>
      </b-col>
      <b-col>
        <b-button block variant="danger" size="sm" @click="handleFinish">Finalizar</b-button>
      </b-col>
    </b-row>

    <!-- extender promocion -->
    <b-row v-if="isExtendMode" class="my-2 px-4">
      <!-- user message/controls -->
      <b-col cols="12">
        <b-alert show variant="warning" class="p-2 mb-1">
          La promoción vence en <strong>{{ pricing.rseDateTo }}</strong>. La nueva fecha de vencimiento debe ser anterior a la fecha de salida <strong>{{ pricing.rseDepartureStart }}</strong>
          <b-form-input
            id="date-to"
            type="date"
            v-model="selectedDate"
            class="mt-1 scoped-custom-width"
          />
          <span v-if="errors" class="text-danger"><small>{{ errors }} </small></span>

        </b-alert>
      </b-col>
      <!-- action buttons -->
      <b-col cols="12" class="text-right">
        <b-button
          variant="secondary"
          size="sm"
          @click="handleDiscard"
          :disabled="isBusy"
          class="px-4"
        >
          Discard
        </b-button>
        <b-button
          variant="danger"
          size="sm"
          @click="onExtendPromotion"
          :disabled="isBusy"
          class="px-4"
        >
          <b-spinner small v-if="isBusy"/>
          Apply
        </b-button>
      </b-col>
    </b-row>

    <!-- finalizar promocion -->
    <b-row v-if="isFinishMode" class="my-2 px-4">
      <!-- user message -->
      <b-col cols="12">
        <b-alert show variant="danger" class="p-2 mb-1">
          Esta acción finalizará de manera anticipada la promoción antes de su fecha de vencimiento. ¿Finalizar promoción?
        </b-alert>
      </b-col>
      <!-- action buttons -->
      <b-col cols="12" class="text-right">
        <b-button
          variant="secondary"
          size="sm"
          @click="handleDiscard"
          :disabled="isBusy"
        >
          No, Keep promotion
        </b-button>
        <b-button
          variant="danger"
          size="sm"
          @click="finishPromotion"
          :disabled="isBusy"
        >
          <b-spinner small v-if="isBusy"/>
          Yes, Finish promotion
        </b-button>
      </b-col>

    </b-row>

    <!-- response finalizar -->
    <b-row class="my-2" v-if="showFinishResponse">
      <b-col>
        <b-alert show variant="danger" class="mb-0">
          La promoción fue finalizada. Es necesario <strong>actualizar la disponibilidad</strong> para aplicar las tarifas correctas.
        </b-alert>
      </b-col>
    </b-row>

    <!-- response extender -->
    <b-row class="my-2" v-if="showExtendResponse">
      <b-col>
        <b-alert show variant="success" class="mb-0">
          La fecha de finalización fue modificada. Es necesario <strong>actualizar la disponibilidad</strong> para aplicar las tarifas correctas.
        </b-alert>
      </b-col>
    </b-row>

  </div>

</template>

<script>

import PricingServices from '@/services/gps/pricing/PricingServices'
import { getDayHumanized, resolveFormatNumber } from '@/utils/common.js'

import moment from 'moment'


export default {

  name: 'DeparturePricingHistoryItem',

  props: ['pricing', 'activePromotion'],

  components: {



  },

  data() {
    return {



      showOptions: false, // activa/desactiva botones de accion

      isExtendMode: false,
      isFinishMode: false,


      isBusy: false, // controla proceso activo

      showFinishResponse: false,

      showExtendResponse: false,

      selectedDate: moment(new Date()).format("YYYY-MM-DD"),

      errors: null,


    }
  },

  computed: {

    isFormMode() {

      return this.isExtendMode || this.isFinishMode

    },

    resolveIconOption () {

      return this.showOptions ? 'chevron-up' : 'chevron-down'

    },

    resolveFormatText () {

      const status = this.pricing.dprStatus

      if ( status == '1') return 'text-success'   // active
      if ( status == '2') return 'text-secondary' // inactive
      if ( status == '3') return 'text-danger'    // finished
      if ( status == '4') return 'text-info'      // extended
      if ( status == '5') return 'text-dark'      // expired

      return 'text-primary'

    },

    showControlOptions() {

      //solo promociones express pueden ser finalizadas/extendidas
      if ( this.pricing.rseExpress != 1 ) return false

      // solo adminitrador puede ver opciones
      if ( this.$isAdministrador == false ) return false

      // solo promociones activas
      if ( this.pricing.dprStatus == 1 )  return true

      // solor promociones extendidas
      if ( this.pricing.dprStatus == 4 )  return true

      return false

    }

  },

  methods: {

    // retorna formato numerico del porcentaje/monto promocion
    formatValue( value ){

      return resolveFormatNumber(value)

    },


    // return text expires/expired/starting days
    formatDatePromotion(priceItem){

      return getDayHumanized(new Date(), priceItem.rseDateFrom , priceItem.rseDateTo)

    },

    // controlar accion de mostrar botones
    handleOptions() {

      this.showOptions = !this.showOptions

    },

    // controla vista para extender promocion
    handleExtend() {

      this.showOptions = false
      this.isExtendMode = true

    },

    // control vista para finalizar promocion
    handleFinish(){

      this.showOptions = false
      this.isFinishMode = true

    },

    // cancelar acciones
    handleDiscard(){

      this.isExtendMode = false
      this.isFinishMode = false
      this.showOptions = false

    },

    // ejecutar proceso para finalizar promocion
    async finishPromotion(){

      try {

        this.showFinishResponse = false
        this.isBusy = true

        const request = {
          'rseId': this.pricing.rseId,
          'updated_by': this.$loggedUserId
        }

        const { data } = await PricingServices.finishExpress( request )

        this.isBusy = false
        this.isFinishMode = false
        this.showOptions = false
        this.showFinishResponse = true

      } catch (e) {

        console.log('UNEXPECTED', e)

      }


    },

    // validar informacion para extender promocion
    onExtendPromotion(){

      this.errors = null

      // controlar fecha válida
      if ( moment(this.selectedDate).isValid() == false  )  {
        this.errors = 'La fecha seleccionada no es válida'
        return
      }

      const selectedDate = moment(this.selectedDate)
      const today = moment( new Date()).format("YYYY-MM-DD")

      // controlar fecha >= date actual
      if ( selectedDate.isBefore(moment(today)) ) {
        this.errors = 'La fecha seleccionada es menor a la fecha actual'
        return
      }

      // controlar fecha >= departure
      if ( selectedDate.isSameOrAfter(moment(this.pricing.rseDepartureStart)) ) {
        this.errors = 'La fecha seleccionada debe ser anterior a la salida'
        return
      }

      // ejecutar proceso

      this.extendPromotion()

    },

    // ejecutar proceso para extender promotion
    async extendPromotion(){

      try {

        this.showExtendResponse = false
        this.isBusy = true

        const request = {
          'rseId': this.pricing.rseId,
          'rseDateTo': moment(this.selectedDate).format('YYYY-MM-DD'),
          'updated_by': this.$loggedUserId
        }

        const { data } = await PricingServices.extendExpress( request )

        this.isBusy = false
        this.isExtendMode = false
        this.showOptions = false
        this.showExtendResponse = true

      } catch (e) {

        console.log("UNEXPECTED", e)

      }

    }

  },

  mounted() {

  },

  created() {

  },





}
</script>

<style scoped>

 .scoped-custom-width {
  width: 40%;
 }

</style>



