<template>
  <b-container fluid class="info-status-btn text-center">

    <template v-if="isDepartureReadyByDates">

      <router-link :to="linkBooking()" tag="a">
        <!-- v-tooltip="
            realFreeSlots != 0
              ? { content: `${$t('gps.available-slots')} : ${realFreeSlots} <br> Click here to block space(s)` }
              : 'Spaces not available'
          " -->
        <b-button
          @mouseover="hoverCarStatus= true"
          @mouseleave="hoverCarStatus= false"
          squared
          size="sm"
          style="border:solid 1px #CB5F10;"
          data-toggle="tooltip" data-placement="top"
          :title= title(realFreeSlots)
          variant="outline-primary"
          class="mt-2 rounded hover-button "
        >

          <b-badge variant="white" class="m-0 p-0 " size="sm">
            <b-container>
            <b-row class="justify-content-center align-items-center">
              <b-col lg="5" class="mx-0 px-0">
                <b style="font-size:12px; ">{{ realFreeSlots }}</b>
              </b-col>
              <b-col  lg="7" class="mx-0 px-0 text-center">
                  <template v-if="hoverCarStatus">
                    <img src="/assets/img/availability/shop-cart-full-white.png" width="16px" height="16px"  />
                  </template>
                  <template v-else>
                    <img src="/assets/img/availability/shop-cart-orange.png" width="16px" height="16px"  />
                  </template>
              </b-col>
            </b-row>
            </b-container>
          </b-badge>

        </b-button>

      </router-link>
    </template>
    <template v-else>
      <b-button
        squared
        disabled
        size="sm"
        data-toggle="tooltip"
        style="border:solid 1px white;"
        data-placement="top"
        title="You can not block more spaces"
        variant="gray"
        class="mt-2 rounded hover-disable-button bg-white"
      >
        <b-badge variant="white" class="m-0 p-0" size="sm">
          <b style="font-size:12px; color:#C0C0BF">{{ realFreeSlots }}</b>
        </b-badge>
        <img src="/assets/img/availability/shop-cart-gray.png" width="16px" height="16px"  />
      </b-button>
    </template>

    <!-- <template v-if="isDepartureReadyByDates">
          <template v-if="realFreeSlots>0">
            <router-link :to="linkBooking()" tag="a">
              <b-button squared
                size="sm"
                style="border:solid 1px #CB5F10;"
                v-tooltip="realFreeSlots != 0  ? {content: `${$t('gps.available-slots')} : ${realFreeSlots}`  } :'Spaces not available'"
                variant="outline-primary"
                class="mt-2 rounded hover-button">
                <b-badge
                  variant="white"
                  class="m-0 p-0"
                  size="sm">
                  <b style="font-size:12px">{{realFreeSlots}}</b>
                </b-badge>
                <i style="font-size:16px;" class=" m-0 glyph-icon iconsminds-add-cart"></i>
              </b-button>
            </router-link>
          </template>
          <template v-else>
            <b-button
                squared
                disabled
                size="sm"
                data-toggle="tooltip"
                style="border:solid 1px white;"
                data-placement="top"
                title="You can not block more spaces"
                variant="gray"
                class="mt-2 rounded hover-disable-button">
                <b-badge
                  variant="white"
                  class="m-0 p-0"
                  size="sm">
                  <b style="font-size:12px">{{realFreeSlots}}</b>
                </b-badge>
                <i style="font-size:16px;" class=" m-0 glyph-icon iconsminds-add-cart"></i>
              </b-button>
          </template>
        </template>
        <template v-else>
              <b-button
                squared
                disabled
                size="sm"
                data-toggle="tooltip"
                style="border:solid 1px white;"
                data-placement="top"
                title="You can not block more spaces"
                variant="gray"
                class="mt-2 rounded hover-disable-button">
                <b-badge
                  variant="white"
                  class="m-0 p-0"
                  size="sm">
                  <b style="font-size:12px">{{realFreeSlots}}</b>
                </b-badge>
                <i style="font-size:16px;" class=" m-0 glyph-icon iconsminds-add-cart"></i>
              </b-button>
        </template> -->
  </b-container>
</template>

<script>
import DepartureServices from "@/services/gps/departures/DeparturesServices";
import CruiseServices from "@/services/gps/cruise/CruiseServices";
import totalSlots from "../../../../../mixins/availability/totalSlots";
import roles from "@/mixins/roles/roles";
import moment from "moment";

export default {

  name: "DeparturesAvailable",
  mixins: [totalSlots, roles],
  props: ["departure", "selected"],

  components: {
    DeparturePricingTableDefault: () =>
      import(
        "@/views/app/gps/availability/departures/DeparturePricingTableDefault"
      ),
    DeparturePricingTable: () =>
      import("@/views/app/gps/availability/departures/DeparturePricingTable"),
    DeparturePricingHistory: () =>
      import("@/views/app/gps/availability/departures/DeparturePricingHistory"),
    DeparturePricingUpdate: () =>
      import("@/views/app/gps/availability/departures/DeparturePricingUpdate")
  },

  data() {
    return {
      hoverCarStatus: false,
      isLoading: false, // control para indicar proceso en ejecucion
      isEmpty: false, // control para empty state
      isBusy: false, // indica que hay una accion en ejecucion
      slotsWithBooking: 0, //
      departureRequests: 0, //
      infoDeparture: [], // data principal contiene info de la salida, rates y porcetajes
      pricesDeparture: [], // lista anual de precios usados por el crucero
      selectedPrice: 0, // id de la opciòn de precio seleccionado
      ratesCatalog: [], // lista de tarifas por catàlogo con aplicaciòn de porcentajes de comision por defecto`
      standardFields: ["percent", "current_rack", "current_net"], // cabeceras para el caso de tarifas sin promociòn relacionada
      //
      ratesManagement: [] // tarifas administradas por modulo RateManagement
    };
  },

  computed: {
    // =========> Propiedad REALFREESLOTS se encuentra en totalSlots.js

    // retorna el % de comision del store de Availability
    selectedComision() {
      return this.$store.getters.getComisionSecondaryFilters;
    },

    // retorna el monto segùn campo de promo custom
    amountPromo() {
      return this.departure.prices.promotion.amount;
    },

    // retorna un porcentaje (0 - 1) segùn campo de promo custom
    percentPromo() {
      return this.departure.prices.promotion.percent / 100;
    },

    // devuelve +/- según modo de promo custom
    signPromo() {
      // caso promo custom percent
      if (this.departure.prices.promotion.percent) {
        return this.departure.prices.promotion.percent > 0 ? "+" : "-";
      }

      // caso promo custom amount
      if (this.departure.prices.promotion.amount) {
        return this.departure.prices.promotion.amount > 0 ? "+" : "-";
      }
    },

    // devuelve el tipo de icono para el modo de promo custom
    iconPromo() {
      return this.signPromo == "+"
        ? "simple-icon-arrow-up"
        : "simple-icon-arrow-down";
    },

    // estilo segùn la tarifa
    styleRate() {
      // si hay promo aplicar estilo
      if (this.departure.prices.promotion)
        return this.signPromo == "+" ? "danger" : "warning";
      // no hay promo - formato normal
      return this.isDepartureBeforeToday ? "secondary" : "primary";
    },

    /* ------------------------------------------------------
          VALOR SLOTS DISPONIBLES / BLOQUEADOS / CONFIRMADOS:

          ===> valores se encuentran en mixin availability / totalSlots.js <===

      ------------------------------------------------------*/

    // fecha de inicio de itinerario con formato
    departureStartDate() {
      return moment(this.infoDeparture.depStartDate, "YYYY-MM-DD").format(
        "dddd, MMM Do YYYY"
      );
    },

    // fecha de fin del itinerario con formato
    departureEndDate() {
      return moment(this.infoDeparture.depEndDate, "YYYY-MM-DD").format(
        "dddd, MMM Do YYYY"
      );
    },

    departureYear() {
      if (this.departure.depStartDate)
        return moment(this.departure.depStartDate, "YYYY-MM-DD").year();
      return 0;
    },

    activePromotion() {
      if (this.ratesManagement.length == 0) return null;

      let firstActivePromotion = null;

      const today = moment(new Date()).format("YYYY-MM-DD");

      function firstActive(promotion) {
        const from = promotion.rseDateFrom;
        const to = promotion.rseDateTo;

        return (
          moment(today).isBetween(from, to, null, []) &&
          promotion.rseActive == 1
        ); // first promo vigente y activa
      }

      const indexPromo = this.ratesManagement.findIndex(firstActive);

      if (indexPromo >= 0)
        firstActivePromotion = this.ratesManagement.at(indexPromo);

      return firstActivePromotion;
    },

    defaultPrice() {
      return this.pricesDeparture.find(item => item.crpDefault);
    },

    // indica si la fecha de una salida es anterior a la fecha actual
    isDepartureBeforeToday() {
      const today = moment(new Date()).format("YYYY-MM-DD");

      const startDeparture = moment(this.departure.depStartDate).format(
        "YYYY-MM-DD"
      );

      return moment(startDeparture).isBefore(today);
    },
    isDepartureReadyByDates: function() {
      if (Object.keys(this.departure.cabins).length === 0) return false;

      if (this.departure.depStatus != "1") return false;

      // if (this.departure.prices.lowerRate === null) return false;

      if (this.realFreeSlots === 0) return false;

      // const today = new Date();

      // Se resta 7 dias a la fecha actual para poder bloquear slots de última hora
      const today = moment().subtract(7,'days').format("YYYY-MM-DD");
      const startDeparture = moment(this.departure.depStartDate).format("YYYY-MM-DD");
      if (startDeparture < today) return false;
      return true;
    }
  },

  watch: {
    selectedPrice: function(newVal, oldVal) {
      this.getDepartureRates();
    }
  },

  methods: {
    title(realFreeSlots){
        return `${realFreeSlots != 0 ? this.$t('gps.available-slots')+': '+ realFreeSlots  : 'Click here to block space(s)'}`
    },
    linkBooking() {
      const { gct, req } = this.$route.query;
      return {
        name: "booking",
        params: { id: this.departure.depId },
        query: { gct, req }
      };
      // this.$router.push({ name: 'booking', params: { id: this.departure.depId },
      //   query: { gct, req}
      // });
    },

    formatDate(fecha) {
      return moment(fecha).format("MMMM Do, YYYY -  h:mm");
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
      let currentRateDeparture = this.departure.prices.promotion
        ? this.departure.prices.promotion.ratePromo
        : this.departure.prices.standarRate.offNetRate;

      // aplicar % de comision del cliente
      currentRateDeparture =
        currentRateDeparture -
        (currentRateDeparture * this.selectedComision) / 100;

      // retornar rate definida
      return currentRateDeparture;
    },

    // tarifas relacionadas a una salida
    async showRatesModal(depId) {
      this.isBusy = true;

      await this.getDepartureRatesManagement();

      await this.getCruiseYearPrices();

      await this.getDepartureRates();

      this.isBusy = false;

      this.$refs["rates-modal"].show();
    },

    // tipos de precio/temporadas de la salida
    async getCruiseYearPrices() {
      // buscar info de los precios disponibles según crucero y periodo
      const queryParamsPrices = {
        cruId: this.departure.cruId,
        crpYear: this.departureYear // definir año de la salida para consultar las tarifas correspondientes
      };

      const {
        data: { data }
      } = await CruiseServices.getCruiseYearPrices(queryParamsPrices);

      this.pricesDeparture = data;

      const defaultPrice = this.pricesDeparture.find(item => item.crpDefault);

      this.selectedPrice = defaultPrice.priId;
    },

    // tarifas relacionadas a la salida
    async getDepartureRates() {
      this.isLoading = true;
      this.isEmpty = true;

      const queryParams = {
        price: this.selectedPrice,
        year: this.departureYear
      };

      const {
        data: { data }
      } = await DepartureServices.getDepartureRates(
        this.departure.depId,
        queryParams
      );

      this.infoDeparture = data;
      this.isEmpty = !this.infoDeparture.rates.length;

      this.isLoading = false;
    },

    // promociones relacionadas a la salida
    async getDepartureRatesManagement() {
      const queryParams = {
        year: this.departureYear
      };

      const { data } = await DepartureServices.getPricingHistory(
        this.departure.depId,
        queryParams
      );

      this.ratesManagement = data;
    },

  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.size-text {
  font-size: 13px !important;
}

// Tamaño de botón de contadores
.info-status-btn .st.btn-group-xs > .btn,
.info-status-btn .st.btn-group-xs > .btn {
  width: 21px;
  max-width: 21px;
}

// Tamaño de letra de precios:
.custom-price.btn {
  font-size: 0.8rem !important;
}

.hover-button:hover {
  color: white !important;
}
hover-disable-button:hover {
  color: gray !important;
}
</style>
