<template>
  <div>

    <b-row>
      <b-col style="background: lightgray" class="py-3">
        <span><strong>{{ cruise.cruName}}</strong></span>
      </b-col>
    </b-row>

    <template v-if="isLoading">
        <b-skeleton-table
          :rows="6"
          :columns="1"
        ></b-skeleton-table>
    </template>

    <template v-else>
      <b-row>
        <b-col>
          <b-table
            :items="dataSalesTargets"
            :fields="fields"
            small
            class="custom-table"
          >

            <!-- month -->
            <template #cell(tgtMonth)="data">

                 {{ resolveMonth(data.value) }}

            </template>
            <!-- target -->
            <template #cell(tgtValue)="data">

              {{ data.value | number('0.0a')  }}

            </template>
            <!-- sales -->
            <template #cell(totalSales)="data">

              {{ data.value | number('0.0a')  }}

            </template>
            <!-- allotments -->
            <template #cell(totalAllotments)="data">

              {{ data.value | number('0.0a')  }}

            </template>
            <!-- variance -->
            <template #cell(variance)="data">

              <div :style="resolveVarianceStyle(data.value)" class="pl-1 pr-2">
                  {{ data.value | number('0.0a')  }}
              </div>

            </template>

            <!-- totalPercentPax -->
            <template #cell(totalPercentPax)="data">

              <div class="pl-1 pr-2">
                <small>{{ data.value | percent  }}</small>
              </div>

            </template>



            <!-- totals -->
            <template slot="bottom-row">
              <td colspan="2" class="text-right">
                  <strong>{{ totals.target | number('0.0a') }}</strong>
              </td>
              <td class="text-right">
                  <strong>{{ totals.sales | number('0.0a') }}</strong>
              </td>
              <td class="text-right">
                  <strong>{{ totals.allotments | number('0.0a') }}</strong>
              </td>
              <td class="text-right">
                  <strong>{{ totals.variance | number('0.0a') }}</strong>
              </td>
              <td/>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </template>






  </div>
</template>

<script>

import ReportsServices from '@/services/gps/reports/ReportsServices'
import moment from 'moment'
import { getSum } from '@/views/app/gps/reports/utils'




export default {

  name: 'CruiseSalesTargetsAllotmentItem',

  props: ['year', 'cruise'],


  data(){

    return {

      isLoading: false,

      dataSalesTargets: [],

      fields: [
          {
            key: 'tgtMonth',
            label: 'Mo',
          },
          {
            key: 'tgtValue',
            label: 'Target',
            tdClass: 'text-right'
          },
          {
            key: 'totalSales',
            label: 'Sales',
            tdClass: 'text-right'
          },
          {
            key: 'totalAllotments',
            label: 'Allotment',
            tdClass: 'text-right'
          },
          {
            key: 'variance',
            label: 'Variance',
            tdClass: 'text-right',
          },
          {
            key: 'totalPercentPax',
            label: 'Occ.',
            thClass: 'text-center',
            tdClass: 'text-right',
          },

      ],

      totals: {
        target: 0,
        sales: 0,
        allotments: 0,
        variance: 0
      }


    }

  },

  watch: {


    year(){
      this.loadData()
    }



  },


  methods: {


    //resolver el nombre del mes
    resolveMonth( month ){

      return moment().month( month - 1 ).format('MMM')

    },

    // cargar data del reporte
    async loadData(){

      this.isLoading = true

      const params = {
        inicio: moment([this.year]).startOf('year').format('YYYY-MM-DD'),
        fin: moment([this.year]).endOf('year').format('YYYY-MM-DD'),
        cruise: this.cruise.cruId
      }


      const { data } = await ReportsServices.getCruiseSalesAllotmentOverview( params )

      this.dataSalesTargets = data

      //sumar target
      const totalTarget = data.map( item => Number(item.tgtValue)).reduce( getSum , 0)
      //sumar sales
      const totalSales = data.map( item => Number(item.totalSales)).reduce( getSum , 0)
      //sumar allotments
      const totalAllotments = data.map( item => Number(item.totalAllotments)).reduce( getSum , 0)
      //sumar variance
      const totalVariance = data.map( item => Number(item.variance)).reduce( getSum , 0)

      this.totals.target = totalTarget
      this.totals.sales = totalSales
      this.totals.allotments = totalAllotments
      this.totals.variance = totalVariance


      this.isLoading = false

    },

    // resolver estilo variant
    resolveVarianceStyle( variance ){


      let background = 'none'

      if ( Number(variance) > 25000 )  background = '#F1B0B7'// 'lightpink'
      if ( Number(variance) <= 0 )  background = '#B1DFBB' //'darkseagreen'


      return { background }

    },



  },

  created() {

    this.loadData()

  }


}

</script>
