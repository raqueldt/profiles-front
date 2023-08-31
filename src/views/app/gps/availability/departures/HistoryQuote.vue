<template>
  <div class="container-fluid m-0 p-0">
    
    <div v-if="loading" class="d-flex align-items-center">
      <div class="mx-auto my-4">
        <b-spinner variant="primary" label="Text Centered"></b-spinner>
        <span class="text-primary">Loading</span>
      </div>
    </div>

    <div v-else>
      <div v-if="history_quote.length > 0">
        <b-table
          :striped="true"
          :items="history_quote"
          :fields="fieldshistory"
          bordered
          small
          table-class="text-nowrap"
          responsive
        >
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
            <!-- <span>{{ row.item.audFecha }}</span><br> -->
            <center>
              <span> {{ formatDate(row.item.audFecha) }} </span>
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
            <b-card-title
              ><h3><strong>No interactions</strong></h3></b-card-title
            >
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import CotizacionesServices from "@/services/gps/cotizaciones/CotizacionesServices";
import moment from "moment";
export default {
  name: "HistoryQuote",
  props: ["cotId"],
  data() {
    return {
      history_quote: [],
      fieldshistory: ["Date", "User", "Action"],
      loading: false

      // _rowVariant: 'success'
    };
  },

  methods: {
    async historyQuote() {
      this.loading = true;
      await CotizacionesServices.historyQuote(this.cotId)
        .then(response => {
          this.history_quote = response.data.data;

          // Resaltar el último elemento de la tabla
          this.history_quote.forEach(function(i, idx, array) {
            if (idx === array.length - 1) {
              i._rowVariant = "success";
            }
          });

          //    location.reload();
        })
        .catch(error => {
          console.log("Error: " + error);
        })
        .finally(() => (this.loading = false));
    },
    formatDate(fecha) {
      if (fecha) return moment(fecha).format("D MMMM  YYYY, ddd HH:mm:ss");
      else return null;
    }
  },
  mounted() {
    this.historyQuote();
  }
};
</script>
