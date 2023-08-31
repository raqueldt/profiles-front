<template>
  <!--   {{history}} -->
  <div v-if="confirmation.length>0">

    <b-table show-empty
                        :items="confirmation"
                        :fields="fields"
                        small
                      >
                      <template #cell(Date)="row">
                            <span >{{ row.item.audFecha }}</span>
                        </template>
                        <template #cell(User)="row">
                            <span >{{ row.item.name }}</span>
                        </template>
                        <template #cell(Action)="row">
                            <span >{{ row.item.audNota }}</span>
                        </template>
           
                      </b-table></div>
                      <div v-else>

                        <b-card >
        <b-card-body class="text-center">
       <!--    <b-img
            src="/assets/img/atc/empty-state/no_result_found.png"
            fluid
            alt="No result found"
            width="200
            "
          /> -->

          <b-card-title
            ><h1><strong>No interactions</strong></h1></b-card-title
          >
        </b-card-body>
      </b-card>
              


</div>
</template>
<script>
import IconCard from "../../../../components/Cards/IconCard";

export default {



  data () {
    return {
      fields: ['Date', 'User', 'Action'],
   

    }
  },

  props: ["confirmation"],
  components: {
    "icon-card": IconCard,
  },
};
</script>
