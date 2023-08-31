<template>

  <b-row>
    <b-col>





      <b-card>



        <b-card-title
          class="mb-1"
        >

          <div class="d-flex justify-content-between">

             <strong>Cruise Sales Overview</strong>

             <div class="form-group d-flex align-items-center">



                <date-picker
                  id="input-year"
                  v-model="year"
                  type="year"
                  placeholder="Select year"
                  :clearable="false"
                  style="width: 100px"
                  class="float-right"
                />

             </div>


          </div>

        </b-card-title>






        <!-- mostrar variante del reporte que incluye allotment  -->
        <b-row>
          <b-col>
              <b-form-checkbox
                v-model="showAllotment"
                switch
                size="sm"
                class="mr-5 mb-2"
              ><small>Include unconfirmed reservations</small>
              </b-form-checkbox>
          </b-col>
        </b-row>



        <!-- seccion de data  -->
        <b-row>

          <b-col
            lg="4"
            md="6"
            v-for="cruise in cruises"
            :key="cruise.cruId"
            class="px-3"
          >

            <template v-if="showAllotment">
              <cruise-sales-targets-allotment-item
                :year="formattedYear"
                :cruise="cruise"
              />
            </template>

            <template v-else>
              <cruise-sales-targets-item
                :year="formattedYear"
                :cruise="cruise"
              />
            </template>

          </b-col>



        </b-row>


      </b-card>

    </b-col>
  </b-row>

</template>


<script>


import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import moment from 'moment'

import CruiseServices from '@/services/gps/cruise/CruiseServices'

export default {

  name: 'CruiseSalesOverview',

  components: {
    DatePicker,
    CruiseSalesTargetsItem: () => import('@/views/app/gps/reports/cruise-sales-overview/CruiseSalesTargetsItem'),
    CruiseSalesTargetsAllotmentItem: () => import('@/views/app/gps/reports/cruise-sales-overview/CruiseSalesTargetsAllotmentItem')
  },

  data(){
    return {

      year: new Date(),

      cruises: [],

      showAllotment: false

    }
  },

  computed: {

    formattedYear(){
      return moment(this.year).format('YYYY')
    }

  },

  methods: {

    async getOwnCruises(){

      const { data } = await CruiseServices.getOwnCruises()

      this.cruises = data


    }



  },

  created() {

    this.getOwnCruises()

  }



}

</script>
