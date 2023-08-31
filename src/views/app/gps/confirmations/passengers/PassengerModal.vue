<template>

    <b-modal      

      id="passenger-create-modal"
      ref="passenger-create-modal"
      :title="$t('gps.pax.passenger')"
      modal-class="passenger-form"
      size="lg" 
      button-size="sm"
      hide-header
    >
    <b-form v-if="pasajero">
          <h6 class="small text-muted mb-3">Main data</h6>
          <b-row>
            <b-colxx class="">
              <!--name-->
              <b-form-group class="mb-0">
                <label class="form-group has-float-label mb-0">
                  <b-form-input 
                    type="text" 
                    size="sm" 
                    maxlength="30"
                    v-model="pasajero.lpaNombre"
                  />
                  <span>{{$t('gps.pax.name')}}</span>
                </label>
              </b-form-group>
            </b-colxx>
            <b-colxx class="pl-0">
              <!--last name-->  
              <b-form-group class="mb-0">
                <label class="form-group has-float-label mb-0">
                  <b-form-input 
                    type="text" 
                    size="sm"
                    maxlength="30"
                    v-model="pasajero.lpaApellido"
                  />
                <span>{{$t('gps.pax.last-name')}}</span>
                </label>
              </b-form-group>
            </b-colxx>
            <b-colxx md="2" class="pl-0">
              <!--group-->
              <b-form-group class="mb-1">
                <label class="form-group has-float-label mb-1">
                <v-select 
                  :options="grupos"
                  @input="setGroupDefault" 
                  v-model="pasajero.lpaGrupo" 
                />
                <span>{{$t('gps.pax.group')}}</span>
                </label>
              </b-form-group>
            </b-colxx>
          </b-row>
          <b-row>
            <b-colxx>
              <!--dob-->  
                    <b-form-group class="mt-2 mb-0" :label="$t('gps.pax.dob')">          
                        <!--date-picker 
                          format="YYYY-MM-DD"
                          placeholder="YYYY-MM-DD"
                          type="date"
                          v-model="pasajero.lpaDob"
                        /-->                        
                        <v-date-picker v-model="pasajero.lpaDob" mode="date" is24hr>
                          <template v-slot="{ inputValue, togglePopover }">
                            <input
                              class="form-control"
                              :value="inputValue"
                              @click="togglePopover()"
                            />
                          </template>
                        </v-date-picker>
                    </b-form-group>
            </b-colxx>
            <b-colxx md="7" class="pl-0">
              <!--email-->
              <b-form-group class="mt-2 mb-0">
                <label class="form-group has-float-label mb-2">
                <b-form-input 
                  maxlength="100"
                  v-model="pasajero.lpaCorreo"
                />
                <span>{{$t('gps.pax.email')}}</span>
                </label>
              </b-form-group>
            </b-colxx>
          </b-row>
          <hr>
          <h6 class="small text-muted mb-3">Secondary data</h6>
          <b-row>
            <b-colxx class="pr-0">
              <!--title-->
              <b-form-group class="mt-2 mb-0">
                <label class="form-group has-float-label">
                  <b-form-input 
                    type="text" 
                    size="sm" 
                    maxlength="30"
                    v-model="pasajero.lpaTrato"
                  />
                  <span>{{$t('gps.pax.title')}}</span>
                </label>                    
              </b-form-group> 
            </b-colxx>
            <b-colxx class="pr-0">
              <!--gender-->
              <b-form-group class="mt-2 mb-0">
                <label class="form-group has-float-label mb-1">
                <v-select 
                  :options="generos" 
                  :reduce="genero => genero.metCodigo"
                  label="metName"
                  v-model="pasajero.lpaGenero" />
                  <span>{{$t('gps.pax.gender')}}</span>
                </label>
              </b-form-group>    
            </b-colxx>
            <b-colxx>
              <!--country-->
              <b-form-group class="mt-2 mb-0">
                <label class="form-group has-float-label">
                <v-select 
                  :options="paises" 
                  :reduce="pais => pais.paiId"
                  label="paiNombre" 
                  v-model="pasajero.paiId" 
                />
                <span>{{$t('gps.pax.country')}}</span>
                </label>
              </b-form-group>
            </b-colxx>
          </b-row>
          <b-row>
            <b-colxx class="pr-0">
              <!--passport-->
              <b-form-group class="mb-2">
                <label class="form-group has-float-label mb-0">
                <b-form-input 
                  maxlength="100"
                  v-model="pasajero.lpaNumeroPasaporte"
                />
                <span>{{$t('gps.pax.passport')}}</span>
                </label>
              </b-form-group>
            </b-colxx>
            <b-colxx class="pr-0">
              <!--expedition-->  
              <b-form-group class="mb-2" :label="$t('gps.pax.passport-expedition')">
                <!--date-picker 
                  placeholder="YYYY-MM-DD"
                  v-model="pasajero.lpaFechaExpedicion"
                /-->
                
                <v-date-picker v-model="pasajero.lpaFechaExpedicion" mode="date" is24hr>
                  <template v-slot="{ inputValue, togglePopover }">
                    <input
                      class="form-control"
                      
                      :value="inputValue"
                      @click="togglePopover()"
                    />
                  </template>
                </v-date-picker> 
                
              </b-form-group>
            </b-colxx>
            <b-colxx>
              <!--expiration-->  
              <b-form-group class="mb-2" :label="$t('gps.pax.passport-expiration')">
                <!--date-picker 
                  placeholder="YYYY-MM-DD"
                  v-model="pasajero.lpaFechaVencimiento"
                /-->                    
                <v-date-picker v-model="pasajero.lpaFechaVencimiento" mode="date" is24hr>
                  <template v-slot="{ inputValue, togglePopover }">
                    <input
                      class="form-control"
                     
                      :value="inputValue"
                      @click="togglePopover()"
                    />
                  </template>
                </v-date-picker>
              </b-form-group>
            </b-colxx>
          </b-row>
          <hr>
          <h6 class="small text-muted mb-4">Notes Passengers</h6>
          <b-row>
            <b-colxx class="pr-0">
              <!--note-->
              <b-form-group class="mb-0">
                <label class="form-group has-float-label">
                <b-textarea v-model="pasajero.lpaNotas" :rows="2" :max-rows="2" />
                <span>{{$t('gps.pax.note')}}</span>
                </label>
              </b-form-group>
            </b-colxx>
            <b-colxx class="pr-0">
              <!--note salud-->
              <b-form-group class="mb-0">
                <label class="form-group has-float-label">
                      <b-textarea v-model="pasajero.lpaNotasSalud" :rows="2" :max-rows="2" />
                <span>{{$t('gps.pax.health-note')}}</span>
                </label>
              </b-form-group>
            </b-colxx>
            <b-colxx>
              <!--note interna-->
              <b-form-group class="mb-0">
                <label class="form-group has-float-label">
                      <b-textarea v-model="pasajero.lpaNotasInterno" :rows="2" :max-rows="2" />
                <span>{{$t('gps.pax.internal-note')}}</span>
                </label>
              </b-form-group>
            </b-colxx>          
          </b-row>

        </b-form>
        <b-alert 
          v-if="hasErrors"
          show 
          variant="danger"
        >
          {{  errors }}
        </b-alert>          

        <template slot="modal-footer">
          <b-button variant="outline-secondary" @click="cancel">{{ $t('gps.close') }}</b-button>
          <b-button variant="primary" class="mr-1" @click="crearPasajero">{{ $t('gps.pax.create-button') }}</b-button>
        </template>

        

    </b-modal>


</template>

<script>

import Datepicker from "vuejs-datepicker";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import PaisesServices from "@/services/gps/paises/PaisesServices"
import MetadataServices from "@/services/gps/metadata/MetadataServices"
import meta from "@/services/gps/metadata/MetadataConfig"

import { mapActions } from 'vuex'


export default {
  
  components: {
    "v-select": vSelect,
    datepicker: Datepicker,    
  },


 props: {
 	
 	cofId: {

 		type: Number,
 		required: true,
 		default: 0

 	}


 },

  data() {
    return {

      hasErrors: false,
      errors: null,

      isSaving: false,


      pasajero: {
        
        lpaId: null,
        paiId: null,
        cofId: this.cofId,
        bosId: null,
        lpaNombre: null,
        lpaApellido: null,
        lpaTrato: null,
        lpaDob: null,
        lpaGenero: null,
        lpaNumeroPasaporte: null,
        lpaNotas: null,    
        lpaNotasInterno: null,    
        lpaNotasSalud: null,     
        lpaGrupo: "A",
        lpaEstado: 1,
        user: this.$root.$loggedUserId

      },  


      paises: [],
      grupos: [],
      generos: []



    }
  },

  methods: {

      ...mapActions('pasajeros', ['createPassenger']),


      async crearPasajero() {

         this.hasErrors = false
         this.isSaving = true
         
         try {

            await this.createPassenger( this.pasajero )

            
         } catch (e) {

            this.hasErrors = true
            this.errors = e
         }

         this.isSaving = false

         if ( !this.hasErrors ) { 
            this.resetForm()
            this.$refs['passenger-create-modal'].hide()     
         } 

      },
      
      setGroupDefault(value) {

           if ( value == null ) this.pasajero.lpaGrupo = 'A'

      },      

      cancel() {

          this.resetForm()

          this.$refs['passenger-create-modal'].hide()         

      },


      resetForm () {
        
        Object.keys(this.pasajero).forEach( key => this.pasajero[key] = null)

        this.pasajero.cofId = this.cofId
        this.pasajero.lpaGrupo = "A"
        this.pasajero.lpaEstado = 1

        this.hasErrors = false
        this.errors = null

        
      }


  },

  async created() {

    const paises = await  PaisesServices.getPaises()
    this.paises = paises.data.data 

    const grupos = await  MetadataServices.getByGroup(meta.metaGrupoPax)
    this.grupos = Object.values(grupos.data.data)
          
    const generos = await MetadataServices.getMetadataByGroup(meta.metaGeneros)
    this.generos = generos.data.data


  },

  mounted() {
    
  }

}




</script>
