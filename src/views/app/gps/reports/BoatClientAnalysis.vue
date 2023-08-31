<template>

    <div>

      <in-progress-report/>

      <b-row v-if="summaryViewActive">

          <b-col>

              <b-card>

                  <b-card-title><strong>Boat Client Analysis</strong></b-card-title>


                  <b-row>

                      <b-col cols="4">

                          <b-form-group
                              label="Type report"
                          >
                          <b-form-radio-group
                              id="btn-radios-2"
                              v-model="typeReport"
                              :options="options"
                              button-variant="outline-primary"
                              name="radio-btn-outline"
                              buttons
                              @change="updateData"
                          ></b-form-radio-group>
                          </b-form-group>

                      </b-col>

                      <b-col cols="8">


                          <div class="d-flex justify-content-end">


                              <div>


        <template v-if="isModeYear">
                      <b-col >

                          <label for="input-year" style="font-weight: normal"  >Year</label>

                          <b-button
                            variant="link"
                            class="p-0"
                            @click="toogleMode"
                          >
                            Date range
                          </b-button>
                        <!--   {{dateRange}} -->

                          <br>



                          <date-picker
                              id="input-year"
                              v-model="filters.year"
                              type="year"
                              placeholder="Select year"
                              :clearable="false"
                              style="width: 100px"
                          >
                          </date-picker>


                      </b-col>
                  </template>

                  <template v-else>
                    <b-col >

                      <b-button
                        variant="link"
                        class="p-0"
                        @click="toogleMode"
                      >
                        Year
                      </b-button>

                      <label for="input-range" style="font-weight: normal"  >Date range</label>

                      <br>

                      <date-range-picker
                        id="input-range"
                        :min-date="minDateYear"
                        :max-date="maxDateYear"
                        :locale-data="locale"
                        :ranges="showRanges"
                        v-model="dateRange"
                        opens="left"
                        @update="handleRange"
                      >

                      </date-range-picker>
                    </b-col>
                  </template>


                              </div>


                              <!-- month -->
                              <div>

                                  <label for="select-month" style="font-weight: normal"  >Month</label><br>

                                  <v-select
                                      id="select-month"
                                      :options="months"
                                      :reduce="month => month.month"
                                      label="monthName"
                                      v-model="filters.month"
                                  >
                                  </v-select>

                              </div>


                              <div v-if="getCruises.length">

                                  <label for="select-country" style="font-weight: normal">Cruise</label><br>


              <v-select
                id="select-cruises"
                label="cruName"
                multiple
                :options="getCruises"
                :reduce="(cruId) => cruId.cruId"
                v-model="filters.cruises"
                clearable
              >
              </v-select>

<!-- {{filters.cruises}} -->


                              </div>



                          </div>


                      </b-col>

                  </b-row>

                  <template v-if="isLoading">

                      <b-row>
                          <b-col>
                              <b-skeleton-table
                              :rows="4"
                              :columns="6"
                              :table-props="{ bordered: true, striped: true }"
                              ></b-skeleton-table>
                          </b-col>
                      </b-row>
                  </template>

                  <template v-else>
                      <!-- data section -->
                      <b-row>

                          <b-col>

                              <template v-if="getData(filteredCountry).length == 0">

                                  <b-card
                                      class="mt-4"
                                      no-body
                                  >

                                      <b-card-body class="text-center">


                                      <b-img
                                          src="/assets/img/atc/empty-state/no_result_found.png"
                                          fluid
                                          alt="No result found"
                                          width="400"
                                      />


                                      <b-card-title><h1><strong>No results found</strong></h1></b-card-title>

                                      <b-card-text>
                                          Try adjusting you search options to find what you're looking for
                                      </b-card-text>


                                      </b-card-body>



                                  </b-card>


                              </template>

                              <template v-else>

                                  <b-table
                                    :items="getData(filteredCountry)"
                                    :fields="fields"
                                    small
                                  >

                                      <template #cell(clienteName)="row">
                                          <b-button
                                            variant="link"
                                            class="p-0"
                                            @click="showClientDetails(row.item)"
                                          >
                                              {{ row.item.clienteName}}
                                          </b-button>
                                      </template>


                                      <template #cell(usdReserva)="row">
                                          {{ row.item.usdReserva | currency }}
                                      </template>

                                      <template #cell(usdPax)="row">
                                          {{ row.item.usdPax | currency }}
                                      </template>

                                      <template #cell(venta)="row">
                                          {{ row.item.venta | currency }}
                                      </template>

                                      <template #cell(portion)="row">
                                          {{ row.item.portion | percent }}
                                      </template>

                                      <template slot="bottom-row" slot-scope="data">
                                              <td colspan="1" class="text-right" style="background: antiquewhite">
                                                  <strong>TOTAL</strong>
                                              </td>
                                              <td class="text-right" style="background: antiquewhite">
                                                  <strong>{{ totals.files }}</strong>
                                              </td>
                                              <td class="text-right" style="background: antiquewhite">
                                                  <strong>{{ totals.pax }}</strong>
                                              </td>
                                                    <td class="text-right" style="background: antiquewhite">
                                                  <strong>{{ totals.paxbooking }}</strong>
                                              </td>
                                                  <td class="text-right" style="background: antiquewhite">
                                                  <strong>{{ totals.nights }}</strong>
                                              </td>
                                                      <td class="text-right" style="background: antiquewhite">
                                                  <strong>-</strong>
                                              </td>
                                                          <td class="text-right" style="background: antiquewhite">
                                                  <strong>{{ totals.usdreser | currency }}</strong>
                                              </td>
                                                              <td class="text-right" style="background: antiquewhite">
                                                  <strong>{{ totals.usdpax | currency }}</strong>
                                              </td>

                                              <td  class="text-right" style="background: antiquewhite">
                                                  <strong>{{ totals.total | currency }}</strong>
                                              </td>
                                              <td class="text-right" style="background: antiquewhite">
                                              </td>
                                      </template>

                                  </b-table>

                              </template>



                          </b-col>

                      </b-row>
                  </template>


              </b-card>

          </b-col>

      </b-row>

      <b-row v-else>

          <b-col>

              <!--  detalles -->

                <boat-client-analysis-details
        :inicio="params.inicio"
        :fin="params.fin"
        :details="detailsData"
        :tipo="typeReport"
        :barco="filters.cruises"

        @updateinfo=loadReportData
      />

          </b-col>

      </b-row>


    </div>

</template>




<script>

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import DateRangePicker from 'vue2-daterange-picker'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";


import moment from 'moment'

import BoatClientAnalysisDetails from './BoatClientAnalysisDetails.vue'

import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { getClients } from '../../../../store/modules/gps/reports/sales-progress/getters';


export default {


    name: 'BoatClientAnalysis',

    components: {

      DatePicker,
      "v-select": vSelect,
      DateRangePicker,
      BoatClientAnalysisDetails,
      InProgressReport: () => import('@/views/app/gps/components/InProgressReport')

    },

    data() {

        return {

            isLoading: false,
   year: null,
               isModeYear: true,
            dateRange: {
              startDate: new Date(),
              endDate: new Date()
            },
              locale: {
              separator: ' - ',
              format: 'dd mmm yyyy'
            },
            params: {
              inicio: null,
              fin: null
            },

            typeReport: '1',  // 1 fecha de venta, 2 fecha de viaje
            options: [ { text: 'Fecha de venta', value: '1', }, { text: 'Fecha de viaje', value: '2'}],

            fields: [
                {key: 'clienteName', label: 'Client', thClass: 'text-left', sortable: true},
                {key: 'files', label: 'Book.', tdClass: 'text-right', thClass: 'text-right', sortable: true},
                {key: 'pax', label: 'Pax', tdClass: 'text-right', thClass: 'text-right', sortable: true},
                {key: 'paxPromedio', label: 'Pax/Book', tdClass: 'text-right', thClass: 'text-right', sortable: true},
               {key: 'nights', label: 'Nights', tdClass: 'text-right', thClass: 'text-right', sortable: true},
               {key: 'promedioPaxNoches', label: 'PPPPPN', tdClass: 'text-right', thClass: 'text-right', sortable: true},
              {key: 'usdReserva', label: 'USD Reserva', tdClass: 'text-right', thClass: 'text-right', sortable: true},
                {key: 'usdPax', label: 'USD Pax', tdClass: 'text-right', thClass: 'text-right', sortable: true},
                {key: 'venta', label: 'Total USD', tdClass: 'text-right', thClass: 'text-right', sortable: true},
                {key: 'portion', label: '%', tdClass: 'text-right', thClass: 'text-right', sortable: true},
            ],

            months: [
                { month: '0', monthName:'All'},
                { month: '1', monthName:'January'},
                { month: '2', monthName:'February'},
                { month: '3', monthName:'March'},
                { month: '4', monthName:'April'},
                { month: '5', monthName:'May'},
                { month: '6', monthName:'June'},
                { month: '7', monthName:'July'},
                { month: '8', monthName:'August'},
                { month: '9', monthName:'September'},
                { month: '10', monthName:'October'},
                { month: '11', monthName:'November'},
                { month: '12', monthName:'December'},
            ],

            countries: [],

            filters : {
                year: null,
                month: '0',
                country: null,
                cruises: [],
            },

            totals: {
                files: 0,
                pax: 0,
                total: 0,
                nights:0,
                paxbooking:0,
                usdreser:0,
                usdpax:0,

            },

            selectedClient: null,
            selectedCountry: null


        }



    },


  computed: {
    ...mapState("boat-client-analysis", ["summaryViewActive"]),
    ...mapGetters("boat-client-analysis", [
      "getData",
      "getCountries",
      "getCruises",
    ]),
          minDateYear(){

        return moment(this.year).startOf('year').format('L')

      },

      maxDateYear(){

        return moment(this.year).endOf('year').format('L')

      },

      showRanges () {

        //return moment().format('Y') == this.dateRange.startDate.format('Y')
        return false

      },
          filteredCountry(){

          const country = this.filters.country

          return country?.value ? country.name : ''

      },

          async setsCruises(){

        //establecer origen de clientes
        const cruceros = [...this.getCruises]


        let arrayCruceros = []


         cruceros.forEach(function(element) {
        if (isNaN(element)) {   // only pushes the strings, not numbers or booleans
            arrayCruceros.push(element.cruId);
        }
    })

        this.filters.cruises = arrayCruceros



      },


  },

    watch: {

      'filters.year' : function (newYear, oldYear) {

          this.handleDates()

      },

      'filters.month' : function (newMonth, oldMonth) {

          this.handleDates()

      },
       "filters.cruises": function (newCountry, oldCountry) {
      this.handleDates();
    },


    },


    methods: {

       ...mapActions("boat-client-analysis", ["loadData"]),
    ...mapMutations("boat-client-analysis", ["setSummaryViewActive"]),

        handleRange(){

        this.updateData()

      },
         //
      toogleMode(){

        this.isModeYear = !this.isModeYear

      },
    updateData(){

          let startDateOfTheYear = null
          let endDateOfTheYear = null

          if ( this.isModeYear ) {


            startDateOfTheYear = moment(this.filters.year).startOf('year').format('YYYY-MM-DD');
            endDateOfTheYear = moment(this.filters.year).endOf('year').format('YYYY-MM-DD')

          } else {


            startDateOfTheYear = moment(this.dateRange.startDate).format('YYYY-MM-DD');
            endDateOfTheYear = moment(this.dateRange.endDate).format('YYYY-MM-DD')

          }


          this.params.inicio = startDateOfTheYear
          this.params.fin = endDateOfTheYear

          // update data report

          this.loadReportData()



      },

        //procesar detalles por cliente
        async showClientDetails( item ) {

        /*    this.selectedClient = item.clienteName
           this.selectedCountry = item.pais

           const params = {
                inicio: this.params.inicio,
                fin: this.params.fin,
                tipo: this.typeReport,
                cliente: item.cofClienteId,
                tipo:this.typeReport,
                barco:this.filters.cruises



           }

           await this.loadDataDetail( params )

           this.setSummaryViewActive(false) */

   this.setSummaryViewActive(false)

         this.detailsData = item
        },

        // calcular totales
        setTotals() {

            //inicializar totales
            Object.keys(this.totals).forEach(key =>  { this.totals[key] = 0 } )
            // obtener data en vista
            const data = this.getData(this.filteredCountry)


            function sumar(total, valor) { return total + valor }

            //sumar files
            const totalFiles = data.map( item => Number(item.files)).reduce( sumar , 0)
            //sumar pax
            const totalPax = data.map( item => Number(item.pax)).reduce( sumar , 0)
            //sumar ventas
            const totalSales = data.map( item => Number(item.venta)).reduce( sumar , 0)
            //sumar paxbooking
            const totalPaxBooking = data.map( item => Number(item.paxPromedio)).reduce( sumar , 0)

            //sumar noches
            const totalNights = data.map( item => Number(item.nights)).reduce( sumar , 0)
 //sumar noches
            const totalUsdReserva = data.map( item => Number(item.usdReserva)).reduce( sumar , 0)
//sumar noches
            const totalUsdPax = data.map( item => Number(item.usdPax)).reduce( sumar , 0)


            this.totals.files = totalFiles
            this.totals.pax = totalPax
            this.totals.total = totalSales
            this.totals.nights = totalNights
            this.totals.paxbooking= totalPaxBooking
            this.totals.usdreser= totalUsdReserva
            this.totals.usdpax= totalUsdPax


        },


        // controlar periodos de consulta
        handleDates(){

            let startDateOf = null
            let endDateOf = null

            if ( this.filters.month != '0') {

                const date = `${this.filters.year.getFullYear()}-${this.filters.month}-1`
                startDateOf = moment(date).startOf('month').format('YYYY-MM-DD')
                endDateOf = moment(date).endOf('month').format('YYYY-MM-DD')

            } else {

                startDateOf = moment(this.filters.year).startOf('year').format('YYYY-MM-DD')
                endDateOf = moment(this.filters.year).endOf('year').format('YYYY-MM-DD')

            }

            this.params.inicio = startDateOf
            this.params.fin = endDateOf

            // reload data
            this.updateData()

        },


        // valores iniciales
        async setInitialParameters () {

            this.filters.year = new Date()
            this.setSummaryViewActive(true)


        },




        // buscar y cargar data segun parametros
        async loadReportData() {

            this.isLoading = true




   const params = {
        inicio: this.params.inicio,
        fin: this.params.fin,
        tipo: this.typeReport,
        cruise_ids:this.filters.cruises,

     };



            // reset country filter
            this.filters.country = null

            await this.loadData( params )

            // set default country filter
            const [ defaultCountry ] = this.getCountries
            this.filters.country = defaultCountry

            this.isLoading = false

        },


    },

    async created() {

       await this.setInitialParameters()

    },




}
</script>
