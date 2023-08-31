<template>
  <b-container fluid>
    <!-- SELECCION DE CONDICIONES EN CABINAS -->
    <!-- <pre>{{ (sendArrayUpdate.map(a => a.slots).flat()).map(a => a.bosStatus) }}</pre> -->
    <!-- <pre>{{ (sendArrayUpdate.map(a => a.slots).flat()) }}</pre> -->

    <!-- <pre>==> {{choosenSlot.length}}</pre>
    <pre>==> {{Boolean(choosenSlot)}}</pre> -->

    <!-- <pre>sendAllotment: {{sendAllotment.map(a => a.slots).flat().map(x=>({
  avsId: x.avsId, 
  bosStatus: x.bosStatus, 
  bosCondition: x.bosCondition}))}} </pre> -->
    <!-- <h4>sendAllotment: {{sendAllotment}}</h4><br>
<h4>sendConfirmation: {{sendConfirmation}}</h4> -->

    <!-- <pre>{{choosenSlot.map(x=>({
  from: x.from,
  //avsId: x.avsId, 
  //bosStatus: x.bosStatus, 
  //bosCondition: x.bosCondition,
  //offGrossRate: x.offGrossRate,
  //offNetRate: x.offNetRate,
  newOffGrossRate: x.newOffGrossRate,
  newOffNetRate: x.newOffNetRate,
  netFromBase: x.netFromBase,
  finalNetRate: x.finalNetRate
  //booking: x.booking? x.booking: null
  }))}}</pre>  -->

    <!-- <pre>{{choosenSlot}}</pre> -->

    <!-- sendChoosenSlot: {{sendChoosenSlot.length}}<br>
originalDataFromEditBookingLength: {{originalDataFromEditBookingLength}} -->

    <!-- loaderSummary: {{loaderSummary}} -->

    <div v-if="!loaderSummary">

      <div class="d-flex flex-column align-items-center justify-content-center" style="height:500px;">
        <div class="row">
          <b-spinner variant="primary" label="Loading..."></b-spinner>
        </div>
        <div class="row">
          <strong>Loading rates </strong>
        </div>
      </div>

    </div>
    <div v-else>
      <b-card-group deck class="summary">
        <b-card>
          <b-card-header style="padding: 0rem 1.25rem;">
            <b-container fluid class="text-center">
              <b-row align-h="center">
                <b-col cols="4">
                  <div class="d-flex">
                    <div src="/assets/img/profiles/l-1.jpg" alt="Card image cap"
                      class="align-self-center list-thumbnail-letters pax rounded-circle m-0  small">
                      <i class="far fa-user"></i>
                    </div>
                    <div class="d-flex flex-grow-1 min-width-zero ml-3 mt-2">
                      <div
                        class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero text-center">
                        <div class="min-width-zero">
                          <h6 class="mb-0 card-subtitle truncate font-weight-bold">
                            {{ choosenSlot.length }}
                          </h6>
                          <p class="text-muted text-small mb-2">Pax</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-col>
                <b-col cols="4">
                  <div class="d-flex">
                    <div src="/assets/img/profiles/l-1.jpg" alt="Card image cap"
                      class="align-self-center list-thumbnail-letters total rounded-circle m-0  small">
                      <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div class="d-flex flex-grow-1 min-width-zero ml-3 mt-2">
                      <div
                        class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero text-center">
                        <div class="min-width-zero">
                          <h6 class="mb-0 card-subtitle truncate font-weight-bold">
                            {{ totalNetRate | currency }}
                          </h6>
                          <p class="text-muted text-small mb-2">Total</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-container>
          </b-card-header>

          <b-card-body title="Summary">
            <b-card-text :class="
              choosenSlot.length < 2 ? 'scroll--inactive' : 'scroll--active'
            ">
              <template v-if="!Boolean(isLoadingSummary) && choosenSlot.length == 0 " class="w-100">
                <alertsglobal type="info" title="Loading information" class="w-100" message="">
                </alertsglobal>
              </template>
              <template v-else>

                <div v-if="choosenSlot.length > 0 && sendHeader.headerReference !== ''">
                  <table class="table table-hover table-summary table-striped table-sm"
                    style="overflow-x: hidden !important;">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th class="w-25">{{ $t("gps.cabin-type") }}</th>
                        <th>{{ $t("gps.gross-rate") }}</th>
                        <th>{{ $t("gps.net-rate") }}</th>
                        <th v-if="!sendCharter">{{ $t("gps.conditions") }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(data, groupName, id) in deckGroups" class="w-100">
                        <th :key="'groupName' + id" colspan="10" class="text-left name-group" role="alert"
                          aria-live="polite" aria-atomic="true">
                          <span class="unit pvs fgc1 pl-1">{{ groupName }} </span>
                        </th>
                        <template v-for="(slot, index, i) in data">
                          <tr class="w-100 text-muted align-self-center" v-if="
                          (slot.conditions.length != 0 && !sendCharter) ||
                            (slot.conditions.length == 0 && sendCharter)
                        " :key="i" :class="
                          slot.extraDiscountAmount || slot.extraDiscountPercent
                            ? 'table-info'
                            : 'table-light'
                        "
                        >
                            <td class="align-middle">{{ index + 1 }}</td>
                            <td class="align-middle">{{ slot.cabName }}</td>
                            <!-- <td class="align-middle">{{ slot.cabName }} - {{slot.avsId}}</td> -->
                            <td class="align-middle text-center" data-toggle="tooltip" data-placement="top"
                              id="popover-target-1" v-b-popover.hover.top="
                            'offGrossRate desde BDD: ' +
                              slot.offGrossRate +
                              '| avsId: ' +
                              slot.avsId
                          ">
                              {{ slot.newOffGrossRate  | currency }}<br>
                            </td>
                          <!-- <td class="align-middle  text-center" :class="
                            calculateNewNetRate(slot) >= 0
                              ? 'text-ligth'
                              : 'text-danger font-weight-bold'
                          "> -->
                            <td class="align-middle  text-center">
                              {{ calculateNewNetRate(slot)   | currency }}
                            </td>
                            <td class="align-middle">                            
                              <div class="d-flex justify-content-center">
                                <select 
                                :id="slot.avsId"
                                class="custom-select text-muted"
                                :class="slot.style == 0 ? 'd-none' : 'd-inline'"
                                @change="
                                setCondition(
                                  $event,
                                  slot,
                                  slot.conditions.filter(
                                    p => p.metCodigo == $event.target.value
                                  ),
                                  'edit'
                                )
                              ">
                                  <!-- Elimino condicion de Children usando método "filter" -->
                                  <!-- <option  v-for="(condition, index) in slot.conditions.filter(p => p.metCodigo != 4)"   -->
                                  <option v-for="(condition, index) in slot.conditions" :key="index"
                                    :value="condition.metCodigo"
                                    :selected="condition.selected == 1 ? condition.metCodigo: ''">

                                    <!-- ------------------------------- ADECUACION DE MASTER SUITE -------------------------------  -->
                                    <template
                                      v-if="slot.cabMax === 4 && choosenSlot.filter(item => item.cabMax ===4).length === 1">
                                      <p v-if="condition.metCodigo==1">
                                        {{getSelectNameAndPercent (condition.metName, condition.conAdult1)}} </p>
                                      <p v-else> {{condition.metName}} </p>
                                    </template>
                                    <template
                                      v-else-if="slot.cabMax === 4 && choosenSlot.filter(item => item.cabMax ===4).length === 2">
                                      <p v-if="condition.metCodigo==1">
                                        {{getSelectNameAndPercent (condition.metName, condition.conAdult2)}} </p>
                                      <p v-else> {{condition.metName}} </p>
                                    </template>
                                    <template
                                      v-else-if="slot.cabMax === 4 && choosenSlot.filter(item => item.cabMax ===4).length === 3">
                                      <p v-if="condition.metCodigo==1">
                                        {{getSelectNameAndPercent (condition.metName, condition.conAdult3)}} </p>
                                      <p v-else> {{condition.metName}} </p>
                                    </template>
                                    <template
                                      v-else-if="slot.cabMax === 4 && choosenSlot.filter(item => item.cabMax ===4).length === 4">
                                      <p v-if="condition.metCodigo==1">
                                        {{getSelectNameAndPercent (condition.metName, condition.conAdult4)}} </p>
                                      <p v-else> {{condition.metName}} </p>
                                    </template>
                                    <template v-else-if="slot.cabMax != 4">
                                      <p v-if="condition.metCodigo==1">
                                        {{getSelectNameAndPercent (condition.metName, condition.conAdult1)}} </p>
                                      <p v-else> {{condition.metName}} </p>
                                    </template>

                                    <!-- ------------------------------- FIN ADECUACION DE MASTER SUITE -------------------------------  -->

                                  </option>
                                </select>
                              </div>
                            </td>

                            <!-- ------------------ SE OCULTO DESCUENTOS EXTRA DEBIDO A QUE YA SE TIENE CUSTOMIZE RATES ------------------  -->
                            <!-- <td class="align-middle">
                      <small>
                        NG:{{slot.newOffGrossRate}}<br>
                        NN:{{slot.newOffNetRate}}<br>
                        G:{{slot.offGrossRate}}<br>
                        N:{{slot.offNetRate}}<br>
                      </small>                        
                          <slotsextradiscounts
                            class="text-muted"
                            v-if="!sendCharter"
                            
                            :avsId="slot.avsId"
                            :amountValue="(Boolean(slot.booking) ? slot.booking.extraDiscountAmount : '')"
                            :percentValue="(Boolean(slot.booking) ? slot.booking.extraDiscountPercent : '')"
                            :descriptionValue="(Boolean(slot.booking) ? slot.booking.extraDiscountDescription : '')"
                            @addExtraDiscount="addExtraDiscount"
                          >
                          </slotsextradiscounts>
                        </td> -->
                          </tr>

                          <tr v-else :key="i" class="w-100 text-muted align-self-center">
                            <td width="100%" colspan="7" class="text-warning">
                              <i class="glyph-icon simple-icon-exclamation"></i>
                              {{ $t("gps.no-available-in-summary") }}
                            </td>
                          </tr>
                        </template>
                      </template>
                    </tbody>

                    <!-- NUEVA TABLA DE RESUMEN DE PRECIOS -->

                    <div class="mt-1 pt-2"></div>
                    <thead>
                      <tr>
                        <th class="col-1 text-center value-colum"></th>
                        <th class="col-4 text-center value-colum"></th>
                        <th class="col-2 text-center value-colum"></th>
                        <th class="col-2 text-center value-colum"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th class="col-1 custom-cell"></th>
                        <td class="col-4 text-left custom-cell"><small class="font-weight-bold">Total
                            {{choosenSlot.length}} Passengers:</small></td>
                        <td class="col-2 text-center custom-colum">{{subTotalGrossRatePassengers  | currency}}</td>
                        <td class="col-2 text-center custom-colum">{{subTotalNetRatePassengers  | currency}}</td>
                      </tr>
                      <tr>
                        <th class="col-1  custom-cell"></th>
                        <td class="col-4 text-left custom-cell" v-if="summary.summarySelectedChildren > 0">
                          <small class="font-weight-bold">Children
                            discount({{ summary.summarySelectedChildren}}):</small>
                        </td>
                        <td class="col-2 text-center custom-colum" v-if="summary.summarySelectedChildren > 0">
                          {{valueDiscountChildrenGross()  | currency}}
                        </td>
                        <td class="col-2 text-center custom-colum" v-if="summary.summarySelectedChildren > 0">
                          {{valueDiscountChildrenNet()  | currency}}
                        </td>
                      </tr>
                      <tr>
                        <th class="col-1 custom-cell" v-if="this.sendHeader.headerIva"></th>
                        <td class="col-4 text-left custom-cell" v-if="this.sendHeader.headerIva">
                          <small class="font-weight-bold">Subtotal:</small>
                        </td>
                        <td class="col-2 text-center custom-colum" v-if="this.sendHeader.headerIva">
                          {{floor(subTotalGrossRate)  | currency}}
                        </td>
                        <td class="col-2 text-center custom-colum" v-if="this.sendHeader.headerIva">
                          {{subTotalNetRate  | currency}}
                        </td>
                      </tr>
                      <tr>
                        <th class="col-1  custom-cell" v-if="this.sendHeader.headerIva"></th>
                        <td class="col-4 text-left custom-cell" v-if="this.sendHeader.headerIva">
                          <small class="font-weight-bold">IVA ({{ this.sendHeader.headerIva? '12' : '0'}}%):</small>
                        </td>
                        <td class="col-2 text-center custom-colum" v-if="this.sendHeader.headerIva">
                          {{ calculateIVAGrossRate  | currency}}
                        </td>
                        <td class="col-2 text-center custom-colum" v-if="this.sendHeader.headerIva">
                          {{calculateIVANetRate  | currency}}
                        </td>
                      </tr>
                      <tr>
                        <th class="col-1  custom-cell"></th>
                        <td class="col-4 text-left custom-cell">
                          <small class="font-weight-bold">TOTAL:</small>
                        </td>
                        <td class="col-2 text-center head-dep font-weight-bolder text-primary  custom-cell">
                          {{floor(totalGrossRate)  | currency}}
                        </td>
                        <td class="col-2 text-center head-dep font-weight-bolder  text-primary   custom-cell">
                          {{floor(totalNetRate)  | currency}}
                        </td>
                      </tr>
                    </tbody>
                    <!-- NUEVA FIN TABLA DE RESUMEN DE PRECIOS -->
                  </table>
                  <!-- summarySelectedChildren => {{summary.summarySelectedChildren}}
              sendProcessUncheck: {{sendProcessUncheck}} -->
                  <!-- SECCION CHILDREN -->
                  <div class="row childs-text pt-2" v-if="!sendCharter">
                    <div class="col-lg-6">
                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-8 col-form-label">{{
                      $t("gps.discount-child")
                    }}</label>
                        <div class="col-sm-4">
                          <select class="custom-select" id="inputGroupSelect01"
                            v-model="summary.summarySelectedChildren" @change="updateChildrenDiscountModels()">
                            <option value="0">0</option>
                            <option v-for="index in childrens" :key="index" :value="index">
                              {{ index }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <label>{{ $t("gps.note-discount") }}.</label>
                    </div>
                  </div>

                  <b-alert show variant="info" v-if="sendProcessUncheck" class="mt-2 w-100">
                    Number of children updated to 0. Please select the number of children according to the spaces
                    selected, if necessary
                  </b-alert>

                </div>

                <div v-else class="w-100">
                  <alertsglobal type="warning" :title="$t('gps.choose-slot')" class="w-100" message=" ">
                  </alertsglobal>
                </div>

              </template>
              <!-- <i class="glyph-icon simple-icon-exclamation display-4"></i> -->
            </b-card-text>
          </b-card-body>

          <b-card-footer class="my-2 px-0 border-0" style="background-color:white;">
            <b-container fluid>
              
              <b-row v-if="!isProccessing">
                <b-col lg="6">
                  <b-button block @click="$router.go(-1)" variant="outline-primary" class="mx-1 btn-block">
                    Discard
                  </b-button>
                </b-col>
                <b-col lg="6">
                  <b-button block @click="updateProcess" :disabled="choosenSlot.length == 0" v-b-modal.slotsmodalresume
                    variant="primary" class="mx-1 btn-block">
                    {{ $t("gps.update-button") }}
                  </b-button>
                </b-col>
              </b-row>
               <b-row v-else class="text-center text-primary w-100 h3">
                 <b-col lg="12">
                <center>
                  <b-spinner variant="primary" class="text-center" label="Small Spinner"></b-spinner>  Processing
                </center>
                 </b-col>
              </b-row>

            </b-container>
          </b-card-footer>

        </b-card>
      </b-card-group>
      <!-- FIN SELECCION DE CONDICIONES EN CABINAS -->

    </div>

  </b-container>
</template>

<script>
  import InputTag from "../../../../../components/Form/InputTag";
  import vSelect from "vue-select";
  import "vue-select/dist/vue-select.css";
  import Switches from "vue-switches";
  import slotsConditions from "../../../../../mixins/slots/slotsConditions.js";
  import {
    EventBus
  } from "../../../../../eventBus/event-bus";
  import quotes from "../../../../../mixins/quotes/quotes";
  import {
    json
  } from "body-parser";

  export default {
    name: "SlotsSummary",
    mixins: [slotsConditions],
    components: {
      "input-tag": InputTag,
      "v-select": vSelect,
      switches: Switches
    },
    props: [
      "sendHeader",
      "sendArrayUpdate",
      "depId",
      "sendCharter",
      "longChoosenSlots",
      "bokId",
      "clientId",
      "sendChoosenSlot",
      "sendAllotment",
      "sendConfirmation",
      "sendProcessUncheck",
      "originalDataFromEditBooking",
      "depStartDate",
      "depEndDate"
    ],
    data() {
      var self = this;
      return {
        isLoadingSummary: false,
        hasIvaBooking: true,
        childrenNumber: "",
        checkConditionInNextButton: "",
        discount: [{
          avsId: "",
          discountSelect: "",
          discountMount: "",
          discountReference: ""
        }],
        summary: {
          summarySubtotalGrossRate: "",
          summarySubtotalNetRate: "",
          summaryIVAGrossRate: "",
          summaryIVANetRate: "",
          summaryTotalGrossRate: "",
          summaryTotalNetRate: "",
          summarySelectedChildren: "",
          summaryDiscountChildrenGross: "",
          summaryDiscountChildrenNet: "",
          summaryCustomDiscountGross: "",
          summaryCustomDiscountNet: "",
          summaryIVA: "" // El valor de summaryIVA se modifica en el método sendHeader de WATCH
        },
        originalDataFromEditBookingLength: 0,
        loaderSummary: false,
        isProccessing : false,
        selectedConditionByAvsId: ""
      };
    },
    watch: {
      hasIvaBooking() {
        this.$emit("updateBookingIva", this.hasIvaBooking);
      },
      discount: function () {
        this.$emit("toParentSendDiscount", this.discount);
      },
      summary: {
        deep: true,
        handler: function (val) {
          if (val.summarySelectedChildren == "") {
            val.summarySelectedChildren = 0;
          }
          this.$emit("toParentSendSummary", val);
        }
      },
      sendProcessUncheck: function () {
        if (this.sendProcessUncheck) this.summary.summarySelectedChildren = 0;
      },
    },

    computed: {
      originalSlotsLength() {
        let originalSlotsLength = this.originalDataFromEditBooking.map(a => a.slots).flat()
          .filter(
            a =>
            a.bosStatus == 1 ||
            a.bosStatus == 2 ||
            a.bosStatus == 5 ||
            a.bosStatus == 3
          ) //(* Incluye tanto a los bloqueados como CONFIRMADOS)
          .map(a => a.avsId).length;

        this.originalDataFromEditBookingLength = originalSlotsLength;
        return originalSlotsLength;
      },
      choosenSlotsLength() {
        return this.sendChoosenSlot.length;
      },
      isModeAdd() {
        if (this.$route.query.m) return true
        return false
      },

      cofId() {
        if (this.$route.query.c) return this.$route.query.c
        return null
      },

      rowData: {
        get() {
          return this.$store.getters.getRowDataByDepId(this.depId);
        }
      },
      choosenSlot: {
        get() {
          this.updateRowDataChoosenFromRowData(); // Actualizo bosStatus desde rowData a rowDataChoosen
          return this.$store.getters.getRowDataChoosenBossStatusNotNull(
            this.depId
          ); // traigo solo los que tiene bosStatus null
        }
      },
      childrens() {
        return this.calculateChildrenNumber();
      },
      deckGroups() {
        return this.groupBy(this.choosenSlot, "decName");
      },

      //  ============================================= GROSS ==========================================
      subTotalGrossRatePassengers() {
        var self = this;
        let total = 0;
        var totalValor = 0;
        totalValor = this.choosenSlot.reduce(function (prev, object) {
          return (total += parseFloat(object.newOffGrossRate));
        }, 0);
        totalValor = this.floor(totalValor);
        this.summary.summarySubtotalGrossRate = totalValor;
        return totalValor;
      },
      subTotalGrossRate() {
        if (this.summary.summarySelectedChildren > 0) {
          return this.summary.summarySelectedChildren > 0 ?
            parseFloat(this.subTotalGrossRatePassengers) -
            parseFloat(this.valueDiscountChildrenGross()) :
            this.subTotalGrossRatePassengers;
        } else {
          return this.subTotalGrossRatePassengers;
        }
      },
      calculateIVAGrossRate() {
        if (this.sendHeader.headerIva) {
          this.summary.summaryIVAGrossRate = this.subTotalGrossRate * 0.12;
          this.summary.summaryIVAGrossRate = this.floor(
            this.summary.summaryIVAGrossRate
          );
          return this.floor(this.subTotalGrossRate * 0.12);
        } else {
          this.summary.summaryIVAGrossRate = 0;
          return 0;
        }
      },
      totalGrossRate() {
        var total = parseFloat(this.subTotalGrossRate);
        var customDiscount = this.valueCustomDiscountGross ?
          this.valueCustomDiscountGross :
          0;
        if (this.calculateIVAGrossRate > 0) {
          var totalValue = total + parseFloat(this.calculateIVAGrossRate);
          this.summary.summaryTotalGrossRate = totalValue;
          return totalValue;
        } else {
          this.summary.summaryTotalGrossRate = total;
          return total;
        }
      },

      //  ============================================= FIN GROSS ==========================================

      //  ============================================= NETA ==========================================
      subTotalNetRatePassengers() {
        var self = this;
        let total = 0;
        var totalValor = 0;
        totalValor = this.choosenSlot.reduce(function (prev, object) {
          return (total += parseFloat(
            self.calculateNewNetRate(object)
          ));
        }, 0);
        totalValor = this.floor(totalValor);
        this.summary.summarySubtotalNetRate = totalValor;
        return totalValor;
      },
      subTotalNetRate() {
        //OK
        if (this.summary.summarySelectedChildren > 0) {
          return this.summary.summarySelectedChildren > 0 ? parseFloat(this.subTotalNetRatePassengers) - parseFloat(this
            .valueDiscountChildrenNet()) : this.subTotalNetRatePassengers;
        } else {
          return this.subTotalNetRatePassengers;
        }
      },
      calculateIVANetRate() {
        if (this.sendHeader.headerIva) {
          this.summary.summaryIVANetRate = (this.subTotalNetRate * 0.12);
          return this.floor(this.subTotalNetRate * 0.12);
        } else {
          this.summary.summaryIVANetRate = 0;
          return 0;
        }
      },

      totalNetRate() {
        var total = parseFloat(this.subTotalNetRate);
        var customDiscount = this.valueCustomDiscountNet ?
          this.valueCustomDiscountNet :
          0;
        if (this.calculateIVANetRate > 0) {
          var totalValue = total + parseFloat(this.calculateIVANetRate);
          this.summary.summaryTotalNetRate = totalValue;
          return totalValue;
        } else {
          this.summary.summaryTotalNetRate = total;
          return total;
        }
      },

      //  ============================================= FIN NETA ==========================================

      validPercentFromClient() {
        //ADECUADO PARA EDIT
        if (Boolean(this.sendHeader)) {
          var checkHeader = Boolean(this.sendHeader.bokClientDiscount);
          if (checkHeader) {
            // Modificado unicamente en EDIT (el dato valido es bocLientDiscount)
            var validPercent = checkHeader ?
              this.sendHeader.bokClientDiscount :
              "";
            return validPercent;
          }
        }
      },
      valueCustomDiscountGross() {
        if (this.discount.discountMount) {
          this.summary.summaryCustomDiscountGross = this.discount.discountMount;
          return this.discount.discountMount;
        } else {
          return 0;
        }
      },
      valueCustomDiscountNet() {
        if (this.discount.discountMount) {
          this.summary.summaryCustomDiscountNet = this.discount.discountMount;
          return this.discount.discountMount;
        } else {
          return 0;
        }
      }
    },
    methods: {

      // 2021-08-16 | fg | iniciar proceso hold
      launchNextAction() {
        EventBus.$emit("hold");
      },

      //  ---------------- Descuentos Extra ----------------
      addExtraDiscount(data) {
        // 1. Busco en choosenSlots el registro con el avsId
        var avsId = data.avsId;
        this.$store.dispatch("updateExtraDiscounts", data);
      },

      //  ---------------- Fin Descuentos Extra ----------------

      valueDiscountChildrenGross() {
        // Para efectos de cálculo, se extrae el valor mínimo de los slots seleccionados

        // ------ VERSION 1
        //var arrayTotalChoosenSlots = this.choosenSlot.map(a => a.offGrossRate);
                

        // ------ VERSION 2
        // console.log("Array1: " + JSON.stringify(this.choosenSlot.map(x => ({
        //             offGrossRate: x.offGrossRate,
        //             netFromBase: x.netFromBase,
        //             grossFromBase: x.grossFromBase,
        //             originalGrossRate: x.originalGrossRate,
        //             savedDprId: x.savedDprId,                    
        //             promotionOffNetRate: parseFloat([... new Set(x.conditions.map(x => x.promotionOffNetRate))]),   
        //         }))));

        // console.log("Array2: " + JSON.stringify(this.choosenSlot.map(x => 
        //             parseFloat([... new Set(x.conditions.map(x => x.promotionOffNetRate))]),   
        //         )));        
        
        // Para efectos de cálculo, se toma la tarifa Gross mas baja y se multiplica por el 20%        
        let savedDprId = "";
        let arrayTotalChoosenSlots = "";
        this.choosenSlot.forEach(function(elemento, indice, array) {
              if (elemento.savedDprId === 0) {  
                
                  // Si no existe promoción, tomo la tarifa original                           
                  arrayTotalChoosenSlots = array.map(a => a.originalGrossRate);
              } else {
                
                  // Si existe promoción, tomo la tarifa promocional para realizar el cálculo

                  // VERSION 2.1
                  // arrayTotalChoosenSlots = array.map(x => 
                  //   parseFloat([... new Set(x.conditions.map(x => x.promotionOffNetRate))]),   
                  // );

                  // VERSION 2.2 - En caso de no existir "promotionOffNetRate", tomo tarifa "offGrossRate"
                  let checkIfPromotionOffNetRateIsNotNull = array.some( item =>item.promotionOffNetRate != null)

                  if(checkIfPromotionOffNetRateIsNotNull){
                    // console.warn("A. promotion es diferente de null");
                    // Si es true, tomo tarifa promotionOffNetRate
                      arrayTotalChoosenSlots = array.map(x => 
                        parseFloat([... new Set(x.conditions.map(x => x.promotionOffNetRate))]),   
                      );
                  }
                  else{
                    // console.warn("B. promotion es null");
                    //Caso contrario, tomo tarifa offGrossRate
                      //   console.log("Array: " + JSON.stringify(array.map(x => ({
                      //     offGrossRate: x.offGrossRate,
                      //     netFromBase: x.netFromBase,
                      //     grossFromBase: x.grossFromBase,
                      //     originalGrossRate: x.originalGrossRate,
                      //     savedDprId: x.savedDprId,                    
                      //     promotionOffNetRate: parseFloat([... new Set(x.conditions.map(x => x.promotionOffNetRate))]),   
                      // }))));      
                      arrayTotalChoosenSlots = array.map(a => a.offGrossRate);             
                  }
                
              }                                                   
          })   

        var minValue = Math.min.apply(null, arrayTotalChoosenSlots);
        if (this.summary.summarySelectedChildren > 0) {

          var total = minValue * 0.2 * this.summary.summarySelectedChildren;
          this.summary.summaryDiscountChildrenGross = total;
          // console.warn("this.summary.summarySelectedChildren " + this.summary.summarySelectedChildren);
          // console.warn("minValue " + minValue);
          // console.warn("total " + total);

          return this.floor(total);
        } else if (this.summary.summarySelectedChildren == 0) {
          this.summary.summaryDiscountChildrenGross = 0;
          return 0;
        }
      },
      valueDiscountChildrenNet() {
        // Para efectos de cálculo, se extrae el valor mínimo de los slots seleccionados
        var grossRate = this.valueDiscountChildrenGross();
        var newChildrenDiscount =
          grossRate - (grossRate * this.validPercentFromClient) / 100;
        newChildrenDiscount = this.floor(newChildrenDiscount);
        this.summary.summaryDiscountChildrenNet = newChildrenDiscount;
        return newChildrenDiscount;
      },

      updateChildrenDiscountModels() {
        // Método para actualizar valores de summaryDiscountChildrenGross y summaryDiscountChildrenNet
        this.valueDiscountChildrenGross();
        this.valueDiscountChildrenNet();
      },
      floor(value, decimals){
          if (!decimals) decimals = 2;
          var d = Math.pow(10,decimals);
          return (parseFloat(value*d)/d);
      },  
      searchOriginalConditionChoosenSlot(avsId) {
        return Number(this.originalDataFromEditBooking.map(a => a.slots).flat()
          .filter((item) => item.avsId === avsId)
          .map((item) => item.bosCondition))
      },
      updateCalculeNetAndGrossRate(selectedCondition, percentSSFromSlot,grossFromBase ){
                console.warn("GROSS QUE ENTRA PARA CALCULAR :" + grossFromBase)

                let porcentSS = 0;
                if(selectedCondition === 1) porcentSS = percentSSFromSlot;
                //else porcentSS = 0;

                let clientPercent = this.validPercentFromClient;

                let newGross = grossFromBase + (grossFromBase * porcentSS) /100;
                let newNet = newGross - ((newGross * clientPercent)) /100;               
                return {newGross, newNet};
      },
      calculateNewNetRate(slot) {

        let {
          avsId,
          offGrossRate,
          offNetRate,
          newOffGrossRate,
          newOffNetRate,
          extraDiscountAmount,
          extraDiscountPercent,
          from,
          netFromBase,
          grossFromBase,
          originalGrossRate,
          savedDprId
        } = slot;

        let originalCondition = this.searchOriginalConditionChoosenSlot(avsId);
        let selectedCondition = Number(slot.conditions.filter((item) => item.selected === 1).map(a => a.metCodigo));
        let percentSSFromSlot = Number(slot.conditions.filter((item) => item.selected === 1).map(a => a.conAdult1));

        console.log(" ================================= CALCULO NET ======================= ");

        //Los cálculos de descuento se delegan a la tarifa Gross:
        
        
        newOffGrossRate = this.floor(newOffGrossRate);

        //console.log(" * newOffGrossRate ----" + offGrossRate)
        // EL CALCULO DE LA TARIFA NET CON EL PORCENTAJE DE DESCUENTO SE LO DELEGA A SLOTSDISTRIBUTIONEDIT. AQUI SOLO LEEMOS EL VALOR DE OFFNETRATE

        // VERSION 1.0
        // var newNetRate = (newOffGrossRate - (newOffGrossRate * (this.validPercentFromClient) / 100));            
        // newNetRate = this.floor(newNetRate);

        // VERSION 2.0
        let newNetRate = 0;
        let newGrossRate = 0;
        if (from === 'carga-inicial') {
          console.log(" --------------------------------------- A. Es carga inicial ---------------------------------------");

          // console.warn(" (*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*) avsId ----" + avsId)
          // console.warn(" (*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*) slot ----" + JSON.stringify(slot))
          // console.warn(" (*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*) savedDprId ----" + savedDprId)
          // console.warn(" (*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*) newOffGrossRate ----" + newOffGrossRate)
          // console.warn(" (*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*) grossFromBase ----" + grossFromBase)
          // console.warn(" (*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*) originalGrossRate ----" + originalGrossRate)
          
              // ORIGINAL
              // newNetRate = newOffGrossRate - (newOffGrossRate * (this.validPercentFromClient) / 100);
              // newGrossRate = newOffGrossRate;


          if (originalCondition === selectedCondition) {
                console.log("1. Condiciones iguales")                
                newNetRate = netFromBase;

                //Si es carga inicial, se copia la tarifa GROSS guardada en la BDD
                newGrossRate = offGrossRate;

          } else {
                console.log("2. Condiciones distintas")
              
                var rates = {};
                // if(Boolean(savedDprId)){
                //   // Actualizo valor de gross y neta con la gross de la base
                //   console.warn("2.1 entra gross desde la base")
                //   rates = this.updateCalculeNetAndGrossRate(selectedCondition, percentSSFromSlot, grossFromBase  )
                // }else{
                //   console.warn("2.2 entra original gross")
                //   rates = this.updateCalculeNetAndGrossRate(selectedCondition, percentSSFromSlot, originalGrossRate )
                // }

                rates = this.updateCalculeNetAndGrossRate(selectedCondition, percentSSFromSlot, originalGrossRate )

                let {newGross, newNet} = rates;   
                newNetRate = newNet;
                newGrossRate = newGross;               
          }

          //Si es carga inicial, se copia la tarifa GROSS guardada en la BDD
          this.$store.commit("refreshGrossInSlot", {
            avsId,
            newGrossRate
          });

        } else {
          console.log(" --------------------------------------- B. Nuevos registros ---------------------------------------");

          // Si es un nuevo elemento, sigue las mismas reglas de cálculo de tarifa neta
          newNetRate = (newOffGrossRate - (newOffGrossRate * (this.validPercentFromClient) / 100));
        }

        newNetRate = this.floor(newNetRate);

        //Actualizo propiedad "rate" para obtener valores originales de offNetRate sin descuentos
        this.$store.commit("refreshRateInSlot", {
          avsId,
          newNetRate
        });

        // Refresco arrayChoosen y actualizo valor de offNetRate de acuerdo a variacion de Porcentaje de cliente:        
        this.$store.commit("refreshNetRateInSlot", {
          avsId,
          newNetRate
        });

        return newNetRate;
      },

      checkHeaderCompany() {
        if (
          this.sendHeader.headerCompany &&
          this.sendHeader.headerCompany.pertenece === "ATC ECU"
        ) {
          return true;
        } else {
          return false;
        }
      },
      // getSelectNameAndPercent(codigo, percent) {
      //     if (Boolean(percent)) return  'SGL (+' + parseInt(percent).toFixed() + '%)';
      //     else return codigo + ' (+0%)';
      // },
      getSelectNameAndPercent(codigo, percent) {

        if (Boolean(percent)) {
          if (percent > 0) return '(' + parseInt(percent).toFixed() + '%) SGL';
          else return '(' + parseInt(percent).toFixed() + '%) SGL';
        } else {
          return '(0%) SGL';
        }
      },

      updateRowDataChoosenFromRowData() {
        var self = this;
        this.rowData.forEach(function (elemento, indice, array) {
          // Actualizo Array desde RowData a RowDataChoosen para actualizar bosStatus
          self.$store.dispatch("updateRowDataChoosenFromRowData", {
            elemento
          });
        });
      },
      groupBy(array, key) {
        const result = {};
        array.forEach(item => {
          if (!result[item[key]]) {
            result[item[key]] = [];
          }
          result[item[key]].push(item);
        });
        return result;
      },


      setCondition(event, slot, conditions, flag) {
        //Hago una mutación al slot seleccionado, y sus condiciones para colocar el valor seleccionado como 1 y el resto como 0
        //Flag "initEdit" ==> ocurre cuando el componente se carga por primera vez
        //Flag "edit" ==> ocurre cuando se modifica el valor de conditions
        let avsId = slot.avsId;
        let cabId = slot.cabId;
        let layMaxBooking = slot.layMaxBooking;
        let layPax = slot.layPax;
        let bedsNumber = slot.bedsNumber;
        let codigo = conditions.map(a => a.metCodigo);

        this.$store.commit("setSelectedValueInCondition", {
          avsId,
          codigo
        });

        // La mutación anterior también se aplica para colocar selected:1 en las condiciones de rowDataChoosenOriginal
        this.$store.commit("setSelectedValueInConditionForOriginalArray", {
          avsId,
          codigo
        });        

        // Elimino los descuentos extra ingresados cuando se cambia de condición para evitar
        // errores de cálculo
        this.$store.commit('clearDiscountsWhenChangeCondition', {
          avsId,
          codigo
        });

        // Elimino los descuentos extra ingresados cuando se cambia de condición para evitar
        // errores de cálculo. Se lo hace dentro del subarray "booking"
        if (flag === "edit") {
          this.$store.commit('clearDiscountsWhenChangeConditionInUpdate', {
            avsId,
            codigo
          });
        }


        // Calculos de acuerdo a lo seleccionado
        var seleccion = "";
        if (event.target !== undefined) {
          seleccion = parseInt(event.target.value);
        } else {
          seleccion = parseInt(event);
        }

        if (seleccion) {
          switch (seleccion) {
            case 1:
              //console.log("Seteando Single en Edit");
              this.recalculateTotal(slot, conditions, "add");
              //this._reconfigShareConditionsFromSummary(avsId, cabId);
              if (flag != "initEdit") { 
                this._reconfigShareConditionsFromSummary(avsId, cabId);
              }
              break;
            case 2:
              //console.log("Seteando Share M en Edit");
              /************ CONDICIONES SHARE F/M **************** */
              var avsOrder = slot.avsOrder;
              //this.disableSlotsOnShare(avsId, avsOrder, cabId, codigo)

              //initEdit es la bandera inicial, al momento de pintar de entrada todos los slots.
              //La bandera que se pone después de manipular las condiciones en Edit es "edit"
              if (flag != "initEdit") {
                this._reconfigShareConditionsFromSummary(avsId, cabId);
              }
              /************ CONDICIONES SHARE F/M **************** */
              this.recalculateTotal(slot, conditions, "discount");
              break;
            case 3:
              //console.log("Seteando Share F en Edit");
              /************ CONDICIONES SHARE F/M **************** */
              var avsOrder = slot.avsOrder;
              //this.disableSlotsOnShare(avsId, avsOrder, cabId, codigo)
              //this._reconfigShareConditionsFromSummary(avsId, cabId);
              if (flag != "initEdit") {
                this._reconfigShareConditionsFromSummary(avsId, cabId);
              }
              /************ FIN CONDICIONES SHARE F/M **************** */
              this.recalculateTotal(slot, conditions, "discount");
              break;
            case 4:
              console.log("OTRO CASO  en Edit");
              this.recalculateTotal(slot, conditions, "discount");
              break;
            default:
          }
        }
      },

      // ******************* FUNCION PARA RECALCULO DE NEWGROSSRATE Y NEWNETRATE CUANDO SE SELECCIONA OPCION EN SELECT **********
      recalculateTotal(slot, conditions, flag) {
        // console.warn("============================> EN RECALCULATE TOTAL");

        if (flag === "add") {
          // Para el caso de SINGLE
          var conAdult1 = conditions.map(a => a.conAdult1);
          var offGross = slot.offGrossRate;
          var newGross =
            parseFloat(offGross * (conAdult1 / 100)) + parseFloat(offGross);
          newGross = this.floor(newGross);
          var newNet = newGross;
          slot.total = newGross;

          slot.newOffGrossRate = newGross;
          slot.newOffNetRate = newNet;

        } else if (flag === "discount") {
          // Para el caso de SHARE M / F
          var conAdult2 = conditions.map(a => a.conAdult2);

          var newGross = slot.offGrossRate;
          newGross = this.floor(newGross);
          var newNet = newGross;

          slot.total = newGross;
          slot.newOffGrossRate = newGross;
          slot.newOffNetRate = newNet;

        } else {
          console.log("no case");
        }

        //Cálculo de descuentos extra en newOffGrossRate
        if (slot.extraDiscountAmount) slot.newOffGrossRate = slot.total - slot.extraDiscountAmount;
        else
        if (slot.extraDiscountPercent) slot.newOffGrossRate = (slot.total - (parseFloat((slot.total * (slot
          .extraDiscountPercent / 100)))));

      


      },
      // ******************* FIN FUNCION PARA RECALCULO DE NEWGROSSRATE Y NEWNETRATE CUANDO SE SELECCIONA OPCION EN SELECT **********

      calculateChildrenNumber() {
        console.warn(
          " ------------------------------------------------------------ Recalculando Children ---------- "
        );
        var counterAdultosLocal = this.choosenSlot.length;
        let childrenNumber = 0;
        // console.log("Numero de counterAdultosLocal: " + counterAdultosLocal);
        if (counterAdultosLocal > 0) {
          switch (true) {
            case counterAdultosLocal > 0 && counterAdultosLocal < 3:
              this.childrenNumber = 0;
              break;
            case counterAdultosLocal >= 3 && counterAdultosLocal < 6:
              this.childrenNumber = 1;
              break;
            case counterAdultosLocal >= 6 && counterAdultosLocal < 9:
              this.childrenNumber = 2;
              break;
            case counterAdultosLocal >= 9 && counterAdultosLocal < 12:
              this.childrenNumber = 3;
              break;
            case counterAdultosLocal >= 12 && counterAdultosLocal < 15:
              this.childrenNumber = 4;
              break;
            case counterAdultosLocal >= 15 && counterAdultosLocal < 18:
              this.childrenNumber = 5;
              break;
            case counterAdultosLocal >= 18 && counterAdultosLocal < 21:
              this.childrenNumber = 6;
              break;
            case counterAdultosLocal >= 21 && counterAdultosLocal < 24:
              this.childrenNumber = 7;
              break;
            case counterAdultosLocal >= 24 && counterAdultosLocal < 27:
              this.childrenNumber = 8;
              break;
            case counterAdultosLocal >= 27 && counterAdultosLocal < 30:
              this.childrenNumber = 9;
              break;
            default:
              console.log("Valor default: ");
          }
          return this.childrenNumber;
        } else {
          console.warn(" ==> No hay slots con opciones de Children**");
        }
        console.warn(
          " ------------------------------------------------------------ Fin Recalculando Children ---------- "
        );
      },
      // Considerar comentar este metodo
      disableSlotsOnShare(avsId, avsOrder, cabId, codigo) {
        // avsOrder pertenece al avsOrder del elemento seleccionado
        let codigoShow = 0;
        var numberOfSlotsInCabin = this.rowData.filter(
          item => item.avsCabinId == cabId
        ).length;
        console.log(" ====> numberOfSlotsInCabin: " + numberOfSlotsInCabin);
        switch (numberOfSlotsInCabin) {
          case 3:
            console.log(" *** Hay 3 slots  *** ");
            console.log(" avsOrder: " + avsOrder);
            if (avsOrder == 1) {
              var newAvsOrder = 3;
              this.$store.commit("disableSlotInTheSameCabinByAvsOrderOnShare", {
                cabId,
                codigoShow,
                newAvsOrder
              });
            } else if (avsOrder == 2) {
              var newAvsOrder = 3;
              this.$store.commit("disableSlotInTheSameCabinByAvsOrderOnShare", {
                cabId,
                codigoShow,
                newAvsOrder
              });
            } else if (avsOrder == 3) {
              var newAvsOrder = 1;
              this.$store.commit("disableSlotInTheSameCabinByAvsOrderOnShare", {
                cabId,
                codigoShow,
                newAvsOrder
              });
            }
            break;
          case 4:
            console.log(" *** Hay 4 slots *** ");
            if (avsOrder == 1) {
              var newAvsOrder = 3;
              this.$store.commit("disableSlotInTheSameCabinByAvsOrderOnShare", {
                cabId,
                codigoShow,
                newAvsOrder
              });
              var newAvsOrder = 4;
              this.$store.commit("disableSlotInTheSameCabinByAvsOrderOnShare", {
                cabId,
                codigoShow,
                newAvsOrder
              });
            } else if (avsOrder == 2) {
              var newAvsOrder = 3;
              this.$store.commit("disableSlotInTheSameCabinByAvsOrderOnShare", {
                cabId,
                codigoShow,
                newAvsOrder
              });
              var newAvsOrder = 4;
              this.$store.commit("disableSlotInTheSameCabinByAvsOrderOnShare", {
                cabId,
                codigoShow,
                newAvsOrder
              });
            } else if (avsOrder == 3) {
              var newAvsOrder = 1;
              this.$store.commit("disableSlotInTheSameCabinByAvsOrderOnShare", {
                cabId,
                codigoShow,
                newAvsOrder
              });
              var newAvsOrder = 2;
              this.$store.commit("disableSlotInTheSameCabinByAvsOrderOnShare", {
                cabId,
                codigoShow,
                newAvsOrder
              });
            } else if (avsOrder == 4) {
              var newAvsOrder = 1;
              this.$store.commit("disableSlotInTheSameCabinByAvsOrderOnShare", {
                cabId,
                codigoShow,
                newAvsOrder
              });
              var newAvsOrder = 2;
              this.$store.commit("disableSlotInTheSameCabinByAvsOrderOnShare", {
                cabId,
                codigoShow,
                newAvsOrder
              });
            }
            break;
            return "No defined";
        }
      },
      // -----------------------------------------------------------------------------------------------------
      // ---------------------------------------------  EDIT  ------------------------------------------------
      // -----------------------------------------------------------------------------------------------------

      updateProcess() {
        this.$swal({
          title: "Apply changes?",
          text: "Please check the number of children if necessary",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          confirmButtonColor: "#ED7117",
          reverseButtons: true
        }).then(result => {
          if (result.isConfirmed) {
            this.update();
          } else if (
            /* Read more about handling dismissals below */

            result.dismiss === this.$swal.DismissReason.cancel
          ) {}
        });
      },
      updateBosConditionBeforeUpdate(dataToUpdate, allotment) {
        let slots = dataToUpdate[1];

        // Checkeo si existen algún allotment en el array. En este caso, bosStatus = 5
        // var checkAllotments = slots.map(a => a.booking).some(e => e.bosStatus === 5);
        // var checkConfirmations = slots.map(a => a.booking).some(e => e.bosStatus === 2);
        //var checkConfirmations = slots.map(a => a.booking).some(e => e.bosStatus === 2);
        //console.log("ALLOTMENTS: " + JSON.stringify(slots));
        // console.log("== >Check ALLOTMENTS: " + JSON.stringify(checkAllotments));
        slots.forEach(function (elemento, indice, array) {
          if (Boolean(elemento.conditions)) {
            var condition = elemento.conditions.filter(block => block.selected === 1).map(a => a.metCodigo);

            // CABMAX = 4
            // Para Reubicación de slots en Master Suite, ya vienen con condición 0, excepto cuando solo es 1 solo slot (bosCondition 1)
            // Por tal razón, se excluyen las condiciones para que afecten al resto de slots de diferente cabMax
            if (elemento.cabMax != 4) {
              if ((parseInt(condition) === 1) || (parseInt(condition) === 2) || (parseInt(condition) === 3))
                elemento.bosCondition = parseInt(condition);
              else elemento.bosCondition = 0;
            }
          }


          if (Boolean(elemento.booking)) {
            var bosStatus = elemento.booking.bosStatus;
            elemento.bosStatus = bosStatus;
          }


        });
      },
      async update() {
        this.isProccessing = true;
        var self = this
        let dataToUpdate = this._buildHeaderAndSummaryArray("edit")

        // a). Seteo condición seleccionada desde conditions (selected = 1) y coloco en bosCondition (en la raiz del array)
        this.updateBosConditionBeforeUpdate(dataToUpdate, this.sendAllotment);

        /*
         * Se agrega una vari9able para identificar si se añade un pasajero
         */
        //this.isModeAdd = false;
        dataToUpdate.push({
          isModeAdd: this.isModeAdd,
          cofId: this.cofId,
          user: this.$root.$loggedUserId, // 2021-11-10 | fg | agregar id usuario para proceso de auditoria
          sendAllotment: this.sendAllotment,
          depStartDate: this.depStartDate,
          depEndDate: this.depEndDate
        });

        //ORIGINAL
        const {
          data
        } = await this.$store.dispatch("updateSlotsFromBooking", dataToUpdate);

        if (!data) {
          this.$notify("error filled", "Slots", "Something went wrong", {
            duration: 3000,
            permanent: true
          })
          return
        }
        this.$notify("success filled", "Slots", "Update successfully", {
          duration: 3000,
          permanent: false
        })


        // modo confirmacion
        if (data.from === 'confirmations') {
          const cofId = data.id
          this.$router.push({
            name: 'confirmations',
            params: {
              cofId
            }
          })
          return
        }

        // modo cotizacion
        if (data.from === 'quotes') {
          const gctId = data.id
          this.$router.push({
            path: `/quote/${gctId}`
          })
          return
        }

        this.isProccessing = true;

      },

      async fillData() {

        console.log("=================================   S U M M A R Y =========================================");
        /*IMPORTANTE: Esta función se ejecuta desde watch "choosenSlot" debido a que esta variable viene de store
        y se la incluyó en watch hasta que se pueda pintar. Una vez que esto ocurre, lanza la función fillData */

        /*IMPORTANTE (2): La función fillData se la pasó a Mounted y se le colocó un timeOut con el objeto de evitar
        la escucha, y poder cambiar las condiciones, sin que estas vuelvan a SS (Como ocurria cuando la función
        se encontraba en Watch)
         */

        var self = this;

        // ----------- Migrar descuentos extra de arrayUpdate a sendChoosenSlot ------------
        var newArrayUpdate = this.sendArrayUpdate.map(a => a.slots).flat();
        this.choosenSlot.forEach(function (elemento, indice, array) {
          newArrayUpdate.forEach(function (el, indice, array) {
            if (el.avsId === elemento.avsId) {
              elemento.extraDiscountAmount = el.extraDiscountAmount
              elemento.extraDiscountPercent = el.extraDiscountPercent
              elemento.extraDiscountDescription = el.extraDiscountDescription
            }
          })
        })
        //  ------------ Fin Migrar descuentos extra de arrayUpdate a sendChoosenSlot  ------------

        // ALGORITMO PARA TRAER DATOS:
        var arrayUpdate = this.sendArrayUpdate;

        // =====> Para debug:
        // var rowDataChoosen = this.choosenSlot;
        // var header = arrayUpdate.map(a => a.bookingData);
        // var checkHeader = Boolean(arrayUpdate);      
        // console.log("arrayUpdate: " + arrayUpdate.length);
        // console.log("rowDataChoosen: " + rowDataChoosen.length);
        // console.log("header: " + header.length);
        // console.log("checkHeader: " + checkHeader);

        if (arrayUpdate.length > 0) {
          //var slots = arrayUpdate.map(a => a.slots);
          var slots = arrayUpdate[0].slots;
          //console.log("slots en summary: " + JSON.stringify(slots));
          var selectedSlotsOnlyVslId = slots
            .filter(a => a.bosStatus == 1 || a.bosStatus == 2)
            .map(a => a.avsId);
          var slotsFiltered = slots.filter(a => a.bosStatus == 1 || a.bosStatus == 2);
          await this.updateconditions(slotsFiltered, selectedSlotsOnlyVslId, slots);
        }
        console.log(
          "=================================   FIN S U M M A R Y ========================================="
        );
      },

      async updateconditions(slotsFiltered, selectedSlotsOnlyVslId, slots) {
        var self = this;
        var rowDataChoosen = this.choosenSlot;
        var slotsUpdateConditions = rowDataChoosen.filter(item =>
          selectedSlotsOnlyVslId.includes(item.avsId)
        );
        await slotsFiltered.forEach(function (elemento, indice, array) {
          var slotsFilteredByAvsId = rowDataChoosen.filter(
            item => item.avsId == elemento.avsId
          ); //Filtro para traer los slots seleccionados con TODAS LAS CONDICIONES
          if (slotsUpdateConditions.length > 0) {
            var event = elemento.bosCondition;
            var slot = slotsFilteredByAvsId[0]; // Tiene que venir el slot con TODAS LAS CONDICIONES
            var allConditions = self.choosenSlot
              .filter(block => block.avsId === elemento.avsId)
              .map(a => a.conditions);

            var checkAllConditions = Boolean(allConditions);
            //if(allConditions[0] == undefined){
            if (!checkAllConditions) {
              var type = "error filled";
              var title = "Error";
              var mensaje =
                "There is a problem with Slots. Please, refresh page or go back and try again";
              self.$notify(type, title, mensaje, {
                duration: 4500,
                permanent: false
              });
            } else {
              //console.log("allConditions[0] ==>: " + JSON.stringify(allConditions[0]));
              if (Boolean(allConditions[0])) {
                var conditionSelectedFromDB = allConditions[0].filter(
                  item => parseInt(item.metCodigo) == event
                );
                // console.log("event ==>: " + event);
                // console.log("slot ==>: " + JSON.stringify(slot));
                // console.log("conditions ==>: " + JSON.stringify(conditionSelectedFromDB));
                self.setCondition(
                  event,
                  slot,
                  conditionSelectedFromDB,
                  "initEdit"
                );

                // =====> Para debug:
                // var avsId = elemento.avsId;
                // var codigo = elemento.bosCondition;
                // console.log("avsId ==>: " + avsId);
                // console.log("codigo ==>: " + codigo);
                //self.$store.commit("setSelectedValueInCondition", { avsId, codigo });
              } else {
                console.log("Variable allConditions es UNDEFINED");
              }
            }

            // NOTA:
            //Formato a enviar en setConditon:
            // event ==>: 2
            // slot ==>: {"depId":107,"avsId":2128,"avsOrder":3,"vslName":"Pingüino Eplorer","avsCabinId":3,"offId":139,"offGrossRate":"1689.00","offNetRate":"1266.75","rate":"1689.00","cabId":3,"cabName":"Triple","decId":1,"decName":"Lower","cruId":1,"layShare":1,"layMaxBooking":3,"vslCapacity":16,"bosCondition":0,"bosStatus":null,"ridId":null,"bsrPercent":null,"bsrAmount":null,"bokClientId":null,"pax":1,"enableOnShare":1,"newOffGrossRate":"1689.00","newOffNetRate":"1689.00","style":1,"conditions":[{"itiId":1,"acaYear":"2021","decId":1,"avsId":2128,"avsCabinId":3,"priName":"Standar","offGrossRate":"1689.00","offNetRate":"1689.00","metCodigo":"1","metName":"Single","conId":291,"conAdult1":"50.00","conAdult2":"0.00","conAdult3":"0.00","conAdult4":"0.00","condDiscount":"50.00","selected":0},{"itiId":1,"acaYear":"2021","decId":1,"avsId":2128,"avsCabinId":3,"priName":"Standar","offGrossRate":"1689.00","offNetRate":"1689.00","metCodigo":"2","metName":"Share M","conId":291,"conAdult1":"50.00","conAdult2":"0.00","conAdult3":"0.00","conAdult4":"0.00","condDiscount":"0.00","selected":1},{"itiId":1,"acaYear":"2021","decId":1,"avsId":2128,"avsCabinId":3,"priName":"Standar","offGrossRate":"1689.00","offNetRate":"1689.00","metCodigo":"3","metName":"Share F","conId":291,"conAdult1":"50.00","conAdult2":"0.00","conAdult3":"0.00","conAdult4":"0.00","condDiscount":"0.00","selected":0}],"total":"1689.00"}
            // conditions ==>: [{"itiId":1,"acaYear":"2021","decId":1,"avsId":2128,"avsCabinId":3,"priName":"Standar","offGrossRate":"1689.00","offNetRate":"1689.00","metCodigo":"2","metName":"Share M","conId":291,"conAdult1":"50.00","conAdult2":"0.00","conAdult3":"0.00","conAdult4":"0.00","condDiscount":"0.00","selected":1}]
          }

        });

        this.$forceUpdate();
        await this.setChildrenConditionAndIVAFromUpdate();
        this.isLoadingSummary = true;
        return true;
      },
      async setChildrenConditionAndIVAFromUpdate() {
        
        var self = this;
        var arrayUpdate = this.sendArrayUpdate;
        var header = arrayUpdate.map(a => a.bookingData);
        if (header[0] || header[0] !== undefined) {

          var bokNumberChildren =
            header[0].bokChildrenPax > 0 ? header[0].bokChildrenPax : 0;
          var bokIva = header.headerIva ? 1 : 0;
          //var bokIva = header.bokIva ? 1 : 0;
          self.summary.summarySelectedChildren = bokNumberChildren;
          self.summary.summaryIVA = bokIva;
        }
        

        //console.log("===> Finalizando actualizacion de condiciones");
        await this.$emit("endUpdateConditions", true);
        // console.log("===> Emitiendo");

        this.$forceUpdate();

        return true;
      },


      // -----------------------------------------------------------------------------------------------------
      // --------------------------------------------- FIN EDIT  ---------------------------------------------
      // -----------------------------------------------------------------------------------------------------
    },
    created() {
      EventBus.$on("checkConditionInNextButton", payload => {
        this.checkConditionInNextButton = payload;
      });
    },
    async mounted() {

      // Ejecuto watch de ChoosenSlots para traer todas las condiciones, y lo detengo
      //  let unwatchUser =this.$watch('choosenSlot', (newVal, oldVal) => {
      //   console.log(",,,,,,,,,,,,,,,,,,,,,, emprece")
      //     if (newVal.length < oldVal.length) {
      //       this.summary.summarySelectedChildren = 0;
      //     }
      //     setTimeout(() => this.fillData(), 1300);
      //     setTimeout(() => unwatchUser(), 1500);
      //   })


    //console.log("choosenSlotsLength: " + this.choosenSlotsLength)
    if(this.choosenSlotsLength <=8){
      setTimeout(() => {
        this.fillData()
        this.loaderSummary = true;
      }, 1600);
    }else{
      setTimeout(() => {
        this.fillData()
        this.loaderSummary = true;
      }, 2450);
    }

      

    },

  };

</script>

<style scoped>
  .custom-select {
    width: 100% !important;
  }

  .value-colum {
    background: white !important;
  }

  .custom-cell {
    background: white !important;
    border: none !important;
  }

</style>
