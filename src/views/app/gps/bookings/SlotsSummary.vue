<template>
  <b-container fluid v-if="
                sendHeader.headerCompany &&
                sendHeader.headerCompany.length !== 0
                && validarEmail
              ">

    <!-- SELECCION DE CONDICIONES EN CABINAS -->
    <!-- choosenSlot: <pre>{{choosenSlot.map(a => a.style)}}</pre> -->
    <!-- <pre>{{choosenSlot.map(a => a.conditions).flat()}}</pre> -->
     <!-- <pre>{{choosenSlot[0]}}</pre> -->
     <!-- sendAllotment: {{sendAllotment}} -->
     <!-- choosenSlot: <pre>{{choosenSlot}}</pre> -->
    <b-card-group deck class="summary">
      <b-card>

        <b-card-header style="padding: 0rem 1.25rem;" class="bg-light">
          <b-container fluid>
            <b-row >
              <b-col lg="4"  md="12" xs="12">
                <h4 class="mb-0 mt-4 font-weight-semibold center-title-mobile">Summary</h4>
              </b-col>
              <b-col lg="8"  md="12" xs="12">
                  <b-row class="justify-content-center pt-2 pb-2">
                    <b-col lg="4" md="6" xs="6" cols="6">
                      <div class="d-flex">
                        <div src="/assets/img/profiles/l-1.jpg" alt="Card image cap"
                          class="align-self-center list-thumbnail-letters pax rounded-circle m-0  small">
                          <i class="far fa-user"></i>
                        </div>
                        <div class="d-flex flex-grow-1 min-width-zero ml-3 mt-2">
                          <div
                            class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero text-center">
                            <div class="min-width-zero">
                              <!-- <router-link to="?"> -->
                                <h6 class="mb-0 card-subtitle truncate font-weight-bold">{{  choosenSlot.length }}</h6>
                              <!-- </router-link> -->
                              <p class="text-muted text-small mb-2">Pax</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-col>
                    <b-col  lg="5"  md="6" xs="6"  cols="6" >
                      <div class="d-flex">
                        <div src="/assets/img/profiles/l-1.jpg" alt="Card image cap"
                          class="align-self-center list-thumbnail-letters total rounded-circle m-0  small">
                          <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="d-flex flex-grow-1 min-width-zero ml-3 mt-2">
                          <div
                            class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero text-center">
                            <div class="min-width-zero">

                                <h6 class="mb-0 card-subtitle truncate font-weight-bold"> {{ totalNetRate | currency }}</h6>

                              <p class="text-muted text-small mb-2">Total</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
              </b-col>
            </b-row>
          </b-container>

        </b-card-header>

        <b-card-body class="px-0">

          <b-card-text :class="choosenSlot.length < 2 ? 'scroll--inactive' : 'scroll--active'">

            <div v-if="choosenSlot.length>0 && sendHeader.headerReference !== ''" class="responsive">
              <table class="table table-hover table-sm table-summary" style="overflow-x: hidden;">
                <thead>
                  <tr>
                    <!-- <th>BosStatus</th> -->
                    <th>#</th>
                    <!-- <th>AvsId</th> -->
                    <!-- <th>TAG</th> -->
                    <th  class="col-2">{{$t('gps.cabin-type')}}</th>
                    <th  class="col-2">{{$t('gps.gross-rate')}}</th>
                    <th  class="col-2">{{$t('gps.net-rate')}}</th>
                    <th v-if="!sendCharter"  class="col-3">{{$t('gps.conditions')}}</th>
                    <th v-if="!sendCharter"  class="col-2 hide-column-mobile">{{$t('gps.extra-discount')}}</th>

                  </tr>
                </thead>
                <tbody>

                  <template v-for="(data, groupName, i) in deckGroups" class="w-100">
               
                    <th :key="'groupName'+i" colspan="10" class="text-left name-group" role="alert" aria-live="polite"
                      aria-atomic="true">
                      <span class="unit pvs fgc1 pl-1">{{groupName}} </span>
                    </th>

                    <template v-for="(slot, index,i) in data">
                      <tr class="w-100 text-muted align-self-center"
                        v-if="(slot.conditions.length != 0 && !sendCharter) 
                              || (slot.conditions.length == 0 && sendCharter) || (slot.conditions.length != 0 && sendCharter)"
                        :key="i"
                        :class="slot.extraDiscountAmount || slot.extraDiscountPercent ?  'table-info': 'table-light'">

                        <td class="align-middle " >{{index+1}}</td>
                        <!-- <td class="align-middle">{{slot.identificador == 1 ? 'STA' : slot.identificador == 2 ? 'PROM' : 'CHART'}}</td> -->
                        <td class="align-middle  text-center col-2">{{slot.cabName}}</td>

                        <!-- ANTIGUA GROSS -->
                        <!-- v-b-popover.hover.top="
                                                'offGrossRate desde BDD: '+ slot.offGrossRate
                                                + '| avsId: ' + slot.avsId                                        
                                                " title="Valores para revisar condiciones" -->
                            <td class="align-middle  text-center  col-2" data-toggle="tooltip" data-placement="top" id="popover-target-1"
                             v-b-popover.hover.top="
                                                'offGrossRate desde BDD: '+ slot.offGrossRate
                                                + '| avsId: ' + slot.avsId                                        
                                                " title="Valores para revisar condiciones"
                            
                            >
                                {{slot.newOffGrossRate  | currency}}
                           </td>
                        <td class="align-middle  text-center  col-2"
                          :class="calculateNewNetRate(slot)>=0 ? 'text-ligth' : 'text-danger font-weight-bold'">
                          {{calculateNewNetRate(slot) | currency}}
                        </td>
                        <td class="align-middle col-3 justify-content-center px-0">
                          <!-- <div class="d-flex justify-content-center"> -->
                            <select class="custom-select text-muted"                          
                              :class="slot.style == 0 ? 'd-none' : 'd-inline'"                       
                              id="inputGroupSelect01"                              
                              @change="setCondition($event, slot, slot.conditions.filter(p => p.metCodigo == $event.target.value))">

                              <!-- Elimino condicion de Children usando método "filter" -->
                              <option v-for="(condition, index) in slot.conditions" :key="index"
                                :value="condition.metCodigo"
                                :selected="condition.selected == 1 ? condition.metCodigo : ''">

                                  <!-- <p  v-if="condition.metCodigo==1" >
                                      {{getSelectNameAndPercent (condition.metName, condition.conAdult1)}} </p>
                                  <p v-else> {{condition.metName}} </p> -->
                                  <!-- {{slot.cabMax}}- {{choosenSlot.filter(item => item.cabMax ===4).length}} -->
                                  <!-- ------------------------------- ADECUACION DE MASTER SUITE -------------------------------  -->
                                  <template v-if="slot.cabMax === 4 && choosenSlot.filter(item => item.cabMax ===4).length === 1">
                                    <p  v-if="condition.metCodigo==1">
                                        {{getSelectNameAndPercent (condition.metName, condition.conAdult1)}} </p>
                                      <p v-else> {{condition.metName}} </p>
                                  </template>
                                  <template v-else-if="slot.cabMax === 4 && choosenSlot.filter(item => item.cabMax ===4).length === 2">
                                    <p  v-if="condition.metCodigo==1" >
                                        {{getSelectNameAndPercent (condition.metName, condition.conAdult2)}} </p>
                                      <p v-else> {{condition.metName}} </p>
                                  </template>
                                  <template v-else-if="slot.cabMax === 4 && choosenSlot.filter(item => item.cabMax ===4).length === 3">
                                    <p  v-if="condition.metCodigo==1" >
                                        {{getSelectNameAndPercent (condition.metName, condition.conAdult3)}} </p>
                                      <p v-else> {{condition.metName}} </p>
                                  </template>
                                  <template v-else-if="slot.cabMax === 4 && choosenSlot.filter(item => item.cabMax ===4).length === 4">
                                      <p  v-if="condition.metCodigo==1" >
                                        {{getSelectNameAndPercent (condition.metName, condition.conAdult4)}} </p>
                                      <p v-else> {{condition.metName}} </p>
                                  </template>                                  
                                  <template v-else-if="slot.cabMax != 4">
                                    <p  v-if="condition.metCodigo==1" >                                      
                                      {{getSelectNameAndPercent (condition.metName, condition.conAdult1)}} </p>
                                    <p v-else> {{condition.metName}} </p>
                                  </template>                                                                    
                                  <!-- ------------------------------- FIN ADECUACION DE MASTER SUITE -------------------------------  -->

                              </option>
                            </select>
                          <!-- </div> -->

                        </td>
                        <td class="align-middle col-2 hide-column-mobile">
                          <slotsextradiscounts class="text-muted" v-if="!sendCharter"
                            :netRate="calculateNewNetRate(slot)"                            
                            :avsId="slot.avsId" 
                            :amountValue="slot.extraDiscountAmount"
                            :percentValue="slot.extraDiscountPercent" 
                            :descriptionValue="slot.extraDiscountDescription"
                            @addExtraDiscount="addExtraDiscount"
                            >
                          </slotsextradiscounts>
                        </td>

                      </tr>

                      <tr v-else :key="i" class="w-100 text-muted align-self-center">
                        <td width="100%" colspan="7" class="text-danger h6">
                          <i class="glyph-icon simple-icon-exclamation"></i>
                          {{ $t("gps.no-available-in-summary") }}
                        </td>
                      </tr>

                    </template>

                  </template>
                </tbody>

                  <!-- NUEVA TABLA DE RESUMEN DE PRECIOS -->                  
                  <div class="mt-2 pt-2"></div>
                      <thead>
                        <tr >
                          <th class="col-1 text-center value-colum"></th>
                          <th class="col-5 text-center value-colum"></th>
                          <th class="col-2 text-center value-colum"></th>
                          <th class="col-2 text-center value-colum"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th class="col-1 custom-cell"></th>
                          <td class="col-5 text-left custom-cell"><small class="font-weight-bold">Total {{choosenSlot.length}} Passengers:</small></td>
                          <td class="col-2 text-center custom-colum">{{subTotalGrossRatePassengers  | currency}}</td>
                          <td class="col-2 text-center custom-colum">{{subTotalNetRatePassengers  | currency}}</td>
                        </tr> 
                        <tr>
                          <th class="col-1  custom-cell"></th>
                          <td class="col-5 text-left custom-cell" v-if="summary.summarySelectedChildren>0">
                            <small class="font-weight-bold">Discount children ({{ summary.summarySelectedChildren}}):</small>
                          </td>
                          <td class="col-2 text-center custom-colum" v-if="summary.summarySelectedChildren>0">
                            {{valueDiscountChildrenGross()  | currency}}
                          </td>
                          <td class="col-2 text-center custom-colum" v-if="summary.summarySelectedChildren>0">
                            {{valueDiscountChildrenNet()  | currency}}
                          </td>
                        </tr> 
                        <tr>
                          <th class="col-1 custom-cell"  v-if="this.sendHeader.headerIva"></th>
                          <td class="col-5 text-left custom-cell" v-if="this.sendHeader.headerIva">
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
                          <th class="col-1  custom-cell"  v-if="this.sendHeader.headerIva"></th>
                          <td class="col-5 text-left custom-cell" v-if="this.sendHeader.headerIva">
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
                          <td class="col-5 text-left custom-cell">
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

            <!-- SECCION CHILDREN E IVA-->
              <div class="row childs-text pt-2 d-flex align-items-center justify-content-center" v-if="!sendCharter">
                <div class="col-lg-2 col-md-4  col-sm-4  col-xs-4">
                  <b-form-checkbox v-model="hasIvaBooking" name="check-iva" switch>
                        IVA
                      </b-form-checkbox>
                </div>
                <div class="col-lg-5 col-md-8  col-sm-8  col-xs-8" >
                  <div class="form-group row  d-flex align-items-center justify-content-center">
                    <label for="staticEmail" class="col-lg-8 col-md-6  col-sm-6 col-xs-6 col-form-label text-muted text-right">{{$t('gps.discount-child')}}</label>
                    <div class="col-lg-4  col-md-6  col-sm-6 col-xs-6">
                      <select class="custom-select" id="inputGroupSelect01" v-model="summary.summarySelectedChildren"
                        @change="updateChildrenDiscountModels()">
                        <option value="0">0</option>
                        <option v-for="(index) in childrens" :key="index" :value="index">
                          {{index}}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-lg-5 col-md-12 col-sm-12 col-xs-12 text-muted">
                  <label>{{$t('gps.note-discount')}}.</label>
                </div>
              </div>
              <!-- FIN SECCION CHILDREN E IVA-->
            </div>
            <div v-else class="w-100">
              <alertsavailability 
                title="  " 
                width="20%"
                img='../../../../assets/img/atc/error_slot.svg'
                :message= " $t('gps.choose-slot') " >
              </alertsavailability>
            </div>
          </b-card-text>

        </b-card-body>

        <b-card-footer class="my-2" style="background-color:white; border:none;">

          <b-container fluid>
            <b-row class="row justify-content-center">
              <b-colxx lg="12" md="12" xs="12" cols="12">
                <b-button :disabled="checkConditionInNextButton" v-b-modal.slotsmodalresume
                  @click="launchNextAction" variant="primary" size="xs" class="mx-1 btn-block">
                  {{ $t("gps.next") }}
                </b-button>
              </b-colxx>
            </b-row>
          </b-container>

        </b-card-footer>

      </b-card>
    </b-card-group>
    <!-- FIN SELECCION DE CONDICIONES EN CABINAS -->

    <!-- <pre>{{choosenSlot.map(x => x.avsId)}}</pre> -->

  </b-container>
</template>

<script>
  import Vue2Filters from 'vue2-filters';
  import importComponents from "../../../../importComponents.vue";
  import InputTag from '../../../../components/Form/InputTag'
  import vSelect from 'vue-select'
  import 'vue-select/dist/vue-select.css'
  import Switches from "vue-switches";
  import slotsConditions from "../../../../mixins/slots/slotsConditions.js";
  import {
    EventBus
  } from '../../../../eventBus/event-bus';

  export default {
    name: "SlotsSummary",
    mixins: [slotsConditions, Vue2Filters.mixin],
    components: {
      'input-tag': InputTag,
      'v-select': vSelect,
      switches: Switches
    },
    props: ["sendHeader", "depId", "sendCharter", "sendAllotment"],
    data() {
      var self = this;
      return {
        hasIvaBooking: true,
        childrenNumber: "",
        checkConditionInNextButton: "",
        discount: [{
          avsId: "",
          discountSelect: "",
          //discountPercent: '',
          discountMount: '',
          discountReference: ''
        }],
        discountValue:"",
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
      }
    },
    watch: {
      hasIvaBooking() {
        this.$emit('updateBookingIva', this.hasIvaBooking)
      },
      discount: function () {
        this.$emit('toParentSendDiscount', this.discount)
      },    
      summary: {
        deep: true,
        handler: function (val) {          
          if (val.summarySelectedChildren == "") {
            val.summarySelectedChildren = 0;
          }                    
          this.$emit('toParentSendSummary', val)
        },
      },
    'choosenSlot': function (newVal, oldVal){
        // Valido cuando exista un UNCHECK en los slots, el valor de niños vuelve a 0
        //  if(newVal.length < oldVal.length){
        //     console.log("newVal.length :" + newVal.length );
        //     console.log("oldVal.length :" + oldVal.length );
        //    this.summary.summarySelectedChildren = 20;
        //  }
     },   
      sendHeader: {
        deep: true,
        handler: function (val) {

          this.sendHeader.headerIva ? this.hasIvaBooking = true : this.hasIvaBooking = false;
          this.sendHeader.headerIva ? this.summary.summaryIVA = true : this.summary.summaryIVA = false;
        },
      },
    },
    mounted() {

    },
    computed: {
      validarEmail: function () {
        var valor = this.sendHeader.headerCompany.email;
        var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
          if (emailRegex.test(valor)) return true;
          else return false; 
      },      
      rowData: {
        get() {
          return this.$store.getters.getRowDataByDepId(this.depId);
        },
      },
      choosenSlot: {
        get() {
          this.updateRowDataChoosenFromRowData(); // Actualizo bosStatus desde rowData a rowDataChoosen
          var ejemplo = this.$store.getters.getRowDataChoosenBossStatusNotNull(this
            .depId);
          return this.$store.getters.getRowDataChoosenBossStatusNotNull(this
            .depId) // traigo solo los que tiene bosStatus null
        },
      },
      childrens() {
        return this.calculateChildrenNumber();
      },
      deckGroups() {
        return this.groupBy(this.choosenSlot, 'decName')
      },

      //  ============================================= GROSS ==========================================
      subTotalGrossRatePassengers() {
        var self = this;
        let total = 0;
        var totalValor = 0;
        totalValor = this.choosenSlot.reduce(function (prev, object) {
          return total += parseFloat(object.newOffGrossRate);
        }, 0);
        totalValor = this.floor(totalValor);
        this.summary.summarySubtotalGrossRate = totalValor;
        return totalValor;
      },
      subTotalGrossRate() {
        if (this.summary.summarySelectedChildren > 0) {
          return this.summary.summarySelectedChildren > 0 ? parseFloat(this.subTotalGrossRatePassengers) - parseFloat(
            this.valueDiscountChildrenGross()) : this.subTotalGrossRatePassengers;
        } else {
          return this.subTotalGrossRatePassengers;
        }
      },
      calculateIVAGrossRate() {
        if (this.sendHeader.headerIva) {
          this.summary.summaryIVAGrossRate = (this.subTotalGrossRate * 0.12);
          this.summary.summaryIVAGrossRate = this.floor(this.summary.summaryIVAGrossRate);
          return this.floor(this.subTotalGrossRate * 0.12);
        } else {
          this.summary.summaryIVAGrossRate = 0;
          return 0;
        }
      },
      totalGrossRate() {
        var total = parseFloat(this.subTotalGrossRate);
        var customDiscount = this.valueCustomDiscountGross ? this.valueCustomDiscountGross : 0;
        if (this.calculateIVAGrossRate > 0) {
          var totalValue = total + parseFloat(this.calculateIVAGrossRate)
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
          return total += parseFloat(self.calculateNewNetRate(object));
        }, 0);  
        totalValor = this.floor(totalValor);      
        this.summary.summarySubtotalNetRate = totalValor;
        return totalValor;
      },
      subTotalNetRate() { //OK
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
        var customDiscount = this.valueCustomDiscountNet ? this.valueCustomDiscountNet : 0;
        if (this.calculateIVANetRate > 0) {
          var totalValue = total + parseFloat(this.calculateIVANetRate)
          this.summary.summaryTotalNetRate = totalValue;
          return totalValue;
        } else {
          this.summary.summaryTotalNetRate = total;
          return total;
        }
      },

      //  ============================================= FIN NETA ==========================================

      validPercentFromClient() {
        var checkHeader = Boolean(this.sendHeader.headerCompany)
        if (checkHeader) {
          var percentClient = checkHeader ? this.sendHeader.headerCompany.comision_voyager : '';
          var percentCustom = checkHeader ? this.sendHeader.headerPercent : '';
          var validPercent = 0;
          if (!percentCustom) {
            validPercent = percentClient;
          } else {
            validPercent = percentCustom;
          }
          return validPercent;
        }
      },
      valueCustomDiscountGross() {
        if (this.discount.discountMount) {
          this.summary.summaryCustomDiscountGross = this.discount.discountMount;
          return this.discount.discountMount
        } else {
          return 0;
        }
      },
      valueCustomDiscountNet() {
        if (this.discount.discountMount) {
          this.summary.summaryCustomDiscountNet = this.discount.discountMount;
          return this.discount.discountMount
        } else {
          return 0;
        }
      },

    },
    methods: {
      // 2021-08-16 | fg | iniciar proceso hold
      launchNextAction() {
        EventBus.$emit('hold')
      },

      //  ---------------- Descuentos Extra ----------------
      addExtraDiscount(data) {    
        // 1. Busco en choosenSlots el registro con el avsId
        var avsId = data.avsId;
        this.$store.dispatch("updateExtraDiscounts", data);

        //2. Solo para temas de visualización de cliente, modificamos la Gross sin alterar los cálculos:
        //this.discountValue = data.value ? parseFloat(data.value) : 0;
      },

      //  ---------------- Fin Descuentos Extra ----------------

      valueDiscountChildrenGross() {
        // Para efectos de cálculo, se extrae el valor mínimo de los slots seleccionados
        var arrayTotalChoosenSlots = this.choosenSlot.map(a => a.offGrossRate);
        var minValue = Math.min.apply(null, arrayTotalChoosenSlots);
        if (this.summary.summarySelectedChildren > 0) {
          var total = (minValue * 0.2) * this.summary.summarySelectedChildren;
          this.summary.summaryDiscountChildrenGross = total;
           return this.floor(total);
        } else if (this.summary.summarySelectedChildren == 0) {
          this.summary.summaryDiscountChildrenGross = 0;
          return 0;
        }
      },
      valueDiscountChildrenNet() {
        var grossRate = this.valueDiscountChildrenGross();
        var newChildrenDiscount =   (grossRate - (grossRate * (this.validPercentFromClient)/100));
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
          return (parseInt(value*d)/d).toFixed(decimals);
      },
      //v2.0 Descuentos extra:
      calculateNewNetRate(slot) {

        let {avsId, offGrossRate, newOffGrossRate, extraDiscountAmount, extraDiscountPercent} = slot;

        //Los cálculos de descuento se delegan a la tarifa Gross:

        // ------- Descuentos Extra:
        // if (extraDiscountAmount) {
        //   newGrossRate = newGrossRate - extraDiscountAmount;
        // }
        // if (extraDiscountPercent) {
        //   newGrossRate = (newGrossRate - (parseFloat((newGrossRate * (extraDiscountPercent / 100)))));
        // }
        
        newOffGrossRate = this.floor(newOffGrossRate);
        // ------- FinDescuentos Extra:

        var newNetRate = (newOffGrossRate - (newOffGrossRate * (this.validPercentFromClient) / 100));
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
        if (this.sendHeader.headerCompany && this.sendHeader.headerCompany.pertenece === 'ATC ECU') {
          return true;
        } else {
          return false;
        }
      },
      getSelectNameAndPercent(codigo, percent) {
        
        // if (Boolean(percent)) return  'SGL (+' + parseInt(percent).toFixed() + '%)';
        // else return codigo + ' (+0%)';

        // if (Boolean(percent)) {
        //   if(percent > 0) return  'SGL (+' + parseInt(percent).toFixed() + '%)';
        //   else  return  'SGL (' + parseInt(percent).toFixed() + '%)';
        // }else{
        //   return 'SGL (0%)';
        // }

        // if (Boolean(percent)) {
        //   if(percent > 0) return  '('+parseInt(percent).toFixed()+'%) SGL';
        //   else  return  '('+parseInt(percent).toFixed() + '%) SGL';
        // }else{
        //   return '(0%) SGL';
        // }

        if (Boolean(percent)) {
          if(percent != 0) return  parseInt(percent).toFixed()+'% (Single)';          
          else return '0% (Single)';
        }else{
          return '0% (Single)';
        }
      },

      updateRowDataChoosenFromRowData() {
        var self = this;
        this.rowData.forEach(function (elemento, indice, array) {
          // Actualizo Array desde RowData a RowDataChoosen para actualizar bosStatus
          self.$store.dispatch("updateRowDataChoosenFromRowData", {
            elemento
          });
        })
      },
      groupBy(array, key) {
        const result = {}
        array.forEach(item => {
          if (!result[item[key]]) {
            result[item[key]] = []
          }
          result[item[key]].push(item)
        })
        return result
      },

      setCondition(event, slot, conditions) {
        //Hago una mutación al slot seleccionado, y sus condiciones para colocar el valor seleccionado como 1 y el resto como 0
        let avsId = slot.avsId;
        let cabId = slot.cabId;
        let layMaxBooking = slot.layMaxBooking;
        let layPax = slot.layPax;
        let bedsNumber = slot.bedsNumber;
        let codigo = conditions.map(a => a.metCodigo);
        this.$store.commit('setSelectedValueInCondition', {
          avsId,
          codigo
        });

        // Elimino los descuentos extra ingresados cuando se cambia de condición para evitar
        // errores de cálculo
        this.$store.commit('clearDiscountsWhenChangeCondition', {
          avsId,
          codigo
        });         

        // Calculos de acuerdo a lo seleccionado
        var seleccion = parseInt(event.target.value);
        if (seleccion) {
          switch (seleccion) {
            case 1:
              console.log("Seteando Single");
              this.recalculateTotal(slot, conditions, "add");

              this._reconfigShareConditionsFromSummary(avsId, cabId);
              break;
            case 2:
              console.log("Seteando Share M");
              /************ CONDICIONES SHARE F/M **************** */
              var avsOrder = slot.avsOrder;
              //this.disableSlotsOnShare(avsId, avsOrder, cabId, codigo)
              if(layMaxBooking == 2 && bedsNumber== 2 && layPax==4){
                  console.log("No pasa nada al momento de setear Share M y condicion 224")
              }else{
                this._reconfigShareConditionsFromSummary(avsId, cabId);
              }
              
              /************ CONDICIONES SHARE F/M **************** */
              this.recalculateTotal(slot, conditions, "discount");
              break;
            case 3:
              console.log("Seteando Share F");
              /************ CONDICIONES SHARE F/M **************** */
              var avsOrder = slot.avsOrder;
              //this.disableSlotsOnShare(avsId, avsOrder, cabId, codigo)
              if(layMaxBooking == 2 && bedsNumber== 2 && layPax==4){
                  console.log("No pasa nada al momento de setear Share F y condicion 224")
              }
              else if(layMaxBooking == 2 && bedsNumber== 3 && layPax==3){
                  console.log("No pasa nada al momento de setear Share F y condicion 233")
              }
              else{
                this._reconfigShareConditionsFromSummary(avsId, cabId);
              }              
              /************ FIN CONDICIONES SHARE F/M **************** */
              this.recalculateTotal(slot, conditions, "discount");
              break;
            case 4:
              console.log("OTRO CASO");
              this.recalculateTotal(slot, conditions, "discount");
              break;
            default:
          }
        }
      },

      // ******************* FUNCION PARA RECALCULO DE NEWGROSSRATE Y NEWNETRATE CUANDO SE SELECCIONA OPCION EN SELECT **********
      recalculateTotal(slot, conditions, flag) {
        if (flag === "add") { // Para el caso de SINGLE
          var conAdult1 = conditions.map(a => a.conAdult1);

          var offGross = slot.offGrossRate;
          var newGross = (parseFloat((offGross * (conAdult1 / 100))) + parseFloat(offGross));
          newGross = this.floor(newGross);

          var newNet = newGross;

          slot.total = newGross;
          slot.newOffGrossRate = newGross;
          slot.newOffNetRate = newNet;
        } else if (flag === "discount") { // Para el caso de SHARE M / F
          var conAdult2 = conditions.map(a => a.conAdult2);
          var newGross = slot.offGrossRate;
          newGross = this.floor(newGross);
          var newNet = newGross;

          slot.total = newGross;
          slot.newOffGrossRate = newGross;
          slot.newOffNetRate = newNet;
        }
      },
      // ******************* FIN FUNCION PARA RECALCULO DE NEWGROSSRATE Y NEWNETRATE CUANDO SE SELECCIONA OPCION EN SELECT **********
      calculateChildrenNumber() {
        console.warn(" ------------------------------------------------------------ Recalculando Children ---------- ");
        var counterAdultosLocal = this.choosenSlot.length
        let childrenNumber = 0;
        // console.log("Numero de counterAdultosLocal: " + counterAdultosLocal);
        if (counterAdultosLocal > 0) {
          switch (true) {
            case (counterAdultosLocal > 0 && counterAdultosLocal < 3):
              this.childrenNumber = 0;
              break;
            case (counterAdultosLocal >= 3 && counterAdultosLocal < 6):
              this.childrenNumber = 1;
              break;
            case (counterAdultosLocal >= 6 && counterAdultosLocal < 9):
              this.childrenNumber = 2;
              break;
            case (counterAdultosLocal >= 9 && counterAdultosLocal < 12):
              this.childrenNumber = 3;
              break;
            case (counterAdultosLocal >= 12 && counterAdultosLocal < 15):
              this.childrenNumber = 4;
              break;
            case (counterAdultosLocal >= 15 && counterAdultosLocal < 18):
              this.childrenNumber = 5;
              break;
            case (counterAdultosLocal >= 18 && counterAdultosLocal < 21):
              this.childrenNumber = 6;
              break;
            case (counterAdultosLocal >= 21 && counterAdultosLocal < 24):
              this.childrenNumber = 7;
              break;
            case (counterAdultosLocal >= 24 && counterAdultosLocal < 27):
              this.childrenNumber = 8;
              break;
            case (counterAdultosLocal >= 27 && counterAdultosLocal < 30):
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
          " ------------------------------------------------------------ Fin Recalculando Children ---------- ");
      },
      // Considerar comentar este metodo
      disableSlotsOnShare(avsId, avsOrder, cabId, codigo) {
        // avsOrder pertenece al avsOrder del elemento seleccionado
        let codigoShow = 0;
        var numberOfSlotsInCabin = this.rowData.filter(item => item.avsCabinId == cabId).length;
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
    },
    created() {
      EventBus.$on('checkConditionInNextButton', (payload) => {
        this.checkConditionInNextButton = payload;
      });
    }
  };

</script>

<style scoped>
  .custom-select {
    width: 100% !important;
    /* padding: 0.1rem 0.03rem 0.1rem 0.4rem !important; */
  }

  .value-colum{
    background: white !important;
  }

  .custom-cell{
    background: white !important;
    border: none !important;
  }
 .col-2 {
  max-width: 15% !important;
  }

@media (max-width: 768px) {
 .center-title-mobile{
    text-align: center !important;
  }
  .hide-column-mobile{
    display:none !important;
  }
}

</style>
