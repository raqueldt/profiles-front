<template>
  <div>
    <!-- ENCABEZADO -->
    <collection-header tag="gps.collections.dashboard"></collection-header>
    <!-- FIN ENCABEZADO -->

    <b-container fluid >

      <b-row class="mb-4">
        <b-col>
          <recent-payments></recent-payments>
        </b-col>
        <b-col>
          <due-payments></due-payments>
        </b-col>
      </b-row>

      <b-row class="mb-4">
        <b-col>
          <overdue-payments></overdue-payments>
        </b-col>
        <b-col>
          <urgent-payments></urgent-payments>
        </b-col>
      </b-row>
      <br>


      <!--
      <b-row >
        <b-colxx lg="6" class="mb-1">
          <collection-payments-recorded></collection-payments-recorded>
        </b-colxx>
        <b-colxx lg="6" class="mb-1">
          <collection-payments-due></collection-payments-due>
        </b-colxx>
      </b-row>
      -->

      <!--
      <b-row>
        <b-colxx lg="6">
          <collection-overdue-payments></collection-overdue-payments>
        </b-colxx>
        <b-colxx lg="6">
          <collection-urgent-payments></collection-urgent-payments>
        </b-colxx>
      </b-row>
      -->



    </b-container>

  </div>
</template>
<script>


  import RecentPayments from '@/views/app/gps/collections/dashboard/RecentPayments.vue'
  import DuePayments from '@/views/app/gps/collections/dashboard/DuePayments.vue'
  import OverduePayments from '@/views/app/gps/collections/dashboard/OverduePayments.vue'
  import UrgentPayments from '@/views/app/gps/collections/dashboard/UrgentPayments.vue'
  

  export default {
      name: "dashboard",
      components: {
        RecentPayments,
        DuePayments,
        OverduePayments,
        UrgentPayments,
        },
      data() {
        return {
          showAdministrator: false,
        };
      },
      methods: {
        
      },
      mounted() {}
  };
</script>

<style scoped>



</style>
