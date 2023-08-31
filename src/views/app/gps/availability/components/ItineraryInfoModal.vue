<template>

  <div>


    <!-- v-b-modal="`modal-itinerary-${this.depId}-${this.itiId}`"      	   -->
    <template>
      <b-button @click="showItineraryModal()"
        v-tooltip="{content: 'Display additional itinerary information', placement: 'top', classes: ['itineraries'],}"
        variant="link" 
        class="border-0" size="sm">
        <!-- style="padding: 0 0.9rem !important; text-decoration: none;" -->
        <span> {{ itineraryTextLink }}</span>
      </b-button>

    </template>

    <b-modal ref="itinerary-modal" centered :id="`modal-itinerary-${this.depId}-${this.itiId}`"
      :title="summaryItinerary.cruName" ok-variant="secondary" ok-only ok-title="Close" header-bg-variant="light"
      header-class="p-3 justify-content" body-class="px-3 py-0" footer-class="p-3">

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
                <span><strong>{{ summaryItinerary.itiName }}</strong></span><br>
                <small><span>{{ summaryItinerary.Type }}</span>
                  <span> <strong>|</strong> {{ summaryItinerary.Difficulty }}</span></small>
              </div>

              <div class="col-4 text-right pr-0">
                <small><span>Code <strong>{{ summaryItinerary.itiCode }} |</strong></span>
                  <span>{{$t('gps.nights')}} <strong>{{ summaryItinerary.itiNights }}</strong></span>
                </small>
              </div>

            </div>

          </div>

        </template>

      </template>

      <template v-if="!isLoading">

        <table v-if="summaryItinerary" class="table table tb-rate mb-0 mt-0 table-sm table-hover">
          <thead>
            <tr>
              <th scope="col">{{$t('gps.mod-itin-day')}}</th>
              <th scope="col">{{$t('gps.mod-itin-site')}}</th>
              <th class="col-md-4" scope="col">{{$t('gps.mod-itin-activities')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in summaryItinerary.summary" :key="item.sumId">
              <td><small><strong>{{item.DayShort}}</strong></small></td>
              <td>
                <span class="text-muted">
                  <small>{{item.Meridian}}</small>
                </span> - {{item.sitName? (item.sitName) : 'No Site added'}}
                <span class="py-0"><small>( {{item.plaName? (item.plaName) : 'No Place added'}} )</small></span>
              </td>

              <td>
                <span v-for="activity in item.activities" :key="activity.suaId">
                  <template v-if="activity.icono">
                    <i :class="activity.icono" class="mr-1" :title="activity.activityName"></i>
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

  </div>

</template>

<script>
  import ItineraryServices from "@/services/gps/itinerary/ItineraryServices"

  export default {

    name: 'ItineraryInfoModal',

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
        default: ''
      },

      //
      itiName: {
        type: String,
        required: false,
        default: ''
      }

    },

    data() {

      return {
        isLoading: false,
        summaryItinerary: []
      }

    },

    computed: {
      itineraryTextLink: function () {
        return this.itiCode ? this.itiCode : this.itiName
      }
    },

    watch: {

      /*
    itiId: function (newVal, oldVal) {
         this.getSummaryItinerary()
    }*/


    },


    mounted() {

    },


    created() {

      //this.getSummaryItinerary() // carga info ON DEMAND

    },


    methods: {

      getSummaryItinerary() {

        this.isLoading = true

        ItineraryServices
          .getSummaryItineraryFull(this.itiId)
          .then(response => {

            this.summaryItinerary = response.data.data

          })
          .catch(error => console.log("ERROR SUMMARY ITINERARY", error))
          .finally(() => this.isLoading = false)

      },

      showActivity(activity) {

        return activity.icono

      },

      async showItineraryModal() {


        await this.getSummaryItinerary()


        this.$refs['itinerary-modal'].show()

      }



    }

  }

</script>
