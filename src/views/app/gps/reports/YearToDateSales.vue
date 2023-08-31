<template>
  <div>
    <in-progress-report/>
    <b-row>
        <b-col>
            <b-card>

                <b-card-title>

                    <div class="d-flex justify-content-between">

                        <div>

                            <p class="m-0">

                                <h4>
                                    <strong>
                                        Year To Date Sales
                                    </strong>

                                </h4>
                            </p>

                        </div>

                        <div>
                            <b-button
                                variant="link"
                                @click="copy"
                                class="p-0"

                            >
                                Copy
                            </b-button>
                        </div>

                    </div>





                    <b-form-radio-group
                        v-model="selectedMode"
                        :options="options"
                        name="radio-inline"
                        size="sm"
                        class="mt-3"
                        @change="updateData"
                    ></b-form-radio-group>

                </b-card-title>

                <b-row class="mb-3">

                    <b-col>

                        <date-picker

                            id="input-pivot"
                            v-model="datePivot"
                            placeholder="Select date"
                            :clearable="false"
                            @input="updateData"
                            :disabled-date="disabledBeforeYearAfterToday"
                            class="mb-2"
                        >
                        </date-picker>




                    </b-col>

                    <b-col>
                        <v-select
                            :options="cruises"
                            label="cruName"
                            :reduce="cruise => cruise.cruId"
                            v-model="selectedCruise"
                            class="mb-1"
                            clearable
                            @input="updateData"
                        >
                        </v-select>
                    </b-col>
                </b-row>

                <b-row>

                    <b-col>

                        <!-- loading state -->
                        <template v-if="isLoading">

                            <b-skeleton-table
                            :rows="5"
                            :columns="4"
                            :table-props="{ bordered: true, striped: true }"
                            ></b-skeleton-table>

                        </template>

                        <!-- data section -->
                        <template v-else>

                            <table
                                id="ytdTable"
                                style="width:100%"
                                class="table table-hover table-sm"
                            >
                                <thead>
                                    <th
                                    style="width: 20%; text-align: right;"
                                    class="table-secondary"
                                    >
                                        Month
                                    </th>
                                    <th
                                    style="width: 16%; text-align: right;"
                                    class="table-secondary"
                                    v-for="(value, key) in headers" :key="key"
                                    >
                                        <span>
                                            <small>
                                               {{ moment(value.dateTo).format('DD-MMM-Y') }}
                                            </small>
                                        </span><br>
                                        <span>
                                            {{ value.travelYear }}
                                        </span>
                                    </th>
                                </thead>

                                <tbody>

                                    <tr v-for="(dataRow, index) in dataRows" :key="index">

                                        <td v-for="(colData, index) in dataRow" :key="index"
                                        style="text-align: right"
                                        >

                                            <template v-if="index == 'month'">
                                                <span>{{ colData }}</span>
                                            </template>

                                            <template v-else>
                                                <span>{{ colData | number('0,0.00') }}</span>
                                            </template>


                                        </td>

                                    </tr>
                                    <!--  totales -->
                                    <tr class="table-warning">
                                        <td style="width: 20%; text-align: right;">

                                        </td>
                                        <td
                                        style="width: 16%; text-align: right;"
                                        v-for="(value, key) in headers" :key="key"
                                        >
                                            <span>
                                                <strong>
                                                    {{ value.total | number('0,0.00') }}
                                                </strong>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </template>

                    </b-col>

                </b-row>

            </b-card>
        </b-col>
    </b-row>
  </div>
</template>

<script>

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import CruiseServices from '@/services/gps/cruise/CruiseServices.js'

import { mapActions, mapGetters } from 'vuex'

import moment from 'moment'


import { copyToClipBoard } from './utils'

export default {


    name: 'YearToDateSales',

    components: {
      DatePicker,
      "v-select": vSelect,
      InProgressReport: () => import('@/views/app/gps/components/InProgressReport')
    },

    data() {

        return {

            isLoading: false,

            datePivot: null,
            cruises: [],
            selectedCruise: null,

            params: {
              fecha: null,
              cruise: null,
              modo: null,
            },

            selectedMode: 1,
            options: [
                { text: 'Año siguiente', value: 1 },
                { text: 'Año subsiguiente', value: 2 },
            ]



        }

    },

    watch:{

    },

    computed: {
        ...mapGetters('year-to-date', ['getData']),

        headers() {
            return this.getData.headers
        },

        dataRows(){
            return this.getData.data
        }

    },

    methods: {

      ...mapActions( 'year-to-date', ['loadData']),

      async setInitialParameters () {

        this.datePivot = new Date()

      },

      async updateData(){


          const salesDatePivot = moment(this.datePivot).format('YYYY-MM-DD')

          this.params.fecha = salesDatePivot
          this.params.cruise = this.selectedCruise
          this.params.modo = this.selectedMode

          // update data report

          this.loadReportData()


      },

      // buscar y cargar data segun parametros
      async loadReportData() {

        this.isLoading = true

        const params = {
            fecha: this.params.fecha,
            cruise: this.params.cruise,
            modo: this.params.modo
        }

        await this.loadData( params )

        await this.setTableHeaders()

        this.isLoading = false

      },

      async loadCruises(){

          const { data: cruises } = await CruiseServices.getOwnCruises()

          this.cruises = cruises

          const [ defaultCruise ] = cruises

          this.selectedCruise = defaultCruise.cruId

      },


      async setTableHeaders(){

        const headers = this.getData.headers

      },

      copy() {
        copyToClipBoard('ytdTable')
      },

      disabledBeforeYearAfterToday(date) {

        const startYear = new Date( new Date().getFullYear(), 0, 1)
        startYear.setHours(0, 0, 0, 0)

        return date < startYear || date > new Date()

      },




    },

    async created(){

        await this.loadCruises()

        await this.setInitialParameters()

        await this.updateData()

    },

    mounted(){

    }





}
</script>


<style lang="scss" scoped>

    .list-group-item.active {
        color: whitesmoke !important;
        background-color: #F09A49;
        border: none;
    }

</style>
