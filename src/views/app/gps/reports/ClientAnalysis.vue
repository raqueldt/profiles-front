<template>

    <div>

      <in-progress-report/>


        <b-row v-if="summaryViewActive">

            <b-col>

                <b-card>

                    <b-card-title><strong>Client Analysis</strong></b-card-title>

                    <!-- filters section -->
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



                                <!-- year -->
                                <div>

                                    <label for="input-year" style="font-weight: normal"  >Year</label>
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


                                <!-- countries -->

                                <div v-if="getCountries.length">

                                    <label for="select-country" style="font-weight: normal">Country</label><br>

                                    <v-select
                                        id="select-country"
                                        :options="getCountries"
                                        label="name"
                                        v-model="filters.country"
                                        @input="setTotals"
                                        clearable
                                    >
                                    </v-select>



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
                                                <td colspan="3" class="text-right" style="background: antiquewhite">
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

                <client-analysis-details
                  :client="selectedClient"
                  :country="selectedCountry"
                  :details="getDetails"
                />


            </b-col>

        </b-row>



    </div>

</template>




<script>

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";


import moment from 'moment'

import { getSum } from './utils'

import ClientAnalysisDetails from './ClientAnalysisDetails.vue'

import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'




export default {


    name: 'ClientAnalysis',

    components: {

        DatePicker,
        "v-select": vSelect,
        ClientAnalysisDetails,
        InProgressReport: () => import('@/views/app/gps/components/InProgressReport')

    },

    data() {

        return {

            isLoading: false,


            params: {
              inicio: null,
              fin: null
            },

            typeReport: '1',  // 1 fecha de venta, 2 fecha de viaje
            options: [ { text: 'Fecha de venta', value: '1', }, { text: 'Fecha de viaje', value: '2'}],

            fields: [
                {key: 'clienteName', label: 'Client', thClass: 'text-left', sortable: true},
                {key: 'files', label: 'Files', tdClass: 'text-right', thClass: 'text-right', sortable: true},
                {key: 'pax', label: 'Pax', tdClass: 'text-right', thClass: 'text-right', sortable: true},
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
                country: null
            },

            totals: {
                files: 0,
                pax: 0,
                total: 0

            },

            selectedClient: null,
            selectedCountry: null


        }



    },

    computed: {

      ...mapState('client-analysis', ['summaryViewActive']),
      ...mapGetters('client-analysis', ['getData', 'getCountries', 'getDetails']),

      filteredCountry(){

          const country = this.filters.country

          return country?.value ? country.name : ''

      }


    },

    watch: {

      'filters.year' : function (newYear, oldYear) {

          this.handleDates()

      },

      'filters.month' : function (newMonth, oldMonth) {

          this.handleDates()

      },


    },


    methods: {

        ...mapActions( 'client-analysis', ['loadData', 'loadDetails']),
        ...mapMutations('client-analysis', ['setSummaryViewActive']),


        //procesar detalles por cliente
        async showClientDetails( item ) {

           this.selectedClient = item.clienteName
           this.selectedCountry = item.pais

           const params = {
                inicio: this.params.inicio,
                fin: this.params.fin,
                tipo: this.typeReport,
                cliente: item.cofClienteId
           }

           await this.loadDetails( params )

           this.setSummaryViewActive(false)


        },

        // calcular totales
        setTotals() {

            //inicializar totales
            Object.keys(this.totals).forEach(key =>  { this.totals[key] = 0 } )
            // obtener data en vista
            const data = this.getData(this.filteredCountry)


            //sumar files
            const totalFiles = data.map( item => Number(item.files)).reduce( getSum , 0)
            //sumar pax
            const totalPax = data.map( item => Number(item.pax)).reduce( getSum , 0)
            //sumar ventas
            const totalSales = data.map( item => Number(item.venta)).reduce( getSum , 0)


            this.totals.files = totalFiles
            this.totals.pax = totalPax
            this.totals.total = totalSales

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

        async updateData () {

            await this.loadReportData()

            this.setTotals()

        },



        // buscar y cargar data segun parametros
        async loadReportData() {

            this.isLoading = true



            const params = {
                inicio: this.params.inicio,
                fin: this.params.fin,
                tipo: this.typeReport,
            }


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
