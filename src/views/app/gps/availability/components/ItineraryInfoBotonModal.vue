<template>
  <b-container fluid>
    <!-- v-b-modal="`modal-itinerary-${this.depId}-${this.itiId}`"      	   -->
    <template>
      <b-button
        @click="showItineraryModal()"
        variant="link"
        class="border-0 p-0 m-0"
        size="sm"        
      >
        <b-row class="" style="width: 45px; border-radius: 5px">
          <b-col lg="12" class="py-1 w-100 m-auto iticode">
            <span> {{ itineraryTextLink }}</span>
          </b-col>
          <b-col lg="12" class="w-100 py-1 nights-ititype bg-white">
            <b-container >
              <b-row>
                <b-col class=" mx-0 p-0" lg="5">
                  <span>{{itiNights}}N</span>
                </b-col>
                <b-col class=" mx-0  p-0" lg="7">
                  <template v-if="itiType == 'Diving'">
                    <!-- src="../../../../../assets/img/atc/dive.svg" -->
                    <img
                      src="./../../../../../assets/img/atc/dive.svg"
                      class="imgitinA"
                      alt="No image"
                    />
                  </template>
                  <!-- src="../../../../../assets/img/atc/natu.svg" -->
                  <template v-if="itiType == 'Naturalist'">
                    <img
                      src="./../../../../../assets/img/atc/natu.svg"
                      class="imgitinB"
                      alt="No image"
                    />
                  </template>
                </b-col>
              </b-row>
            </b-container>
          </b-col>
        </b-row>

        <!-- <div class="w-100 m-auto iticode">
                <span> {{ itineraryTextLink }}</span>
            </div>

          <div class="w-100 nights-ititype bg-white" style="border:solid 1px red; background: white;">
                  <span class="nights w-100 mt-1"> {{ itiNights }}N</span>

                  <span class="w-100" style="border:solid 1px blue;">
                      <template v-if="itiType == 'Diving'">
                        <img                          
                          src="./../../../../../assets/img/atc/dive.svg"
                          class="imgitinA"
                          alt=""
                        />
                      </template>
                      <template v-if="itiType == 'Naturalist'">
                        <img
                          src="./../../../../../assets/img/atc/natu.svg"
                          class="imgitinB"
                          alt="No image"
                        />
                      </template>
                  </span>
            </div> -->
      </b-button>
    </template>

    <b-modal
      ref="itinerary-modal"
      centered
      :id="`modal-itinerary-${this.depId}-${this.itiId}`"
      :title="summaryItinerary.cruName"
      ok-variant="secondary"
      ok-only
      ok-title="Close"
      header-bg-variant="light"
      header-class="p-3 justify-content"
      body-class="px-3 py-0"
      footer-class="p-3"
    >
      <template v-slot:modal-header="{ close }">
        <template v-if="isLoading">
          <b-spinner small label="Loading..."></b-spinner>
        </template>

        <template v-else>
          <div class="container">
            <div class="row">
              <div class="col-4 text-left pl-0">
                <strong>
                  {{ summaryItinerary.cruName }}
                </strong>
              </div>

              <div class="col-4 text-center px-0">
                <span
                  ><strong>{{ summaryItinerary.itiName }}</strong></span
                ><br />
                <small
                  ><span>{{ summaryItinerary.Type }}</span>
                  <span>
                    <strong>|</strong> {{ summaryItinerary.Difficulty }}</span
                  ></small
                >
              </div>

              <div class="col-4 text-right pr-0">
                <small
                  ><span
                    >Code
                    <strong>{{ summaryItinerary.itiCode }} |</strong></span
                  >
                  <span
                    >{{ $t("gps.nights") }}
                    <strong>{{ summaryItinerary.itiNights }}</strong></span
                  >
                </small>
              </div>
            </div>
          </div>
        </template>
      </template>

      <template v-if="!isLoading">
        <table
          v-if="summaryItinerary"
          class="table table tb-rate mb-0 mt-0 table-sm table-hover"
        >
          <thead>
            <tr>
              <th scope="col">{{ $t("gps.mod-itin-day") }}</th>
              <th scope="col">{{ $t("gps.mod-itin-site") }}</th>
              <th class="col-md-4" scope="col">
                {{ $t("gps.mod-itin-activities") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in summaryItinerary.summary" :key="item.sumId">
              <td>
                <small
                  ><strong>{{ item.DayShort }}</strong></small
                >
              </td>
              <td>
                <span class="text-muted">
                  <small>{{ item.Meridian }}</small>
                </span>
                - {{ item.sitName ? item.sitName : "No Site added" }}
                <span class="py-0"
                  ><small
                    >(
                    {{
                      item.plaName ? item.plaName : "No Place added"
                    }}
                    )</small
                  ></span
                >
              </td>

              <td>
                <span v-for="activity in item.activities" :key="activity.suaId">
                  <template v-if="activity.icono">
                    <i
                      :class="activity.icono"
                      class="mr-1"
                      :title="activity.activityName"
                    ></i>
                  </template>
                  <template v-else>
                    {{ showActivity(activity) }}
                  </template>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import ItineraryServices from "@/services/gps/itinerary/ItineraryServices";

export default {
  name: "ItineraryInfoModal",

  props: {
    // id departure asociado
    depId: {
      type: Number,
      required: false,
      default: 0
    },

    // id itinerario a mostrar
    itiId: {
      type: Number,
      required: true,
      default: 0
    },

    //
    itiCode: {
      type: String,
      required: false,
      default: ""
    },

    //
    itiName: {
      type: String,
      required: false,
      default: ""
    },
    itiNights: {
      type: Number,
      required: true,
      default: 0
    },
    itiType: {
      type: String,
      required: false,
      default: ""
    }
  },

  data() {
    return {
      isLoading: false,
      summaryItinerary: []
    };
  },

  computed: {
    itineraryTextLink: function() {
      return this.itiCode ? this.itiCode : this.itiName;
    }
  },

  watch: {
    /*
      itiId: function (newVal, oldVal) {
           this.getSummaryItinerary()
      }*/
  },

  mounted() {},

  created() {
    //this.getSummaryItinerary() // carga info ON DEMAND
  },

  methods: {
    getSummaryItinerary() {
      this.isLoading = true;

      ItineraryServices.getSummaryItineraryFull(this.itiId)
        .then(response => {
          this.summaryItinerary = response.data.data;
        })
        .catch(error => console.log("ERROR SUMMARY ITINERARY", error))
        .finally(() => (this.isLoading = false));
    },

    showActivity(activity) {
      return activity.icono;
    },

    async showItineraryModal() {
      await this.getSummaryItinerary();

      this.$refs["itinerary-modal"].show();
    }
  }
};
</script>

<style scoped>
* >>> img.imgitinB {
  width: 80% !important;
  top: 0 !important;
}
* >>> img.imgitinA {
  width: 70% !important;
  top: 0 !important;
}
</style>
