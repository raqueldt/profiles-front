<template>

<b-card title="Critical Months" class="shadow p-2 mt-3"  header-text-variant="primary">
  
  <div class="container-fluid w-100 my-4 pb-4">

    <h1>{{ cruise }}</h1>
    <!-- <h1 class="text-primary">Critical Months</h1> -->

    <template v-if="!isLoading && arrayResult.length === 0">

      <div class="d-flex justify-content-center mb-3">
        <b-spinner style="width: 4rem; height: 4rem;" label="Loading..." variant="primary"></b-spinner>
      </div>

    </template>
    <template v-else>

      <b-row class=" justify-content-center mt-2" >

        <div v-for="(boat, index) in arrayResult" :key="index">

          <div class="dashboard-donut-chart text-center" v-if=" (Boolean(boat) && (boat.datasets.length > 0)) ">

            <doughnut-chart :data="boat" shadow />
            <center>
              <h5 class="text-primary">{{ boat.cruise}}</h5>
              <h6 class="font-italic">{{ boat.month }}</h6>
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
          <hr class="text-primary">
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
    props: ["data", "cruise"],
    components: {
      "doughnut-chart": DoughnutChart
    },
    data() {
      return {
        result1: {},
        result2: {},
        result3: {},
        arrayResult: [],
        mensajeNoData: "There is no critical month information for the selected filters. The values ​​exceed 35% to achieve the target",
        displayNoResultMessage: false,
        isLoading: false,
        months:[1,2,3,4,5,6,7,8,9,10,11,12]
      }
    },

    watch: {
      data: {
        immediate: true,
        deep:true,
        handler:function(val) {
          if(Boolean(val)){
            this.cleanObjects();
            this.getMinorTotal();
          }         
        },
      },
    },

    methods: {
      cleanObjects() {
        this.arrayResult = [];
      },

      async getMinorTotal() {
            this.isLoading = false;
            if (Boolean(this.data)) {
              this.displayNoResultMessage = false;
              var salesArray = this.data.map(x => ({
                tgtMonth: x.tgtMonth,
                tgtValue: x.tgtValue,
                totalSales: x.totalSales,
                cruName: x.cruName,
                variance: x.variance,
                percentSales: x.percentSales,
              }));

              // En caso de seleccionar un barco, extraigo los 3 meses mas bajos de ese barco
              // Caso contrario, extraigo los 3 meses más bajos del total (sin discriminar barco)
              // Prop enviado desde parent: cruise
              let salesMinor = "";
              if(Boolean(this.cruise) || this.cruise != null){
                //console.log("Seleccioné un barco")
                salesMinor = await this.top3MinorValueByCruise(salesArray);                
              }
              else {
                //console.log("Seleccioné TODOS los barcos")
                salesMinor = await this.top3MinorValueByMonth(salesArray);
              }

              let [res1, res2, res3] = salesMinor;

              if (res1) this.arrayResult.push(this.buildArray(res1));
              if (res2) this.arrayResult.push(this.buildArray(res2));
              if (res3) this.arrayResult.push(this.buildArray(res3));
              
              if( Boolean(this.arrayResult.length > 0) ) this.isLoading = true;
              else {
                this.displayNoResultMessage = true;
                this.isLoading = true;
              }
            } 
            else {
              this.displayNoResultMessage = true;
              this.isLoading = true;
            }
        
      },

      top3MinorValueByCruise(arraySales) {
        arraySales = arraySales.sort((a, b) => a.totalSales - b.totalSales).filter((el) => {
          return (el.totalSales > 0 && el.percentSales <= 35)
        });
        return [arraySales[0], arraySales[1], arraySales[2]];
      },
      top3MinorValueByMonth(arraySales) { 

        let totalArrayByMonth = [];       
        this.months.forEach(month => {
          
          var filteredByMonth = arraySales.filter(f => parseInt(f.tgtMonth) === parseInt(month));

          let totalTgtValue ="";
          let totalSales ="";
          let totalVariance ="";
          let totalPercentSales ="";
          filteredByMonth.forEach(function(e, i, array){

            totalTgtValue = array.reduce((total, item)=>{
                return parseFloat(total) + parseFloat(item.tgtValue)
              },0).toFixed(2)
             
              totalSales = array.reduce((total, item)=>{
                return parseFloat(total) + parseFloat(item.totalSales)
              },0).toFixed(2)
              totalVariance = array.reduce((total, item)=>{
                return parseFloat(total) + parseFloat(item.variance)
              },0).toFixed(2)
              totalPercentSales = ((totalSales * 100) / totalTgtValue).toFixed(2);
          });

          totalArrayByMonth.push({
              tgtMonth: month,
              tgtValue: totalTgtValue,
              totalSales: totalSales,
              variance: totalVariance,
              totalPercentSales: totalPercentSales
            })
          
        });

        // console.log("Resultado: " + JSON.stringify(totalArrayByMonth))

        return totalArrayByMonth.sort((a, b) => a.totalSales - b.totalSales).filter((el) => {
          return (el.totalSales > 0 && el.totalPercentSales <= 35)
        });       

      },      

      buildArray(array) {
        var sold = array.totalSales;
        var variance = array.variance;
        var month = this.monthName(array.tgtMonth);
        var cruise = array.cruName;

        var finalArray = {
          "month": month,
          "cruise": cruise,
          "labels": [
            "Sold",
            "Remaining",
          ],
          "datasets": [{
            "label": "",
            "borderColor": [
              "#e7523e",
              "#d6a779",
            ],
            "backgroundColor": [
              "rgba(231, 82, 62, 0.1)",
              "rgba(214, 167, 121, 0.1)",
            ],
            "borderWidth": 2,
            "data": [
              sold,
              variance,
            ]
          }]
        }
        return finalArray;
      },
      monthName(month) {
        var response = '';
        switch (parseInt(month)) {
          case 1:
            response = "January"
            break;
          case 2:
            response = "February"
            break;
          case 3:
            response = "March"
            break;
          case 4:
            response = "April"
            break;
          case 5:
            response = "May"
            break;
          case 6:
            response = "June"
            break;
          case 7:
            response = "July"
            break;
          case 8:
            response = "August"
            break;
          case 9:
            response = "September"
            break;
          case 10:
            response = "October"
            break;
          case 11:
            response = "November"
            break;
          case 12:
            response = "December"
            break;
          default:
            response = "No specified month"
        }
        return response;
      }

    },
    async mounted() {

    }
  }

</script>

