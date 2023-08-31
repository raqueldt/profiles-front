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

    <!-- modal customize price  -->
    <b-modal id="modal-customize-price" ref="modal-customize-price" title="Customize rates" centered
      @hidden="handleCloseModal">

      <b-list-group>

        <b-list-group-item class="flex-column align-items-start py-2" v-for="slot in fetchSlots" :key="slot.bosId">

          <itinerary-cruise-customize-rate-slot :slot-booking="slot" :is-read-only="isReadOnly" @reload="reload"/>

        </b-list-group-item>

      </b-list-group>

      <b-row class="py-2 mr-0 ml-0 mt-2">
        <b-col class="text-right">
          <span class="mr-2"><strong>Children Discount</strong></span>
          <b-button variant="link" class="p-0" :disabled="isEditMode || isReadOnly"
            @click.prevent="handleChildrenDiscount">
            <strong>{{ childrenDiscount | number('0,0.00') }}</strong>
          </b-button>
          <!-- -->
          <b-form inline v-if="isEditMode" class="mt-3">
            <b-form-input class="mb-2 mr-sm-2 mb-sm-0" v-model="booking.bokChildrenDiscount"></b-form-input>
            <b-button variant="secondary" class="mr-2" squared @click="handleDiscard">Discard</b-button>
            <b-button variant="primary" squared :disabled="isBusy" @click.prevent="handleSubmit">
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

      <b-row class="py-2 mr-0 ml-0 mt-2  justify-content-center">
        <b-alert show dismissible v-if="showMasiveUpdateMessage">
          Values ​​updated successfully
        </b-alert>
      </b-row>


      <!-- Boton para encerar valores de los espacios -->
      <!-- AM | 16/02/2023 -->
      <b-button v-if="!editMode" variant="outline-danger" class="float-left" :disabled="isReadOnly"
          @click="showEditMode()">
          <b-spinner small v-if="isReadOnly"></b-spinner>
          Force Net Rate
        </b-button>


      <b-row class="justify-content-center align-items-center">
        <center>
          <b-form inline v-if="editMode" class="mt-3">
            <b-input-group prepend="" class="mt-3" size="sm">
              <b-form-input size="sm" placeholder="Type amount" @keypress="onlyNumber" maxlength="8"
                v-model="bosNetRate"></b-form-input>
              <b-input-group-append>
                <b-button size="sm" squared variant="secondary" @click="handleDiscard">Discard</b-button>
                <b-button size="sm" squared variant="primary" :disabled="isBusy || !Boolean(bosNetRate)"
                  @click.prevent="confirmUpgradeNetRate">
                  <template v-if="isBusy">
                    <b-spinner small type="grow"></b-spinner>
                    Saving
                  </template>
                  <template v-else>
                    Save
                  </template>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form>
        </center>

      </b-row>
      <!-- Boton para encerar valores de los espacios -->

      <template #modal-footer>
        <div class="w-100">

          <!-- Boton para encerar valores de los espacios -->
          <!-- AM | 16/02/2023 -->
          <!-- <b-button
            variant="danger"
            class="float-left"
            :disabled="isReadOnly"
            @click="confirmSetEmptyValue()"
          >
            <b-spinner small v-if="isReadOnly"></b-spinner>
            Update values to 0
          </b-button> -->
          <!-- Boton para encerar valores de los espacios -->

          <b-button variant="secondary" class="float-right" @click="handleCloseModal">
            Close
          </b-button>

        </div>

      </template>

    </b-modal>

  </div>
</template>

<script>
  import ConfirmacionServices from "@/services/gps/confirmacion/ConfirmacionServices";

  import {
    mapActions,
    mapGetters,
    mapMutations
  } from 'vuex'

  export default {

    name: 'ItineraryCruiseCustomizeRate',

    props: ['bokId', "from"],

    components: {

      "ItineraryCruiseCustomizeRateSlot": () => import(
        '@/views/app/gps/confirmations/itinerary/ItineraryCruiseCustomizeRateSlot')

    },

    data() {

      return {

        isReadOnly: false, // control general para activar/desactivar slots

        isEditMode: false,
        isBusy: false,

        booking: {
          bokId: null,
          bokChildrenDiscount: null,
          fromConfirmacion: 1 // 2022-09-21 | fg | determina modulo de origen de la peticion 1 true 0 false
        },

        showMasiveUpdateMessage: false,

        editMode: false,
        bosNetRate: ""

      }

    },

    computed: {

      ...mapGetters('booking-price', ['fetchBooking', 'fetchSlots', 'fetchEditMode']),

      totalBooking() {

        if (this.fetchSlots) {

          function suma(total, valor) {
            return total + valor
          }

          const totalBooking = this.fetchSlots.map(slot => Number(slot.bosNetRate)).reduce(suma, 0)
          const childrenDiscount = this.fetchBooking.bokChildrenDiscount

          return totalBooking - childrenDiscount

        }

        return 0
      },

      childrenDiscount() {

        return this.fetchBooking ?.bokChildrenDiscount

      },

      // 2022-09-07 | fg | obtener id de la confirmacion
      idConfirmation() {

        const {
          cofId
        } = this.$route.params

        return cofId

      }



    },

    methods: {

      ...mapActions('booking-price', ['loadBooking', 'updateChildrenDiscount', 'updateSlotRate']),
      ...mapActions("confirmacion", ["getTotalConfirmacionAction"]),

      ...mapMutations('booking-price', ['setEditMode']),

      async showModalCustomizePrice() {

        await this.loadBooking(this.bokId)

        this.$refs['modal-customize-price'].show()

      },

      settingEditMode(editMode) {
        // modo edicion local
        this.isEditMode = editMode
        // modo edicion global
        this.setEditMode(editMode)
      },

      async handleCloseModal() {

        await this.settingEditMode(false)


        await this.$emit('reload');

        this.$refs['modal-customize-price'].hide()

      },


      async handleChildrenDiscount() {

        this.booking.bokId = this.fetchBooking.bokId
        this.booking.bokChildrenDiscount = this.fetchBooking.bokChildrenDiscount

        this.settingEditMode(true)

      },

      async handleSubmit() {

        this.isBusy = true

        try {

          const dataToUpdate = {
            user: this.$loggedUserId,
            ...this.booking
          }

          await this.updateChildrenDiscount(dataToUpdate)

          //2022-09-06 | fg | actualizar objeto totales
          await this.getTotalConfirmacionAction(this.idConfirmation)

          this.settingEditMode(false)

          await this.$emit('reload');


        } catch (e) {

          console.log("UNEXPECTED", e)

        }

        this.isBusy = false


      },

      async handleDiscard() {

        this.settingEditMode(false)

      },


      confirmUpgradeNetRate() {

        this.$swal({
          title: 'Are you sure to upgrade Net Rate?',
          text: `You are going to modify all the values ​​of the booking placing them in $${this.bosNetRate}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, sure!',
          cancelButtonText: 'No, cancel!',
          confirmButtonColor: "#ED7117",
          reverseButtons: true
        }).then(result => {

          if (result.isConfirmed) {
            this.upgradeValue();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            // Elimino el ultimo elemento del array para evitar el bucle
          }
        })
      },

      // Método para encerar valores de espacios

      // 2023-02-21 | fg | actualizacion secuencial de slots
      async massiveUpdateSlotRate(bosIdList) {

        for (const bosId of bosIdList) {
          const dataToUpdate = {
            bosId,
            bosNetRate: this.bosNetRate,
            fromConfirmation: 1, // 2022-09-21 | fg | control de modulo de origen
            user: this.$loggedUserId,
          }

          await this.updateSlotRate(dataToUpdate)

        }

        // AM | Método para actualizar valor de cfdVenta en tabla Confirmación_detalle

        await this.updateTotalConfirmacion(bosIdList)

      },

      async updateTotalConfirmacion(bosIdList){

                const totalSlots = this.fetchSlots.reduce((total, item)=>{
                  return Number(total) + Number(item.bosNetRate)
                },0)                
                
                let data ={
                    total: totalSlots
                };
                const bokId = this.bokId;

                await ConfirmacionServices.updateVentaConfirmaciones(bokId, data);

                await this.getTotalConfirmacionAction(this.idConfirmation)

                this.$emit('reload');

      },

      async reload(){
          await this.$emit('reload');
          const bosIdList = await this.fetchSlots.map(slot => slot.bosId);
          await this.updateTotalConfirmacion(bosIdList)
      },

      // 2023-02-21 | fg |  procesar peticion UPDATE TO 0
      async upgradeValue() {

        this.isReadOnly = true

        const bosIdList = this.fetchSlots.map(slot => slot.bosId)

        await this.massiveUpdateSlotRate(bosIdList)

        await this.getTotalConfirmacionAction(this.idConfirmation)

        this.isReadOnly = false

        this.editMode = false

        await this.displaySuccessMasiveUpdateMessage();

        await this.$emit('reload');

      },

      displaySuccessMasiveUpdateMessage() {
        var type = "success filled";
        var title = "Success";
        var mensaje = "Rates updated successfully";
        this.$notify(type, title, mensaje, {
          duration: 3000,
          permanent: false
        });
      },

      displayErrorMasiveUpdateMessage() {
        var type = "error filled";
        var title = "Error";
        var mensaje = "There was an error mass modifying the values. Please contact the administrator";
        this.$notify(type, title, mensaje, {
          duration: 6000,
          permanent: false
        });
      },
      // Fin Método para encerar valores de espacios

      showEditMode() {
        this.editMode = true;
      },
      handleDiscard() {
        this.editMode = false;
      },
      onlyNumber($event) {
        //console.log($event.keyCode); //keyCodes value
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
          $event.preventDefault();
        }
      },


    },



    async created() {


    },

    mounted() {

    }


  }

</script>
