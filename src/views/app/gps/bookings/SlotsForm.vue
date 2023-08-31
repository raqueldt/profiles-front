<template>
  <b-container fluid class="mb-2">

    <template v-if="getLoadingState">
      <b-skeleton></b-skeleton>
    </template>

    <b-card-group deck class="">
      <b-card class="pb-2">
        <!-- <pre>{{itemDeparture}}</pre>
        <pre>{{sendSummary}}</pre> -->
        <!-- <pre>{{itemDeparture}}</pre> -->

        <!-- info cliente -->
        <b-row>
          <b-col lg="4" md="12" xs="12">
            <!-- cliente -->
            <b-form-group
              label="Client"
              label-cols="2"
              label-cols-lg="3"
              label-size="sm"
            >
              <v-select
                v-model="header.headerCompany"
                :options="filterCompany"
                placeholder="Select client"
                label="razon_social"
                item-value="header.headerCompany"
                item-text="razon_social"
                :disabled="this.holdAnotherMode"
                @input="setPercentFromClient()"
              />
            </b-form-group>
          </b-col>

          <b-col lg="4" md="12" xs="12" cols="12">
            <!-- email -->
            <b-form-group
              id="input-group-email"
              label="Email address"
              label-for="input-email"
              label-cols="2"
              label-cols-lg="3"
              label-size="sm"
            >
              <!-- limite real base datos 150 caracteres -->
              <!-- v-model="header.headerCompany.email" -->
              <b-form-input
                v-model.trim="$v.header.headerCompany.email.$model"
                :state="!$v.header.headerCompany.email.$error"
                id="input-email"
                type="email"
                placeholder="Enter email"
                maxlength="50"
                autocomplete="off"
                required
              ></b-form-input>
            </b-form-group>
            <b-col class="text-danger p-0 mb-2" v-if="$v.header.headerCompany.email.$anyError">Please enter a valid email address</b-col>
          </b-col>

          <b-col  lg="4" md="12" xs="12" cols="12">
            <!-- client discount -->
            <b-form-group
              id="input-group-discount"
              label="Client discount"
              label-for="input-discount"
              label-cols="2"
              label-cols-lg="3"
              label-size="sm"
            >
              <b-form-input
                v-model="header.headerPercent"
                disabled
                id="input-discount"
                type="number"
                min="0"
                max="100"
                maxlength="2"
                @keypress="onlyNumber"
                required
                class="sm p-0 d-inline text-center"
              ></b-form-input>


              <!-- modal update client discount -->
              <slots-modal-change-percent
                v-model="header.headerPercent"
                :headerPercent=header.headerPercent
                @addNewPercent="value => formNewPercent = value"
                @changePercent="value => header.headerPercent = value"
                @setOriginalPercent="header.headerPercent = originalClientPercent"
                @addNewReason="value => formNewReason = value"
              />

            </b-form-group>
          </b-col>

        </b-row>

        <hr class="mt-0 mb-2" style="border-top: 1px solid #f5f5f5;" />

        <!-- referencia / timelimit  -->
        <b-row>
          <b-col lg="4"  md="12" xs="12">
            <b-form-group
              id="input-group-reference"
              label="Reference"
              label-for="input-reference"
              label-cols="2"
              label-cols-lg="3"
              label-size="sm"
            >
              <!-- limite real base datos 150 caracteres -->
              <b-form-input
                v-model="header.headerReference"
                id="input-reference"
                placeholder="Enter reference"
                maxlength="120"
                autocomplete="off"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col lg="7" md="12" xs="12"  cols="12">
            <b-row >
              <!--  Timelimit section  -->
              <b-col  lg="5"  md="12" xs="12" cols="12">
                <b-form-group
                  label="Timelimit"
                  description=""
                  label-cols="2"
                  label-cols-lg="3"
                  label-size="sm"
                  :class="formatTextTimeLimit()"
                >
                <!-- v-if="Boolean(header) && Boolean(header.headerTimeLimitMessage)" -->
                  <datepicker
                    :bootstrap-styling="true"
                    v-model="header.headerDateLimit"
                    format="D, dd MMM yyyy"
                    :min="now"
                    :disabled-dates="disabledDates"
                  ></datepicker>
                </b-form-group>
              </b-col>

              <b-col lg="7" md="12" xs="12" class="px-1 text-center hide-mobile" >
                <b-row>
                  <b-col lg="5"  md="12" xs="12"  cols="12"  class="px-3">
                    <b-form-group class="d-inline">
                      <b-form-timepicker
                        class="md"
                        v-model="header.headerTimeLimit"
                        disabled
                      ></b-form-timepicker>
                      
                    </b-form-group>
                    <small class="text-muted text-left mt-1 small d-inline">GMT - 05:00</small>
                  </b-col>
                  <!-- <b-col  lg="3" md="4" xs="4"  cols="4"  class="pl-1 center-title-mobile">
                    <small class="text-muted text-left mt-1 small">GMT - 05:00</small>
                  </b-col> -->
                </b-row>
              </b-col>

            </b-row>
          </b-col>

          <b-col  lg="1"  md="12" xs="12" class="center-title-mobile">
 
                    <!-- BOTON WAITING LIST -->
                      <b-button variant="primary" @click="showModalWaitingList" class="ml-1" size="xs"
                          :disabled="itemDeparture.numberWaitingList < 1"
                          v-tooltip="{content: `${$t('gps.tooltips.waiting-list')} `, placement: 'top', classes: ['itineraries'],}">
                          <i class="glyph-icon simple-icon-book-open"></i> {{itemDeparture.numberWaitingList}}
                      </b-button>
                    <!-- BOTON WAITING LIST -->
                  
          </b-col>
        </b-row>

        <!-- MENSAJES DE ALERTA DE TIME LIMIT-->
        <center>
        <b-alert class="w-50" variant="primary" show v-if="Boolean(header) && Boolean(header.headerTimeLimitMessage)">
          <div class="glyph-icon iconsminds-check d-inline mr-1"></div>
          {{header.headerTimeLimitMessage}}
        </b-alert>
        </center>
        <!-- FIN MENSAJES DE ALERTA DE TIME LIMIT-->

        <!-- MENSAJES DE AYUDA AL USUARIO A INGRESAR LA INFORMACION -->

        <center class="mt-2">
        <b-alert class="w-50 warning-message-mobile" variant="primary" show v-if="header.headerCompany.length === 0">
          <div class="glyph-icon iconsminds-check d-inline mr-1"></div> Please select a <b>Client</b>
        </b-alert>
        <b-alert class="w-50 warning-message-mobile" variant="primary" show v-else-if="!Boolean(header.headerCompany.email) || $v.header.headerCompany.email.$anyError">
          <div class="glyph-icon iconsminds-pen d-inline mr-1"></div>Please type an <b>Email</b>
        </b-alert>
        <b-alert class="w-50 warning-message-mobile" variant="primary" show v-else-if="!Boolean(header.headerReference)">
          <div class="glyph-icon iconsminds-pen d-inline mr-1"></div>Now, please type a <b>Reference</b>
        </b-alert>
        </center>

        <!-- FIN MENSAJES DE AYUDA AL USUARIO A INGRESAR LA INFORMACION -->

      </b-card>
    </b-card-group>

    <!-- (No eliminar debido a que la condición v-if actua como "listener" de la propiedad checkConditionInNextButton) -->
    <!-- CARD LISTENER -->
    <b-card-group deck class="rounded d-none">
      <b-card header-tag="header">
        <b-colxx md="3" class="total-reg" v-if="!checkConditionInNextButton">
        </b-colxx>
      </b-card>
    </b-card-group>
    <!-- FIN CARD LISTENER -->

    <!-- MODAL RESUMEN -->
    <b-modal
      id="slotsmodalresume"
      size="md"
      ref="slotsmodalresume"
      :title="'Orders Summary'"
    >
      <div slot="modal-title" class="w-100 text-center">
        <b-container fluid>
          <span>Order Summary</span>
        </b-container>
      </div>

      <!-- BOTONES PARA MODAL DE CLICK EN NEXT -->
      <slotsmodalresume
      :depId="depId"
      :displayMessage="displayMessage"
      ></slotsmodalresume>

      <!-- Spinner para mostrar una vez que se hace click en Hold o hold & Custom -->
      <div class="d-flex justify-content-center mb-3" v-if="loading">
          <div class="intersecting-circles-spinner">
            <div class="spinnerBlock">
              <span class="circle"></span>
              <span class="circle"></span>
              <span class="circle"></span>
              <span class="circle"></span>
              <span class="circle"></span>
              <span class="circle"></span>
              <span class="circle"></span>
            </div>
          </div>
      </div>
      <!-- Fin Spinner para mostrar una vez que se hace click en Hold o hold & Custom -->
      <!-- displayMessage: {{displayMessage}} -->
      <template slot="modal-footer">

        <template v-if="!displayMessage">

          <div v-if="isProccessingCustomQuote || isProccessingComplete" class="text-primary text-center w-100 h5">

            <b-spinner small label="Small Spinner"></b-spinner> Processing
          
          </div>
          <div v-else>
            <b-button 
                class="btn-xs" variant="primary" @click="saveComplete()">  
                {{ $t("gps.hold")}}              
              </b-button>

              <b-button 
              class="btn-xs" variant="primary" @click="saveCustomQuote()">
              {{ $t("gps.custom-hold")}}
              </b-button>

              <b-button
                class="btn-xs"
                variant="secondary"
                @click="hideModal('slotsmodalresume')"
                >
                {{ $t("gps.close") }}
                </b-button>
          </div>
          
                <!-- <b-button 
                :disable="isProccessingCustomQuote"
                class="btn-xs" variant="primary" @click="saveComplete()">
                
                <span v-if="isProccessingComplete">
                  <b-spinner small label="Small Spinner"></b-spinner> Processing
                </span>
                <span v-else> {{ $t("gps.hold")}} </span>

              </b-button>

              <b-button 
              :disable="isProccessingCustomQuote || isProccessingComplete"
              class="btn-xs" variant="primary" @click="saveCustomQuote()">
              
                <span v-if="isProccessingCustomQuote">
                  <b-spinner small label="Small Spinner"></b-spinner> Processing
                </span>
                <span v-else> {{ $t("gps.custom-hold")}} </span>

              </b-button>

              <b-button
                :disable="isProccessingCustomQuote || isProccessingComplete"
                class="btn-xs"
                variant="secondary"
                @click="hideModal('slotsmodalresume')"
                >
                {{ $t("gps.close") }}
                </b-button> -->

        </template>
        <template v-else>
          <b-button variant="outline-primary"
              v-tooltip="{content: 'Copy information (For best experience, use Chrome browser)', placement: 'top'}"
              class="pull-right"
              @click.prevent="copyTable()">Copy
            </b-button>
            <b-button
                  variant="primary"
                  @click="goToAvailability()"
                >
                  Finish
                </b-button>
        </template>


      </template>

      <!-- BOTONES PARA MODAL DE CLICK EN NEXT -->
    </b-modal>
    <!-- FIN MODAL RESUMEN -->

<!-- WAITING LIST -->
    <b-modal ref="my-modal-waiting-list"  size="lg" ok-variant="secondary" ok-only ok-title="Close"
      content-class="custom-price">
      <template #modal-header>
        <b-col lg="12">
          <b-row>
            <b-col class="h5">
              <i class="glyph-icon iconsminds-ship"></i>  Waiting List
            </b-col>
          </b-row>
        </b-col>
      </template>
          <!-- <table-waiting-list :depId="depId" ref="waitingList"></table-waiting-list>    -->
      <b-row>
        <b-col lg="7">
          <table-waiting-list :item="waitingListActive" tag="Active" @reloadWaitingList="getWaitingList"></table-waiting-list>
        </b-col>
        <b-col lg="5">
          <table-waiting-list :item="waitingListInActive" tag="Inactive" @reloadWaitingList="getWaitingList"></table-waiting-list>
        </b-col>
      </b-row>

    </b-modal>
<!-- FIN WAITING LIST -->

  </b-container>
</template>

<script>

import importComponents from "../../../../importComponents.vue";
import InputTag from "../../../../components/Form/InputTag";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import moment from "moment";
import Switches from "vue-switches";
import Datepicker from "vuejs-datepicker";
import slotsConditions from "../../../../mixins/slots/slotsConditions.js";

import { EventBus } from "../../../../eventBus/event-bus";
import WaitingListServices from "../../../../services/gps/waitinglist/WaitingListServices.js";
import GrupoCotizacionesServices from "@/services/gps/grupocotizaciones/GrupoCotizacionesServices.js";
import AvailabilityslotsServices from "@/services/gps/availabilityslots/availabilityslotsServices.js";
import MailServices from "@/services/gps/mail/MailServices.js";
import BookingServices from "@/services/gps/booking/BookingServices.js";
import { mapState, mapGetters, mapMutations } from "vuex"
import { daysAfterToday, resolveTimeLimit } from "@/utils/common"
import { validationMixin} from "vuelidate";
const { required, email} = require("vuelidate/lib/validators");

export default {
  name: "SlotsForm",
  mixins: [validationMixin, slotsConditions],
  components: {
    "input-tag": InputTag,
    "v-select": vSelect,
    switches: Switches,
    datepicker: Datepicker
  },
  props: [
    "sendTotalNetRate",
    "sendDiscount",
    "sendChoosenSlot",
    "itemDeparture",
    "sendSummary",
    "sendAllotment",
    "depId"
  ],
  validations(){
            return{
                header: {
                  headerCompany: {
                    email: {
                      email
                    }
                    },
                },
            }
        },
  data() {
    return {
      isProccessingCustomQuote : false,
      isProccessingComplete : false,
      now: moment().format("YYYY-MM-DD"),
      loading: false,
      hoy: moment().format("YYYY-MM-DD"),
      limitDias: "",
      fechaSugerida: "",
      moment: moment,
      // filterCompany: [],
      filterPercent: [],
      header: {
        headerCompany: [], //[]
        headerPercent: "",
        // headerEmail: this.$store.getters.currentUser.email,
        headerEmail: null,
        roleUser: this.$store.getters.currentUser.roles[0].id,
        headerReference: "",
        headerTimeLimit: "12:00:00",
        headerDateLimit: "",
        headerIva: "",
        headerTimeLimitMessage: "",
      },
      disabledDates: {
        to: "",
        from: "",
        days:[6,0]
      },
      totalFromSummary: "",
      showModalResume: false,
      requestCliId: "",
      rowSummary: [],
      holdAnotherMode: false,

      formNewPercent: "",
      formNewReason: "",
      originalClientPercent:"",

      waitingListActive:"",
      waitingListInActive:"",

      message : "Your hold has been saved",
      displayMessage: false
    };
  },

  watch: {
    // Allotments: En caso de activarse, elimina fecha de time limit
   sendAllotment: {
      deep: true,
      handler: function(val) {
        if(Boolean(val)) {
          this.header.headerDateLimit = null;
          this.header.headerTimeLimit = "12:00:00"
         }
        else {
          this.setInitialTimeLimit()
          this.header.headerTimeLimit = "12:00:00"
        }
      }
    },
    header: {
      deep: true,
      handler: function(val) {
        this.$emit("toParentSendHeader", val);
      }
    },
    sendSummary: {
      deep: true,
      handler: function(val) {
        this.totalFromSummary = val.summaryTotalNetRate;
      }
    },

    itemDeparture: {
      deep: true,
      handler: function(departure) {
        this.setInitialTimeLimit()
        this.setDisabledDates()

      },
      immediate: true
    },

    depId: function () {
      if(Boolean(this.$refs.waitingList)){
        var lista = this.$refs.waitingList.getWaitingList(this.depId);
      }
    }

  },
  computed: {

    ...mapState("slots", ["isSaveHold"]),
    ...mapGetters(["currentUser"]),
    ...mapGetters('booking-module', ['getLoadingState']),




    checkTimeLimit() {
      /*
      Verifico time limit. Si no existe fecha, lanzo mensaje y habilito "disableDates"
      en date picker para 3 años. Caso contrario, continuo con la habilitación para 1 dia
      */
      if(Boolean(this.header)){
        if(this.header.headerDateLimit !== null && this.header.headerTimeLimit !== null) {
          this.header.headerTimeLimitMessage = "";
          this.setDisabledDates();
          return false
        }
        else {
          this.header.headerTimeLimitMessage = this.$t('gps.time-limit-message');
          this.setDisabledDatesForTimeLimit();
          return true;
        }
      }
    },

    checkConditionInNextButton() {
      //Valido que no existan valores de offNetRate en 0 para evitar conflictos al momento de guardar
      var checkNullValuesInRate = this.rowDataChoosenByDepId
        .map(x => ({ newOffNetRate: x.newOffNetRate }))
        .some(e => e.newOffNetRate === "0.00");
      if (
        this.rowDataChoosenByDepId.filter(item => item.bosStatus == null || item.bosStatus == 3).length !== 0 &&
        this.header.headerCompany.length !== 0 &&
        this.header.headerReference !== "" &&
        Boolean(this.sendSummary) &&
        this.sendSummary.summarySubtotalNetRate > 0 &&
        !this.checkTimeLimit &&
        !checkNullValuesInRate
      ) {
        EventBus.$emit("checkConditionInNextButton", false);
        return false;
      } else {
        EventBus.$emit("checkConditionInNextButton", true);
        return true;
      }
    },

    rowDataChoosenByDepId: {
      get() {
        return this.$store.getters.getRowDataChoosen(this.depId);
      }
    },

    filterCompany: {
      get() {
        return this.$store.getters.getInitialCompanyList;
      },
      set(value) {
        this.value = value;
      }
    },

    rowDataHeaderAndSummarySlotsByDepId: {
      get() {
        return this.$store.getters.getRowDataHeaderAndSummarySlotsByDepId(
          this.depId
        );
      },
      set(value) {
        this.value = value;
      }
    },

    rowDataByDepId: {
      get() {
        return this.$store.getters.getRowDataByDepId(this.depId);
      }
    },

    // 2021-08-06 | fg | Definir fecha y hora de timelimit

    bookingDateTimeLimit() {
      if (Boolean(this.header)) {
        const dateLimit = moment(this.header.headerDateLimit).format(
          "YYYY-MM-DD"
        );

        const dateTimeLimit = `${dateLimit} ${this.header.headerTimeLimit}`;

        return dateTimeLimit;
      }
    }
  },

  methods: {
    ...mapMutations(["showSaveHold", "hideSaveHold"]),

      formatDate(fecha) {
        return moment(fecha).format('MMMM Do, YYYY -  h:mm')
      },
      showModalWaitingList() {
        this.$refs["my-modal-waiting-list"].show();
      },
      closeModalWaitingList() {
        this.$refs["my-modal-waiting-list"].hide();
      },
    formatTextTimeLimit(){
      if (Boolean(this.header) && Boolean(this.header.headerTimeLimitMessage))
      return 'text-primary';
    },
    onlyNumber($event) {
      //console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },

    hold() {
      this.saveHeaderAndSummary();
    },

    saveCustomQuote() {
      this.isProccessingCustomQuote = true;
      this.processCustomQuote();
      this.clearRowDataHeaderAndSummaryByDepId();
      this.clearRowDataChoosenByDepIdAfterHold();

    },

    saveComplete() {
      this.isProccessingComplete = true;
      this.processComplete();
      this.clearRowDataHeaderAndSummaryByDepId();
      this.clearRowDataChoosenByDepIdAfterHold();

    },
    copyTable(){
        var el = document.getElementById('table-summary');
        var body = document.body,
          range,
          sel;
        if (document.createRange && window.getSelection) {
          var trs = el.getElementsByTagName("tr");
          el.style.border = 'solid 1px #f3f3f3';
          el.style.width = '100%';
          el.style.fontFamily = 'Arial';
          el.style.fontSize = '12px';

          // PARA ALTERNAR COLORES ENTRE FILAS
          var elements = document.querySelectorAll("tr:nth-child(even)");
          for (i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = "#f3f3f3";
          }

          for(var i = 0; i < trs.length; i++) {
            var ths = trs[i].getElementsByTagName("th");
            for(var j = 0; j < ths.length; j++) {
              ths[j].style.border = 'solid 1px #f3f3f3';
            }
          }
          range = document.createRange();
          sel = window.getSelection();
          sel.removeAllRanges();
          try {
            range.selectNodeContents(el);
            sel.addRange(range);
          } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
          }
        } else if (body.createTextRange) {
          range = body.createTextRange();
          range.moveToElementText(el);
          range.select();
        }
        document.execCommand("Copy");
        this.showCopyMessage();
      },
      showCopyMessage(){
        var type = "success filled";
        var title = "Copied";
        var mensaje = "";
        this.$notify(type, title, mensaje, {
          duration: 750,
          permanent: false
        });
      },


    saveHeaderAndSummary() {
      let itemDeparture = this.itemDeparture;
      let header = this.header;
      let summary = this.sendSummary;
      itemDeparture = { ...itemDeparture, header, summary };
      this.rowSummary = itemDeparture;
      this.$store.commit("setRowDataHeaderAndSummarySlots", itemDeparture);
    },

    displayErrorCombinedMessage(){
      var type = "error filled";
      var title = "Error";
      var mensaje = "There is a problem with the space(s) to save. Please contact with Administrator";
      this.$notify(type, title, mensaje, {
        duration: 5500,
        permanent: false
      });
    },

    async validateErrorPreviousBlocking(data){

    // ------------------------ Chequeo inicial de itinearios combinados por avsId ----------------------
    // 1. Extraigo avsId
    var arrayByAvsId = data.map(x => x.avsId);
    // 2. Por loop, consumo API para verificar errores:
    var numberErrors = [];
      for await (var item of arrayByAvsId) {
        await  AvailabilityslotsServices.validateErrorCombinedItineraries(item)
          .then((response) => {
            let respuesta = response.data.data;
            if (respuesta === 0) numberErrors.push(item);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      return await numberErrors.length;
    // ------------------------ Fin Chequeo inicial de itinearios combinados por avsId ----------------------
    },

    async processCustomQuote() {
      this.loading = true;
      var self = this;
      let data = this._buildHeaderAndSummaryArray("new");

      // 2021-09-15 | fg | establecer referencia al id del grupo de cotizacion y request
      const { gct, req } = this.$route.query;
      const gctId = gct ?? 0;
      const reqId = req ?? 0;
      const clientDiscount = +this.formNewPercent ?? null // 2022-11-10 | fg | enviar comision modificada
      data.push({ gctId, reqId, clientDiscount });
      const process = "custom-quote";
      data.push({ process });

      // ------------------------ Chequeo inicial de itinearios combinados por avsId ----------------------
      var numberErrors = await this.validateErrorPreviousBlocking(data[1]);
      if(numberErrors > 0) {
          this.displayErrorCombinedMessage();
          this.loading = false;
          this.hideModal('slotsmodalresume');
      }
      else{
      // ------------------------ Fin Chequeo inicial de itinearios combinados por avsId ----------------------
            this.$store.dispatch("addBookingPreHold", data).then(payload => {
              if(payload.data === 'previously blocked'){
                  var type = "error filled";
                  var title = "Atention";
                  var mensaje = "Slots preblocked previously. Try to refresh page and try again";
                  this.$notify(type, title, mensaje, {
                    duration: 6000,
                    permanent: false
                  });
                  this.hideModal('slotsmodalresume');
                  this.clearRowDataChoosenByDepIdAfterHold();
              }else{
                  let result = payload.data.original;
                  let gctId = result.data;
                  if (gctId > 0) {
                    this.$router.push({
                      name: "quote",
                      params: {
                        gctId: gctId
                      }
                    });
                    var type = "success filled";
                    var title = "Success";
                    var mensaje = "Slots preblocked successfully";
                    this.$notify(type, title, mensaje, {
                      duration: 3000,
                      permanent: false
                    });

                    //*********** Guardo variable en sessionStorage *************** */
                    sessionStorage.setItem("quoteAdminGctId", gctId);
                    sessionStorage.setItem(
                      "quoteAdminHeader",
                      JSON.stringify(this.header)
                    );
                    //*********** Guardo variable en sessionStorage *************** */


                    // -------------------------- --------------------------------------------------------------------
                    // -------------------------------------- Envío de correo en QUSTOM QUOTE---------------------------------------

                    // var mail = this.header['headerCompany'].email;
                    // this.sendGroupQuotescot(gctId, mail);

                    // -------------------------------------- Fin Envío de correo  en QUSTOM QUOTE ---------------------------------------
                    // ----------------------------------------------------------------------------------------------

                  } else if (gctId === 0) {
                    var depId = this.depId;
                    var cliId = this.header.headerCompany;
                    this.$store.dispatch("getRowData", { depId, cliId }).then(() => {});
                    this.$swal({
                      title: "Slots preblocked",
                      text: "There are recently pre-locked slots",
                      icon: "warning",
                      showCancelButton: false,
                      confirmButtonText: "Acept",
                      cancelButtonColor: "#989898",
                      confirmButtonColor: "#2B77C0",
                      reverseButtons: true,
                      focusConfirm: false,
                      focusCancel: false
                    });
                    this.hideModal("slotsmodalresume");
                  } else {
                    var type = "error filled";
                    var title = "Error";
                    var mensaje = "Slots were not preblocked. Try again";
                  }

              }
              this.loading = false;
            });

      }   // ===> FIN ELSE Chequeo inicial de itinearios combinados por avsId
    },

    async processComplete() {
      this.displayMessage = true; // Envio a SlotsModalResume


      // this.loading = true;
      this.showSaveHold();
      var self = this;
      let data = this._buildHeaderAndSummaryArray("new");

      // 2021-09-15 | fg | establecer referencia al id del grupo de cotizacion y request
      const { gct, req } = this.$route.query;
      const gctId = gct ?? 0;
      const reqId = req ?? 0;
      const clientDiscount = +this.formNewPercent ?? null // 2022-11-10 | fg | enviar comision modificada
      data.push({ gctId, reqId, clientDiscount });
      const process = "complete";
      data.push({ process });

      // ------------------------ Chequeo inicial de itinearios combinados por avsId ----------------------
      var numberErrors = await this.validateErrorPreviousBlocking(data[1]);
      if(numberErrors > 0) {
          this.displayErrorCombinedMessage();
          this.loading = false;
          this.hideModal("slotsmodalresume");
      }
      else{
      // ------------------------ Fin Chequeo inicial de itinearios combinados por avsId ----------------------

              this.$store.dispatch("addBookingPreHold", data).then(payload => {

                if(payload.data === 'previously blocked'){
                    var type = "error filled";
                    var title = "Atention";
                    var mensaje = "Slots preblocked previously. Try to refresh page and try again";
                    this.$notify(type, title, mensaje, {
                      duration: 6000,
                      permanent: false
                    });
                    this.hideModal('slotsmodalresume');
                }else{
                    let result = payload.data.original;
                    let cotId = result.data;
                    if (cotId > 0) {
                      var type = "success filled";
                      var title = "Success";
                      var mensaje = "Slots preblocked successfully";
                      this.$notify(type, title, mensaje, {
                        duration: 3000,
                        permanent: false
                      });

                      this.$store.commit("cleanRequestCliId");
                      this.hideSaveHold();
                      //En proceso COMPLETE, retorna cotId, y llama a componente SlotPreview
                      //this.$router.push({ name: "quotepreview", params: { cotId: cotId } });

                      // -------------------------- --------------------------------------------------------------------
                      // -------------------------------------- Envío de correo en COMPLETE---------------------------------------

                      // var mail = this.header['headerCompany'].email;
                      // this.sendQuotescot(cotId, mail);

                      // -------------------------------------- Fin Envío de correo en COMPLETE---------------------------------------
                      // ----------------------------------------------------------------------------------------------


                    } else if (cotId === 0) {
                      var depId = this.depId;
                      var cliId = this.header.headerCompany;
                      this.$store.dispatch("getRowData", { depId, cliId }).then(() => {});
                      this.$swal({
                        title: "Slots preblocked",
                        text:
                          "There are recently pre-locked slots. Try with differents slots",
                        icon: "warning",
                        showCancelButton: false,
                        confirmButtonText: "Acept",
                        cancelButtonColor: "#989898",
                        confirmButtonColor: "#2B77C0",
                        reverseButtons: true,
                        focusConfirm: false,
                        focusCancel: false
                      });
                      this.hideModal("slotsmodalresume");
                    } else {
                      var type = "error filled";
                      var title = "Error";
                      var mensaje = "Slots were not preblocked. Try again";
                    }
                }
                this.loading = false;
              });

      }   // ===> FIN ELSE Chequeo inicial de itinearios combinados por avsId
    },
    goToAvailability(){
      // this.$router.push({ name: "newAvailability" }); //Antigua disponibilidad
      this.$router.push({ name: "AvailabilityV2" }); //Nueva disponibilidad
    },
    updateStatusRequestByReqId(reqId) {
      this.$store.dispatch("updateStatusQuote", reqId).then(payload => {
        var response = payload.data.reqStatus;
        if (response == 0) {
          var type = "success filled";
          var title = "Success";
          var mensaje = "Quote Status updated successfully";
          this.$notify(type, title, mensaje, {
            duration: 3000,
            permanent: false
          });
        } else {
          var type = "error filled";
          var title = "Error";
          var mensaje = "Mail not sended. Try again";
          this.$notify(type, title, mensaje, {
            duration: 3000,
            permanent: false
          });
        }
      });
    },

    sendQuotescot(cotId, mail) {
          MailServices.sendQuotescot(cotId, mail)
            .then((response) => {
              let mensaje = response.data.data;
              if (mensaje == 200) {
                var type = "success filled";
                var title = "Send Quote";
                var message = "Succesful";
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false,
                });
                this.sendmail = false;
              }
            })
            .catch((error) => {
              var title = "Quote";
              var message = "No sent, please contact with administrator";
              this.$notify(type, title, message, {
                duration: 3000,
                permanent: false,
              });
            });
    },
    sendGroupQuotescot(gctId, mail) {
          MailServices.sendGroupQuotescot(gctId, mail)
            .then((response) => {
              let mensaje = response.data.data;
              if (mensaje == 200) {
                var type = "success filled";
                var title = "Send Quote";
                var message = "Succesful";
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false,
                });
                this.sendmail = false;
              } else {
                var title = "Error";
                var message = "no send";
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false,
                });
              }
            })
            .catch((error) => {
             var title = "Error";
                var message = "no send";
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false,
                });
            });
    },

    clearRowDataHeaderAndSummaryByDepId() {
      let depId = this.depId;
      this.$store.commit("clearRowDataHeaderAndSummaryByDepId", { depId });
    },

    clearRowDataChoosenByDepIdAfterHold() {
      let depId = this.depId;
      this.$store.commit("clearRowDataChoosen", { depId });
    },

    calculateTotalDiscounts(sendChoosenSlot) {
      const precioTotal = sendChoosenSlot.reduce((total, item) => {
        var sumaDiscounts = 0;
        if (item.extraDiscountPercent != "" || item.extraDiscountPercent != 0) {
          //sumaDiscounts += item.rate * (item.extraDiscountPercent/100);
          sumaDiscounts +=
            item.newOffNetRate * (item.extraDiscountPercent / 100);
        }
        var sumaMounts = 0;
        if (item.extraDiscountAmount != "" || item.extraDiscountAmount != 0) {
          sumaMounts += item.extraDiscountAmount;
        }
        return total + parseFloat(sumaDiscounts) + parseFloat(sumaMounts);
      }, 0);
      return precioTotal;
    },

    calculateTotalUnitPrice(sendChoosenSlot) {
      const precioTotal = sendChoosenSlot.reduce((total, item) => {
        //return total + parseFloat(item.rate); // Cálculo sobre el valor de neta sin ser afectada por descuentos
        return total + parseFloat(item.newOffNetRate); // Cálculo sobre el valor de neta sin ser afectada por descuentos
      }, 0);
      return precioTotal;
    },


    // establecer % de comisión
    // setPercentFromClient() {

    //   this.header.headerPercent = 0

    //   if ( this.header.headerCompany ) {

    //     this.header.headerPercent = this.header.headerCompany.comision_voyager;

    //     //Limpio datos de modal para cambio de porcentaje y asigno valor original a variable
    //     this.originalClientPercent = this.header.headerCompany.comision_voyager;
    //     this.formNewPercent = "";
    //     this.formNewReason = "";

    //     this.enableSwitchIvaFromClient();

    //     this.clearClientEmail();    // Limpio correo que se seteaba al seleccionar cliente
    //   }

    // },

    setPercentFromClient() {

      // Versión 2.0: De acuerdo al campo depFixedDiscountRate (tabla Departures)
      // se coloca como porcentaje de comisión para todos los clientes
      // Este valor se modifica en la vista de promociones en disponibilidad
      var customFixedPercent = Number(this.itemDeparture.depFixedDiscountRate);

      if( (Number(customFixedPercent) === 0) || customFixedPercent == null){

       // CASO 1. En caso de que el valor sea 0 o nulo:

            this.header.headerPercent = 0

            if ( this.header.headerCompany ) {

                this.header.headerPercent = this.header.headerCompany.comision_voyager;
                //Limpio datos de modal para cambio de porcentaje y asigno valor original a variable
                this.originalClientPercent = this.header.headerCompany.comision_voyager;
                this.formNewPercent = "";
                this.formNewReason = "";
                this.enableSwitchIvaFromClient();
                this.clearClientEmail();    // Limpio correo que se seteaba al seleccionar cliente
            }

      }else{

      // CASO 2. En caso de que el valor sea diferente de 0 o nulo. Seteamos el valor de porcentaje:

            this.header.headerPercent = customFixedPercent;
            this.originalClientPercent = customFixedPercent;
            this.formNewPercent = "";
            this.formNewReason = "";
            this.enableSwitchIvaFromClient();
            this.clearClientEmail();    // Limpio correo que se seteaba al seleccionar cliente
      }

    },    
    clearClientEmail(){
      this.header.headerCompany.email = "";
      this.header['headerCompany'].email= "";
    },
    enableSwitchIvaFromClient() {
      if (this.header.headerCompany.pertenece === "ATC ECU") {
        this.header.headerIva = true;
      } else {
        this.header.headerIva = false;
      }
    },

    checkFromStore() {
      //console.log("check from store")

      var filterCompanyList = this.$store.getters.getInitialCompanyList;
      if (filterCompanyList.length > 0) {
        this.filterCompany = filterCompanyList;
      } else {
        this.$store.dispatch("getComisionGPS").then(() => {
          this.filterCompany = this.$store.getters.getInitialCompanyList;
        });
      }

      /* 3. Reviso si existen valores guardados previamente en la tienda (Company, Percent y Comision)
           y los traigo. No aplico metodos set() y get() porque son excluyentes*/
      var companyStore = this.$store.getters.getCompanySecondaryFilters;
      var percentStore = this.$store.getters.getPorcentSecondaryFilters;
      var comisionStore = this.$store.getters.getComisionSecondaryFilters;

      if (companyStore.length > 0) {
        this.selectedFilterCompany = companyStore;
      }
      if (percentStore) {
        this.selectedFilterPercent = percentStore;
      }
      if (comisionStore) {
        this.selectedComision = comisionStore;
      }
    },

    checkInitialFields() {
      var filterHeader = this.$store.getters.getRowDataHeaderAndSummarySlotsByDepId(
        this.depId
      );
      if (filterHeader.length > 0) {
        let newCompanyId = filterHeader[0].header.headerCompany.id;
        let depId = this.itemDeparture.depId;
        let arrayCompany = this.filterCompany.filter(
          item => item.id === newCompanyId
        );
        this.header.headerCompany = arrayCompany[0];
      }
    },

    // ---------------------- FUNCIONALIDAD MODAL -----------------------------

    hideModal(refname) {
      //this.deleteLastElementInArray();
      this.$refs[refname].hide();
    },

    // ---------------------- FIN FUNCIONALIDAD MODAL -----------------------------
    checkRoles() {
      if (
        this.$store.getters.currentUser.roles[0].id == 18 ||
        this.$store.getters.currentUser.roles[0].id == 19
      ) {
        this.header.headerCompany = this.$store.getters.currentUser.title;
        this.header.headerPercent = this.$store.getters.currentUser.comisionVoyager;
      } else {
        this.header.headerCompany = [];
        this.header.headerPercent = "";
      }
    },



    //2021-08-04 | fg | valores iniciales
    setInitialTimeLimit() {



      /*
      const today = new Date();
      let tomorrow = new Date();
      tomorrow = tomorrow.setDate(today.getDate() + 1);
      this.header.headerDateLimit = tomorrow;
      */


      const daysBeforeDeparture = daysAfterToday( this.itemDeparture.depStartDate )
      this.header.headerDateLimit = resolveTimeLimit( new Date(), daysBeforeDeparture)


    },

    // 2021-08-04 | fg | deshabilitar fechas para datetimelimit
    setDisabledDates() {
      // definir como limite inicial vàlido la fecha del timelimit, fechas anteriores se desactivan
      const yearDateLimitTo = new Date(this.header.headerDateLimit).getFullYear();
      const monthDateLimitTo = new Date(this.header.headerDateLimit).getMonth();
      const dayDateLimitTo = new Date(this.header.headerDateLimit).getDate();

      this.disabledDates.to = new Date(
        yearDateLimitTo,
        monthDateLimitTo,
        dayDateLimitTo
      );

      if (this.itemDeparture === undefined) return;

      // definir como limite final vàlido la fecha inicial del crucero, fechas anteriores se desactivan

      // console.log("ok disabled limit")

      const startDeparture = moment(this.itemDeparture.depStartDate, "YYYY-MM-DD")
        .add(1, "day")
        .toDate();

      const yearDateLimitFrom = startDeparture.getFullYear();
      const monthDateLimitFrom = startDeparture.getMonth();
      const dayDateLimitFrom = startDeparture.getDate();

      this.disabledDates.from = new Date(
        yearDateLimitFrom,
        monthDateLimitFrom,
        dayDateLimitFrom
      );
    },

    setDisabledDatesForTimeLimit() {

      // Método para otorgar 3 años al datepicker de timelimit en caso de seleccionar "allotments"
      // const yearDateLimitTo = new Date(this.header.headerDateLimit).getFullYear();
      // const monthDateLimitTo = new Date(this.header.headerDateLimit).getMonth();
      // const dayDateLimitTo = new Date(this.header.headerDateLimit).getDate();
      // this.disabledDates.to = new Date(
      //   yearDateLimitTo,
      //   monthDateLimitTo,
      //   dayDateLimitTo
      // );

    // En caso de que se haga click en Allotmente, se debe extraer año, mes y dia de la fecha actual y añadirala a disableDates
        var yearDateLimitTo = "";
        var monthDateLimitTo = "";
        var dayDateLimitTo = "";

      if(Boolean(this.header.headerDateLimit)){
          yearDateLimitTo = new Date(this.header.headerDateLimit).getFullYear();
          monthDateLimitTo = new Date(this.header.headerDateLimit).getMonth();
          dayDateLimitTo = new Date(this.header.headerDateLimit).getDate();
      }else{
          var today = new Date();
          yearDateLimitTo   = today.getFullYear();
          monthDateLimitTo  = today.getMonth();
          dayDateLimitTo    = today.getDate() + 1;
      }      
      this.disabledDates.to = new Date(
            yearDateLimitTo,
            monthDateLimitTo,
            dayDateLimitTo
          );


      if (this.itemDeparture === undefined) return;
      const startDeparture = moment(this.itemDeparture.depStartDate, "YYYY-MM-DD")
        .add(3, "year")
        .toDate();

      const yearDateLimitFrom = startDeparture.getFullYear();
      const monthDateLimitFrom = startDeparture.getMonth();
      const dayDateLimitFrom = startDeparture.getDate();

      this.disabledDates.from = new Date(
        yearDateLimitFrom,
        monthDateLimitFrom,
        dayDateLimitFrom
      );

      console.log("this.disabledDates.to: " + this.disabledDates.to);
      console.log("this.disabledDates.from: " + this.disabledDates.from);
    },

    async setGrupoCotizacion() {
      const { gct, req } = this.$route.query;

      if (gct) {
        const { data } = await GrupoCotizacionesServices.getGrupoReferencias(
          gct
        );

        const cliId = data.data.gctClienteId;

        const bookingClient = this.filterCompany.find(
          client => client.id === cliId
        );

        if (bookingClient) {
          this.header.headerCompany = bookingClient;
          this.setPercentFromClient();
          this.holdAnotherMode = true;
        }
      }
    },

    setOriginalPercent(){
      this.header.headerPercent = this.originalClientPercent
    },

    getWaitingList() {

      if ( Boolean(this.depId) ){

        WaitingListServices.getWaitingListByDepId( this.depId )
            .then((response) => {
              this.waitingListActive = response.data.data.filter(f => f.wtlStatus === 1);
              this.waitingListInActive = response.data.data.filter(f => f.wtlStatus === 0);
            })
            .catch((error) => {
              console.log(error);
        });

      }

    },

  },

  async mounted() {
    await this.checkFromStore();
    await this.setDisabledDates();
    await this.setGrupoCotizacion();

    //await this.getWaitingList();
    setTimeout(() =>   this.getWaitingList(), 250);
  },

  async created() {

    EventBus.$on("hold", () => {
      this.hold();
    });



  }
};
</script>


