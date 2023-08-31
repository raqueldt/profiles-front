<template>

  <div>

    <b-row class="mb-1">
      
      <b-col class="center-element-mobile" lg="3" xs="6" sm="6">
        <b-button
          variant="link"
          class="p-0 d-inline"
          @click="handleShow"
        >
          <b-icon icon="filter"/>
          Advanced filters
          <span
          v-if="totalAppliedFilterCategories"
          class="ml-1 text-muted d-inline"
        >

          <b-badge variant="dark" class="p-1">
              <strong> {{ totalAppliedFilterCategories }} </strong>
          </b-badge>
        </span>
        </b-button>

        
      </b-col>


      <b-col class="center-element-mobile info-status-btn" lg="9"  xs="6" sm="6" >
        <!-- <b-container fluid class="info-status-btn text-left center-element-mobile"> -->
                <!-- <b-button-group size="lg" class="st" > -->
                  <b-button
                  squared
                    v-if="selectedDeparturesFromChild.length"
                    v-b-modal.modalsendoptions
                    rounded
                    variant="outline-primary"
                    size="sm"
                    v-tooltip="{
                      content: 'Send options',
                      placement: 'top',
                      classes: ['itineraries']
                    }"
                  >
                    <span class="badge send-op badge-primary">{{selectedDeparturesFromChild.length}}</span>
                    {{ $t("gps.send-option") }}
                  </b-button>
                  <b-button
                    v-if="selectedDeparturesFromChild.length"
                    v-b-modal.modalsendoptions
                    rounded
                    variant="outlined-primary"
                    size="sm"
                    class="text-primary"
                    @click="$emit('cleanSelectedDepartures')"
                    v-tooltip="{
                      content: 'Clean selected departures',
                      placement: 'top',
                      classes: ['itineraries']
                    }"
                  >
                    <i class="glyph-icon simple-icon-refresh"></i>
                  </b-button>
                <!-- </b-button-group> -->
              <!-- </b-container> -->
      </b-col>

    </b-row>


    <b-sidebar
      id="sidebar-filters"
      title="Filters"
      v-model="showSidebar"
      backdrop
      shadow
      @hidden="syncFilters"
    >
      <div class="px-3 py-2">

        <!-- filter nights -->
        <b-row class="mb-2">
          <b-col>

            <div class="d-flex justify-content-between">
              <strong>Nights</strong>
              <div>
                <b-button
                  variant="link"
                  class="p-0"
                  @click="toggleFilterNights"
                >
                  {{ toggleTextNights }}
                </b-button>
              </div>

            </div>
            <hr class="mt-0 mb-1">

            <!-- <b-form-checkbox-group
              v-model="selectedNights"
              :options="fetchFilterNights"
              stacked
            ></b-form-checkbox-group> -->
            <b-form-checkbox-group
              v-model="selectedNights"
              :options="fetchFilterNights"
              inline
            ></b-form-checkbox-group>

          </b-col>
        </b-row>

        <!-- filter itinerary types -->
        <b-row>
          <b-col>
            <div class="d-flex justify-content-between">
              <strong>Itinerary Types</strong>
              <div>
                <b-button
                  variant="link"
                  class="p-0"
                  @click="toggleFilterItineraryTypes"
                >
                  {{ toggleTextItineraryTypes }}
                </b-button>
              </div>

            </div>
            <hr class="mt-0 mb-1">
            
            <b-form-checkbox
              inline
              v-for="option in fetchFilterItineraryTypes"
              v-model="selectedItineraryTypes"
              :key="option.type"
              :value="option.type"
              stacked
            >
              {{ option.name }}
            </b-form-checkbox>

          </b-col>
        </b-row>


        <!-- sites -->
        <b-row class="mt-2">
          <b-col>
            <div class="d-flex justify-content-between">
              <strong>Sites</strong>
              <div>
                <b-button
                  variant="link"
                  class="p-0"
                  @click="toggleFilterSites"
                >
                  {{ toggleTextSites }}
                </b-button>
              </div>

            </div>
            <hr class="mt-0 mb-1">

            <div class="form-group has-float-label custom-selects mt-3">
              <!-- {{selectedSites}} -->
              <multiselect
                v-model="selectedSites"
                :options="fetchSites" 
                :multiple="true"
                :searchable="true"
                group-values="sites"
                group-label="plaName"
                :group-select="true"
                :showNoOptions="true"
                placeholder=""
                track-by="sitId"
                label="sitName">
              </multiselect>
                <span>{{ $t('gps.select-sites') }}</span>
                <b-form-invalid-feedback>{{ $t("gps.please-select-sites") }}</b-form-invalid-feedback>
            </div>

          </b-col>
        </b-row>


        <!-- Species -->
        <b-row class="mt-1">
          <b-col>
            <div class="d-flex justify-content-between">
              <strong>Species</strong>
              <div>
                <b-button
                  variant="link"
                  class="p-0"
                  @click="toggleFilterSpecies"
                >
                  {{ toggleTextSpecies }}
                </b-button>
              </div>

            </div>
            <hr class="mt-0 mb-1">

            <div class="form-group has-float-label custom-selects mt-3">
              <multiselect
                v-model="selectedSpecies"
                :options="fetchSpecies" 
                :multiple="true"
                :searchable="true"
                :group-select="true"
                :showNoOptions="true"
                placeholder=""
                track-by="speId"
                label="speName">
              </multiselect>
                <span>{{ $t('gps.select-sites') }}</span>
                <b-form-invalid-feedback>{{ $t("gps.please-select-sites") }}</b-form-invalid-feedback>
            </div>

          </b-col>
        </b-row>


         <!-- Promotions -->
         <b-row class="mt-1">
          <b-col>
            <div class="d-flex justify-content-between">
              <strong>Promotions</strong>
              <div>

                <b-button
                  variant="link"
                  class="p-0"
                  @click="toggleFilterPromotions"
                >
                  {{ toggleTextPromotions }}
                </b-button>
              </div>

            </div>
            <hr class="mt-0 mb-1">

            <!-- <div class="form-group has-float-label custom-selects mt-3"> -->
              <b-form-checkbox v-model="selectedPromotions" name="check-button" switch>                 
                <span> {{selectedPromotions ? 'Departures with promotions' : 'All'}}</span>
              </b-form-checkbox>
                
              
            <!-- </div> -->

          </b-col>
        </b-row>




        <!-- action buttons -->
        <b-row class="mt-3">
          <b-col>
            <b-button
              block
              variant="secondary"
              @click="resetAllFilters"
            >
              Reset
            </b-button>
          </b-col>

          <b-col>
             <b-button
              variant="primary"
              block
              @click="handleApply"
              :disabled="fetchFilteringState"
             >
               <template v-if="fetchFilteringState">
                  <b-spinner small></b-spinner>
                  Appling...
               </template>

               <template v-else>
                  Apply
               </template>

             </b-button>

          </b-col>
        </b-row>



      </div>
    </b-sidebar>


  </div>

</template>


<script>

import vSelect from 'vue-select'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {

  name: 'AvailabilityFilters',

  components: {
    vSelect
  },
  props: ["selectedDeparturesFromChild"],
  data() {

    return {
      isBusy: false,
      showSidebar: false,
      selectedNights: [],
      selectedItineraryTypes: [],
      selectedSites:[],
      fetchSites:[],
      selectedSpecies:[],
      fetchSpecies:[],
      selectedPromotions: false,
      
    }

  },

  computed: {

    ...mapGetters('availability-module', ['fetchFilterNights', 'fetchFilterItineraryTypes', 'fetchFilteringState', 'fetchFilterCriteria', 'fetchSummaryFilterCriteria']),

    // establecer texto filter nights
    toggleTextNights(){

      return this.selectedNights.length == this.fetchFilterNights.length  ? 'Reset' : 'Select all'

    },

    // establecer texto filter itinerary types
    toggleTextItineraryTypes(){

      return this.selectedItineraryTypes.length == this.fetchFilterItineraryTypes.length ? 'Reset' : 'Select all'

    },

    toggleTextSites(){

      return this.selectedSites.length > 0  ? 'Reset' : ''

    },

    toggleTextSpecies(){

      return this.selectedSpecies.length > 0  ? 'Reset' : ''

    },

    toggleTextPromotions(){

      return Boolean(this.selectedPromotions)  ? 'Reset' : ''

    },

    // categorías con filtros aplicados
    totalAppliedFilterCategories() {
      return this.fetchSummaryFilterCriteria.length ?? 0
    }

  },

  methods: {

    ...mapActions('availability-module', ['loadFilteredAvailability']),

    ...mapMutations('availability-module', ['setFilterCriteria',  'setFilteringState']),

    handleShow(){

      this.showSidebar = true

    },


    // select all/reset filter nights
    toggleFilterNights() {

      // se han seleccionado todas las opciones, entonces RESET
      if ( this.selectedNights.length == this.fetchFilterNights.length )
        this.selectedNights = []
      // no se han seleccionado todas las opciones, entonces SELECT ALL
      else
        this.selectedNights = [ ...this.fetchFilterNights ]

    },

    // select all/reset filter itinerary types
    toggleFilterItineraryTypes() {

      // se han seleccionado todas las opciones, entonces RESET
      if ( this.selectedItineraryTypes.length == this.fetchFilterItineraryTypes.length )
        this.selectedItineraryTypes = []
      // no se han seleccionado todas las opciones, entonces SELECT ALL
      else
        this.selectedItineraryTypes =  this.fetchFilterItineraryTypes.map( itinerary => itinerary.type )

    },

    toggleFilterSites() {
      if (this.selectedSites.length > 0 ) this.selectedSites = [];
    },
    
    toggleFilterSpecies() {
      if (this.selectedSpecies.length > 0 ) this.selectedSpecies = false;
    },

    toggleFilterPromotions() {
      if (Boolean(this.selectedPromotions) ) this.selectedPromotions = false;
    },

    // reset all filters
    resetAllFilters() {

       this.selectedNights = []
       this.selectedItineraryTypes = []

       this.selectedSites = []
       this.selectedSpecies = []
       this.selectedPromotions = false

    },

    async getItinerariesBySites(){
      let selectedSitesOnlySitId = this.selectedSites;     
      await this.$store.dispatch('getItinerariesBySites', selectedSitesOnlySitId);
      var filterItineariesBySites = await this.$store.getters.getItinerariesBySites;
      var filterSitesByItiId = filterItineariesBySites.map((a) => a.itiId);
      return filterSitesByItiId;
    },


    async getItinerariesBySpecies(){
      let selectedSpeciesOnlySpeId = this.selectedSpecies;          
      await this.$store.dispatch('getItinerariesBySpecies', selectedSpeciesOnlySpeId);
      var filterItineariesBySpecies = await this.$store.getters.getItinerariesBySpecies;
      var filterSpeciesByItiId = filterItineariesBySpecies.map((a) => a.itiId);
      return filterSpeciesByItiId;
    },    


    async updateFilterCriteria() {

    // --------------- Sitios  --------------- 

      if(this.selectedSites.length > 0 ) var filterSitesByItiId = await this.getItinerariesBySites(); 
      else var filterSitesByItiId = 0;
      
    // --------------- Especies  --------------- 

      if(this.selectedSpecies.length > 0 ) var filterSpeciesByItiId = await this.getItinerariesBySpecies();
      else var filterSpeciesByItiId = 0;

      var filterCriteria = [];
      if(this.selectedNights.length > 0)          filterCriteria.push({field: 'itiNights', values: [...this.selectedNights] })
      if(this.selectedItineraryTypes.length > 0)  filterCriteria.push({field: 'itiType', values: [...this.selectedItineraryTypes] })
      if(filterSitesByItiId.length > 0)           filterCriteria.push({field: 'itiId', values: [...filterSitesByItiId] })
      if(filterSpeciesByItiId.length > 0)         filterCriteria.push({field: 'itiId', values: [...filterSpeciesByItiId] })
      if( Boolean(this.selectedPromotions))       filterCriteria.push({field: 'prices.promotion', values: [true] })

      // const filterCriteria = [
      //   {field: 'itiNights', values: [...this.selectedNights] },
      //   {field: 'itiType', values: [...this.selectedItineraryTypes] },
      //   {field: 'itiId', values: [...filterSitesByItiId] }       
      //   {field: 'itiId', values: [...filterSpeciesByItiId] }       
      // ]
      
      // set filters
      this.setFilterCriteria( { filterCriteria } )

    },

    // procesar filtros seleccionados
    async handleApply() {

      // Persistencia:
      await this.savePersistence()

      await this.updateFilterCriteria()

      this.setFilteringState( true )

      // procesar filtros
      await this.loadFilteredAvailability()

      this.setFilteringState( false )

      // cerrar sidebar
      this.showSidebar = false


    },

    // al cerrar sidebar, sincronizar últimos filtros aplicados con la data local
    syncFilters() {

      const { itiNights = [], itiType = [] } = this.fetchFilterCriteria

      this.selectedNights = itiNights
      this.selectedItineraryTypes = itiType

    },

    async savePersistence(){

          //Persistencia para Noches:
          localStorage.setItem('selectedAdvancedNights', JSON.stringify(this.selectedNights));

          //Persistencia para Itinerarios:
          localStorage.setItem('selectedAdvancedItineraries', JSON.stringify(this.selectedItineraryTypes));

          //Persistencia para Sites:
          localStorage.setItem('selectedAdvancedSites', JSON.stringify(this.selectedSites));

          //Persistencia para Especies:
          localStorage.setItem('selectedAdvancedSpecies', JSON.stringify(this.selectedSpecies));

          //Persistencia para Promociones :
          localStorage.setItem('selectedAdvancedPromotions', JSON.stringify(this.selectedPromotions));

      },
    async setPersistence(){
   
        //Persistencia para Noches:      
        var selectedAdvancedNights = JSON.parse(localStorage.getItem('selectedAdvancedNights'));
        if(Boolean(selectedAdvancedNights)) this.selectedNights = selectedAdvancedNights;

        //Persistencia para Itinerarios:
        var selectedAdvancedItineraries = JSON.parse(localStorage.getItem('selectedAdvancedItineraries'));
        if(Boolean(selectedAdvancedItineraries)) this.selectedItineraryTypes = selectedAdvancedItineraries;

        //Persistencia para Sites:
        var selectedAdvancedSites = JSON.parse(localStorage.getItem('selectedAdvancedSites'));
        if(Boolean(selectedAdvancedSites)) this.selectedSites = selectedAdvancedSites;

        //Persistencia para Especies:
        var selectedAdvancedSpecies = JSON.parse(localStorage.getItem('selectedAdvancedSpecies'));
        if(Boolean(selectedAdvancedSpecies)) this.selectedSpecies = selectedAdvancedSpecies;

        //Persistencia para Promociones:
        var selectedAdvancedPromotions = JSON.parse(localStorage.getItem('selectedAdvancedPromotions'));
        if(Boolean(selectedAdvancedPromotions)) this.selectedPromotions = selectedAdvancedPromotions;        

      }, 


      async getSites() {

        var filterSitesList = this.$store.getters.getInitialSitesList;        

      // -------------------------------------------- SITES --------------------------------------------
          let myArraySites = []
          if ( filterSitesList.length ) {
             myArraySites = filterSitesList;
          }
          else {
             await this.$store.dispatch('getAllSites')
             myArraySites = this.$store.getters.getInitialSitesList;
          }
          //console.log("myArraySites:: " + JSON.stringify(myArraySites));
          let groupsSite = Object.create(null);
          let groupedSite = [];
          myArraySites.forEach(function (o) {
            if (!groupsSite[o.plaName]) {
              groupsSite[o.plaName] = [];
              groupedSite.push({
                //plaName: o.plaName + ' Island',
                plaName: o.plaName,
                sites: groupsSite[o.plaName],
              });
            }
            groupsSite[o.plaName].push({
              sitId: o.sitId,
              plaName: o.plaName,
              sitName: o.sitName,
              sitLand: o.sitLand,
            });
          });
          this.fetchSites = groupedSite;
        // -------------------------------------------- FIN SITES --------------------------------------------

      },

      async getSpecies() {

        this.$store.dispatch('getAllSpecies').then(() => {
            this.fetchSpecies = this.$store.getters.getInitialSpeciesList;
        })
      },      


  },


  async created() {

    // console.log("[2.0] created FILTERs");

    // sincronizar ultimos filtros usados desde state
    await this.syncFilters()

    await this.setPersistence()

    await this.getSites();

    await this.getSpecies();

  },


  mounted() {

    // console.log("[2.1] mounted FILTERs");

  },

  unmounted() {

    console.log("[2.9] unmounted FILTERs");

  },






}

</script>
