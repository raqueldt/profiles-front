<template>
  <div>
    <b-card>
      <template #header>
        <div class="w-100">
          <span><strong>Abonos</strong></span>

          <template v-if="getSelectedFile">
            <b-button
              squared
              variant="primary"
              size="sm"
              @click="changestatuscreation"
              class="float-right"
              v-if="!isFormMode && planPagos.length > 0"
            >
              Nuevo
            </b-button>
          </template>
        </div>
      </template>

      <b-colxx
        v-if="planPagos.length > 0"
        lg="12"
        class="summary records p-0 m-auto"
      >
        <template>
          <div>
            <b-tabs content-class="mt-3" justified>
              <b-tab
                title="Efectivo"
                active
                @click="captureTab('CASH')"
                v-if="isCreateMode || tabactive == 'CASH'"
              >
                <b-row class="mt-3 mx-0">
                  <b-colxx>
                    <b-input-group>
                      <div class="form-group has-float-label custom-selects">
                        <v-date-picker
                          mode="date"
                          is24hr
                          v-model="cobranza.ccoFecha"
                        >
                          <template v-slot="{ inputValue, inputEvents }">
                            <input
                              class="form-control"
                              :value="inputValue"
                              v-on="inputEvents"
                            />
                          </template>
                        </v-date-picker>
                        <span>Fecha</span>
                      </div>
                    </b-input-group>
                  </b-colxx>

                  <b-colxx>
                    <b-input-group>
                      <div class="form-group has-float-label custom-selects">
                        <b-form-input
                          v-model="cobranza.ccoMonto"
                          @keypress="onlyNumber"

                          maxlength="4"
                          type="number"
                          class="text-class-form amount"
                        ></b-form-input>

                        <span>Monto</span>
                      </div>
                    </b-input-group>
                  </b-colxx>
                  <b-colxx>
                    <b-input-group>
                      <div class="form-group has-float-label custom-selects">
                        <b-form-input
                          v-model="cobranza.ccoGastos"
                          @keypress="onlyNumber"
                          type="number"
                          class="text-class-form fess"
                        ></b-form-input>
                        <span>Gastos bancarios</span>
                      </div>
                    </b-input-group>
                  </b-colxx>
                </b-row>
                <b-row class="mt-3 mx-0">
                  <b-col>
                    <b-input-group>
                      <div class="form-group has-float-label custom-selects">
                        <b-form-input
                          v-model="cobranza.ccoNotas"
                          type="text"
                          class="text-class-form note"
                        ></b-form-input>
                        <span>Detalle</span>
                      </div>
                    </b-input-group>
                  </b-col>
                </b-row>
                <!-- payment method -->
                <b-row class="mt-3 mx-0">
                  <b-col>
                    <b-form-group>
                      <b-col>
                        <b-form-group
                          label="Marque las cuotas del plan de pagos"
                        >
                          <b-form-checkbox-group
                            v-model="selectedOptionsPlan"
                            :options="planPagos"
                            name="buttons-plan"
                            size="xs"
                            stacked
                          ></b-form-checkbox-group>
                        </b-form-group>
                      </b-col>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-input-group>
                      <div class="form-group has-float-label custom-selects">
                        <v-select
                          label="cbaNombre"
                          :options="cuentasbancarias"
                          :reduce="(cuenta) => cuenta.cbaId"
                          v-model="cobranza.cbaId"
                        >
                        </v-select>

                        <span>Cuenta bancaria</span>
                      </div>
                    </b-input-group>

                    <!-- CRUD CUENTAS BANCARIAS -->
                          <b-button
                            class="mt-2"
                            data-toggle="tooltip" data-placement="top" title="Administrar cuenta bancarias"
                            variant="outline-primary border-0"
                            size="sm"
                            @click="showModalCuentasBancarias()"
                          >
                            
                          <i class="glyph-icon simple-icon-plus"></i>
                          </b-button>

                          <!-- MODAL ADMINISTRADOR DE COBRANZAS -->
                            <b-modal ref="modal-cuentas-bancarias" size="md" title="Administrador de cuentas bancarias" 
                                ok-only ok-variant="secondary" ok-title="Close">
                              <CuentasBancarias @reload="initInfoCobranzas"></CuentasBancarias>
                            </b-modal>
                          <!-- FIN MODAL ADMINISTRADOR DE COBRANZAS -->
                    
                      <!-- FIN CRUD CUENTAS BANCARIAS -->

                  </b-col>
                </b-row>
                <!--
                ALERTA -->

                <b-alert
                  v-if="error"
                  :show="dismissCountDown"
                  dismissible
                  variant="warning"
                  @dismissed="dismissCountDown = 0"
                  @dismiss-count-down="countDownChanged"
                >
                  Please verify that the information is correct and complete
                  {{ dismissCountDown }}
                </b-alert>
                <b-row class="mt-3 mx-0">
                  <b-col cols="12" class="pr-4 mt-1">
                    <div class="d-flex justify-content-end">
                      <b-button
                        squared
                        variant="light"
                        size="sm"
                        @click="closeAction"
                        :disabled="isSaving"
                      >
                        Cerrar
                      </b-button>

                      <b-button
                        squared
                        variant="success"
                        size="sm"
                        @click="crearCobranza"
                        v-if="!tabactive"
                        :disabled="isSaving || validateMontoCreditNote == false "
                      >
                        Guardar
                      </b-button>

                      <b-button
                        squared
                        variant="success"
                        size="sm"
                        :disabled="isSaving || selectedOptionsPlan.length ==0"
                        v-if="tabactive"
                        @click="UpdateCobranzas"
                      >
                        Aplicar
                      </b-button>
                    </div>
                  </b-col>
                </b-row>
              </b-tab>
<!--
Apartado de Abonos como notas de credito -->

              <b-tab
                title="Nota de crédito"
                @click="captureTab('NC')"
                v-if="isCreateMode || tabactive == 'NC'"
              >
              <!--     {{cobranza.ccoMonto}} {{originalmount}} {{validateMontoCreditNote}} -->
                <b-row class="mt-3 mx-0">
                  <b-colxx>
                    <b-input-group>
                      <div class="form-group has-float-label custom-selects">
                        <v-date-picker
                          mode="date"
                          is24hr
                          v-model="cobranza.ccoFecha"
                        >
                          <template v-slot="{ inputValue, inputEvents }">
                            <input
                              class="form-control"
                              :value="inputValue"
                              v-on="inputEvents"
                            />
                          </template>
                        </v-date-picker>
                        <span>Fecha</span>
                      </div>
                    </b-input-group>
                  </b-colxx>

                  <b-colxx>
                    <b-input-group>
                      <div class="form-group has-float-label custom-selects">
                        <b-form-input
                          v-model="cobranza.ccoMonto"
                          @keypress="onlyNumber"
                          @input="validarMontoMaximo"
                          maxlength ="4"
                          type="number"
                          class="text-class-form amount"
                        ></b-form-input>
                        <small
                          class="text-danger"
                          v-if="validateMontoCreditNote == false && this.cobranza.devId"
                          >Mount exceed value of credit note</small
                        >
                        <span>Monto</span>
                        <!--@input="validarMontoMaximo"  -->

                        <small v-if="valorAValidar">Valor máximo: <b style="border-bottom:solid 2px orange">{{valorAValidar | currency}}</b></small>
                      </div>
                    </b-input-group>
                  </b-colxx>
                </b-row>

                <b-row class="mt-3 mx-0">
                  <b-col>
                    <b-input-group>
                      <div class="form-group has-float-label custom-selects">
                        <b-form-input
                          v-model="cobranza.ccoNotas"
                          type="text"
                          class="text-class-form note"
                        ></b-form-input>
                        <span>Detalle</span>
                      </div>
                    </b-input-group>
                  </b-col>
                </b-row>

                <!-- payment method -->
                <b-row class="mt-3 mx-0">
                  <b-col>
                    <b-form-group>
                      <b-row class="mx-0">
                        <b-col>
                          <b-form-group
                            label="Marque las cuotas del plan de pagos"
                          >
                            <b-form-checkbox-group
                              v-model="selectedOptionsPlan"
                              :options="planPagos"
                              name="buttons-plan"
                              size="xs"
                              stacked
                            ></b-form-checkbox-group>
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-input-group>
                      <div>
                        <b-form-group
                          v-if="getDev.length > 0"
                          label=" Notas de crédito disponibles"
                        >
                          <b-form-radio
                            v-for="item in getDev"
                            :key="item.devId"
                            @change="capturemonto(item)"
                            v-model="cobranza.devId"
                            :value="item.devId"
                            >
                            <div>
                            {{ item.devReferencia }} ({{ item.saldoDisponible  | currency}})

                              <!-- <small v-if="item.devId === cobranza.devId">
                                  [Máximo: {{parseInt(valorAValidar) | currency}}]
                              </small> -->

                            </div>

                          </b-form-radio>
                        </b-form-group>
                        <small v-if="getDev.length <= 0"
                          >Credit notes no available</small
                        >
                        <!-- getDev: <pre>{{getDev}}</pre><br><br>
                        Cobranza: <pre>{{cobranza}}</pre> -->

                        <!-- cobranza.devId: {{cobranza.devId}}<br><br><br>
                        devId: {{getDev}} -->
                      </div>
                    </b-input-group>
                  </b-col>
                </b-row>

                <b-alert
                  v-if="error"
                  :show="dismissCountDown"
                  dismissible
                  variant="warning"
                  @dismissed="dismissCountDown = 0"
                  @dismiss-count-down="countDownChanged"
                >
                  Please verify that the information is correct and complete
                  {{ dismissCountDown }}
                </b-alert>
                <b-row>
                  <b-col cols="12" class="pr-4 mt-1">
                    <div class="d-flex justify-content-end">
                      <b-button
                        squared
                        variant="light"
                        size="sm"
                        @click="closeAction"
                        :disabled="isSaving"
                      >
                        Cerrar
                      </b-button>

                      <b-button
                        squared
                        variant="success"
                        size="sm"
                        @click="crearCobranza"
                        v-if="!tabactive"
                        :disabled="
                          isSaving ||
                          validateMontoCreditNote == false ||
                          getDev.length <= 0 ||
                          !cobranza.devId
                        "
                      >
                        Guardar
                      </b-button>

                      <b-button
                        squared
                        variant="success"
                        size="sm"
                        :disabled="isSaving || validateMontoCreditNote == false || selectedOptionsPlan.length ==0"
                        v-if="tabactive"
                        @click="UpdateCobranzas"
                      >
                        Aplicar
                      </b-button>

                    </div>
                  </b-col>
                </b-row>
              </b-tab>
              <!-- Fin
Apartado de Abonos como notas de credito -->
            </b-tabs>
          </div>
        </template>

<!-- Seccion tabla  -->
        <b-row>
          <b-col>
            <!-- <pre>{{getCobranzas}}</pre> -->
            <b-list-group v-if="getCobranzas" class="p-2">
              <b-list-group-item
                v-for="item in getCobranzas"
                :key="item.ccoId"
                class="d-flex justify-content-between align-items-center pr-2"

              >
              <a class="d-flex justify-content-between align-items-center pr-2 container">
                <div>
                  <span> {{ item.ccoNotas }} </span><br />
                  <span>
                    <small class="text-muted">
                      {{ item.cbaNombre }}
                    </small>
                  </span>
                  <span>
                    <small class="text-muted">
                      {{ item.devReferencia }}
                    </small>
                  </span>
                </div>

                <div class="d-flex">
                  <div class="text-right">
                    <strong style="font-size: 120%">
                      <span @click="gotoedit(item)" style="cursor: pointer">
                        {{ item.totalAbono | currency }}
                      </span> </strong
                    ><br />

                    <small class="text-muted">
                          {{moment(item.ccoFecha).format("DD MMM YYYY, ddd")}}
                    </small>
                  </div>

                  <div class="align-self-center ml-2">
                    <b-button
                      class="px-1"
                      variant="link primary"
                      size="xs"
                      @click.prevent="handleDelete(item.ccoId)"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </b-button>
                  </div>
                </div>
                </a>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </b-colxx>

      <b-colxx v-else lg="12" class="summary records p-0 m-auto">
        <b-alert class="mb-0 mt-3" show variant="warning">
          <div class="text-center">
            <strong>No hay plazos de vencimiento</strong><br />
            <small>
              Los plazos de vencimiento posibilitan el control de los abonos
              realizados.
            </small>
          </div>
        </b-alert>
      </b-colxx>
    </b-card>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Datepicker from "vuejs-datepicker";
import CobranzasServices from "@/services/gps/cobranzas/CobranzasServices";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import FaqVue from '../../../../pages/miscellaneous/Faq.vue';
import CuentasBancarias from '@/views/app/gps/collections/cuentasBancarias/CuentasBancarias.vue'

export default {
  name: "collectionMainRecords",
  components: {
    "v-select": vSelect,
    datepicker: Datepicker,
    CuentasBancarias
  },
  data() {
    return {
      selectedOptionsPlan: [],
      planPagos: [],
      dismissSecs: 5,
      dismissCountDown: 0,
      optionPayment: 0,
      picker: new Date().toISOString().substr(0, 10),
      nowDate: moment().format("YYYY-MM-DD"),
      hasErrors: false,
      errors: null,
      infocobranza: [],
      isSaving: false,
      isEditMode: false,
      cuentasbancarias: [],
      bandera: "",
      isCreateMode: false,
      tabactive: "",
      selecttab: "",
      devolucion: "",
      isLoading: false,
      infodevoluciones: [],
      monto: 0,
      error: false,
      originalmount: [],
      confirmacion: "",
      optionsPlan: [],
      cobranza: {
        devId: null,
        cofId: this.$route.query.f,
        cbaId: "",
        ccoFecha: new Date(),
        ccoMonto: 0,
        ccoGastos: 0,
        ccoNotas: null,
        ccoUsuario: this.$root.$loggedUserId,
        planPago: null,
      },

      fields: [
        {
          key: "ccoFecha",
          label: "Fecha",
        },

        {
          key: "ccoMonto",
          label: "Monto",
          tdClass: "text-right",
        },
        {
          key: "ccoGastos",
          label: "Gastos banco",
          tdClass: "text-right",
        },
        {
          key: "ccoNotas",
          label: "Detalle",
        },
        {
          key: "cbaNombre",
          label: "Banco",
        },
        {
          key: "devId",
          label: "Nota crédito",
        },
        {
          key: "actions",
          label: "Acciones",
          class: "text-center",
          tdClass: "text-right",
        },
      ],

      valorAValidar:'',
      devId: '',
      saldoDisponible: ''
    };
  },

  computed: {
    ...mapGetters("cobranzas", ["getCobranzas", "getDev"]),
    ...mapGetters("fileManager", ["getSelectedFile"]),
    currentConfirmacion() {
      const { f } = this.$route.query; // f: file id capturamos el valor de la confirmacion desde la url
      return parseInt(f);
    },

    isFormMode() {
      return this.isCreateMode || this.isEditMode;
    },
    changeoption() {
      if (this.optionPayment == 1) this.cobranza.cbaId = null;
      this.cobranza.ccoMonto = 0;

      if (this.optionPayment == 0) this.cobranza.devId = null;
      this.cobranza.ccoMonto = 0;
    },
    validateMontoCreditNote() {
      if (this.isCreateMode == true && this.selecttab == "CASH") {
        return true;
      }

      if (
        this.isEditMode == true &&
        this.isCreateMode == false &&
        this.tabactive == "NC"
      ) {
        /* if (this.cobranza.ccoMonto > this.originalmount) return true;
        else  */ return true;
      }

      if (this.isEditMode == false && this.selecttab == "NC") {
        if (this.isCreateMode == true && this.cobranza.ccoMonto > this.monto)
          return false;
        else return true;
      }
    },

  },

  watch: {
    selecttab(newPlan, oldPlan) {
      this.tabactive = "";
      this.clean();
    },

    selectedOptionsPlan(newPlan, oldPlan) {
      const optionsPlan = newPlan.map(function (value) {
        const item = {
          cppId: value,
        };
        return item;
      });

      this.cobranza.planPago = { ...optionsPlan };
    },

    currentConfirmacion(newFile, oldFile) {
      // observador que recarga la pagina cuando detecta un cambio en la confirmacion
      // console.log("CONFIRMATION CHANGE URL ", newFile, oldFile)
      this.initInfoCobranzas();
      this.getDevolucion();
      this.confirmacion = newFile;
      this.cobranza.cofId = this.$route.query.f; // Cambiamos el cofId al array cobranza para el guardado
      this.tabactive = "";
      this.clean();
      this.isCreateMode = false;
    },

    getSelectedFile(newFile, oldFile) {
      // Proveniente de store, desde filtros, sirve para mmostrar pero no tiene relacion con la accion
      this.initInfoCobranzas();
    },
  },

  async created() {
    await this.getDevolucion();
    await this.initInfoCobranzas();
  },

  mounted() {

  },

  methods: {
        ...mapActions("cobranzas", [
      "createCobranza",
      "updateCobranza",
      "deleteCobranza",
      "loadCobranzas",
      "getDevoluciones",
    ]),

    ...mapActions("fileManager", ["loadFileSummary"]),

    changestatuscreation() {
      this.isCreateMode = true;
      this.clean();
    },

    async initInfoCobranzas() {
      this.isLoading = true;
      const confirmacion = this.currentConfirmacion;
      await this.loadCobranzas(confirmacion);
      // referencias plan, bancos
      const cuentas = await CobranzasServices.getCuentasBancarias();      
      //this.cuentasbancarias = cuentas.data;

      //Solo filtro por las cuentas bancarias activas
      this.cuentasbancarias = cuentas.data.filter(f => f.cbaEstado === 1);

      const { data } = await CobranzasServices.getConfirmacionPlanPagos(
        this.currentConfirmacion
      );

      const options = data.data.map(function (option, index) {
        const item = {
          text: "Cuota " + (index + 1),
          value: option.cppId,
          checked: false,
        };
        return item;
      });

      this.planPagos = options;

      this.isLoading = false;
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },

    capturemonto(item) {

      this.cobranza.ccoMonto = item.saldoDisponible;
      this.monto = item.saldoDisponible;
      this.cobranza.cbaId = null;

      this.seteoMaximoDisponibleOnClick(item.devId, item.saldoDisponible);
    },

    closeAction() {
      this.tabactive = "";
      this.isCreateMode = false;
      this.isEditMode = false;
    },
    clean() {
      this.isEditMode = false;
      this.cobranza.ccoId = "";
      this.cobranza.ccoFecha = new Date();
      this.cobranza.ccoMonto = 0;
      this.cobranza.ccoNotas = "";
      this.cobranza.ccoGastos = 0;
      this.selectedOptionsPlan = [];
      this.cobranza.cbaId="";
      this.cobranza.devId="";
    },

    async gotoedit(info) {
      this.isEditMode = true;
      this.isCreateMode = false;
      this.tabactive = "";
      this.infocobranza = info;
      this.cobranza.ccoId = info.ccoId;
      this.cobranza.ccoFecha = info.ccoFecha;
      this.cobranza.ccoMonto = info.ccoMonto;
      this.cobranza.ccoNotas = info.ccoNotas;
      this.cobranza.ccoGastos = info.ccoGastos;
      this.cobranza.cbaId = info.cbaId;
      this.cobranza.totalAbono = info.totalAbono;
      await this.initInfoCobranzas();
      this.selectedOptionsPlan = info.planPago.map((a) => a.cppId);
      this.cobranza.devId = info.devId;
      this.devolucion = info.devId;

      this.devId = info.devId;

      this.seteoInicialMaximoDisponible(info.devId, info.ccoMonto);

      CobranzasServices.detailNC(this.devolucion)
        .then((response) => {
          this.originalmount = response.data;
          this.originalmount = this.originalmount.shift();
          this.originalmount = this.originalmount.devMonto;
        })
        .catch((error) => {
          console.log(error);
        }).finally(() => {

          }
        );

      if (this.cobranza.devId) {
        this.tabactive = "NC";
      } else {
        this.tabactive = "CASH";
      }
    },

    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },

    validarMontoMaximo(event) {
          let valorIngresado = event;
          if( (parseInt(valorIngresado))  > parseInt(this.valorAValidar)) this.cobranza.ccoMonto = "";
    },

    seteoInicialMaximoDisponible(devId, ccoMonto){
              let getDev = this.getDev;
              let saldoDisponible = getDev.filter(f => f.devId === devId).map(x => x.saldoDisponible);
              let montoMaximmo = parseInt(saldoDisponible) + parseInt(ccoMonto);
              this.valorAValidar = montoMaximmo;
    },
    seteoMaximoDisponibleOnClick(devId, ccoMonto){
          let getDev = this.getDev;
          if(this.devId === this.cobranza.devId){
              let getDev = this.getDev;
              let saldoDisponible = getDev.filter(f => f.devId === devId).map(x => x.saldoDisponible);
              let montoMaximmo = parseInt(saldoDisponible) + parseInt(this.cobranza.totalAbono);
              this.valorAValidar = montoMaximmo;
          }else{
                let saldoDisponible = getDev.filter(f => f.devId === devId).map(x => x.saldoDisponible);
                this.valorAValidar = saldoDisponible;
          }
    },

    async crearCobranza() {
      this.hasErrors = false;
      this.isSaving = true;

      try {
        await this.createCobranza(this.cobranza);
        this.initInfoCobranzas();
        this.clean();
        this.closeAction();
        this.loadFileSummary(this.currentConfirmacion);
        this.getDevolucion();
      } catch (e) {
        this.hasErrors = true;
        this.errors = e;
        this.error = true;
        this.dismissCountDown = this.dismissSecs;
      }

      this.isSaving = false;
      if (!this.hasErrors) {
      }
    },

    async UpdateCobranzas() {
      this.hasErrors = false;
      this.isSaving = true;

      try {
        await this.updateCobranza(this.cobranza);
        this.initInfoCobranzas();
        this.clean();
        this.closeAction();
        this.loadFileSummary(this.currentConfirmacion);
        this.getDevolucion();

      } catch (e) {
        this.hasErrors = true;
        this.errors = e;
        this.error = true;
      }
       this.isSaving = false;
    },
    captureTab(tab) {
      this.selecttab = tab;
    },

    async getDevolucion() {
      let notacredito = {
        id: this.currentConfirmacion,
        tipo: 1,
      };
      await this.getDevoluciones(notacredito);
    },

    async initDevoluciones() {
      const confirmacion = this.currentConfirmacion;
      await this.loadCobranzas(confirmacion);

      const { data } = await CobranzasServices.getConfirmacionPlanPagos(
        this.currentConfirmacion
      );
      response = data.data;
    },

    async handleDelete(id) {
      const confirmed = await this.$bvModal.msgBoxConfirm(
        "Permanently delete payment? You can't undo this.",
        {
          size: "sm",
          okVariant: "danger",
          okTitle: "Delete",
          cancelTitle: "Cancel",
          cancelVariant: "ligth",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        }
      );

      if (confirmed) {
        this.onDeleteCobranza(id);
      }
    },

    async onDeleteCobranza(ccoId) {
      try {
        const request = {
          id: ccoId,
        };

        await this.deleteCobranza(request);
        this.initInfoCobranzas();
        this.getDevolucion();
        this.clean();
        this.tabactive = "";
        this.isCreateMode = false;
        this.loadFileSummary(this.currentConfirmacion);
      } catch (e) {
        console.log("catch error ", e);
      }
    },

        showModalCuentasBancarias(){          
          this.$refs["modal-cuentas-bancarias"].show();
        },
        hideModalCuentasBancarias() {
          this.$refs["modal-cuentas-bancarias"].hide();
        },

  },
};
</script>

