<template>
  <div>
    <in-progress-report/>
    <b-row v-if="summaryViewActive">
      <b-col>
        <b-card>
          <b-card-title
            >Financial Analysis
            {{ moment(year, "YYYY").format("y") }}
          </b-card-title>

          <b-row>
            <b-col>
              <label for="input-year" style="font-weight: normal"
                >Type report</label
              >
              <br />
              <div class="btn-group" data-toggle="buttons">
                <label class="btn btn-primary">
                  <input
                    v-model="typeReport"
                    type="radio"
                    value="1"
                    name="options"
                    id="option1"
                    checked
                  />
                  Monthly
                </label>
                <label
                  v-if="
                    filters.cruises.length == 0 || filters.cruises.length > 1
                  "
                  class="btn btn-primary"
                >
                  <input
                    v-model="typeReport"
                    type="radio"
                    value="2"
                    disabled
                    name="options"
                    id="option1"
                  />
                  Departure
                </label>
                <label v-else class="btn btn-primary">
                  <input
                    v-model="typeReport"
                    type="radio"
                    value="2"
                    name="options"
                    id="option1"
                  />
                  Departure
                </label>
              </div>
            </b-col>
            <template>
              <b-col>
                <label for="input-year" style="font-weight: normal">Year</label>
                <br />

                <date-picker
                  id="input-year"
                  v-model="year"
                  type="year"
                  placeholder="Select year"
                  :clearable="false"
                  style="width: 100px"
                >
                </date-picker>
              </b-col>
            </template>


            <b-col v-if="typeReport == 2">
              <label for="input-year" style="font-weight: normal"
                >Itinerary Type</label
              >
                    <div class="list-group list-group-horizontal" id="listGroup">
              <a
                class="list-group-item"
                v-bind:class="{ active: isSelected(1) }"
                v-on:click="typeReportItinerary = 1"
                    style="cursor: pointer"
                >Simple</a
              >
              <a
                class="list-group-item"
                v-bind:class="{ active: isSelected(2) }"
                    style="cursor: pointer"
                v-on:click="typeReportItinerary = 2"
                >Combined</a
              >
              <a
                class="list-group-item"
                v-bind:class="{ active: isSelected(3) }"
                    style="cursor: pointer"
                v-on:click="typeReportItinerary = 3"
                >Both</a
              >
            </div>

            </b-col>
             <b-col v-if="typeReport == 2">
              <label for="input-year" style="font-weight: normal"
                >Nights</label
              >
                    <div class="list-group list-group-horizontal" id="listGroup">

     <b-form-select
      v-model="selectednights"
      :options="getNights"
      class="mb-3"
      @change="UpdateInfo"
      value-field="itiNights"
      text-field="itiNights"
    >

    </b-form-select>



            </div>

            </b-col>




            <b-col v-if="typeReport == 1">
              <label for="select-client" style="font-weight: normal"
                >Cruises   <b-badge v-if="filters.cruises.length == 0"  variant="primary">All cruises </b-badge>
                </label
              >


              <br />
<!-- {{filters.cruises}} -->
              <v-select
                id="select-cruises"
                label="cruName"
                multiple
                :options="getCruises"
                :reduce="(cruId) => cruId.cruId"
                v-model="filters.cruises"
                clearable
              >
              </v-select>
            </b-col>
            <b-col v-if="typeReport == 2">
              <label for="select-client" style="font-weight: normal"
                >Cruises</label
              ><br />

              <v-select
                id="select-cruises"
                label="cruName"
                :options="getCruises"
                :reduce="(cruId) => cruId.cruId"
                v-model="filters.cruises"
                clearable
              >
              </v-select>
            </b-col>
          </b-row>

          <b-row>
            <b-col v-if="typeReport == 1 && getData.length > 0">
              <template v-if="isLoading">
                <div>Cargando...</div>
              </template>

              <template v-else>
                <financial-analysis-monthly
                  :data="getData"
                ></financial-analysis-monthly>
              </template>
            </b-col>
            <b-col v-if="typeReport == 1 && getData.length == 0">
              <b-card class="mt-4" no-body>
                <b-card-body class="text-center">
                  <b-img
                    src="/assets/img/atc/empty-state/no_result_found.png"
                    fluid
                    alt="No result found"
                    width="400"
                  />

                  <b-card-title
                    ><h1><strong>No results found</strong></h1></b-card-title
                  >

                  <b-card-text>
                    Try adjusting you search options to find what you're looking
                    for
                  </b-card-text>
                </b-card-body>
              </b-card>
            </b-col>

            <b-col v-if="typeReport == 2 && getDataDepartures.length > 0 && !filter">
              <template>
                <financial-analysis-departures
                  :data="getDataDepartures"
                ></financial-analysis-departures>
              </template>

            </b-col>
                      <b-col v-if="typeReport == 2 && getDataDepartures.length > 0 &&  filter">
              <template>
                <financial-analysis-departures
                  :data="apartado"
                ></financial-analysis-departures>
              </template>

            </b-col>
            <b-col v-if="typeReport == 2 && getDataDepartures.length == 0">
              <b-card class="mt-4" no-body>
                <b-card-body class="text-center">
                  <b-img
                    src="/assets/img/atc/empty-state/no_result_found.png"
                    fluid
                    alt="No result found"
                    width="400"
                  />

                  <b-card-title
                    ><h1><strong>No results found</strong></h1></b-card-title
                  >

                  <b-card-text>
                    Try adjusting you search options to find what you're looking
                    for
                  </b-card-text>
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DateRangePicker from "vue2-daterange-picker";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import moment from "moment";

import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "SalesbyTravel",

  components: {
    DatePicker,
    "v-select": vSelect,
    DateRangePicker,
    InProgressReport: () => import('@/views/app/gps/components/InProgressReport')
  },

  data() {
    return {
       selectednights:"",
        banderaNights:false,
      filters: {
        year: null,
        cruises: [],
        selectcruise: "",
      },
      typeReportItinerary: 1,
      typeReportItineraryInit: [1],
      apartado:[],
      filter:false,

      typeReport: "1", // 1 fecha de venta, 2 fecha de viaje
      options: [{ text: "Monthly", value: "1" }],
      optionsitinerary: [
        { text: "Simple", value: "1" },
        { text: "Combined", value: "2" },
      ],

      isLoading: false,
      year: null,
      dateRange: {
        startDate: new Date(),
        endDate: new Date(),
      },
      locale: {
        separator: " - ",
        format: "dd mmm yyyy",
      },
      isModeYear: true,

      params: {
        inicio: null,
        fin: null,
      },
    };
  },

  computed: {
    ...mapState("financial-analysis", ["summaryViewActive"]),
    ...mapGetters("financial-analysis", [
      "getData",
      "getCruises",
      "getDataDepartures",
      "getNights",

    ]),

    minDateYear() {
      return moment(this.year).startOf("year").format("L");
    },

    maxDateYear() {
      return moment(this.year).endOf("year").format("L");
    },
  },

  watch: {

   /*  selectednights:function (newNight, oldNight){

      this.filter=true;
      if(this.filter ) {
    this.apartado = this.getDataDepartures.filter(item => item.itiNights == newNight)

    }
    }, */

    typeReportItinerary: function (newYear, oldYear) {
         if (newYear == 1) this.typeReportItineraryInit = [1];
      if (newYear == 2) this.typeReportItineraryInit = [2];
      if (newYear == 3) this.typeReportItineraryInit = [1, 2];
    this.updateData();
    this.filter=false;
    this.selectednights="";


   },
    year: function (newYear, oldYear) {
      const startDateOfTheYear = moment(newYear).startOf("year");
      const endDateOfTheYear = moment(newYear).endOf("year");
      this.dateRange.startDate = startDateOfTheYear;
      this.dateRange.endDate = endDateOfTheYear;
      this.updateData();
    },
    "filters.cruises": function (newCountry, oldCountry) {
      this.updateData();
    },
    typeReport: function (newType, oldType) {
      if (this.typeReport == 1) this.loadReportDataMonth();
      if (this.typeReport == 2) this.loadReportDataDeparture();
    },
  },

  methods: {
    UpdateInfo(){
       this.filter=true;
      if(this.filter )
   this.apartado = this.getDataDepartures.filter(item => item.itiNights == this.selectednights)
    },
        isSelected: function (i) {
      return i === this.typeReportItinerary;
    },
    ...mapActions("financial-analysis", ["loadData", "loadDataDepartures"]),
    ...mapMutations("financial-analysis", ["setSummaryViewActive"]),
    onRowSelected(items) {
      this.selectedRows = items;
    },
    onRowSelectedDepartures(items) {
      this.selectedRowsDepartures = items;
    },
    updateData() {
      let startDateOfTheYear = null;
      let endDateOfTheYear = null;

      if (this.isModeYear) {
        startDateOfTheYear = moment(this.year)
          .startOf("year")
          .format("YYYY-MM-DD");
        endDateOfTheYear = moment(this.year).endOf("year").format("YYYY-MM-DD");
      } else {
        startDateOfTheYear = moment(this.dateRange.startDate).format(
          "YYYY-MM-DD"
        );
        endDateOfTheYear = moment(this.dateRange.endDate).format("YYYY-MM-DD");
      }

      this.params.inicio = startDateOfTheYear;
      this.params.fin = endDateOfTheYear;
      if (this.typeReport == 1) this.loadReportDataMonth();
      if (this.typeReport == 2) this.loadReportDataDeparture();
    },

    // valores iniciales
    async setInitialParameters() {
      this.year = new Date();
      this.setSummaryViewActive(true);
    },

    async loadReportDataMonth() {
      this.isLoading = true;
      const params = {
        inicio: this.params.inicio,
        fin: this.params.fin,
        tipo: this.typeReport,

        cruise_ids: this.filters.cruises,
      };
      await this.loadData(params);
      this.isLoading = false;
    },
    async loadReportDataDeparture() {
      this.isLoading = true;
      const params = {
        inicio: this.params.inicio,
        fin: this.params.fin,
          buildMode: this.typeReportItineraryInit,

     cruise: this.filters.cruises,
      };

      await this.loadDataDepartures(params);

      this.isLoading = false;
    },
  },

  async created() {
    await this.setInitialParameters();
  },
};
</script>



<style lang="scss" scoped>
.list-group-item.active {
  color: whitesmoke !important;
  background-color: #f09a49;
  border: none;
}
</style>
