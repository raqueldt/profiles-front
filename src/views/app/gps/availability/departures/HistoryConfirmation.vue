<template>
  <div class="container-fluid m-0 p-0">

    <div v-if="loading" class="d-flex align-items-center">
      <div class="mx-auto my-4">
        <b-spinner variant="primary" label="Text Centered"></b-spinner>
        <span class="text-primary">Loading</span>
      </div>
    </div>

    <div v-else>



    <div v-if="historyconfirmation.length > 0">
      <b-table 
        :striped="true"
        :items="historyconfirmation" 
        :fields="fieldshistory"  
        bordered 
        small         
        table-class="text-nowrap rounded" 
        responsive rounded>

        <template v-slot:head(Date)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(User)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(Action)="data">
          <div class="text-center">{{ data.label }}</div>
        </template> 


        <template #cell(Date)="row">
          <center>
            <!-- <span>{{ row.item.audFecha }}</span> -->
            <span> {{ formatDate( row.item.audFecha) }} </span>
          </center>
        </template>
        <template #cell(User)="row">
          <center>
            <span>{{ row.item.name }}</span>
          </center>
        </template>
        <template #cell(Action)="row">
          <span>{{ row.item.audNota }}</span>
        </template>
      </b-table>
    </div>
    <div v-else>
      <b-card>
        <b-card-body class="text-center">
          <!--    <b-img
            src="/assets/img/atc/empty-state/no_result_found.png"
            fluid
            alt="No result found"
            width="200
            "
          /> -->

          <b-card-title
            ><h1><strong>No interactions</strong></h1></b-card-title
          >
        </b-card-body>
      </b-card>
    </div>

  </div>


  </div>
</template>

<script>
import CotizacionesServices from "@/services/gps/cotizaciones/CotizacionesServices";
import DashboardServices from "@/services/gps/dashboard/DashboardServices.js";
import moment from "moment";
export default {
  name: "HistoryQuote",
  props: ["cofId"],
  data() {
    return {
      historyconfirmation: [],
      fieldshistory: ["Date", "User", "Action"],
      loading: false
    };
  },

  methods: {
    async getHistoryConfirmation() {
      this.loading = true;
      await DashboardServices.getHistoryConfirmation(this.cofId)
        .then(response => {
          this.historyconfirmation = response.data.data;

          this.historyconfirmation.forEach(function(i, idx, array){
            if (idx === array.length - 1){ 
                i._rowVariant= 'success'
            }
          });          
        })
        .catch(error => {
          console.log(error);
        }) .finally(() => (this.loading = false));
    },
    formatDate(fecha) {
      if (fecha) return moment(fecha).format("D MMMM  YYYY, ddd HH:mm:ss");
      else return null;
    },      
  },
  mounted() {
    this.getHistoryConfirmation();
  }
};
</script>
