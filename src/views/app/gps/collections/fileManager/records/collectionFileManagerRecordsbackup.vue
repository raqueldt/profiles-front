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
              @click="isCreateMode = true"
              class="float-right"
              v-if="!isFormMode && planPagos.length>0 "
            >
              Nuevo
            </b-button>
          </template>
        </div>
      </template>


      <b-colxx v-if="planPagos.length>0" lg="12" class="summary records p-0 m-auto">
        
        <template>
        
          <form v-if="isFormMode">
            <b-row class="mt-2">
              <b-colxx class="pl-4 pr-0">
               
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

              <b-colxx lg="3" class="pl-1 pr-0">
                <b-input-group>
                  <div class="form-group has-float-label custom-selects">
                    <b-form-input
                      v-model="cobranza.ccoMonto"
                      @keypress="onlyNumber"
                      maxlength="4"
                      type="number"
                      class="text-class-form amount"
                    ></b-form-input>
                        <small class="text-danger" v-if="validateMontoCreditNote== false && optionPayment == 1 ">Mount exceed value of credit note</small>
                    <span>Monto</span>
                  </div>
                </b-input-group>
              </b-colxx>
              
              <b-colxx lg="3" class="pl-1 pr-4">
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
            <b-row class="mt-2 mx-0">
              <b-col>
                <b-form-group>
                  <b-form-radio-group
                    v-model="optionPayment"
                    :options="optionsPayment"
                    name="radio-inline"
                  ></b-form-radio-group>
                </b-form-group>
              </b-col>
              <b-col>
                <b-input-group>
                  <div
                    v-if="optionPayment == 0"
                    class="form-group has-float-label custom-selects"
                  >
                        <v-select
                        @input="cambiarNotacredito"
                      label="cbaNombre"
                      :options="cuentasbancarias"
                      :reduce="(cuenta) => cuenta.cbaId"
                      v-model="cobranza.cbaId"
                    >
                    </v-select> 

                    <span>Cuenta bancaria</span>
                  </div>
            <div v-else>

     <b-form-group v-if="getDev.length>0" label=" Credit Notes Available">
   <!--     {{getDev.length}} -->
      <b-form-radio v-for="item in getDev" :key="item.devId" @change="capturemonto(item.devMonto)"  v-model="cobranza.devId" :value="item.devId">{{item.devReferencia}}  $ {{item.devMonto}}  </b-form-radio>

    </b-form-group>
    <small v-if="getDev.length<=0">Credit notes no available</small>
</div>
                </b-input-group>
              </b-col>
            </b-row>

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
                   <b-alert v-if="error"
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      Please verify that the information is correct and complete  {{ dismissCountDown }} 
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
                      v-if="!isEditMode "
                      :disabled="isSaving ||validateMontoCreditNote==false "
                    >
                      Guardar
                    </b-button>

                    <b-button
                      squared
                      variant="success"
                      size="sm"
                      :disabled="isSaving "
                      v-if="isEditMode"
                      @click="UpdateCobranzas"
                    >
                      Aplicar
                    </b-button>

                </div>                
              </b-col>         
            </b-row>
          </form>
        </template>


        <b-row>

          <b-col>

            <b-list-group 
              v-if="getCobranzas"
              class="p-2"
            >
              <b-list-group-item v-for="item in getCobranzas" :key="item.ccoId"
                class="d-flex justify-content-between align-items-center pr-2"
              >

                <div>
                  <span>
                    {{ item.ccoNotas}}
                  </span><br>
                  <span>
                    <small class="text-muted">
                    {{ item.cbaNombre }}

                    </small>
                  </span>
                  <span>
                    <small class="text-muted">
                    {{ item.devReferencia}}

                    </small>

                  </span>

                </div>

                <div class="d-flex">

                    <div class="text-right">
                        
                        <strong style="font-size: 120%">
                          <span @click="gotoedit(item)" style="cursor: pointer">
                              {{ item.totalAbono | currency }} 
                          </span>
                        </strong><br>

                        <small class="text-muted">
                        {{ item.ccoFecha }}

                        </small>
                    </div>

                    <div class="align-self-center ml-2"> 

              <!--b-button
                class="p-0"
                variant="link primary"
                size="xs"
                @click="gotoedit(item)"
              >
                <i class="fas fa-edit"></i>
              </!b-button-->

              <b-button
                class="px-1"
                variant="link primary"
                size="xs"
                @click="handleDelete(item.ccoId)"
              >
                <i class="fas fa-trash-alt"></i>
              </b-button>                      

                    </div>
                  
                  



                </div>


              </b-list-group-item>

            </b-list-group>

          </b-col>



        </b-row>

        <!--b-row class="mt-4 border-top">
          <b-table
            class="span text-center"
            striped
            hover
            :items="getCobranzas"
            :fields="fields"
            show-empty
            :busy="isLoading"
            fixed
          >
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>

            <template #cell(ccoFecha)="data">
              <span v-if="data.item.ccoFecha">
                {{ moment(data.item.ccoFecha).format("YYYY-MM-DD") }}
              </span>
              <span v-else> No data </span>
            </template>
            <template #cell(ccoMonto)="data">
              <span v-if="data.item.ccoMonto">
                {{ data.item.ccoMonto | currency }}</span
              >
              <span v-else> No data </span>
            </template>
            <template #cell(ccoGastos)="data">
              <span v-if="data.item.ccoGastos">
                {{ data.item.ccoGastos | currency }}</span
              >
              <span v-else> No data </span>
            </template>
            <template #cell(ccoNotas)="data">
              <span v-if="data.item.ccoNotas"> {{ data.item.ccoNotas }}</span>
              <span v-else> No data </span>
            </template>
            <template #cell(cbaNombre)="data">
              <span v-if="data.item.cbaNombre"> {{ data.item.cbaNombre }}</span>
              <span v-else> No data </span>
            </template>
                <template #cell(devId)="data">
              <span v-if="data.item.devId"> Apply</span>
              <span v-else> No apply </span>
            </template>
            <template #cell(actions)="data">
              <b-button
                class=""
                variant="link primary"
                size="xs"
                @click="gotoedit(data.item)"
              >
                <i class="fas fa-edit"></i>
              </b-button>

              <b-button
                class=""
                variant="link primary"
                size="xs"
                @click="handleDelete(data.item.ccoId)"
              >
                <i class="fas fa-trash-alt"></i>
              </b-button>
            </template>
          </b-table>
        </!--b-row-->
      </b-colxx>


   <b-colxx v-else lg="12" class="summary records p-0 m-auto">


         <b-alert 
            class="mb-0 mt-3"
            show 
            variant="warning"
         >
            <div class="text-center">            
              <strong>No hay plazos de vencimiento</strong><br>            
                <small>
                  Los plazos de vencimiento posibilitan el control de los abonos realizados.
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

import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "collectionMainRecords",
  components: {
    "v-select": vSelect,
    datepicker: Datepicker,
  },
  data() {
    return {
      selectedOptionsPlan: [],
      planPagos: [],
  dismissSecs: 5,
        dismissCountDown: 0,
      optionPayment: 0,
      optionsPayment: [
        { text: "Efectivo", value: "0" },
        { text: "Nota crédito", value: "1" },
      ],

      trackBy: "cppId",
      picker: new Date().toISOString().substr(0, 10),
      
      nowDate: moment().format("YYYY-MM-DD"),
      hasErrors: false,
      errors: null,
      infocobranza: [],
      isSaving: false,
      isEditMode: false,
      cuentasbancarias: [],

      isCreateMode: false,

      isLoading: false,
      infodevoluciones:[],
      monto:0,
      error:false,
      errormonto:false,
      confirmacion:"",
      optionsPlan:[],
      cobranza: {
        devId: null,
        cofId:  this.$route.query.f,
        cbaId: "",
        ccoFecha: new Date(),
        ccoMonto: 0,
        ccoGastos: 0,
        ccoNotas: null,
        ccoUsuario: this.$root.$loggedUserId,
        planPago: null,
      
      },
      notaCredito: {
        tipo: 1,
        id: this.currentConfirmacion,
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
    };
  },
  computed: {
    ...mapGetters("cobranzas", ["getCobranzas",'getDev']),
    ...mapGetters("fileManager", ["getSelectedFile"]),
    currentConfirmacion() {
      const { f } = this.$route.query; // f: file id capturamos el valor de la confirmacion desde la url
      return parseInt(f);
    },
    isFormMode() {
      return this.isCreateMode || this.isEditMode;
    },
        changeoption() {

     if(this.optionPayment==1)
     this.cobranza.cbaId=null;
     this.cobranza.ccoMonto=0
     
     if(this.optionPayment==0)
     this.cobranza.devId=null;
     this.cobranza.ccoMonto=0
     
    },
        validateMontoCreditNote() {
if(this.cobranza.ccoMonto>this.monto && this.optionPayment ==1){
  return false; 

} else return true;
     
    },
            validatePlanPagos() {

/* console.log(this.cobranza.planPago); */

if(this.cobranza.planPago){
return false;
} else return true;
 
     
    },
        
   

  },

  watch: {
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
      this.confirmacion=newFile;
      
    },
    

    getSelectedFile(newFile, oldFile) {
      // Proveniente de store, desde filtros, sirve para mmostrar pero no tiene relacion con la accion

      //  console.log("CONFIRMATION CHANGE STORE ", newFile, oldFile)
      this.initInfoCobranzas();
      
    },
  },

  async created() {
    this.getDevolucion();

    this.initInfoCobranzas();
  },

  methods: {
        
      
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
        showAlert() {
        this.dismissCountDown = this.dismissSecs
      },
    capturemonto(monto){
     /*  console.log('cambio'); */
this.cobranza.ccoMonto=monto;
this.monto=monto;
this.cobranza.cbaId=null;
    },
    cambiarNotacredito(){
this.cobranza.devId=null;
    },
    closeAction() {
      this.isEditMode = false;
      this.isCreateMode = false;
      this.tab
      this.clean();
    },

    ...mapActions("cobranzas", [
      "createCobranza",
      "updateCobranza",
      "deleteCobranza",
      "loadCobranzas",
      "getDevoluciones"
    ]),

    ...mapActions("fileManager", ["loadFileSummary"]),

 
    async gotoedit(info) {
      this.isEditMode = true;
      this.infocobranza = info;
      this.cobranza.ccoId = info.ccoId;

      this.cobranza.ccoFecha = info.ccoFecha;
      this.cobranza.ccoMonto = info.ccoMonto;
      this.cobranza.ccoNotas = info.ccoNotas;
      this.cobranza.ccoGastos = info.ccoGastos;
      this.cobranza.cbaId = info.cbaId;
       // this.planPagos[0].value = 18

    this.initInfoCobranzas()
    this.selectedOptionsPlan = info.planPago.map(a => a.cppId);

    this.cobranza.devId = info.devId
       
    },
    clean() {
      this.isEditMode = false;
      this.cobranza.ccoId = "";
      this.cobranza.ccoFecha = new Date();
      this.cobranza.ccoMonto = 0;
      this.cobranza.ccoNotas = "";
      this.cobranza.ccoGastos = 0;
/*       this.cobranza.cbaId = "";
      this.cobranza.devId=""; */
    },
    onlyNumber($event) {
      //console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
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
         this.loadFileSummary(this.currentConfirmacion)

      } catch (e) {
        this.hasErrors = true;
        this.errors = e;
       // console.log(e);
         this.error=true;
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
                    this.loadFileSummary(this.currentConfirmacion)

      } catch (e) {
        this.hasErrors = true;
        this.errors = e;
        this.error=true;
        console.log('mama error')
         
      }

      this.isSaving = false;
      if (!this.hasErrors) {
        /*        console.log("todo ok"); */
      }
    },

    async initInfoCobranzas() {
      this.isLoading = true;
      const confirmacion = this.currentConfirmacion;
      await this.loadCobranzas(confirmacion);

      // referencias plan, bancos
      const cuentas = await CobranzasServices.getCuentasBancarias();
      this.cuentasbancarias = cuentas.data;

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
         this.loadFileSummary(this.currentConfirmacion)

      } catch (e) {
        console.log("catch error ", e);
      }
    },
  },
};
</script>

