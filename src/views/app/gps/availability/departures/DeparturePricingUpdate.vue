<template>

  <div>

    <!-- user feedback -->
    <template v-if="promocion">
      <b-alert show variant="success">La promoción <strong>{{ promocion.rseReference }}</strong> fue creada correctamente.</b-alert>
      <b-alert show variant="warning">Debe <strong>actualizar la disponibilidad</strong> para aplicar los cambios</b-alert>
    </template>

    <!-- default status -->
    <template v-else>

      <b-button
        variant="link"
        @click="isFormMode = true"
        v-if="isFormMode == false"
        class="p-0"
      >
        Actualizar precio para esta salida
      </b-button>

      <b-card
        title="Update pricing"
        v-else
      >
        <b-form>

          <b-row>

            <!-- referencia -->
            <b-col cols="12">
              <b-form-group
                id="input-group-reference"
                label="Referencia"
                label-for="input-reference"
              >
                <b-form-input
                  id="input-reference"
                  v-model="settings.rseReference"
                  autocomplete="off"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>

            <!-- periodo de vigencia -->
            <b-col cols="12">

              <b-form-group
                id="input-group-dates"
                label="Vigencia"
                label-for="input-dates"
              >
                <date-range-picker
                  id="input-dates"
                  v-model="dateRange"
                  opens="left"
                  :ranges="false"
                  :date-format="dateFormat"
                  @update="handleVigencia"
                >
                </date-range-picker>
              </b-form-group>


            </b-col>



          </b-row>

          <b-row>
            <!-- tipo de promocion  -->
            <b-col lg="4">

              <b-form-group
                id="input-group-type"
                label="Tipo"
              >
                <b-form-radio-group
                  v-model="settings.rseType"
                  :options="typeOptions"
                  name="radio-inline-type"
                ></b-form-radio-group>
              </b-form-group>


            </b-col>

            <!-- -->
            <b-col lg="8">

              <b-form-group
                label="Seleccione la tarifa"
                v-if="settings.rseType == 1"
              >
                <b-form-radio-group
                  v-model="selectedPrice"
                  :options="seasonOptionsNoDefault"
                  class="mb-3"
                  value-field="priId"
                  text-field="priName"
                  size="xs"
                  button-variant="outline-dark"
                  buttons
                ></b-form-radio-group>

              </b-form-group>

              <b-form-group
                label="Personalizar la tarifa estándar"
                v-if="settings.rseType == 2"
              >

                <b-form-radio-group
                  v-model="selectedCustom"
                  :options="customOptions"
                  name="radio-inline"
                ></b-form-radio-group>

                  <b-form-input
                    id="custom-amount"
                    v-model="dprAmount"
                    type="number"
                    min="1"
                    max="2000"
                    autocomplete="off"
                    v-if="selectedCustom == 1"
                  >
                  </b-form-input>

                  <b-form-input
                    id="custom-percent"
                    v-model="dprPercent"
                    type="number"
                    min="1"
                    max="99"
                    autocomplete="off"
                    v-if="selectedCustom == 2"
                  >
                  </b-form-input>

              </b-form-group>

            </b-col>

          </b-row>

          <!-- action buttons -->
          <b-button
            variant="primary"
            @click.prevent="handleSubmit"
            :disabled="isBusy || hasEmptyData"
          >
            <b-spinner small type="grow" v-if="isBusy"></b-spinner>
            Apply
          </b-button>

          <b-button variant="secondary" @click.prevent="handleDiscard">Discard</b-button>

          <b-row v-if="errors" class="mt-2">
            <b-col>
              <b-alert show variant="danger"><strong>Something went wrong.</strong> {{ errors }}</b-alert>
            </b-col>
          </b-row>


        </b-form>
      </b-card>
    </template>



  </div>

</template>

<script>

import DepartureServices from '@/services/gps/departures/DeparturesServices'

import DateRangePicker from 'vue2-daterange-picker'

import PricingServices from '@/services/gps/pricing/PricingServices'

import moment from 'moment'
import { BIconEmojiNeutralFill } from 'bootstrap-vue'

export default {

  name: 'DeparturePricingUpdate',

  props: ['prices', 'depId', 'startDate', 'endDate'],

  components: {

    DateRangePicker

  },

  data() {

    return {

      isLoading: false,
      isBusy: false,
      isFormMode: false,
      errors: null,

      dateRange: {
        startDate: null,
        endDate: null
      },

      settings: {
        rseReference: null,
        rseDateFrom: null,
        rseDateTo: null,
        rseType: null,
      },

      dprAmount: null,
      dprPercent: null,

      typeOptions: [
        { text: 'Season', value: '1' },
        { text: 'Custom', value: '2' },
      ],

      customOptions: [
        { text: 'Amount', value: '1' },
        { text: 'Percent', value: '2' },
      ],

      selectedCustom: null,   // 1 amount 2 percent

      selectedPrice: null,

      catalogList: [], //lista de catálogos para personalizar el alcance de la promoción | PENDIENTE IMPLEMENTAR

      promocion: null //datos de la promocion creada

    }

  },

  computed: {

    seasonOptionsNoDefault () {
      return this.prices.filter( price => price.crpDefault == 0 && !price.crpCharter )
    },

    seasonOptionDefault () {
      return this.prices.filter( price => price.crpDefault == 1 )
    },

    seasonSelected () {

      return this.prices.filter( price => price.priId == this.selectedPrice )

    },

    hasEmptyData() {

      const isEmptyForm = Object.values(this.settings).some( input => input == null)

      if ( isEmptyForm ) return isEmptyForm

      // promo season
      if ( this.settings.rseType == 1)   return !this.selectedPrice

      // promo custom
      if ( this.settings.rseType == 2)  {

        // custom amount
        if ( this.selectedCustom == 1 ) return !this.dprAmount

        // custom percent
        if ( this.selectedCustom == 2 ) return !this.dprPercent

      }

      return true
    }



  },


  watch: {

    'settings.rseType': function (newVal, oldVal) {

      //reset data segun tipo de promocion

      //season
      if ( newVal == 1 ) this.dprAmount = this.dprPercent = null
      //custom
      if ( newVal == 2 ) this.selectedPrice = null


    },

    selectedPrice: function (newVal, oldVal) {

      if ( newVal ) this.getDepartureRates()

    },

    selectedCustom: function (newVal, oldVal) {

      // amount
      if ( newVal == 1 ) this.dprPercent = null
      // percent
      if ( newVal == 2 ) this.dprAmount = null


    }



  },

  methods: {

      //inicializar controles
      initialReferences() {

        const today = new Date()

        this.dateRange.startDate = today
        this.dateRange.endDate = today

        this.settings.rseDateFrom = moment(today).format("YYYY-MM-DD")
        this.settings.rseDateTo = moment(today).format("YYYY-MM-DD")

      },

      // tarifas relacionadas a la salida
      async getDepartureRates() {

        const [ price ] =  this.seasonSelected

        const queryParams = {
          price: price.priId,
          year: price.crpYear,
        }

        try {

          const { data: { data } } = await DepartureServices.getDepartureRates(this.depId, queryParams)

          this.catalogList = data.rates


        } catch (e) {

          console.log("UNEXPECTED!", e)

        }



      },

      //procesar peticion submit
      async handleSubmit() {

        try {

          this.errors = null

          this.isBusy = true

          const [ priceSelected ] = this.settings.rseType == 1 ? this.seasonSelected : this.seasonOptionDefault

          const formData = {
            depId: this.depId,
            rseDepartureStart: this.startDate,
            rseDepartureEnd: this.endDate,
            rseDateFrom: this.settings.rseDateFrom,
            rseDateTo: this.settings.rseDateTo,
            rseReference: this.settings.rseReference,
            rseType: this.settings.rseType,
            created_by: this.$loggedUserId,
            priId: priceSelected.priId,
            rseExpress: 1, // 2022-08-24 | fg | indica que una promocion fue creada desde la disponibilidad
            dprOrder: 0,
            dprAmount: this.dprAmount,
            dprPercent: this.dprPercent
          }

          const { data } = await PricingServices.setDeparturePricing( formData )

          this.promocion = data

          this.isBusy = false

          this.isFormMode = false

        } catch (e) {

          this.errors = e

          this.isBusy = false

          console.log("UNEXPECTED!", e)
        }



      },

      //procesar peticion discard
      handleDiscard() {

        // reset form
        Object.keys( this.settings ).forEach( key => this.settings[key] = null )
        // close mode form
        this.isFormMode = false

      },

      //procesar periodo de vigencia
      handleVigencia() {
        this.settings.rseDateFrom = moment(this.dateRange.startDate).format("YYYY-MM-DD")
        this.settings.rseDateTo = moment(this.dateRange.endDate).format("YYYY-MM-DD")
      },

      //desactivar fechas pasadas
      dateFormat (classes, date) {
        if (!classes.disabled) {
          const today = new Date()
          today.setHours(0,0,0,0) // horas minutos segundos milisegundos
          classes.disabled = date.getTime() < today
          console.log(date.getTime(), today);
        }
        return classes
      }



  },

  created(){

    this.initialReferences()

  }


}

</script>
