<template>

  <div>
    <b-row>
      <b-col>

        <b-card>

          <b-card-title>
            Cruise Itinerary Sales
          </b-card-title>

          <b-row>

            <b-col>
              <div class="form-group d-flex align-items-center">
                  <label for="input-year" class="mr-2 mb-0">Year</label>
                  <date-picker
                    id="input-year"
                    v-model="year"
                    type="year"
                    placeholder="Select year"
                    :clearable="false"
                    style="width: 100px"
                    @input="updateData"
                  />
                </div>

            </b-col>

            <b-col>

              <div class="form-group d-flex align-items-center float-right">
                <label for="select-cruise" class="mr-2 mb-0">Cruise</label>
                <v-select
                  id="select-cruise"
                  label="cruName"
                  :options="cruiseList"
                  :reduce="(cruId) => cruId.cruId"
                  v-model="selectedCruise"
                  clearable
                  @input="updateData"
                />
              </div>

            </b-col>

          </b-row>

          <b-row>
            <b-col>

              <b-button variant="link" class="p-0" @click="copyToClipBoard" v-if="items.length" :disabled="isBusy">
                Copy data
              </b-button>

              <b-table
                :items="items"
                :fields="fields"
                :busy="isBusy"
                show-empty
                small
                responsive="sm"
                striped
              >
                <!-- busy state -->
                <template #table-busy>
                  <div class="text-center my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </template>

                <!-- sales column -->
                <template #cell(venta)="data">
                  <span>{{ data.value | currency }}</span>
                </template>
                <!-- sales column -->
                <template #cell(costo)="data">
                  <span>{{ data.value | currency }}</span>
                </template>
                <!-- sales column -->
                <template #cell(grossMargin)="data">
                  <span>{{ data.value | currency }}</span>
                </template>

              <!-- totales -->
              <template slot="bottom-row">
                <td colspan="4" class="text-right" style="background: antiquewhite">
                    <strong>TOTAL</strong>
                </td>
                <td class="text-right" style="background: antiquewhite">
                    <strong>{{ totales.ventas | currency }}</strong>
                </td>
                <td class="text-right" style="background: antiquewhite">
                    <strong>{{ totales.costos | currency }}</strong>
                </td>
                <td class="text-right" style="background: antiquewhite">
                    <strong>{{ totales.margen | currency }}</strong>
                </td>
              </template>




              </b-table>
            </b-col>
          </b-row>







        </b-card>

      </b-col>
    </b-row>

  </div>

</template>

<script>

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import moment from "moment";

import CruiseServices from '@/services/gps/cruise/CruiseServices'
import ReportsServices from '@/services/gps/reports/ReportsServices'

import { getSum } from './utils'

export default {

  name: 'CruiseItinerarySales',

  components: {
    DatePicker,
    "v-select": vSelect,
  },

  data() {

    return {

      isBusy: false,

      year: null,
      cruiseList: [],
      selectedCruise: null,
      items: [],
      fields: [
        { key: 'itiCode', label: 'Code'},
        { key: 'itiName', label: 'Itinerary'},
        { key: 'depStartDate', label: 'Start date'},
        { key: 'depEndDate', label: 'End date'},
        { key: 'venta', label: 'Sales', tdClass: 'text-right', thClass: 'text-right'},
        { key: 'costo', label: 'Costs', tdClass: 'text-right', thClass: 'text-right'},
        { key: 'grossMargin', label: 'Margin', tdClass: 'text-right', thClass: 'text-right'},
      ],
      totales: {
        ventas: 0,
        costos: 0,
        margen: 0
      },


    }

  },

  methods: {


    // valores iniciales
    async setInitialParameters () {
      this.year = new Date()
    },

    //
    async getCruises(){
      const { data } = await CruiseServices.getOwnCruises()
      this.cruiseList = data
    },

    //
    setInitialParameters(){

      this.year = new Date()
      const [ defaultCruise ] = this.cruiseList
      if ( defaultCruise )
        this.selectedCruise = defaultCruise.cruId

    },

    //
    async loadReportData(){


      this.isBusy = true

      this.items = []

      const params = {
        inicio: moment(this.year).startOf('year').format('YYYY-MM-DD'),
        fin: moment(this.year).endOf('year').format('YYYY-MM-DD'),
        cruise: this.selectedCruise
      }

      const { data } = await ReportsServices.getSalesFinancialDeparture( params )

      this.items = data


      //sumar ventas
      const totalVentas = data.map( item => Number(item.venta)).reduce( getSum , 0)
      //sumar costos
      const totalCostos = data.map( item => Number(item.costo)).reduce( getSum , 0)
      //sumar margen
      const totalMargen = data.map( item => Number(item.grossMargin)).reduce( getSum , 0)


      this.totales.ventas = totalVentas
      this.totales.costos = totalCostos
      this.totales.margen = totalMargen


      this.isBusy = false

    },

    //
    updateData(){
      this.loadReportData()
    },

    //
    copyToClipBoard(){

      const data = this.items.map( item => {
        const roundedVenta = item.venta.toFixed(2) //.replace('.',',')
        const roundedCosto = item.costo.toFixed(2) //.replace('.',',')
        const roundedMargen = item.grossMargin.toFixed(2) //.replace('.',',')

        return `${item.itiCode}\t${item.itiName}\t${item.depStartDate}\t${item.depEndDate}\t${roundedVenta}\t${roundedCosto}\t${roundedMargen}`
      }).join('\n')

      navigator.clipboard.writeText( data ).then( () => {
        this.$notify("success", "Success", "The data has been copied to the clipboard", {
          duration: 2000,
          permanent: false,
        });
      })

    }



  },

  async created() {

    await this.getCruises()
    await this.setInitialParameters()
    await this.loadReportData()

  }


}
</script>
