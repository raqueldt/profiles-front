<template>

  <div class="col-lg-12 p-0">
    <b-row>
      <b-colxx xl="5" lg="5" md="5" sm="12" class="p-0" >

        <!-- Inicio Nombre de yate + acción de chechbox -->
        <div
          class="yacht-name pl-2"
          style="background-color: #003260 !important;
            opacity:0.9;
            border-radius: 6px;"
          :style="{borderRight: '10px solid ' + departure.vslColor}"
        >
          <b-form-checkbox
            :id="departure.depId.toString()"
            :name="departure.depId.toString()"
            :disabled="!isDryDockAndBeforeDate"
            :checked="selected.some(f => f === departure.depId)"
            v-if="Boolean(departure.prices) && (departure.prices.offNetRate != 0)"
            style="color:white"
            class="yachtname-check align-items-center"
            @change="selectDepartures(departure)"
            v-tooltip="{content: $t('gps.tooltips.select-this-boat'), placement: 'top', classes: ['itineraries'],}"
            >
            <span class="departure">{{ departure.cruName | capitalize | truncate(11)}}</span>
          </b-form-checkbox>

          <label v-if="Boolean(departure.prices) && (departure.prices.offNetRate != 0)"> </label>
          <label v-else class="ml-3"> <span>{{ departure.cruName | capitalize | truncate(11)}}</span> </label>

        </div>

      </b-colxx>
      <!-- Fin Nombre de yate + acción de chechbox -->

      <!-- 2. Fechas de salidas + acción de vinculo a ruta de bloqueos dependiendo de si puede o no -->
      <b-colxx xl="5" lg="5" md="5" sm="12" class="p-0 text-center departure">

        <template v-if="isDepartureReady">
            <router-link
              @click.native="saveItemToSendSlotParent(departure)"
              v-tooltip="{content: $t('gps.tooltips.block-space'), placement: 'top'}"
              :to="linkBooking"
              tag="a"
              target="_blank"
              class="dates-dep text-primary"
            >
            <div class="mt-1 mb-1 text-left ml-1">
                {{ departureStartDate }}
                <br />
                {{ departureEndDate }}
            </div>
            </router-link>
        </template>

        <template v-else>
          <div class="dates-dep text-left text-muted mt-1 mb-1 ml-1">
              {{ departureStartDate }}
              <br />
              {{ departureEndDate }}
          </div>
        </template>

      </b-colxx>
      <!-- Fechas de salidas + acción de vinculo a ruta de bloqueos dependiendo de si puede o no -->

      <!-- 3. Información de itinerarios -->
      <b-colxx xl="2" lg="2" md="2" sm="12" class="itinerary p-0 w-100 text-center">
        
        <b-button v-tooltip="{content:'Itinerary: '+departure.itineraryType+'<br>Click here to display information', placement: 'top'}" class="hover-class">

            <div class="w-100 itin-detail" style="width:38px !important; ">
                <div class="w-75 m-auto iticode">
                <itinerary-info-boton-modal
                            :dep-id="departure.depId"
                            :iti-id="departure.itiId"
                            :iti-code="departure.itiCode"
                            :iti-nights="departure.itiNights"
                            :iti-type="departure.itineraryType"
                        />
                </div>
            </div>

            </b-button>

      </b-colxx>
    </b-row>
    <!-- End Información de Salida -->

  </div>
</template>

<script>

import moment from "moment";
import ItineraryInfoModal from "@/views/app/gps/availability/components/ItineraryInfoModal"
import totalSlots from "../../../../../mixins/availability/totalSlots"
import ItineraryInfoBotonModal from "@/views/app/gps/availability/components/ItineraryInfoBotonModal"
/*

2021-06-08 fg

Pendiente:
  -reemplazar funcionalidad avaId por itiId
  -definicion de props
  -corregir estilo visual seccion itinerario: ej. noches icono luna

*/


export default {
    name: 'DeparturesInfo',

    components: {
        ItineraryInfoModal, ItineraryInfoBotonModal
    },
    mixins: [totalSlots],
    props: ["departure", "selected"],

    data () {
        return {
            dataFilterComision: 0,
            showModalItinerary: false,
            itineraryId: '',
            selectedDepartures:[]
        }
    },

    computed: {    

      // =========> Propiedad REALFREESLOTS se encuentra en totalSlots.js    

      // 2021-09-15 | fg | ruta booking / booking para hold another

      linkBooking () {

         const { gct, req } = this.$route.query

         return { name: 'booking', params: { id: this.departure.depId }, query: { gct, req } }

      },

      isDryDockAndBeforeDate () {

        if ( this.departure.depStatus != '1')  return false

        const today = moment(new Date()).format("YYYY-MM-DD")
        const startDeparture = moment(this.departure.depStartDate).format("YYYY-MM-DD")

        return moment(startDeparture).isSameOrAfter(today)
      },

      isDepartureReady () {

          if ( Object.keys(this.departure.cabins).length === 0 )  return false

          if ( this.departure.depStatus != '1')  return false

          if ( this.departure.prices.lowerRate === null ) return false

          if ( this.realFreeSlots === 0 ) return false

          //2021-08-05 | fg | deshabilitar salida cuando fecha de inicio crucero sea menor a fecha actual

          // Se resta 7 dias a la fecha actual para poder bloquear slots de última hora
          const today = moment(new Date()).subtract(7,'days').format("YYYY-MM-DD")
          const startDeparture = moment(this.departure.depStartDate).format("YYYY-MM-DD")
          return moment(startDeparture).isSameOrAfter(today)

      },

      departureStartDate () {
        return moment(this.departure.depStartDate, "YYYY-MM-DD").format( "DD MMM YYYY, ddd" )
      },

      departureEndDate () {
        return moment(this.departure.depEndDate, "YYYY-MM-DD").format( "DD MMM YYYY, ddd" )
      }

    },

    methods: {

      selectDepartures(departure){
        this.$emit('selectedDepartures', departure ); //
      },

      openModalItinerary(id) {
        this.showModalItinerary = true;
        this.itineraryId = id;
      },

      hideModal(refname) {
        this.$refs[refname].hide();
      },

      saveItemToSendSlotParent(item) {
        sessionStorage.setItem('slotsParent', JSON.stringify(item));
      },

    },
}
</script>


<style scoped>
* >>>.yacht-name label {
  text-transform: none !important;
}
* >>>.yachtname-check.custom-control {
  float: left;
  padding-left: 1.3rem;
  margin-top: -0.1rem !important;
}

.bg-white{
  background-color: white;
}

* >>>.dates-dep {
    font-size: 0.65rem;
}

* >>>.hover-class:hover{
  background-color: white !important;
}

</style>
