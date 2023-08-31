<template>

  <div class="card">
    <template class="mt-1" >
      <availability-send-options 
        :selected="selectedDeparturesFromChild.map(x => x.depId)"
        @cleanSelectedDepartures = cleanSelectedDepartures>
      </availability-send-options>
    </template>
    
<!-- {{selectedDeparturesFromChild.map(x => x.depId)}} -->
        <!-- Cabeceras de la tabla de disponibilidad -->
        <b-container fluid  class="head-departures b-border-bottom pt-1 mt-0">
                
            <b-row class="mb-1" >
              <b-colxx md="1">
                {{$t('gps.head-yacht')}}
              </b-colxx>
              <b-colxx md="1">
                {{$t('gps.head-departures')}}
              </b-colxx>
              <b-colxx md="1" class="text-left">
                 {{$t('gps.head-itinerary')}}
              </b-colxx>                
              <b-colxx  md="1" class="text-left">
                <span class="estilo_cabecera">{{$t('gps.head-status')}}</span>
              </b-colxx>
              <b-colxx  md="1" class="text-left">
                  <span class="estilo_cabecera">{{$t('gps.head-prices')}}</span>
              </b-colxx>                 
              <b-colxx  md="7">
                {{$t('gps.head-distribution')}}
              </b-colxx>
            </b-row>
          
        </b-container>

      <div class="card-body pt-0 pb-3 mt-1" v-if="departures.length>0" >

    <!-- MODAL Y BOTÓN PARA MOSTRAR OPCIONES DE DEPARTURES SELECCIONADOS -->

      <b-modal id="modalsendoptions" size="lg" ref="modalsendoptions" :title="'Send options'">
        <ModalonAvailability :selectedDepartures="selectedDeparturesFromChild" ></ModalonAvailability>
         <template slot="modal-footer">
          <b-button
            variant="secondary"
            @click="hideModal('modalsendoptions')"
          >{{ $t('gps.close') }}</b-button>
        </template>
      </b-modal>

      <b-row class="my-2">
        <b-button v-if="selectedDeparturesFromChild.length" v-b-modal.modalsendoptions 
          squared 
          variant="primary" size="sm"
          v-tooltip="{content: 'Click here to display prices information for selected boat(s)', 
          placement: 'top', classes: ['itineraries'],}">
          <span class="badge send-op badge-primary">{{ selectedDeparturesFromChild.length }}</span>
          {{ $t("gps.send-option") }}
        </b-button>
        <b-button v-if="selectedDeparturesFromChild.length" v-b-modal.modalsendoptions 
          squared 
          variant="outlined-primary" size="sm"
          class="ml-1 text-primary"
          @click="cleanSelectedDepartures()"
          v-tooltip="{content: 'Clean selected departures', 
          placement: 'top', classes: ['itineraries'],}">
         <i class="glyph-icon simple-icon-refresh"></i>
        </b-button>          
      </b-row>

    <!-- MODAL Y BOTÓN PARA MOSTRAR OPCIONES DE DEPARTURES SELECCIONADOS -->          
        
        <!-- lista de salidas  -->  
        <!-- class="content-depatures text-center b-border-bottom no-gutter"  -->
        <b-row 
            class="content-depatures text-center b-border-bottom border-danger justify-content-start" 
            align-v="center" v-for="(departure, index) in departures" :key="index" >

            <!-- Para pintar toda la fila en caso de ser seleccionada -->
            <div  class="row w-100 pl-3 b-border-top"
            :class="selectedDeparturesFromChild.map(x => x.depId).some(f => f === departure.depId) ? 'selected-row' : ''">

                              <!-- información de la salida  -->
                              <b-col xs="1" class="pl-0 disti" >
                                <template v-if="Object.keys(departure.cabins).length==0">
                                    <b-icon :id="`departure-${departure.depId}`"
                                        icon="exclamation-circle-fill" 
                                        variant="danger" title="Departure has errors">
                                    </b-icon>
                                </template>
                              </b-col>

                              <!-- detalles de la salida  -->
                              <b-col xl="2" lg="2" md="6" sm="12" class="p-0">
                                  <departures-info 
                                      :departure="departure" 
                                      :selected="selectedDeparturesFromChild.map(x => x.depId)" 
                                      @selectedDepartures="selectedDepartures"> 
                                  </departures-info>
                              </b-col>                

                              <template v-if="isDepartureReady(departure)">                  
                                  <!-- precios de la salida  -->
                                  <b-col align-self="center"  xl="2" lg="2" md="6" sm="12" class="px-0 responsive-prices"> 
                                      <departures-prices 
                                        :departure="departure">
                                      </departures-prices>
                                  </b-col>

                                  <!-- slots de la salida -->  
                                  <b-col xl="7" lg="7" md="12" sm="12"
                                    align-self="center" 
                                    class=" ml-5 pt-1 pb-1">
                                    <departures-slots :departure="departure" @reload = reload></departures-slots>                      
                                    
                                      <!-- // Componente para cambios de estado con barcos que no pertenecen a ATC// -->
                                    <!-- <departures-block-slots :slots="departure" @reload = reload></departures-block-slots> -->

                                  </b-col>                  
                              </template>

                              <template v-else>

                                <b-col md="8" align-self="center" class="py-2">                                        
                                      <!-- dry dock -->
                                      <template v-if="departure.depStatus == 2">
                                          <span class="text-muted">
                                            <small>
                                              <b-icon icon="tools"/>
                                              {{$t('gps.availability-view.dry-dock-departure')}}
                                              <b-icon icon="tools"/>
                                              </small>
                                          </span>
                                      </template>

                                      <!-- not available -->
                                      <template v-else>
                                          <span class="text-muted">
                                            <small>
                                              <b-icon icon="calendar2-x"/>
                                              {{$t('gps.availability-view.disabled-departure')}}
                                              <b-icon icon="calendar2-x"/>
                                              </small>
                                          </span>
                                      </template>                                        
                                </b-col>

                              </template>

          </div>
            <!-- Fin Para pintar toda la fila en caso de ser seleccionada -->

        </b-row>

      </div>

  </div>
</template>

<script>
export default {
  name: 'AvailabilityDepartures',
  props: ["departures"],
  data () {
      return {
        selectedDeparturesFromChild:[]
      }
  },
  computed: {

  },
  methods:{

    selectedDepartures(data){     
      var index = this.selectedDeparturesFromChild.findIndex(function(element) { return element.depId === data.depId });
        if (index > -1) {
            this.selectedDeparturesFromChild.splice(index, 1);
        } else {
            this.selectedDeparturesFromChild.push(data);
        }

        //OPCION 2:
        // var depId = data.depId;
        // var index = this.selectedDeparturesFromChild.findIndex(function(element) { return element.depId === data.depId });
        // var checkDepIdInArray = this.selectedDeparturesFromChild.some(e => e.depId === depId);
        // if(Boolean(checkDepIdInArray)) this.selectedDeparturesFromChild.splice(index, 1);
        // else this.selectedDeparturesFromChild.push(data);

        //return this.selectedDeparturesFromChild.includes(data.depId)
    },
    cleanSelectedDepartures(){
      this.selectedDeparturesFromChild=[];
    },

    reload(){
      this.$emit('reload');
    },

    isDepartureReady (departure) {

       if ( departure.depStatus != '1')  return false

       return true  
      
    },       

    departureStatus (status) {
        if ( status == '2') return 'Dry dock'
        return 'Not available'
    },
    
      hideModal(refname) {
    this.$refs[refname].hide();
  },
  }
}
</script>

<style  scoped>
.no-gutter {
  -webkit-box-shadow:inset 0px -3px 6px 0 #dddddd56;
  box-shadow: inset 0px -3px 6px 0 #dddddd56;
}
.no-gutter3 {
  -webkit-box-shadow:inset inset 0px 4px 4px 0 #dddddd56;
  box-shadow: inset 0px 4px 6px 0 #dddddd56;
}

.selected-row{
/* background-color: #F3F0F0; */
/* background-color: #E0E0E0; */
background-color: #F2F0F0;
opacity:0.9;
/* transition: transform .2s; */
transition: all .3s ease;
transform : scale(1.003);
/* border-top:solid 1px #F6F6F6;    
border-bottom:solid 1px #F6F6F6;   */
  /* border:solid 2px red; */
width: 100%;  
/* margin-right: 5px !important;
margin-left: 5px !important; */
}

.estilo_cabecera{
  margin-left:-20px !important;
}

@media only screen and (min-width: 1492px) {
.estilo_cabecera{
  margin-left:-37px !important;
}
}

@media only screen and (min-width: 1900px) {
.estilo_cabecera{
  margin-left:-57px !important;
}
}

@media only screen and (max-width: 1024px) {
.responsive-prices{
  text-align: left !important;
  padding: 0  !important;
  margin: 0  !important;
}
}
</style>