<template>
  <b-container fluid class="mb-2">
    <b-card-group deck class="rounded">
      <b-card class="pb-2">
        <b-row>

          <b-col>
            <b-form-group
               label="Client"
               label-cols="2" label-cols-lg="1" label-size="sm"
            >
            
                <v-select
                  v-model="header.headerCompany"
                  :options="filterCompany"
                  label="razon_social"
                  item-value="header.headerCompany"
                  item-text="razon_social"
                  :disabled="this.requestCliId !== ''"
                  @input="setPercentFromClient()"
                />

            </b-form-group>
          </b-col>

          <b-col>
            <b-row>
              <!--  Timelimit section  -->
              <b-col class="pr-1">
                <b-form-group 
                      label="Timelimit" 
                      description="GMT -05:00"
                      label-cols="1" label-cols-lg="3" label-size="sm"
                >
                    <datepicker
                      :bootstrap-styling="true"
                      v-model="header.headerDateLimit"
                      format="D, dd MMM yyyy"
                      :disabled-dates="disabledDates"
                    ></datepicker>
                </b-form-group>
              </b-col>
              
              <b-col class="pl-0">
                <b-form-group >
                  <b-form-timepicker class="sm"
                    v-model="header.headerTimeLimit"
                  ></b-form-timepicker>
                
                <!-- evaluar compatibilidad de navegadores type="time"
                  <b-form-input 
                      v-model="header.headerTimeLimit2"
                      type="time"
                  />
                -->  

                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group
              id="input-group-email"
              label="Email address"
              label-for="input-email"
              label-cols="4" label-cols-lg="3" label-size="sm"
            >
              <!-- limite real base datos 150 caracteres -->
              <b-form-input
                v-model="header.headerCompany.email"
                id="input-email"
                type="email"
                placeholder="Enter email"
                maxlength="50"  
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>

            <b-form-group
              id="input-group-reference"
              label="Reference"
              label-for="input-reference"
              label-cols="4" label-cols-lg="3" label-size="sm"
            >
              <!-- limite real base datos 150 caracteres -->
              <b-form-input
                v-model="header.headerReference"
                id="input-reference"
                maxlength="50"
                required
              ></b-form-input>
            </b-form-group>

          </b-col>

          <b-col>
            <b-form-group
              id="input-group-discount"
              label="Client discount"
              label-for="input-discount"
              label-cols="4" label-cols-lg="3" label-size="sm"
            >
              <b-form-input
                v-model="header.headerPercent"
                id="input-discount"
                type="number"
                min=0
                max=100
                maxlength="2"
                @keypress="onlyNumber"
                onKeyPress="if(this.value.length==2) return false;"
                required
                class="sm"
              ></b-form-input>
            </b-form-group>            
          </b-col>

        </b-row>
      </b-card>
    </b-card-group>

<!-- (No eliminar debido a que la condición v-if actua como "listener" de la propiedad checkConditionInNextButton) -->
<!-- CARD LISTENER -->
    <b-card-group deck class="rounded d-none">
      <b-card header-tag="header">
            <b-colxx
              md="3"
              class="total-reg"
              v-if="!checkConditionInNextButton"              
            >
            </b-colxx>
      </b-card>
    </b-card-group>
<!-- FIN CARD LISTENER -->

                  <!-- MODAL RESUMEN -->
                  <b-modal
                    id="slotsmodalresume"
                    size="lg"
                    ref="slotsmodalresume"
                    :title="'Orders Summary'"
                  >
                    <div slot="modal-title">
                      <img
                        class="footer-logo"
                        alt="footer logo"
                        src="/assets/img/atc/main-logo.png"
                        height="70"
                        width="140"
                      />
                      Orders Summary
                    </div>

                    <!-- BOTONES PARA MODAL DE CLICK EN NEXT -->
                    <slotsmodalresume :depId="depId"></slotsmodalresume>
                    <template slot="modal-footer">
                      <b-button
                        class="btn-sm"
                        variant="success"
                        @click="saveComplete()"
                        >{{ $t("gps.complete")}}</b-button
                      >
                      <b-button
                        class="btn-sm"
                        variant="warning"
                        @click="saveCustomQuote()"
                        >{{ $t("gps.custom-quote")}}</b-button
                      >
                      <b-button
                        class="btn-sm"
                        variant="secondary"
                        @click="hideModal('slotsmodalresume')"
                        >{{ $t("gps.cancel") }}</b-button
                      >
                    </template>
                    <!-- BOTONES PARA MODAL DE CLICK EN NEXT -->
                  </b-modal>
                  <!-- FIN MODAL RESUMEN -->
  
  </b-container>
</template>

<script>
import importComponents from "../../../../../importComponents.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import moment from "moment";
import { mapMutations } from 'vuex';
import { mapState } from 'vuex';
import Switches from "vue-switches";
import Datepicker from "vuejs-datepicker";
import slotsConditions from "../../../../../mixins/slots/slotsConditions.js";
import { EventBus } from '../../../../../eventBus/event-bus';

export default {

  name: "SlotsForm",
  mixins: [slotsConditions], 

  components: {

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

  data() {
    return {
      hoy: moment().format("YYYY-MM-DD"),
      limitDias: "",
      fechaSugerida: "",
      moment: moment,
      // filterCompany: [],
      filterPercent: [],
      header: {
        headerCompany: [], //[]
        headerPercent: "",
        headerEmail: this.$store.getters.currentUser.email,
        roleUser: this.$store.getters.currentUser.roles[0].id,
        headerReference: "",
        headerTimeLimit: "12:00:00",
        headerDateLimit: "",          
        headerIva: "",
      },
      disabledDates: {
        to:  "",
        from: "",
      },
      totalFromSummary: "",
      showModalResume: false,
      requestCliId:"",
      rowSummary: []
    };
  },


  watch: {
    
    header: {
      deep: true,
      handler: function (val) {
        this.$emit("toParentSendHeader", val);        
      },

    },
    
    sendSummary: {
      deep: true,
      handler: function (val) {
        this.totalFromSummary = val.summaryTotalNetRate;
      },
    },

    itemDeparture: {
      deep: true,
      handler: function (departure) {
        this.setDisabledDates()
      },
      immediate: true 
    }
  },
  computed: {
     ...mapState('slots', ["isSaveHold"]),

    checkConditionInNextButton() {
      //Valido que no existan valores de offNetRate en 0 para evitar conflictos al momento de guardar
      var checkNullValuesInRate = this.rowDataChoosenByDepId.map(x=>({newOffNetRate: x.newOffNetRate})).some(e => e.newOffNetRate === "0.00");
        if( (this.rowDataChoosenByDepId.filter((item) => item.bosStatus == null).length !== 0)
            && (this.header.headerCompany.length !== 0)
            && (this.header.headerReference !== "")
            && Boolean(this.sendSummary)
            && (this.sendSummary.summarySubtotalNetRate>0)
            && (!checkNullValuesInRate)
          ){
          EventBus.$emit('checkConditionInNextButton', false);
          return false;
        }else{
          EventBus.$emit('checkConditionInNextButton', true);
          return true;
        }
    },

    rowDataChoosenByDepId: {
      get() {
        return this.$store.getters.getRowDataChoosen(this.depId);
      },
    },
    
    filterCompany: {
      get() {
        return this.$store.getters.getInitialCompanyList;
      },
      set(value){ this.value = value }
    },
    
    rowDataHeaderAndSummarySlotsByDepId: {
      get() {
        return this.$store.getters.getRowDataHeaderAndSummarySlotsByDepId(this.depId);
      },
      set(value){ this.value = value }
    },
    
    rowDataByDepId: { get() { return this.$store.getters.getRowDataByDepId(this.depId) } },

    // 2021-08-06 | fg | Definir fecha y hora de timelimit

    bookingDateTimeLimit () {

      const dateLimit = moment(this.header.headerDateLimit).format("YYYY-MM-DD")

      const dateTimeLimit = `${dateLimit} ${this.header.headerTimeLimit}`
      
      return dateTimeLimit

    }

  },


  methods: {

    ...mapMutations(['showSaveHold', 'hideSaveHold']),

    onlyNumber ($event) {
          //console.log($event.keyCode); //keyCodes value
          let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
          if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
              $event.preventDefault();
          }
        },

    hold() {
      this.saveHeaderAndSummary();
    },
    

    saveCustomQuote() {
      this.processCustomQuote();
      this.clearRowDataHeaderAndSummaryByDepId();
      this.clearRowDataChoosenByDepIdAfterHold();
    },
    

    saveComplete() {

      this.processComplete();
      this.clearRowDataHeaderAndSummaryByDepId();
      this.clearRowDataChoosenByDepIdAfterHold();

      //this.sendMailHold();          // TO DO: DEscomentar y setear correos en Profiles para probar
    },
    
    saveHeaderAndSummary() {
      let itemDeparture = this.itemDeparture;
      let header = this.header;
      let summary = this.sendSummary;
      itemDeparture = { ...itemDeparture, header, summary };
      this.rowSummary = itemDeparture;
      this.$store.commit("setRowDataHeaderAndSummarySlots", itemDeparture);
    },
    
    processCustomQuote() {
      var self = this;
      let data = this._buildHeaderAndSummaryArray();
      this.$store.dispatch("addBookingPreHold", data).then((payload) => {

        let gctId = payload.data;
        if (gctId !== null) {
           this.$router.push({ name: 'quote', params: {
            gctId: gctId
          } });

          var type = "success filled";
          var title = "Success";
          var mensaje = "Slots preblocked successfully";
          this.$notify(type, title, mensaje, {
            duration: 3000,
            permanent: false,
          });

          //*********** Guardo variable en sessionStorage *************** */
            sessionStorage.setItem('quoteAdminGctId', gctId);
            sessionStorage.setItem('quoteAdminHeader', JSON.stringify( this.header));
          //*********** Guardo variable en sessionStorage *************** */

        } else {
          var type = "error filled";
          var title = "Error";
          var mensaje = "Slots were not preblocked. Try again";
        }
      });
    },
    

    processComplete() {
      
      this.showSaveHold();      
      var self = this;      
      let data = this._buildHeaderAndSummaryArray();
      
      this.$store.dispatch("addBookingPreHold", data).then((payload) => {

        let reqId = payload.data;

        if (reqId !== null) {
          var type = "success filled";
          var title = "Success";
          var mensaje = "Slots preblocked successfully";
          this.$notify(type, title, mensaje, {
            duration: 3000,
            permanent: false,
          });

          this.$store.commit("cleanRequestCliId");
          this.hideSaveHold();
          this.$router.push({ name: 'availability' });

        } else {
          var type = "error filled";
          var title = "Error";
          var mensaje = "Slots were not preblocked. Try again";
        }
      });
    },
    

    updateStatusRequestByReqId(reqId) {
      this.$store.dispatch('updateStatusQuote', reqId).then((payload) => {
        var response = payload.data.reqStatus;
        if (response == 0) {
          var type = "success filled";
          var title = "Success";
          var mensaje = "Quote Status updated successfully";
          this.$notify(type, title, mensaje, {
            duration: 3000,
            permanent: false,
          });
        } else {
          var type = "error filled";
          var title = "Error";
          var mensaje = "Mail not sended. Try again";
          this.$notify(type, title, mensaje, {
            duration: 3000,
            permanent: false,
          });
        }
      })
    },
    

    sendMailHold() {
      let data = this.buildMailArray();
      var self = this;
       this.$store.dispatch('sendHold', data).then((payload) => {
        var response = payload.data;
        if (response == 200) {
          var type = "success filled";
          var title = "Success";
          var mensaje = "Hold sended by mail successfully";
          this.$notify(type, title, mensaje, {
            duration: 3000,
            permanent: false,
          });
        } else {
          var type = "error filled";
          var title = "Error";
          var mensaje = "Mail not sended. Try again";
          this.$notify(type, title, mensaje, {
            duration: 3000,
            permanent: false,
          });
        }
      })
    },
    

    buildMailArray(){
      let data = [];
      let rowDetails = this.rowSummary;
      let rowClientAndUserInfo = this.header;
      data.push(rowClientAndUserInfo, rowDetails);
      return data;
    },
    

    clearRowDataHeaderAndSummaryByDepId() {
      let depId = this.depId;
      this.$store.commit("clearRowDataHeaderAndSummaryByDepId", { depId });
    },
    

    clearRowDataChoosenByDepIdAfterHold() {
      let depId = this.depId;
      this.$store.commit("clearRowDataChoosen", { depId });
    },
    

    calculateTotalDiscounts(sendChoosenSlot){
      const precioTotal = sendChoosenSlot.reduce((total, item)=>{
          var sumaDiscounts = 0;
          if(item.extraDiscountPercent != "" || item.extraDiscountPercent != 0){
            //sumaDiscounts += item.rate * (item.extraDiscountPercent/100);
            sumaDiscounts += item.newOffNetRate * (item.extraDiscountPercent/100);
          }
          var sumaMounts = 0;
          if(item.extraDiscountAmount != "" || item.extraDiscountAmount != 0){
            sumaMounts += item.extraDiscountAmount;
          }
          return total + parseFloat(sumaDiscounts)  + parseFloat(sumaMounts)
      },0)
      return precioTotal;
    },
    

    calculateTotalUnitPrice(sendChoosenSlot){
      const precioTotal = sendChoosenSlot.reduce((total, item)=>{
        //return total + parseFloat(item.rate); // Cálculo sobre el valor de neta sin ser afectada por descuentos
        return total + parseFloat(item.newOffNetRate); // Cálculo sobre el valor de neta sin ser afectada por descuentos
      },0)
      return precioTotal;
    },
    

    setPercentFromClient() {
      if (this.header.headerCompany) {
        this.header.headerPercent = this.header.headerCompany.comision_voyager;
        this.enableSwitchIvaFromClient();
      } else {
        this.header.headerPercent = 0;
      }
      //this.getHeaderLimit();
    },

    enableSwitchIvaFromClient(){
         if (this.header.headerCompany.pertenece ==="ATC ECU") {
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
      var filterHeader = this.$store.getters.getRowDataHeaderAndSummarySlotsByDepId(this.depId);
      if (filterHeader.length > 0) {
        let newCompanyId = filterHeader[0].header.headerCompany.id;
        let depId = this.itemDeparture.depId;
        let arrayCompany = this.filterCompany.filter(
          (item) => item.id === newCompanyId
        );
        this.header.headerCompany = arrayCompany[0];
      }
    },

    checkInitCliId() {
      
      //console.log("check init cli")
      // Leo si existe variable requestCliId proveniente de QuoteAdmin. En caso de existir, seteo select de compañia con el id traido.
      this.requestCliId = parseInt(this.$store.getters.getRequestCliId);
      if (this.requestCliId) {
        let arrayCompany = this.filterCompany.filter((item) => item.id == this.requestCliId);
        this.header.headerCompany = arrayCompany[0];
        this.header.headerPercent = arrayCompany[0].comision_voyager;

      }else{
        this.requestCliId = "";
      }
    },
    // ---------------------- FUNCIONALIDAD MODAL -----------------------------

    hideModal(refname) {
      //this.deleteLastElementInArray();
      this.$refs[refname].hide();
    },

    // ---------------------- FIN FUNCIONALIDAD MODAL -----------------------------
    checkRoles(){
      if (this.$store.getters.currentUser.roles[0].id == 18 || this.$store.getters.currentUser.roles[0].id == 19 ) {
        this.header.headerCompany = this.$store.getters.currentUser.title;
        this.header.headerPercent = this.$store.getters.currentUser.comisionVoyager;
      }
    else {
        this.header.headerCompany = [];
        this.header.headerPercent = "";
      }
    },

    //2021-08-04 | fg | valores iniciales
    setInitialValues () {

        
        //console.log("set initial values")
        
        const today = new Date()
        let tomorrow = new Date()

        tomorrow =  tomorrow.setDate( today.getDate() + 1 )    

        this.header.headerDateLimit = tomorrow



    },

    // 2021-08-04 | fg | deshabilitar fechas para datetimelimit
    setDisabledDates() {

      //console.log("set disabled dates",this.header.headerDateLimit, this.itemDeparture.depStartDate)

      // definir como limite inicial vàlido la fecha del timelimit, fechas anteriores se desactivan
      const yearDateLimitTo = new Date(this.header.headerDateLimit).getFullYear()
      const monthDateLimitTo = new Date(this.header.headerDateLimit).getMonth() 
      const dayDateLimitTo = new Date(this.header.headerDateLimit).getDate()

      this.disabledDates.to = new Date(yearDateLimitTo, monthDateLimitTo, dayDateLimitTo)

      
      

      if ( this.itemDeparture === undefined)  return 

      // definir como limite final vàlido la fecha inicial del crucero, fechas anteriores se desactivan  

      // console.log("ok disabled limit")

      const startDeparture = moment(this.itemDeparture.depStartDate,"YYYY-MM-DD").add(1, 'day').toDate()

      const yearDateLimitFrom = startDeparture.getFullYear()
      const monthDateLimitFrom = startDeparture.getMonth()
      const dayDateLimitFrom = startDeparture.getDate()

      this.disabledDates.from = new Date(yearDateLimitFrom, monthDateLimitFrom, dayDateLimitFrom)

    },

  },
  
  async mounted() {

      await this.checkFromStore()
      await this.checkInitCliId()
      await this.setInitialValues()
      await this.setDisabledDates()

  },

  created() {    
    EventBus.$on('hold', () => {
      this.hold();      
    });

    //console.log("PROPS", this.itemDeparture.depStartDate )
  }



};
</script>
