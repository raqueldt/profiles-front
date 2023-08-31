<template>
  <b-container fluid  class="w-100" >

<!-- dateFilter: {{dateFilter}}<br>
selectedFilterYatchs: {{selectedFilterYatchs}}<br>
selectedFilterItineraries: {{selectedFilterItineraries}}<br>
selectedFilterItinerariesTypes: {{selectedFilterItinerariesTypes}}<br>
selectedFilterSites: {{selectedFilterSites}}<br>
--------------------------------------------<br>
selectedFilterLargeShortItineraries: {{selectedFilterLargeShortItineraries}}<br>
selectedFilterSpecies: {{selectedFilterSpecies}}<br>
selectedFilterPax: {{selectedFilterPax}}<br> -->

    <b-row class="filters-card">

        <!-- Rango de fechas -->
        <b-col lg="4">
            <div class="form-group has-float-label custom-input mb-0">
              <date-range-picker
                ref="picker"
                v-model="dateFilter"
                opens="right"
                :locale-data="{locale, format: 'ddd dd, mmmm yyyy'}"
                :ranges="ranges"
                :autoApply="true"
                @update="saveRangeInSession(dateFilter)">
              </date-range-picker>
              <span>{{ $t('gps.select-dates') }}</span>
            </div>
        </b-col>

        <!-- Filtro por crucero -->
        <b-col lg="2">
            <div class="form-group has-float-label custom-selects mb-0" >
              <multiselect               
                v-model="selectedFilterYatchs"
                :options="filterYatchs"
                :multiple="true"
                :searchable="true"
                group-values="cruName" group-label="cruCategory" :group-select="true"
                :showNoOptions="true" placeholder="" track-by="cruId" label="cruName">
              </multiselect>
              <span>{{ $t('gps.select-yacht') }}</span>
              <b-form-invalid-feedback>{{ $t("gps.choose-yacht") }}</b-form-invalid-feedback>
            </div>
        </b-col>

        <!-- Filtro por noches -->
        <b-col lg="2">
            <div class="form-group has-float-label custom-selects mb-0">
              <multiselect                
                v-model="selectedFilterItineraries"
                :options="filterItineraries" 
                :multiple="true"
                :searchable="true" 
                group-values="itinNigths" 
                group-label="itinerariesTypes" 
                :group-select="true"
                :showNoOptions="true" 
                placeholder="" 
                track-by="id" 
                @input="enableAllItineraries"
                label="nights">
              </multiselect>
              <span>{{ $t('gps.select-nights') }}</span>
              <b-form-invalid-feedback>{{ $t("gps.please-select-itineraries") }}</b-form-invalid-feedback>
            </div>
            <!-- {{filterItineraries}}
            <pre>=>{{selectedFilterItineraries}}</pre> -->
        </b-col>
        
        <!-- Filtro por tipo de itinerario -->
        <b-col lg="2">
          <!-- multiple -->
            <div class="form-group has-float-label custom-selects ">
              <v-select
                v-model="selectedFilterItinerariesTypes"
                label="metName"
                :options="filterTypeItineraries"                 
                :dir="direction"/>                
              <span>{{ $t('gps.select-itin-type') }}</span>
              <b-form-invalid-feedback>{{ $t("gps.select-itin-type") }}</b-form-invalid-feedback>
            </div>

            <!-- {{filterTypeItineraries}} -->
            <!-- {{filterTypeItineraries}}
            <pre>=>{{selectedFilterItinerariesTypes}}</pre> -->
            <!-- <pre>=>{{selectedFilterItinerariesTypes}}</pre> -->
        </b-col>

        <!-- Filtro por sitios -->
        <b-col lg="2">
              <div class="form-group has-float-label custom-selects ">
              <multiselect
                v-model="selectedFilterSites"
                :options="filterSites" :multiple="true"
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

    <b-row  class="filters-card ">

        <!-- Filtro por tipo de itinerario Standard y All Itineraries -->
        <b-col lg="2">

            <div class="form-group has-float-label custom-selects ">
              <v-select
                v-model="selectedFilterLargeShortItineraries"
                label="value"
                :options="filterLargeItineraries"
                :clearable="false"
                :dir="direction" />
              <span>{{ $t('gps.itinerary') }}</span>
              <b-form-invalid-feedback>{{ $t("gps.select-itin-type") }}</b-form-invalid-feedback>
            </div>
        </b-col>

        <!-- Filtro por actividades -->
        <!-- <b-col lg="2">
            <div class="form-group has-float-label custom-selects mb-0">
              <v-select
                v-model="selectedFilterActivities"
                multiple
                :options="filterActivities"
                label="activityName" :dir="direction " />
              <span>{{ $t('gps.select-activities') }}</span>
              <b-form-invalid-feedback>{{ $t("gps.select-activity") }}</b-form-invalid-feedback>
            </div>
        </b-col> -->

        <!-- Filtro por especies -->
        <b-col lg="2">
          <div class="form-group has-float-label custom-selects mb-0">
            <v-select
              v-model="selectedFilterSpecies"
              multiple
              :options="filterSpecies" label="speName"
              :dir="direction" />
            <span>{{ $t('gps.select-species') }}</span>
            <b-form-invalid-feedback>{{ $t("gps.please-select-species") }}</b-form-invalid-feedback>
          </div>
        </b-col>

        <!-- Filtro por pax -->
        <b-col lg="2">
          <div class="form-group has-float-label custom-selects ">
              <multiselect
                v-model="selectedFilterPax"
                :options="filterPax" 
                :multiple="false"
                :taggable="true"
                :searchable="true"
                :showNoOptions="true"
                placeholder=""
              >
                <template slot="singleLabel" slot-scope="{ option }">
                  <small>{{ option }}</small>
                </template>
              </multiselect>
            <span>{{ $t('gps.pax-label') }}</span>
            <b-form-invalid-feedback>{{ $t("gps.pax-label") }}</b-form-invalid-feedback>
          </div>
        </b-col>

        <!-- Filtro por rango de precios -->
        <b-col lg="4">
              <vue-slider
                    v-model="selectedFilterRange"
                    ref="slider"
                    :min="1000"
                    :max="15000"
                    :interval="1000"
                    :marks="marks"
                    :enable-cross="false"
                    :adsorb="true"
                    :included="true"
                    :tooltip-placement="['bottom', 'bottom']"
                    tooltip-dir="['bottom']"
                    :piecewise="true"
                    :drag-on-click="true"

                    :direction="direction"
                    data-toggle="tooltip" data-placement="top" :title="$t('gps.price-slider')"
                    :tooltip-formatter="formatter1">
              </vue-slider>
        </b-col>

        <b-col lg="2" class="text-left"><label>{{$t('gps.price-slider')}}($)</label>
                  <b-button 
                    class="float-right mr-4"
                    @click="cleanFilters()"
                    v-tooltip="{content: 'Clean filters', placement: 'top'}"
                    variant="outline-primary" 
                    size="sm"
                    >
                    <i class="glyph-icon simple-icon-energy"></i>
                  </b-button>
        </b-col>
    </b-row>

  </b-container>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
  import importComponents from "../../../../../importComponents.vue";
  import {
    getDirection
  } from "../../../../../utils";
  import InputTag from '../../../../../components/Form/InputTag'
  import vSelect from 'vue-select'
  import 'vue-select/dist/vue-select.css'
  import VueSlider from "vue-slider-component";
  import "vue-slider-component/theme/antd.css";
  import Datepicker from "vuejs-datepicker";
  import moment from "moment";
  export default {
    mixins: [importComponents],
    components: {
      'input-tag': InputTag,
      'v-select': vSelect,
      datepicker: Datepicker,
      "vue-slider": VueSlider
    },
    data() {
      return {      
        marks: {
          '1000': '1k',
          '2000': '2k',
          '3000': '3k',
          '4000': '4k',
          '5000': '5k',
          '6000': '6k',
          '7000': '7k',
          '8000': '8k',
          '9000': '9k',
          '10000': '10k',
          '11000': '11k',
          '12000': '12k',
          '13000': '13k',
          '14000': '14k',
          '15000': '15k',
        },  
        hasActiveFilters: false, // control para indicador visual de filtros activos
        visible: false,   
        filterItineraries: [],
        filterTypeItineraries: [],
        filterYatchs: [],
        filterActivities: [],
        filterSites: [],
        filterSpecies: [],
        filterCompany: [],
        filterPercent: [],
        filterLargeItineraries: [{id: "1", value: "Standard"},{id: "2", value: "All itineraries"}],
        initialFilterLargeItineraries: [{id: "1", value: "Standard"}],
        filterPax: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
        selectedFilterCompany: [],
        selectedFilterPercent: "",
        selectedComision: "",
        direction: getDirection().direction,
        formatter1: '${value}',
      }
    },
    computed: {
      /* Al colocar metodos set y get mantenemos reactividad en las variables*/
      /* Ya no es necesario colocarlas en data() ni watch()*/
      /* Con esto reviso si existen valores guardados previamente en la tienda y los traigo*/
      // Traigo Datos de filtros iniciales
      selectedFilterYatchs: {
        get() {
          this.$emit('yatchFilter', this.$store.getters.getYatchMainFilters);
          return this.$store.getters.getYatchMainFilters
        },
        set(value) {
          this.$emit('yatchFilter', value);
          this.$store.commit('setYatchsMainFilter', value);
          this.checkActiveFilters()
        }
      },
      selectedFilterItineraries: {
        get() {
          this.$emit('itinerariesFilter', this.$store.getters.getItineraryMainFilters);
          return this.$store.getters.getItineraryMainFilters
        },
        set(value) {
          this.$emit('itinerariesFilter', value);
          this.$store.commit('setItinerariesMainFilter', value);
          this.checkActiveFilters()
        }
      },
      selectedFilterItinerariesTypes: {
        get() {
          this.$emit('itinerariesTypeFilter', this.$store.getters.getTypeItineraryMainFilters);
          return this.$store.getters.getTypeItineraryMainFilters
        },
        set(value) {
          this.$emit('itinerariesTypeFilter', value);
          this.$store.commit('setTypeItineraryFiltersMainFilter', value);
          this.checkActiveFilters()
        }
      },
      // Itinerarios Standard y All Itineraries
      selectedFilterLargeShortItineraries: {
        get() {
          this.$emit('itinerariesLargeShortFilter', this.$store.getters.getLargeShortItineraryMainFilters);
          return this.$store.getters.getLargeShortItineraryMainFilters
        },
        set(value) {
          this.$emit('itinerariesLargeShortTypeFilter', value);
          this.$store.commit('setLargeShortItineraryFiltersMainFilter', value);
          this.checkActiveFilters()
        }
      },
      // Pax
      selectedFilterPax: {
        get() {
          this.$emit('paxFilter', this.$store.getters.getPaxMainFilters);
          return this.$store.getters.getPaxMainFilters
        },
        set(value) {
          this.$emit('paxFilter', value);
          this.$store.commit('setPaxMainFilter', value);
          this.checkActiveFilters()
        }
      },
      //
      dateFilter: {
        get() {
          this.$emit('dateFilter', this.$store.getters.getDateMainFilter);
          return this.$store.getters.getDateMainFilter
        },
        set(value) {
          this.$emit('dateFilter', value);
          this.$store.commit('setDateMainFilter', value);
        }
      },
      selectedFilterActivities: {
        get() {
          this.$emit('activitiesFilter', this.$store.getters.getActivitySecondaryFilters);
          return this.$store.getters.getActivitySecondaryFilters
        },
        set(value) {
          if (value.length > 0) {
            this.$store.dispatch('getItinerariesByActivities', value)
          }
          this.$emit('activitiesFilter', value);
          this.$store.commit('setActivitySecondaryFilters', value);
          this.checkActiveFilters()
        }
      },
      selectedFilterSites: {
        get() {
          this.$emit('sitesFilter', this.$store.getters.getSitesSecondaryFilters);
          return this.$store.getters.getSitesSecondaryFilters
        },
        set(value) {
          if (value.length > 0) {
            this.$store.dispatch('getItinerariesBySites', value)
          }
          this.$emit('sitesFilter', value);
          this.$store.commit('setSitesSecondaryFilters', value);
          this.checkActiveFilters()
        }
      },
      selectedFilterSpecies: {
        get() {
          this.$emit('speciesFilter', this.$store.getters.getSpeciesSecondaryFilters);
          return this.$store.getters.getSpeciesSecondaryFilters
        },
        set(value) {
          if (value.length > 0) {
            this.$store.dispatch('getItinerariesBySpecies', value)
          }
          this.$emit('speciesFilter', value);
          this.$store.commit('setSpeciesSecondaryFilters', value);
          this.checkActiveFilters()
        }
      },
      selectedFilterRange: {
        get() {
          this.$emit('rangePricesFilter', this.$store.getters.getRangeSecondaryFilters);
          return this.$store.getters.getRangeSecondaryFilters
        },
        set(value) {
          this.$emit('rangePricesFilter', value);
          this.$store.commit('setRangeSecondaryFilters', value);
          this.checkActiveFilters()
        }
      },
    },
    watch: {
      selectedFilterCompany() {
        // Al ser solo un unico valor que acepta el Select, debo transformar a array el objeto
        var arr = [];
        arr.push(this.selectedFilterCompany)
        this.$emit('companyFilter', arr);
        this.$store.commit('setCompanySecondaryFilters', arr);
      },
      selectedFilterPercent() {
        this.$emit('percentFilter', this.selectedFilterPercent);
        this.$store.commit('setPorcentSecondaryFilters', this.selectedFilterPercent);
      },
      selectedComision() {
        this.$emit('comisionFilter', this.selectedComision);
        this.$store.commit('setComisionSecondaryFilters', this.selectedComision);
      },
    },
    methods: {
      enableAllItineraries(){
        /*  Al momento de seleccionar la opción "Compound", o algún itinerario largo (> 8 noches), 
            se debe habilitar la opción de "All itineraries". Caso contrario, se debe colocar la opción de "Standar" */
        let arrayCompound = this.selectedFilterItineraries.filter(b => b.id >= 8).map(a => a.id);        
        var checkCompoundOnSelect = this.selectedFilterItineraries.some(item => arrayCompound.includes(item.id))
        if(checkCompoundOnSelect) this.selectedFilterLargeShortItineraries = {id: "2", value: "All itineraries"};
        else this.selectedFilterLargeShortItineraries = {id: "1", value: "Standard"};
      },      
      refresh(){
        this.$emit('reload');
      },      
      cleanFilters(){
        this.selectedFilterYatchs = "";
        this.selectedFilterItineraries = [];
        this.selectedFilterItinerariesTypes = [];
        this.selectedFilterSites = [];
        //this.selectedFilterLargeShortItineraries = [];
        this.selectedFilterSpecies = [];
        this.selectedFilterPax = "";
        this.selectedFilterRange = [1000, 10000];

      },
      //// 2021-07-01 | fg | determinar si existen filtros activos
      checkActiveFilters() {
          this.hasActiveFilters =  false
          // Evaluar si los filtros tienen elementos, SI, entonces hay filtros activos
          if (
              this.selectedFilterYatchs.length
              || this.selectedFilterItineraries.length
              || this.selectedFilterItinerariesTypes.length
              || this.selectedFilterSites.length
              || this.selectedFilterActivities.length
              || this.selectedFilterSpecies.length
          )  this.hasActiveFilters =  true
      },
      ////
      // ********* Filtro de Rango en SessionStorage **********
      saveRangeInSession(dateFilter) {
        sessionStorage.setItem('initialDateRangeFilter', JSON.stringify(dateFilter));
      },

      checkInitialRangeInSession() { // Llamado en Mounted
        let initialDates = JSON.parse(sessionStorage.getItem('initialDateRangeFilter'))
        //// 2021-06-30 | fg | predeterminar periodo a fecha actual + 30 días
        if ( initialDates == null ) {
            this.setDefaultDateRange()
            initialDates = JSON.parse(sessionStorage.getItem('initialDateRangeFilter'))
        }
        ////
        if (initialDates!== null && initialDates.startDate !== null && initialDates.endDate !== null) {
          this.dateFilter.startDate = initialDates.startDate;
          this.dateFilter.endDate = initialDates.endDate;
        }
      },
      //// 2021-06-30 | fg | predeterminar periodo a fecha actual + 30 días
      setDefaultDateRange(){
          const defaultDateRange = {
            startDate: moment(),
            endDate: moment().add({days: 30})
          }
          this.saveRangeInSession(defaultDateRange)
      },
      ////
      // ********* Fin Filtro de Rango en SessionStorage **********
      onlyNumber($event) {
        //console.log($event.keyCode); //keyCodes value
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
          $event.preventDefault();
        }
      },
      setComisionSelected() {
        if (this.selectedFilterCompany) {
          this.selectedFilterPercent = "";
          this.selectedComision = this.selectedFilterCompany.comision_voyager;
        }
      },
      setComisionTyped() {
        this.selectedFilterCompany = "";
        this.selectedComision = 0
        if (this.selectedFilterPercent) this.selectedComision = this.selectedFilterPercent;
      },
      async checkFromStore() {
        /*
        1. Consulto valores iniciales en tienda (Yatchs, itinerarios, tipos de itinerarios) de la tienda y seteo en los modelos de los selects
        */
        var filterDate = this.$store.getters.getDateMainFilter;
        //console.log("check store filte date ", filterDate)
        
        var filterYatchsList = this.$store.getters.getInitialYatchsList;
        this.selectedFilterYatchs = sessionStorage.getItem('setYatchsMainFilter') ? JSON.parse(sessionStorage.getItem('setYatchsMainFilter')) : '';        
        //console.log("check store filter yatch ", filterYatchsList)

        var filterItinerariesList = this.$store.getters.getInitialItinerariesList;
        this.selectedFilterItineraries = sessionStorage.getItem('setItinerariesMainFilter') ? JSON.parse(sessionStorage.getItem('setItinerariesMainFilter')) : '';        
        //console.log("check store filter itinerary ", filterItinerariesList)

        var filterTypeItinerariesList = this.$store.getters.getInitialItinerariesTypeList;
        this.selectedFilterItinerariesTypes = sessionStorage.getItem('setTypeItineraryFiltersMainFilter') ? JSON.parse(sessionStorage.getItem('setItinerariesMainFilter')) : '';        
        //console.log("check store filter itinerary list ", filterTypeItinerariesList)

        var filterSitesList = this.$store.getters.getInitialSitesList;
        this.selectedFilterSites = sessionStorage.getItem('setSitesSecondaryFilters') ? JSON.parse(sessionStorage.getItem('setSitesSecondaryFilters')) : '';        

        var filterSpeciesList = this.$store.getters.getInitialSpeciesList;
        this.selectedFilterSpecies = sessionStorage.getItem('setSpeciesSecondaryFilters') ? JSON.parse(sessionStorage.getItem('setSpeciesSecondaryFilters')) : '';        

        this.selectedFilterPax = sessionStorage.getItem('setPaxMainFilter') ? JSON.parse(sessionStorage.getItem('setPaxMainFilter')) : '';        

        //this.selectedFilterRange = sessionStorage.getItem('setRangeSecondaryFilters') ? JSON.parse(sessionStorage.getItem('setRangeSecondaryFilters')) : '';        
        //this.selectedFilterLargeShortItineraries = sessionStorage.getItem('setLargeShortItineraryFiltersMainFilter') ? JSON.parse(sessionStorage.getItem('setLargeShortItineraryFiltersMainFilter')) : '';        

        if (filterDate) {
          this.dateFilter = filterDate;
          this.$emit('dateFilter', filterDate);
        }
          //// 2021-07-09 | fg | reestructuración
          let myArray = []
          if ( filterYatchsList.length ) {
             myArray = filterYatchsList;
          }
          else {
             await this.$store.dispatch('getYatchs')
             myArray = this.$store.getters.getInitialYatchsList;
          }
          /////
          //Agrupamiento de categoria para multiselect
          let groups = Object.create(null);
          let grouped = [];
          myArray.forEach(function (o) {
            if (!groups[o.cruCategory]) {
              groups[o.cruCategory] = [];
              grouped.push({
                cruCategory: o.cruCategory,
                cruName: groups[o.cruCategory],
              });
            }
            groups[o.cruCategory].push({
              cruId: o.cruId,
              cruName: o.cruName,
              vslId: o.vslId,
            });
          });
          this.filterYatchs = grouped;
        if (filterItinerariesList.length > 0) {
          this.filterItineraries = filterItinerariesList;
        } else {
          this.$store.dispatch('getAllItineraries').then(() => {
            this.filterItineraries = this.$store.getters.getInitialItinerariesList;
          })
        }
        if (filterTypeItinerariesList.length > 0) {
          this.filterTypeItineraries = filterTypeItinerariesList;
        } else {
          this.$store.dispatch('getItinerariesType').then(() => {
            this.filterTypeItineraries = this.$store.getters.getInitialItinerariesTypeList;
          })
        }
        /* 2. Consulto valores en tienda (Activities, Sites, Species, company) de la tienda
           En caso de existir, los seteo en los modelos de los selects, caso contrario, llamo a la API.
        */
        var filterActivitiesList = this.$store.getters.getInitialActivityList;        
        
        var filterCompanyList = this.$store.getters.getInitialCompanyList;
        if (filterActivitiesList.length > 0) {
          this.filterActivities = filterActivitiesList;
        } else {
          this.$store.dispatch('getAllActivities').then(() => {
            this.filterActivities = this.$store.getters.getInitialActivityList;
          })
        }
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
          this.filterSites = groupedSite;
        // -------------------------------------------- FIN SITES --------------------------------------------
        if (filterSpeciesList.length > 0) {
          this.filterSpecies = filterSpeciesList;
        } else {
          this.$store.dispatch('getAllSpecies').then(() => {
            this.filterSpecies = this.$store.getters.getInitialSpeciesList;
          })
        }
        if (filterCompanyList.length > 0) {
          this.filterCompany = filterCompanyList;
        } else {
          this.$store.dispatch('getComisionGPS').then(() => {
            this.filterCompany = this.$store.getters.getInitialCompanyList;
          })
        }
        /* 3. Reviso si existen valores guardados previamente en la tienda (Company, Percent y Comision)
         y los traigo. No aplico metodos set() y get() porque son excluyentes*/
        var companyStore = this.$store.getters.getCompanySecondaryFilters;
        var percentStore = this.$store.getters.getPorcentSecondaryFilters;
        var comisionStore = this.$store.getters.getComisionSecondaryFilters;
        if (companyStore.length > 0) {
          this.selectedFilterCompany = companyStore;
        }
        if (percentStore) {
          this.selectedFilterPercent = percentStore;
        }
        if (comisionStore) {
          this.selectedComision = comisionStore;
        }
      },
          groupBy(array, key){
            const result = {}
            array.forEach(item => {
                if (!result[item[key]]){
                result[item[key]] = []
                }
                result[item[key]].push(item)
            })
            return result
            },
      clearClient() {
        this.selectedFilterCompany = '';
        this.selectedFilterPercent = '';
        this.selectedComision = '';
      }
    },
    created(){
    },
    mounted() {
      this.checkInitialRangeInSession();
      //this.checkInitialCruisesInSession();
      this.checkFromStore();
    },
  }
</script>


<style scoped>
* >>> div.vue-daterange-picker div.form-control.reportrange-text {
  border-right: 1px solid #d7d7d7 !important;
}
* >>> div.custom-selects .multiselect__tags {
  background: white !important;
}

* >>> .vue-slider-mark-label {
  font-size: 11px !important;
}
</style>