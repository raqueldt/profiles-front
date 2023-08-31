<template>

  <div>

    <b-row class="mb-2">

      <b-col cols="12">

        <availability-search/>

      </b-col>

    </b-row>


    <!-- loading state -->
    <template v-if="fetchLoadingState">

      <b-card>

        <b-row>

          <b-col class="text-center text-muted">

            <b-spinner style="width: 3rem; height: 3rem;" variant="primary"></b-spinner>

            <h5>Please wait</h5>
            <p>
              We're checking availability. <br>
              It'll just take a moment
            </p>


          </b-col>

        </b-row>

      </b-card>

    </template>

    <!-- results section -->
    <template v-else>

      <template v-if="fetchInitialState">

              <b-card
                class="mt-4"
                no-body
              >

                <b-card-body class="text-center text-muted mb-2">


                  <b-icon icon="eyeglasses" style="width: 100px; height: 100px;"></b-icon><br>

                  <h1><strong>
                    <!-- No recent searches -->
                    Start by choosing a date rage or month and click the search button.
                  </strong></h1>

                  <b-card-text>
                    <!-- Your recent searches will appear here. -->
                    <!-- Start by choosing a date rage or month and click the search button.<br> -->
                    All other filters are optional but will allow you to look at more specific results faster.
                  </b-card-text>


                </b-card-body>



              </b-card>

      </template>

      <template v-else>



        <!-- resultados de la búsqueda -->
        <template v-if="filteredOriginalRowdata.length">

          <b-row>

            <b-col lg="9" >
              <availability-filters
              :selectedDeparturesFromChild="selectedDeparturesFromChild"
              @cleanSelectedDepartures="dataCleanSelectedDepartures"/>
            </b-col>

            <b-col lg="3" sm="12" class="text-right center-element-mobile">
              <span class="text-muted">
                <small>
                  <strong>{{ this.fetchAvailability.length }}</strong> departures found. {{ fetchAvailabilityUpdatedAt }}
                </small>
              </span>
            </b-col>

          </b-row>





          <availability-departures ref="availabilitydepartures"
            :departures="filteredOriginalRowdata"
            @selectedDeparturesFromChild="dataSelectedDeparturesFromChild"
          />

        </template>

        <!-- empty state -->
        <template v-else>

          <b-card
            class="mt-4"
            no-body
          >

            <b-card-body class="text-center">


              <b-img
                src="/assets/img/atc/empty-state/no_result_found.png"
                fluid
                alt="No result found"
                width="400"
              />


              <b-card-title><h1><strong>No results found</strong></h1></b-card-title>

              <b-card-text>
                Try adjusting you search options to find what you're looking for
              </b-card-text>


            </b-card-body>



          </b-card>

        </template>

      </template>




    </template>






  </div>
</template>

<script>
  /* *** SERVICES *** */
  import AvailabilityServices from "@/services/gps/availability/availabilityServices.js";

  import {
    iconsmind,
    simplelineicons
  } from "@/data/icons";

  import moment from "moment";

  import AvailabilityDepartures from "@/views/app/gps/availability/v2/AvailabilityDeparturesV2.vue"
  // 2021-07-09 | fg
  import AvailabilityFilters from "@/views/app/gps/availability/v2/AvailabilityFiltersV2.vue"


  // 2022-09-26 | fg | search component
  import AvailabilitySearch from '@/views/app/gps/availability/v2/AvailabilitySearchV2.vue'

  import totalSlots from "@/mixins/availability/totalSlots.js";


  import { mapGetters, mapMutations } from 'vuex'




  export default {

    name: "Availability",

    mixins: [totalSlots],

    components: {

      AvailabilityFilters,
      AvailabilityDepartures,
      AvailabilitySearch

    },

    data() {
      return {
        selectedDeparturesFromChild:[],
        cleanSelectedDepartures: false,
        //customToday: moment().format("YYYY-MM-DD"),
        // customAddTodayDays:moment().add(30, 'days').calendar(),
        //moment: moment,
        simplelineicons,
        iconsmind,

        showModal: false,
        respuesta: [],

        // departures: [],
        errorDepartures: "",
        busy: false,
        limit: 50,
        /*
        mensajeDepartures: "",
        mensajeNoResults: "",
        */
        /*
        parentDateFilter: "",
        parentYatchsFilter: [],
        parentItinerariesFilter: [],
        parentItinerariesTypeFilter: [],
        parentActivitiesFilter: [],
        parentItinerariesLargeShortFilter: [],
        parentPaxFilter:"",
        parentSitesFilter: [],
        parentSpeciesFilter: [],
        parentRangePricesFilter: [],
        parentCompanyFilter: [],
        parentPercentFilter: "",
        parentComisionFilter: "",
        page: 1,
        lastPage: 0,
        */
      };
    },

    computed: {

      ...mapGetters('availability-module', ['fetchAvailability', 'fetchFilteredAvailability', 'fetchAvailabilityUpdatedAt', 'fetchLoadingState', 'fetchInitialState', 'fetchFilteringState']),


      /* ********************************************* FILTROS ********************************************* */
      filteredOriginalRowdata: function () {

        // const departures = this.fetchFilteredAvailability;

        const departures = this.fetchFilteredAvailability.filter(function(array, index, thisValue) {
            if(array.prices && array.prices.lowerRate){
                return array.prices.lowerRate.offGrossRate != null || array.prices.lowerRate.offGrossRate != 0
            }
        });

        return departures

      },
      /* ********************************************* FIN FILTROS ********************************************* */
    },

    watch: {

    },



    methods: {

      ...mapMutations('availability-module', ['resetAvailability']),

      // Metodo por verificar
      clickToQuoteAdmin(reqId, gctId, item, cofId) {
        if (cofId == null) {
          this.saveItemToSendSlotParent(item);
        } else {
          this.$router.push({
            name: 'confirmationparent',
            params: {
              cofId: cofId
            }
          })
        }
      },
      dataSelectedDeparturesFromChild(params){
        
        this.selectedDeparturesFromChild = params;
      },
      dataCleanSelectedDepartures(params){
        //this.selectedDeparturesFromChild = params;
        this.$refs.availabilitydepartures.cleanSelectedDepartures()
      },


    },

    mounted() {

      console.log("[0.0] MOUNTED availability");

    },

    unmounted() {
      console.log("[0.9] UNMOUNTED availability");
    },

    created() {
      console.log("[0.1] CREATED availability + RESET ");
      this.resetAvailability()
    },



  };
</script>
