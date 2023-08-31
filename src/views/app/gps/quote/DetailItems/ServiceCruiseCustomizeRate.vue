<template>
  <div>


    <template v-if="from === 'submenu'">
      <a @click.prevent="showModalCustomizePrice">
        Customize rates
      </a>
    </template>

    <template v-else>
        <b-button variant="danger" @click.prevent="showModalCustomizePrice">
        Customize rates...
      </b-button>
    </template>



    <!-- <b-button
      variant="danger"
      @click.prevent="showModalCustomizePrice"
    >
      <strong>Customize rates</strong>
    </b-button> -->

    <!-- modal customize price  -->
    <b-modal
      id="modal-customize-price"
      ref="modal-customize-price"
      v-model="modalShow"
      title="Customize rates"
      centered
      @hidden="handleCloseModal"
    >

      <b-list-group>

        <b-list-group-item
          class="flex-column align-items-start py-2"
          v-for="slot in fetchSlots"
          :key="slot.bosId"
        >

          <service-cruise-customize-rate-slot
            :slot-booking="slot"
            :cot-id="cotizacionId"
          />

        </b-list-group-item>

      </b-list-group>

      <b-row class="py-2 mr-0 ml-0 mt-2">
        <b-col class="text-right">
          <span class="mr-2"><strong>Children Discount</strong></span>
          <!-- :disabled="isEditMode" -->
          <b-button
            variant="link"
            class="p-0"
            disabled
            @click.prevent="handleChildrenDiscount"
          >
            <strong>{{ childrenDiscount | number('0,0.00') }}</strong>
          </b-button>
          <!-- -->
          <b-form inline v-if="isEditMode" class="mt-3">
            <b-form-input
              class="mb-2 mr-sm-2 mb-sm-0"
              v-model="booking.bokChildrenDiscount"
            ></b-form-input>
            <b-button
              variant="secondary"
              class="mr-2"
              squared
              @click="handleDiscard"
            >Discard</b-button>
            <b-button
              variant="primary"
              squared
              :disabled="isBusy"
              @click.prevent="handleSubmit"
            >
              <template v-if="isBusy">
                <b-spinner small type="grow"></b-spinner>
                Saving
              </template>
              <template v-else>
                Save
              </template>

            </b-button>
          </b-form>
        </b-col>
      </b-row>

      <b-row class="py-2 mr-0 ml-0 mt-2" style="background: antiquewhite;">
        <b-col class="text-right">
          <span class="text-muted mr-2"><strong>TOTAL CRUISE</strong></span>
          <strong>USD {{ totalBooking | number('0,0.00') }}</strong>
        </b-col>
      </b-row>

      <template #modal-footer>
        <div class="w-100">

          <b-button
            variant="secondary"
            class="float-right"
            @click="handleCloseModal"
          >
            Close
          </b-button>
        </div>
      </template>

    </b-modal>

  </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {

  name: 'ServiceCruiseCustomizeRate',

  props: ['bokId', 'cotId', "from"],

  components: {

    "ServiceCruiseCustomizeRateSlot": () => import('@/views/app/gps/quote/DetailItems/ServiceCruiseCustomizeRateSlot')

  },

  data() {

    return {

      isEditMode: false,
      isBusy: false,
      modalShow: false,

      booking: {
        bokId: null,
        bokChildrenDiscount: null,
        fromCotizacion: 1 // 2022-09-21 | fg | controlar modulo origen peticion
      }


    }

  },

  computed: {

    ...mapGetters('booking-price', ['fetchBooking', 'fetchSlots', 'fetchEditMode']),

    totalBooking ()  {

      if ( this.fetchSlots ) {

        function suma(total, valor) { return total + valor }

        const totalBooking = this.fetchSlots.map( slot => Number(slot.bosNetRate)).reduce( suma, 0)
        const childrenDiscount = this.fetchBooking.bokChildrenDiscount

        return totalBooking - childrenDiscount

      }

      return 0
    },

    childrenDiscount () {

      return this.fetchBooking?.bokChildrenDiscount

    },

    cotizacionId () {
      return this.cotId ?? 0;
    }

  },

  methods: {

    ...mapActions('booking-price', ['loadBooking', 'updateChildrenDiscount']),
    ...mapActions("cotizacion", ["loadCotizacionTotales"]),

    ...mapMutations('booking-price', ['setEditMode', 'resetState']),

    async showModalCustomizePrice () {

      await this.loadBooking( this.bokId )

      this.modalShow = true

    },

    settingEditMode ( editMode ) {
      // modo edicion local
      this.isEditMode = editMode
      // modo edicion global
      this.setEditMode(editMode)
    },

    async handleCloseModal () {

      this.settingEditMode( false )

      this.resetState()

      this.$emit('update')

      this.modalShow = false

    },


    async handleChildrenDiscount () {

      this.booking.bokId = this.fetchBooking.bokId
      this.booking.bokChildrenDiscount = this.fetchBooking.bokChildrenDiscount

      this.settingEditMode( true )

    },

    async handleSubmit () {

      this.isBusy = true

      try {

        const dataToUpdate = {
          user: this.$loggedUserId,
          ...this.booking
        }

        await this.updateChildrenDiscount( dataToUpdate )

        await this.loadCotizacionTotales( this.cotizacionId )

        this.settingEditMode( false )


      } catch (e) {

        console.log("UNEXPECTED", e)

      }

      this.isBusy = false

    },

    async handleDiscard () {

      this.settingEditMode( false )

    }

  },

  async created() {


  },

  mounted() {

  }


}

</script>
