<template>
  <div class="p-3 mb-4 bg-light small">

    <b-row>

      <b-colxx lg="3">
        <!-- PARTE 1/4 -->
        <b-input-group>
         <b-form class="ml-0 mb-1">
              <b-input-group label-size="xs" class="mt-2">
                <b-input-group prepend="Start" size="xs">
        <!--           {{cofInicio}} -->
                  <b-form-datepicker
                     :disabled="
                  holdProperty ||
                  cancelProperty ||
                  cruiseServiceProperty ||
                  $isOperador
              "

                    id="datepicker-sm"
                    size="sm"
                    class="h-100"
                    locale="en"
                    :min="cofInicio"
                    :max="cofFinal"
                    v-model="form.cfdFechaInicio"
                  ></b-form-datepicker>
                </b-input-group>
              </b-input-group>
         </b-form>
         <b-form class="ml-0 mb-1">
              <b-input-group label-size="xs" class="mt-2">
                <b-input-group prepend="End" size="xs">
                  <b-form-datepicker
                      :disabled="
                holdProperty ||
                  cancelProperty ||
                  cruiseServiceProperty ||
                  $isOperador
              "
                    id="datepicker-sm1"
                             :min="cofInicio"
              :max="cofFinal"
                    size="sm"
                    class="h-100"
                    locale="en"
                    v-model="form.cfdFechaFin"
                  ></b-form-datepicker>
                </b-input-group>
              </b-input-group>
         </b-form>
        </b-input-group>

        <b-input-group>

        </b-input-group>

        <b-input-group label-size="sm" class="mt-2">
          <b-input-group prepend="Supplier" class="mb-3" size="sm">
              <!-- :disabled="
                  $isOperador
              " Considerar esta linea para rol respectivo -->
            <b-form-input
              v-model="form.supplier"
              disabled

              class="text-class-form"
            >
            </b-form-input>
          </b-input-group>
        </b-input-group>

        <center>
          <b-row class="container-fluid ">
            <b-colxx lg="6" class="input-cost">
              <label class="form-group has-float-label">
                <input
                  onpaste="return false"
                  :disabled="holdProperty || cancelProperty  || $isVendedor"
                  type="text"
                  @keypress="onlyNumber"
                  :maxlength="maxLengthNumbersInputs"
                  class="form-control text-class-form"
                  v-model="form.cfdCosto"
                />
                <span>{{ $t("gps.confirmation-itinerary-form.cost") }} </span>
              </label>
            </b-colxx>

            <b-colxx lg="6" class="input-cost">
              <label class="form-group has-float-label">
                <input
                  onpaste="return false"
                  :disabled="
                    holdProperty ||
                      cancelProperty ||
                      cruiseServiceProperty ||
                      $isOperador
                  "
                  type="text"
                  @keypress="onlyNumber"
                  :maxlength="maxLengthNumbersInputs"
                  class="form-control text-class-form"
                  v-model="form.cfdVenta"
                />
                <span
                  >{{ $t("gps.confirmation-itinerary-form.p-unit") }}
                  <div
                    class="text-primary glyph-icon simple-icon-badge d-inline"
                  ></div>
                </span>
                <!-- ERRORS HANDLE -->
                <div
                  class="text-danger font-weight-bold mb-3 mt-0"
                  v-if="!$v.form.cfdVenta.required"
                >
                  <div
                    class="glyph-icon simple-icon-exclamation d-inline"
                  ></div>
                  <small>{{ messages.messageRequired }}</small>
                </div>
                <!-- ERRORS HANDLE -->
              </label>
            </b-colxx>
<!--
            <b-colxx lg="6" class="input-cost">
              <label class="form-group has-float-label">

                <input
                  onpaste="return false"
                  :disabled="
                    holdProperty ||
                      cancelProperty ||
                      cruiseServiceProperty ||
                      $isOperador
                  "
                  type="text"
                  @keypress="onlyNumber"
                  :maxlength="maxLengthNumbersInputs"
                  class="form-control text-class-form"
                  v-model="form.cfdDescuentoExtra"
                />
                <span
                  >{{ $t("gps.confirmation-itinerary-form.extra-discounts") }}
                </span>
              </label>
            </b-colxx>

            <b-colxx lg="6" class="input-cost">
              <label class="form-group has-float-label">
                <input
                  onpaste="return false"
                  :disabled="
                    holdProperty ||
                      cancelProperty ||
                      $isOperador ||
                      cruiseServiceProperty
                  "
                  type="text"
                  @keypress="onlyNumber"
                  :maxlength="maxLengthNumbersInputs"
                  class="form-control text-class-form"
                  value="0"
                  v-model="form.cfdDescuentoNinos"
                />
                <span
                  >{{
                    $t("gps.confirmation-itinerary-form.children-discounts")
                  }}
                </span>
              </label>
            </b-colxx> -->



          </b-row>
        </center>

        <b-row>
            <b-col  class="text-right">
                <b-form-checkbox
                  :disabled="holdProperty || cancelProperty"
                  id="checkbox-1"
                  v-model="form.cfdBloqueado"
                  name="checkbox-1"
                  value="1"
                  unchecked-value="0"
                >
                  {{ $t("gps.confirmation-itinerary-form.hold") }}
                </b-form-checkbox>
            </b-col>
            <b-col   class="text-left">
                <b-form-checkbox
                  :disabled="holdProperty || cancelProperty || $isOperador"
                  id="checkbox-2"
                  v-model="form.cfdCompensacion"
                  name="checkbox-2"
                  value="1"
                  unchecked-value="0"
                >
                  {{ $t("gps.confirmation-itinerary-form.compensation") }}
                </b-form-checkbox>
            </b-col>

        </b-row>

        <!-- FIN PARTE 1/4 -->
      </b-colxx>

      <b-colxx lg="3" style="background: #edeaea;">
        <!-- PARTE 2/4 -->
        <b-row class="mt-3">
          <b-colxx xxs="7">
            <b-input-group>
              <div class="form-group has-float-label custom-selects my-2">
                <b-form-select
                  :disabled="holdProperty || cancelProperty || $isOperador"
                  v-model="form.cfdAsunto"
                  :options="confirmationsAsunto"
                  text-field="metName"
                  value-field="metCodigo"
                  plain
                  size="sm"
                  class="text-class-form"
                ></b-form-select>
                <span> Subject </span>
              </div>
            </b-input-group>
          </b-colxx>
          <b-colxx xxs="5">
            <b-input-group>
              <div class="form-group has-float-label custom-selects my-2">
                <b-form-input
                  class="text-class-form"
                  :disabled="holdProperty || cancelProperty || $isOperador"
                  type="number"
                  v-model.trim="form.cfdAsuntoSecuencia"
                  :min="serviceselected[0].cfdAsuntoSecuencia"
                  oninput="validity.valid||(value='');"
                  onKeyPress="if(this.value.length==3) return false;"
                  onkeydown="if(event.key==='.'){event.preventDefault();}"
                  maxlength="2"
                  minlength="1"
                ></b-form-input>
                <span>
                  Sequence
                </span>
              </div>
            </b-input-group>
          </b-colxx>
        </b-row>

        <b-input-group>
          <div class="form-group has-float-label custom-selects my-2">
            <!-- <b-form-select
              class="text-class-form"
              :disabled="holdProperty || cancelProperty  || cruiseServiceProperty"
              plain
              v-model="form.cfdEstado"
              :options="confirmationsStatus"
              text-field="metName"
              value-field="metCodigo"
              size="sm"
            ></b-form-select> -->

            <!-- -----------------------  CAMBIO PROVISIONAL HASTA ACTUALIZAR DATOS DE CRUCEROS -----------------------  -->

                    <b-form-select
                      class="text-class-form"
                      plain
                      v-model="form.cfdEstado"
                      :options="confirmationsStatus"
                      text-field="metName"
                      value-field="metCodigo"
                      size="sm"
                    ></b-form-select>

            <!-- -----------------------  FIN CAMBIO PROVISIONAL HASTA ACTUALIZAR DATOS DE CRUCEROS -----------------------  -->

            <span
              >{{ $t("gps.confirmation-itinerary-form.status") }}
              <div
                class="text-primary glyph-icon simple-icon-badge d-inline"
              ></div>
            </span>
          </div>
          <!-- ERRORS HANDLE -->
          <div
            class="text-danger font-weight-bold p-1"
            v-if="!$v.form.cfdEstado.required"
          >
            <div class="glyph-icon simple-icon-exclamation d-inline"></div>
            <small>{{ messages.messageRequired }}</small>
          </div>
          <!-- ERRORS HANDLE -->
        </b-input-group>

        <div class="row">
          <div class="col-lg-6">
            <b-input-group>
              <div class="form-group has-float-label custom-selects my-2">

                <b-form-input
                  id="cfdCantidad"
                  :disabled="holdProperty || cancelProperty || cruiseServiceProperty"
                  type="number"
                  v-model.trim="form.cfdCantidad"
                  :max="maxquantity.count_group"
                  oninput="validity.valid||(value='');"
                  onKeyPress="if((this.value.length==3)) return false;"
                  @input = "validateNumber"
                  onkeydown="if(event.key==='.'){event.preventDefault();}"
                  maxlength="2"
                  minlength="1"
                  :placeholder="`Max: ${maxQuantityGroup}`"
                  class="text-class-form"
                ></b-form-input>
                <small class="ml-1 text-muted">Max allowed: {{maxQuantityGroup}}</small>
                <span
                  >{{ $t("gps.confirmation-itinerary-form.qty") }}
                  <div
                    class="text-primary glyph-icon simple-icon-badge d-inline"
                  ></div>
                </span>
                <!-- ERRORS HANDLE -->
                <div
                  class="text-danger font-weight-bold p-1"
                  v-if="!$v.form.cfdCantidad.required"
                >
                  <div
                    class="glyph-icon simple-icon-exclamation d-inline"
                  ></div>
                  <small>{{ messages.messageRequired }}</small>
                </div>
                <div
                  class="text-danger font-weight-bold p-1"
                  v-if="!$v.form.cfdCantidad.between"
                >
                  <div
                    class="glyph-icon simple-icon-exclamation d-inline"
                  ></div>
                  <small>{{ messages.messageRange }}</small>
                </div>
                <!-- ERRORS HANDLE -->
              </div>
            </b-input-group>
          </div>
          <div class="col-lg-6">


          <div class="custom-control ml-1 custom-switch d-inline mt-3">

            <input
              :disabled="holdProperty || cancelProperty || $isOperador"
              @change="changeCfdMostrarCliente()"
              type="checkbox"
              class="custom-control-input bg-success"
              :key="form.cfdId"
              :checked="form.cfdMostrarCliente === 1 ? true : false"
              :id="form.cfdId"
            />
            <label class="custom-control-label" :for="form.cfdId">{{
              $t("gps.confirmation-itinerary-form.show-client")
            }}</label>
          </div>

            <!-- :disabled="holdProperty || cancelProperty || $isOperador" -->
            <!-- <b-input-group>
              <div class="form-group has-float-label custom-selects my-2">
                <b-form-input
                  disabled
                  type="number"
                  v-model.trim="form.cfdOrden"
                  :min="serviceselected[0].cfdOrden"
                  oninput="validity.valid||(value='');"
                  onKeyPress="if(this.value.length==3) return false;"
                  onkeydown="if(event.key==='.'){event.preventDefault();}"
                  maxlength="2"
                  minlength="1"
                  class="text-class-form"
                ></b-form-input>
                <span>{{ $t("gps.confirmation-itinerary-form.order") }} </span>
              </div>
            </b-input-group> -->
          </div>
        </div>

        <b-form-group
          class="px-1 bg-white"
          group
          :label="$t('gps.confirmation-itinerary-form.group')"
        >
          <b-form-checkbox
            v-for="option in confirmationsGroups"
            v-model="form.cfdGrupos"
            :key="option.lpaGrupo"
            :value="option.lpaGrupo"
            name="flavour-4a"
            @change="getMaxQuantitybyGroup(form.cfdGrupos)"
            inline
          >
            {{ option.lpaGrupo }}
          </b-form-checkbox> <!-- {{form.cfdGrupos}} -->
          <!-- ERRORS HANDLE -->
          <div
            class="text-danger font-weight-bold p-1 "
            v-if="!$v.form.cfdGrupos.required"
          >
            <div class="glyph-icon simple-icon-exclamation d-inline"></div>
            <small>{{ messages.messageRequired }}</small>
          </div>
          <!-- ERRORS HANDLE -->
        </b-form-group>

        <!-- FIN PARTE 2/4 -->
      </b-colxx>

      <b-colxx lg="6">
        <!-- PARTE 3/4  - SERVICE - -->

        <b-input-group label-size="xs">
          <div class="form-group has-float-label custom-selects my-1">
            <b-form-input
              :disabled="holdProperty || cancelProperty "
              v-model="form.cfdConcepto"
              plain
              size="sm"
              class="text-class-form"
              :maxlength="maxLengthInputs"
              placeholder="Select Supplier"
            ></b-form-input>
            <span
              >{{ $t("gps.confirmation-itinerary-form.service") }}
              <div
                class="text-primary glyph-icon simple-icon-badge d-inline"
              ></div>
            </span>
            <!-- ERRORS HANDLE -->
            <div
              class="text-danger font-weight-bold p-1"
              v-if="!$v.form.cfdConcepto.required"
            >
              <div class="glyph-icon simple-icon-exclamation d-inline"></div>
              <small>{{ messages.messageRequired }}</small>
            </div>
            <!-- ERRORS HANDLE -->
          </div>
        </b-input-group>
        <!-- FIN PARTE 3/4  - SERVICE - -->

        <b-row class="mt-2 h-75">
          <!-- PARTE 4/4  - NOTES - -->
          <b-colxx lg="4">
            <div class="align-self-center">
              <label class="form-group has-float-label">

                <b-form-textarea
                  id="textarea-state"
                  v-model="form.cfdNotaPasajero"
                  :disabled="holdProperty || cancelProperty"
                  maxlength="500"
                  rows="8"
                  max-rows="9"
                ></b-form-textarea>
                <span
                  >{{ $t("gps.confirmation-itinerary-form.notes-pax") }}
                  <div
                    v-if="Boolean(form.cfdNotaPasajero)"
                    class="text-success glyph-icon simple-icon-check d-inline"
                  ></div>
                </span>
              </label>
            </div>
          </b-colxx>
          <b-colxx lg="4">
            <div class="align-self-center">
              <label class="form-group has-float-label">
                <b-form-textarea
                  id="textarea-state"
                  v-model="form.cfdNotaProveedor"
                  :disabled="holdProperty || cancelProperty"
                  maxlength="500"
                  rows="8"
                  max-rows="9"
                ></b-form-textarea>
                <span
                  >{{ $t("gps.confirmation-itinerary-form.notes-provider") }}
                  <div
                    v-if="Boolean(form.cfdNotaProveedor)"
                    class="text-success glyph-icon simple-icon-check d-inline"
                  ></div>
                </span>
              </label>
            </div>
          </b-colxx>
          <b-colxx lg="4">
            <div class="align-self-center">
              <label class="form-group has-float-label">
                <b-form-textarea
                  id="textarea-state"
                  v-model="form.cfdNotaOperaciones"
                  maxlength="500"
                  :disabled="holdProperty || cancelProperty || $isOperador"
                  rows="8"
                  max-rows="9"
                ></b-form-textarea>
                <span
                  >{{ $t("gps.confirmation-itinerary-form.notes-operations") }}
                  <div
                    v-if="Boolean(form.cfdNotaOperaciones)"
                    class="text-success glyph-icon simple-icon-check d-inline"
                  ></div>
                </span>
              </label>
            </div>
          </b-colxx>
          <!-- FIN PARTE 4/4  - NOTES - -->

          <!-- BOTONES - -->

          <div class="container h-100">
            <div class="row justify-content-center">
              <b-colxx lg="12" align-self="center">

                  <div class="col-8 align-self-center text-center" >

                    <div
                      class="alert alert-danger mt-1"
                      v-if="messageTotalvsDiscounts"
                    >
                      <div
                        class="glyph-icon simple-icon-exclamation d-inline"
                      ></div>
                      {{ messageTotalvsDiscounts }}
                    </div>

                    <div
                      class="alert alert-danger mt-2"
                      v-if="Boolean(formValidationsMessage)"
                    >
                      {{ formValidationsMessage }}
                    </div>
                  </div>

              </b-colxx>
            </div>
          </div>
          <!-- BOTONES - -->
        </b-row>
      </b-colxx>

    </b-row>

    <!--  buttons -->
    <b-row>
      
      <b-col class="mt-2">
        
        <hr>

        <div class="row  center-title-mobile">

          <!-- <div class="col-lg-7">
            <itinerary-cruise-customize-rate
               v-if="isCruiseService && $isAdministradorTarifas"
               :bok-id="selectedBokId"
               @reload="handleCustomizeRates"
            />
          </div> -->
          
          <div class="col-lg-12 text-right  center-title-mobile">

            <b-button
              class="d-inline mr-2 px-5 "
              variant="primary"
              @click="validate(form)"
              :disabled="waiting"
            >
            <b-spinner small type="grow" v-if="waiting"></b-spinner>
              {{ $t("gps.confirmation-itinerary-form.save") }}
            </b-button> 

            <b-button
              class="d-inline px-5 "
              variant="secondary"
              @click="closeAction(form.cfdFechaInicio)"
              >{{ $t("gps.close") }}
            </b-button>

           

            <!-- BOTON DE EDICION -->
              <!-- <b-button
              :disabled="holdProperty || cancelProperty  || Number(serviceselected.map(a => a.cofEstado)) === 0"
              v-if="info_edit_booking.bokId" @click=" -->

            <!-- <b-button
              :disabled="holdProperty || cancelProperty  || Number(serviceselected.map(a => a.cofEstado)) === 0"
              v-if="Number(serviceselected.map(a => a.bokId)) > 0" @click="
              $router.push({
                          name: 'SlotsParentEdit',
                          params: {
                            bokId: info_edit_booking.bokId,
                            depId: info_edit_booking.depId,
                            clientId: info_edit_booking.cofClienteId,                            
                          },                      
                          query: { c: info_edit_booking.cofId, m: ''  }
                      })               
              " variant="info" class="mx-1 float-right">Edit Booking
            </b-button>    -->

            <!-- BOTON DE EDICION -->

          </div>

  
        </div>

      </b-col>
  
    </b-row>



  </div>
</template>

<script>
/* *** SERVICES *** */

import roles from '@/mixins/roles/roles'

import ConfirmacionServices from "@/services/gps/confirmacion/ConfirmacionServices.js";
import ProductosServices from "@/services/gps/productos/ProductosServices.js";
import MetadataServices from "@/services/gps/metadata/MetadataServices.js";

import { mapGetters, mapMutations, mapActions } from "vuex";


import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import moment from "moment";

import { validationMixin } from "vuelidate";

const {
  required,
  email,
  minLength,
  between
} = require("vuelidate/lib/validators");


export default {
  name: "itineraryConfirmationForm",
  props: ["serviceselected", "cofId"],
  components: {
    "v-select": vSelect,
    "quill-editor": quillEditor,
    "ItineraryCruiseCustomizeRate": () => import('@/views/app/gps/confirmations/itinerary/ItineraryCruiseCustomizeRate')
  },

  data() {
    return {
      limit:10,
      waiting: false,
      maxquantity:"",
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD HH:mm" // Uses 'iso' if missing
      },
      editorOption: {
        placeholder: "",
        modules: {
          toolbar: [
            // ["bold", "italic", "underline", "strike", "blockquote"],
            ["bold", "italic", { list: "ordered" },{ list: "bullet" },],
            // [
            //   { list: "ordered" },
            //   { list: "bullet" },
            //   { indent: "-1" },
            //   { indent: "+1" }
            // ],
            // ["link"]
          ]
        }
      },
      confirmationsStatus: [],
      cofInicio: "",
      cofFinal: "",
      info_edit_booking:[],
      form: {
        cfdFechaInicio: "",
        cfdFechaFin: "",
        prdId: [],
        cfdConcepto: "",
        cfdCosto: "",
        cfdVenta: "",
        cfdDescuentoExtra: "",
        cfdDescuentoNinos: "",
        cfdMostrarCliente: "",
        cfdAsunto: "",
        cfdAsuntoSecuencia: "",
        cfdEstado: "",
        cfdCantidad: "",
        cfdGrupos: [],
        cfdBloqueado: "",
        cfdCompensacion: "",
        cfdNotaPasajero: "",
        cfdNotaProveedor: "",
        cfdNotaOperaciones: "",
        supplier: "",
        loggedUserId: "",
        loggedUserName: ""
      },
      checkHoldProperty: "",
      checkCancelProperty: "",
      checkCruiseServiceProperty: "",
      formValidationsMessage: "",

      validationForm: "",
      confirmationsSuppliers: [],
      confirmationsAsunto: [],
      confirmationsGroups: [],
      selectedGroups: [],
      maxLengthTextAreas: 300,
      maxLengthInputs: 200,
      maxLengthNumbersInputs: 7,
      messageTotalvsDiscounts: "",
      messages: {
        messageRequired: this.$t(
          "gps.confirmation-itinerary-form.required-field"
        ),
        messageRange: this.$t("gps.confirmation-itinerary-form.required-range")
      }
    };
  },
  mixins: [validationMixin, roles],
  validations() {
    return {
      form: {
        cfdFechaInicio: {
          required
        },
        cfdFechaFin: {
          required
        },
        cfdConcepto: {
          required
        },
        cfdVenta: {
          required
        },
        cfdEstado: {
          required
        },
        cfdCantidad: {
          required,
          between: between(1, 100),
          minLength: minLength(1)
        },
        cfdGrupos: {
          required
        }
      }
    };
  },
  computed: {
    //Propiedad para determinar la cantidad máxima de acuerdo a la selección de Grupos.
    // Para el caso de que se pinte por primera vez el formulario, el valor será de this.serviceselected[0].cfdCantidad
    // En el caso de que se seleccionen 2 o mas grupos, el valor será: this.maxquantity.count_group
    maxQuantityGroup(){
        if( Boolean(this.maxquantity) && Boolean(this.maxquantity.count_group)){
          return this.maxquantity.count_group
        }else{
          if( Boolean(this.serviceselected[0]) && Boolean(this.serviceselected[0].cfdCantidad)){
            return this.serviceselected[0].cfdCantidad;
          }
        }
    },
    holdProperty() {
      return this.checkHoldProperty == 1 ? true : false;
    },
    cancelProperty() {
      return this.checkCancelProperty == 0 ? true : false;
    },
    cruiseServiceProperty() {
      return Boolean(this.checkCruiseServiceProperty) ? true : false;
    },
    total_discounts() {
      let totalventa = this.serviceselected[0].cfdVenta;
      let total =
        parseFloat(this.form.cfdDescuentoExtra) +
        parseFloat(this.form.cfdDescuentoNinos);
      if (total > totalventa) {
        this.messageTotalvsDiscounts = this.$t(
          "gps.confirmation-itinerary-form.validation-total"
        );
        return false;
      }
      if (total <= totalventa) {
        this.messageTotalvsDiscounts = "";
        return true;
      }
    },

    isCruiseService () {

      const [ service ] = this.serviceselected
      return service.bokId ? true : false

    },

    selectedBokId () {

      const [ service ] = this.serviceselected
      return service.bokId

    },

  },
  watch: {
    serviceselected: {
      deep: true,
      handler: function(val) {
        this.init();
      }
    },
    $loggedUserId() {
      if (Boolean(this.$loggedUserId))
        this.form.loggedUserId = this.$loggedUserId;
    },
    $loggedUserName() {
      if (Boolean(this.$loggedUserName))
        this.form.loggedUserName = this.$loggedUserName;
    },
    //VALIDACION DE DECIMALES:
    'form.cfdDescuentoExtra': function (newVal, oldVal){
      if (newVal.includes('.')) {
        this.form.cfdDescuentoExtra = newVal.split('.')[0] + '.' + newVal.split('.')[1].slice(0, 2)
      }
     },
    'form.cfdDescuentoNinos': function (newVal, oldVal){
      if (newVal.includes('.')) {
        this.form.cfdDescuentoNinos = newVal.split('.')[0] + '.' + newVal.split('.')[1].slice(0, 2)
      }
     },
    'form.cfdVenta': function (newVal, oldVal){
      if (newVal.includes('.')) {
        this.form.cfdVenta = newVal.split('.')[0] + '.' + newVal.split('.')[1].slice(0, 2)
      }
     },
    'form.cfdCosto': function (newVal, oldVal){
      if(newVal){
        if (newVal.includes('.')) {
          this.form.cfdCosto = newVal.split('.')[0] + '.' + newVal.split('.')[1].slice(0, 2)
        }
      }
     },
  },


  methods: {

    ...mapMutations("confirmacion", ["setChangeHeaderConfirmation"]),
    ...mapActions("confirmacion", ["getTotalConfirmacionAction"]),

    // 2022-09-07 | fg | ejecutar actualizacion de itinerario
    handleCustomizeRates(){
      this.$emit("itineraryReload")
    },

    onTextChange() {
      const quill = this.$refs.editor.quill
      const len = quill.getLength()
      if (len > this.limit) {
        quill.deleteText(this.limit, len);
      }
    },

    closeAction(cfdFechaInicio){
      this.$emit("closeChild");
    },
  // Función para validar el máximo número a tipear en cfCantidad
  validateNumber () {
    var cantidad = this.form.cfdCantidad;
    const cfdCantidad = document.getElementById('cfdCantidad');
    if (parseInt(cantidad) > parseInt(this.maxQuantityGroup))  {
      this.form.cfdCantidad = 0;
      cfdCantidad.value = "";
      return false;
    }
  },
  getMaxQuantitybyGroup(id){
      ConfirmacionServices.getMaxQuantitybyGroup(this.cofId,id)
        .then((response) => {
      this.maxquantity= response.data;
         this.form.cfdCantidad=this.maxquantity.count_group;
      })
        .catch((error) => {
          console.log(error);
        });
  },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
handleInput (e) {
      let stringValue = e.target.value.toString()
      let regex = /^\d*(\.\d{1,2})?$/
      if(!stringValue.match(regex) && this.price!== '') {
        this.price = this.previousPrice
      }
      this.previousPrice = this.price
    },
    changeCfdMostrarCliente() {
      this.form.cfdMostrarCliente === 1
        ? (this.form.cfdMostrarCliente = 0)
        : (this.form.cfdMostrarCliente = 1);
    },
    deleteservice(id) {
      this.$swal({
        title: "Delete service",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#ED7117",
        reverseButtons: true
      }).then(result => {
        if (result.isConfirmed) {
          ConfirmacionServices.cancelService(id)
            .then(response => {
              let status = response.data.data;
              if (status == 200) {
                var type = "success filled";
                var title = "Success";
                var message = this.$t(
                  "gps.confirmation-itinerary-form.service-deleted"
                );
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false
                });
                this.$emit("updatedService");
                this.setChangeHeaderConfirmation(1);

              } else {
                var type = "error filled";
                var title = "Error";
                var message = this.$t(
                  "gps.confirmation-itinerary-form.no-service-deleted"
                );
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false
                });
              }
              this.setChangeHeaderConfirmation(1);
            })
            .catch(error => {
              var type = "error filled";
              var title = "Error";
              var message = error.response.data.data;
              this.$notify(type, title, message, {
                duration: 3000,
                permanent: false
              });
            });
        }
      });
    },
    validate(form) {
      this.$v.form.$touch(); //it will validate all fields
      if (!this.$v.$invalid) {
        this.formValidationsMessage = "";
        this.updatesDetailConfirmations(form);
      } else {
        this.formValidationsMessage = this.$t(
          "gps.confirmation-itinerary-form.check-errors"
        );
      }
    },
    updatesDetailConfirmations(form) {
      this.waiting = true;

      form.cofId = this.cofId;
      ConfirmacionServices.UpdatesDetailConfirmations(form)
        .then(response => {
          let mensaje = response.data.data;
          if (mensaje == 200) {
            var type = "success filled";
            var title = "Service";
            var message = this.$t(
              "gps.confirmation-itinerary-form.service-updated"
            );
            this.$notify(type, title, message, {
              duration: 3500,
              permanent: false
            });
            this.$emit("updatedService");
            this.setChangeHeaderConfirmation(1);

            // Ejecuto action totalConfirmacion para actualizar valor total en Cabecera
            this.getTotalConfirmacionAction(this.cofId)

          } else {
            var title = "danger filled";
            var message = this.$t(
              "gps.confirmation-itinerary-form.no-service-updated"
            );
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false
            });
          }
                this.setChangeHeaderConfirmation(1);
        })
        .catch(error => {
          var title = "danger filled";
          var message = error;
          this.$notify(type, title, message, {
            duration: 3000,
            permanent: false
          });
        })
        .finally(() => (this.waiting = false));
    },
    hideModal(refname) {
      this.$refs[refname].hide();
      if (refname === "modalnestedinline") {
        this.$refs["modalnested"].show();
      }
    },
    init() {
      if (Boolean(this.serviceselected) && Boolean(this.serviceselected[0])) {
        this.checkCruiseServiceProperty = this.serviceselected[0].bokId;
        this.form.cfdId = this.serviceselected[0].cfdId;
        this.form.cfdFechaInicio = this.serviceselected[0].cfdFechaInicio;
        this.form.cfdFechaFin = this.serviceselected[0].cfdFechaFin;
        this.form.prdId = this.serviceselected[0].prdId;
        this.form.cfdConcepto = this.serviceselected[0].cfdConcepto;
        this.form.cfdCosto = this.serviceselected[0].cfdCosto;
        this.form.cfdVenta = this.serviceselected[0].cfdVenta;
        this.form.cfdDescuentoExtra = this.serviceselected[0].cfdDescuentoExtra
          ? this.serviceselected[0].cfdDescuentoExtra
          : 0;
        this.form.cfdDescuentoNinos = this.serviceselected[0].cfdDescuentoNinos
          ? this.serviceselected[0].cfdDescuentoNinos
          : 0;
        this.form.cfdMostrarCliente = this.serviceselected[0].cfdMostrarCliente;
        this.form.cfdAsunto = this.serviceselected[0].cfdAsunto;
        this.form.cfdAsuntoSecuencia = this.serviceselected[0].cfdAsuntoSecuencia;
        this.form.cfdEstado = this.serviceselected[0].cfdEstado;
        this.checkCancelProperty = this.serviceselected[0].cfdEstado;
        //this.form.cfdPax = this.serviceselected[0].cfdPax;
        this.form.cfdCantidad = this.serviceselected[0].cfdCantidad;
        this.form.cfdOrden = this.serviceselected[0].cfdOrden;
        this.form.cfdBloqueado =
          this.serviceselected[0].cfdBloqueado == 1
            ? this.serviceselected[0].cfdBloqueado
            : 0;
        this.checkHoldProperty = this.serviceselected[0].cfdBloqueado;
        this.form.cfdCompensacion = this.serviceselected[0].cfdCompensacion = 1
          ? this.serviceselected[0].cfdCompensacion
          : 0;
        this.form.cfdNotaPasajero = this.serviceselected[0].cfdNotaPasajero;
        this.form.cfdNotaProveedor = this.serviceselected[0].cfdNotaProveedor;
        this.form.cfdNotaOperaciones = this.serviceselected[0].cfdNotaOperaciones;
        this.form.supplier = this.serviceselected[0].supplier
          ? this.serviceselected[0].supplier
          : "No supplier";
        // this.form.cfdVueloAerolinea      = this.serviceselected[0].cfdVueloAerolinea;
        // this.form.cfdVueloCodigo         = this.serviceselected[0].cfdVueloCodigo;
        // this.form.cfdVueloOrigen         = this.serviceselected[0].cfdVueloOrigen;
        // this.form.cfdVueloSalida         = this.serviceselected[0].cfdVueloSalida;
        // this.form.cfdVueloLlegada        = this.serviceselected[0].cfdVueloLlegada;
        // this.form.cfdVueloDestino        = this.serviceselected[0].cfdVueloDestino;
        // this.form.cfdGrupoRequerimiento  = this.serviceselected[0].cfdGrupoRequerimiento;

        // this.cofInicio = this.serviceselected[0].cofInicio;
        // this.cofFinal = this.serviceselected[0].cofFinal;
       /*  this.cofInicio = moment(this.serviceselected[0].cofInicio)
          .add(1, "d")
          .format("YYYY-MM-DD");
        this.cofFinal = moment(this.serviceselected[0].cofFinal)
          .add(1, "d")
          .format("YYYY-MM-DD"); */
           this.cofInicio = moment(this.serviceselected[0].cofInicio)
          .format("YYYY-MM-DD");
        this.cofFinal = moment(this.serviceselected[0].cofFinal)
          .format("YYYY-MM-DD");

        // (*) Configuración de grupos
        //1. Extraigo los valores de detalle de Confirmacion
        this.selectedGroups = this.serviceselected[0].grupos.map(
          a => a.pseGrupo
        );
        //2. Asigno a v-model
        this.form.cfdGrupos = this.selectedGroups;
        /* maxquantity.count_group */
      }
    },
    async getConfirmationsStatus() {
      await MetadataServices.getMetadataByGroup(24)
        .then(response => {
          // La cancelación solo se la realizará a traves del botón CANCEL
          this.confirmationsStatus = response.data.data;
          // this.confirmationsStatus = response.data.data.filter(
          //   item => item.metCodigo != 0
          // );
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    },
    async getConfirmationsGroups() {
      await ConfirmacionServices.getGrupos(this.cofId)
        .then(response => {
          this.confirmationsGroups = response.data.data;
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    },
    async   getInfoEditBooking() {
      await   ConfirmacionServices.getInfoEditBooking(this.cofId)
        .then((response) => {
          this.info_edit_booking = response.data.data;
          this.info_edit_booking = this.info_edit_booking.shift();
          
 
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getConfirmationsSuppliers() {
      await ProductosServices.getProductos()
        .then(response => {
          this.confirmationsSuppliers = response.data.data;
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    },
    async getConfirmationsAsunto() {
      await MetadataServices.getMetadataByGroup(23)
        .then(response => {
          this.confirmationsAsunto = response.data.data;
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    },


  },


  mounted() {

  },
  async created() {

    await this.getConfirmationsSuppliers();
    await this.getConfirmationsStatus();
    await this.getConfirmationsGroups();
    await this.getInfoEditBooking();
    
    await this.getConfirmationsAsunto();
    //await this.init();
    setTimeout(() =>  this.init(), 250);
  }
};
</script>

<style scoped>
.text-class-form {
  font-size: inherit !important;
}
.input-group-text {
  width: 73px !important;
  font-size: 11px !important;
}
.input-cost {
  padding: 0px !important;
}

.theme-orange .vdatetime-popup__header,
.theme-orange .vdatetime-calendar__month__day--selected > span > span,
.theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #ff9800;
}

.theme-orange .vdatetime-year-picker__item--selected,
.theme-orange .vdatetime-time-picker__item--selected,
.theme-orange .vdatetime-popup__actions__button {
  color: #ff9800;
}

</style>
