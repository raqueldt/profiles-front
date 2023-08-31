<template>

  <div>

    <template v-if="isLoading">

    </template>

    <template v-else>

        <!-- empty state -->
        <template v-if="!pricingHistoryList.length">



        </template>

        <!-- data section -->
        <template v-else>


            <div class="accordion" role="tablist">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-0" role="tab">
                  <b-button block v-b-toggle.accordion-pricing variant="light" size="xs" squared class="">Pricing history</b-button>
                </b-card-header>
                <b-collapse id="accordion-pricing" accordion="my-accordion" role="tabpanel">
                  <b-card-body class="p-0">

                    <component
                      :is="pricingHistoryList.length > 3 ? 'vue-perfect-scrollbar' : 'div' "
                      :class='pricingHistoryList.length > 3 ? "scroll-area" : ""'
                      :settings="{ suppressScrollX: true, wheelPropagation: false }"
                    >
                      <b-list-group>

                        <b-list-group-item
                          class="flex-column align-items-start py-1 px-2"
                          v-for="pricing in pricingHistoryList"
                          :key="pricing.rseId"
                        >

                          <departure-pricing-history-item
                            :pricing="pricing"
                            :active-promotion="activePromotion"
                          />

                        </b-list-group-item>
                      </b-list-group>
                    </component>


                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>

        </template>

    </template>

  </div>

</template>

<script>

import DeparturesServices from '@/services/gps/departures/DeparturesServices'
import moment from "moment"


export default {

  name: 'DeparturePricingHistory',

  props: ['departureId', 'departureStartDate', 'activePromotion'],

  components: {

    'DeparturePricingHistoryItem': () => import('@/views/app/gps/availability/departures/DeparturePricingHistoryItem.vue')

  },

  data() {

    return {

      isBusy: false,
      isLoading: false,
      pricingHistoryList: []

    }


  },

  computed: {

    departureYear () {
      if ( this.departureStartDate )
        return moment(this.departureStartDate, "YYYY-MM-DD").year()
      return 0
    }

  },

  methods: {

    async loadData(){

      const queryParams = {
         year: this.departureYear
      }

      const { data } = await DeparturesServices.getPricingHistory( this.departureId, queryParams )

      this.pricingHistoryList = data

    },



  },

  async created() {

    await this.loadData()


  }




}

</script>


<style lang="scss" scoped>
  .scroll-area {
    position: relative;
    margin: 0px;
    width: auto;
    height: 204px;
  }
</style>
