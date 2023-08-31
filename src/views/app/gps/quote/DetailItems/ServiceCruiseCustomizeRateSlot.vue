<template>

    <div>
        <div class="d-flex w-100 justify-content-between">
          <span><strong><b-badge variant="light">{{ slotBooking.avsTag }}</b-badge> {{ slotBooking.cabCode }}</strong></span>
          <b-button
            variant="link"
            class="p-0"
            :disabled="fetchEditMode"
            @click.prevent="handleCustomizeRate"
          >
            <strong>{{ slotBooking.bosNetRate | number('0,0.00')}}</strong>
          </b-button>
        </div>

        <small class="text-muted">{{  slotBooking.catName }}</small>

        <b-form inline v-if="isEditMode" class="mt-3">
          <label class="sr-only" for="inline-form-input-name">Name</label>
          <b-form-input
            class="mb-2 mr-sm-2 mb-sm-0"
            v-model="slot.bosNetRate"
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

        <b-row>
          <b-col>
            <alert-errors-validation
             :validation-errors="errors"
            />
          </b-col>
        </b-row>

    </div>

</template>

<script>

import AlertErrorsValidation from '@/views/app/gps/components/AlertErrorsValidation'
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {

  name: 'ServiceCruiseCustomizeRateSlot',

  props: ['slot-booking', 'cotId'],

  components: {

    AlertErrorsValidation

  },

  data() {

    return {

      isEditMode: false,
      isBusy: false,
      errors: [],

      slot: {
        bosId: null,
        bosNetRate: null,
        fromCotizacion: 1 // 2022-09-21 | fg | control de modulo de origen  1 true 0 false
      }


    }

  },

  computed: {

    ...mapGetters('booking-price', ['fetchEditMode']),

  },

  methods: {

    ...mapActions('booking-price', ['updateSlotRate']),
    ...mapActions("cotizacion", ["loadCotizacionTotales"]),

    ...mapMutations('booking-price', ['setEditMode']),

    slotInit() {

      this.slot.bosId = this.slotBooking.bosId
      this.slot.bosNetRate = this.slotBooking.bosNetRate

    },

    settingMode ( editMode ) {
      // modo edicion local
      this.isEditMode = editMode

      // modo edicion global
      this.setEditMode(editMode)
    },

    async handleCustomizeRate () {

      await this.slotInit()

      this.settingMode( true )

    },

    async handleSubmit () {

      try {

        this.isBusy = true

        const dataToUpdate = {
          user: this.$loggedUserId,
          ...this.slot
        }

        await this.updateSlotRate( dataToUpdate )

        await this.loadCotizacionTotales( this.cotId )

        this.isBusy = false

        this.settingMode( false )


      } catch (e) {

        console.log("UNEXPECTED", e )

        if ( e.response.status && e.response.status == 400 ) {

          const { data: errors } =  e.response

          this.errors = errors

          this.isBusy = false

        }

      }



    },

    handleDiscard () {

      this.errors = []
      this.settingMode( false )

    }


  },

  created() {


  },

  mounted() {

  }



}

</script>
