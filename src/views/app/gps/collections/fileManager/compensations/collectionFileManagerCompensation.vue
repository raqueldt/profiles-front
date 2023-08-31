<template>
  
  <div>

    <b-card>

      <template #header>


              <div class="w-100">
                  
                  <span><strong>Compensaciones</strong></span>

         <!--          {{ getSelectedFile }} -->
                  
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
              <template #cell(devMonto)="item">
                  <span>{{ item.value | currency }}</span>
              </template>
              <!-- botones de acciòn -->
              <template #cell(_actions)="row">
                <b-button 
                  class="" 
                  variant="link primary" 
                  size="xs"
                  @click="editNotaCredito(row.item.devId)"
                >
                  <i class="fas fa-edit"></i>
                </b-button>
                <b-button 
                  class="" 
                  variant="link primary" 
                  size="xs"
                  @click="handleDelete(row.item.devId)"
                  
                >
                <!-- --deleteNotaCredito(row.item.devId) -->
                  <i class="fas fa-trash-alt"></i>
                </b-button>        
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

import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'CollectionFileManagerCreditNotes', 
    components: {
      "v-select": vSelect,
      datepicker: Datepicker
    },   

    data () {
        return {

      
          isLoading: false,

          isCreateMode: false,
          isEditMode: false,

          hasErrors: false,
          errors: null,

          isSaving: false,

          picker: new Date().toISOString().substr(0, 10),
          nowDate: new Date().toISOString().slice(1,0),

          fields: [
            { key: "devFecha", label: "Fecha"},
            { key: "devReferencia", label: "Detalle"},
            { key: "devMonto", label: "Monto", tdClass: 'text-right'},
            { key: "user", label: "Usuario"},
            { key: "_actions", label: "Acciones"},
          
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
/*         console.log("Compensation CHANGE URL ", newFile, oldFile) */
        this.loadData()
      },

      getSelectedFile ( newFile, oldFile) {

      /*   console.log("Compensation CHANGE STORE ", newFile, oldFile) */
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
          tipo: 2
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
           
          const confirmed = await this.$bvModal.msgBoxConfirm("Permanently delete compensation? You can't undo this.", 
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
        this.creditNote.devTipo = 2
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
