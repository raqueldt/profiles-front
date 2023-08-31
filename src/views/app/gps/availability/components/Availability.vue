<template>
  <div>
    
     <div class="col col-12">
        <h1>{{$t('gps.availability')}}</h1> 
        <span>
            <ul class="nav pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="/app/dashboard" class="active" target="_self">{{ $t("menu.home") }}</a>
                    </li>                   
                    <li class="breadcrumb-item active">
                        <span aria-current="location">{{$t('gps.view-depar')}}</span>
                    </li>
                </ol>
            </ul>
        </span>
        <div class="separator mb-3"></div>

    </div>

    <span class="header-filters text-muted">
      <div class="w-100 p-0">

        <div  class="container-fluid" v-if="parentDateFilter.startDate !=null && parentDateFilter.endDate"  >
                <availability-refresh  @reload="reload"></availability-refresh>
                <availability-filters 
                  @dateFilter                   ="dataDateFilter" 
                  @yatchFilter                  ="dataYatchFilter"
                  @itinerariesFilter            ="dataItinerariesFilter" 
                  @itinerariesTypeFilter        ="dataItinerariesTypeFilter"
                  @itinerariesLargeShortFilter  ="dataItinerariesLargeShortFilter"
                  @paxFilter                    ="dataPaxFilter" 
                  @activitiesFilter             ="dataActivitiesFilter" 
                  @sitesFilter                  ="dataSitesFilter" 
                  @speciesFilter                ="dataSpeciesFilter"
                  @rangePricesFilter            ="dataRangePricesFilter" 
                  @companyFilter                ="dataCompanyFilter" 
                  @percentFilter                ="dataPercentFilter"
                  @comisionFilter               ="dataComisionFilter"
                  @reload                       ="reload">
                </availability-filters>
        </div>

        <div v-else class="container-fluid text-left">
          
                <availability-filters 
                  @dateFilter                   ="dataDateFilter" 
                  @yatchFilter                  ="dataYatchFilter"
                  @itinerariesFilter            ="dataItinerariesFilter" 
                  @itinerariesTypeFilter        ="dataItinerariesTypeFilter"
                  @activitiesFilter             ="dataActivitiesFilter" 
                  @itinerariesLargeShortFilter  ="dataItinerariesLargeShortFilter"
                  @paxFilter                    ="dataPaxFilter" 
                  @sitesFilter                  ="dataSitesFilter" 
                  @speciesFilter                ="dataSpeciesFilter"
                  @rangePricesFilter            ="dataRangePricesFilter" 
                  @companyFilter                ="dataCompanyFilter" 
                  @percentFilter                ="dataPercentFilter"
                  @comisionFilter               ="dataComisionFilter"
                  @reload                       ="reload">
              </availability-filters>
          
        </div>

        <div class="col-lg-12 text-right">

          <div class="mt-1">

              <!-- Indicador de proceso en curso  -->
              <div v-if="isLoading" class="d-flex align-items-center"> 
                <!-- <b-spinner small  class="mx-auto"></b-spinner> -->
                 <div class="mx-auto">
                   <div class="semipolar-spinner">
                    <div class="ring"></div>
                    <div class="ring"></div>
                    <div class="ring"></div>
                    <div class="ring"></div>
                    <div class="ring"></div>
                  </div>
                  <span class="text-primary">Loading</span>
                  </div>
              </div>

          </div>
        </div>

      </div>
    </span>
        <template v-if="filteredOriginalRowdata.length">
            <availability-departures 
                :departures="filteredOriginalRowdata" 
                @reload = reload />           

            <infinite-loading 
                ref="infiniteLoading"
                @infinite="getAvailability" 
                spinner="waveDots" 
                :distance="1"
                force-use-infinite-wrapper="true">
                <div slot="no-more" class="bg-info text-white p-1">No more results</div>  
                <div slot="no-results" class="bg-info text-white p-1">No results</div>     
                <div slot="error" slot-scope="{ trigger }">
                    {{ $t("gps.something-wrong") }}<a href="javascript:;" @click="trigger">{{ $t("gps.here") }}</a> {{ $t("gps.retry") }}
                </div>   

            </infinite-loading>

        </template>

        <template v-else>
          
          <alertsavailability 
                v-if="!isLoading"
                title='No results' 
                img='../../../../assets/img/atc/error.svg'
                message= "Please choose different filter and try again">
          </alertsavailability>    

        </template>       

    <!-- Mensaje de finalización de scroll -->
    <div class="alert end-results alert-light text-center" v-if="mensajeDepartures">{{mensajeDepartures}}</div>

  </div>
</template>

<script>
  /* *** SERVICES *** */
  import Conf from "../../../../../services/conf";
  import AvailabilityServices from "../../../../../services/gps/availability/availabilityServices.js";
  import AvailabilityslotsServices from "../../../../../services/gps/availabilityslots/availabilityslotsServices.js";
  import BookingServices from "../../../../../services/gps/booking/BookingServices.js";
  import {
    iconsmind,
    simplelineicons
  } from "../../../../../data/icons";
  import VesselServices from "../../../../../services/gps/vessel/VesselServices.js";
  import DeparturePriceServices from '../../../../../services/gps/departuresPrice/DeparturePriceServices.js';
  import GrupoCotizacionesServices from "../../../../../services/gps/grupocotizaciones/GrupoCotizacionesServices.js";
  import moment from "moment";
  //// 2021-07-09 | fg 
  import AvailabilityFilters from "@/views/app/gps/availability/components/AvailabilityFilters.vue"
  import AvailabilityDepartures from "@/views/app/gps/availability/components/AvailabilityDepartures.vue"
  ////
  import totalSlots from "../../../../../mixins/availability/totalSlots.js";
  import InfiniteLoading from 'vue-infinite-loading';
  import { EventBus } from "../../../../../eventBus/event-bus";

  export default {
    
    name: "Availability",
    mixins: [totalSlots],
    components: {
        AvailabilityFilters,
        AvailabilityDepartures,
        InfiniteLoading
    },
    data() {
      return {
        isLoading: false, // control de proceso en ejecucion
        
        customToday: moment().format("YYYY-MM-DD"),
        customAddTodayDays:moment().add(30, 'days').calendar(),
        moment: moment,
        simplelineicons,
        iconsmind,
        showModal: false,
        respuesta: [],
        departures: [],
        errorDepartures: "",
        busy: false,
        limit: 50,
        mensajeDepartures: "",
        mensajeNoResults: "",
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
      };
    },
    computed: {
      /* ********************************************* FILTROS ********************************************* */
      filteredOriginalRowdata: function () {
        var self = this;
        var resultado = this.departures
           .filter(this.filterByYatchs)
          .filter(this.filterByItineraries)
          .filter(this.filterByItinerariesTypes)
          .filter(this.filterByItinerariesLargeShort)
          .filter(this.filterByPax)          
          .filter(this.filterBySites)
          .filter(this.filterBySpecies)
          .filter(this.filterByRange);
        return resultado;
      },
      /* ********************************************* FIN FILTROS ********************************************* */
    },
    watch: {
      // parentYatchsFilter: function () {
      //   this.clearParameters();
      //   this.getAvailability();
      // },
      parentDateFilter: {
        deep: true,
        handler: function (val) {
          this.departures = [];
          this.cleanMessages();
          this.getAvailability();
        },
      },
    },
    created() {
      // EventBus.$on("addWaitingListMethodBus", (payLoad) => {
      //   this.reload();
      // });
      EventBus.$on('addWaitingListMethodBus', () => {
        //if(data){
          this.reload();		  
        //}            
		  });      
    },
    mounted() {
      //this.getAvailability();
    },
    methods: {
      // clearParameters(){
      //   this.page = 1;
      //   this.departures = [];
      //   this.getAvailability();
      // },
      // addWaitingListMethodBus(){
      //   this.reload();
      // },          
      reload(){
        this.departures=[];
        this.page = 1;
        this.getAvailability();
      },
      // ---------------- Consulta Madre: ---------------- 
      async getAvailability($state) {
        if ( this.busy )  return //       
        this.busy = true;
        this.isLoading = true
        let data = {
          start: '',
          end: '',
        };
        if (this.parentDateFilter !== undefined && this.parentDateFilter.startDate !== null && this.parentDateFilter
          .endDate !== null) {
          data.start = this.parentDateFilter.startDate;
          data.end = this.parentDateFilter.endDate;
        } else {
          data.start = this.customToday;
          data.end = this.customAddTodayDays;
        }
        var start = moment(data.start).format('YYYY-MM-DD');
        var end = moment(data.end).format('YYYY-MM-DD');
        //console.log("===================cruiseId: " + JSON.stringify(this.parentYatchsFilter));
        
        await AvailabilityServices.getAvailability({params:{
              start       :start ,
              end         :end, 
              //cruisesId   :this.parentYatchsFilter,
              page        :this.page
        }})
          .then((response) => {  
            this.cleanMessages();
            // Funcionalidad para traer datos por lotes (infinite-loading)
            var departures = response.data.data.data;    
            if (departures.length == 0) {
              this.mensajeNoResults = "Please choose different filter and try again..!!";
            }  
            // INCLUSIÓN DE TOTALSLOTS DESDE ARCHIVO "totalSlots.js"
              var self = this;
              // departures.forEach(function(elemento, indice, array) {
              //   elemento.totalSlots = self.calculateTotalByDeparture(elemento);  
              // }) 
              this.lastPage = response.data.data.last_page;
              var next_page_url = response.data.data.next_page_url;
            
            // FIN INCLUSIÓN DE TOTALSLOTS DESDE ARCHIVO "totalSlots.js"              
                    //*** opcion 1 */
                   if (departures.length > 0) {
                          this.lastPage = response.data.data.last_page;
                          if(this.page <= this.lastPage){
                              this.page += 1;
                              this.departures.push(...departures);
                              if(Boolean($state)){
                                $state.loaded();               
                              }                             
                              if(!Boolean(next_page_url)){
                                $state.complete();       
                              }                             
                          }                      
                    } else {
                        $state.complete();
                    }
            // Fin Funcionalidad para traer datos por lotes (infinite-loading)
            
          })
          .catch((error) => {
            //this.errorDepartures = error;
            this.errorDepartures = "No data loaded for selected range.";
          }).finally(() => {
            this.busy = false;
            this.isLoading = false
          });
      },
      recalculateDepartures(departures){
          var self = this;
          departures.forEach(function(elemento, indice, array) {
            elemento.totalSlots = self.calculateTotalByDeparture(elemento);                                              
          })  
      },
      cleanMessages() {
        this.mensajeNoResults = "";
        this.mensajeDepartures = "";
      },
      // ----------------  Fin consulta madre ---------------- 
      dataDateFilter(data) {
        this.page = 1;
        this.parentDateFilter = data;
      },
      dataYatchFilter(data) {
        this.parentYatchsFilter = data;
      },
      dataItinerariesFilter(data) {
        this.parentItinerariesFilter = data;
      },
      dataItinerariesTypeFilter(data) {
        this.parentItinerariesTypeFilter = data;
      },
      //Itinearios Largos y cortos:
      dataItinerariesLargeShortFilter(data) {
        this.parentItinerariesLargeShortFilter = data;
      },  
      //Pax
      dataPaxFilter(data) {
        this.parentPaxFilter = data;
      },   
      dataActivitiesFilter(data) {
        this.parentActivitiesFilter = data;
      },
      dataSitesFilter(data) {
        this.parentSitesFilter = data;
      },
      dataSpeciesFilter(data) {
        this.parentSpeciesFilter = data;
      },
      dataRangePricesFilter(data) {
        this.parentRangePricesFilter = data;
      },
      dataCompanyFilter(data) {
        this.parentCompanyFilter = data;
      },
      dataPercentFilter(data) {
        this.parentPercentFilter = data;
      },
      dataComisionFilter(data) {
        this.parentComisionFilter = data;
      },
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
      filterByYatchs: function (item) {
        if (this.parentYatchsFilter.length === 0) {
          return true;
        }
        var selectedYatchs = this.$store.getters.getYatchMainFilters;
        let filterArray = selectedYatchs.map((a) => a.cruId);
        return filterArray.includes(item.cruId);
      },
      filterByItineraries: function (item) {
        if (this.parentItinerariesFilter.length === 0) {
          return true;
        }
        var selectedItineraries = this.$store.getters.getItineraryMainFilters;
        let filterArray = selectedItineraries.map((a) => a.id);
        return filterArray.includes(item.itiNights);
      },
      filterByItinerariesTypes: function (item) {
        if (this.parentItinerariesTypeFilter.length === 0) {
          return true;
        }
        var selectedItinerariesTypes = this.$store.getters.getTypeItineraryMainFilters;
        let filterArray = selectedItinerariesTypes.metCodigo;
        if(filterArray=== 1) return item.itiType === filterArray;
        else if(filterArray=== 2) return item.itiType === filterArray;
        else return true;

        //let filterArray = selectedItinerariesTypes.map((a) => a.metCodigo);
        //return filterArray.includes(item.itiType);
      },
      //Filtro de itinerarios largos y cortos
      filterByItinerariesLargeShort: function (item) {        
        if (!Boolean(this.parentItinerariesLargeShortFilter)) {
          return true;
        }
        var selectedItinerariesLargeShort = this.$store.getters.getLargeShortItineraryMainFilters;
        let filterArray = selectedItinerariesLargeShort.id;   
        if(filterArray=== "1") return item.itiClientType === filterArray.toString();
        else return true;
        
      },
      //Pax:: 
      filterByPax: function (item) {        
        if (!Boolean(this.parentPaxFilter)) {
          return true;
        }
        var selectedPax = this.$store.getters.getPaxMainFilters;
        let filterArray = selectedPax;   
        console.log("Filtro por Pax: " + JSON.stringify(filterArray));
        return item.totalSlots >= filterArray.toString();
      },
      
      filterByActivities: function (item) {
        if (this.parentActivitiesFilter.length === 0) {
          return true;
        }
        /* 1. Llamo a getters getItinerariesByActivities, previamente ejecutado al momento
                de seleccionar una actividad en Availabilityfilters
              */
        var filterItineariesByActivities = this.$store.getters.getItinerariesByActivities;
        //2. Filtro por itiId
        let filterArray = filterItineariesByActivities.map((a) => a.itiId);
        return filterArray.includes(item.itiId);
      },
      filterBySites: function (item) {
        //console.log("this.parentSitesFilter: " + JSON.stringify(this.parentSitesFilter.length));
        if (this.parentSitesFilter.length === 0) {
          return true;
        }
        var filterItineariesBySites = this.$store.getters.getItinerariesBySites;
        //2. Filtro por itiId
        let filterArray = filterItineariesBySites.map((a) => a.itiId);
        return filterArray.includes(item.itiId);
      },
      filterBySpecies: function (item) {
        //console.log("this.parentSpeciesFilter: " + JSON.stringify(this.parentSpeciesFilter.length));
        if (this.parentSpeciesFilter.length === 0) return true;
        
        /* 1. Llamo a getters getItinerariesByActivities, previamente ejecutado al momento
                de seleccionar una actividad en Availabilityfilters
              */
        var filterItineariesBySpecies = this.$store.getters.getItinerariesBySpecies;       
        //2. Filtro por itiId
        let filterArray = filterItineariesBySpecies.map((a) => a.itiId);
        return filterArray.includes(item.itiId);
      },
      filterByRange: function (item) {
        
        var offNetRate = parseFloat(item.prices.offNetRate);
        if ( this.parentRangePricesFilter.length === 0 ) return true
        //2021-07-07 | fg | considerar null para evidenciar falta de tarifas
        //if ( item.prices.rate == null) return true
        // evaluar y aplicar filtro        
        let minPrice = this.parentRangePricesFilter[0];
        let maxPrice = this.parentRangePricesFilter[1];
            
        //const resultado  = item.prices.rate >=  minPrice && item.prices.rate <= maxPrice;
        const resultado  = offNetRate >=  minPrice && offNetRate <= maxPrice;
        if ( resultado !='' )  return resultado
                              
      },
      /* ********************************************* FIN FILTROS ********************************************* */
      groupBy(array, key) {
        const result = {}
        array.forEach(item => {
          if (!result[item[key]]) {
            result[item[key]] = []
          }
          result[item[key]].push(item)
        })
        return result
      },
    },
  };
</script>