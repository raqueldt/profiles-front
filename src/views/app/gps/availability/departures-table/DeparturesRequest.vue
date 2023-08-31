<template>
  <b-container fluid class="info-status-btn text-center">



    <b-button-group
      size="xs"
      class="st"
      :class="departure.prices.promotion != null ? 'mt-2' : ''"
    >
      <!-- BOTON MODAL WAITING LIST -->
      <b-button
        variant="primary"
        @click="showModalWaitingList"
        class="ml-1"
        data-toggle="tooltip" data-placement="top" :title=title(departure.numberWaitingList)
      >
        <span class="size-text">{{ departure.numberWaitingList }}</span>
      </b-button>
      <!-- FIN BOTON MODAL WAITING LIST -->

      <!-- BOTON MODAL REQUEST -->
      <b-button
        variant="info"
        :disabled="departure.numberRequests == 0"
        @click="handleRequests"
      >
        <span class="size-text">{{ departure.numberRequests }}</span>
      </b-button>

    </b-button-group>

    <!-- MODAL WAITING LIST -->
    <b-modal
      ref="my-modal-waiting-list"
      hide-footer
      size="lg"
      ok-variant="secondary"
      ok-only
      ok-title="Close"
      content-class="custom-price"
    >
      <template #modal-header>
        <b-col lg="12">
          <b-row>
            <b-col class="h5">
              <i class="glyph-icon iconsminds-ship"></i>
              {{ departure.cruName }} Waiting List
            </b-col>

            <formated-dates
              :startDate="departure.depStartDate"
              :endDate="departure.depEndDate"
            >
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



  </b-container>
</template>

<script>
import DepartureServices from "@/services/gps/departures/DeparturesServices";
import totalSlots from "@/mixins/availability/totalSlots";
import roles from "@/mixins/roles/roles";
import moment from "moment";

export default {
  name: "DeparturesRequest",
  mixins: [totalSlots, roles],
  props: ["departure", "selected"],

  components: {

    DepartureRequestsLog: () => import('@/views/app/gps/availability/departures/DepartureRequestsLog'),

  },

  data() {
    return {
      isLoading: false, // control para indicar proceso en ejecucion
      isEmpty: false, // control para empty state
      isBusy: false, // indica que hay una accion en ejecucion
      //
      showModalRequests: false, // toggle modal request control
      //
      dataRequestsLog: []
    };
  },

  computed: {

  },

  watch: {

  },

  methods: {
    title(numberWaitingList){
        return `${this.$t('gps.tooltips.waiting-list') +': '+ numberWaitingList}`
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

    async handleRequests() {

      this.dataRequestsLog = []

      const { data } = await DepartureServices.getRequestsLog({ depId: this.departure.depId })

      this.dataRequestsLog = data

      this.showModalRequests = true


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
</style>
