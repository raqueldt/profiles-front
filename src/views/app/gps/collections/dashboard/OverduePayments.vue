<template>
  <b-card title="Pagos vencidos">

    <b-refresh-button @click="refreshData" />



    <vue-perfect-scrollbar class="scroll dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }">

      <div v-if="isBusy">
        <b-skeleton animation="wave"></b-skeleton>
        <b-skeleton animation="wave" width="55%"></b-skeleton>
        <b-skeleton animation="wave" width="70%"></b-skeleton>
      </div>

      <template v-else>

        <template v-if="items && items.length">
          <overdue-payment-item v-for="(payment, index) in items" :payment="payment" detail-path="#" :key="index"
            class="p-2" style="background: whitesmoke" />
        </template>

        <template v-else>

          <div class="text-center">

            <h4><strong><span class="text-muted">No hay pagos vencidos</span></strong></h4>
            <b-card-text class="text-muted">
              No se encontraron pagos vencidos en los últimos 90 días
            </b-card-text>
          </div>

        </template>


      </template>
    </vue-perfect-scrollbar>
    <br>
    

    <div>
     <!-- ver más -->
    <div style="text-align:center;">
      <b-button variant="link" @click="gotoOverduePaymentsAll()">Ver más</b-button>
    </div>
    </div>

  </b-card>
</template>

<script>
import OverduePaymentItem from "@/views/app/gps/collections/dashboard/OverduePaymentItem.vue"
import CobranzasServices from "@/services/gps/cobranzas/CobranzasServices"


export default {

  components: {
    OverduePaymentItem
  },

  data() {
    return {
      isBusy: false,
      items: []
    }
  },

  methods: {

    refreshData() {
      this.getOverduePayments()
    },

    async getOverduePayments() {

      this.isBusy = true

      const { data } = await CobranzasServices.getOverduePayments()

      this.items = data

      this.isBusy = false


    },

    gotoOverduePaymentsAll() {
      let routeData = this.$router.resolve({
        name: "OverduePaymentsAll",
      });
      window.open(routeData.href, "_blank");
    },

  },

  created() {

    this.getOverduePayments()

  }

};
</script>
