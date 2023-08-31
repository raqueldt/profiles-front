<template>
  <div class="container-fluid">
    <!-- <h1>BookId: {{bokId}}</h1>
    <h1>depId: {{depId}}</h1>
    <h1>clientId: {{clientId}}</h1>
    <h2>Datos: {{arrayUpdate.length}}</h2> -->

    <div v-if="this.itemSlots || this.itemSlots !== undefined">
      <b-row>
        <b-colxx xxs="12">
          <breadcrumb-layout :heading="$t('gps.edit-booking')"></breadcrumb-layout>
        </b-colxx>
      </b-row>
      <div class="row">
        <div class="w-100 h-100">

          <!-- <div class="row justify-content-center align-items-center text-center h-100" v-if="!loading"
            style="min-height:100vh; ">
            <b-spinner style="width: 5rem; height: 5rem;" label="Large Spinner" variant="primary"></b-spinner>
          </div> -->

          <div class="row justify-content-center align-items-center text-center h-100" style="min-height:100vh; " v-if="!loading">           
              <b-col lg="12">
                  <b-spinner style="width: 5rem; height: 5rem;"  variant="primary" label="Loading..."></b-spinner><br><br>
                  <strong class="mt-3 h3">Loading information. Please wait..! </strong>  
              </b-col>
          </div>
          <div v-else>

            <div class="container-fluid">
              <div class="row w-100">

                <b-col lg="6 m-0">

                  <!-- CABECERA CON DATOS DE HEADER -->
                  <b-col lg="12">

                    <div class="card py-3 px-4 w-100 mb-2">
                      <b-row class="row justify-content-center align-items-center">

                        <div class="col-lg-12">
                          <b-button @click="$router.go(-1)" class="btn-sm border-0"
                            v-tooltip="{content: 'Back', placement: 'top'}" variant="outline-primary">
                            <i class="glyph-icon iconsminds-left-1"></i>
                          </b-button>
                          <div class="d-inline" v-if="Boolean(arrayUpdate[0])">
                            <formated-range-date :startDate="arrayUpdate[0].bookingData.depStartDate"
                              :endDate="arrayUpdate[0].bookingData.depEndDate">
                            </formated-range-date>
                          </div>
                          <hr>
                        </div>

                        <div class="col-lg-12 quote-header">

                          <b-row class="w-100" v-if="Boolean(arrayUpdate[0])">
                            <b-col lg="4" class="text-muted pr-0">Cruise:</b-col>
                            <b-col class="pl-0" lg="8">{{ arrayUpdate[0].bookingData.cruName }}</b-col>
                            <b-col lg="4" class="text-muted pr-0">Client:</b-col>
                            <b-col class="pl-0" lg="8">{{ arrayUpdate[0].bookingData.bokClientName }}</b-col>
                            <b-col lg="4" class="text-muted pr-0">Reference:</b-col>
                            <b-col class="pl-0" lg="8">{{  arrayUpdate[0].bookingData.bokReference}}</b-col>
                            <b-col lg="4" class="text-muted pr-0">Time limit:</b-col>
                            <b-col class="pl-0" lg="8">{{                         
                            moment(arrayUpdate[0].bookingData.bokTimeLimit).format("DD MMM YYYY, ddd h:mm ")                        
                          }}</b-col>

                          <!-- PROMOCIONES -->
                          <!-- v-if="promotions.length > 0" -->
                          <!-- <template v-if="promotions && promotions['rseReference']"> -->                         
                          <template v-if="promotions.length > 0">
                          <b-col lg="4" class="text-muted pr-0">Active Promotion:</b-col>
                          <b-col class="pl-0" lg="8">

                              <b-button variant="link" class="p-0 m-0  d-block text-left" v-b-modal.modaldetailpromotion>
                                <span
                                  v-tooltip="{content: 'Show extra information about this promotion', placement: 'top', classes: ['itineraries'],}">
                                  {{ promotions.map(x => x.rseReference).toString() }}
                                </span>
                                <small class="text-muted d-block text-left">(This promotion applies only to new slots)</small>
                              </b-button>
                          </b-col>

                              <b-modal v-if="promotions.map(x => x.rseId).toString()" id="modaldetailpromotion" size="md" :title="'Detail Promotion'"
                                hide-footer>
                                <detail-promotion-departure :rseId="promotions[0]"></detail-promotion-departure>
                              </b-modal>
                            </template>  
                          
                            <!-- FIN PROMOCIONES -->


                          </b-row>
                        </div>


                      </b-row>
                    </div>
                  </b-col>
                  <!-- FIN CABECERA CON DATOS DE HEADER -->

                  <!-- SLOTS DISTRIBUTIONS -->
                  <div class="col-lg-12">
                    <slotsdistributionedit v-if="arrayUpdate.length > 0"
                      :cruPaxLimit="itemSlots.cruPaxLimit ? itemSlots.cruPaxLimit : 16" 
                      :sendHeader="sendHeader"
                      :depId="depId" :bokId="bokId" 
                      :clientId="clientId" 
                      :sendArrayUpdate="arrayUpdate"
                      :longChoosenSlots="longChoosenSlots" 
                      :flagEndUpdateConditions="flagEndUpdateConditions" 
                      @toParentSendAllotment="dataAllotment"
                      @toParentSendConfirmation="dataConfirmation" 
                      @toParentSendChoosenSlot="dataChoosenSlot"
                      @toParentSendCharter="dataCharter" 
                      @toParentProcessUncheck="dataProcessUncheck">
                    </slotsdistributionedit>
                  </div>
                  <!-- SLOTS DISTRIBUTIONS -->
                </b-col>

                <div class="col-lg-6 p-0">
                  <slotssummaryedit v-if="arrayUpdate.length > 0  && sendChoosenSlot.length > 0"
                    :depStartDate = arrayUpdate[0].bookingData.depStartDate
                    :depEndDate = arrayUpdate[0].bookingData.depEndDate
                    :depId="itemSlots.depId" 
                    :bokId="bokId" 
                    :clientId="clientId" 
                    :sendHeader="sendHeader"
                    :sendCharter="sendCharter" 
                    :sendArrayUpdate="arrayUpdate" 
                    :longChoosenSlots="longChoosenSlots"
                    :sendChoosenSlot="sendChoosenSlot" 
                    :sendAllotment="sendAllotment"
                    :sendConfirmation="sendConfirmation" 
                    :sendProcessUncheck="sendProcessUncheck"
                    :originalDataFromEditBooking="originalDataFromEditBooking"
                    @toParentSendDiscount="dataDiscount" 
                    @toParentSendSummary="dataSummary"
                    @updateBookingIva="updateBookingIva"
                    @endUpdateConditions="endUpdateConditions"
                    >
                  </slotssummaryedit>
                </div>

              </div>

            </div>

          </div>





        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import AvailabilityServices from "@/services/gps/availability/availabilityServices.js";
  import AvailabilityslotsServices from "@/services/gps/availabilityslots/availabilityslotsServices.js";
  import FormatedRangeDate from "../../components/FormatedRangeDate.vue";
  export default {
    name: "SlotsParentEdit",
    props: ["bokId", "depId", "clientId"],
    components: {
      ItineraryInfoModal: () => import("@/views/app/gps/availability/components/ItineraryInfoModal"),
      FormatedRangeDate
    },
    data() {
      return {
        //depId : 0, //
        showComponents: "",
        item: [], //
        roleUser: {}, //this.$store.getters.currentUser.roles[0].id, //desactivado temporalmente
        sendTotalNetRate: "",
        sendDiscount: "",
        sendCharter: "",
        sendChoosenSlot: [],
        sendHeader: [],
        sendAllotment: "",
        sendConfirmation: "",
        sendSummary: [],
        sendProcessUncheck: "",
        itemSlots: [],
        arrayUpdate: [],
        longChoosenSlots: "",
        average: "",

        loading: false,
        promotions: [],
        originalDataFromEditBooking:[],
        flagEndUpdateConditions: false
        //rowDataChoosenEdit: [],
        //clientId: ''
      };
    },
    async created() {
      await this.getEditDataSlots();
    },
    async mounted() {
      await this.getAvailabilityDeparture();
      await this.checkInitialItemFromStorage();
      await this.loadPromotions();
    },
    computed: {
      departureStartDate: function () {
        //return moment(this.itemSlots.depStartDate, "YYYY-MM-DD").format( "MMM DD YYYY, ddd" )
        return this.itemSlots.depStartDate;
      },
      departureEndDate: function () {
        //return moment(this.itemSlots.depEndDate, "YYYY-MM-DD").format( "MMM DD YYYY, ddd" )
        return this.itemSlots.depEndDate;
      },
      rowDataChoosenEdit: {
        get() {
          return this.$store.getters.getRowDataChoosen(this.depId);
        }
      },
      getOverallScore: function () {
        var i;
        var sum = 0;
        // Will get all reviews through API calls
        for (i = 0; i < this.rowDataChoosenEdit.length; i++) {
          sum = sum + this.rowDataChoosenEdit[i].score;
        }
        this.average = Number.parseFloat(
          sum / this.rowDataChoosenEdit.length
        ).toFixed(2);
        return Number.parseFloat(sum / this.rowDataChoosenEdit.length);
      }
    },
    methods: {
      formatDate(fecha) {
        return moment(fecha).format("DD MMM YYYY, ddd h:mm");
      },
      loadProgressBar(rowDataChoosenLength, longChoosenSlots) {
        if (!Boolean(this.showComponents)) {
          if (rowDataChoosenLength != longChoosenSlots) {
            return true;
          }
          if (rowDataChoosenLength == longChoosenSlots) {
            this.showComponents = true;
          }
          this.showComponents = true;
        }
      },
      errorMessageSlots(){
          var type = "error filled";
          var title = "Error";
          var mensaje = "No Slots loaded correctly. Please try again or contact with Administrator";
          this.$notify(type, title, mensaje, {
            duration: 6000,
            permanent: false
          });
      },
      async getEditDataSlots() {
        const bokId = this.bokId;
        if (!bokId) return;
        const {
          data
        } = await this.$store.dispatch("getAllDataBoking", bokId);
        if (Boolean(data)) {
          let header = data.bookingData;
          let slots = data.slots;

          // Validación de mensaje en caso de que slots no traiga correctamente
          // (generalmente sucede cuando los slots tienen deleted_at diferente de nulo)
          if(!Boolean(slots) || slots.length === 0){
            this.errorMessageSlots();
            return true;
          }

          //console.log("slots: " + JSON.stringify(slots.map(a => a.avsId)));
          if (header && slots.length > 0) {
            var arrayUpdateSlots = [];
            arrayUpdateSlots.push(data);
            this.$store.commit("setArrayUpdate", arrayUpdateSlots);
            sessionStorage.setItem("setArrayUpdate", JSON.stringify(arrayUpdateSlots));
            //Longitud total de slots seleccionados
            var slots_selected = arrayUpdateSlots.map(a => a.slots);
            var selectedSlotsOnlyVslId = slots_selected[0]
              .filter(a => a.bosStatus == 1 || a.bosStatus == 2)
              .map(a => a.avsId);
            this.longChoosenSlots = selectedSlotsOnlyVslId.length;
            this.arrayUpdate = arrayUpdateSlots;
            this.originalDataFromEditBooking = arrayUpdateSlots;
            this.sendHeader = header;
            //console.log("arrayUpdate" + JSON.stringify(this.arrayUpdate.map(a => a.bookingData).map(a => a.slots)));
            // Desde BDD, viene valor 'true o 'false'. Se convierte a boolean
            this.sendHeader.headerIva === 'true' ? this.sendHeader.headerIva = true : this.sendHeader.headerIva =
              false;
            //console.log("1. Datos arrayUpdate: " + this.arrayUpdate.length);

            this.loading = true;
          }
        } else {
          var type = "error filled";
          var title = "Error";
          var mensaje = "No Data Loaded. Please refresh page";
          this.$notify(type, title, mensaje, {
            duration: 3000,
            permanent: false
          });
        }
        return true;
      },
      // 2021-07-14 | fg | informacion + disponibilidad de una salida especifica
      async getAvailabilityDeparture() {
        AvailabilityServices.getAvailabilityDeparture(this.depId)
          .then(response => (this.itemSlots = response.data.data))
          .catch(error => console.log("ERROR DEPARTURE AVAILABILITY ", error))
          .finally(() => (this.showComponents = false));
      },
      //*********** Metodo para revisar variable guardada en sessionStorage *************** */
      checkInitialItemFromStorage() {
        if (this.item) this.itemSlots = this.item;
        else this.itemSlots = JSON.parse(sessionStorage.getItem("slotsParent"));
      },
      //*********** Fin Metodo para revisar variable guardada en sessionStorage *************** */
      hideModal(refname) {
        this.$refs[refname].hide();
        if (refname === "modalnestedinline") this.$refs["modalnested"].show();
      },
      dataAllotment(data) {
        if (data) this.sendAllotment = data;
        else this.sendAllotment = false;
      },
      dataConfirmation(data) {
        if (data) this.sendConfirmation = data;
        else this.sendConfirmation = false;
      },
      dataDiscount(data) {
        if (data.length > 0) this.sendDiscount = data;
        else this.sendDiscount = [];
      },
      dataChoosenSlot(data) {
        if (data.length > 0) this.sendChoosenSlot = data;
        else this.sendChoosenSlot = [];
      },
      dataCharter(data) {
        if (data) this.sendCharter = data;
        else this.sendCharter = false;
      },
      dataProcessUncheck(data) {
        if (data) this.sendProcessUncheck = data;
        else this.sendProcessUncheck = false;
      },
      dataHeader(data) {
        if (data) this.sendHeader = data;
        else this.sendHeader = {};
      },
      dataSummary(data) {
        if (data) this.sendSummary = data;
        else this.sendSummary = {};
      },
      //2021-08-16 | fg
      updateBookingIva(hasIva) {
        this.sendHeader.headerIva = hasIva;
      },
      //2021-08-16 | fg
      endUpdateConditions(data) {
        this.flagEndUpdateConditions = data;
      },      
      async loadPromotions() {
        this.promotions = []
        const depId = this.depId;
        if(Boolean(depId)){
            try {
              const { data } = await AvailabilityslotsServices.promotionByDeparture( depId )
              if([data].length > 0){
                this.promotions = [data].filter(f => f.rseActive === 1 && f.rseStatus === 1)   // Trae la promoción activa
              }
            } catch (error) {
              console.log("UNEXPECTED", error)
            }
        }
      },       
      //
    },
  };

</script>
