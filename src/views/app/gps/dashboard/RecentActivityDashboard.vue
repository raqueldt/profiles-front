<template>
  <b-card>
    <div class="card-title mb-0">
      <div class="d-flex">
        <h4 class="w-40 mb-0 mt-1 text-primary">{{ $t("gps.recent-activity") }}</h4>
        <!--  {{resentActivities}} -->
        <b-refresh-button style="padding: 0.7rem" @click="refresh()" />
        <div class="w-25">
          <b-form-group inline size="sm">
            <b-form-select v-model="selected" 
            style="height: calc(2em + 0.5rem + 1px); font-size: 0.75rem"
            :options="options"></b-form-select>
          </b-form-group>
        </div>
        <div class="w-25">
          <b-form-group inline size="sm">
            <b-form-input style="height: calc(2em + 0.5rem + 1px); font-size: 0.75rem" class="float-right"
              id="filter-input" v-model="filter" type="search" size="sm" placeholder="Search Activity"></b-form-input>
          </b-form-group>
        </div>
      </div>
    </div>

    <!-- {{allQuotes}} -->
    <!-- <div class="col-md-12">
      <div class="text-center  mb-3" v-if="loading">        
          <b-spinner small></b-spinner>
          <span class="sr-only">Loading...</span>        
      </div>
    </div> -->

    <div v-if="loading" class="d-flex align-items-center"> 
        <div class="mx-auto">
          <div class="semipolar-spinner">
          <div class="ring"></div>
          <div class="ring"></div>
          <div class="ring"></div>
          <div class="ring"></div>
          <div class="ring"></div>
        </div>
        <span class="text-primary">Loading</span>
        </div>
    </div>

    <vue-perfect-scrollbar :class="resentActivities.lenght > 0 || resentActivities.lenght < 7 ? 'inactive' : '' "
      class="scroll dashboard dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }">
      <b-table 
      sticky-header  
        :items="resentActivities" 
        :fields="fields"         
        :filter="filter" 
        show-empty 
        small 
        bordered
        class="dsh-resent border-table p-0"
        thead-class="border-table">

        <!-- CABECERA -->
        <template v-slot:head(Yacht)="data">
            <div class="text-center">{{ data.label }}</div>
        </template>        
        <template v-slot:head(cotReferencia)="data">
            <div class="text-center">{{ data.label }}</div>
        </template>

        <template #cell(Yacht)="data">
          <i class="glyph-icon iconsminds-ship"></i> {{ data.item.cruName }}
        </template>
        <template #cell(cotReferencia)="data">

          <b-row>
            <b-col lg="4" class="m-0">
              <small class="text-left d-block">
                <!-- <strong>ATC user: </strong> -->
                {{ data.item.name }}
              </small>
              <small class="text-muted d-block">
                <strong>
                  {{ moment(data.item.audFecha ).format("DD MMM YYYY, ddd h:mm")}}
                </strong>
              </small>
            </b-col>
            <b-col lg="8" class="m-0">
              <small class="text-info d-block" v-html="data.item.audNota">  </small>
              <small class="text-info d-block">({{data.item.audReferencia}})</small>
              <span class="text-left d-block">
                <small>
                  <strong>{{ Boolean(data.item.razon_social) ? data.item.razon_social : data.item.nombre_empresa }}</strong></small>
              </span>
            </b-col>
          </b-row>


        </template>
      </b-table>
    </vue-perfect-scrollbar>
  </b-card>
</template>


<script>
  import DashboardServices from "../../../../services/gps/dashboard/DashboardServices.js";
  import CruiseServices from "../../../../services/gps/cruise/CruiseServices.js";
  import MetadataServices from "../../../../services/gps/metadata/MetadataServices.js";
  export default {
    name: "RecentActivities",
    data() {
      return {
        resentActivities: [],
        loading: false,
        selected: 1,
        options: [
          { value: 1, text: 'Bookings' },
          { value: 2, text: 'Quotes' },
          { value: 3, text: 'Confirmations' },
        ],
        filterYatchsList: "",
        statusList: "",
        selectedFilterYatchs: [],
        filterYatchs: [],
        value: "",
        actions: [],
        filter: null,
        fields: [{
            key: "Yacht",
            label: "Cruise",
            sortable: false,
            sortDirection: "desc",
            tdClass: "list-item-enddate col-lg-3  align-middle",
          },
          {
            key: "cotReferencia",
            label: "Notes",
            sortable: false,
            sortDirection: "desc",
            tdClass: "list-item-enddate  align-middle",
          },
        ],
      };
    },
    watch: {
    selected: function(newVal, oldVal) {
      this.getBookingsAudits(newVal);
    }
  },
    computed: {

    },
    methods: {
      getBookingsAudits() {
        this.loading = true;
        DashboardServices.getBookingsAudits(this.selected)
          .then((response) => {
            this.resentActivities = response.data.data;
            this.loading = false;
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
      },
      refresh(){
this.selected=1;
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

<style scoped>
/* * >>> .table.dsh-resent th, .table-sm.dsh-resent th, .table-sm.dsh-resent td {
  border-color: #b6b3b3 !important;
  text-align: center;
  font-size: 13px;
} */
/* Estilos de cabecera con sticky header (Fixed al hacer scroll) */
* >>> .b-table-sticky-header > .table.b-table > thead > tr > th {
  background: #b6b3b3;
  text-align: center;
  font-size: 12px;
  color: white;
}
.height-filters {
font-size: 0.7rem !important;
height: calc(2.3rem + 3px) !important;
}

.border-table {
border-radius: 15px !important;
}

.scroll-area  {
position: relative;
margin: auto;
width: 400px;
height: 700px;
}

* >>>.b-table-sticky-header {
max-height: 1900px !important;
}

* >>>.scroll-area {
height: 100%;
}

.text-time-limit{
font-size: 12px;
}

</style>