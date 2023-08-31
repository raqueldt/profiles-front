<template>
  <div class="">
    <table class="table table-striped tb-rate mb-0 table-sm">
      <thead>
        <tr>
          <th scope="col">{{$t('gps.mod-itin-day')}}</th>
          <th scope="col">{{$t('gps.mod-itin-meridian')}}</th>
          <th scope="col">{{$t('gps.mod-itin-place')}}</th>
          <th scope="col">{{$t('gps.mod-itin-site')}}</th>
          <th class="col-md-4" scope="col">{{$t('gps.mod-itin-activities')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in detalleItinerario" :key="item.sumId">
          <td>{{item.Day}}</td>
          <td>{{item.Meridian}}</td>
          <td>{{item.plaName? (item.plaName) : 'No Place added'}}</td>
          <td>{{item.sitName? (item.sitName) : 'No Site added'}}</td>
          <td>
            <ActivitySumary :sumId="item.sumId"></ActivitySumary>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/* *** SERVICES *** */

import AvailabilityServices from "../../../../services/gps/availability/availabilityServices.js";

export default {
  name: "ModalItinerary",
  
  /*

  2021-06-08 fg
  
  Pendiente:
    corregir funcionalidad para recuperar detalles del itinerario con itiId
    corregir definicion de props

  */

  props: ["avas_id", 'itiId'],
  data() {
    return {
      settings: {
        maxScrollbarLength: 60,
      },
      isLoadingItinerarios: false,
      isLoadingOffers: false,

      detalleItinerario: [],
    };
  },
  filters: {},
  computed: {},
  methods: {
    scrollHanle(evt) {
    },
    getItinerariesbyAvailabilitys() {
      AvailabilityServices.getItinerariesbyAvailability(this.avas_id)
        .then((response) => {
          this.detalleItinerario = response.data.data;
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
  },
  mounted() {
    this.getItinerariesbyAvailabilitys();
  },
};
</script>
