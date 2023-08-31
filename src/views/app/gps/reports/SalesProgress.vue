<template>
  <div>

    <in-progress-report/>

    <b-row v-if="summaryViewActive">
        <b-col>
            <b-card>

                <b-card-title><strong>Sales Progress</strong></b-card-title>

                <b-row class="mb-5">

                    <template v-if="isModeYear">
                        <b-col cols="2">

                            <label for="input-year" style="font-weight: normal"  >Year</label>

                            <b-button
                              variant="link"
                              class="p-0"
                              @click="toggleMode"
                            >
                              Date range
                            </b-button>

                            <br>



                            <date-picker
                                id="input-year"
                                v-model="year"
                                type="year"
                                placeholder="Select year"
                                :clearable="false"
                                style="width: 100px"
                            >
                            </date-picker>


                        </b-col>
                    </template>

                    <template v-else>
                      <b-col cols="3">

                        <b-button
                          variant="link"
                          class="p-0"
                          @click="toggleMode"
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
                          opens="right"
                          @update="handleRange"
                        >
                            <!--template v-slot:input="picker" class="mt-1" style="min-width: 450px;">
                              <i class="glyph-icon simple-icon-calendar mr-3"></i>
                              {{ picker.startDate | date }} | {{ picker.endDate | date }}
                              <i class="fa fa-caret-down ml-3"></i>
                            </!--template-->
                        </date-range-picker>
                      </b-col>
                    </template>

                    <b-col>


                        <label for="select-client" style="font-weight: normal"  >Client</label><br>

                        <v-select
                            id="select-client"
                            multiple
                            label="name"
                            :options="getClients"
                            v-model="selectedClients"
                        >
                        </v-select>

                    </b-col>

                    <b-col>

                        <label for="select-salesperson" style="font-weight: normal"  >Salesperson</label><br>

                        <v-select
                            id="select-salesperson"
                            multiple
                            label="name"
                            :options="salesPeople"
                            v-model="selectedSalesPeople"
                        >
                        </v-select>

                    </b-col>




                </b-row>




                <b-row>
                    <b-col>

                      <template v-if="isLoading">
                        <div>
                          Cargando...
                        </div>
                      </template>

                      <template v-else>



                        <b-table
                          :items="summary"
                          :fields="fields"
                          :select-mode="selectMode"
                          responsive="sm"
                          ref="selectableTable"
                          selectable
                          @row-selected="onRowSelected"
                          small
                        >
                          <!-- Example scoped slot for select state illustrative purposes -->
                          <template #cell(selected)="{ rowSelected }">
                            <template v-if="rowSelected">
                              <span aria-hidden="true">&check;</span>
                              <span class="sr-only">Selected</span>
                            </template>
                            <template v-else>
                              <span aria-hidden="true">&nbsp;</span>
                              <span class="sr-only">Not selected</span>
                            </template>
                          </template>

                          <template #cell(interval)="row">
                            <div>
                              <b-button
                               variant="link"
                               @click="handleDetails(row.item)"
                               class="p-0"
                               :disabled="row.item.data.length == 0"
                              >
                                {{ row.item.interval }}
                              </b-button>
                            </div>

                          </template>

                          <template #cell(sales)="row">
                            {{ row.item.sales | currency }}
                          </template>

                          <template #cell(cost)="row">
                            {{ row.item.cost | currency }}
                          </template>

                          <template #cell(profit)="row">
                            {{ row.item.profit | currency }}
                          </template>

                          <template slot="bottom-row" slot-scope="data">

                              <td colspan="2" class="text-right" style="background: antiquewhite">
                                  <strong>TOTAL</strong>
                                  <template v-if="selectedRows && selectedRows.length">
                                      <br>
                                      <span class="text-muted">
                                            <strong>SELECTED</strong>
                                      </span>
                                  </template>
                              </td>
                              <td class="text-center" style="background: antiquewhite">
                                  <strong>{{ totals.bookings }}</strong>
                                  <template v-if="selectedRows && selectedRows.length">
                                      <br>
                                      <span class="text-muted">
                                        <strong>{{ selectedTotals.bookings }}</strong>
                                      </span>
                                  </template>
                              </td>
                              <td class="text-center" style="background: antiquewhite">
                                  <strong>{{ totals.pax }}</strong>
                                  <template v-if="selectedRows && selectedRows.length">
                                      <br>
                                      <span class="text-muted">
                                        <strong>{{ selectedTotals.pax }}</strong>
                                      </span>
                                  </template>
                              </td>
                              <td class="text-right" style="background: antiquewhite">
                                  <strong>{{ totals.sales | currency}}</strong>
                                  <template v-if="selectedRows && selectedRows.length">
                                      <br>
                                      <span class="text-muted">
                                        <strong>{{ selectedTotals.sales | currency}}</strong>
                                      </span>
                                  </template>
                              </td>
                              <td class="text-right" style="background: antiquewhite">
                                  <strong>{{ totals.cost | currency}}</strong>
                                  <template v-if="selectedRows && selectedRows.length">
                                      <br>
                                      <span class="text-muted">
                                        <strong>{{ selectedTotals.cost | currency}}</strong>
                                      </span>
                                  </template>
                              </td>
                              <td class="text-right" style="background: antiquewhite">
                                  <strong>{{ totals.profit | currency}}</strong>
                                  <template v-if="selectedRows && selectedRows.length">
                                      <br>
                                      <span class="text-muted">
                                        <strong>{{ selectedTotals.profit | currency}}</strong>
                                      </span>
                                  </template>
                              </td>

                          </template>


                        </b-table>

                        <!--
                        <p>
                          <b-button size="sm" @click="selectAllRows">Select all</b-button>
                          <b-button size="sm" @click="clearSelected">Clear selected</b-button>
                          <b-button size="sm" @click="selectThirdRow">Select 3rd row</b-button>
                          <b-button size="sm" @click="unselectThirdRow">Unselect 3rd row</b-button>
                        </p>
                        -->

                      </template>









                    </b-col>
                </b-row>

            </b-card>
        </b-col>

    </b-row>

    <b-row v-else>

      <b-col>

        <sales-progress-details
          :details="detailsData"
        />

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


import moment from 'moment'

import { getSum } from './utils'

import SalesProgressDetails from './SalesProgressDetails.vue'

import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'


export default {


    name: 'SalesProgress',

    components: {
        DatePicker,
        "v-select": vSelect,
        DateRangePicker,
        SalesProgressDetails,
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
            isModeYear: true,
            ////


            selectedClients: [],

            salesPeople: [],
            selectedSalesPeople: [],


            params: {
              inicio: null,
              fin: null
            },

            summary: [],

            //modes: ['multi', 'single', 'range'],

            fields: [
              {key: 'month', label: '#'},
              {key: 'interval', label: 'Confirmation date', thClass: 'text-left', sortable: true},
              {key: 'bookings', label: 'Bookings', tdClass: 'text-center', sortable: true},
              {key: 'pax', label: 'Pax', tdClass: 'text-center', sortable: true},
              {key: 'sales', label: 'Sales', tdClass: 'text-right', thClass: 'text-right', sortable: true},
              {key: 'cost', label: 'Cost', tdClass: 'text-right', thClass: 'text-right', sortable: true},
              {key: 'profit', label: 'Profit', tdClass: 'text-right', thClass: 'text-right', sortable: true},
            ],


            selectMode: 'multi',
            selectedRows: [],

            totals: {
              sales: 0,
              cost: 0,
              profit: 0,
              bookings: 0,
              pax: 0
            },

            selectedTotals: {
              sales: 0,
              cost: 0,
              profit: 0,
              bookings: 0,
              pax: 0
            },

            detailsData: [],



        }



    },

    computed: {

      ...mapState('sales-progress', ['summaryViewActive']),
      ...mapGetters('sales-progress', ['getData', 'getClients']),

      minDateYear(){

        return moment(this.year).startOf('year').format('L')

      },

      maxDateYear(){

        return moment(this.year).endOf('year').format('L')

      },

      showRanges () {

        //return moment().format('Y') == this.dateRange.startDate.format('Y')
        return false

      }

    },

    watch: {

      year: function (newYear, oldYear) {

         //sincronizar date range
         const startDateOfTheYear = moment(newYear).startOf('year')
         const endDateOfTheYear = moment(newYear).endOf('year')

         this.dateRange.startDate = startDateOfTheYear
         this.dateRange.endDate = endDateOfTheYear

         // reload data
         this.updateData()

      },


      // detectar cambios en los registros seleccionados para procesar los totales
      selectedRows: {

        deep: true,

        handler(){

          // inicializar totales
          Object.keys(this.selectedTotals).forEach(key =>  { this.selectedTotals[key] = 0 } )

          const totalSelectedSales  = this.selectedRows.map( item => Number(item.sales)).reduce( getSum, 0)
          const totalSelectedCost   = this.selectedRows.map( item => Number(item.cost)).reduce( getSum, 0)
          const totalSelectedProfit = this.selectedRows.map( item => Number(item.profit)).reduce( getSum, 0)
          const totalSelectedBookings = this.selectedRows.map( item => Number(item.bookings)).reduce( getSum, 0)
          const totalSelectedPax = this.selectedRows.map( item => Number(item.pax)).reduce( getSum, 0)

          this.selectedTotals.sales = totalSelectedSales
          this.selectedTotals.cost = totalSelectedCost
          this.selectedTotals.profit = totalSelectedProfit
          this.selectedTotals.bookings = totalSelectedBookings
          this.selectedTotals.pax = totalSelectedPax


        }


      },

      // detectar cambios en clientes seleccionados para aplicar filtro
      selectedClients: {

        deep: true,

        handler(clients){

          this.setSalesPeople()

          this.setSummaryData()

        }
      },

      // detectar cambios en clientes seleccionados para aplicar filtro
      selectedSalesPeople: {

        deep: true,

        handler(salesPeople){

          this.setSummaryData()

        }
      }

    },

    methods: {

      ...mapActions( 'sales-progress', ['loadData']),
      ...mapMutations('sales-progress', ['setSummaryViewActive']),

      updateData(){

          let startDateOfTheYear = null
          let endDateOfTheYear = null

          if ( this.isModeYear ) {

            startDateOfTheYear = moment(this.year).startOf('year').format('YYYY-MM-DD');
            endDateOfTheYear = moment(this.year).endOf('year').format('YYYY-MM-DD')

          } else {


            startDateOfTheYear = moment(this.dateRange.startDate).format('YYYY-MM-DD');
            endDateOfTheYear = moment(this.dateRange.endDate).format('YYYY-MM-DD')

          }


          this.params.inicio = startDateOfTheYear
          this.params.fin = endDateOfTheYear

          // update data report

          this.loadReportData()



      },

      handleRange(){

        this.updateData()

      },

      //
      toggleMode(){

        this.isModeYear = !this.isModeYear

      },

      //
      handleDetails(itemData){

         this.setSummaryViewActive(false)

         this.detailsData = itemData

      },


      // generar lista de vendedores segùn clientes
      async setSalesPeople(){

        //establecer origen de clientes
        const clientes = this.selectedClients.length ? [...this.selectedClients] : [...this.getClients]

        //extraer vendedores
        const vendedores = clientes.map( cliente => cliente.vendedores)

        //generar lista única de vendedores

        let salesPeople = []

        vendedores.forEach( vendedor => {
          vendedor.forEach( item => {

              const existeItem = salesPeople.find( vendedor => vendedor.id === item.id)

              if ( !existeItem ) salesPeople.push({id: item.id, name:item.name})

          })
        })


        this.salesPeople = salesPeople



      },


      // filtrar, procesar y resumir la información
      async setSummaryData() {


        this.isLoading = true

        let sourceData = [...this.getData]


        // filtrar por clientes seleccionados
        if ( this.selectedClients.length ) {

          const ids = this.selectedClients.map( e => e.id)
          const dataFilteredClients = sourceData.filter( booking =>  ids.includes(booking.cofClienteId) )

          sourceData = [...dataFilteredClients]

        }



        //filtrar por vendedores seleccionados


        if ( this.selectedSalesPeople.length ){


          const ids = this.selectedSalesPeople.map( e => e.id)
          const dataFilteredSalesPeople = sourceData.filter( booking => ids.includes(booking.cofVendedorId) )

          sourceData = [...dataFilteredSalesPeople]

        }




       //procesa data filtrada
       const data = [...sourceData]




        // crear intervalos
        const meses = [1,2,3,4,5,6,7,8,9,10,11,12]
        const year = moment(this.year).format('YYYY')


        // inicializar totales
        Object.keys(this.totals).forEach(key =>  { this.totals[key] = 0 } )


        // generar resumen



        const summary = []

        meses.forEach( mes => {


          const date = `${year}-${mes}-1`
          const startMonth = moment(date).startOf('month')
          const endMonth = moment(date).endOf('month')


          const startDate = new Date(startMonth)
          const endDate = new Date(endMonth)


          // filtrar data por mes
          const dataMonth = data.filter( booking => {
              const dateBooking = new Date(booking.cofFechaVenta)
              return dateBooking >= startDate && dateBooking <= endDate
          })




          //contar bookings
          const bookingsCount = dataMonth.length
          //sumar ventas
          const totalSalesBooking = dataMonth.map( booking => Number(booking.venta)).reduce( getSum , 0)
          //sumar pasajeros
          const totalPaxBooking = dataMonth.map( booking => Number(booking.cofPasajeros)).reduce( getSum, 0)
          //sumar costo
          const totalCostBooking = dataMonth.map( booking => Number(booking.costo)).reduce( getSum, 0)
          //sumar profit
          const totalProfitBooking = dataMonth.map( booking => Number(booking.profit)).reduce( getSum, 0)

          //crear elemento para objeto summary
          const elemento = {
            'month' : mes,
            'interval' : startMonth.format('DD MMM YYYY, ddd') + ' - ' + endMonth.format('DD MMM YYYY, ddd'),
            'bookings': bookingsCount,
            'pax': totalPaxBooking,
            'sales': totalSalesBooking,
            'cost': totalCostBooking,
            'profit': totalProfitBooking,
            'data': dataMonth
          }

          summary.push(elemento)

          //acumular totales
          this.totals.sales += totalSalesBooking
          this.totals.cost += totalCostBooking
          this.totals.profit += totalProfitBooking
          this.totals.bookings += bookingsCount
          this.totals.pax += totalPaxBooking


        })


        this.summary = summary

        this.isLoading = false


      },


      // valores iniciales
      async setInitialParameters () {

        this.year = new Date()
        this.setSummaryViewActive(true)


      },

      // buscar y cargar data segun parametros
      async loadReportData() {

         const params = {

            inicio: this.params.inicio,
            fin: this.params.fin

         }


         this.salesPeople = []

         await this.loadData( params )

         await this.setSalesPeople()
         //
         await this.setSummaryData()

      },

      onRowSelected(items) {
        this.selectedRows = items
      },


    },

    async created() {

       await this.setInitialParameters()

    },

}
</script>


