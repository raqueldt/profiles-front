<template>
  <b-card title="Cobros recientes">

    <b-refresh-button @click="refreshData" />

    <vue-perfect-scrollbar class="scroll dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }">

      <div v-if="isBusy">
        <b-skeleton animation="wave"></b-skeleton>
        <b-skeleton animation="wave" width="55%"></b-skeleton>
        <b-skeleton animation="wave" width="70%"></b-skeleton>
      </div>

      <template v-else>

        <div v-if="items && items.length">

          <recent-payment-item v-for="(payment, index) in items" :payment="payment" detail-path="#" :key="index"
            class="p-2" style="background: whitesmoke" />

        </div>


        <template v-else>

          <div class="text-center">
            <h4><strong><span class="text-muted">No payments yet</span></strong></h4>
            <b-card-text class="text-muted">
              You have no payments yet
            </b-card-text>


            <router-link tag="a" :to="{ path: 'collection-file-manager' }">
              <span class="text-primary">
                <strong>Get your first payment</strong>
              </span>
            </router-link>
          </div>
        </template>
      </template>
    </vue-perfect-scrollbar>
    <br>
    <!-- ver más -->
    <div style="text-align:center;">
      <b-button variant="link" @click="gotoRecentPaymentsAll()">Ver más</b-button>
    </div>
    <!-- <div>
      <b-modal id="modal-recent-payments" title="Próximos vencimientos">
        <p class="my-4">Hello from modal!</p>
        <div v-if="items && items.length">

          <recent-payment-item v-for="(payment, index) in items" :payment="payment" detail-path="#" :key="index"
            class="p-2" style="background: whitesmoke" />

        </div>
      </b-modal>
    </div> -->
  </b-card>
</template>

<script>
import RecentPaymentItem from "@/views/app/gps/collections/dashboard/RecentPaymentItem.vue"
import CobranzasServices from "@/services/gps/cobranzas/CobranzasServices"


export default {

  components: {
    RecentPaymentItem
  },

  data() {
    return {
      isBusy: false,
      items: []
    }
  },

  methods: {


    refreshData() {
      this.getRecentPayments()
    },

    async getRecentPayments() {

      this.isBusy = true

      const { data } = await CobranzasServices.getLatestPayments()

      this.items = data

      this.isBusy = false


    },

    gotoRecentPaymentsAll() {
      let routeData = this.$router.resolve({
        name: "RecentPaymentsAll",
        params: {

        }
      });
      window.open(routeData.href, "_blank");
    },

  },

  created() {

    this.getRecentPayments()

  }

};
</script>
