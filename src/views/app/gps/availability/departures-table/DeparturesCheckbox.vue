<template>     
<div data-toggle="tooltip" data-placement="top" :title="$t('gps.tooltips.select-this-boat')">
  <!-- v-tooltip="{content: $t('gps.tooltips.select-this-boat'), placement: 'top'}" -->
          <b-form-checkbox
            size="sm"
            :id="departure.depId.toString()"
            :name="departure.depId.toString()"
            :disabled="!isDryDockAndBeforeDate"
            :checked="selected.some(f => f === departure.depId)"
            v-if="Boolean(departure.prices) && (departure.prices.offNetRate != 0)"
            class="align-center justify-center d-inline-block text-center"
            @change="selectDepartures(departure)"            
            
            >         
          </b-form-checkbox>
        </div>
</template>

<script>

import moment from "moment";
import ItineraryInfoModal from "@/views/app/gps/availability/components/ItineraryInfoModal"
import totalSlots from "../../../../../mixins/availability/totalSlots";

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
        ItineraryInfoModal
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

          const today = moment(new Date()).format("YYYY-MM-DD")
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
* >>>input[type=checkbox] {  
    margin: 0 auto;
    width: 100%;
}
</style>
