<template>
  <b-card>
    <div class="card-title mb-0">
      <div class="d-flex">
        <h4 class="w-40 mb-0 mt-1 text-primary">
          {{ $t("gps.confirmations") }}
        </h4>
        <b-refresh-button
          style="padding: 0.7rem"
          @click="this.getConfirmations"
        />
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
              style="height: calc(2em + 0.5rem + 2px); font-size: 0.75rem"
              class="float-right"
              id="filter-input"
              v-model="filter"
              type="search"
              size="sm"
              placeholder="Search Confirmation"
            >
            </b-form-input>
          </b-form-group>
        </div>
      </div>
    </div>

    <!-- {{allQuotes}} -->
    <!-- <div class="col-md-6 float-right">

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

    <vue-perfect-scrollbar
      :class="
        confirmaciones.lenght > 0 || confirmaciones.lenght < 7 ? 'inactive' : ''
      "
      class="scroll dashboard dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
    >
      <b-table
        :sticky-header="true"
        :items="searchResult"
        :fields="fields"
        :filter="filter"
        show-empty
        small
        bordered
        class="dsh-resent border-table p-0"
        thead-class="border-table"
      >
        <!-- TAMAÑO DE CELDAS -->

        <template v-slot:table-colgroup>
          <col style="width: 10px !important; border:solid 1px red;" />
          <col style="width: 60rem" />
          <col style="width: 50rem" />
          <col style="width: 50rem" />
          <col style="width: 80rem" />
        </template>

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
          <div class="text-center w-25" style="width: 80px !important; ">
            <center>
              <a
                v-if="data.item.cofEstado == 1"
                href="#"
                v-tooltip="{
                  content: `${$t('gps.tooltips.general-information')}`
                }"
                @click="gotoconfirmations(data.item.cofId)"
                class="badge badge-success status h6"
                >{{ data.item.cofCodigo }}</a
              >
              <a
                v-else
                href="#"
                v-tooltip="{
                  content: `${$t('gps.tooltips.general-information')}`
                }"
                class="badge badge-danger status h6"
                >{{ data.item.cofCodigo }}</a
              >
            </center>
          </div>
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
            {{ moment(data.item.cofFechaVenta).format("DD MMM YYYY, ddd  ") }}
          </small>
        </template>
      </b-table>
    </vue-perfect-scrollbar>
  </b-card>
</template>

<script>
import DashboardServices from "../../../../services/gps/dashboard/DashboardServices.js";
import MailServices from "../../../../services/gps/mail/MailServices.js";
import moment from "moment";
export default {
  name: "LastConfirmations",

  data() {
    return {
      namesUser: [],
      selecteduser: null,
      filter: null,
      loading: false,
      fields: [
        {
          key: "cofCodigo",
          label: "Code",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate w-15"
        },
        {
          key: "cofReferencia",
          label: "Reference",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate"
        },
        {
          key: "nombrecliente",
          label: "Client",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate"
        },

        {
          key: "name",
          label: "User",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate text-center"
        },
        {
          key: "cofFechaVenta",
          label: "Date",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate text-center"
        }
      ],
      confirmaciones: []
    };
  },
  computed: {
    searchResult() {
      let tempRecipes = this.confirmaciones;

      if (this.selecteduser != "" && this.selecteduser) {
        tempRecipes = tempRecipes.filter(item => {
          return item.name.includes(this.selecteduser);
        });
      }

      return tempRecipes;
    },
    rows() {
      return this.confirmaciones.length;
    }
  },
  methods: {
    gotoconfirmations(id) {
      let routeData = this.$router.resolve({
        name: "confirmations",
        params: { cofId: id }
      });
      window.open(routeData.href, "_blank");
    },
    getConfirmations() {
      this.loading = true;
      DashboardServices.getConfirmations()

        .then(response => {
          this.confirmaciones = response.data.data;
          this.loading = false;

          this.selecteduser = null;

          if (this.confirmaciones.length > 0) {
            let myArray = this.confirmaciones;
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
    }
  },
  mounted() {
    this.getConfirmations();
  }
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