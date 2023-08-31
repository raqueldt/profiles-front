<template>
  <div class="container-fluid ml-4">
    <b-row>

      <b-col xl="7" lg="7" md="6" sm="12" class="info-status-btn">

        <b-button-group size="xs" class="st mt-1 ml-2" :class="departure.prices.promotion != null  ? 'mt-2' : '' ">

            <b-button
              variant="av"
              class="mr-1"
              v-tooltip="realFreeSlots != 0  ? {content: `${$t('gps.available-slots')} : ${slotsAvailable}`  } :'Spaces not available'"
            >
              <span
                class="size-text"
                :class="realFreeSlots === 0 ? 'font-weight-bold font-italic' : ''"
              >
              {{realFreeSlots}}
              </span><br>
            </b-button>

            <b-button
              variant="bl"
              class="mr-1"
              v-tooltip="{
                           content:
                          `${$t('gps.blocked-slots')} : ${slotsBlocked}`
              }"
            >
              <span class="size-text">{{slotsBlocked}}</span>
            </b-button>

            <!-- BOTON MODAL WAITING LIST -->
            <b-button
              variant="primary"
              @click="showModalWaitingList"
              class="ml-1"
              v-tooltip="{content: `${$t('gps.tooltips.waiting-list')} : ${departure.numberWaitingList}`, placement: 'top', classes: ['itineraries'],}"
            >
              <span class="size-text">{{departure.numberWaitingList}}</span>
            </b-button>
            <!-- FIN BOTON MODAL WAITING LIST -->

            <b-button
              variant="info"
              :disabled="departure.numberRequests == 0"
              @click="handleRequests"
            >
              <span class="size-text">{{ departure.numberRequests }}</span>
            </b-button>





        </b-button-group>

      </b-col>

      <!--  precios de la salida  -->
      <b-col xl="5" lg="5"  md="6" sm="12" class="text-center p-0">

        <!-- 2021-07-07 | fg | solo mostrar tarifas que existan -->
        <template v-if="departure.prices.lowerRate">

          <!-- busy state -->
          <template v-if="isBusy">
              <b-spinner small/>
          </template>

          <b-button
            :variant="`outline-light custom-price ${styleRate}`"
            @click="showRatesModal(departure.depId)"
            :disabled="isDepartureBeforeToday || isBusy"
          >

            <span :class="`text-${styleRate}`">
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

      </b-col>

    </b-row>

    <!-- Cuadro modal de tarifas de la salida -->
    <b-modal
      ref="rates-modal"
      ok-variant="secondary"
      ok-only
      ok-title="Close"
      content-class="custom-price"
    >

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

          <b-row>
            <b-col>

              <!-- departure pricing table -->
              <departure-pricing-table
                v-if="activePromotion"
                :promotion="activePromotion"
              />

              <!-- departure pricing default -->
              <departure-pricing-table-default
                v-else
                :rates="infoDeparture.rates"
                :price="defaultPrice"
              />

            </b-col>
          </b-row>

          <!-- departure pricing history -->
          <b-row>
            <b-col>

              <departure-pricing-history
                  :departure-id="departure.depId"
                  :departure-start-date="departure.depStartDate"
                  :active-promotion="activePromotion"
              />

            </b-col>
          </b-row>

          <!-- departure pricing update -->
          <b-row class="mt-3" v-if="$isAdministradorTarifas">
              <b-col>
                <departure-pricing-update
                  :prices="pricesDeparture"
                  :dep-id="departure.depId"
                  :start-date="departure.depStartDate"
                  :end-date="departure.depEndDate"
                />
              </b-col>
          </b-row>

        </template>

      </template>

    </b-modal>
    <!-- Fin Cuadro modal de tarifas de la salida -->

    <!-- MODAL WAITING LIST -->
    <b-modal  ref="my-modal-waiting-list" hide-footer size="lg"
              ok-variant="secondary" ok-only ok-title="Close"
              content-class="custom-price">

      <template #modal-header>
        <b-col lg="12">
          <b-row>
            <b-col class="h5">
              <i class="glyph-icon iconsminds-ship"></i> {{departure.cruName}} Waiting List
            </b-col>

                <formated-dates  :startDate="departure.depStartDate"
                                  :endDate="departure.depEndDate" >
                </formated-dates>

          </b-row>
        </b-col>
      </template>

      <modal-waiting-list
        :departure="departure"
        @closeModalWaitingList="closeModalWaitingList"
        >

      </modal-waiting-list>
    </b-modal>
    <!-- MODAL WAITING LIST -->



    <!-- MODAL REQUESTS LOG -->
    <b-modal
      v-model="showModalRequests"
      id="modal-requests-log"
      scrollable
      size="lg"
      ok-only
      ok-title="Close"
      header-class="px-2 py-3"
      body-class="p-0"
      footer-class="p-2"
    >


     <!-- custom modal header -->
      <template #modal-header>
        <b-col cols="12">
          <b-row>

            <b-col class="pl-0">
              <h1><strong>Requests Log</strong></h1>
            </b-col>

            <b-col class="text-center">

              <span><strong>{{ departure.itiName }}</strong></span><br>
              <span>{{ departure.cruName }}</span>

            </b-col>

            <b-col class="text-right">

              <span class="text-muted">From:</span>
              <span><strong>{{ moment(departure.depStartDate).format("ddd DD") }}</strong></span>
              <span>{{ moment(departure.depStartDate).format("MMM YYYY") }}</span>

              <br>

              <span class="text-muted">To:</span>
              <span><strong>{{ moment(departure.depEndDate).format("ddd DD") }}</strong></span>
              <span>{{ moment(departure.depEndDate).format("MMM YYYY") }}</span>

            </b-col>
          </b-row>
        </b-col>
      </template>

      <departure-requests-log
        :dep-id="departure.depId"
        :data-requests-log="dataRequestsLog"
      />

    </b-modal>
    <!-- MODAL REQUESTS LOG -->





  </div>
</template>

<script>

  import DepartureServices from '@/services/gps/departures/DeparturesServices'
  import CruiseServices from '@/services/gps/cruise/CruiseServices'
  import totalSlots from "@/mixins/availability/totalSlots"
  import roles from '@/mixins/roles/roles'
  import moment from "moment"

  export default {

    name: "DeparturesPrices",
    mixins: [totalSlots, roles],
    props: ['departure', "selected"],

    components: {

      DepartureRequestsLog: () => import('@/views/app/gps/availability/departures/DepartureRequestsLog'),

      DeparturePricingTableDefault: () => import('@/views/app/gps/availability/departures/DeparturePricingTableDefault'),
      DeparturePricingTable: () => import('@/views/app/gps/availability/departures/DeparturePricingTable'),
      DeparturePricingHistory: () => import('@/views/app/gps/availability/departures/DeparturePricingHistory'),
      DeparturePricingUpdate: () => import('@/views/app/gps/availability/departures/DeparturePricingUpdate'),

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
        standardFields: ['percent', 'current_rack','current_net'], // cabeceras para el caso de tarifas sin promociòn relacionada
        //
        ratesManagement: [], // tarifas administradas por modulo RateManagement
        //
        showModalRequests: false, // toggle modal request control
        //
        dataRequestsLog: []

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
          return this.signPromo == '+' ? 'danger' : 'warning'
        // no hay promo - formato normal
        return this.isDepartureBeforeToday ? 'secondary' : 'primary'

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

      departureYear () {
        if ( this.departure.depStartDate )
          return moment(this.departure.depStartDate, "YYYY-MM-DD").year()
        return 0
      },


      activePromotion () {

        if ( this.ratesManagement.length == 0) return null

        let firstActivePromotion = null

        const today = moment(new Date()).format("YYYY-MM-DD")

        function firstActive( promotion ) {

          const from = promotion.rseDateFrom
          const to = promotion.rseDateTo

          return moment(today).isBetween(from, to, null, []) && promotion.rseActive == 1 // first promo vigente y activa

        }

        const indexPromo = this.ratesManagement.findIndex(firstActive)

        if ( indexPromo >= 0 )
           firstActivePromotion = this.ratesManagement.at(indexPromo)


        return firstActivePromotion

      },

      defaultPrice(){
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







      closeModalRequest(){

        this.showModalRequests = false

      },

      async handleRequests() {

        this.dataRequestsLog = []

        const { data } = await DepartureServices.getRequestsLog({ depId: this.departure.depId })

        this.dataRequestsLog = data

        this.showModalRequests = true



        /*
        const route = this.$router.resolve({ name: 'AvailabilityRequest', query: { id: 'private' } } )
        window.open(route.href, '_blank')
        */

      },







      // determinar la tarifa de la salida
      rateDeparture() {

        // definir rate en caso promo o normal
        let currentRateDeparture = this.departure.prices.promotion
          ? this.departure.prices.promotion.ratePromo
          : this.departure.prices.standarRate.offNetRate

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

      // promociones relacionadas a la salida
      async getDepartureRatesManagement() {

        const queryParams = {
          year: this.departureYear
        }

        const { data } = await DepartureServices.getPricingHistory( this.departure.depId, queryParams )

        this.ratesManagement = data

      },

      // tipos de precio/temporadas de la salida
      async getCruiseYearPrices() {

        // buscar info de los precios disponibles según crucero y periodo
        const queryParamsPrices = {
          cruId: this.departure.cruId,
          crpYear: this.departureYear // definir año de la salida para consultar las tarifas correspondientes
        }

        const { data: { data }} = await CruiseServices.getCruiseYearPrices(queryParamsPrices)

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

        const { data: { data } } = await DepartureServices.getDepartureRates(this.departure.depId, queryParams)

        this.infoDeparture = data
        this.isEmpty = !this.infoDeparture.rates.length

        this.isLoading = false

      },



    },
    mounted() {



    }


  }

</script>

<style lang="scss" scoped>

.size-text{
  font-size: 13px !important;
}

// Tamaño de botón de contadores
.info-status-btn .st.btn-group-xs > .btn, .info-status-btn .st.btn-group-xs > .btn {
  width: 21px;
  max-width: 21px;
}


// Tamaño de letra de precios:
.custom-price.btn {
  font-size: .8rem !important;
}

</style>
