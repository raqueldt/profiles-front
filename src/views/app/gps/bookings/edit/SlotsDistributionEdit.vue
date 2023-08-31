<template>
  <b-container fluid>

    <b-card-group class="space-select">
      <b-card header-tag="header">

        <b-row class="mt-1 px-2" >
          <b-colxx xxs="12" class="p-0">
            <!-- CONTENEDOR DE ICONOS INFORMATIVOS Y BOTONES DE LIMPIEZA Y SELECCION -->
            <!-- rowDataChoosen: {{ rowDataChoosen.map(a => a.avsId) }} -->
            <!-- Confirmed: {{ confirmedSlots }}<br />
            Blocked: {{ blockedSlots }}<br />
            cruPaxLimit: {{ cruPaxLimit }}<br />
            rowDataChoosen: {{ rowDataChoosen.length }}<br> -->
            <!-- counterBusySlots: {{ counterBusySlots }} -->
            <!-- {{rowDataChoosen.map(a => a.avsId)}} -->

            <!-- setAllotment: {{setAllotment}} -->
            <!-- :setAllotmentToEdit="setAllotment" -->
            <!-- Estatisticas de slots, Allotment y botón de ClearAll -->

<!-- <h1>{{flagEndUpdateConditions}}</h1> -->

          <!-- DISCRIMINAR POR BOSSTATUS 2 Y ELIMINAR Y ALLOTMENTS -->
           
            <slotsstatistics 
              :rowDataChoosen="rowDataChoosen" 
              :rowData="rowData"
              :availableSlots="availableSlots"
              :freeSlots="freeSlots"               
              :blockedSlots="blockedSlots" 
              :confirmedSlots="confirmedSlots" 
              :allotmentSlots="allotmentSlots"
              :NASlots="NASlots" 
              :NASlotsEnGris="NASlotsEnGris"
              :cruPaxLimit="cruPaxLimit"
              :setAllotmentToEdit="setAllotment" 
              :hasConfirmedSlotInEdit="hasConfirmedSlot"
              tag="edit"               
              @clearRowDataChoosen="clearRowDataChoosen"
              @setAllotment="setAllotmentFromEdit" 
              @totalAvailableSlotsFromStatitics="totalAvailableSlotsFromStatitics"
              @selectAllForCharter="selectAllForCharter">
            </slotsstatistics>
            <!-- @clearRowDataChoosen="clearRowDataChoosen" -->

            <!-- Fin Estatisticas de slots, Allotment y botón de ClearAll -->
          </b-colxx>
          <!-- MENSAJE MAXIMA CAPACIDAD DE VESSEL -->
          <div v-if="rowDataChoosen.length >= cruPaxLimit
            || counterBusySlots >= cruPaxLimit " class="w-100 text-center">
            <div class="alert alert-warning">
              <i class="iconsminds-yacht"></i>
              {{ $t("gps.maximun-choosen-slots") }}
            </div>
          </div>
          <!-- FIN MENSAJE MAXIMA CAPACIDAD DE VESSEL -->

          <!-- FIN CONTENEDOR DE ICONOS INFORMATIVOS Y BOTONES DE LIMPIEZA Y SELECCION -->
        </b-row>

        <b-row class="space-selector mt-2" v-for="item2 in rowDataDecks" :key="item2.decId">
          <div :class="item2.decNameA" class="mb-4">
            <div>
              <b-colxx xxs="12" class="d-flex p-0 mx-2 name-deck">
                <div :class="item2.decNameA + '-color id-color'"></div>
                <h6>
                  <label>{{ item2.decNameA }}</label>
                </h6>
              </b-colxx>
            </div>

            <div class="btn-group mt-2 p-0 mx-1" role="group" aria-label="Basic example"> 
              <div v-for="cabin in item2.cabins" :key="cabin.cabId" class="mx-1">
                <a v-if="showClearButtonByCabId(cabin.cabId)" :class="item2.decNameA" data-toggle="tooltip"
                  data-placement="top" title="Reset slots" @click.prevent="clearByCabId(cabin.cabId)" href="#contact">
                  <i class="glyph-icon iconsminds-reload-1"></i> </a>{{ cabin.cabCode }}

                <div class="m-0 p-0" >
                  <div v-if="rowData.length" class="m-0 p-0">
                    <div v-for="(row, index) in rowData" :key="index" class="btn-group" role="group"
                      aria-label="Basic example" >

                      <div v-if="row.avsCabinId == cabin.cabId" class="m-0 p-0" >

                        <!-- ----------------------------------  Validación de charter ----------------------------------  -->
                        <!-- opcion Boton 2 -->
                        <b-button :id="`popover-target-${row.avsId}`" 
                          @click="choosenSlot(row, 'nuevo-registro')" 
                          class="space btn"
                          data-toggle="tooltip" 
                          data-placement="top" 
                          :disabled="_disableButtonInEditBooking(row, rowDataChoosen.map(a => a.avsId)) || counterBusySlots >= cruPaxLimit  "
                          :class="containsInRowDataChossen(row) ? 'clicked' : ''"
                          :variant="_formatSlotsEditBooking(row, rowDataChoosen.map(a => a.avsId))">
                          {{_formatDay(String(row.avsTag), row.avsOrder, 
                                  row.booking ? row.booking.bosStatus : null,              
                                  row.booking? row.booking.bosCondition : null,
                                  row.booking ? row.booking.bosIdLinked : null,
                                  row.booking ? row.booking.bosConditionLinked : null,
                                )}}
                        </b-button>

                        <!-- <br><small> {{row.avsId}} |</small><br>
                        <br><small>S:{{row.booking? row.booking.bosStatus : '-'}}</small>
                        <br><small>C:{{row.booking? row.booking.bosCondition : '-'}}</small> -->
                        <!-- <br><small>C:{{row}}</small> -->
                        <!-- <br><small>C:{{row.booking? row.booking : '-'}}</small> -->
                        <!-- <br><small> {{row.avsId}} |</small><br>
                        <br><small>S:{{row.booking? row.booking.bosStatus : '-'}}</small>
                        <br><small>C:{{row.booking? row.booking.bosCondition : '-'}}</small> -->

                        <!-- <br><small>B:{{row.booking? row.booking.bokId : '-'}}</small> -->
                        
                        
                            <!-- <b-button
                              @click="choosenSlot(row)"
                              class="space btn"
                              :id="`popover-target-${row.avsId}`"
                              :disabled="_disableButtonInBlocking(row)"
                              :class="
                                containsInRowDataChossen(row) ? 'clicked' : ''
                              "
                              :variant="_formatSlotsAvailability(row)"
                            >
                              <span>
                                {{
                                  _formatDay(
                                    String(row.avsTag),
                                    row.avsOrder,
                                    row.booking ? row.booking.bosStatus : null,
                                    row.booking
                                      ? row.booking.bosCondition
                                      : null,
                                    row.booking
                                      ? row.booking.bosIdLinked
                                      : null,
                                    row.booking
                                      ? row.booking.bosConditionLinked
                                      : null
                                  )
                                }}</span
                              >
                            </b-button> -->

                            <!-- <br><small> {{row.avsId}} |</small>
                            <br><small>{{row.booking? row.booking.bosStatus : '-'}}</small> -->
                        <!-- COMENTAR / DESCOMENTAR -->
                        <!-- <br><small>A: {{row.avsId}}</small>
                        <br><small>ST: {{row.booking? row.booking.bosStatus : '-'}}</small>
                        <br><small>C: {{row.booking?  row.booking.bosCondition : '-'}}</small><br>  -->
                        <!-- <br><small>B: {{row.bokId }} |</small><br>-->

                        <!-- FIN COMENTAR / DESCOMENTAR -->

                        <!-- ---------------------------------- Validación de charter ----------------------------------  -->

                        <b-popover :target="`popover-target-${row.avsId}`" triggers="hover" placement="top"
                          container="special-popover" variant="space-info hold ribbon-wrapper card"
                          :key="`popover-slot-${row.avsId}`">

                          <template #title>
                            <div class="w-100 d-flex flex-column text-lg-center">
                              <div v-if="Boolean(row.booking)">
                                <div v-if="row.booking.bosStatus == 1">
                                  <div class="text-center w-100  py-1 px-1 ">
                                    <small>
                                      <b-button block style="cursor:default;" class="space btn text-white"
                                        :variant="_formatSlots(row.booking.bosStatus)">
                                        <i class="fas fa-check"></i>
                                        {{ _formatStatus(row.booking.bosStatus) }}
                                      </b-button>
                                    </small>
                                  </div>
                                </div>
                                <div v-if="row.booking.bosStatus == 2">
                                  <div class="text-center w-100  py-1 px-1">
                                    <small>
                                      <b-button block style="cursor:default;" class="space  btn text-white"
                                        :variant="_formatSlots(row.booking.bosStatus)">
                                        <i class="fas fa-check"></i> Confirmed
                                      </b-button>
                                    </small>
                                  </div>
                                </div>
                                <div v-if="row.booking.bosStatus == 3">
                                  <div class="text-center bg-success w-100 py-1 px-1">
                                    <small class="text-white">
                                      <i class="fas fa-check"></i> Free slot
                                    </small>
                                  </div>
                                </div>
                              </div>
                              <div v-else-if="!Boolean(row.booking)">
                                <div class="text-center bg-success w-100 py-1 px-1">
                                  <small class="text-white">
                                    <i class="fas fa-check"></i> Free slot
                                  </small>
                                </div>
                              </div>
                            </div>
                          </template>

                          <!-- Mostrar más información en popover de acuerdo a estado   -->
                          <div v-if="Boolean(row)">
                            <slots-popover :row="row"></slots-popover>
                          </div>

                        </b-popover>

                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <b-spinner small label="Small Spinner"></b-spinner>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </b-row>

          <!-- WARNING cuando se hace unclick -->
            <b-button v-if="showAtention" v-b-toggle.collapse1 variant="outline-danger" size="xs" class="border-0 float-right"
            v-tooltip="{content: 'Click here to display warnings', placement: 'top'}"
            ><i class="glyph-icon simple-icon-info"></i></b-button>
            <b-collapse id="collapse1">
               <div class="p-1 border mt-4">
                Atention:
                      <ul>
                        <li>
                          <small>When you unclick on a space, please check the conditions of the other spaces in the cabin</small>
                        </li>
                        <li>
                          <small>If you need to modify the prices of each space, click on "Discard" and then click on "Customize rates"</small>
                        </li>
                      </ul>
                </div>
            </b-collapse>
          <!-- WARNING cuando se hace unclick -->

      </b-card>
    </b-card-group>
<!-- <pre>{{mainOriginalArray.map(x=>({avsId: x.avsId, conditions: x.conditions.map(x=>({metCodigo: x.metCodigo, selected: x.selected})) }))}}</pre> -->
  </b-container>
</template>

<script>
  import { OriginalSource } from "webpack-sources";
  import slotsConditions from "../../../../../mixins/slots/slotsConditions.js";
  import slotsConditionsOnClick from "../../../../../mixins/slots/slotsConditionsOnClick";
  import slotsFormat from "../../../../../mixins/slots/slotsFormat.js";
  import DeparturePriceServices from "@/services/gps/departuresPrice/DeparturePriceServices.js";
  import AvailabilityslotsServices from "@/services/gps/availabilityslots/availabilityslotsServices.js";

  export default {
    components: {},
    props: [
      "depId",
      "vslCapacity",
      "sendHeader",
      "cruPaxLimit",
      "sendArrayUpdate",
      "clientId",
      "bokId",
      "longChoosenSlots",     
      "flagEndUpdateConditions"
    ],
    mixins: [slotsConditions, slotsConditionsOnClick, slotsFormat],
    data() {
      return {
        processUncheck:false,
        setAllotment: "",
        setConfirmation: "",
        allotment: "",
        priName: "",     
        savedDprAmount: "",
        savedDprPercent: "",
        mainOriginalArray:[],
        showAtention: false
      };
    },
    watch: {
      allotment: function () {
        this.$emit("toParentSendAllotment", this.allotment);
      },
      flagEndUpdateConditions: {
          deep:true,
          handler(val){ 
            // ------------------------------------------- CLONAR ARRAY ORIGINAL -------------------------------------------------            
            // Espero flag desde SlotSummaryEdit para que termine de setear condiciones y clono el array
            if(val) {
              // console.log("===================================================== FINISH SUMMARY EDIT ===============================================")
                //console.log("===> flagEndUpdateConditions" + JSON.stringify(val));
                //console.log("===> rowDataChoosen: " + JSON.stringify(this.rowDataChoosen.length));

                //console.log("===> rowDataChoosenOriginal: " + JSON.stringify(this.$store.getters.getRowDataChoosenOriginal));
                let rowDataChoosenOriginal = this.$store.getters.getRowDataChoosenOriginal;
                
                // console.log("===> sendArrayUpdate" + JSON.stringify(this.sendArrayUpdate));
                //this.mainOriginalArray = [...this.rowDataChoosen];
                this.mainOriginalArray = [...rowDataChoosenOriginal];
            }
          },
      },         
    },
    computed: {
      hasConfirmedSlot(){
          return this.sendArrayUpdate.map(a => a.slots).flat().some( item =>item.bosStatus === 2);
      },
    validPercentFromClient() {
      //ADECUADO PARA EDIT
      if (Boolean(this.sendHeader)) {
        var checkHeader = Boolean(this.sendHeader.bokClientDiscount);
        if (checkHeader) {
          // Modificado unicamente en EDIT (el dato valido es bocLientDiscount)
          var validPercent = checkHeader
            ? this.sendHeader.bokClientDiscount
            : "";
          return validPercent;
        }
      }
    },      
      isModeAdd: function () {
        if (this.$route.query.m) return true;
        return false;
      },
      counterBusySlots: function () {
        return this.blockedSlots + this.confirmedSlots + this.allotmentSlots + this.rowDataChoosen.length;
      },
      availableSlots: {
        get() {
          return (
            this.cruPaxLimit -
            (this.$store.getters.getRowData.filter(
                (item) => item.bosStatus == null && item.bosStatus === 3
              ).length +
              this.rowDataChoosen.length)
          );
        },
      },
      freeSlots: {
        get() {
          const freeNull = this.$store.getters.getRowData.filter(function (bl) {
            return bl.booking == null;
          }).length;
          const freeStatus = this.$store.getters.getRowData.filter(function (bl) {
            return Boolean(bl.booking) && bl.booking.bosStatus === 3;
          }).length;
          const totalFree = freeNull + freeStatus - this.rowDataChoosen.length;
          if (totalFree >= this.cruPaxLimit) return this.cruPaxLimit
          return totalFree;
        },
      },      
      blockedSlots: {
        get() {
          let data = this.$store.getters.getRowData;
          const prebloc = data.filter(function (item) {
            if (Boolean(item.booking)) return item.booking.bosStatus == 1;
          });
          return prebloc.length;
        },
      },
      confirmedSlots: {
        get() {
          let data = this.$store.getters.getRowData;
          //var prebloc = data.filter(item => item.bosStatus === 2);
          const prebloc = data.filter(function (item) {
            if (Boolean(item.booking)) return item.booking.bosStatus == 2;
          });
          return prebloc.length;
        },
      },
      allotmentSlots: {
        get() {
          let data = this.$store.getters.getRowData;
          //var prebloc = data.filter(item => item.bosStatus === 2);
          const prebloc = data.filter(function (item) {
            if (Boolean(item.booking)) return item.booking.bosStatus == 5;
          });
          return prebloc.length;
        },
      },
      NASlots: {
        get() {
          let data = this.$store.getters.getRowData;
          //var prebloc = data.filter(item => item.bosStatus === 2);
          const prebloc = data.filter(function (item) {
            if (Boolean(item.booking)) return (item.booking.bosStatus === 6 && item.booking.bosStatusLinked != 0);
          });
          return prebloc.length;
        },
      },      
      NASlotsEnGris: {
        get() {
          let data = this.$store.getters.getRowData;
          //var prebloc = data.filter(item => item.bosStatus === 2);
          const prebloc = data.filter(function (item) {
            if (Boolean(item.booking)) return (item.booking.bosStatus === 6 && item.booking.bosStatusLinked ==
              0 && item.booking.bosConditonLinked == 0);
          });
          return prebloc.length;
        },
      },      
      rowDataChoosen: {
        get() {
          this.$emit(
            "toParentSendChoosenSlot",
            this.$store.getters.getRowDataChoosen(this.depId)
          );
          return this.$store.getters.getRowDataChoosen(this.depId);
        }
      },    
      rowDataHeaderAndSummarySlots: {
        get() {
          return this.$store.getters.getRowDataHeaderAndSummarySlots;
        }
      },
      rowData: {
        get() {
          var self = this;
          this.updateRowDataChoosenFromRowData(this.depId, this
          .clientId); // Actualizo bosStatus desde rowDataAuxiliary a rowDataChoosen y rowData
          let data = this.$store.getters.getRowDataByDepId(this.depId);
          if (data.length < 1) {
            let depId = this.depId;
            if (
              Boolean(this.sendHeader) &&
              Boolean(this.sendHeader.headerCompany)
            ) {
              this.clientId = this.sendHeader.headerCompany.id;
              let cliId = this.clientId;
              this.$store.dispatch("getRowData", {
                depId,
                cliId
              });
            }
          }
          return this.$store.getters.getRowDataByDepId(this.depId);
        },
        set(value) {
          this.$store.commit("setRowData", value);
        }
      },
      rowDataDecks: {
        get() {
          // let data = this.$store.getters.getRowDataDecks;
          let data = this.$store.getters.getRowDataDecks(this.depId);
          if (data.length < 1) {
            this.$store.dispatch("getRowDataDecks", this.depId);
          }
          return this.$store.getters.getRowDataDecks(this.depId);
        },
        set(value) {
          this.$store.commit("setRowDataDecks", value);
        }
      },
      rowDataCabins: {
        get() {
          let data = this.$store.getters.getRowDataCabins(this.depId);
          if (data.length < 1) {
            this.$store.dispatch("getRowDataCabins", this.depId);
          }
          return this.$store.getters.getRowDataCabins(this.depId);
        },
        set(value) {
          this.$store.commit("setRowDataCabins", value);
        }
      }
    },
    methods: {
      /************************************************************************* */
      //Métodos formatStatus, formatDay y formatSlots se encuentran en mixins/slotsFormat
      /************************************************************************* */
      checkAllotmentToEdit() {
        var allotment = "";
        var getBooking = this.rowData.map(a => a.booking);
        if (Boolean(getBooking)) {
          var checkStatus = getBooking.filter(f => f != null && f !== "").some(e => e.bosStatus === 5);
          allotment = checkStatus ? true : false;
        } else {
          allotment = false;
        }
        this.setAllotment = allotment;
        this.$emit("toParentSendAllotment", this.setAllotment );
      },
      checkConfirmationToEdit() {
        var confirmation = "";
        //var getBooking = this.rowData.map(a => a.booking);
        var getBooking = this.sendArrayUpdate.map(a => a.slots).flat();
        if (Boolean(getBooking)) {
          var checkStatus = getBooking.filter(f => f != null && f !== "").some(e => e.bosStatus === 2);
          confirmation = checkStatus ? true : false;
        } else {
          confirmation = false;
        }
        this.setConfirmation = confirmation;
        this.$emit("toParentSendConfirmation", this.setConfirmation );
      },      
      setAllotmentFromEdit(data) {
        this.allotment = data;
      },
      totalAvailableSlotsFromStatitics(data) {
        this.totalAvailableSlots = data;
      },
      clearByCabId(cabId) {
        this.$store.commit("clearRowDataChoosenByCabId", {
          cabId
        });
        // --------------- Método para habilitar los slots en gris al momento de hacer click en "Reset"  --------------- 
        // --------------- TO DO  --------------- 
        // this.$store.commit("enableSlotsNAInCabId", {
        //   cabId
        // });
      },
      clearAllStatusInRowDataChoosen() {
        // --------------- Método para habilitar los slots en gris al momento de hacer click en "CLEAR ALL"  --------------- 
        // --------------- TO DO  --------------- 
        let depId = this.depId;
        this.$store.commit("clearRowDataChoosenInEdit", {
          depId
        });
        this.$store.commit("clearRowDataHeaderAndSummaryByDepId", {
          depId
        });
         this.$store.commit("clearAllStatusInRowDataInEdit", {
          depId
        });
      },

      showClearButtonByCabId(cabId) {
        var slotsInCabin = this.rowDataChoosen.filter(
          item => item.cabId == cabId
        );
        if (slotsInCabin.length > 0) return true;
        else return false;
      },
      updateRowDataChoosenFromRowData(depId, cliId) {
        var self = this;
        this.$store
          .dispatch("getAuxiliaryRowData", {
            depId,
            cliId
          })
          .then(payload => {
            var rowDataAuxiliar = this.$store.getters.getRowDataAuxiliar.filter(function(elemento, indice, array) {                 
                  if(elemento.booking) {
                    return elemento.booking.bokId === self.bokId;
                  }
            });
            rowDataAuxiliar.forEach(function (elemento, indice, array) {
                  self.$store.dispatch("updateRowDataChoosenToUpdate", {
                    elemento,
                    isModeAdd: self.isModeAdd
                  });
            });
          });
      },
      clearRowDataChoosen() {
        let depId = this.depId;
        this.$store.commit("clearRowDataChoosenInEdit", {
          depId
        });
        this.$store.commit("clearRowDataHeaderAndSummaryByDepId", {
          depId
        });
      },
      selectAllForCharter() {
        this.charter = true;
        let depId = this.depId;
        let cliId = this.clientId;
        this.$store
          .dispatch("getRowDataCharter", {
            depId,
            cliId
          })
          .then(() => {
            var self = this;
            this.clearRowDataChoosen();
            let allRowData = this.rowData;
            try {
              var interval = 300;
              for (const [index, elemento] of allRowData.entries()) {
                setTimeout(function () {
                  self.proccessCharterChoosenSlot(elemento);
                }, index * interval);
              }
              let codigoShow = 0;
              this.$store.commit("disableAllSlotsInCharter", {
                codigoShow
              });
              this.$emit("toParentSendCharter", this.charter);
              this.successCharterMessage();
            } catch (error) {
              console.log(error);
            }
          });
      },

      containsInRowDataChossen: function (row) {
        // Método que permite verificar si el botón seleccionado se encuentra en rowDataChoosen, si existe, cambia de color
        var choosen = this.$store.getters.getRowDataChoosen(this.depId);
        var check = choosen.filter(p => p.avsId == row.avsId && p.depId == this.depId);
        return check.length > 0 ? true : false;
      },

      displayNoAvailabilityMessage(){
            var type = "warning filled";
            var title = "Atention";
            var mensaje = "There are no more available spaces";
            this.$notify(type, title, mensaje, {
              duration: 5000,
              permanent: false
            });
    },       
   
      async choosenSlot(row, flag) {
        await this.proccessChoosenSlot(row, flag);               
        return true;
      },           
     
    proccessCharterChoosenSlot(row) {
        let depId = this.depId;
        let cabId = row.cabId;
        
        this.$store
          .dispatch("checkPromotionsByDepId", {
            depId,
            cabId
          })
          .then(payload => {
            var avsId = row.avsId;
            var dataCheckPromotion = payload.data;
            var conditions = "";
            var self = this;
            // 3 Consulto rseId en tabla rse_set en caso de existir el array "dataCheckPromotion"
            this.$store.dispatch("getCharterSeason", avsId).then(payload => {
              self.conditions = payload.data;
              self.setNewRatesFromConditions(self.conditions, row.avsId, flag);
              self.addConditionsToArray(self.conditions, row);
            });
          });
      },    
      async proccessChoosenSlot(row, flag) {
        
        let depId = this.depId;
        let cabId = row.cabId;
        this.$store
          .dispatch("checkPromotionsByDepId", {
            depId,
            cabId
          })
          .then(payload => {
            var avsId = row.avsId;
            var dataCheckPromotion = payload.data;
            var conditions = "";
            var self = this;
            // 3 Consulto rseId en tabla rse_set en caso de existir el array "dataCheckPromotion"
            if (dataCheckPromotion.length > 0) {
              console.warn(
                "1. Si existe variable dataCheckPromotion desde API checkPromotionsByDepId"
              );
              var rseId = dataCheckPromotion.map(a => a.rseId);
              console.warn("2. RseId: " + rseId);
              // 4. Una vez obtenido el rseId, procedo a chequear las promociones
              this.$store
                .dispatch("checkAccessPromotionByRseId", rseId)
                .then(payload => {
                  let dataFromDataRseId = payload.data;
                  if (dataFromDataRseId.length > 0) {
                    console.warn(
                      "3. Si Existe variable checkDataRseId desde API checkAccessPromotionByRseId"
                    );
                    // 6. Consultamos el id del cliente y empatamos con el resultado de la variable checkDataRseId
                    var cliId = this.clientId;
                    console.warn("4. Cliente Id: " + cliId);
                    var checkClientIdInArray = dataFromDataRseId.filter(
                      p => p.rscClientId == cliId
                    );
                    // 6.1. si el id del cliente existen el arry ==> getAnySeason
                    if (checkClientIdInArray.length > 0) {
                      console.warn(
                        "5. El Id del cliente SI coincide en array checkClientIdInArray"
                      );
                      this.$store
                        .dispatch("getAnySeason", avsId)
                        .then(payload => {
                          self.conditions = payload.data;
                          self.setNewRatesFromConditions(self.conditions, row.avsId, row, flag);
                          self.addConditionsToArray(self.conditions, row, flag);
                        });
                    } else {
                      // 6.2. Si el id del cliente no existe en el array => this.getStandarSeason();
                      console.warn(
                        "5. El Id del cliente NO coincide en array checkClientIdInArray"
                      );
                      this.$store
                        .dispatch("getStandarSeason", avsId)
                        .then(payload => {
                          self.conditions = payload.data;
                          self.setNewRatesFromConditions(self.conditions, row.avsId, row, flag);
                          self.addConditionsToArray(self.conditions, row, flag);
                        });
                    }
                    // 7. En caso de que no exista el array, trae GetAnySeason
                  } else {
                    console.warn(
                      "3. No existe variable checkDataRseId desde API checkAccessPromotionByRseId"
                    );
                    
                    this.$store.dispatch("getAnySeason", avsId).then(payload => {
                      self.conditions = payload.data;
                      self.setNewRatesFromConditions(self.conditions, row.avsId, row, flag);
                      self.addConditionsToArray(self.conditions, row, flag);
                    });
                  }
                });
            } else {
              console.warn(
                "5. NO existe variable dataCheckPromotion desde API checkPromotionsByDepId"
              );
              // 8. Si no hay promoción, traigo valor Standar
              this.$store.dispatch("getStandarSeason", avsId).then(payload => {
                self.conditions = payload.data;
                self.setNewRatesFromConditions(self.conditions, row.avsId, row, flag);
                self.addConditionsToArray(self.conditions, row, flag);
                
              });
              console.warn(" *********** FIN FLUJO ********* ");
            }
          });
        return true;
      },

      // ---------------------------------------------------------------------------------------------------------------------------------------------
      // ----------------------------------------------------------------------------- SET GROSS Y NET RATE ------------------------------------------
    async setNewRatesFromConditions(conditions, avsId, row, flag) {

      // console.warn("======================================= setNewRatesFromConditions ====================================")
        // console.log("===> FLAG: " + flag);
        //console.warn("===> avsId: " + avsId);
        // console.log("===> ROW: " + JSON.stringify(row))
        
        /*
        NOTA ADICIONAL:
        En el objeto row, en la parte de booking, vienen 3 campos: savedDprId, savedDprPercent y savedDprAmount. En caso de que
        el slot haya sido guardado bajo una promoción, traerá el id, los porcentajes y montos de esa promoción, independientemente
        de la promoción actual.
        Con estos valores, realizaremos los cálculos con la tarifa OffNetRate original
        */       
        var conditionsFirstElement = conditions.filter(function (array, index, thisValue) {
          if (index === 0) return array;
        });
        //console.warn("===> conditionsFirstElement: " + JSON.stringify(conditions))
        // console.log("===> conditionsFirstElement: " + JSON.stringify(conditionsFirstElement.map(x=>({
        // offGrossRate: x.offGrossRate,
        // offNetRate: x.offNetRate
        // }))))
        
        // Valor de Net para nuevos bloqueos
        let offNetRateFromConditions    = Number(conditionsFirstElement.map((type) => type.offNetRate));
        let offGrossRateFromConditions  = Number(conditionsFirstElement.map((type) => type.offGrossRate));
        let promotionOffNetRate         = Number(conditionsFirstElement.map((type) => type.promotionOffNetRate));        

        // Valores de Gross y Neta para elementos ya guardados
        let savedBosGrossRate  = Number(row.booking ? row.booking.savedBosGrossRate : null);        
        let savedBosNetRate    = Number(row.booking ? row.booking.savedBosNetRate : null);              
        
       let offGrossRate = ""; 
       let offNetRate ="";
       let savedDprId = "";

        if( Boolean(row.booking)){
              savedDprId = Number(row.booking ? row.booking.savedDprId : null);

              console.log("savedDprId: " + savedDprId);

              if(Boolean(savedDprId)){
                console.warn("CASO 1. si hay savedDprId");
                //console.log("savedDprId: " + savedDprId);
                
                let percent = Number(row.booking.savedDprPercent)
                let amount  = Number(row.booking.savedDprAmount)
                  if(Boolean(percent) && !Boolean(amount)){
                    console.warn("CASO 1.1 Hay porcentaje");
                    offGrossRate = Number((percent * savedBosGrossRate / 100) + savedBosGrossRate).toFixed(2);
                  }
                  if(!Boolean(percent) && Boolean(amount)){
                    console.warn("CASO 1.2 Hay monto");
                    offGrossRate  = Number (savedBosGrossRate) + Number(amount);
                  }
              }else{
                  console.warn("CASO 2. NO hay savedDprId. Toma tarifa normal");
                  offGrossRate = Number(savedBosGrossRate);               
              }
        }else{
          //console.log("CASO 3. Es slot nuevo");
            if(Boolean(promotionOffNetRate)) {
              console.warn("CASO 3.1 Si hay promoción")
              offGrossRate = Number(promotionOffNetRate);
            }            
            else {
              console.warn("CASO 3.2 Tarifa normal")
              offGrossRate = Number(offGrossRateFromConditions);
            }
        }
        let priId = Number(conditionsFirstElement.map((type) => type.priId));
        let offId = Number(conditionsFirstElement.map((type) => type.offId));

        /* -------------------- CONFIGURACION DE VALOR DE OFFNET RATE EN BASE A TARIFA GROSS (CON O SIN PROMOCIONES)  -------------------- */
        if( (flag === 'carga-inicial') || (Boolean(savedBosGrossRate))){   

          // Si es 'carga-inicial', la tarifa neta se basa en los valores registrados en la BDD
          // Al momento de hacer unclick en un registro cargado, y nuevamente hago click, verifico que tenga tarifa guardada 
          offNetRate = savedBosNetRate;
          offGrossRate = savedBosGrossRate;

          let originalGrossRate = offGrossRateFromConditions;

           let from = 'carga-inicial';
           let netFromBase = offNetRate;
           let grossFromBase = savedBosGrossRate;
           await this.$store.commit("setRatesEdit", { 
              avsId, 
              offGrossRate, 
              offNetRate, 
              priId, 
              offId, 
              from, 
              netFromBase, 
              grossFromBase,  
              originalGrossRate, 
              savedDprId 
           });
        }
        else 
        if(flag === 'nuevo-registro'){         
          // Si es 'nuevo-registro', la tarifa neta se basa en los cálculos de la promoción
          offNetRate = offGrossRate;
          await this.$store.commit("setRatesBook", { avsId, offNetRate, priId, offId });
        }
        /* -------------------- FIN CONFIGURACION DE VALOR DE OFFNET RATE EN BASE A TARIFA GROSS (CON O SIN PROMOCIONES)  -------------------- */

        // console.log("(*)(*) (*)(*) (*)(*) (*)(*) TARIFA NET original: " + originalOffNetRate)
        // console.log("(*)(*) offGrossRate: " + offGrossRate)
        // console.log("(*)(*) offNetRate: " + offNetRate)
      
      },

      async replaceOriginalConditionsFromMainOriginalArray(avsId){
        console.log(" ________________________________ AVSID: " + avsId);
        //var this.mainOriginalArray.some((item) => item.avsId === avsId)         
        //var existsInOriginalMainArray = this.mainOriginalArray.some((item) => item.avsId === avsId)         
        var existsInOriginalMainArray = this.checkAvsIdInMainOriginalArray(avsId)   
        //console.log("existsInOriginalMainArray: " + existsInOriginalMainArray);
        var foundedSlot = this.mainOriginalArray.filter((item) => item.avsId === avsId)     
        
        //console.log("foundedSlot: " + existsInOriginalMainArray.length);

        if(existsInOriginalMainArray){
          console.log(" ________________________________ A. SI existe en existsInOriginalMainArray");
          //1. Extraigo booking del array inicial
          var originalConditions = foundedSlot.map(a => a.conditions).flat();
           await this.$store.commit("setOriginalConditionsToRowDataChoosenByAvsId", {
              avsId,
              originalConditions
            });

        }else{
          console.log(" ________________________________ B. No existe en choosenSlot");
        }
      },
     
      checkAvsIdInMainOriginalArray(avsId){
        // Retorno true o false si es que existe un registro en mainOriginalArray a traves de avsId
        return this.mainOriginalArray.some((item) => item.avsId === avsId)         
      },

      extractSlotsFromMainOriginalArrayByCabId(cabId){
        return this.mainOriginalArray.filter((item) => item.cabId === cabId)         
      }, 
      
      extractSlotsFromChoosenSlotsByCabId(cabId){
        return this.rowDataChoosen.filter((item) => item.cabId === cabId)         
      },       

      // ---------------------------------------------------------------------------------------------------------------------------------------------
      // ----------------------------------------------------------------------------- SET GROSS Y NET RATE ------------------------------------------    
      async addConditionsToArray(conditions, row, flag) {
        let checkIfExists = this.checkIfExistInChoosenRowDataInDistribution(
          row.avsId
        );

        if (checkIfExists == 0) {
          // Si resultado es 0 significa que voy a AÑADIR un elemento
          if (this.rowDataChoosen.length < this.cruPaxLimit) {
            console.log("AGREGANDO");
            /************************************************************************************************************************ */
            var self = this;
            var cabId = row.avsCabinId;
            var avsIdCondition = row.avsId;
            var depId = this.depId;
            var cliId = this.clientId;
            row = {
              ...row,
              conditions
            };
            await this.$store.commit("setRowDataChoosen", row);
            await this._configConditions(row, depId, cliId);

            // //  ========================================== CHECKEO SI UNCHECKED SLOT ES ORIGINAL (CARGA INICIAL) ===================================
            // --------------------------- En caso de haber hecho uncheck de un slot cargado inicialmente --------------------------- 
            // 1. Añado resultado a un array que servirá como copia estática de lo cargado inicialmente

            // 1.1 Todos los slots que se cargan por primera vez, se añadirán al array mainOriginalArray. Si ya existe, no se añadirá
            let existInInMainArray = await this.checkAvsIdInMainOriginalArray(row.avsId);            
            
            if(flag === 'carga-inicial' && !existInInMainArray) {
              await this.$store.commit("setRowDataChoosenInOriginalArray", row);         
            }
            if(flag === 'nuevo-registro'){     
                await this.replaceOriginalConditionsFromMainOriginalArray(row.avsId);
            }
            // //  ========================================== FIN CHECKEO SI UNCHECKED SLOT ES ORIGINAL (CARGA INICIAL) ===================================


          }
          /************************************************************************************************************************ */
        } else {
          // Si resultado es diferente de 0 significa que voy a QUITAR un elemento
          console.log("QUITANDO");
          this.processUncheck = true;
          this.showAtention = true;
          this.$emit("toParentProcessUncheck", this.processUncheck);
          // Añado array con las condiciones al mutador
          this.$store.commit("setRowDataChoosen", row);
          // Verifico que no existan mas slots escogidos, en caso afirmativo, los oculto
          let depId = row.depId;
          let cabId = row.cabId;
          let avsId = row.avsId;
          let cabMax = row.cabMax;
          //let numberOfSlotsInTheSameCabin = this.getNumberOfSlotsInTheSameCabinInDistribution(row);
          let numberOfSlotsInTheSameCabin = this.getNumberOfSlotsInTheSameCabin(
            depId,
            avsId,
            cabId
          );
          // console.log("******* > Slots en la misma cabina cuando QUITA: " +  numberOfSlotsInTheSameCabin );
          // <!-- ------------------------------- ADECUACION DE MASTER SUITE -------------------------------  -->
          if(cabMax === 4){
              // console.log("numberOfSlotsInTheSameCabin... " + numberOfSlotsInTheSameCabin);
              if (numberOfSlotsInTheSameCabin == 1) {
                let codigoShow = 1;
                this.disableOrEnableAllSlotsInTheSameCabin(row, codigoShow);          // Método en slotsCondition.js
              }else if (numberOfSlotsInTheSameCabin == 2) {
                this._conditionMasterSuite(row, 2)                                    // Método en slotsCondition.js
              }else if (numberOfSlotsInTheSameCabin == 3) {
                this._conditionMasterSuite(row, 3)                                    // Método en slotsCondition.js
              }else if (numberOfSlotsInTheSameCabin == 4) {
                let codigoShow = 0;
                this.disableOrEnableAllSlotsInTheSameCabinWhenShare(row, codigoShow); // Método en slotsCondition.js
              }
          }else{
              if (numberOfSlotsInTheSameCabin >= 2) {
                let codigoShow = 0;
                this.disableOrEnableAllSlotsInTheSameCabinWhenShare(row, codigoShow);
              } else if (numberOfSlotsInTheSameCabin == 1) {
                let codigoShow = 1;
                this.disableOrEnableAllSlotsInTheSameCabin(row, codigoShow);
              } else if (numberOfSlotsInTheSameCabin < 1) {
                //Condición que habilita "enableShare = 1" en caso de que se haya seleccionado SingleF/M y se haga uncheck;
                this.enableAllSlotsOnShare(row.cabId);
              }
          }
          // <!-- ------------------------------- FIN ADECUACION DE MASTER SUITE -------------------------------  -->


            //  ========================================== CHECKEO AFECTACION DE UNCLICK SLOT EN LA CABINA ===================================
            // Si al hacer unclick en un slot (cabina triple), los slots originales deben volver a sus condiciones originales
            
            // 1. Extraig cabId y busco avsId de array mainOriginal
            //console.log("cabId: " + cabId);

            // 1.1 Todos los slots que se cargan por primera vez, se añadirán al array mainOriginalArray. Si ya existe, no se añadirá
            let existingsArrayInCabinFromMainOriginal = this.extractSlotsFromMainOriginalArrayByCabId(cabId);
            // console.log("existingsArrayInCabinFromMainOriginal: " + JSON.stringify(existingsArrayInCabinFromMainOriginal.length));
            // console.log("existingsArrayInCabinFromMainOriginal: " + JSON.stringify(existingsArrayInCabinFromMainOriginal));
            // if(row.from === 'carga-inicial' && !existInInMainArray) {
            //   await this.mainOriginalArray.push(row);
            // }


            // 2. Si existen, buscar por avsIds en choosenSlots

            // if(existingsArrayInCabinFromMainOriginal.length > 0){
            //    console.log("Entre a actualizar")
            //     let existingsArrayInChoosenSlotsByCabId =  this.extractSlotsFromChoosenSlotsByCabId(cabId);
            //      console.log("existingsArrayIn Choosen: " + JSON.stringify(existingsArrayInChoosenSlotsByCabId.length));
            //     if(existingsArrayInChoosenSlotsByCabId.length > 0) {
            //           existingsArrayInCabinFromMainOriginal.forEach((elemento, index) => {
            //               var originalAvsId = elemento.avsId;
            //                 console.log("originalAvsId " + originalAvsId)
            //                   existingsArrayInChoosenSlotsByCabId.forEach((el, ind) => {
            //                       if(el.avsId === originalAvsId){
            //                         console.log("Coindicen en avsId_ " + el.avsId)
            //                         this.replaceOriginalConditionsFromMainOriginalArray(originalAvsId);
            //                       }                              
            //                   });                            
            //           });
            //     }
            // }

            // 3. Actualizar condiciones
            //  ========================================== FIN CHECKEO SI UNCHECKED SLOT ES ORIGINAL (CARGA INICIAL) ===================================
        }       
      },
      checkIfExistInChoosenRowDataInDistribution(avsId) {
        let arrayInStore = this.$store.getters.getRowDataChoosen(this.depId);
        return arrayInStore.filter(p => p.avsId == avsId).length;
      },
      enableAllSlotsOnShare(cabId) {
        let codigoShow = 1;
        this.$store.commit("enableAllSlotsInTheSameCabinOnShare", {
          cabId,
          codigoShow
        });
      },
      tooltipInfoButtonSlot(avsOrder, bosStatus, bosCondition) {
        if (!bosCondition && !bosStatus) {
          return "Free";
        }
        if (bosCondition && bosStatus == 1) {
          switch (bosCondition) {
            case 1:
              return "Single (locked)";
            case 2:
              return "Share M (locked)";
            case 3:
              return "Share F (locked)";
            default:
              return "No defined";
          }
        }
        if (bosCondition && bosStatus == 0) {
          return "Disabled";
        }
      },
    
      // -----------------------------------------------------------------------------------------------------
      // --------------------------------------------- EDIT  -------------------------------------------------
      // -----------------------------------------------------------------------------------------------------
      async fillData() {
        console.log("===========================:::::::::::::::::::: I N I C I O   F I L L D A T A ::::::::::::::::::::========================");
        var self = this;
        await this.clearRowDataChoosen();
        var arrayUpdate = await this.sendArrayUpdate;
        //console.log("2. Datos desde parent: " + arrayUpdate.length);
        var slots = await arrayUpdate.map(a => a.slots);
        if (Boolean(slots[0]) && slots[0].length > 0) {
          
          //1.  ALGORITMO PARA SETEAR DATOS DE TABLA COMO ROWCHOOSENSLOTS:
          var header = arrayUpdate.map(a => a.bookingData);
          var slots = arrayUpdate.map(a => a.slots);
          if ( await Boolean(header[0])) {
            
            var selectedSlotsOnlyVslId = await slots[0]
              .filter(
                a =>
                a.bosStatus == 1 ||
                a.bosStatus == 2 ||
                a.bosStatus == 5 ||
                a.bosStatus == 3
              ) //(* Incluye tanto a los bloqueados como CONFIRMADOS)
              .map(a => a.avsId);
            let depId = await this.depId;
            let cliId = await this.clientId;
            //console.log("2.selectedSlotsOnlyVslId: " + JSON.stringify(selectedSlotsOnlyVslId));
            await this.getRowFromDispatch(depId, cliId, selectedSlotsOnlyVslId);
          }          
        }
        console.log("==================:::::::::::::::::::: F I  N    F I L L D A T A ::::::::::::::::::::====================");
      },
      async getRowFromDispatch(depId, cliId, selectedSlotsOnlyVslId) {
        var self = this;
        // console.log("selectedSlotsOnlyVslId: " + JSON.stringify(selectedSlotsOnlyVslId));
        var self = this;
        let updateRowData = await this.$store.dispatch("getRowData", {
          depId,
          cliId
        });
        var slotsUpdate = await updateRowData.filter(item =>
          selectedSlotsOnlyVslId.includes(item.avsId)
        );
         //console.log("2. slotsUpdate.length: " + JSON.stringify(slotsUpdate.length));
        if (slotsUpdate.length > 0) {
          //var flag = 2;
          for await (const [index, elemento] of slotsUpdate.entries()) {
            // await self.choosenSlot(elemento, flag);
            //setTimeout(() => self.choosenSlot(elemento, flag), 150);
            // setTimeout(() => self.choosenSlot(elemento, flag), 1000);   // Se cambió a 1000 para evitar problemas en seteo de descuento 99% en doble
            
            setTimeout(() => self.choosenSlot(elemento, 'carga-inicial'), 900);             
            
          }
          return true;
        }
         return true;
      },

      // -----------------------------------------------------------------------------------------------------
      // --------------------------------------------- FIN EDIT  ---------------------------------------------
      // -----------------------------------------------------------------------------------------------------
    },
    async mounted() {
      await this.fillData();
      await this.checkAllotmentToEdit();
      await this.checkConfirmationToEdit();
    }
  };
</script>

<style scoped>
  .custom-text-buttons {
    font-size: 8px !important;
  }
</style>