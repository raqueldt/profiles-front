<template>





    <b-list-group>


      <b-list-group-item
        v-for="request in dataRequestsLog" :key="request.bokId"
        class="flex-column align-items-start px-3 py-1"
      >

        <departure-requests-log-item
          :request="request"
        />

      </b-list-group-item>


    </b-list-group>




</template>

<script>
export default {

  name: 'DepartureRequestsLog',

  props: ['depId', 'dataRequestsLog'],

  components: {

    DepartureRequestsLogItem: () => import('@/views/app/gps/availability/departures/DepartureRequestsLogItem'),

  },


  mounted() {

  },

  created() {

  }


}
</script>



