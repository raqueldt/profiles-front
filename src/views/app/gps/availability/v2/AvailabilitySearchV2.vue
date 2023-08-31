<template>


    <b-row  class="mx-0 px-0">

      <b-col md="3" class="mx-0 px-0">
            <label for="start-travel" class="text-muted mb-0"><small>Departures</small></label>
            <date-picker
              id="start-travel"
              v-model="searchDateRange"
              format="DD MMM YYYY"
              :editable="false"
              :clearable="false"
              range
              :disabled="isBusy"              
              @calendar-change="changeCalendar"
              :partialRange="true"
            />
            <!-- :shortcuts="buttonShortcuts" -->
            <!-- <small>{{searchDateRange}}</small> -->
      </b-col>

      <b-col md="4" class="mx-0 px-0">
        <label for="cruises" class="text-muted mb-0" :class="selectedCruises.length > 0 ? 'h6 font-weight-bold text-primary' : ''">
          <small >Yachts</small>
          <!-- <i v-if="selectedCruises.length > 0" 
            class="glyph-icon iconsminds-pointer"></i> -->
        </label>
              <multiselect         
                :style="checkSelectedCruiseStyle()"      
                v-model="selectedCruises"
                :options="optionsCruisesGrouped"
                :multiple="true"
                :searchable="true"                                
                :group-select="true"
                :showNoOptions="false" 
                :close-on-select="false" 
                :clear-on-select="false"
                :hide-selected="true"
                placeholder="Select Yacht(s)"                
                group-values="cruName"
                group-label="selected"
                track-by="cruId" 
                label="cruName"
                :showPointer="true"    
                @select=onSelect($event)
                @remove=onRemove($event)                
                >

                <span class="checkbox-label" slot="option" slot-scope="scope" @click.self="onSelect(scope.option)" v-if="scope.option.cruName">
                  <input class="test mx-0" type="checkbox" v-model="scope.option.checked" @focus.prevent/>      
                  {{ scope.option.cruName }}
                </span>
                <span class="checkbox-label" slot="option" slot-scope="scope" @click.self="onSelect(scope.option)" v-else>
                  <input class="test" type="checkbox" v-model="scope.option.checked" @focus.prevent/>      
                  <template v-if="selectedCruises.length === 4">
                    Unselect All
                  </template>
                  <template v-else>                    
                    Select All  
                  </template>                  
                </span>
              </multiselect>            
              <!-- <small>{{selectedCruises}}</small> -->
      </b-col>      

      <b-col md="1" class="mx-0 px-0">
        <label for="passengers" class="text-muted mb-0" :class="selectedPassengers > 0  ? 'h6 font-weight-bold text-primary' : ''">
          <small>Passengers</small>
          <!-- <i v-if="selectedPassengers > 0 " class="glyph-icon iconsminds-pointer"></i> -->
        </label>
        <v-select
          :style="checkSelectedPassengersStyle()"
          id="passengers"
          v-model="selectedPassengers"
          :options="optionsPassengers"
          label="text"
          :reduce="option => option.value"
          :disabled="isBusy"
          :searchable="false"
        >
        <template slot="option" slot-scope="option">
          <template v-if="option.value === 1">
            <i class="glyph-icon iconsminds-male"></i>
          </template>
          <template v-else>
            <i class="glyph-icon iconsminds-mens"></i>
          </template>          
          {{ option.value }}
        </template>
        </v-select>
        <!-- <small>{{selectedPassengers}}</small> -->
      </b-col>      

      <b-col md="2" class="mx-0 px-0">
        <label for="categories" class="text-muted mb-0" :class="selectedCategory != 0? 'h6 font-weight-bold text-primary' : ''">
          <small >Categories</small>
        </label>
        <v-select                    
          :style="checkSelectedCategoriesStyle()"          
          id="categories"
          v-model="selectedCategory"
          :options="optionsCategoryCruise"
          label="category"
          :reduce="category => category.code"
          :disabled="isBusy"
        >
        <template slot="option" slot-scope="option">
          <i class="glyph-icon iconsminds-medal"></i>
          {{ option.category }}
        </template>
        </v-select>
      </b-col>



      <b-col md="1" class="mx-0 px-0" >        
        <label for="itineraries" class="text-muted mb-0" :class="selectedClientTypeItinerary === 2  ? 'h6 font-weight-bold text-primary' : ''">
          <small >Itineraries</small>
        </label>
        <center>        
        <v-select
          :style="checkSelectedItinerariesStyle()"
          id="itineraries"
          class="width-itinerary-filter-mobile"
          v-model="selectedClientTypeItinerary"
          :options="optionsItinerary"
          label="itinerary"
          :reduce="itinerary => itinerary.code"
          :disabled="isBusy"
        >        
        <template slot="option" slot-scope="option">
          <i class="glyph-icon iconsminds-check"></i>
          {{ option.itinerary }}
        </template>
        </v-select>
        </center>
      </b-col>   



      <b-col md="1" class="mt-3" align-self="center">
          <b-button
            block
            class="ml-2"
            variant="primary"
            :disabled="isBusy"
            @click="searchAvailability"
          >
            <template v-if="isBusy">
              <b-spinner small></b-spinner>
            </template>
            <template v-else>
              Search
            </template>
          </b-button>
      </b-col>


    </b-row>


  
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import vSelect from 'vue-select'
import importComponents from "../../../../../importComponents.vue";
import moment from 'moment'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AvailabilitySearch',
  mixins: [importComponents],
  components: {
    DatePicker,
    vSelect
  },

  data() {

    return {
      isLoading: false,
      isBusy: false,
      
      Deselect: {
      render: createElement => createElement('span', '❌'),
    },

      searchDateRange: [
        new Date,
        moment(new Date).endOf('month').toDate()
      ],

      selectedCruises: [],

      optionsItinerary: [
        { itinerary: 'Standard', code: 1},
        { itinerary: 'All', code: 2},
      ],

      selectedClientTypeItinerary: 1,

      selectedCategory: null,

      // min pax disponibles
      optionsPassengers: [
        { text: 'Any', value: 0},
        { text: '1', value: 1},
        { text: '2', value: 2},
        { text: '3', value: 3},
        { text: '4', value: 4},
        { text: '5', value: 5},
        { text: '6', value: 6},
        { text: '7', value: 7},
        { text: '8', value: 8},
        { text: '9', value: 9},
        { text: '10', value: 10},
        { text: '11', value: 11},
        { text: '12', value: 12},
        { text: '13', value: 13},
        { text: '14', value: 14},
        { text: '15', value: 15},
        { text: '16', value: 16}
        ],

      selectedPassengers: 0,

      controlCruiseId: false


    }

  },

  computed: {

    ...mapGetters('availability-module', ['fetchCruises']),

    // lista de opciones de categorías de crucero
    optionsCategoryCruise () {

      const categoriesCruises = this.fetchCruises
                          .map( cruise => {
                            return {
                              'category': cruise.categoriaNombre,
                              'code': cruise.categoriaCodigo
                            }
                          })

      // Crear un array de objetos con unique "code"
      let uniqueCategories = [
        ...new Map( categoriesCruises.map( item => [item["code"], item]) ).values(),
      ];


      // Agregar opcion 'All categories'
      uniqueCategories = [{category: 'All categories', code: '0'}, ...uniqueCategories ]

      return uniqueCategories

    },

    // lista de cruceros disponibles segun categoria seleccionada
    optionsCruises () {

      let cruises = this.fetchCruises

      if ( this.selectedCategory && this.selectedCategory != 0 )
        cruises = this.fetchCruises.filter( cruise => cruise.categoriaCodigo == this.selectedCategory )

      if ( cruises.length > 1 ){
         //cruises = [ { cruId: 0, cruName: 'All yachts' }, ...cruises ]

          cruises.forEach(function (o) {
              o.selected ="Select All",              
              o.checked = false
          });

      }
      return cruises

    },
    optionsCruisesGrouped(){
      return this.groupBy(this.optionsCruises, 'selected')
    },
    makeShortcuts() {
      return [
        {
          text: 'Last hour',
          onClick: () => [new Date(Date.now() - 60 * 60 * 1000), new Date()],
        },
      ];
    },

  },

  watch: {


    // establecer crucero por defecto segun cruceros disponibles en la categoria
    selectedCategory( newCategory, oldCategory ) {

      if ( newCategory ) {

        const [ defaultCruise ] = this.optionsCruises

        if ( defaultCruise )  this.selectedCruises =  defaultCruise.cruId


        // Para multiselect con valores agrupados
        const [ defaultCruiseGrouped ] = this.optionsCruisesGrouped
        let cruisesId =[];
        this.optionsCruisesGrouped.map(x => x.cruName).flat().forEach( cruise => {
             if ( cruise.cruId ) {
              cruisesId.push(cruise )
              cruise.checked = true;
             }
        })
        if ( defaultCruiseGrouped )  this.selectedCruises =  cruisesId

       

      }

    },

  },


  methods: {

    ...mapActions('availability-module', ['loadAvailability', 'loadCruises']),
    ...mapMutations('availability-module', ['setLoadingState', 'setInitialState']),

    deleteItem(cruId) {
      this.selectedCruises = this.selectedCruises.filter(find => find !== cruId);
    },
  

    groupBy(myArray, key){
          let groups = Object.create(null);
          let grouped = [];
          myArray.forEach(function (o) {
            if (!groups[o.selected]) {
              groups[o.selected] = [];
              grouped.push({
                selected: o.selected,
                cruName: groups[o.selected],
              });
            }
            groups[o.selected].push({
              cruId: o.cruId,
              cruName: o.cruName
            });
          });
          return grouped;            
    },

    // Metodos customizados para añadir funcionalidad checkbox en multiselect
    onSelect (option) {
    	console.log("Added");

      let countCruises = this.optionsCruisesGrouped.map(x => x.cruName).flat().length;

      if(countCruises === 4){
        // Al iniciar la pantalla, se encuentran seleccionados todos los barcos. Si hacemos click en "Select All", entramos a método onSelect
        // por lo que hacemos click, debemos desseleccionar todos.
        this.optionsCruisesGrouped.map(x => x.cruName).flat().forEach( cruise => {
            cruise.checked = false;
        })
      }else{

          let index = this.optionsCruisesGrouped.map(x => x.cruName).flat().findIndex(item => item.cruName==option.cruName);
          if(index === -1){
            this.optionsCruisesGrouped.map(x => x.cruName).flat().forEach( cruise => {
                cruise.checked = true;
            })
          }else  this.optionsCruisesGrouped.map(x => x.cruName).flat()[index].checked = true;
          // console.log(option.cruName + "  Clicked!! " + option.checked);
      }
    },
    
    onRemove (option) {
      let index = this.optionsCruisesGrouped.map(x => x.cruName).flat().findIndex(item => item.cruId==option.cruId);
      if(index === -1){
        this.optionsCruisesGrouped.map(x => x.cruName).flat().forEach( cruise => {
            cruise.checked = false;
        })
      }else  this.optionsCruisesGrouped.map(x => x.cruName).flat()[index].checked = false;
      // console.log(option.cruName + "  Removed!! " + option.checked);
    },    
    // Fin Metodos customizados para añadir funcionalidad checkbox en multiselect


    // buscar la disponibilidad con los parametros establecidos
    async searchAvailability() {

      try {

        //Persistencia:
        await this.savePersistence();

        this.setLoadingState( true )

        this.isBusy = true

        // Desde multiselect, se selecciona un objeto y no un id
        let selectedCruisesBefore = this.selectedCruises.map(a => a.cruId).flat();

        let cruisesId = []
        if ( selectedCruisesBefore ) {
          cruisesId.push( selectedCruisesBefore )
        } else {
          this.optionsCruises.forEach( cruise => {
             if ( cruise.cruId ) cruisesId.push(cruise.cruId )
          })
        }

        const [ start, end ] = this.searchDateRange

        // console.log("Start en API: " + JSON.stringify(start))
        // console.log("End en API: " + JSON.stringify(end))

        // En caso de volver a escoger "All yatch" (parámetro 0) => selecciono todos los cruId de los barcos
        // if(parseInt(cruisesId) === 0) {
        //   this.optionsCruises.forEach( cruise => {
        //      if ( cruise.cruId ) cruisesId.push(cruise.cruId )
        //   })
        // }
        
        const params = {
           start: moment(start).format('YYYY-MM-DD'),
           end: moment(end).format('YYYY-MM-DD'),
           cruisesId: cruisesId.flat(),
           largeShortItinerariesIds: this.selectedClientTypeItinerary, // 1 standard
           paxIds: this.selectedPassengers
        }

        await this.loadAvailability( params )

        this.isBusy = false

        this.setLoadingState( false )

        this.setInitialState( false )

      } catch (e) {

        console.log("UNEXPECTED", e)

      }


    },

    async savePersistence(){

      //Persistencia para rango de fechas:
      localStorage.setItem('searchDateRangeStart', JSON.stringify(this.searchDateRange[0]));
      localStorage.setItem('searchDateRangeEnd', JSON.stringify(this.searchDateRange[1]));

      //Persistencia para Categoría:
      localStorage.setItem('selectedCategory', JSON.stringify(this.selectedCategory));

      //Persistencia para Cruceros:
      localStorage.setItem('selectedCruises', JSON.stringify(this.selectedCruises));

      //Persistencia para tipo de itinerario:
      localStorage.setItem('selectedClientTypeItinerary', JSON.stringify(this.selectedClientTypeItinerary));

      //Persistencia para pasajeros:
      localStorage.setItem('selectedPassengers', JSON.stringify(this.selectedPassengers));

    },

    async setPersistence(){

      //Persistencia para rango de fechas:
      var searchDateRangeStartPersistence = JSON.parse(localStorage.getItem('searchDateRangeStart'));
      var searchDateRangeEndPersistence = JSON.parse(localStorage.getItem('searchDateRangeEnd'));
      if(Boolean(searchDateRangeStartPersistence) && Boolean(searchDateRangeEndPersistence)) 
        this.searchDateRange = [new Date(searchDateRangeStartPersistence), new Date(searchDateRangeEndPersistence)];     

      //Persistencia para Categoría:      
      var selectedCategoryPersistence = JSON.parse(localStorage.getItem('selectedCategory'));
      if(Boolean(selectedCategoryPersistence)) this.selectedCategory = selectedCategoryPersistence;

      //Persistencia para Cruceros:
      var selectedCruisesPersistence = JSON.parse(localStorage.getItem('selectedCruises'));
      if(Boolean(selectedCruisesPersistence)) this.selectedCruises = selectedCruisesPersistence;

      //Persistencia para tipo de itinerario:
      var selectedClientTypeItineraryPersistence = JSON.parse(localStorage.getItem('selectedClientTypeItinerary'));      
      if(Boolean(selectedClientTypeItineraryPersistence)) this.selectedClientTypeItinerary = selectedClientTypeItineraryPersistence;

      //Persistencia para pasajeros:
      var selectedPassengersPersistence = JSON.parse(localStorage.getItem('selectedPassengers'));
      if(Boolean(selectedPassengersPersistence)) this.selectedPassengers = selectedPassengersPersistence;

    },    

    // prestablecer los parametros iniciales
    async setDefaultParameters() {

      // establecer option por defecto para categorias de crucero
      const [ defaultCategory ] = this.optionsCategoryCruise

      if ( defaultCategory ) this.selectedCategory = defaultCategory.code


    },


    // ------------------------- METODOS PARA ESTILOS EN FILTROS ------------------------- 
    
    checkSelectedCategoriesStyle(){
      if (this.selectedCategory != 0)  return 'border-bottom:solid 2px #F0873A;';
      else return '';
    },
    checkSelectedCruiseStyle(){
      if (this.selectedCruises.length > 0)  return 'border-bottom:solid 2px #F0873A;';
      else return '';
    },
    
    checkSelectedItinerariesStyle(){
      if (this.selectedClientTypeItinerary === 2)  return 'border-bottom:solid 2px #F0873A;';
      else return 'width: 120px';
    },
    checkSelectedPassengersStyle(){
      if (this.selectedPassengers > 0)  return 'border-bottom:solid 2px #F0873A;';
      else return '';
    },

    changeCalendar(value, oldValue, type){
      console.log("-------------------- Cambiando calendario... ----------------");
      const month = value.getMonth();
      const oldMonth = oldValue.getMonth();
      // const currentYear = oldValue.getFullYear();

      if (month !== oldMonth && type !='next-month') {
        console.log("caso 1")
        var startDate = moment([moment(value).format('YYYY'), month, 1]).toDate();        
        // var startDate = moment([moment(value).format('YYYY'), month]).toDate();        
        var endDate = moment([moment(value).format('YYYY'), month]).endOf('month').toDate();    
        
        // console.log("Start en componente: " + JSON.stringify(startDate))
        // console.log("End en componente: " + JSON.stringify(endDate))

        this.searchDateRange =[startDate , endDate];        
      }
      

    },
  },


  async created() {

    // console.log("[1.0] CREATED SEARCH");

    await this.loadCruises()

    await this.setDefaultParameters()

    await this.setPersistence()

  },

  async mounted() {
    //  console.log("[1.1] MOUNTED SEARCH");

    // var self = this;
    //  window.addEventListener('keyup', function(event) {
    //   if (event.keyCode === 13) { 
    //     self.searchAvailability()
    //   }
    // });

    var self = this;
     window.addEventListener('keyup', function(event) {
      // if (event.keyCode === 13) { 
      //   self.searchAvailability()
      // }
      // if (event.keyCode === 123) { 
      //   self.searchAvailability()
      // }
      if (event.shiftKey && event.keyCode=== 70) {
        self.searchAvailability()
      }       
    });


  },

  unmounted() {
    //  console.log("[1.9] UNMOUNTED SEARCH");
  },






}
</script>


<style scoped>

  #start-travel {

    width: 100%;

  }



* >>> .multiselect__option--highlight {
  background: #18466F !important;
}
* >>>.multiselect__option--highlight:after {  
  background: #18466F !important;
}
* >>>.multiselect__tags {  
  /* padding: 20px !important; */
  min-height: 39px;
  border-radius: 0;
  /* vertical-align: middle; */
  /* text-align: center; */
}
* >>>.multiselect__placeholder {
  margin-left: 10px;
  margin-top: 2px;
}
* >>>.multiselect__tag {
  background: #18466F !important;
  border: 1px solid rgba(60, 60, 60, 0.26) !important;
  color: white !important;
  margin-bottom: 0px !important;
  margin-right: 3px !important;
  font-size: 11px;
}
* >>>.multiselect__tag-icon:after {
  color: white !important;
}
* >>>.multiselect__tag-icon:focus, .multiselect__tag-icon:hover {
  background: #18466F !important;
}
* >>>.multiselect__tag-icon:focus:after,.multiselect__tag-icon:hover:after {
  color: red !important;
}

* >>>.multiselect__tag-icon {
  line-height: 18px !important;
}

  /* Tamaño de los selects */
* >>>.v-select .vs__dropdown-toggle .vs__selected-options {
  padding: 4px 0.41rem !important;
}

/* Tamaño de los select de fechas */
* >>>.mx-input {
  height: 40px !important;
}


/* .mx-datepicker-sidebar{
  border:solid 2px red !important;
  overflow-y: scroll !important;
} */

* >>>.mx-datepicker-sidebar {
  overflow: scroll !important;
  height: 50px !important;
}

</style>
