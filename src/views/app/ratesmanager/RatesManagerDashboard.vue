<template>
  <div class="dashboard">
    <b-row>
      <b-colxx xxs="12">
        <span>
          <h1>{{ $t("gps.ratesmanager") }}</h1>
          <ul
            class="
              nav
              pt-0
              breadcrumb-container
              d-none d-sm-block d-lg-inline-block
            "
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
      <b-colxx md="12" lg="12" xl="12" class="m-auto">
        <b-row>
          <div class="mb-3 col-lg-6 col-xl-3">
            <div
              class="card shadow"
              style="cursor: pointer"
              data-toggle="tooltip"
              data-placement="top"
              title="Click here to display ACTIVE promotions"
            >
              <div
                class="
                  card-body
                  d-flex
                  justify-content-between
                  align-items-center
                "
                @click="setStatus('1')"
              >
                <div class="ml-5">
                  <h3
                    id="active_record"
                    class="mb-1 card-title text-success text-center"
                  >
                    {{ rateActives ? rateActives : 0 }}
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
          <div class="mb-3 col-lg-6 col-xl-3">
            <div
              class="card shadow"
              style="cursor: pointer"
              data-toggle="tooltip"
              data-placement="top"
              title="Click here to display ACTIVE promotions"
            >
              <div
                class="
                  card-body
                  d-flex
                  justify-content-between
                  align-items-center
                "
                @click="setStatus('4')"
              >
                <div class="ml-5">
                  <h3
                    id="extended_record"
                    class="mb-1 card-title text-info text-center"
                  >
                    {{ rateExtended ? rateExtended : 0 }}
                  </h3>
                  <h6 class="mb-0 text-muted">{{ $t("gps.extended-rate") }}</h6>
                </div>
                <div class="progress-bar-circle">
                  <div class="radial-progress-container">
                    <i
                      class="
                        glyph-icon
                        iconsminds-clock-forward
                        text-info
                        h1
                        mr-5
                      "
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-3 col-lg-6 col-xl-3">
            <div
              class="card shadow"
              style="cursor: pointer"
              data-toggle="tooltip"
              data-placement="top"
              title="Click here to display EXPIRED promotions"
            >
              <div
                class="
                  card-body
                  d-flex
                  justify-content-between
                  align-items-center
                "
                @click="setStatus('5')"
              >
                <div class="ml-5">
                  <h3
                    id="expired_record"
                    class="mb-1 card-title text-warning text-center"
                  >
                    {{ rateExpired ? rateExpired : 0 }}
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
          <div class="mb-3 col-lg-6 col-xl-3">
            <div
              class="card shadow"
              style="cursor: pointer"
              data-toggle="tooltip"
              data-placement="top"
              title="Click here to display FINISHED promotions"
            >
              <div
                class="
                  card-body
                  d-flex
                  justify-content-between
                  align-items-center
                "
                @click="setStatus('3')"
              >
                <div class="ml-5">
                  <h3
                    id="finished_record"
                    class="mb-1 card-title text-danger text-center"
                  >
                    {{ rateFinished ? rateFinished : 0 }}
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
        <b-card no-body>
          <b-card-body>
            <h4 v-if="this.selectedStatus.length == 0">
              {{ $t("gps.active-records") }}
            </h4>
            <h4 v-if="this.selectedStatus == 1">
              {{ $t("gps.active-rate") }} {{ $t("gps.active-records") }}
            </h4>
            <h4 v-if="this.selectedStatus == 4">
              {{ $t("gps.extended-rate") }} {{ $t("gps.active-records") }}
            </h4>
            <h4 v-if="this.selectedStatus == 5">
              {{ $t("gps.expired-rate") }} {{ $t("gps.active-records") }}
            </h4>
            <h4 v-if="this.selectedStatus == 3">
              {{ $t("gps.finish-rate") }} {{ $t("gps.active-records") }}
            </h4>
            <b-refresh-button @click="refreshButtonClick()" />

            <vue-perfect-scrollbar
              class="scroll dashboard-list-with-thumbs"
              :settings="{ suppressScrollX: true, wheelPropagation: false }"
            >
              <b-row class="mt-2">
                <b-colxx xxl="12" class="m-auto">
                  <b-row>
                    <b-colxx xxl="4">
                      <div class="d-flex">
                        <div class="col-lg-4">
                          <h6 class="text-muted mt-2 select-search text-right">
                            <i class="glyph-icon iconsminds-ship"></i>
                            {{ $t("gps.head-yacht") }}<br />
                            <input
                              class="mt-1 ml-1"
                              type="checkbox"
                              id="checkbox"
                              name="checkbox"
                              v-model="checkCruises"
                              @change="selectAllCruises()"
                            />
                            <small>{{
                              checkCruises ? "Unselect All" : " Select All"
                            }}</small>
                          </h6>
                        </div>
                        <div class="col-lg-9 custom-selects mt-2">
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
                    <b-colxx xxl="4">
                      <div class="d-flex ml-4">
                        <div class="col-lg-5">
                          <h6
                            class="
                              text-muted
                              mt-2
                              select-search
                              mt-3
                              text-right
                            "
                          >
                            <i class="glyph-icon simple-icon-calendar mr-2"></i>
                            {{ $t("gps.year") }}
                          </h6>
                        </div>
                        <div class="col-lg-4 select-year">
                          <select
                            v-model="current_year"
                            @change="onChangeYear($event)"
                            class="custom-select b-0 mt-2"
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

                    <b-colxx xxl="4" class="pl-0">
                      <b-form-group
                        label="Search"
                        label-for="filter-input"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        class="mb-0 select-search h6 text-muted mt-2"
                      >
                        <b-input-group size="sm">
                          <b-form-input
                            id="filter-input"
                            v-model="filter"
                            type="search"
                            placeholder="Search promotions"
                          ></b-form-input>

                          <b-input-group-append>
                            <b-button
                              variant="success"
                              :disabled="!filter"
                              @click="filter = ''"
                              >Clear</b-button
                            >
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>
                    </b-colxx>
                  </b-row>
                </b-colxx>
              </b-row>
              <div class="separator mt-3 mb-5"></div>
              <b-row>
                <b-colxx lg>
                  <!--  Seccion spinner  -->
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
                  <div
                    class="mb-3 col-lg-12 col-xl-12"
                    v-if="
                      rate_management.length > 0 &&
                      filteredRateManager.length > 0
                    "
                  >
                    <b-row>
                      <b-table
                        head-variant="dark"
                        hover
                        :fields="fields"
                        :items="filteredRateManager"
                        :filter="filter"
                      >
                        <template #cell(index)="data">
                          {{ data.index + 1 }}
                        </template>
                        <template #cell(indexCruises)="data">
                          <div
                            v-for="(cruise, index) in data.item.checkedCruises"
                            :key="index"
                          >
                            <span class="badge badge-pill badge-info cruises"
                              ><i class="glyph-icon iconsminds-ship"></i
                              >{{ cruise.cruName }}</span
                            >
                          </div>
                        </template>

                        <template #cell(rateType)="data">
                          <p class="pb-0 mb-0">
                        
                            <span
                                style="color: white; cursor: pointer"
         
                              class="badge h4"
                              v-b-modal.modaldetailpromotion
                              @click="captureitem(data.item)"
                              :class="formatStatusRateType(data.item.rseType)"
                              >{{ data.item.rateType }}</span
                            >
                          </p>
                        </template>

                        <template #cell(indexDuration)="data">
                          <span>
                            {{ moment(data.item.rseDateFrom).format("DD MMM YYYY, ddd ") }} to
                            {{ moment(data.item.rseDateTo).format("DD MMM YYYY, ddd ")}}
                          </span>
                        </template>
                        <template #cell(indexStatus)="data">
                          <b-badge
                            class="mb-1"
                            href="#"
                            variant="muted"
                            :class="formatStatus(data.item.rseStatus)"
                            >{{ data.item.statusp }}</b-badge
                          >
                        </template>
                        <template #cell(actions)="data">
                          <i
                            style="cursor: pointer"
                            v-b-modal.modaldeparturespromotions
                            @click="
                              viewdepartures(data.item.rseId),
                                capturename(data.item.rseReference)
                            "
                            class="glyph-icon simple-icon-eye font-weight-bold"
                          ></i>
                        </template>
                      </b-table>
                    </b-row>
                    <b-modal
                      id="modaldetailpromotion"
                      size="md"
                      :title="'Detail Promotion'"
                      hide-footer
                    >
                      <DetailPromotion :rseId="rateset"></DetailPromotion>
                    </b-modal>
                    <b-modal
                      id="modaldeparturespromotions"
                      size="lg"
                      :title="
                        'Departures associated to ' +
                        namePromotion +
                        ' promotion'
                      "
                      hide-footer
                    >
                      <!-- departuresrseId  -->
                      <modaldeparturespromotion
                        :ratesetId="departuresrseId"
                      ></modaldeparturespromotion>
                    </b-modal>
                  </div>
                  <div v-else>
                    <alertsglobal
                      :type="alert_type"
                      :title="alert_title"
                      :message="alert_message"
                      :class_add="alert_class"
                      :class_icon="alert_icon"
                    ></alertsglobal>
                  </div>
                </b-colxx>
              </b-row>
            </vue-perfect-scrollbar>
          </b-card-body>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import Metadata from "../../../services/gps/metadata/MetadataServices.js";
import Cruise from "../../../services/gps/cruise/CruiseServices.js";
import Pricing from "../../../services/gps/pricing/PricingServices.js";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import AlertGlobal from "../gps/alerts/Alerts";
export default {
  components: {
    "v-select": vSelect,
    alertglobal: AlertGlobal,
  },
  data() {
    return {
      perPage: 1,
      currentPage: 1,
      current_year: new Date().getFullYear().toString(),
      selectedFilterYatchs: [],
      selectedStatus: 1,
      loading: false,
      years: {},
      rateset:'',
      cruises: [],
      cruises_list: [],
      dprStatus: "1",
      cruises_list_names: [],
      status_departure: [],
      rate_management: [],
      rate_management_filter: [],
      rateActives: "",
      rateExtended: "",
      rateExpired: "",
      rateFinished: "",
      departuresrseId: "",
      rseId: "",
      checkCruises:"",
      namePromotion: "",
      rseIdConfirm: "",
      rseDateTo: "",
      rseStatus: "1",
      activeRecords: 0,
      extendedRecords: 0,
      expiredRecords: 0,
      finishedRecords: 0,
      paginate: ["rate_management"],
      vueSelectOptions: [],
      vueSelectForm: {
        single: "",
        multiple: [],

        filterOn: [],
      },
      filter: null,
      fields: [
        {
          key: "index",
          label: "#",
          sortable: false,
          sortDirection: "desc",
          tdClass: "index",
        },
        {
          key: "indexCruises",
          label: "Cruises",
          sortable: false,
          sortDirection: "desc",
          tdClass: "index",
        },
        {
          key: "rseReference",
          label: "Promotion",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate",
        },
        {
          key: "rateType",
          label: "Type",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate",
        },
        {
          key: "indexDuration",
          label: "Duration",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate",
        },
        {
          key: "tiempo_restante",
          label: "Expires in",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate",
        },
        {
          key: "indexStatus",
          label: "Status",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate",
        },
        { key: "actions", label: "Departures" },
      ],
      /*Mensajes de alertas no data*/
      /*Texto de mensaje se puede utilizar para traducciones en.json como el ejemplo o texto*/
      alert_title: "No information",
      alert_message: this.$t("gps.initialRateManagerMessage"),

      alert_type: "dark",
      alert_class: "",
      alert_icon: "",
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
      if (arrayMap.length > 0) {
        return arrayMap.filter(self.filterByCruise).filter(self.filterByStatus);
      }
    },
    rows() {
      return this.rate_management_filter.length;
    },
  },
  methods: {
    captureitem(id) {
      this.rateset = id;
    },
    formatStatusRateType(status) {
      var response = "";
      switch (status) {
        case 1:
          response = "badge-primary";
          break;
        case 2:
          response = "badge-primary";
          break;
        default:
          response = true;
      }
      return response;
    },
    selectAllCruises() {
      var self = this;
      if (this.checkCruises) {
        self.selectedFilterYatchs = [];
        this.cruises_list.forEach(function (elemento, indice, array) {
          self.selectedFilterYatchs.push(elemento);
        });
      } else {
        self.selectedFilterYatchs = [];
      }
    },
    rowClass(item, type) {
      //Parametro para b-table en caso de necesitar pintar las filas
      if (!item || type !== "row") return;
      if (item.rseStatus === 1) return "table-success";
      if (item.rseStatus === 2) return "table-secondary";
      if (item.rseStatus === 3) return "table-danger";
      if (item.rseStatus === 4) return "table-info";
      if (item.rseStatus === 5) return "table-warning";
    },
    capturename(name) {
      this.namePromotion = name;
    },

    viewdepartures(id) {
      this.departuresrseId = id;
    },
    refreshButtonClick() {
      this.getPricing();
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
    },
    filterByCruise(item) {
      if (this.selectedFilterYatchs.length === 0) {
        return true;
      } else {
        let selectedYatchsId = this.selectedFilterYatchs.map((a) => a.id);
        var resultado = item.checkedCruises.filter(
          (item) => selectedYatchsId.includes(item.cruId) && item != ""
        );
        if (resultado != "") {
          return resultado;
        }
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    filterByStatus(item) {
      if (this.selectedStatus == "") {
        //console.log("vacio");
        return true;
      }
      //console.log("filtando status..");
      return item.rseStatus == this.selectedStatus;
    },
    onChangeYear(event) {
      this.getPricing();
    },
    getYear() {
      Metadata.getByGroup(15)
        .then((response) => {
          this.years = response.data.data;
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
    getCruises() {
      Cruise.getCruises()
        .then((response) => {
          this.cruises = response.data.data;
          this.cruises_list = [];
          this.cruises.forEach((item) => {
            var item_cruise = {
              id: item.cruId,
              name: item.cruName,
              check: 1,
            };
            this.cruises_list.push(item_cruise);
            this.cruises_list_names.push(item.cruName);
          });
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
    getPricing() {
      this.loading = true;
      Pricing.getRateSetAdministrator(this.current_year, this.rseStatus)
        .then((response) => {
          this.rate_management = response.data.data;
          this.loading = false;
          // this.rate_management_filter = this.rate_management;
        })
        .catch((error) => {
          console.log("Error: " + error);
        })
        .finally(() => this.setNumberByStatus());
    },
    setNumberByStatus() {
      this.rateActives = this.rate_management.filter(
        (item) => item.rseStatus === 1
      ).length;
      this.rateInactives = this.rate_management.filter(
        (item) => item.rseStatus === 2
      ).length;
      this.rateExtended = this.rate_management.filter(
        (item) => item.rseStatus === 4
      ).length;
      this.rateExpired = this.rate_management.filter(
        (item) => item.rseStatus === 5
      ).length;
      this.rateFinished = this.rate_management.filter(
        (item) => item.rseStatus === 3
      ).length;
      this.rateAll = this.rate_management.length;
    },
  },
};
</script>
