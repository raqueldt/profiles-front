<template>
  <b-card title="Próximos vencimientos">

    <b-refresh-button @click="refreshData" />

    <vue-perfect-scrollbar class="scroll dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }">

      <div v-if="isBusy">
        <b-skeleton animation="wave"></b-skeleton>
        <b-skeleton animation="wave" width="55%"></b-skeleton>
        <b-skeleton animation="wave" width="70%"></b-skeleton>
      </div>
      <!-- GI 14/03/2023 -->

      <template v-else>

        <div v-if="items && items.length">
          <due-payment-item v-for="(payment, index) in items" :payment="payment" detail-path="#" :key="index" class="p-2"
            style="background: whitesmoke" />
        </div>

        <template v-else>

          <div class="text-center">

            <h4><strong><span class="text-muted">Nothing to see here</span></strong></h4>
            <b-card-text class="text-muted">
              No encontramos ningún pago programado que venza en los pròximos 15 días.

            </b-card-text>

          </div>

        </template>
      </template>
    </vue-perfect-scrollbar>
    <br>
    <!-- ver más -->
    <div style="text-align:center;">
      <b-button variant="link" @click="gotoDuePaymentsAll()">Ver más</b-button>
    </div>
  </b-card>
</template>

<script>
import DuePaymentItem from "@/views/app/gps/collections/dashboard/DuePaymentItem.vue"
import CobranzasServices from "@/services/gps/cobranzas/CobranzasServices"


export default {

  components: {
    DuePaymentItem
  },

  data() {
    return {
      isBusy: false,
      items: []
    }
  },

  methods: {

    refreshData() {
      this.getPaymentsDue()
    },

    async getPaymentsDue() {

      this.isBusy = true

      const { data } = await CobranzasServices.getPaymentsDue();

      this.items = data

      this.isBusy = false

    },

    gotoDuePaymentsAll() {
      let routeData = this.$router.resolve({
        name: "DuePaymentsAll",
      });
      window.open(routeData.href, "_blank");
    },

  },

  created() {

    this.getPaymentsDue()

  }

};
</script>
