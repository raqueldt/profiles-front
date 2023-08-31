<template>

  <div>

    <!-- loading state -->
    <template v-if="isLoading">

      <b-row>
        <b-col>
          <b-skeleton></b-skeleton>
        </b-col>
      </b-row>



    </template>

    <!-- data section -->
    <template v-else>

      <!-- existe un porcentaje fijo aplicado -->
      <template v-if="hasFixedDiscountRate">

        <b-row>
          <b-col>
            <b-alert variant="warning" show class="p-1">
              <span>Fixed Discount Rate: <strong>{{ formattedFixedDiscountRate | percent  }}</strong></span>
              <b-button
                variant="link"
                class="p-0 ml-2"
                @click="handleRemove"
                :disabled="isBusy"
              >
                Remove
              </b-button>
            </b-alert>
          </b-col>
        </b-row>


      </template>

      <!-- no existe un porcentaje fijo aplicado -->
      <template v-else>

          <b-row>
            <b-col>

              <template v-if="showForm">

                <b-form inline>

                  <label class="mr-sm-2" for="inline-form-custom-select-pref">Fixed Discount Rate</label>

                  <input
                    type="number"
                    v-model="fixedDiscountRate"
                    class="mr-2"
                    @input="validateRate"
                  >

                  <b-button
                    variant="primary"
                    size="sm"
                    @click="handleApply"
                    :disabled="isBusy"
                  >Apply</b-button>

                  <b-button
                    variant="secondary"
                    size="sm"
                    @click="handleDiscard"
                    :disabled="isBusy"
                    class="ml-1"
                  >Discard</b-button>

                </b-form>

              </template>

              <template v-else>
                <b-button
                variant="link"
                class="p-0"
                @click="handleSetFixedDiscountRate"
                >
                  <small>
                    Set Fixed Discount Rate
                  </small>
                </b-button>
              </template>




            </b-col>
          </b-row>

      </template>


    </template>






  </div>


</template>

<script>

import DeparturesServices from '@/services/gps/departures/DeparturesServices';


export default {

  name: 'DeparturePricingUniversalDiscount',

  props: ['depId'],

  data() {

    return {

      depFixedDiscountRate: null,
      fixedDiscountRate: null,
      showForm: false,
      isBusy: false,
      isLoading: false

    }

  },

  computed: {

    hasFixedDiscountRate(){
      return this.depFixedDiscountRate > 0
    },

    formattedFixedDiscountRate(){

      return this.depFixedDiscountRate / 100

    }

  },

  methods: {

    // cargar porcentaje de la salida
    async loadData(){

      this.isLoading = true

      const { data } = await DeparturesServices.getFixedDiscountRate( this.depId )



      this.depFixedDiscountRate = data
      this.fixedDiscountRate = data

      this.isLoading = false


    },


    // activar opcion para fijar porcenjate
    handleSetFixedDiscountRate(){

      this.showForm = true

    },

    // descartar cambios
    handleDiscard(){

      this.showForm = false

    },

    //
    validateRate(){

      if ( Number(this.fixedDiscountRate) < 0 )
         this.fixedDiscountRate = 0
      if ( Number(this.fixedDiscountRate) > 99 )
         this.fixedDiscountRate = 0


    },

    // procesar peticion de guardar
    async handleApply(){

      this.isBusy = true

      await this.update()

      this.isBusy = false

      await this.loadData()

      this.showForm = false

    },

    //procesar peticion de remover porcentaje
    async handleRemove(){

      this.fixedDiscountRate = 0

      await this.handleApply()


    },



   // guardar porcentaje
    async update(){

      const params = {
        id: this.depId,
        rate: this.fixedDiscountRate
      }

      const response = await DeparturesServices.setFixedDiscountRate( params )


    }

  },




  async created(){


    await this.loadData()

  }




}

</script>
