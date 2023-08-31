<template>

  <b-card title="Boat Progress " class="mt-3 py-0 shadow" >
    <div class="container-fluid w-100 my-2 pb-4">

      <!-- <h1 class="text-primary">Boat Progress</h1> -->

      <template v-if="!isLoading && boatsArray.length === 0">

        <div class="d-flex justify-content-center mb-3">
          <b-spinner style="width: 4rem; height: 4rem;" label="Loading..." variant="primary"></b-spinner>
        </div>

      </template>
      <template v-else>

        <b-row class="container-fluid justify-content-center mt-2 w-100">

          <div v-for="(boat, index) in boatsArray" :key="index">

            <div class="dashboard-donut-chart text-center" v-if=" (Boolean(boat) && (boat.datasets.length > 0)) ">

              <doughnut-chart :data="boat" shadow />

              <!-- <pie-chart :data="boat" shadow /> -->
              <center>
                <h5 class="text-primary">{{ boat.cruise}}</h5>
                <h6 class="font-italic">{{ boat.tgtValue | currency}}</h6>
              </center>

            </div>

          </div>

        </b-row>
        <b-row v-if="displayNoResultMessage" class="justify-content-center mt-2 w-100">
          <!-- <b-alert variant="primary" show>
          <h5>{{ mensajeNoData }}</h5>
        </b-alert> -->

          <b-alert show variant="primary">
            <h4 class="alert-heading">No information!</h4>
            <p>
              {{ mensajeNoData }}
            </p>
            <hr>
            <p class="mb-0">
              Please select a different cruise or year and try again
            </p>
          </b-alert>

        </b-row>

      </template>


    </div>
  </b-card>

</template>

<script>
  import DoughnutChart from "../../../../../components/Charts/Doughnut";
  
  export default {
    props: ["data", "cruises"],
    components: {
      "doughnut-chart": DoughnutChart,      
    },
    data() {
      return {

        boatsArray: [],
        mensajeNoData: "There is no Boat progress information for the selected filters. Please select a different cruise and year",
        displayNoResultMessage: false,
        isLoading: false
      }
    },

    watch: {

      data: function () {
        this.cleanObjects();
        this.startBuildArray();
      },

    },

    methods: {

      cleanObjects() {
        this.boatsArray = [];
      },


      async startBuildArray() {

        //console.log("Data: " + JSON.stringify(this.data))
        //console.log("vslCapacity: " + JSON.stringify(this.cruises))
        //console.log("vslCapacity: " + JSON.stringify(this.cruises))

        if (Boolean(this.data) && Boolean(this.cruises)) {
          var salesArray = this.data.map(x => ({
            tgtMonth: x.tgtMonth,
            tgtValue: Number(x.tgtValue).toFixed(2),
            totalSales: Number(x.totalSales).toFixed(2),
            cruName: x.cruName,
            cruId: x.cruId,
            variance: Number(x.variance).toFixed(2),
          }));

          //console.log("Entre..");

          //let salesMinor = await (salesArray);
          //console.log("salesArray: " + JSON.stringify(salesArray))

          var self = this;

          await this.cruises.forEach(async (el) => {

            //console.log("cruId: " + el.cruId)

            var filterByCruise = salesArray.filter(item => item.cruId === el.cruId);

            var arrayReady = self.buildArray(filterByCruise);

            await self.boatsArray.push(arrayReady);

            if (Boolean(self.boatsArray.length > 0)) this.isLoading = true;
            else {
              this.displayNoResultMessage = true;
              this.isLoading = true;
            }

          });

        } else {
          this.displayNoResultMessage = true;
          this.isLoading = true;
        }
      },

      buildArray(array) {

        if (array.length > 0) {

          var totalTargetValue = array.reduce((total, item) => {
            return parseFloat(total) + parseFloat(item.tgtValue)
          }, 0)

          var totalTargetSales = array.reduce((total, item) => {
            return parseFloat(total) + parseFloat(item.totalSales)
          }, 0).toFixed(2)

          var totalTargetVariance = array.reduce((total, item) => {
            return parseFloat(total) + parseFloat(item.variance)
          }, 0).toFixed(2)

          var finalArray = {
            "cruise": array.map(x => x.cruName)[0],
            "tgtValue": totalTargetValue,
            "labels": [
              // `Sold: ${totalTargetSales}`,
              // ``,
              "Sold",
              "Remaining",
            ],
            "datasets": [{
              "label": "",
              "borderColor": [
                  "#d6a779",  
                  "#e7523e",                
              ],
              "width": 1,
              "backgroundColor": [
                "rgba(214, 167, 121, 0.1)",
                "rgba(231, 82, 62, 0.1)",                
              ],
              "borderWidth": 2,
              "data": [
                totalTargetSales,
                totalTargetVariance,
              ]
            }]
          }

          return finalArray;
        }

      },

    },
    async mounted() {
      //setTimeout(() =>  this.startBuildArray(), 350);
    }
  }

</script>

<style lang="scss" scoped>
  .dashboard-donut-chart {
    width: 270px !important;
    //height: 175px !important;
    //margin-top: 70px;
  }
  

  // .dashboard-donut-chart {
  //   height: 230px;
  //   .chart-container {
  //     height: 230px;
  //   }
  // }

</style>
