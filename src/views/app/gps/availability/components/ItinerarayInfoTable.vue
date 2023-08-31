<template>

  <div>

    <div ref="itinerary-modal" :id="`modal-itinerary-${this.depId}-${this.itiId}`">

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


    </div>

  </div>

</template>

<script>
  import ItineraryServices from "@/services/gps/itinerary/ItineraryServices"
  import DeparturesServices from "@/services/gps/departures/DeparturesServices"

  export default {

    name: 'ItineraryInfoModal',

    props: {

      // id departure asociado
      depId: {
        required: false,
        default: 0
      },
    },

    data() {

      return {
        isLoading: false,
        itiId:"",
        itiCode:"",
        itiName:"",
        summaryItinerary: [],
        infoItinerary: []
      }

    },

    computed: {
      itineraryTextLink: function () {
        return this.itiCode ? this.itiCode : this.itiName
      }
    },

    watch: {
        depId() {
            this.getAllByDepId();
        }
    },
    mounted() {
       
    },
    created() {
        
    },
    methods: {
      getAllByDepId() {
        
          DeparturesServices
            .getItineraryByDepId(this.depId)
            .then(response => {
              this.isLoading = true
              this.infoItinerary = response.data.data
              this.itiId = this.infoItinerary.map(a => a.itiId);
              this.itiCode = this.infoItinerary.map(a => a.itiCode);
              this.itiName = this.infoItinerary.map(a => a.itiName);

            })
            .catch(error => console.log("ERROR SUMMARY ITINERARY", error))
            .finally(() => {
               this.getSummaryItinerary();
              this.isLoading = false;
              
            }
            )
        
      },
      getSummaryItinerary() {

        this.isLoading = true
if(Boolean(this.itiId)){
        ItineraryServices
          .getSummaryItineraryFull(this.itiId)
          .then(response => {

            this.summaryItinerary = response.data.data

          })
          .catch(error => console.log("ERROR SUMMARY ITINERARY", error))
          .finally(() => this.isLoading = false)
}
      },

      showActivity(activity) {

        return activity.icono

      },

      async showItineraryModal() {


        //await this.getSummaryItinerary()


        this.$refs['itinerary-modal'].show()

      }

    }

  }

</script>
