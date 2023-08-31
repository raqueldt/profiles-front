<template>

  <b-container fluid>

    <b-row>
      <b-colxx xxs="12">
        <span>
          <h1>Targets</h1>
          <ul class="
              nav
              pt-0
              breadcrumb-container
              d-none d-sm-block d-lg-inline-block
            ">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/app" class="active" target="_self">{{
                  $t("menu.home")
                }}</a>
              </li>
              <li class="breadcrumb-item active">
                <span aria-current="location">Targets</span>
              </li>
            </ol>
          </ul>
        </span>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>

    <!-- Data: {{ Object.keys(dataAllSalesTargets).length }}<br>
    Original:{{ Object.keys(originalDataAllSalesTargets).length }}<br> -->


<!-- FILTROS -->
    <b-row class="fixed-top filters" id="filters">
      <b-col lg="8"></b-col>
      <b-col lg="4">
        <b-row>
          <b-col>
            <b-form-select v-model="searchCruise" :options="cruises" size="sm" class="mt-3 d-inline" value-field="cruId"
              text-field="cruName">
              <template #first>
                <b-form-select-option :value="null">-- Select all cruises --</b-form-select-option>
              </template>
            </b-form-select>
          </b-col>
          <b-col>
            <b-form-select v-model="searchYear" :options="optionsYears" size="sm" class="mt-3  d-inline">
            </b-form-select>
            <small class="float-right"> Found: {{ Object.keys(dataAllSalesTargets).length }} element(s)</small>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- FIN FILTROS -->


    <b-row v-if="Boolean(dataAllSalesTargets)" style="margin-top: -35px;">

      <b-col lg="12">
        <TargetsYearProgress :data="dataAllSalesTargets" />
      </b-col>

      <b-col lg="12">
        <TargetsBoatProgress :cruises="cruises" :data="dataAllSalesTargets"  
        v-if="dataAllSalesTargets.length && cruises.length"/>
      </b-col>

      <b-col lg="12" >
        <TargetsMonthlyProgress :data="dataAllSalesTargets"/>
      </b-col>

      <b-col lg="12" v-show="false">
        <TargetsCriticalMonths :data="dataAllSalesTargets" :cruise="searchCruise" v-if="dataAllSalesTargets.length"/>
      </b-col>

    </b-row>

  </b-container>
</template>

<script>
  import moment from "moment";
  import TargetsBoatProgress from "@/views/app/gps/targets/components/TargetsBoatProgress.vue"
  import TargetsCriticalMonths from "@/views/app/gps/targets/components/TargetsCriticalMonths.vue"
  import TargetsMonthlyProgress from "@/views/app/gps/targets/components/TargetsMonthlyProgress.vue"
  import TargetsYearProgress from "@/views/app/gps/targets/components/TargetsYearProgress.vue"
  import ReportsServices from '@/services/gps/reports/ReportsServices'
  import CruiseServices from '@/services/gps/cruise/CruiseServices'

  export default {

    name: "Availability",
    components: {
      TargetsBoatProgress,
      TargetsCriticalMonths,
      TargetsMonthlyProgress,
      TargetsYearProgress

    },

    data() {
      return {

        //dataSalesTargets: [],
        dataAllSalesTargets: [],
        originalDataAllSalesTargets: [],
        cruises: [],

        optionsYears: [],
        year: moment().format("YYYY"),
        initYear: "2022",

        searchYear: moment().format("YYYY"),
        searchCruise: null

      };
    },

    computed: {


    },

    watch: {

      searchYear: function () {
        this.searchCruise = null;
        this.filterbyYear();
      },
      searchCruise: function () {
        this.filterByCruise();
      }

    },

    methods: {

      filterbyYear() {
        this.getAllSalesOverview()
      },

      filterByCruise() {
        if (Boolean(this.searchCruise))
          this.dataAllSalesTargets = this.originalDataAllSalesTargets.filter(f => f.cruId === this.searchCruise);
        else this.dataAllSalesTargets = this.originalDataAllSalesTargets;

      },

      async getAllCruises() {
        await CruiseServices.getCruises()
          .then(response => {

            response.data.data.sort(
              (c1, c2) => c1.cruId > c2.cruId
            );

            this.cruises = response.data.data;
          })
          .catch(error => {
            console.log("Error: " + error);
          });
      },

      async getAllSalesOverview() {
        this.dataAllSalesTargets = [];
        this.originalDataAllSalesTargets = [];

        let cruisesList = this.cruises.map(x => ({
          cruId: x.cruId,
          cruName: x.cruName
        }));
        var self = this;

        await cruisesList.forEach(async (el) => {
          
          await ReportsServices.getCruiseSalesOverview(self.getParams(el.cruId))
            .then(async (response) => {
              response.data.forEach(async (e) => {
                e.cruId = el.cruId;
                e.cruName = el.cruName;
                e.tgtValue = Number(e.tgtValue).toFixed(2)
                e.totalSales = Number(e.totalSales).toFixed(2)
                e.variance = Number(e.variance).toFixed(2)
                //e.totalSales = parseFloat(e.totalSales.toFixed(2))
                //e.variance = parseFloat(e.variance.toFixed(2))

                if(e.tgtValue > 0)
                  e.percentSales = parseFloat((e.totalSales * 100)/e.tgtValue).toFixed(2);
                else 
                  e.percentSales = 0;
              })
              await self.dataAllSalesTargets.push(...response.data)
              await self.originalDataAllSalesTargets.push(...response.data)
            })
        });

        // Elimino datos repetidos
        this.dataAllSalesTargets = this.dataAllSalesTargets.filter((item, index) => {
          return data.indexOf(item) === index;
        })
        this.originalDataAllSalesTargets = this.originalDataAllSalesTargets.filter((item, index) => {
          return data.indexOf(item) === index;
        })


      },

      getParams(cruiseId) {
        var params = {};
        return params = {
          inicio: moment(this.searchYear).startOf('year').format('YYYY-MM-DD'),
          fin: moment(this.searchYear).endOf('year').format('YYYY-MM-DD'),
          cruise: cruiseId
        }
      },
      yearArray() {
        var year = [];
        for (var i = this.initYear; i <= this.year; i++) {
          year.push(i.toString());
        }
        this.optionsYears = year;
      },

    },



    async mounted() {     

    },

    async created() {
      await this.yearArray();
      await this.getAllCruises();
      await this.getAllSalesOverview();
    },

  };

</script>


<style  scoped>

* >>>.card-title {
   color: #F19450 !important;
}
* >>>.filters{
    z-index: 99999;
    margin: 65px 3px 0px 3px;
    /* margin-right: 50px; */
    /* margin: 65px 50px 0px 180px; */
}

</style>
