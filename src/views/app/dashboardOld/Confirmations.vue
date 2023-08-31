<template>

<!-- OBSOLETO. 
ARCHIVO HABIL: ConfirmationsDashboard -->

  <b-card>
    <div class="card-title mb-0">
      <div class="d-flex">
        <h4 class="w-40 mb-0 mt-1">{{ $t("gps.confirmations") }}</h4>
        <b-refresh-button style="padding: 0.7rem" @click="this.getConfirmations" />
        <div class="w-50">
          <b-form-group inline size="sm">
            <b-form-input style="height: calc(1.3em + 0.5rem + 2px); font-size: 0.75rem" class="float-right"
              id="filter-input" v-model="filter" type="search" size="sm" placeholder="Search Confirmation">
            </b-form-input>
          </b-form-group>
        </div>
      </div>
    </div>

    <!-- {{allQuotes}} -->
    <div class="col-md-6 float-right">

      <div class="text-center" v-if="loading">
        <b-button variant="dark" disabled>
          <b-spinner small></b-spinner>
          <span class="sr-only">Loading...</span>
        </b-button>

        <b-button variant="dark" disabled>
          <b-spinner small type="grow"></b-spinner>
          Loading...
        </b-button>
      </div>
    </div>


    <vue-perfect-scrollbar :class="confirmaciones.lenght > 0 || confirmaciones.lenght < 7 ? 'inactive' : ''"
      class="scroll dashboard dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }">
      <b-table :items="confirmaciones" :fields="fields" :filter="filter" show-empty small bordered class="dsh-resent">


        <template v-slot:head(cofCodigo)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(cofReferencia)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(nombrecliente)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(name)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(cofFechaVenta)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>

        <template #cell(cofCodigo)="data">
          <center>
            <a href="#" @click="gotoconfirmations(data.item.cofId)"
              class="badge badge-success status h6">{{ data.item.cofCodigo }}</a>
          </center>
        </template>
        <template #cell(cofReferencia)="data">
          <small class="mb-0 mr-2 text-muted">{{
            data.item.cofReferencia
          }}</small>
        </template>
        <template #cell(nombrecliente)="data">
          <small class="mb-0 mr-2 text-muted">{{
            data.item.nombrecliente
          }}</small>
        </template>
        <template #cell(name)="data">
          <small class="mb-0 mr-2 text-muted">{{ data.item.name }}</small>
        </template>
        <template #cell(cofFechaVenta)="data">
          <small class="mb-0 mr-2 text-muted">
            {{ moment(data.item.cofFechaVenta).format("ll")}}
          </small>
        </template>

      </b-table>
    </vue-perfect-scrollbar>
  </b-card>
</template>

<script>
  import DashboardServices from "../../../services/gps/dashboard/DashboardServices.js";
  import MailServices from "../../../services/gps/mail/MailServices.js";
  import moment from "moment";
  export default {
    name: "LastConfirmations",

    data() {
      return {
        filter: null,
        loading: false,
        fields: [{
            key: "cofCodigo",
            label: "Code",
            sortable: false,
            sortDirection: "desc",
            tdClass: "list-item-enddate",
          },
          {
            key: "cofReferencia",
            label: "Reference",
            sortable: false,
            sortDirection: "desc",
            tdClass: "list-item-enddate",
          },
          {
            key: "nombrecliente",
            label: "Client",
            sortable: false,
            sortDirection: "desc",
            tdClass: "list-item-enddate",
          },

          {
            key: "name",
            label: "User",
            sortable: false,
            sortDirection: "desc",
            tdClass: "list-item-enddate text-center",
          },
          {
            key: "cofFechaVenta",
            label: "Date",
            sortable: false,
            sortDirection: "desc",
            tdClass: "list-item-enddate text-center",
          },
        ],
        confirmaciones: [],
      };
    },
    computed: {
      rows() {
        return this.allQuotes.length;
      },
    },
    methods: {
      getConfirmations() {
        this.loading = true;
        DashboardServices.getConfirmations()

          .then((response) => {
            this.confirmaciones = response.data.data;
            this.loading = false;
          })

          .catch((error) => {
            console.log("Error: " + error);
          });
      },
    },
    mounted() {
      this.getConfirmations();
    },
  };

</script>
