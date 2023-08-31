<template>

  <b-container fluid class="text-center">


    <!--  precios de la salida  -->

    <!-- =><pre>{{departure.prices}}</pre> -->
    <!-- 2021-07-07 | fg | solo mostrar tarifas que existan -->
    <template v-if="departure.prices.lowerRate">

      <!-- busy state -->
      <template v-if="isBusy">
        <b-spinner small />
      </template>

      <b-button :variant="`outline-light custom-price ${styleRate}`" @click="showRatesModal(departure.depId)"
        :disabled="isDepartureBeforeToday || isBusy">
        <!-- v-tooltip="{content: `Display rate information`, placement: 'top'}" -->
        <span :class="`text-${styleRate}`" data-toggle="tooltip" data-placement="top" title="Display rate information">
          <strong> {{ rateDeparture() | currency('$', 2, { spaceBetweenAmountAndSymbol: true }) }} </strong>
        </span>


        <!-- información adicional solo en caso de promociones -->
        <template v-if="departure.prices.promotion">
          <div class="small-price">

            <!-- promoción custom con monto +/-  -->
            <template v-if="departure.prices.promotion.amount">
              {{ amountPromo | currency }} <i :class="`glyph-icon ${iconPromo}`" />
            </template>
            <!-- promoción custom con porcentaje +/-  -->
            <template v-else>
              {{ percentPromo | percent }} <i :class="`glyph-icon ${iconPromo}`" />
            </template>

          </div>

        </template>

      </b-button>

    </template>

    <template v-else>
      <b-icon v-tooltip="{content: $t('gps.tooltips.no-rates'), placement: 'left', classes: ['itineraries'],}"
        :id="`price-departure-${departure.depId}`" icon="exclamation-circle" title="There aren't rates">
      </b-icon>
    </template>


    <!-- Cuadro modal de tarifas de la salida -->
    <b-modal ref="rates-modal" ok-variant="secondary" ok-only ok-title="Close" content-class="custom-price">

      <!-- custom modal header -->
      <template #modal-header>
        <b-col lg="12">
          <b-row>
            <b-col class="pl-0">

              <span><strong>{{ infoDeparture.itiName }}</strong></span><br>
              <span>{{ infoDeparture.cruName }}</span>

            </b-col>

            <b-col class="text-right">

              <span class="text-muted">From:</span>
              <span><strong>{{ moment(infoDeparture.depStartDate).format("ddd DD") }}</strong></span>
              <span>{{ moment(infoDeparture.depStartDate).format("MMM YYYY") }}</span>

              <br>

              <span class="text-muted">To:</span>
              <span><strong>{{ moment(infoDeparture.depEndDate).format("ddd DD") }}</strong></span>
              <span>{{ moment(infoDeparture.depEndDate).format("MMM YYYY") }}</span>

            </b-col>
          </b-row>
        </b-col>
      </template>

      <!-- indicador de proceso en ejecución-->
      <div class="text-center" v-if="isLoading">
        <b-spinner variant="primary" label="Text Centered"></b-spinner>
      </div>

      <template v-else>

        <!-- empty state -->
        <template v-if="isEmpty">

          <div>
            <b-row>
              <b-colxx xxs="10" class="avai m-auto dark">
                <b-row>
                  <!--img src="../../../../assets/img/atc/error.svg" alt=""-->
                </b-row>
                <div class="alert-title">There aren't rates</div>
                <div class="alert-text">The rate sheet doesn't contain information for current parameters</div>
              </b-colxx>
            </b-row>
          </div>

        </template>

        <!-- tabla de tarifas según precio elegido-->
        <template v-else>

          <b-tabs content-class="mt-3">
            <b-tab title="General" active>
              <!-- ==================================================================== -->
              <b-row class="mt-3">
                <b-col>

                  <!-- set fixed  -->
                  <departure-pricing-universal-discount :dep-id="departure.depId" />

                  <!-- departure pricing table -->
                  <departure-pricing-table v-if="activePromotion" :promotion="activePromotion" />

                  <!-- departure pricing default -->
                  <departure-pricing-table-default v-else :rates="infoDeparture.rates" :price="defaultPrice" />

                </b-col>
              </b-row>

              <!-- departure pricing history -->
              <b-row>
                <b-col>

                  <departure-pricing-history :departure-id="departure.depId"
                    :departure-start-date="departure.depStartDate" :active-promotion="activePromotion" />

                </b-col>
              </b-row>

              <!-- departure pricing update -->
              <b-row class="mt-3" v-if="$isAdministradorTarifas">
                <b-col>
                  <departure-pricing-update :prices="pricesDeparture" :dep-id="departure.depId"
                    :start-date="departure.depStartDate" :end-date="departure.depEndDate" />
                </b-col>
              </b-row>
              <!-- ==================================================================== -->
            </b-tab>
            <b-tab title="Requests log rates">
              <departure-requests-log-rates :depId="departure.depId" :offId="departure.prices.standarRate.offId"></departure-requests-log-rates>
            </b-tab>

          </b-tabs>

        </template>

      </template>

    </b-modal>
    <!-- Fin Cuadro modal de tarifas de la salida -->

  </b-container>

</template>

<script>
  import DepartureServices from '@/services/gps/departures/DeparturesServices'
  import CruiseServices from '@/services/gps/cruise/CruiseServices'
  import totalSlots from "../../../../../mixins/availability/totalSlots"
  import roles from '@/mixins/roles/roles'
  import moment from "moment"

  import DeparturesRequestsLogRates from "../departures/DeparturesRequestsLogRates"

  export default {

    name: "DeparturesPrices",
    mixins: [totalSlots, roles],
    props: ['departure', "selected"],

    components: {
      DeparturePricingTableDefault: () => import(
        '@/views/app/gps/availability/departures/DeparturePricingTableDefault'),
      DeparturePricingTable: () => import('@/views/app/gps/availability/departures/DeparturePricingTable'),
      DeparturePricingHistory: () => import('@/views/app/gps/availability/departures/DeparturePricingHistory'),
      DeparturePricingUpdate: () => import('@/views/app/gps/availability/departures/DeparturePricingUpdate'),
      DeparturePricingUniversalDiscount: () => import(
        '@/views/app/gps/availability/departures/DeparturePricingUniversalDiscount'),
      // DeparturesRequestsLogRates: () => import('@/views/app/gps/availability/departures/DeparturesRequestsLogRates')
      'departure-requests-log-rates': DeparturesRequestsLogRates,
    },

    data() {

      return {
        isLoading: false, // control para indicar proceso en ejecucion
        isEmpty: false, // control para empty state
        isBusy: false, // indica que hay una accion en ejecucion
        slotsWithBooking: 0, //
        departureRequests: 0, //
        infoDeparture: [], // data principal contiene info de la salida, rates y porcetajes
        pricesDeparture: [], // lista anual de precios usados por el crucero
        selectedPrice: 0, // id de la opciòn de precio seleccionado
        ratesCatalog: [], // lista de tarifas por catàlogo con aplicaciòn de porcentajes de comision por defecto`
        standardFields: ['percent', 'current_rack',
        'current_net'], // cabeceras para el caso de tarifas sin promociòn relacionada
        //
        ratesManagement: [], // tarifas administradas por modulo RateManagement

      }

    },

    computed: {

      // =========> Propiedad REALFREESLOTS se encuentra en totalSlots.js

      // retorna el % de comision del store de Availability
      selectedComision() {

        return this.$store.getters.getComisionSecondaryFilters;

      },

      // retorna el monto segùn campo de promo custom
      amountPromo() {

        return this.departure.prices.promotion.amount

      },

      // retorna un porcentaje (0 - 1) segùn campo de promo custom
      percentPromo() {

        return this.departure.prices.promotion.percent / 100

      },

      // devuelve +/- según modo de promo custom
      signPromo() {

        // caso promo custom percent
        if (this.departure.prices.promotion.percent) {

          return this.departure.prices.promotion.percent > 0 ? '+' : '-'
        }

        // caso promo custom amount
        if (this.departure.prices.promotion.amount) {

          return this.departure.prices.promotion.amount > 0 ? '+' : '-'
        }

      },

      // devuelve el tipo de icono para el modo de promo custom
      iconPromo() {

        return this.signPromo == '+' ? 'simple-icon-arrow-up' : 'simple-icon-arrow-down'

      },

      // estilo segùn la tarifa
      styleRate() {

        // si hay promo aplicar estilo
        if (this.departure.prices.promotion)
          // return this.signPromo == '+' ? 'danger' : 'warning'
          return this.signPromo == '+' ? 'danger' : 'success'
        // no hay promo - formato normal
        return this.isDepartureBeforeToday ? 'secondary' : 'primary'
        //return this.isDepartureBeforeToday ? 'secondary' : 'secondary'

      },

      /* ------------------------------------------------------
          VALOR SLOTS DISPONIBLES / BLOQUEADOS / CONFIRMADOS:

          ===> valores se encuentran en mixin availability / totalSlots.js <===

      ------------------------------------------------------*/

      // fecha de inicio de itinerario con formato
      departureStartDate() {

        return moment(this.infoDeparture.depStartDate, "YYYY-MM-DD").format("dddd, MMM Do YYYY")

      },


      // fecha de fin del itinerario con formato
      departureEndDate() {

        return moment(this.infoDeparture.depEndDate, "YYYY-MM-DD").format("dddd, MMM Do YYYY")

      },

      departureYear() {
        if (this.departure.depStartDate)
          return moment(this.departure.depStartDate, "YYYY-MM-DD").year()
        return 0
      },


      activePromotion() {

        if (this.ratesManagement.length == 0) return null

        let firstActivePromotion = null

        const today = moment(new Date()).format("YYYY-MM-DD")

        function firstActive(promotion) {

          const from = promotion.rseDateFrom
          const to = promotion.rseDateTo

          return moment(today).isBetween(from, to, null, []) && promotion.rseActive == 1 // first promo vigente y activa

        }

        const indexPromo = this.ratesManagement.findIndex(firstActive)

        if (indexPromo >= 0)
          firstActivePromotion = this.ratesManagement.at(indexPromo)


        return firstActivePromotion

      },

      defaultPrice() {
        return this.pricesDeparture.find(item => item.crpDefault)
      },

      // indica si la fecha de una salida es anterior a la fecha actual
      isDepartureBeforeToday() {

        const today = moment(new Date()).format("YYYY-MM-DD")

        const startDeparture = moment(this.departure.depStartDate).format("YYYY-MM-DD")

        return moment(startDeparture).isBefore(today)


      }



    },


    watch: {

      selectedPrice: function (newVal, oldVal) {
        this.getDepartureRates()
      }

    },

    methods: {

      formatDate(fecha) {
        return moment(fecha).format('MMMM Do, YYYY -  h:mm')
      },

      showModalWaitingList() {
        this.$refs["my-modal-waiting-list"].show();
      },

      closeModalWaitingList() {
        this.$refs["my-modal-waiting-list"].hide();
      },

      showModalRequest() {
        this.$refs["my-modal-request"].show();
      },

      closeModalRequest() {
        this.$refs["my-modal-request"].hide();
      },


      // determinar la tarifa de la salida
      rateDeparture() {

        // definir rate en caso promo o normal
        let currentRateDeparture = this.departure.prices.promotion ? this.departure.prices.promotion.ratePromo : this
          .departure.prices.standarRate.offNetRate

        // aplicar % de comision del cliente
        currentRateDeparture = currentRateDeparture - (currentRateDeparture * this.selectedComision / 100)

        // retornar rate definida
        return currentRateDeparture;
      },


      // tarifas relacionadas a una salida
      async showRatesModal(depId) {

        this.isBusy = true

        await this.getDepartureRatesManagement()

        await this.getCruiseYearPrices()

        await this.getDepartureRates()

        this.isBusy = false

        this.$refs['rates-modal'].show()

      },


      // tipos de precio/temporadas de la salida
      async getCruiseYearPrices() {

        // buscar info de los precios disponibles según crucero y periodo
        const queryParamsPrices = {
          cruId: this.departure.cruId,
          crpYear: this.departureYear // definir año de la salida para consultar las tarifas correspondientes
        }

        const {
          data: {
            data
          }
        } = await CruiseServices.getCruiseYearPrices(queryParamsPrices)

        this.pricesDeparture = data

        const defaultPrice = this.pricesDeparture.find(item => item.crpDefault)

        this.selectedPrice = defaultPrice.priId

      },


      // tarifas relacionadas a la salida
      async getDepartureRates() {

        this.isLoading = true;
        this.isEmpty = true;

        const queryParams = {
          price: this.selectedPrice,
          year: this.departureYear,
        }

        const {
          data: {
            data
          }
        } = await DepartureServices.getDepartureRates(this.departure.depId, queryParams)

        this.infoDeparture = data
        this.isEmpty = !this.infoDeparture.rates.length

        this.isLoading = false

      },

      // promociones relacionadas a la salida
      async getDepartureRatesManagement() {

        const queryParams = {
          year: this.departureYear
        }

        const {
          data
        } = await DepartureServices.getPricingHistory(this.departure.depId, queryParams)

        this.ratesManagement = data



      }

    },
    mounted() {



    }


  }

</script>

<style lang="scss" scoped>
  .size-text {
    font-size: 13px !important;
  }

  // Tamaño de botón de contadores
  .info-status-btn .st.btn-group-xs>.btn,
  .info-status-btn .st.btn-group-xs>.btn {
    width: 21px;
    max-width: 21px;
  }


  // Tamaño de letra de precios:
  .custom-price.btn {
    font-size: .7rem !important;
  }

</style>
