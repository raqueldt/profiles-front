<template>
  <div>
    <in-progress-report/>
    <b-row>
      <b-col>
            <b-card>

                <b-card-title>
                  <strong>Passenger Analysis</strong>
                </b-card-title>

                <!-- filter section-->

                <b-row class="mb-3">

                    <b-col lg="4">

                        <div class="d-flex justify-content-between">

                            <div>
                                <date-picker
                                    id="input-year"
                                    v-model="year"
                                    type="year"
                                    placeholder="Select year"
                                    :clearable="false"
                                    style="width: 100px"
                                    class="mb-1"
                                >
                                </date-picker>
                            </div>

                            <div>
                                <b-badge variant="primary"><h3 class="m-0 p-0">{{ totalPassengers }}</h3></b-badge>
                            </div>

                        </div>

                    </b-col>




                    <b-col>

                        <b-row>

                            <b-col lg="4">
                                <v-select
                                    id="select-agency"
                                    :options="getCruises"
                                    label="cruName"
                                    :reduce="cruise => cruise.cruId"
                                    v-model="filters.cruise"
                                    class="mb-1"
                                    clearable
                                >
                                </v-select>
                            </b-col>

                            <b-col lg="4">
                                <v-select
                                    id="select-country"
                                    :options="getCountries"
                                    label="paiNombre"
                                    :reduce="country => country.paiId"
                                    v-model="filters.country"
                                    class="mb-1"
                                    clearable
                                >
                                </v-select>
                            </b-col>

                            <b-col lg="4">
                                <v-select
                                    id="select-agency"
                                    :options="getAgencies"
                                    label="clienteName"
                                    :reduce="agency => agency.cofClienteId"
                                    v-model="filters.agency"
                                    class="mb-1"
                                    clearable
                                >
                                </v-select>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>


                <!-- content section -->
                <b-row>

                    <b-col lg="4">

                        <passenger-analysis-nationality
                            :passengers="filteredPassengers"
                        />


                    </b-col>

                    <b-col lg="4">




                        <passenger-analysis-agency
                            :passengers="filteredPassengers"
                        />


                    </b-col>

                    <b-col lg="4">


                        <passenger-analysis-gender
                            :passengers="filteredPassengers"
                        />

                        <passenger-analysis-age
                            :passengers="filteredPassengers"
                        />

                        <passenger-analysis-cruise-length
                            :passengers="filteredPassengers"
                        />


                    </b-col>

                </b-row>

            </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import DateRangePicker from 'vue2-daterange-picker'

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";


import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import moment from 'moment'

import PassengerAnalysisNationality from './nationality/PassengerAnalysisNationality.vue'
import PassengerAnalysisGender from './gender/PassengerAnalysisGender.vue'
import PassengerAnalysisCruiseLength from './cruise-length/PassengerAnalysisCruiseLength.vue'
import PassengerAnalysisAgency from './agency/PassengerAnalysisAgency.vue'
import PassengerAnalysisAge from './age/PassengerAnalysisAge.vue'


export default {


    name: 'PassengersAnalysis',

    components: {

        DatePicker,
        DateRangePicker,
        "v-select": vSelect,

        PassengerAnalysisNationality,
        PassengerAnalysisGender,
        PassengerAnalysisCruiseLength,
        PassengerAnalysisAgency,
        PassengerAnalysisAge,
        InProgressReport: () => import('@/views/app/gps/components/InProgressReport')

    },

    data() {

        return {

            isLoading: false,
            // seccion para filtro de fecha
            year: null,
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



            filters: {
                cruise: null,
                agency: null,
                country: null
            }

        }



    },

    computed: {

      ...mapGetters('passenger-analysis', ['getData', 'getCruises', 'getCountries', 'getAgencies']),

      selectedFilters(){
          return {
              cruise: this.filters.cruise,
              country: this.filters.country,
              agency: this.filters.agency
          }
      },


      filteredPassengers(){

          return this.getData(this.selectedFilters)

      },

      totalPassengers() {

          return this.filteredPassengers.length

      },




    },

    watch: {

      year: function (newYear, oldYear) {

         // reload data
         this.updateData()

      },

    },

    methods: {

        ...mapActions( 'passenger-analysis', ['loadData']),

      // valores iniciales
      async setInitialParameters () {


        this.year = new Date()

      },

      // determinar parametros y cargar datos
      updateData(){

          const startDateOfTheYear = moment(this.year).startOf('year').format('YYYY-MM-DD');
          const endDateOfTheYear = moment(this.year).endOf('year').format('YYYY-MM-DD')

          this.params.inicio = startDateOfTheYear
          this.params.fin = endDateOfTheYear

          // update data report

          this.loadReportData()

      },


      // buscar y cargar data segun parametros
      async loadReportData() {

         const params = {
            inicio: this.params.inicio,
            fin: this.params.fin,
            tipo: 2 // 1:fecha de venta 2:fecha de viaje
         }

         await this.loadData( params )

         await this.setDefaultFilters()

      },

      async setDefaultFilters(){

          const [ defaultCruise ] = this.getCruises
          const [ defaultCountry ] = this.getCountries
          const [ defaultAgency ] = this.getAgencies

          this.filters.cruise = defaultCruise.cruId
          this.filters.agency = defaultAgency.cofClienteId
          this.filters.country = defaultCountry.paiId


      },


    },

    async created(){
        await this.setInitialParameters()
    },






}
</script>


<style lang="scss" scoped>

    .list-group-item.active {
        color: whitesmoke !important;
        background-color: #F09A49;
        border: none;
    }

</style>
