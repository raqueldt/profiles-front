<template>
  <b-card>
    <div class="card-title mb-0">
      <div class="d-flex">
        <h5 class="w-40 mb-0 mt-1 text-primary">
          {{ $t("gps.pax-country") }}
        </h5>
        <b-refresh-button style="padding: 0.7rem" @click="this.getPaxCountry" />
        <div></div>

        <div class="w-25">
          <b-form-group inline size="sm">
            <b-form-select
              v-model="selecteduser"
              style="height: calc(2em + 0.5rem + 1px); font-size: 0.75rem"
              :options="namesUser"
              size="sm"
              text-field="userName"
              value-field="userName"
            >
              <template #first>
                <b-form-select-option disabled :value="null">
                  All Users
                </b-form-select-option>
              </template>
            </b-form-select>
          </b-form-group>
        </div>

        <div class="w-25">
          <b-form-group inline size="sm">
            <b-form-input
              style="height: calc(2em + 0.5rem + 1px); font-size: 0.75rem"
              class="float-right"
              id="filter-input"
              v-model="filter"
              type="search"
              size="sm"
              placeholder="Searh files "
            >
            </b-form-input>
          </b-form-group>
        </div>
      </div>
    </div>

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

    <vue-perfect-scrollbar
      class="scroll dashboard dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
    >
      <b-table
        sticky-header
        :items="searchResult"
        :fields="fields"
        :filter="filter"
        show-empty
        small
        bordered
        hover
        class="dsh-resent border-table p-0"
        thead-class="border-table"
      >
        <!-- información de la tabla -->

        <template #cell(cofCodigo)="data">
          <center>
            <a
              @click="gotoconfirmations(data.item.cofId)"
              style="color: white; cursor: pointer"
              class="badge badge-success status h6"
              >{{ data.item.cofCodigo }}</a
            >
          </center>
        </template>
        <template #cell(cofReferencia)="data">
          <small class="mb-0 text-muted">{{ data.item.cofReferencia }}</small>
        </template>

        <template #cell(name)="data">
          <center>
            <small class="mb-0 mr-2 text-muted">{{ data.item.name }}</small>
          </center>
        </template>

        <template #cell(cofInicio)="data">
          <small class="text-muted d-block">
            {{ moment(data.item.cofInicio).format("DD MMM YYYY, ddd  ") }} -
          </small>
          <small class="text-muted d-block">
            {{ moment(data.item.cofFinal).format("DD MMM YYYY, ddd  ") }}
          </small>
        </template>
        <!--       <template #cell(cofFinal)="data">
          <small class="mb-0 mr-2 text-muted">
            {{ moment(data.item.cofFinal).format("DD MMM YYYY, ddd  ") }}
          </small>
        </template> -->
      </b-table>
    </vue-perfect-scrollbar>
  </b-card>
</template>

<script>
import DashboardServices from "../../../../services/gps/dashboard/DashboardServices.js";

export default {
  name: "PaxContry",

  data() {
    return {
      namesUser: [],
      selecteduser: null,
      filter: null,
      pasajerosPais: [],
      loading: false,
      fields: [
        {
          key: "cofCodigo",
          label: "Code",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate align-middle"
        },
        {
          key: "cofReferencia",
          label: "Reference",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate align-middle"
        },
        {
          key: "name",
          label: "Seller",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate align-middle"
        },
        {
          key: "cofInicio",
          label: "Tour Dates",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate align-middle"
        }
        /*         {
          key: "cofFinal",
          label: "End Date",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate",
        }, */
      ]
    };
  },
  /*     watch: {
        selecteduser (){
      
        this.pasajerosPais = this.pasajerosPais.map((a) => a.name);
        return this.pasajerosPais.includes(this.selecteduser);

        },
 
  }, */
  computed: {
    searchResult() {
      let tempRecipes = this.pasajerosPais;

      if (this.selecteduser != "" && this.selecteduser) {
        tempRecipes = tempRecipes.filter(item => {
          return item.name.includes(this.selecteduser);
        });
      }

      return tempRecipes;
    },
    rows() {
      return this.pasajerosPais.length;
    }
  },
  mounted() {
    this.getPaxCountry();
  },

  methods: {
    getPaxCountry() {
      this.loading = true;
      DashboardServices.getPaxCountry()
        .then(response => {
          this.pasajerosPais = response.data.data;
          this.loading = false;

          this.selecteduser = null;

          if (this.pasajerosPais.length > 0) {
            let myArray = this.pasajerosPais;
            let groups = Object.create(null);
            let grouped = [];

            myArray.forEach(function(o) {
              if (!groups[o.name]) {
                groups[o.name] = [];
                grouped.push({
                  userName: o.name
                });
              }
            });

            this.namesUser = grouped;
          }
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    },
    gotoconfirmations(id) {
      let routeData = this.$router.resolve({
        name: "confirmations",
        params: {
          cofId: id
        }
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style scoped>
* >>> .table.dsh-resent th,
.table-sm.dsh-resent th,
.table-sm.dsh-resent td {
  border-color: #b6b3b3 !important;
  text-align: center;
  font-size: 13px;
}
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

* >>> .b-table-sticky-header {
  max-height: 1900px !important;
}

* >>> .scroll-area {
  height: 100%;
}

.text-time-limit {
  font-size: 12px;
}
</style>
