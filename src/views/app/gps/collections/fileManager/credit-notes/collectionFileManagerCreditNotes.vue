<template>
  
  <div>

    <b-card>

      <template #header>


              <div class="w-100">
                  
                  <span><strong>Notas de crédito</strong></span>
              <!--     {{detaildevoluciones}} -->
                  <template v-if="getSelectedFile">
                      <b-button 
                        squared 
                        variant="primary" 
                        size="sm"
                        @click="handleCreate"
                        class="float-right"
                        v-if="!isFormMode"
                      >
                        Crear
                      </b-button>
                  </template>

              </div>


      </template>
<b-modal ref="my-modal" hide-footer title="Detalle Nota de crédito">
      <div class="d-block text-center">
  <ul v-if="detaildevoluciones.length>0" class="fa-ul">
<!-- 
{{detaildevoluciones}} -->

    <li v-for="item in detaildevoluciones" class="text-left" ><span class="fa-li"><b-icon stacked icon="check"></b-icon></span>
    {{item.devReferencia}} fue aplicada al File {{item.cofCodigo}} por un valor de $ {{item.ccoMonto}} el día {{item.ccoFecha}}
    </li>
    

  </ul>

  <ul v-else class="fa-ul">
<!-- 
{{detaildevoluciones}} -->

    <li><span class="fa-li">
    

    </span>    Esta Nota de crédito no registra ser usada en ningun pago.
  
    </li>
    

  </ul>

<!--  -->


    <!--     <h5>Esta nota de crédito presenta el siguiente detalle.</h5> -->

<!-- <b-list-group>
  <b-list-group-item v-for="item in detaildevoluciones" class="d-flex justify-content-between align-items-center">
    NC {{item.ccoNotas}} aplicada al File {{item.cofCodigo}} por un valor de {{item.ccoMonto}} el día {{item.ccoFecha}}
  </b-list-group-item>


</b-list-group>
 -->
      </div>
  
    </b-modal>

      <b-colxx lg="12" class="summary records p-0 m-auto">

         <template v-if="isFormMode">            
            <form>
              <b-row class="mt-2">
                <b-colxx  class="pl-4 pr-0">
                  <b-input-group>
                    <div class="form-group has-float-label custom-selects ">
                        <v-date-picker 
                        mode="date" 
                        is24hr
                        v-model="creditNote.devFecha" 
                        :min="nowDate" 
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
                <b-colxx md="6" class="pl-1 pr-0">
                  <b-input-group>
                  <div class="form-group has-float-label custom-selects ">
                      <b-form-input
                        type="text"
                        class="text-class-form amount"
                        v-model="creditNote.devReferencia"
                        maxlength="30"
                      ></b-form-input>
                      <span>Detalle</span>
                    </div>
                  </b-input-group>
                </b-colxx>
                <b-colxx md="3" class="pl-1 pr-4">
                  <b-input-group>
                  <div class="form-group has-float-label custom-selects ">
                      <b-form-input
                        type="number"
                        min="0"
                        class="text-class-form fess"
                        v-model="creditNote.devMonto"
                      ></b-form-input>
                      <span>Monto</span>
                    </div>
                  </b-input-group>
                </b-colxx>                
              </b-row>
              <b-row>
                <b-col cols="12" class="pr-4 mt-2">

                  <div class="d-flex justify-content-end">
                    

                    <b-button 
                        squared 
                        variant="light" 
                        size="sm" 
                        @click="handleClose"
                        :disabled="isSaving"
                    >
                      Cerrar
                    </b-button>

                    <b-button 
                      squared 
                      variant="success" 
                      size="sm" 
                      @click="createNotaCredito"
                      :disabled="isSaving"
                      v-if="isCreateMode"
                    >
                      Guardar
                    </b-button>

                    <b-button 
                      squared 
                      variant="success" 
                      size="sm" 
                      @click="updateNotaCredito"
                      :disabled="isSaving"
                      v-if="isEditMode"
                    >
                      Aplicar
                    </b-button>

                  </div>



                </b-col>
              </b-row>

            </form>
         </template>
         


        <b-row class="mt-4 border-top">
          <b-table
              class="small text-center"
              striped
              hover
              fixed
              :fields="fields" 
              :items="getCreditNotes"
              :busy="isLoading"
              show-empty

          >
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>    
                  <!-- monto devolucion -->
              <template #cell(devFecha)="item">
           <i @click="showModal(item.item.devId)" class="fas fa-eye"></i>        <span>{{ item.item.devFecha }}</span>
              </template>        
              <!-- monto devolucion -->
              <template #cell(devMonto)="item">
                  <span>{{ item.value | currency }}</span>
              </template>
              <!-- botones de acciòn -->
              <template #cell(_actions)="row">

                <!-- <b-button 
                  class="mx-0" 
                  variant="link primary" 
                  size="xs"
                  @click="editNotaCredito(row.item.devId)"
                >
                  <i class="fas fa-edit"></i>
                </b-button>
                               
                <b-button 
                  class="mx-0" 
                  variant="link primary" 
                  size="xs"
                  @click="handleDelete(row.item.devId)"
                  
                >
                  <i class="fas fa-trash-alt"></i>
                </b-button> 

                <b-button 
                  class="mx-0" 
                  variant="link primary" 
                  size="xs"
                  @click="downloadNotaCredito(row.item.devId)"
                >
                  <i class="fa fa-download"></i>
                </b-button>        -->


              <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret class="text-center"
                data-toggle="tooltip" data-placement="top" title="Más opciones">
                <template #button-content>
                  <i class="glyph-icon simple-icon-options-vertical" style="color:gray"></i>
                </template>
                <b-dropdown-item href="#" @click="editNotaCredito(row.item.devId, row)">Editar
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="handleDelete(row.item.devId)">Eliminar
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="downloadNotaCredito(row.item.devId)">Descargar
                </b-dropdown-item>
              </b-dropdown>



              </template>

          </b-table>
        </b-row>
      </b-colxx>
    </b-card>

  </div>

</template>

<script>
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"
import Datepicker from "vuejs-datepicker"
import CobranzasServices from "@/services/gps/cobranzas/CobranzasServices";
import { mapActions, mapGetters } from 'vuex'
import { json } from "body-parser";
import Conf from '../../../../../../services/conf.js';
    
    const resource = '/api/cobranzas/'
    const server = Conf.servergps;

export default {
    name: 'CollectionFileManagerCreditNotes', 
    components: {
      "v-select": vSelect,
      datepicker: Datepicker
    },   

    data () {
        return {

          boxTwo: null,

          isLoading: false,

          isCreateMode: false,
          isEditMode: false,

          hasErrors: false,
          errors: null,
          detaildevoluciones:"",
          isSaving: false,

          picker: new Date().toISOString().substr(0, 10),
          nowDate: new Date().toISOString().slice(1,0),

          fields: [
            { key: "devFecha", label: "Fecha", thStyle: { width: "25%" }},
            { key: "devReferencia", label: "Detalle", tdClass: 'align-middle text-center', thClass: ' align-middle', thStyle: { width: "25%" }},
            { key: "devMonto", label: "Monto", tdClass: 'text-center', thStyle: { width: "20%" }},
            { key: "user", label: "Usuario", thStyle: { width: "16%" }},
            { key: "_actions", label: "Acciones", tdClass: 'align-middle text-center', thClass: ' align-middle', thStyle: { width: "14%" }},
          
          ],

          creditNote: {
            devId: null,
            cofId: null,
            devCliente: null,
            devReferencia: null,
            devFecha: null,
            devNota: null,
            devTipo: null,
            devMonto: null,
            devUsuario: null
          }

        }
    },

    computed :{

      ...mapGetters('cobranzasCreditNotes',['getCreditNotes', 'getCreditNote']),     

      ...mapGetters('fileManager',['getSelectedFile']),     

      currentConfirmacion () {
        const { f } = this.$route.query // f: file id
        return parseInt(f)
      },

      currentClient () {
        const { c } = this.$route.query // c: client id
        return parseInt(c)
      },

      isFormMode () {
         return this.isCreateMode || this.isEditMode
      }
      
    },

    watch: {

      currentConfirmacion (newFile, oldFile) {        
        //console.log("CREDIT NOTE CHANGE URL ", newFile, oldFile)
        this.loadData()
      },

      getSelectedFile ( newFile, oldFile) {

        //console.log("CREDIT NOTE CHANGE STORE ", newFile, oldFile)
        this.loadData()

      }


    },

    methods:{

      ...mapActions('cobranzasCreditNotes',
        [
          'loadCreditNotes', 
          'createCreditNote', 
          'updateCreditNote',
          'deleteCreditNote'
        ]),   
      
      ...mapActions('fileManager',['loadFileSummary']),

      async loadData( ) {

        this.isLoading = true

        const params = {
          confirmacion: this.currentConfirmacion,
          tipo: 1
        }
  
        await this.loadCreditNotes(params)

        this.isLoading = false        

      },


      handleCreate() {

        this.isEditMode = false
        this.isCreateMode = true

      },

      handleEdit(){

        this.isCreateMode = false
        this.isEditMode = true

      },

      async handleDelete ( id ) {
           
          const confirmed = await this.$bvModal.msgBoxConfirm("Permanently delete credit note? You can't undo this.", 
                  {
                    size: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Delete',
                    cancelTitle: 'Cancel',
                    cancelVariant: 'ligth',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true                
                  })
          
          if ( confirmed ){

             this.deleteNotaCredito( id )       

          }
          

          
      },

      handleClose () {

        this.isEditMode = false
        this.isCreateMode = false
        this.resetForm()

      },

      async createNotaCredito () {

        this.hasErrors = false
        this.isSaving = true

         //
        this.creditNote.devCliente = this.currentClient
        this.creditNote.cofId = this.currentConfirmacion
        this.creditNote.devTipo = 1
        this.creditNote.devUsuario = this.$root.$loggedUserId

         try {

            await this.createCreditNote( {...this.creditNote} )

            this.resetForm()
            this.isCreateMode = false

            this.loadFileSummary(this.currentConfirmacion)

            
         } catch (e) {

            this.hasErrors = true
            this.errors = e

            console.log("CATCH", e)
         }

         this.isSaving = false

      },

      async editNotaCredito ( id ) {

        
        const creditNote = await this.getCreditNote(id)
        
        this.creditNote = { ...creditNote, devUsuario: this.$root.$loggedUserId}

        this.handleEdit()        

      },
          detailNC(id) {
      CobranzasServices.detailNC(id)
        .then((response) => {
          this.detaildevoluciones = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
        showModal(id) {
        this.$refs['my-modal'].show();
        this.detailNC(id);
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },



      async updateNotaCredito () {

        this.hasErrors = false
        this.isSaving = true

         try {

            await this.updateCreditNote( {...this.creditNote} )

            this.resetForm()
            this.isEditMode = false

            this.loadFileSummary(this.currentConfirmacion)
            
         } catch (e) {

            this.hasErrors = true
            this.errors = e

            console.log("CATCH", e)
         }

         this.isSaving = false

      },

      async deleteNotaCredito ( id ) {

        this.hasErrors = false
        this.isSaving = true

         try {

          await this.deleteCreditNote( id )

          this.loadFileSummary(this.currentConfirmacion)
            
         } catch (e) {

            this.hasErrors = true
            this.errors = e
            console.log("CATCH", e)
         }

         this.isSaving = false      

      },

      async downloadNotaCredito(devId){
                
       let routeData = CobranzasServices.serverDownloadNotaCreditoUrl +  devId ;
       await CobranzasServices.downloadNotaCredito(devId)
       window.open(routeData);

      },

      resetForm () {
        Object.keys( this.creditNote ).forEach( key => this.creditNote[key] = null)
      },
      

    },
    
    mounted () {

    },

    async created() {

      await this.loadData()

    },


}
</script>

<style lang="scss" scoped></style>
