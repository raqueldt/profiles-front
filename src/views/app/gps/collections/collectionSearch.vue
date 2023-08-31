<template>
<div>

  <b-row>
    <b-colxx xxs="12">
      <div class="d-flex justify-content-between">
        <div>
          <h1><span class="text-muted">Search results:</span> {{ stringSearch }}</h1>
        </div>
        <div>
              <!--div class="search-sm d-inline-block">
                <b-input
                  placeholder="File search"
                  v-model="keyword"
                  autocomplete="off"
                  maxlength="15"
                  @keyup.enter="handleSearch"
                />
              </div-->

        </div>

      </div>

      <div class="separator mb-5"></div>

    </b-colxx>
  </b-row>



  <b-row>

    <b-colxx xxs="12">
        <b-card class="mb-4" >

          <template v-if="isLoading">

              <b-skeleton animation="wave" width="85%"></b-skeleton>
              <b-skeleton animation="wave" width="55%"></b-skeleton>
              <b-skeleton animation="wave" width="70%"></b-skeleton>
              <br>
              <b-skeleton animation="fade" width="85%"></b-skeleton>
              <b-skeleton animation="fade" width="55%"></b-skeleton>
              <b-skeleton animation="fade" width="70%"></b-skeleton>

          </template>


          <template v-else>

            <template v-if="!hasResults">
               <no-results/>
            </template>

            <template v-else>

              <b-tabs card>

                <b-tab v-if="hasBookings"  active>
                  <template #title>
                    Confirmations<b-badge variant="light" class="ml-2">{{ results.bookings.length }}</b-badge>
                  </template>
                  <b-card-text>
                      <!-- filter content -->
                      <b-row class="mb-3">
                          <b-col lg="4">
                              <b-input-group size="sm">
                                <b-form-input
                                  id="filter-input"
                                  v-model="filter"
                                  type="search"
                                  placeholder="Type to Search"
                                ></b-form-input>
                              </b-input-group>
                          </b-col>
                      </b-row>
                      <!-- data table -->
                      <b-table
                        :items="results.bookings"
                        :fields="fields"
                        :filter="filter"
                        small
                      >
                        <template #cell(cofCodigo)="row">

                            <!-- <router-link
                              :to="{name:'confirmations', params:{cofId: row.item.cofId}}"
                              target="_blank"
                              v-if="row.item.cofEstado"
                            >
                                <span class="text-primary">
                                    <strong>{{ row.item.cofCodigo }}</strong>
                                </span>
                            </router-link>
                            <span v-else class="text-muted">
                                <strong>{{ row.item.cofCodigo }}XX</strong>
                            </span> -->

                            <!-- HABILITACION PARA VISUALIZACION DE FILES CANCELADOS -->
                            <router-link
                              :to="{name:'confirmations', params:{cofId: row.item.cofId}}"
                              target="_blank"
                            >
                                <span class="text-primary">
                                    <strong>{{ row.item.cofCodigo }}</strong>
                                </span>
                            </router-link>
                            <!--  FIN HABILITACION PARA VISUALIZACION DE FILES CANCELADOS -->

                        </template>

                        <template #cell(status)="row">
                            <span :class="resolveStatusColor(row.item.cofEstado)">{{ nameStatusConfirmation(row.item.cofEstado) }}</span>
                        </template>

                        <template #cell(vendedor)="row">
                            <span>{{ row.item.vendedorLastname }}, {{ row.item.vendedorName }}</span>
                        </template>

                        <template #cell(history)="row">
                
                <!--      <span><button v-b-modal.historyquote @click="historyQuote(row.item.cotId)" class="btn"><i class="fa fa-book"></i></button> </span> 
                 -->
                     <b-button v-b-modal.historyconfirmation variant="primary" v-if="Boolean(row.item.cofCodigo)" size="sm" @click="historyConfirmation(row.item.cofId)">
                      <!--  <i class="fa fa-book"></i> --> Details
   </b-button>

                   </template>
                      </b-table>
                  </b-card-text>
                </b-tab>


                <b-tab v-if="hasCotizaciones"  active>
                  <template #title>
                    Quotes<b-badge variant="light" class="ml-2">{{ results.cotizaciones.length }}</b-badge>
                  </template>
                  <b-card-text>
                      <!-- filter content -->
                      <b-row class="mb-3">
                          <b-col lg="4">
                              <b-input-group size="sm">
                                <b-form-input
                                  id="filter-input"
                                  v-model="filterCot"
                                  type="search"
                                  placeholder="Type to Search"
                                ></b-form-input>
                              </b-input-group>
                          </b-col>
                      </b-row>
                      <!-- data table -->
                      <b-table
                        :items="results.cotizaciones"
                        :fields="fieldsCot"
                        :filter="filterCot"
                        small
                      >
                        <template #cell(cotCodigo)="row">
                            <router-link
                              :to="{name:'quote', params:{gctId: row.item.gctId}}"
                              target="_blank"
                              v-if="row.item.cotEstado == 1 || row.item.cotEstado == 2  "
                            >
                                <span class="text-primary">
                                    <strong>{{ row.item.cotCodigo }}</strong>
                                </span>
                            </router-link>
                            <span v-else class="text-muted">
                                <strong>{{ row.item.cotCodigo }}</strong>
                            </span>
                        </template>
                        <template #cell(status)="row">
                            
                          <span  :style="{'color': row.item.colorEstado }" >{{ nameStatusQuote(row.item.cotEstado) }}</span>
     

                        </template>
                        <template #cell(vendedor)="row">
                            <span>{{ row.item.vendedorName }}</span>
                        </template>
                        <template #cell(cotFecha)="row">
                            <span>{{ moment(row.item.cotFecha, 'YYYY-MM-DD').format('YYYY-MM-DD') }}</span>
                        </template>
                        <template #cell(history)="row">
                
                     <!--      <span><button v-b-modal.historyquote @click="historyQuote(row.item.cotId)" class="btn"><i class="fa fa-book"></i></button> </span> 
                      -->
                          <b-button v-b-modal.historyquote variant="primary" v-if="!Boolean(row.item.cofCodigo)" size="sm" @click="historyQuote(row.item.cotId)">
                           <!--  <i class="fa fa-book"></i> --> Details
        </b-button>

                        </template>
                      </b-table>
                  </b-card-text>
                </b-tab>

                <b-modal  id="historyquote" size="lg" :title="'History Quote'"
          hide-footer>
          <detail-history-quote :history="history_quote"></detail-history-quote>
        </b-modal>
        <b-modal  id="historyconfirmation" size="lg" :title="'History Confirmation'"
          hide-footer>
          <detail-history-confirmation :confirmation="history_confirmation"></detail-history-confirmation>
        </b-modal>


                <b-tab v-if="hasPassengers">
                  <template #title>
                    Passengers<b-badge variant="light" class="ml-2">{{ results.passengers.length }}</b-badge>
                  </template>
                  <b-card-text>
                      <!-- filter content -->
                      <b-row class="mb-3">
                          <b-col lg="4">
                              <b-input-group size="sm">
                                <b-form-input
                                  id="filter-input"
                                  v-model="filterPax"
                                  type="search"
                                  placeholder="Type to Search"
                                ></b-form-input>
                              </b-input-group>
                          </b-col>
                      </b-row>
                      <!-- data table -->
                      <b-table
                        :items="results.passengers"
                        :fields="fieldsPax"
                        :filter="filterPax"
                        small
                      >

                        <template #cell(passenger)="row">
                            <span><strong>{{ row.item.lpaApellido }}</strong>, {{ row.item.lpaNombre }}</span>
                        </template>

                        <template #cell(cofCodigo)="row">
                            <router-link
                              :to="{name:'confirmations', params:{cofId: row.item.cofId}}"
                              target="_blank"
                            >
                                <span class="text-primary">
                                    <strong>{{ row.item.cofCodigo }}</strong>
                                </span>
                            </router-link>
                        </template>
                   
                      </b-table>
                  </b-card-text>

                </b-tab>


              </b-tabs>


            </template>

          </template>


        </b-card>
    </b-colxx>

    <!--b-colxx xxs="12" class="mt-3 ">
      <b-pagination-nav class="justify-content-center pagination" :number-of-pages="totalPage" :link-gen="linkGen" v-model="currentPage" :per-page="5" align="center">
          <template v-slot:next-text>
              <i class="simple-icon-arrow-right" />
          </template>
          <template v-slot:prev-text>
              <i class="simple-icon-arrow-left" />
          </template>
          <template v-slot:first-text>
              <i class="simple-icon-control-start" />
          </template>
          <template v-slot:last-text>
              <i class="simple-icon-control-end" />
          </template>
      </b-pagination-nav>
    </!--b-colxx-->

  </b-row>
  </div>
</template>


<script>


import NoResults from '@/views/app/gps/components/NoResults.vue'

import ConfirmacionServices from '@/services/gps/confirmacion/ConfirmacionServices'
import ListaPasajerosServices from '@/services/gps/lista-pasajeros/ListaPasajerosServices'
import CotizacionesServices from '@/services/gps/cotizaciones/CotizacionesServices'
import DashboardServices from '@/services/gps/dashboard/DashboardServices'


import { resolveStatusConfirmation } from '@/utils/common.js'
import { resolveStatusQuote } from '@/utils/common.js'


export default {

  components: {
      NoResults
  },

  data () {
    return {

      isLoading: false,
      keyword: this.stringSearch,
      history_confirmation:[],
      results: {
        bookings: [],
        cotizaciones:[],
        passengers: []
      },
      fields: [
        { key: 'cofCodigo', label: 'File', sortable: true},
        { key: 'status', label: 'Status', sortable: true},
        { key: 'cotCodigo', label: 'Quote', sortable: true},
         
        { key: 'cofReferencia', label: 'Reference', sortable: true},
        { key: 'cofFechaVenta', label: 'Confirmed at', sortable: true},
        { key: 'cofInicio', label: 'Start date', sortable: true},
        { key: 'cofFinal', label: 'End date', sortable: true},
        { key: 'cliente', label: 'Client', sortable: true},
        { key: 'vendedor', label: 'Confirmed by', sortable: true},
        { key: 'history', label: 'History', sortable: false}
      ],
      filter: null,

      fieldsCot: [
        { key: 'cotCodigo', label: 'Quote', sortable: true},
        { key: 'status', label: 'Status', sortable: true},
        { key: 'cotReferencia', label: 'Reference', sortable: true},
        { key: 'cotFecha', label: 'Hold at', sortable: true},
        { key: 'cotDesde', label: 'Start date', sortable: true},
        { key: 'cotHasta', label: 'End date', sortable: true},
        { key: 'cliente', label: 'Client', sortable: true},
        { key: 'vendedor', label: 'Hold by', sortable: true},
        { key: 'history', label: 'History', sortable: false}
    
      ],
      filterCot: null,

      fieldsPax: [
        { key: 'passenger', label: 'Passenger', sortable: true },
        { key: 'cofCodigo', label: 'File', sortable: true },
        { key: 'cofFechaVenta', label: 'Confirmed at', sortable: true},
        { key: 'cofInicio', label: 'Start date', sortable: true},
        { key: 'cofFinal', label: 'End date', sortable: true},
      ],
      filterPax: null,
      history_quote:[],
      currentPage: 1,
      totalPage: 4,

    }
  },

  computed:{

      stringSearch() {

          const { q } = this.$route.query

          return q

      },

      hasBookings() {
         return this.results.bookings && this.results.bookings.length > 0
      },

      hasCotizaciones() {
         return this.results.cotizaciones && this.results.cotizaciones.length > 0
      },

      hasPassengers(){

        return this.results.passengers && this.results.passengers.length > 0

      },

      hasResults(){

          return this.hasBookings || this.hasCotizaciones || this.hasPassengers

      },

  },

  watch: {

    stringSearch(newString){

      this.keyword = newString
      this.handleSearch()

    }

  },

  methods: {


    handleSearch(){

        if ( this.keyword?.length <= 2 ) return

        this.$router.replace({query: { q: this.keyword }})

        this.search()




    },

    async search(){

        this.isLoading = true

        const params = {
          q : this.stringSearch
        }

        // buscar bookings
        const { data: bookings } = await ConfirmacionServices.search( params )

        this.results.bookings = bookings

        // buscar cotizaciones
        const { data: cotizaciones } = await CotizacionesServices.search( params )

        this.results.cotizaciones = cotizaciones


        // buscar passengers
        const { data: passengers } = await ListaPasajerosServices.search( params )

        this.results.passengers = passengers

        this.isLoading = false

    },

    // confirmaciones nombre estado
    nameStatusConfirmation( status ){

      return resolveStatusConfirmation(status)

    },

       // cotizaciones nombre estado
       nameStatusQuote( status ){

return resolveStatusQuote(status)

},
    // color de texto status
    resolveStatusColor( status ){

      if ( status == 0 ) return 'text-danger'
      return 'text-success'

    },

    historyQuote(cotId) {
      CotizacionesServices.historyQuote(cotId)
          .then((response) => {
            this.history_quote = response.data.data;
            //    location.reload();
          })
          .catch((error) => {
            console.log("Error: " + error);
          })
          .finally(() => (this.showAnimation = true));
      },

      historyConfirmation(cofId) {
        DashboardServices.getHistoryConfirmation(cofId)
          .then((response) => {
            this.history_confirmation = response.data.data;
            //    location.reload();
          })
          .catch((error) => {
            console.log("Error: " + error);
          })
          .finally(() => (this.showAnimation = true));
      },


        // color de texto status quotes
        resolveStatusColorQuote( status ){

if ( status == 0 ) return 'text-danger'
if ( status == 2 ) return 'text-success'
if ( status == 1 ) return 'text-warning'
if ( status == 3 ) return 'text-muted'


},





  },


  mounted(){


  },

  async created(){

    await this.search()





  }
}
</script>
