<template>

  <div>

    <div class="d-flex w-100 justify-content-between">
      <strong>{{ request.clientName }}</strong>

      <div>

        <b-button
          class="p-0"
          variant="link"
          @click="handleBookingRedirect"
        >
          <strong>{{ bookingCode }}</strong>
        </b-button>

        <b-badge
          variant="dark"
          class="p-1"
          :style="resolveStyleStatus"
        >
          {{ request.estadoName }}
        </b-badge>

      </div>
    </div>

    <div class="d-flex w-100 justify-content-between">
      <small>{{ bookingReference }}</small>
      <small>By <strong>{{ request.vendedorName }}</strong> at {{ moment(request.created_at).format('DD-MMM-YY, HH:mm') }}</small>
    </div>

    <div class="d-flex w-100 justify-content-between">

      <small class="text-muted">{{ bookingLastEventText }}</small>

      <b-button
        class="p-0"
        variant="link"
        v-if="request.lastEvent"
        @click="handleHistoryLog"
      >

        <small>{{ textActionLog}}</small>

      </b-button>


    </div>



    <b-collapse
      id="collapse-history-log"
      v-model="showHistoryLog"
      class="mt-2 p-3"
    >

        <b-table
          bordered
          small
          hover
          :items="historyLog"
          :fields="fields"
          thead-class="bg-dark text-white text-small"
        >

          <template #cell(audFecha)="data">
            <small>{{ moment(data.value).format('DD-MMM-YY, HH:mm') }}</small>
          </template>
          <!-- Optional default data cell scoped slot -->
          <template #cell()="data">
            <small>{{ data.value }}</small>
          </template>
        </b-table>

    </b-collapse>

  </div>

</template>

<script>

import BookingServices from '@/services/gps/booking/BookingServices'

import moment from 'moment'

export default {

  name: 'DepartureRequestsLogItem',

  props: ['request'],

  data() {

    return {
      isBusy: false,
      showHistoryLog: false,
      historyLog: [],
      fields: [
        { key: 'audNota', label: 'Detail'  },
        { key: 'audFecha', label: 'Timestamp' },
        { key: 'userName', label: 'User' },
      ]
    }

  },

  computed: {

    bookingCode() {

       return this.request.cofCodigo ?? this.request.cotCodigo


    },

    bookingReference() {

      return this.request.cofReferencia ?? this.request.cotReferencia

    },


    resolveStyleStatus(){

      if ( this.request.cotEstado == 3 || this.request.cotEstado == 4 )
         return { color: 'black', backgroundColor: this.request.colorEstado }

      return { color: 'white', backgroundColor: this.request.colorEstado }


    },

    bookingLastEventText() {

      if ( !this.request.lastEvent )

         return 'No audits events'


      return `${this.request.lastEvent.audNota} | By ${this.request.lastEvent.userName} at ${moment(this.request.lastEvent.audFecha).format('DD-MMM-YY, HH:mm')}`



    },

    textActionLog() {
      return this.showHistoryLog ? 'View Less' : 'View More'
    }






  },

  methods: {

    handleBookingRedirect() {

      if ( this.request.cofId ) {
         const routeData = this.$router.resolve({ name:'confirmations', params: { cofId: this.request.cofId } })
         window.open(routeData.href, '_blank');
      }

      if ( this.request.gctId ) {

         const routeData = this.$router.resolve({ name: 'quote', params: { gctId: this.request.gctId } })
         window.open(routeData.href, '_blank');

      }


    },


    async handleHistoryLog() {

      this.historyLog = []

      if ( !this.showHistoryLog ) {

          this.isBusy = true

          const params = {
            bookingId: this.request.bokId
          }

          const { data } = await BookingServices.getBookingHistoryLog( params )

          this.historyLog = data

          this.isBusy = false

      }

      this.showHistoryLog = !this.showHistoryLog

    }

  }

}
</script>

