<template>
  <b-container fluid>
    <!-- <h1>{{depId}}/</h1>
<h1>{{offId}}</h1>
<h1>({{requests.length }})</h1> -->

    <b-row class="w-100" align-h="end" v-if="requests.length>0">
      <button class="btn btn-header-light icon-button" @click="getRequestsLogsRates()"
        v-tooltip="{content: 'Refresh'  }">
        <i class="simple-icon-refresh" />
      </button>
    </b-row>

    <b-row>

      <template v-if="requests.length>0">

        <component :is="requests.length > 5 ? 'vue-perfect-scrollbar' : 'div' "
          :class='requests.length > 5 ? "scroll-area" : ""'
          :settings="{ suppressScrollX: true, wheelPropagation: false }">

          <!-- {{requests}} -->
          <template v-for="(req, index) in requests">

            <b-col lg="12" cols="12" :key="`key-${index}`" class="m-0 p-0">
              <span class="h6"><b>{{req.audModulo === 1 ? 'BASE RATE' : req.priName}}</b></span><br>
              <small class="text-muted">{{req.audNota}}</small><br>
              <small class="text-muted" v-show="Boolean(req.audReferencia)">{{req.audReferencia}}<br></small>
              <span>By <b>{{req.name}}</b> at {{formatDate(req.audFecha)}}</span><br>
            </b-col>
            <hr :key="index">

          </template>
        </component>
      </template>
      <template v-else>
        <div lg="12" cols="12" class="w-100 text-center">
          <b-alert show fade variant="warning">No existen variaciones de tarifas </b-alert>
        </div>
      </template>

    </b-row>

  </b-container>
</template>

<script>
  import OffersServices from '@/services/gps/offers/OffersServices';

  import moment from "moment";
  export default {
    name: 'DeparturesRequestsLogRates',
    props: ["depId", "offId"],

    data() {
      return {
        requests: []
      }
    },

    methods: {
      async getRequestsLogsRates() {
        OffersServices.getRequestsRatesLog(this.depId, this.offId)
          .then(response => {
            this.requests = response.data
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
      },
      formatDate(fecha) {
        return moment(fecha).format('dddd, D MMMM HH:mm')
      },
    },
    async mounted() {
      await this.getRequestsLogsRates();
    }
  }

</script>

<style lang="scss" scoped>
  .scroll-area {
    position: relative;
    margin: 0px;
    width: auto;
    height: 375px;
  }

</style>
