<template>
  <transition name="modal">
    <div class="modal modal-mask" style="display: block">
      <div class="modal-dialog modal-xl" role="document" >
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div v-if="!loading" class="col-md-12 text-center text-danger">
                <i class="fa fa-spinner fa-spin fa-2x "></i><br />
                Loading
              </div>
              <div class="container-fluid p-1" v-else>
                <!-- Selected: {{ selectedAvsId }}<br />
                avsId: {{ avsId }}<br />
                slotToRelocate: {{slotToRelocate}}<br />

                <div class="row">
                  Slot to relocate: {{slotToRelocate.avsTag}}
                </div> -->

                <!-- ALTERNATIVA 2 -->


                  <!-- LEGEND -->

                  <departures-relocation-legend></departures-relocation-legend>

                  <!-- LEGEND -->

                <b-row
                  class="space-selector"
                  v-for="item2 in rowDataDecks"
                  :key="item2.decId"
                >
                  <b-colxx xxs="12">
                    <div>
                      <b-colxx xxs="12" class="d-flex p-0 name-deck">
                        <div :class="item2.decNameA + '-color id-color'"></div>
                        <h6>
                          <label>{{ item2.decNameA }}</label>
                        </h6>
                      </b-colxx>
                    </div>

                    <div class="d-flex p-2 pl-4">
                      <div
                        v-for="cabin in item2.cabins"
                        :key="cabin.cabId"
                        class="p-1"
                        :class="item2.decNameA"
                      >
                        <a
                          :class="item2.decNameA"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Reset slots"
                        >
                        </a
                        >{{ cabin.cabCode }}
                        <div>

                          <div
                            v-for="(row, index) in rowData"
                            :key="index"
                            class="btn-group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <div v-if="row.avsCabinId == cabin.cabId">

                              <template v-if="Boolean(row.booking)">

                                      <!-- :variant="
                                        row.booking.bosStatus == null &&
                                        row.booking.bosCondition == null
                                          ? 'av'
                                          : _formatSlotsRelocated(row.booking.bosStatus, row.avsId)
                                      " -->
                                    <b-button
                                      class="space btn"
                                      style="cursor:default"
                                      :id="`popover-target-${row.avsId}`"
                                      :disabled="
                                        row.avsId == avsId ||
                                        row.enableOnShare == 0 ||
                                        row.booking.bosStatus == 0 ||
                                        row.booking.bosStatus == 6 ||
                                        row.style == 0
                                          ? true
                                          : false
                                      "
                                       :variant="_formatSlotsRelocated(row, row.avsId)"

                                    >
                                      <b-form-radio
                                        :disabled="
                                          disableSlots(row.avsId, row.booking.bosStatus)
                                        "
                                        size="xs"
                                        v-model="selectedAvsId"
                                        aria-describedby="ariaDescribedby"
                                        :name="row.avsId.toString()"
                                        :value="row.avsId"
                                        class="radio-custom"
                                      >
                                        <span 
                                        class="mr-2"
                                          :class="formatText(row.avsId, row.booking.bosStatus)"
                                          >{{
                                            _formatDay(
                                              row.avsTag,
                                              row.avsOrder,
                                              row.booking.bosStatus,
                                              row.booking.bosCondition,
                                              row.booking ? row.booking.bosIdLinked : null,
                                              row.booking ? row.booking.bosConditionLinked : null,
                                              row.booking ? row.booking.bosStatusLinked : null,
                                            )
                                          }}
                                          
                                          <i class="glyph-icon simple-icon-check" v-if="row.avsId == avsId"></i>
                                        </span>
                                        <!-- - {{ row.avsId }} [{{ row.bosStatus }}] -->
                                      </b-form-radio>
                                    </b-button>
                              </template>
                               <template v-else>
                                <b-button
                                      class="space btn"
                                      style="cursor:default"
                                      :id="`popover-target-${row.avsId}`"
                                      variant="av"
                                    >
                                      <b-form-radio

                                        size="xs"
                                        v-model="selectedAvsId"
                                        aria-describedby="ariaDescribedby"
                                        :name="row.avsId.toString()"
                                        :value="row.avsId"
                                        class="radio-custom"
                                      >
                                      <!-- :class="formatText(row.avsId, row.booking.bosStatus)" -->
                                        <span 
                                        class="mr-2"
                                          :class="formatText(row.avsId, null)"
                                          >{{
                                            _formatDay(
                                              row.avsTag,
                                              row.avsOrder,
                                              null,
                                              null
                                            )
                                          }}
                                          
                                          <i class="glyph-icon simple-icon-check" v-if="row.avsId == avsId"></i>
                                        </span>
                                        <!-- - {{ row.avsId }} [{{ row.bosStatus }}] -->
                                      </b-form-radio>
                                    </b-button>

                               </template>


                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-colxx>
                </b-row>

                <!-- FIN ALTERNATIVA 2 -->
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              :disabled="!selectedAvsId"
              class="btn btn-primary"
              @click="relocateSlot()"
            >
              {{ $t("gps.relocation.relocate-button") }}
            </button>
            <slot name="footer"> </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/* *** SERVICES *** */
import AvailabilityslotsServices from "@/services/gps/availabilityslots/availabilityslotsServices.js";
import BookingSlotsServices from "@/services/gps/bookingslots/BookingSlotsServices";
import slotsFormat from "../../../../../mixins/slots/slotsFormat";
/* *** SERVICES *** */

export default {
  name: "detailModal",
  props: ["avsId", "depId", "slotToRelocate"],
  mixins: [slotsFormat],
  data() {
    return {
      selectedAvsId: "",
      loading: false,
      rowData: []
    };
  },
  computed: {
    rowDataDecks: {
      get() {
        let data = this.$store.getters.getRowDataDecks(this.depId);
        if (data.length < 1) {
          this.$store.dispatch("getRowDataDecks", this.depId);
        }
        return this.$store.getters.getRowDataDecks(this.depId);
      },
      set(value) {
        this.$store.commit("setRowDataDecks", value);
      }
    },
    rowDataCabins: {
      get() {
        let data = this.$store.getters.getRowDataCabins(this.depId);
        if (data.length < 1) {
          this.$store.dispatch("getRowDataCabins", this.depId);
        }
        return this.$store.getters.getRowDataCabins(this.depId);
      },
      set(value) {
        this.$store.commit("setRowDataCabins", value);
      }
    }
  },
  methods: {
    async getRowData() {
      var depId = this.depId;
      var cliId = 404;
      var slots = await this.$store
        .dispatch("getRowDataByDepId", { depId, cliId })
        .then(payload => {
          this.rowData = payload.data;
        });
      this.loading = true;
    },
    async relocateSlot() {
      var bosId = this.slotToRelocate.booking.bosId;
      let data = {
        bosId: bosId,
        avsId: this.selectedAvsId
      };

// ------------------------ Chequeo inicial de itinearios combinados por avsId ----------------------
      var numberErrors = await this.validateErrorPreviousBlocking(data);
      if(numberErrors > 0) {
          this.displayErrorCombinedMessage();     
          this.$emit("closeModalAfterUpdate");
      }
      else{
      // ------------------------ Fin Chequeo inicial de itinearios combinados por avsId ----------------------

            BookingSlotsServices.updateSlotRelocation(data)
              .then(response => {
                this.$emit("closeModalAfterUpdate");
                this.notify();
              })
              .catch(error => {
                console.log("Error: " + error);
              });
      }
    },
    displayErrorCombinedMessage(){
      var type = "error filled";
      var title = "Error";
      var mensaje = "There is a problem with the space(s) to save. Please contact with Administrator";
      this.$notify(type, title, mensaje, {
        duration: 5500,
        permanent: false
      });
    },

    async validateErrorPreviousBlocking(data){

    // ------------------------ Chequeo inicial de itinearios combinados por avsId ----------------------
    // 1. Extraigo avsId
    console.log("Data: " + JSON.stringify(data))
    //var arrayByAvsId = data.map(x => x.avsId);
    var numberErrors = [];
        await  AvailabilityslotsServices.validateErrorCombinedItineraries(data.avsId)
          .then((response) => {
            let respuesta = response.data.data;
            if (respuesta === 0) numberErrors.push(item);          
          })
          .catch((error) => {
            console.log(error);
          });
      return await numberErrors.length;
    // ------------------------ Fin Chequeo inicial de itinearios combinados por avsId ----------------------
    },    
    notify() {
      var type = "success filled";
      var title = "Success";
      var mensaje = "Slot relocated successfully";
      this.$notify(type, title, mensaje, {
        duration: 3000,
        permanent: false
      });
    },   
    formatText(avsId, status) {
      if (avsId === this.avsId) return "text-white";
      if (status == 1) return "text-black";
      if (status == 2) return "text-white";
      if (status == null) return "text-black";
    },
    disableSlots(avsId, bosStatus) {
      if (avsId == this.avsId) return true;
      if (bosStatus in [0, 1, 2]) return true;
    },

  },
  async mounted() {
    await this.getRowData();
  }
};
</script>

<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.btn .radio-custom:checked {
    border: none !important;

}


</style>
