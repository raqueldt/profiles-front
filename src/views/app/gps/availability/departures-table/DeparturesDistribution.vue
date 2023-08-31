<template>
  <div class="container-fluid custom-class-distribution cabin-distribution-mobile">
    <b-list-group horizontal>
      <b-list-group-item
        v-for="(space, index_cabin) in departure.cabins"
        :key="index_cabin"
        class="space-li"
      >
      
        <span>
          <b-colxx class="max-width info-status mx-1">
            <div :class="space.decName + ' deck-name'">
              <span
                style="cursor: pointer"
                :id="`popover-target-${departure.depId}-${index_cabin}`"
              >
                <small
                  @click="getInfoCabin(space.cabId)"
                  v-tooltip="{
                    content: $t('gps.tooltips.cabin-information'),
                    placement: 'top',
                    classes: ['itineraries'],
                  }"
                  >{{ space.cabCode }}</small
                >
                <br />
              </span>
            </div>

            <!-- Información de la cabina -->
            <b-popover
              :target="`popover-target-${departure.depId}-${index_cabin}`"
              :placement="'top'"
              variant="custom-info"
            >
              <b-row class="p-1">
                <!-- {{info_cabin.arcPath}} -->
                <b-col lg="12" class="pr-0 text-center mb-1">
                  <span class="font-weight-bold text-primary"
                    >Cabin Information</span
                  >
                </b-col>
                <b-col lg="5" class="text-center pr-0">
                  <vue-load-image>
                    <b-img
                      slot="image"
                      center
                      :src="getUrlCabinImage(info_cabin.arcPath)"
                      class="card-img-top"
                      height="100%"
                    >
                    </b-img>

                    <div
                      slot="preloader"
                      class="d-flex justify-content-center mt-5 ml-3"
                    >
                      <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>

                    <div slot="error">
                      <b-img
                        slot="image"
                        :src="getUrlSpeciesDefaultImage()"
                        alt="Cabin image"
                        class="card-img-top"
                        height="100%"
                      ></b-img>
                    </div>
                  </vue-load-image>
                </b-col>

                <b-col lg="7" class="text-cabin-info mt-2 P-3">
                  <!-- <p class="font-weight-bold mb-2 text-center">
                    <span class="font-weight-bold text-primary">Cabin Information</span>
                  </p> -->
                  <!-- <pre>{{info_cabin}}</pre> -->
                  <p class="font-weight-medium mb-0">
                    <small><strong>Deck:</strong></small>
                    <small class="float-right">{{ space.decName }}</small>
                  </p>

                  <p class="font-weight-medium mb-0">
                    <small><strong>Category:</strong></small>
                    <small class="float-right">{{
                      info_cabin.cabinCategory
                    }}</small>
                  </p>
                  <p class="font-weight-medium mb-0">
                    <small><strong>Capacity:</strong></small>
                    <small class="float-right"
                      >{{ info_cabin.cabMax }} pax</small
                    >
                  </p>
                  <p class="font-weight-medium mb-0">
                    <small><strong>Max Booking:</strong></small>
                    <small class="float-right">{{
                      info_cabin.layMaxBooking
                    }}</small>
                  </p>
                  <p class="font-weight-medium mb-0">
                    <small><strong>Total bed(s):</strong></small>
                    <small class="float-right">{{
                      info_cabin.bedsNumber
                    }}</small>
                  </p>
                  <p class="font-weight-medium mb-1">
                    <small><strong>Sharing options:</strong></small>
                    <small class="float-right" v-if="info_cabin.layShare === 1"
                      >YES</small
                    >
                    <small class="float-right" v-else>NO</small>
                  </p>
                  <!-- <p>LayShare: {{info_cabin.layShare}}</p> -->
                </b-col>
              </b-row>
            </b-popover>

             <!-- Cabinas por slot -->
             <departures-slots-item
              :slots="space.slots"
              :free-slots="realFreeSlots"
            />
            
          </b-colxx>
        </span>
      </b-list-group-item>

     

      <!-- FIN MODAL RELOCATION -->
    </b-list-group>
  </div>
</template>

<script>
import ConfirmacionServices from "@/services/gps/confirmacion/ConfirmacionServices.js";
import FileboxServices from "@/services/gps/filebox/FileboxServices.js";
import DeparturesRelocationModal from "@/views/app/gps/availability/departures/DeparturesRelocationModal";
import VueLoadImage from "vue-load-image";
import slotsFormat from "../../../../../mixins/slots/slotsFormat";
import AvailabilityServices from "../../../../../services/gps/availability/availabilityServices.js";
import moment from "moment";
import totalSlots from "../../../../../mixins/availability/totalSlots"
// 2022-10-24 | fg | componente para los slots de una cabina
import DeparturesSlotsItem from '@/views/app/gps/availability/departures/DeparturesSlotsItem.vue'

export default {
  name: "DeparturesSlots",
  components: {
    "vue-load-image": VueLoadImage,
    DeparturesRelocationModal,
    DeparturesSlotsItem
  },
  props: ["departure"],
  mixins: [slotsFormat, totalSlots],
  data() {
    return {
      showModal: false,
      avsId: "",
      depId: "",
      cabId: "",
      depStartDate:"",
      depEndDate:"",
      slotToRelocate: "",
      info_bos: [],
      info_cabin: [],
      hours: "",
      months:"",
      minutes: "",
      days: "",
      items: [{ age: 40, first_name: "Dickerson", last_name: "Macdonald" }],
    };
  },
  computed: { 

      // =========> Propiedad REALFREESLOTS se encuentra en totalSlots.js    
  },
  methods: {
    getUrlCabinImage(path) {
      let url = FileboxServices.serverUrl + path;
      return url;
    },
    getUrlSpeciesDefaultImage() {
      let url = FileboxServices.urlDefaulImages + "cabinDefault.jpg";
      return url;
    },
    /* Modal */
    openModal(avsId) {
      this.showModal = true;
      this.avsId = avsId;
      // this.depId = depId;
      // this.cabId = cabId;
      // this.slotToRelocate = slot;
      // this.depStartDate = depStartDate;
      // this.depEndDate = depEndDate;
    },
    closeModal() {
      this.showModal = false;
      //this.$emit('reload');
    },
    closeModalAfterUpdate() {
      this.showModal = false;
      this.$emit("reload");
    },
    /*  End Modal */

    redirect(slot) {
      if (slot) {
        let status = slot.bosStatus;
        if (status == 1 || status == 5) {
          // Redirección para cotizaciones
          // this.$router.push({
          //   path: `/quote/${slot.gctId}`
          // });
          let routeDataCotizacion = this.$router.resolve({
            path: `/quote/${slot.gctId}`,
          });
          window.open(routeDataCotizacion.href, "_blank");
        } else if (status == 2) {
          // Redirección para confirmaciones

          let gctId = slot.gctId;
          ConfirmacionServices.getCofIdByGctId(gctId)
            .then((response) => {
              let cofId = response.data.data;
              if (Boolean(cofId)) {
                // this.$router.push({
                //   path: `/confirmations/${cofId}`
                // });
                let routeDataConfirmacion = this.$router.resolve({
                  path: `/confirmations/${cofId}`,
                });
                window.open(routeDataConfirmacion.href, "_blank");
              }
            })
            .catch((error) => {
              console.log("Error: " + error);
            });
        }
      }
    },

    setClass(slot) {
      if (slot.booking) {
        if (slot.booking.bosStatus == 1 || slot.booking.bosStatus == 2)
          return "animatedButton text-white";
        else return "animatedButton text-black";
      }
    },

    setCursorStyle(slot) {
      if (Boolean(slot.booking)) {
        if (slot.booking.bosStatus === 0 || slot.booking.bosStatus === 3) {
          return "cursor:default";
        } else {
          return "cursor:pointer";
        }
      } else {
        return "cursor:default";
      }
    },

    // disableButton( slot ) {
    //    if (Boolean(slot.booking) ) {
    //     if(slot.booking.bosStatus === 0){
    //       return true;
    //     }else{
    //       return false;
    //     }
    //   }
    // },

    // formatOrder(slot) {
    //   var avsTag = slot.avsTag;
    //   if ( slot.booking ) {

    //     var bosStatus = slot.booking.bosStatus;
    //     var bosCondition = slot.booking.bosCondition;
    //     var avsTag = slot.avsTag;
    //     var avsOrder = slot.avsOrder;

    //     return this.formatDay(avsTag, avsOrder, bosStatus, bosCondition)   // mixin slotsFormat.js

    //   }
    //   else return slot.avsTag;
    // },
    formatDate(fecha) {
      return moment(fecha).format("DD MMMM  YYYY, ddd-H:mm");
    },
    diffDates(fecha) {
      var now = moment().format("YYYY-MM-DD");
      //var fechaTimeLmit = moment(fecha).add(1, "d");
      var fechaTimeLmit = moment(fecha);
      return moment().diff(fechaTimeLmit, "days");
    },
    // formatSlotsAvailability(slot) {
    //   if ( slot.booking ) {
    //     var status = slot.booking.bosStatus;
    //     return this.formatSlots(status)                                     // mixin slotsFormat.js
    //   }
    //   return "av"
    // },
    displayFormatCondition(condition) {
      switch (condition) {
        case 0:
          return ""; //0. inhabilitado
        case 1:
          return "Single Supplement"; // 1. Bloqueado
        case 2:
          return "Share M"; // 2. Confirmado
        case 3:
          return "Share F"; // 3. Cancelado (se libera el slot)
        default:
          return "-";
      }
    },
    getInfobybosId(id) {
      let item = id;

      if (item.booking != null) {
        AvailabilityServices.getInfobybosId(item.booking.bosId)
          .then((response) => {
            this.info_bos = response.data;
            var time_limit = this.info_bos["bokTimeLimit"];
            time_limit = moment(time_limit);
            var now = moment();
            var duration = moment.duration(time_limit.diff(now));
/* 
            console.log(duration); */
            this.hours = duration["_data"]["hours"];
            this.minutes = duration["_data"]["minutes"];
            this.days = duration["_data"]["days"];
            this.months =  duration["_data"]["months"];

          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    setInfoNull(){
      this.info_bos = [];
    },
    getInfoCabin(id) {
      AvailabilityServices.getInfoCabin(id)
        .then((response) => {
          this.info_cabin = response.data;
          this.info_cabin = this.info_cabin.shift();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 2021-09-08 | fg | nombre price
    bookingPriceName(slot) {
      return slot.rseReference ? slot.rseReference : slot.priName;
    },
  },

  mounted() {
    /* popover manuel close */
    this.$root.$on("bv::popover::show", () => {
      this.$root.$emit("bv::hide::popover");
    });
    document.addEventListener("click", (e) => {
      if (e.target.id.indexOf("popover-target-") === -1) {
        this.$root.$emit("bv::hide::popover");
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.animatedButton:hover {
  color: white;
  text-decoration: none;
  font-size: 11px;
  box-shadow: 6px 6px 20px -1px #acb8c9, -6px -6px 20px -1px #e8f8ff;
}
.slot{
  font-size: .65rem !important;
}

// Espacio entre cabinas
.list-group-horizontal .list-group-item {
  margin-right: -10px !important;
}


// @media only screen and (max-width: 768px) {

// * .custom-class-distribution{
//     display:none;
// } 
// }

@media only screen and (min-width: 1900px) {
.custom-class-distribution{
  // width: 50%  !important;
}
}

@media only screen and (max-width: 1024px) {
.custom-class-distribution{
  // width: 120px  !important;
} 
}


.list-group-item {
  background-color: transparent !important; 
}

</style>
