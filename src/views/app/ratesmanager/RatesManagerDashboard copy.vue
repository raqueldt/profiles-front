<template>
  <div class="dashboard">
    <b-row>
      <b-colxx xxs="12">
        <span>
          <h1>{{ $t("gps.ratesmanager") }}</h1>
          <ul
            class="nav pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block"
          >
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/app" class="active" target="_self">{{
                  $t("menu.home")
                }}</a>
              </li>
              <li class="breadcrumb-item">
                <a href="/app/gps" class="active" target="_self">{{
                  $t("menu.gps")
                }}</a>
              </li>
              <li class="breadcrumb-item active">
                <span aria-current="location">{{ $t("gps.dashboard") }}</span>
              </li>
            </ol>
          </ul>
        </span>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx md="10" lg="10" xl="10" class="m-auto">
        <b-row>
          <div class="mb-4 col-lg-6 col-xl-4">
            <div class="card shadow" style="cursor: pointer;"  data-toggle="tooltip" data-placement="top" title="Click here to display ACTIVE promotions">
              <div
                class="card-body d-flex justify-content-between align-items-center"
                @click="setStatus('1')"
              >
                <div class="ml-5">
                  <h3
                    id="active_record"
                    class="mb-1 card-title text-success text-center"
                  >
                    {{rateActives ? rateActives : 0}}
                  </h3>
                  <h6 class="mb-0 text-muted">{{ $t("gps.active-rate") }}</h6>
                </div>
                <div class="progress-bar-circle">
                  <div class="radial-progress-container">
                    <i
                      class="glyph-icon simple-icon-check text-success h1 mr-5"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-4 col-lg-6 col-xl-4">
            <div class="card shadow"  style="cursor: pointer;"  data-toggle="tooltip" data-placement="top" title="Click here to display EXPIRED promotions">

              <div
                class="card-body d-flex justify-content-between align-items-center"
                @click="setStatus('5')"
              >
                <div class="ml-5">
                  <h3
                    id="expired_record"
                    class="mb-1 card-title text-warning text-center"
                  >
                    {{rateExpired ? rateExpired : 0}}
                  </h3>
                  <h6 class="mb-0 text-muted">{{ $t("gps.expired-rate") }}</h6>
                </div>
                <div class="progress-bar-circle">
                  <div class="radial-progress-container">
                    <i
                      class="glyph-icon simple-icon-clock text-warning h1 mr-5"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-4 col-lg-6 col-xl-4">
            <div class="card  shadow"  style="cursor: pointer;" data-toggle="tooltip" data-placement="top" title="Click here to display FINISHED promotions">

              <div
                class="card-body d-flex justify-content-between align-items-center"
                @click="setStatus('3')"
              >
                <div class="ml-5">
                  <h3
                    id="finished_record"
                    class="mb-1 card-title text-danger text-center"
                  >
                    {{rateFinished ? rateFinished : 0}}
                  </h3>
                  <h6 class="mb-0 text-muted">{{ $t("gps.finish-rate") }}</h6>
                </div>
                <div class="progress-bar-circle">
                  <div class="radial-progress-container">
                    <i
                      class="glyph-icon simple-icon-close text-danger h1 mr-5"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-row>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
        <b-card :title="$t('gps.active-records')">
          <b-refresh-button @click="refreshButtonClick()" />
          <vue-perfect-scrollbar
            class="scroll dashboard-list-with-thumbs"
            :settings="{ suppressScrollX: true, wheelPropagation: false }"
          >
            <b-row>
              <b-colxx xxl="8" class="m-auto">
                <b-row>
                  <b-colxx xxl="6">
                    <div class="d-flex">
                      <div class="col-lg-3">
                        <h6 class="text-muted mt-2">
                          {{ $t("gps.head-yacht") }}
                        </h6>
                      </div>
                      <div class="col-lg-9">

<!-- <pre>{{cruises_list}}</pre> -->
                    <multiselect
                      v-model="selectedFilterYatchs"
                      :options="cruises_list"
                      :multiple="true"
                      :searchable="true"
                      :showNoOptions="true"
                      placeholder=""
                      track-by="id"
                      label="name"
                    >
                    </multiselect>
                        
                      </div>
                    </div>
                  </b-colxx>
                  <b-colxx xxl="6" >
                    <div class="d-flex">
                      <div class="col-lg-8" >
                        <h6 class="text-muted mt-2  float-right">
                          {{ $t("gps.year") }}
                        </h6>
                      </div>
                      <div class="col-lg-4">
                        <select
                          v-model="current_year"
                          @change="onChangeYear($event)"
                          class="custom-select b-0"
                        >
                          <option
                            v-for="(value, key) in years"
                            :value="value"
                            :key="key"
                          >
                            {{ value }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </b-colxx>
                </b-row>
              </b-colxx>
            </b-row>
            <div class="separator mt-3 mb-5"></div>
            <b-row>
              <b-colxx lg>
                <!-- <pre>{{rate_management}}</pre> -->
                <div v-if="rate_management.length>0">
                <table
                  id="example"
                  class="table table-hover table table-striped"
                >
                  <thead>
                    <tr>
                      <th class="text-center">
                        #
                      </th>
                      <!-- <th>rseId</th> -->
                      <th>Cruise</th>
                      <th>Promo</th>
                      <th class="text-center">
                        From
                      </th>
                      <th class="text-center">
                        To
                      </th>
                      <th class="text-center">
                        Type
                      </th>
                      <th class="text-center">
                        Duration
                      </th>
                      <th class="text-center">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody class="w-100">
                    <tr
                      v-for="(item, index) in filteredRateManager"
                      :key="item.depId"
                    >
                      <td class="text-center">
                        {{ index + 1 }}
                      </td>
                      <!-- <td>
                        {{ item.rseId }}
                      </td> -->
                      <td class="txt-oflo" title="go to bookings">
                        {{ item.cruName }}
                      </td>
                      <td>
                        {{ item.rseReference }}
                      </td>
                      <td class="text-center">
                        {{ item.departure_start}}
                      </td>
                      <td class="text-center">
                        {{ item.departure_end }}
                      </td>
                      <td class="text-center">
                        {{ item.rseTypeName }}
                      </td>
                      <td class="txt-oflo text-center">
                  <!--       {{ item.rseTime }}
                        {{ item.unit_time }} -->
                        <p class="pb-0 mb-0">
                          <span class="small text-info"
                            >{{ item.tiempo_restante }} remaining</span
                          >
                        </p>
                      </td>
                      <td
                        class="text-center font-weight-bold"
                        :class="formatStatus(item.rseStatus)"
                      >
                        {{ item.rseStatusName }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
                <div v-else>
                    <div class="alert alert-warning">
                         {{ $t("gps.initialRateManagerMessage") }}
                    </div>
                </div>
              </b-colxx>
            </b-row>
          </vue-perfect-scrollbar>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import Metadata from "../../../services/gps/metadata/MetadataServices.js";
import Cruise from "../../../services/gps/cruise/CruiseServices.js";
import Pricing from "../../../services/gps/pricing/PricingServices.js";
import DeparturePriceServices from "../../../../services/gps/departuresPrice/DeparturePriceServices.js";
import Conf from "../../../services/conf";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
/*var VuePaginate = require("vue-paginate");
      Vue.use(VuePaginate);*/

export default {
  components: {
    "v-select": vSelect
    // datepicker: Datepicker,
    //  'vuetable' : Vuetable,
    //'vuetable-pagination-bootstrap' : VuetablePaginationBootstrap
  },
  data() {
    return {
      current_year: new Date().getFullYear().toString(),
      selectedFilterYatchs: [],
      selectedStatus:'',
      //current_year: "2021",
      years: {},
      cruises: [],
      cruises_list: [],
      dprStatus: "1",
      cruises_list_names: [],
      status_departure: [],
      rate_management: [],
      rate_management_filter: [],
      rateActives:'',
      rateExpired:'',
      rateFinished:'',

      rseId: "",
      rseIdConfirm: "",
      rseDateTo: "",
      rseStatus: "1",
      activeRecords: 0,
      expiredRecords: 0,
      finishedRecords: 0,
      paginate: ["rate_management"],
      vueSelectOptions: [],
      vueSelectForm: {
        single: "",
        multiple: []
      }
      //selectData: [years]
    };
  },
  mounted() {
    this.getPricing();    
    this.getYear();
    this.getCruises();
    this.filterByStatus("1");
  },
    computed: {
    filteredRateManager: function () {
        var self = this;        
        var arrayMap = this.rate_management;
         if(arrayMap.length > 0){                      
             return arrayMap.filter(self.filterByCruise).filter(self.filterByStatus);
        }              
    },  
  },
  methods: {
    refreshButtonClick() {      
      this.getPricing()
    },
    /* Modal Extension*/
    formatStatus(status) {
      var response = "";
      switch (status) {
        case 1:
          response = "text-success";
          break;
        case 2:
          response = "text-secondary";
          break;
        case 3:
          response = "text-danger";
          break;
        case 4:
          response = "text-info";
          break;
        case 5:
          response = "text-warning";
          break;
        default:
          response = true;
      }
      return response;
    },

    setStatus(filterStatus) {
        this.selectedStatus = filterStatus;
        console.log("selectedStatus: " + this.selectedStatus);
    },
    filterByCruise(item){
        if (this.selectedFilterYatchs.length === 0) {
            return true;
        }
        let selectedYatchsId = this.selectedFilterYatchs.map(a => a.id);
        return selectedYatchsId.includes(item.cruId);
    },    
    filterByStatus(item) {
        if (this.selectedStatus == '') {
            console.log("vacio");
            return true;
        }
        console.log("filtando status..");
        return item.rseStatus == this.selectedStatus;
    },
    onChangeYear(event) {
      this.getPricing();
    },
    getYear() {
      Metadata.getByGroup(15)
        .then(response => {
          this.years = response.data.data;
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    },
    getCruises() {
      Cruise.getCruises()
        .then(response => {
          this.cruises = response.data.data;
          this.cruises_list = [];
          this.cruises.forEach(item => {
            var item_cruise = {
              id: item.cruId,
              name: item.cruName,
              check: 1
            };
            this.cruises_list.push(item_cruise);
            this.cruises_list_names.push(item.cruName);
          });
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    },
    getPricing() {
      Pricing.getRateManagementYearStatus(this.current_year, this.rseStatus)
        .then(response => {
          this.rate_management = response.data.data;
          this.rate_management_filter = this.rate_management;
        })
        .catch(error => {
          console.log("Error: " + error);
        })
        .finally(() => this.setNumberByStatus());
    },
    setNumberByStatus(){       
        this.rateActives = this.rate_management.filter(item => item.rseStatus === 1).length;
        this.rateExpired = this.rate_management.filter(item => item.rseStatus === 3).length;
        this.rateFinished = this.rate_management.filter(item => item.rseStatus === 5).length;
    }
  }
};
</script>
