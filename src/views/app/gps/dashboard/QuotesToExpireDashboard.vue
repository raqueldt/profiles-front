<template>
  <b-card rounded="top">
    <div class="card-title mb-0">
      <div class="d-flex">
        <h4 class="w-40 mb-0 mt-1 text-primary">
          {{ $t("gps.quotes-to-expire") }}
        </h4>
        <b-refresh-button
          style="padding: 0.7rem"
          @click="this.getBookingsToExpire"
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
              placeholder="Search quotes to expire"
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
      :class="bookings.lenght > 0 || bookings.lenght < 7 ? 'inactive' : ''"
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
        <!-- información de la tabla -->

        <template #cell(Code)="data">
          <!-- v-tooltip="{
                content: `${$t('gps.tooltips.general-information')}`,
              }" -->
          <center>
            <a class="badge badge-warning status h4">{{
              data.item.cotCodigo
            }}</a>
          </center>
        </template>
        <template #cell(Reference)="data">
          <center>
            <small class="mb-0 mr-2 text-muted">{{
              data.item.Reference
            }}</small>
          </center>
        </template>
        <template #cell(Time_Limit)="data">
          <center>
            <small class="mb-0 mr-2 text-muted">
              {{
                moment(data.item.Time_Limit).format("DD MMM YYYY, ddd h:mm  ")
              }}</small
            >
          </center>
        </template>
        <template #cell(Client)="data">
          <center>
            <small class="mb-0 mr-2 text-muted">{{ data.item.Client }}</small>
          </center>
        </template>
        <template #cell(ATC_User)="data">
          <small class="mb-0 mr-2 text-muted">{{ data.item.ATC_User }}</small>
        </template>
        <template #cell(Start_date)="data">
          <small class="mb-0 mr-2 text-muted">
            {{ moment(data.item.Start_date).format("DD MMM YYYY, ddd  ") }}
          </small>
        </template>
      </b-table>
    </vue-perfect-scrollbar>
  </b-card>
</template>

<script>
import BookingServices from "../../../../services/gps/booking/BookingServices.js";
import moment from "moment";
export default {
  name: "QuotesToExpire",

  data() {
    return {
      namesUser: [],
      selecteduser: null,
      filter: null,
      loading: false,
      fields: [
        {
          key: "Code",
          label: "Code",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate"
        },
        {
          // key: "cofFechaVenta",
          key: "Reference",
          label: "Reference",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate text-center"
        },
        {
          key: "Time_Limit",
          label: "Time Limit",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate",
          thStyle: { width: "20%" }
        },
        {
          key: "Client",
          label: "Client",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate"
        },

        {
          key: "ATC_User",
          label: "Seller",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate text-center"
        }
      ],
      bookings: []
    };
  },
  computed: {
    rows() {
      return this.bookings.length;
    },
    searchResult() {
      let tempRecipes = this.bookings;

      if (this.selecteduser != "" && this.selecteduser) {
        tempRecipes = tempRecipes.filter(item => {
          return item.ATC_User.includes(this.selecteduser);
        });
      }

      return tempRecipes;
    }
  },
  methods: {
    getBookingsToExpire() {
      this.loading = true;

      BookingServices.getBookingsToExpire()
        .then(response => {
          this.bookings = response.data.data;
          this.loading = false;

          this.selecteduser = null;

          if (this.bookings.length > 0) {
            let myArray = this.bookings;
            let groups = Object.create(null);
            let grouped = [];

            myArray.forEach(function(o) {
              if (!groups[o.ATC_User]) {
                groups[o.ATC_User] = [];
                grouped.push({
                  userName: o.ATC_User
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
    //console.log("MOUNTED")
    this.getBookingsToExpire();
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
