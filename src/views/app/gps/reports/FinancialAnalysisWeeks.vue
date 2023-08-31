<template>

  <b-row>

    <b-col>

      <b-card>

        <b-card-title>
          <strong>Financial Analysis Weeks</strong>
        </b-card-title>




        <b-row>

          <b-col>

            <div class="d-flex flex-row bd-highlight mb-3">

                      <date-picker
                          id="input-year"
                          v-model="year"
                          type="year"
                          placeholder="Select year"
                          :clearable="false"
                          style="width: 100px"
                      />

                      <v-select
                          id="select-cruise"
                          :options="cruiseList"
                          label="cruName"
                          :reduce="cruise => cruise.cruId"
                          v-model="params.cruise"
                      />


            </div>










          </b-col>

        </b-row>

        <b-row>

          <b-col>

            <b-table
              :items="getData"
              :fields="fields"
              :select-mode="selectMode"
              selectable
              @row-selected="onRowSelected"
              small
            >

              <!-- sales column -->
              <template #cell(venta)="row">
                {{ row.item.venta | currency }}
              </template>

              <!-- cost column -->
              <template #cell(costo)="row">
                {{ row.item.costo | currency }}
              </template>

              <!-- revenue column -->
              <template #cell(utilidad)="row">
                {{ row.item.utilidad | currency }}
              </template>

              <!-- margin column -->
              <template #cell(margen)="row">
                {{ resolveMargin( row.item ) | percent(2) }}
              </template>

              <!-- totales -->
              <template slot="bottom-row">
                <td colspan="3" class="text-right" style="background: antiquewhite">
                    <strong>TOTAL</strong>
                    <template v-if="selectedRows && selectedRows.length">
                        <br>
                        <span class="text-muted">
                              <strong>SELECTED</strong>
                        </span>
                    </template>
                </td>
                <td class="text-right" style="background: antiquewhite">
                    <strong>{{ totals.ventas | currency }}</strong>
                    <template v-if="selectedRows && selectedRows.length">
                        <br>
                        <span class="text-muted">
                          <strong>{{ selectedTotals.venta | currency }}</strong>
                        </span>
                    </template>
                </td>
                <td class="text-right" style="background: antiquewhite">
                    <strong>{{ totals.costos | currency }}</strong>
                    <template v-if="selectedRows && selectedRows.length">
                        <br>
                        <span class="text-muted">
                          <strong>{{ selectedTotals.costo | currency }}</strong>
                        </span>
                    </template>
                </td>
                <td class="text-right" style="background: antiquewhite">
                    <strong>{{ totals.utilidad | currency }}</strong>
                    <template v-if="selectedRows && selectedRows.length">
                        <br>
                        <span class="text-muted">
                          <strong>{{ selectedTotals.utilidad | currency }}</strong>
                        </span>
                    </template>
                </td>
                <td class="text-right" style="background: antiquewhite">
                </td>
              </template>

            </b-table>

          </b-col>

        </b-row>



      </b-card>


    </b-col>

  </b-row>

</template>

<script>

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

import { getSum } from './utils'

import CruiseServices from '@/services/gps/cruise/CruiseServices'


export default {

  name: 'FinancialAnalysisWeeks',

  components: {
    DatePicker,
    "v-select": vSelect,
  },


  data() {

    return {

      isLoading: false,
      year: null,
      params: {
        inicio: null,
        fin: null,
        cruise: null
      },
      cruiseList: [],

      fields: [
        { key: 'semana', label: 'Week' },
        { key: 'desde', label: 'Start' },
        { key: 'hasta', label: 'End' },
        { key: 'venta', label: 'Sales', tdClass: 'text-right', thClass: 'text-right' },
        { key: 'costo', label: 'Cost', tdClass: 'text-right', thClass: 'text-right' },
        { key: 'utilidad', label: 'Revenue', tdClass: 'text-right', thClass: 'text-right' },
        { key: 'margen', label: '%', tdClass: 'text-center', thClass: 'text-center' },

      ],

      selectMode: 'multi',
      selectedRows: [],

      totals: {
        venta: 0,
        costo: 0,
        utilidad: 0
      },

      selectedTotals: {
        venta: 0,
        costo: 0,
        utilidad: 0
      }

    }

  },


  computed: {
    ...mapGetters('financial-analysis-weeks', ['getData'])
  },

  watch: {

    year: function (newYear, oldYear) {
      this.updateData()
    },

    'params.cruise': function() {
      this.updateData()
    },

    // procesar filas seleccionadas
    selectedRows: {

      deep: true,

      handler() {

        // inicializar totales
        Object.keys(this.selectedTotals).forEach(key =>  { this.selectedTotals[key] = 0 } )

        //function getSum(total, valor) { return total + valor }

        const totalSelectedVenta = this.selectedRows.map( item => Number(item.venta)).reduce( getSum, 0)
        const totalSelectedCosto = this.selectedRows.map( item => Number(item.costo)).reduce( getSum, 0)
        const totalSelectedUtilidad = this.selectedRows.map( item => Number(item.utilidad)).reduce( getSum, 0)


        this.selectedTotals.venta = totalSelectedVenta
        this.selectedTotals.costo = totalSelectedCosto
        this.selectedTotals.utilidad = totalSelectedUtilidad


      }

    }

  },

  methods: {

    ...mapActions('financial-analysis-weeks', ['loadData']),

    async setInitialParameters () {

      this.year = new Date()

      const { data } = await CruiseServices.getOwnCruises()

      this.cruiseList = data

      if ( data ) {

        const [ defaultCruise  ] = data
        this.params.cruise = defaultCruise.cruId

      }

    },

    // determinar parametros y cargar datos
    updateData(){

        const startDateOfTheYear = moment(this.year).startOf('year').format('YYYY-MM-DD');
        const endDateOfTheYear = moment(this.year).endOf('year').format('YYYY-MM-DD')

        this.params.inicio = startDateOfTheYear
        this.params.fin = endDateOfTheYear

        if ( this.params.cruise == null )
          return

        // update data report

        this.loadReportData()

    },

    // buscar y cargar data segun parametros
    async loadReportData() {

      await this.loadData( this.params )

      this.setTotals()

    },

    // calcular totales
    setTotals() {

        //inicializar totales
        Object.keys(this.totals).forEach(key =>  { this.totals[key] = 0 } )

        // obtener data en vista
        const data = this.getData

        //sumar ventas
        const totalVentas = data.map( item => Number(item.venta)).reduce( getSum , 0)
        //sumar costos
        const totalCostos = data.map( item => Number(item.costo)).reduce( getSum , 0)
        //sumar utilidad
        const totalUtilidad = data.map( item => Number(item.utilidad)).reduce( getSum , 0)


        this.totals.ventas = totalVentas
        this.totals.costos = totalCostos
        this.totals.utilidad = totalUtilidad

    },

    // filas seleccionadas
    onRowSelected(items) {
      this.selectedRows = items
    },

    // calcular margen utilidad
    resolveMargin( item ) {

      if ( item.venta == 0 )
         return 0

      return item.utilidad / item.venta
    }


  },

  async created() {

    await this.setInitialParameters()

  }



}

</script>
