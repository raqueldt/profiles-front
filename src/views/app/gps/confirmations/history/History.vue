<template>

  <b-card>


    <template v-if="isLoading">

      <b-skeleton-table
        :rows="1"
        :columns="3"
        :table-props="{ bordered: true, striped: true }"
      ></b-skeleton-table>

    </template>

    <template v-else>

      <!-- empty state -->
      <template v-if="history.length == 0">


        <b-card-body class="text-center text-muted mb-2">


          <b-icon icon="archive" style="width: 100px; height: 100px;"></b-icon>
          <br>

          <h1 class="mt-3"><strong>History is empty</strong></h1>

          <b-card-text>
            There's nothing here
          </b-card-text>


        </b-card-body>

      </template>

      <!-- data section  -->
      <template v-else>

          <b-table
            small
            striped
            hover
            :items="history"
            :fields="fields"
          >

          </b-table>

      </template>


    </template>





  </b-card>


</template>
<script>


import DashboardServices from "@/services/gps/dashboard/DashboardServices.js";

export default {

  props: ["cofId"],

  components: {

  },

  data() {

    return {

      isLoading: false,

      history: [],

      fields: [

        { key: 'audFecha', label: 'Timestamp' },
        { key: 'name', label: 'User' },
        { key: 'audNota', label: 'Event' },

      ],

    };

  },

  methods: {


    async getHistoryConfirmation() {

      this.isLoading = true

      const { data: { data }} = await DashboardServices.getHistoryConfirmation(this.cofId)

      this.history = data

      this.isLoading = false



    },


  },

  mounted() {
    this.getHistoryConfirmation();
  },

};
</script>
