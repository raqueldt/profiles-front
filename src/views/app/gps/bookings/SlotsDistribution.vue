<template>
  <b-container fluid v-if="
                sendHeader.headerCompany &&
                sendHeader.headerCompany.length !== 0
                && validarEmail
              ">
    <div class="w-100 position-relative z-index-1" >
      <!-- SETEO ETIQUETA DE "CHARTER" O "STANDAR" O "PROMOCION" -->
      <div v-if="charter">
        <b-badge variant="primary" pill class="position-absolute badge-top-left" v-if="charter">
          <i class="iconsminds-yes"></i> {{ $t("gps.charter") }}
        </b-badge>
      </div>

      <div>
       <!--  {{promotions['rseId']}} -->
        <b-card v-if="promotions['rseId'] && !charter" no-body class="overflow-hidden">
          <b-row no-gutters>
            <!--     <b-col md="5"> -->
            <!--  {{promotions['imagen']['arcPath']}} -->
            <!--       <b-card-img
                style="
                  card-img {
                    border-radius: calc(0.25rem - 1px);
                    height: 65%;
                    -o-object-fit: cover;
                    object-fit: cover;
                    max-height: 200px;
                    width: unset;
                  }
                "
                v-if="Boolean(promotions['imagen']['arcPath'])"
                :src="getUrlDeckImage(promotions['imagen']['arcPath'])"
                class="rounded-0"
              ></b-card-img>
              <b-card-img
                v-else
                :src="getUrlDecksDefaultImage()"
                class="rounded-0"
              ></b-card-img> -->
            <!--    </b-col> -->
            
            <b-col lg="12" class="text-center mt-1">
            
                <b-button variant="link" v-b-modal.modaldetailpromotion>
                  <h5
                    v-tooltip="{content: 'Show extra information about this promotion', placement: 'top', classes: ['itineraries'],}">
                    <i class="glyph-icon simple-icon-tag mr-1"></i>
                    {{ promotions['rseReference'] }}
                  </h5>
                </b-button>
            
            </b-col>

          </b-row>
        </b-card>
        <!-- {{promotions}} -->
        <b-modal v-if="promotions['rseId']" id="modaldetailpromotion" size="md" :title="'Detail Promotion'"
          hide-footer>
          <detail-promotion-departure :rseId="promotions"></detail-promotion-departure>
        </b-modal>
      </div>

      <!-- FIN SETEO ETIQUETA DE "CHARTER" O "STANDAR" O "PROMOCION" -->
    </div>

    <b-card-group class="space-select">
      <b-card header-tag="header">
        <b-row class="mt-2">
          <b-colxx xxs="12">
            <div v-if="
                sendHeader.headerCompany &&
                sendHeader.headerCompany.length !== 0
                && Boolean(sendHeader.headerCompany.email)
              ">
              <!-- -----------------------------------<br>
            cruPaxLimit: {{cruPaxLimit}}<br>
            confirmed: {{confirmedSlots}}<br>
            blockedSlots: {{blockedSlots}}<br>
            freeSlots : {{freeSlots}}<br>
            rowDataChoosen: {{rowDataChoosen.length}}<br>
            totalConfirmedSlots: {{totalConfirmedSlots}}<br>
            totalBlockedSlots: {{totalBlockedSlots}}<br>
            allotmentSlots: {{allotmentSlots}}<br>
            NASlots: {{NASlots}}
            ------
            totalAvailableSlots: {{totalAvailableSlots}}
            ----------------------------------- -->


              <!-- cruPaxLimit: {{cruPaxLimit}}<br>
            ==> rowData: {{rowData.length}}<br></br>
            confirmed: {{confirmedSlots}}<br>
            blockedSlots: {{blockedSlots}}<br>
            freeSlots : {{freeSlots}}<br>
            rowDataChoosen: {{rowDataChoosen.length}}<br>
            totalConfirmedSlots: {{totalConfirmedSlots}}<br>
            totalBlockedSlots: {{totalBlockedSlots}}<br>
            allotmentSlots: {{allotmentSlots}}<br>
            NASlots: {{NASlots}}<br>
           NASlotsEnGris: {{NASlotsEnGris}}<br>
            ------
            totalAvailableSlots: {{totalAvailableSlots}} -->

              <!-- Estatisticas de slots, Allotment y botón de ClearAll -->
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
                tag="create" 
                @clearRowDataChoosen="clearRowDataChoosen"
                @setAllotment="setAllotment" 
                @totalAvailableSlotsFromStatitics="totalAvailableSlotsFromStatitics" 
                @selectAllForCharter="selectAllForCharter"></slotsstatistics>
              <!-- Fin Estatisticas de slots, Allotment y botón de ClearAll -->
            </div>
          </b-colxx>
        </b-row>
        <b-card-text :class="
            rowDataDecks.length < 3 ? 'scroll--inactive' : 'scroll--active'
          ">
          <div v-if="
              sendHeader.headerCompany && sendHeader.headerCompany.length !== 0  && sendHeader.headerCompany.email
            ">
            <!-- MENSAJE MAXIMA CAPACIDAD DE VESSEL -->
            <div v-if="rowDataChoosen.length >= cruPaxLimit">
              <div class="alert alert-warning rounded">
                <i class="iconsminds-yacht"></i>
                {{ $t("gps.maximun-choosen-slots") }}
              </div>
            </div>
            <!-- <div class="separator mb-3"></div> -->
            <!-- FIN MENSAJE MAXIMA CAPACIDAD DE VESSEL -->

            <!-- FIN CONTENEDOR DE ICONOS INFORMATIVOS Y BOTONES DE LIMPIEZA Y SELECCION -->
            <b-row class="space-selector" v-for="item2 in rowDataDecks" :key="item2.decId">
              <b-colxx xxs="12">
                <div>
                  <b-colxx xxs="12" class="mt-1 d-flex p-0 name-deck">
                    <div :class="item2.decNameA + '-color id-color'"></div>
                    <h6>
                      <label>{{ item2.decNameA }}</label>
                    </h6>
                  </b-colxx>
                </div>
                <!-- <div class="d-flex p-2 pl-1" style="border:solid 1px red"> -->
                <!-- {{item2}} -->
                <div class="d-flex mb-3 ml-2">
                  <div v-for="cabin in item2.cabins" :key="cabin.cabId" class="p-1" :class="item2.decNameA">
                    <a v-if="showClearButtonByCabId(cabin.cabId)" :class="item2.decNameA" data-toggle="tooltip"
                      data-placement="top" title="Reset slots" @click.prevent="clearByCabId(cabin.cabId)"
                      href="#contact">
                      <i class="glyph-icon iconsminds-reload-1"></i> </a>{{ cabin.cabCode }}

                    <div>
                      <div v-if="rowData.length">
                        <div v-for="(row, index) in rowData" :key="index" class="btn-group" role="group"
                          aria-label="Basic example">
                          <!-- && Boolean(row.booking) -->
                          <div v-if="row.avsCabinId == cabin.cabId">
                            <!-- ***************** BOTON SLOT *****************  -->
                            <!-- {{proccessSlot}} -->

                            <template v-if="!proccessSlot">
                              <b-button @click="choosenSlot(row)" class="space btn" :id="`popover-target-${row.avsId}`"
                                :disabled="_disableButtonInBlocking(row)" :class="
                                containsInRowDataChossen(row) ? 'clicked' : ''
                              " :variant="_formatSlotsAvailability(row, freeSlots)">
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
                                }}</span>
                              </b-button>
                            </template>
                            <template v-else>
                              <b-spinner small type="grow" label="Small Spinner"></b-spinner>
                            </template>

                            <!-- <br><small>{{row.avsId}} |</small><br> -->
                            <!-- <br><small>S:{{row.booking ? row.booking.bosStatus : "-"}}</small><br>
                            <br><small>C:{{row.booking ? row.booking.bosCondition : "-"}}</small><br></br> -->
                            <!-- <pre>{{row.booking}}</pre> -->

                            <!-- COMENTAR / DESCOMENTAR -->
                            <!-- <br><small>S:
                              {{
                                row.booking ? row.booking.bosStatus : "-"
                              }}</small>
                              <br>
                              <small>CL:
                              {{
                                row.booking ? row.booking.bosConditionLinked : "-"
                              }}</small><br>
                              <small>SL:
                              {{
                                row.booking ? row.booking.bosStatusLinked : "-"
                              }}</small> -->

                            <!-- <br><small>{{row.avsId}} |</small> -->

                            <!-- <br /><small>{{ row.avsId }} |</small> <br /><small
                              >S:
                              {{
                                row.booking ? row.booking.bosStatus : "-"
                              }}</small
                            >
                            <br /><small
                              >C:
                              {{
                                row.booking ? row.booking.bosCondition : "-"
                              }}</small
                            ><br />
                            <small>
                              CL:{{
                                row.booking ? row.booking.bosConditionLinked : "-"
                              }}
                            </small
                            ><br/> -->

                            <!-- <br /><small
                              >Cb:
                              {{
                                row.avsCabinId
                              }}</small
                            ><br /> -->

                            <!-- FIN COMENTAR / DESCOMENTAR -->

                            <!-- ***************** FIN BOTON SLOT *****************  -->
                            <!-- custom-info space-info hold ribbon-wrapper  -->
                            <b-popover :target="`popover-target-${row.avsId}`" triggers="hover" placement="top"
                              container="special-popover" variant="space-info hold ribbon-wrapper card"
                              :key="`popover-slot-${row.avsId}`">
                              <template #title>
                                <div class="
                                    w-100
                                    d-flex
                                    flex-column
                                    text-lg-center
                                  ">
                                  <div v-if="Boolean(row.booking)">
                                    <div v-if="row.booking.bosStatus == 1">
                                      <div class="text-center w-100 py-1 px-1">
                                        <small>
                                          <b-button block style="cursor: default" class="space btn text-white" :variant="
                                              _formatSlots(
                                                row.booking.bosStatus
                                              )
                                            ">
                                            <i class="fas fa-check"></i>
                                            {{
                                              _formatStatus(
                                                row.booking.bosStatus
                                              )
                                            }}
                                          </b-button>
                                        </small>
                                      </div>
                                    </div>
                                    <div v-if="row.booking.bosStatus == 2">
                                      <div class="text-center w-100 py-1 px-1">
                                        <small>
                                          <b-button block style="cursor: default" class="space btn text-white" :variant="
                                              _formatSlots(
                                                row.booking.bosStatus
                                              )
                                            ">
                                            <i class="fas fa-check"></i>
                                            Confirmed
                                          </b-button>
                                        </small>
                                      </div>
                                    </div>
                                    <div v-if="row.booking.bosStatus == 3">
                                      <div class="
                                          text-center
                                          bg-success
                                          w-100
                                          py-1
                                          px-1
                                        ">
                                        <small class="text-white">
                                          <i class="fas fa-check"></i> Free slot
                                        </small>
                                      </div>
                                    </div>
                                  </div>
                                  <div v-else-if="!Boolean(row.booking)">
                                    <div class="
                                        text-center
                                        bg-success
                                        w-100
                                        py-1
                                        px-1
                                      ">
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

                              <!-- <hr class="mt-0" /> -->
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
              </b-colxx>
            </b-row>
          </div>
        </b-card-text>
      </b-card>
    </b-card-group>
    <!-- <pre>{{rowDataChoosen}}</pre> -->
    <!-- totalAvailableSlots: {{totalAvailableSlots}} -->

    <!-- MENSAJE DE ADVERTENCIA AL MOMENTO DE SELECCIONAR UN SLOT EN MEDIO DE N/A SIN BOSLINKEDCONDITION -->
    <b-alert show variant="warning" v-if="messageNA">
      <b-row>
        <b-colxx xxs="1">
          <span class="alert-icon" :class="type"><i class="glyph-icon simple-icon-exclamation"></i></span>
        </b-colxx>
        <b-colxx xxs="9">
          <b>Warning</b>
          <div class="alert-text">{{ messageNA }}</div>
        </b-colxx>
      </b-row>
    </b-alert>
    <!-- MENSAJE DE ADVERTENCIA AL MOMENTO DE SELECCIONAR UN SLOT EN MEDIO DE N/A SIN BOSLINKEDCONDITION -->

    <!-- PROMOCIONES:

{{promotions}} -->
    <!-- {{promotions}} -->

    <!-- MENSAJE DE PROMOCIONES -->
    <!--        <b-alert show variant="success" v-if="promotions.length">
              <b-row>
                  <b-colxx xxs="1">
                    <span class="alert-icon" :class="2"><i class="glyph-icon simple-icon-exclamation"></i></span>
                  </b-colxx>
                  <b-colxx xxs="9">
                    <span class="h4">Promotions</span>
                    <div class="alert-text">

                      This departure has discount off the rack rate on:
                      <b>Promotion: </b>{{ String(promotions.map(a => a.rseReference))}}<br>
                      <b>priName: </b>{{ String (promotions.map(a => a.priName)) }}<br>

                      <ul class="list-group">
                          <li v-for="(promotion, index) in promotions.map(a => a.cabins).flat()"
                              :key="index" class="list-group-item">
                            {{ promotion.catName }}
                          </li>
                      </ul>


                    </div>
                  </b-colxx>
              </b-row>
            </b-alert> -->
    <!-- FIN MENSAJE DE PROMOCIONES -->
  </b-container>
</template>

<script>
  import Vue2Filters from "vue2-filters";
  import slotsConditions from "../../../../mixins/slots/slotsConditions.js";
  import slotsConditionsOnClick from "../../../../mixins/slots/slotsConditionsOnClick.js";
  import slotsFormat from "../../../../mixins/slots/slotsFormat.js";
  import DeparturesServices from "@/services/gps/departures/DeparturesServices";
  import AvailabilityslotsServices from "../../../../services/gps/availabilityslots/availabilityslotsServices.js";
  import FileboxServices from "@/services/gps/filebox/FileboxServices.js";
  
  //import moment from "moment";

  import { mapGetters, mapMutations } from 'vuex'

  export default {

    name: 'SlotsDistribution',

    components: {},

    props: ["depId", "vslCapacity", "sendHeader", "cruPaxLimit"],

    mixins: [
      slotsConditions,
      slotsConditionsOnClick,
      slotsFormat,
      Vue2Filters.mixin,
    ],

    data() {
      return {
        clientId: "",
        allotment: "",
        charter: false,
        priName: "",
        totalAvailableSlots: "",
        //rowData: [],
        promotions: [],
        proccessSlot: false
      };
    },


    watch: {

      sendHeader: {
        deep: true,
        handler: function (val) {
          if (val.headerCompany.id) {
            this.clientId = val.headerCompany.id;
          }
        },
      },

      'sendHeader.headerCompany.empid': function (newVal, oldVal) {
        // Limpio slots seleccionados cuando cambio de cliente
        this.clearRowDataChoosen();
      },

      allotment: function () {
        this.$emit("toParentSendAllotment", this.allotment);
      },

      clientId: function () {
        this.refreshRowData();
      },

      depId: function ( currentValue, previousValue) {

        if ( currentValue ) this.loadPromotions()

      }

    },


    computed: {

      totalConfirmedSlots() {
        return this.rowDataChoosen.length + this.confirmedSlots;
      },

      totalBlockedSlots() {
        return this.rowDataChoosen.length + this.blockedSlots;
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
          //var prebloc = data.filter(item => item.bosStatus === 1);
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
        },
      },

      rowDataHeaderAndSummarySlots: {
        get() {
          return this.$store.getters.getRowDataHeaderAndSummarySlots;
        },
      },

      rowData: {
        get() {
          this.updateRowDataChoosenFromRowData(this.depId, this
          .clientId); // Actualizo bosStatus desde rowDataAuxiliary a rowDataChoosen y rowData
          let data = this.$store.getters.getRowDataByDepId(this.depId);

          //Configuración nombre de tarifa (promocion o standar)
          if (Boolean(data[0])) {
            this.priName =
              data[0].priName != "" ?
              data[0].priName + "  " + data[0].rseReference :
              "No specified";
          }
          if (data.length < 1) {
            this.clientId = this.sendHeader.headerCompany.id;
          }
          return this.$store.getters.getRowDataByDepId(this.depId);
        },
        set(value) {
          this.$store.commit("setRowData", value);
        }
      },

      rowDataDecks: {
        get() {
          let data = this.$store.getters.getRowDataDecks(this.depId);
          if (data.length < 1) {
            this.$store.dispatch("getRowDataDecks", this.depId);
          }
          return this.$store.getters.getRowDataDecks(this.depId);
        },
        set(value) {
          this.$store.commit("setRowDataDecks", value);
        },
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
        },
      },
      validarEmail: function () {
        var valor = this.sendHeader.headerCompany.email;
        var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
          if (emailRegex.test(valor)) return true;
          else return false;          
      }, 
    },


    methods: {

      ...mapMutations('booking-module', ['setLoadingState']),

      getUrlDeckImage(path) {
        let url = FileboxServices.serverUrl + path;
        return url;
      },

      getUrlDecksDefaultImage() {
        let url = FileboxServices.urlDefaulImages + "deckDefault.jpg";
        return url;
      },

      /************************************************************************* */
      //Métodos formatStatus, formatDay y formatSlots se encuentran en mixins/slotsFormat
      /************************************************************************* */
      clearByCabId(cabId) {
        this.$store.commit("clearRowDataChoosenByCabId", {
          cabId,
        });
      },

      showClearButtonByCabId(cabId) {
        var slotsInCabin = this.rowDataChoosen.filter(
          (item) => item.cabId == cabId
        );
        if (slotsInCabin.length > 0) return true;
        else return false;
      },

      setAllotment(data) {
        this.allotment = data;
      },

      totalAvailableSlotsFromStatitics(data) {
        this.totalAvailableSlots = data;
      },

      updateRowDataChoosenFromRowData(depId, cliId) {
        var self = this;
        this.$store
          .dispatch("getAuxiliaryRowData", {
            depId,
            cliId,
          })
          .then((payload) => {
            var rowDataAuxiliar = this.$store.getters.getRowDataAuxiliar;
            rowDataAuxiliar.forEach(function (elemento, indice, array) {
              self.$store.dispatch("updateRowDataChoosenFromRowData", {
                elemento,
              });
            });
          });
      },


      containsInRowDataChossen: function (row) {
        // Método que permite verificar si el botón seleccionado se encuentra en rowDataChoosen, si existe, cambia de color
        const choosen = this.$store.getters.getRowDataChoosen(this.depId);
        const check = choosen.filter(
          (p) => p.avsId == row.avsId && p.depId == this.depId
        );
        return check.length > 0 ? true : false;
      },

      clearRowDataChoosen() {
        this.allotment = false;
        let depId = this.depId;
        if (this.rowDataChoosen.length == this.cruPaxLimit) {
          this.switchToNormalOrStandar();
          this.charter = false;
        }
        this.$store.commit("clearRowDataChoosen", {
          depId,
        });
        this.$store.commit("clearRowDataHeaderAndSummaryByDepId", {
          depId,
        });

        this.$emit("toParentSendCharter", this.charter);
      },

      // ------------------------------------ PROCESO PARA CHARTER ----------------------------------
      async selectAllForCharter() {

        this.charter = true;
        let depId = this.depId;
        this.clientId = this.sendHeader.headerCompany.id;
        let cliId = this.clientId;

        /*LLamo a API getAllCharter que trae valores de tarifa charter para pintar los slots
            La tarifa Charter tiene que estar activa, caso contrario aparecerá el mensaje de que no existen Tarifas Charter*/

        this.$store.commit("startProccessingCharter");
        let allRowData = await this.$store.dispatch("getRowDataCharter", { depId,  cliId });

        this.clearRowDataChoosen();

        const response = await this.loopCharter(allRowData);

        if (response) this.$store.commit("stopProccessingCharter");
        console.log(
          " ------------------------------ FINALIZACION CHARTER------------------------------------------"
        );

      },

      async loopCharter(allRowData) {
        var self = this;
        try {
          if (allRowData.length > 0) {
            //console.log("========> allRowData: " + JSON.stringify(allRowData));
            for (const [index, elemento] of allRowData.entries()) {
              await self.proccessCharterChoosenSlot(elemento);
            }
            let codigoShow = 0;
            this.$store.commit("disableAllSlotsInCharter", { codigoShow });
            this.$emit("toParentSendCharter", this.charter);
            this.successCharterMessage();
          } else {
            this.noCharterMessage();
          }
          return await true; // ???
        } catch (error) {
          console.log(error);
        }
      },


      async proccessCharterChoosenSlot(row) {

        let depId = this.depId;
        let cabId = row.cabId;

        const payload = await this.$store.dispatch("checkPromotionsByDepId", { depId,  cabId })


        const avsId = row.avsId;
        const dataCheckPromotion = payload.data;
        const conditions = "";
        const self = this;

        // 3 Consulto rseId en tabla rse_set en caso de existir el array "dataCheckPromotion"
        const payloadCharterSeason = await this.$store.dispatch("getCharterSeason", avsId)

        self.conditions = payloadCharterSeason.data;
        self.setNewRatesFromConditions(self.conditions, row.avsId);
        self.addConditionsToArray(self.conditions, row);

        return true;

      },

      // ------------------------------------ FIN PROCESO PARA CHARTER ----------------------------------
      successCharterMessage() {
        const type = "success filled";
        const title = "Success";
        const mensaje = "Charter season configured correctly";
        this.$notify(type, title, mensaje, {  duration: 3000, permanent: false });
      },


      noCharterMessage() {
        const type = "warning filled";
        const title = "Warning";
        const mensaje = "No charter season configured. Please contact with Administrator";
        this.$notify(type, title, mensaje, { duration: 5000, permanent: false });
      },

      switchToNormalOrStandar() {
        let depId = this.depId;
        this.clientId = this.sendHeader.headerCompany.id;
        let cliId = this.clientId;
        this.$store.dispatch("getRowData", { depId, cliId });
      },


      choosenSlot(row) {
        // VALIDACION CHARTER
        // Validación del último click previo a completar los 16 slots. Se pregunta si quiere convertir a CHARTER
        if (this.rowDataChoosen.length == this.cruPaxLimit - 1) {
          this.$swal({
            title: "Convert to charter?",
            text: "It seems that yo want to convert to charter. Do you want to convert it?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, convert all!",
            cancelButtonText: "No, cancel!",
            confirmButtonColor: "#ED7117",
            reverseButtons: true,
          }).then((result) => {
            if (result.isConfirmed) {
              this.selectAllForCharter();
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === this.$swal.DismissReason.cancel
            ) {
              // Elimino el ultimo elemento del array para evitar el bucle
              const last = this.rowDataChoosen.pop();
              const lastAvsId = last.avsId;
              this.$store.commit("deleteLastItemInRowDataChoosenByAvsId", { avsId: lastAvsId });
            }
          });
          // FIN VALIDACION CHARTER
        } else {
          //totalAvailableSlots viene de SlotsStatitics
          if (this.totalAvailableSlots != 0 && this.totalAvailableSlots > 0) this.proccessChoosenSlot(row);
          else this.displayNoAvailabilityMessage();
          // if( (this.totalAvailableSlots != 0) || !Boolean(row.booking) || Boolean(row.booking == 3)) this.proccessChoosenSlot(row);
        }
      },

      displayNoAvailabilityMessage() {
        const type = "warning filled";
        const title = "Atention";
        const mensaje = "There are no more available spaces";
        this.$notify(type, title, mensaje, {  duration: 5000, permanent: false });
      },

      proccessChoosenSlot(row) {
        if (!Boolean(row.booking) || Boolean(row.booking.status === 3)) {

          let depId = this.depId;
          let cabId = row.cabId;
          this.proccessSlot = true;
          this.$store
            .dispatch("checkPromotionsByDepId", { depId, cabId })
            .then((payload) => {
              const avsId = row.avsId;
              const dataCheckPromotion = payload.data;
              const conditions = "";
              const self = this;
              // 3 Consulto rseId en tabla rse_set en caso de existir el array "dataCheckPromotion"
              if (dataCheckPromotion.length > 0) {
                console.warn(
                  "1. Si existe variable dataCheckPromotion desde API checkPromotionsByDepId"
                );
                var rseId = dataCheckPromotion.map((a) => a.rseId);
                console.warn("2. RseId: " + rseId);
                // 4. Una vez obtenido el rseId, procedo a chequear las promociones
                this.$store
                  .dispatch("checkAccessPromotionByRseId", rseId)
                  .then((payload) => {
                    let dataFromDataRseId = payload.data;
                    if (dataFromDataRseId.length > 0) {
                      console.warn(
                        "3. Si Existe variable checkDataRseId desde API checkAccessPromotionByRseId"
                      );
                      // 6. Consultamos el id del cliente y empatamos con el resultado de la variable checkDataRseId
                      var cliId = this.clientId;
                      console.log(" ================> Cliente Id: " + cliId);
                      console.warn("4. Cliente Id: " + cliId);
                      var checkClientIdInArray = dataFromDataRseId.filter(
                        (p) => p.rscClientId == cliId
                      );
                      // 6.1. si el id del cliente existen el arry ==> getAnySeason
                      if (checkClientIdInArray.length > 0) {
                        console.warn(
                          "5. El Id del cliente SI coincide en array checkClientIdInArray"
                        );
                        this.$store
                          .dispatch("getAnySeason", avsId)
                          .then((payload) => {
                            self.conditions = payload.data;
                            self.setNewRatesFromConditions(
                              self.conditions,
                              row.avsId
                            );
                            self.addConditionsToArray(self.conditions, row);
                          });
                      } else {
                        // 6.2. Si el id del cliente no existe en el array => this.getStandarSeason();
                        console.warn(
                          "5. El Id del cliente NO coincide en array checkClientIdInArray"
                        );
                        this.$store
                          .dispatch("getStandarSeason", avsId)
                          .then((payload) => {
                            self.conditions = payload.data;
                            self.setNewRatesFromConditions(
                              self.conditions,
                              row.avsId
                            );
                            self.addConditionsToArray(self.conditions, row);
                          });
                      }
                      // 7. En caso de que no exista el array, trae GetAnySeason
                    } else {
                      console.warn(
                        "4. No existe variable checkDataRseId desde API checkAccessPromotionByRseId"
                      );
                      this.$store
                        .dispatch("getAnySeason", avsId)
                        .then((payload) => {
                          self.conditions = payload.data;
                          self.setNewRatesFromConditions(
                            self.conditions,
                            row.avsId
                          );
                          self.addConditionsToArray(self.conditions, row);
                        });
                    }
                  });
              } else {
                console.warn(
                  "5. NO existe variable dataCheckPromotion desde API checkPromotionsByDepId"
                );
                // 8. Si no hay promoción, traigo valor Standar

                this.$store
                  .dispatch("getStandarSeason", avsId)
                  .then((payload) => {
                    self.conditions = payload.data;
                    self.setNewRatesFromConditions(self.conditions, row.avsId);
                    self.addConditionsToArray(self.conditions, row);
                  });
                console.warn(" *********** FIN FLUJO ********* ");
              }
              this.proccessSlot = false;
            });
        }
      },


      // ---------------------------------------------------------------------------------------------------------------------------------------------
      // ----------------------------------------------------------------------------- SET GROSS Y NET RATE ------------------------------------------


      // async setNewRatesFromConditions(conditions, avsId) {
      //   // Método que sirve para traer el valor de offNetRate y colocarlo en los campos offNetRate, offGrossRate y rate
      //   // de la consulta original. Estos valores vienen correctos al momento de consultar las conditions, por lo que
      //   // desde el array principal, se trae los 3 campos anteriores con valores vacios
      //   const conditionsFirstElement = conditions.filter(function (
      //     array,
      //     index,
      //     thisValue
      //   ) {
      //     if (index === 0) return array;
      //   });
      //   const offNetRate = Number(
      //     conditionsFirstElement.map((type) => type.offNetRate)
      //   );
      //   const priId = Number(conditionsFirstElement.map((type) => type.priId));
      //   const offId = Number(conditionsFirstElement.map((type) => type.offId));
      //   await this.$store.commit("setRates", {
      //     avsId,
      //     offNetRate,
      //     priId,
      //     offId
      //   });
      // },



      async setNewRatesFromConditions(conditions, avsId) {
        // Método que sirve para traer el valor de offNetRate y colocarlo en los campos offNetRate, offGrossRate y rate
        // de la consulta original. Estos valores vienen correctos al momento de consultar las conditions, por lo que
        // desde el array principal, se trae los 3 campos anteriores con valores vacios

        const conditionsFirstElement = conditions.filter(function (
          array,
          index,
          thisValue
        ) {
          if (index === 0) return array;
        });
        
        
        var offNetRate = 0;
        const offNetRateFinal = Number(
          conditionsFirstElement.map((type) => type.offNetRate)
        );
        const promotionOffNetRateFinal = Number(
          conditionsFirstElement.map((type) => type.promotionOffNetRate)
        );

        // Validación para traer tarifa estandar o promocional
        if(Boolean(promotionOffNetRateFinal) || promotionOffNetRateFinal > 0 ) offNetRate = Number(promotionOffNetRateFinal);
        else offNetRate = Number(offNetRateFinal);

        const priId = Number(conditionsFirstElement.map((type) => type.priId));
        const offId = Number(conditionsFirstElement.map((type) => type.offId));

        await this.$store.commit("setRates", {
          avsId,
          offNetRate,
          priId,
          offId
        });

      },

      // ---------------------------------------------------------------------------------------------------------------------------------------------
      // ----------------------------------------------------------------------------- SET GROSS Y NET RATE ------------------------------------------
      async addConditionsToArray(conditions, row) {

        let checkIfExists = this.checkIfExistInChoosenRowDataInDistribution(  row.avsId );

        if (checkIfExists == 0) {
          // Si resultado es 0 significa que voy a AÑADIR un elemento
          if (this.rowDataChoosen.length < this.cruPaxLimit) {
            console.log("AGREGANDO");

            /************************************************************************************************************************ */
            const depId = this.depId;
            const cliId = this.clientId;

            row = {
              ...row,
              conditions,
            };

            // console.log(" ROW (2): " + JSON.stringify(row));
            this.$store.commit("setRowDataChoosen", row);
            this._configConditions(row, depId, cliId);

          }
          /************************************************************************************************************************ */
        } else {
          // Si resultado es diferente de 0 significa que voy a QUITAR un elemento
          console.log("QUITANDO");
          // Añado array con las condiciones al mutador
          this.$store.commit("setRowDataChoosen", row);

          // Verifico que no existan mas slots escogidos, en caso afirmativo, los oculto
          let depId = row.depId;
          let cabId = row.cabId;
          let avsId = row.avsId;
          let cabMax = row.cabMax;
          
          let numberOfSlotsInTheSameCabin = this.getNumberOfSlotsInTheSameCabin(  depId, avsId, cabId );
          // console.log("**** > Slots en la misma cabina cuando QUITA: " + numberOfSlotsInTheSameCabin);
          // console.log("**** > row " + JSON.stringify(row));

          // <!-- ------------------------------- ADECUACION DE MASTER SUITE -------------------------------  -->
          if(cabMax === 4){
              console.log("numberOfSlotsInTheSameCabin... " + numberOfSlotsInTheSameCabin);
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

          //=== > ORIGINAL
          // if (numberOfSlotsInTheSameCabin >= 2) {
          //   let codigoShow = 0;
          //   this.disableOrEnableAllSlotsInTheSameCabinWhenShare(row, codigoShow);
          // } else if (numberOfSlotsInTheSameCabin == 1) {
          //   let codigoShow = 1;
          //   this.disableOrEnableAllSlotsInTheSameCabin(row, codigoShow);
          // } else if (numberOfSlotsInTheSameCabin < 1) {
          //   //Condición que habilita "enableShare = 1" en caso de que se haya seleccionado SingleF/M y se haga uncheck;
          //   this.enableAllSlotsOnShare(row.cabId);
          // }
        }
      },
      checkIfExistInChoosenRowDataInDistribution(avsId) {
        let arrayInStore = this.$store.getters.getRowDataChoosen(this.depId);
        return arrayInStore.filter((p) => p.avsId == avsId).length;
      },

      enableAllSlotsOnShare(cabId) {
        let codigoShow = 1;
        this.$store.commit("enableAllSlotsInTheSameCabinOnShare", {
          cabId,
          codigoShow,
        });
      },

      tooltipInfoButtonSlot(avsOrder, bosStatus, bosCondition) {

        if (!bosCondition && !bosStatus)   return "Free";

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

        if (bosCondition && bosStatus == 0)  return "Disabled";

      },


      async refreshRowData() {

        this.updateRowDataChoosenFromRowData(this.depId, this.clientId); // Actualizo bosStatus desde rowDataAuxiliary a rowDataChoosen y rowData

        const depId = this.depId;
        const cliId = this.clientId;

        let payload = await this.$store.dispatch("getRowDataByDepId", { depId, cliId })

        this.rowData = payload.data;
        const data = payload.data;

         if (Boolean(data[0])) {
              this.priName =  data[0].priName != "" ?  data[0].priName + "  " + data[0].rseReference : "No specified";
         }

        if (data.length < 1) {
              this.clientId = this.sendHeader.headerCompany.id;
        }

        this.$store.commit("setRowData", this.rowData);


      },


      async loadPromotions() {

        this.promotions = []

        const depId = this.depId;

        try {

          this.setLoadingState(true)

          const { data } = await AvailabilityslotsServices.promotionByDeparture( depId )

          this.promotions = data

          this.setLoadingState(false)

        } catch (error) {

          console.log("UNEXPECTED", error)

        }


      },


    },



    async created() {

    },

    mounted() {
      //Limpio Slots seleccionados de entrada
      setTimeout(() => this.clearRowDataChoosen(), 250);

    },
  };

</script>

<style scoped>
  .space.btn {
    font-size: 0.57rem !important;
  }

</style>
