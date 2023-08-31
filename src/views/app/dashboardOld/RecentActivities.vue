<template>

<!-- OBSOLETO. 
ARCHIVO HABIL: RecentActivityDashboard -->

  <b-card>
    <div class="card-title mb-0">
      <div class="d-flex">
        <h4 class="w-40 mb-0 mt-1">{{ $t("gps.recent-activity") }}</h4>
       <!--  {{resentActivities}} -->
        <b-refresh-button
          style="padding: 0.7rem"
          @click="this.getBookingsAudits"
        />
        <div class="w-50">
          <b-form-group inline size="sm">
            <b-form-input
              style="height: calc(1.3em + 0.5rem + 2px); font-size: 0.75rem"
              class="float-right"
              id="filter-input"
              v-model="filter"
              type="search"
              size="sm"
              placeholder="Search Activity"
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
    </div>

    <!-- {{allQuotes}} -->
    <div class="col-md-6 float-right">
      <!--a href="#" @click="this.getActiveQuotes" > <i style="float:right" 
           
            class="glyph-icon iconsminds-refresh mr-1"
          ></i></a-->

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

    <vue-perfect-scrollbar
      :class="resentActivities.lenght > 0 || resentActivities.lenght < 7 ? 'inactive' : '' " class="scroll dashboard dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
    >
      <b-table
        :items="resentActivities"
        :fields="fields"
        :filter="filter"
        show-empty
        small
        bordered
        class="dsh-resent table-striped"
      >
        <template #cell(Yacht)="data">
          {{ data.item.cruName }}
        </template>
        <template #cell(cotReferencia)="data">
          <small class="text-left"
            ><strong>Atc user: {{ data.item.name }}</strong></small
          >
          <small class="text-muted">
            <strong>
              {{
                moment(data.item.audFecha).format("ddd, MMMM Do YYYY, h:mm:ss A")
              }}</strong
            >
          </small>
          <span :class="formatColorAction(data.item.audEstado) + ' status float-right'">
            {{ formatAction(data.item.audEstado) }}
          </span>
          <br />
          <span class="text-left"
            ><br />
            <small
              ><strong>Client: </strong> <strong class="text-info">{{ data.item.razon_social }}</strong></small
            > </span
          ><br />
          <span class="mt-2 text-muted audNota">{{
            data.item.audNota
          }}</span>
        </template>
      </b-table>
    </vue-perfect-scrollbar>
  </b-card>
</template>


<script>
import DashboardServices from "../../../services/gps/dashboard/DashboardServices.js";
import CruiseServices from "../../../services/gps/cruise/CruiseServices.js";
import MetadataServices from "../../../services/gps/metadata/MetadataServices.js";
export default {
  name: "RecentActivities",
  data() {
    return {
      resentActivities: [],
      loading: false,
      filterYatchsList: "",
      statusList: "",
      selectedFilterYatchs: [],
      filterYatchs: [],
      value: "",
      actions: [],
      filter: null,
      fields: [
        {
          key: "Yacht",
          label: "Yacht",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate col-lg-2",
        },
        {
          key: "cotReferencia",
          label: "Reference",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate",
        },
      ],
    };
  },
  computed: {
    
  },
  methods: {
    getBookingsAudits() {
      this.loading = true;
      DashboardServices.getBookingsAudits()
        .then((response) => {
          this.resentActivities = response.data.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },

    getAllCruises() {
      CruiseServices.getCruises()
        .then((response) => {
          this.filterYatchsList = response.data.data;
        })
        .catch((error) => {
          console.log("Error: " + error);
        });

      this.getAllStatus();
    },
    getAllStatus() {
      MetadataServices.getMetadataByGroup(18)
        .then((response) => {
          this.statusList = response.data.data;
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
    formatAction(status) {
      switch (status) {
        case 2:
          return "Hold";
        case 1:
          return "Confirmed";
        case 3:
          return "Cancel";
        case 5:
          return "Allowment";
        case 10:
          return "Timed out of Time Limit";
        case 11:
          return "Change Time Limit";
        default:
          return "No defined";
      }
    },
    formatColorAction(status) {
      switch (status) {
        case 2: //Hold
          return "badge badge-warning";
        case 1: //Confirmed
          return "badge badge-success";  
        case 3: // Cancel
          return "badge badge-danger";
        case 5: // Allotment
          return "badge badge-info";
        default:
          // Default
          return "badge badge-primary";
      }
    },

    filterByYatchs: function (item) {
      if (this.selectedFilterYatchs.length === 0) {
        return true;
      } else {
        var selectedYatchs = this.selectedFilterYatchs;
        let filterArray = selectedYatchs.map((a) => a.cruId);
        return filterArray.includes(item.cruId);
      }
    },
    filterByActions: function (item) {
      if (this.actions.length === 0) {
        return true;
      } else {
        var selectedActions = this.actions;
        let filterArray = selectedActions.map((a) => a.metCodigo);
        return filterArray.includes(item.audEstado);
      }
    },
  },
  mounted() {
    this.getBookingsAudits();
    this.getAllCruises();
  },
};
</script>
