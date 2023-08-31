<template>
  <b-card title="Pagos urgentes">
      <b-refresh-button @click="refreshData" />



    <vue-perfect-scrollbar class="scroll dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }">

      <div v-if="isBusy">
        <b-skeleton animation="wave"></b-skeleton>
        <b-skeleton animation="wave" width="55%"></b-skeleton>
        <b-skeleton animation="wave" width="70%"></b-skeleton>
      </div>

      <template v-else>

        <template v-if="items">
          <urgent-payment-item v-for="(payment, index) in items" :payment="payment" detail-path="#" :key="index"
            class="p-2" style="background: whitesmoke" />
        </template>

        <template v-else>

          <div class="text-center">

            <h4><strong><span class="text-muted">No hay pagos urgentes</span></strong></h4>

            <b-card-text class="text-muted">
              No se encontraron Files por operar en los próximos 15 días pendientes de cobro
            </b-card-text>

          </div>
        </template>
      </template>
    </vue-perfect-scrollbar>
    <br>
    <!-- ver más -->
    <div style="text-align:center;">
      <b-button variant="link" @click="gotoUrgentPaymentsAll()">Ver más</b-button>
    </div>
  </b-card>
</template>

<script>
import UrgentPaymentItem from "@/views/app/gps/collections/dashboard/UrgentPaymentItem.vue"
import CobranzasServices from "@/services/gps/cobranzas/CobranzasServices"
import { all } from "q";


export default {

  components: {
    UrgentPaymentItem
  },

  data() {
    return {
      isBusy: false,
      items: []
    }
  },

  methods: {

    refreshData() {
      this.getUrgentPayments()
    },

    async getUrgentPayments() {

      this.isBusy = true

      const { data } = await CobranzasServices.getUrgentPayments()


      this.items = data

      this.isBusy = false


    },

    gotoUrgentPaymentsAll() {
      let routeData = this.$router.resolve({
        name: "UrgentPaymentsAll",
      });
      window.open(routeData.href, "_blank");
    },


  },

  created() {

    this.getUrgentPayments()

  }

};
</script>
