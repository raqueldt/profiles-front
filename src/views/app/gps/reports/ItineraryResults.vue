<template>
  <div>
    <in-progress-report/>
    <b-row>
      <b-col>
        <b-card>
          <b-card-title>
            <h1>Itinerary Results {{ moment(year, "YYYY").format("y") }}</h1>
          </b-card-title>

          <b-row>
            <b-col sm="6" md="4" lg="3" class="mb-4"> </b-col>
            <b-col sm="6" md="4" lg="3" class="mb-4">
              <div class="d-flex justify-content-between">
                <div>
                  <label for="input-year"> <h5>Year</h5></label><br />
                  <date-picker
                    id="input-year"
                    v-model="year"
                    type="year"
                    placeholder="Select year"
                    :clearable="false"
                    style="width: 100px"
                  >
                  </date-picker>
                </div>
              </div>
            </b-col>

            <b-col sm="6" md="4" lg="3" class="mb-3">
              <label for="input-year"> <h5>Itinerary Type</h5> </label>

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
                  <b-col sm="6" md="4" lg="3" class="mb-4"> </b-col>
          </b-row>

          <b-row>
            <b-col v-if="!getData[0].length == 0" md="4" lg="12" class="mb-3">
              <div v-for="dataIti in getData[0]" :key="dataIti.cruId">
                <b-row>
                  <b-colxx xxs="12">
                    <b-card
                      class="mb-4"
                      text-variant="primary"
                      :title="dataIti.cruName"
                    >

                      <itinerary-results-detail
                        :data="dataIti.data"
                      ></itinerary-results-detail>
                    </b-card>
                  </b-colxx>
                </b-row>
                <br />
              </div>
            </b-col>
            <b-col v-else>
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

import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import moment from "moment";

export default {
  name: "ItineraryResults",

  components: {
    DatePicker,
    DateRangePicker,
    InProgressReport: () => import('@/views/app/gps/components/InProgressReport')
  },

  data() {
    return {
      options: [
        { text: "Simple", value: "1" },
        { text: "Combined", value: "2" },
        { text: "Both", value: "3" },
      ],
      typeReportItinerary: 1,
      typeReportItineraryInit: [1],

      year: null,
      params: {
        inicio: null,
        fin: null,
      },
    };
  },
  computed: {
    ...mapGetters("itinerary-results", ["getData"]),
  },
  watch: {
    year: function (newYear, oldYear) {
      // reload data
      this.updateData();
    },
    typeReportItinerary: function (newYear, oldYear) {
      // reload data
      if (newYear == 1) this.typeReportItineraryInit = [1];
      if (newYear == 2) this.typeReportItineraryInit = [2];
      if (newYear == 3) this.typeReportItineraryInit = [1, 2];

      this.updateData();
    },
  },
  methods: {
    isSelected: function (i) {
      return i === this.typeReportItinerary;
    },
    ...mapActions("itinerary-results", ["loadData"]),
    ...mapMutations("itinerary-results", ["setSummaryViewActive"]),

    // valores iniciales
    async setInitialParameters() {
      this.year = new Date();
    },

    // determinar parametros y cargar datos
    updateData() {
      const startDateOfTheYear = moment(this.year)
        .startOf("year")
        .format("YYYY-MM-DD");
      const endDateOfTheYear = moment(this.year)
        .endOf("year")
        .format("YYYY-MM-DD");

      this.params.inicio = startDateOfTheYear;
      this.params.fin = endDateOfTheYear;

      // update data report

      this.loadReportDataItineraryItinerary();
    },

    // buscar y cargar data segun parametros

    async loadReportDataItineraryItinerary() {
      this.isLoading = true;
      const params = {
        inicio: this.params.inicio,
        fin: this.params.fin,
        buildMode: this.typeReportItineraryInit,
      };

      await this.loadData(params);

      this.isLoading = false;
    },
    async setInitialParameters() {
      this.year = new Date();
      this.setSummaryViewActive(true);
    },
  },
  async created() {
    await this.setInitialParameters();
  },
  // valores iniciales
};
</script>


<style lang="scss" scoped>
.list-group-item.active {
  color: whitesmoke !important;
  background-color: #f09a49;
  border: none;
}
</style>
