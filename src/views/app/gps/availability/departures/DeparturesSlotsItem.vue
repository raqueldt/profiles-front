<template>
  <div>
    <!-- =>{{tags}} -->
    <b-button-group size="xs" class="st">
      <!-- :style="[ setCursorStyle(slot) , setUndelineTag(slot.avsTag) ]" -->

      
<template v-for="(slot, index) in slots" >
      <b-button
       
        :key="slot.avsId"
        class="slot"
        :class="setClass(slot)"        
        :style="setCursorStyle(slot)"
        :variant="_formatSlotsAvailability(slot, freeSlots)"
        :disabled="_disableButton(slot)"
        :id="`popover-slot-${slot.avsId}`"
        @click="redirect"
      >
        {{
          _formatDay(
            String(slot.avsTag),
            slot.avsOrder,
            slot.booking ? slot.booking.bosStatus : null,
            slot.booking ? slot.booking.bosCondition : null,
            slot.booking ? slot.booking.bosIdLinked : null,
            slot.booking ? slot.booking.bosConditionLinked : null,
            slot.booking ? slot.booking.bosStatusLinked : null
          )
        }}




        <b-popover
          v-if="handlePopoverSlot(slot)"
          :target="`popover-slot-${slot.avsId}`"
          placement="left"
          triggers="hover focus"
          variant="custom-info space-info hold ribbon-wrapper card"
          @show="onShowPopover(slot)"
        >
          <!-- procesando peticion -->
          <template v-if="isBusy">
            <b-spinner small variant="secondary"></b-spinner>
          </template>
          <!-- data -->
          <template v-else>

            <!-- header -->
            <b-row>
              <b-col lg="12">
                <strong>{{ slotInfo.ClientName }}</strong>
                <div class="float-right">
                  <b-badge :style="resolveStyleStatus(slotInfo.bosStatus)">
                    <span v-if="slotInfo.bosStatus === 1">
                      On Hold
                    </span>
                    <span v-else-if="slotInfo.bosStatus === 5">
                      Allotment
                    </span>                    
                    <span v-else>
                      {{ slotInfo.cofCodigo }}
                    </span> </b-badge
                  ><br />
                </div>
              </b-col>
              <b-col lg="12">
                <span class="text-muted">Ref.:</span>
                <span>{{ slotInfo.bokReference }}</span>
                <!-- <div class="float-right" v-if="slotInfo.bosStatus === 1">
                  <span>{{ timeToRemaining }}</span>
                </div> -->
              </b-col>
            </b-row>

            <hr class="mt-0 mb-2" />
            <!-- Fin header -->

            <!-- body -->
            <b-row class="mb-2">
              <b-col
                cols="12"
                v-if="slotInfo.bosStatus === 1 || slotInfo.bosStatus === 5"
                class="text-center mb-2"
              >
              <span class="d-block">
                <span class="text-muted">Timelimit:</span>
                <span
                  ><strong>{{
                    formatDate(slotInfo.bokTimeLimit)
                  }}</strong></span
                >
              </span>
                <span class="d-block">{{ timeToRemaining }}</span>
              </b-col>
              <!-- <b-col
                cols="6"
                v-if="slotInfo.bosStatus === 1"
                class="text-right mb-2"
              >
              <span>{{ timeToRemaining }}</span>
              </b-col> -->

              <!--  --------------- COLUMNA IZQUIERDA ---------------  -->
              <b-col lg="6" style="border-right: 1px gray solid;">
                <strong class="title">Space details</strong><br />

                <span class="text-muted">Rate:</span>
                <span>{{ slotInfo.bosNetRate | currency }}</span><br />
                
                <span>{{ slotInfo.cabName }}</span
                ><br />

                <!-- condition/childred -->
                <template
                  v-if="slotInfo.bosCondition || slotInfo.bokChildrenPax"
                >
                  <span  v-if="slotInfo.bosCondition">
                    {{ resolveSlotCondition(slotInfo.bosCondition) }} </span
                  ><br />
                  <span v-if="slotInfo.bokChildrenPax">
                    Children: <strong>{{ slotInfo.bokChildrenPax }}</strong>
                  </span>
                </template>
              </b-col>
              <!--  --------------- FIN COLUMNA IZQUIERDA ---------------  -->

              <!--  --------------- COLUMNA DERECHA ---------------  -->
              <b-col lg="6" class="m-0">
                <strong class="title">Booking details</strong><br />

                <span v-if="Boolean(slotInfo.tags)" class="w-100 d-block">
                  <span class="text-muted">Total Rate:</span>
                  <span>{{ getTotal(slotInfo.tags) | currency }}</span>
                  <!-- <span>{{ slotInfo.tags.map(x => x.avsTag).join(", ") }}</span> -->
                </span>

                <div v-if="slotInfo.IVA" class="w-100">
                  <div class="float-left">
                    <span class="text-muted">Tax:</span>
                    <span>{{ slotInfo.IVA }}%</span>
                  </div><br>
                </div>
               
                <span v-if="Boolean(slotInfo.tags)" class="w-100 d-block">
                  {{ slotInfo.tags.map(x => x.avsTag).join(", ") }}
                </span>
                

              </b-col>
              <!--  --------------- FIN COLUMNA DERECHA ---------------  -->
            </b-row>

            <!-- footer -->
            <hr class="my-0" />

            <b-row>
              <b-col cols="12" class="mt-1">
                <div class="d-flex justify-content-between small text-muted">
                  <div>
                    <i class="fas fa-calendar"></i>
                    {{ resolveDateCreatedAt(slotInfo.bosStatus) }}
                    <i class="fas fa-clock"></i>
                    {{ resolveTimeCreatedAt(slotInfo.bosStatus) }}
                  </div>

                  <div>
                    <i class="fas fa-user"></i>
                    {{ slotInfo.sellerName }}
                  </div>
                </div>
              </b-col>
            </b-row>
          </template>
        </b-popover>

        
      </b-button>
      
<!-- <br><small>{{slot.avsId}} |</small> -->

    <!-- <div v-if="slot.booking" >
      <b>B:{{slot.booking.bosId}}|</b><br>     
      <small>IL:{{slot.booking.bosIdLinked}}|</small>      
    </div>
    <br>
    <small>A:{{slot.avsId}}|</small><br> -->


<!-- <small>IL:{{slot.booking.bosIdLinked}}</small> -->
  <!-- {{slot.booking}} -->    
    <!-- <div v-if="slot.booking" >
      <small>A:{{slot.avsId}}|</small><br></br>
      <small>*:{{slot.booking.bosId}}|</small><br>
      <small>S:{{slot.booking.bosStatus}}|</small><br>
      <small>C:{{slot.booking.bosCondition}}|</small><br>
      <small>SL:{{slot.booking.bosStatusLinked}}|</small><br>
      <small>CL:{{slot.booking.bosConditionLinked}}|</small><br>   
      <small>IL:{{slot.booking.bosIdLinked}}</small>
    </div> -->

    <!-- <div v-if="slot.booking" >
      <small>*:{{slot.booking.bosId}}|</small><br>     
      <small>IL:{{slot.booking.bosIdLinked}}</small>
    </div> -->
    <!-- <div v-if="slot.booking" >
      <small>*:{{slot.booking.bosId}}|</small><br>     
      <small>IL:{{slot.booking.bosIdLinked}}</small>
    </div> -->


  </template>

   

      <!-- ICONO PARA PINTAR INCONSISTENCIAS -->
      <!--template v-if="slot.error && slot.error === 0 && !slot.booking"
        data-toggle="tooltip"
        data-placement="top"
        title="Salida con inconsistencias. Por favor reporta a Sistemas"
        >
        <br>
        <i class="fa fa-exclamation-circle text-danger ml-0" aria-hidden="true"></i>
      </template-->
      <!-- ICONO PARA PINTAR INCONSISTENCIAS -->
    </b-button-group>

  

    <!-- {{slots}} -->
   

  </div>
</template>

<script>
import AvailabilityServices from "@/services/gps/availability/availabilityServices";
import ConfirmacionServices from "@/services/gps/confirmacion/ConfirmacionServices";

import slotsFormat from "@/mixins/slots/slotsFormat";
import moment from "moment";

export default {
  name: "DeparturesSlotsItem",

  props: ["slots", "freeSlots", "allSlots"],

  mixins: [slotsFormat],

  data() {
    return {
      isBusy: false,
      slotInfo: [],
      timeLimit: {
        hours: null,
        minutes: null,
        days: null,
        months: null,
        years: null
      },
      tags: [],
    };
  },

  computed: {
    timeToRemaining() {
      let textMonths = "";
      let textYears = "";

      if (this.timeLimit.years)
        textYears = `${parseInt(this.timeLimit.years)} years, `;

      if (this.timeLimit.months)
        textMonths = `${parseInt(this.timeLimit.months)} mth, `;

      // return `${textMonths}${parseInt(this.timeLimit.days)} days, ${parseInt(
      //   this.timeLimit.hours
      // )} hrs, ${parseInt(this.timeLimit.minutes)} min`;
      return `${textYears}${textMonths}${parseInt(this.timeLimit.days)} days, ${parseInt(
        this.timeLimit.hours
      )} hrs, ${parseInt(this.timeLimit.minutes)} min`;
    }
  },

  methods: {
    setClass(slot) {
      if (slot.booking) {
        if (slot.booking.bosStatus == 1 || slot.booking.bosStatus == 2)
          return "animatedButton text-white";
        else return "animatedButton text-black";
      }
    },

    setCursorStyle(slot) {
      if (Boolean(slot.booking)) {
        if (slot.booking.bosStatus === 0 || slot.booking.bosStatus === 3)
          return "cursor:default";
        else return "cursor:pointer";
      }

      return "cursor:default";
    },
    setUndelineTag(avsTag){
      // if(this.tags.some( rol =>avsTag === avsTag))
      // return "border-bottom: solid 4px green;"
      // else return '';

    if(this.tags.flat().length > 0){


      // --------- PENDIENTE DE CONTINUAR PARA QUE SE PINTEN LOS SLOTS QUE PERTENECEN A LA RESERVA -----------

      var self = this;
      this.allSlots.forEach(child => {
        return "border-bottom: solid 4px green;"
        //return { backgroundColor: 'red' + ' !important;'};
        var search = self.tags.flat().some(f => f === child.avsTag)
          
          if (search)  {
            // console.log("search: " + search);
            // console.log("child.avsTag: " + child.avsTag)
            return "border-bottom: solid 4px green;"
          }

      });

    }

    },
    // formato fecha timelimit
    formatDate(fecha) {
      return moment(fecha).format("ddd, DD MMM YYYY, H:mm");
    },

    // resolve condition
    resolveSlotCondition(condition) {
      const conditionText = {
        "0": "",
        "1": "Single Supplement",
        "2": "Share M",
        "3": "Share F"
      };

      return conditionText[condition] ?? "-";
    },

    // resolve date create at booking/confirmation
    resolveDateCreatedAt(status) {
      if (status == 1 || status == 5)
        return moment(this.slotInfo.bokDate).format("ddd, DD MMM YY");

      if (status == 2)
        return moment(this.slotInfo.created_at).format("ddd, DD MMM YY");

      return "unknow";
    },

    // resolve time create at booking/confirmation
    resolveTimeCreatedAt(status) {
      if (status == 1 || status == 5)
        return moment(this.slotInfo.bokDate).format("H:mm");

      if (status == 2) return moment(this.slotInfo.created_at).format("H:mm");

      return "unknow";
    },

    // resolve Name Status
    resolveNameStatus(status) {
      const statusText = {
        "1": "Hold",
        "2": "Confirmed",
        "5": "Hold"
      };

      return statusText[status] ?? "N/A";
    },

    // resolve style Status
    resolveStyleStatus(status) {
      if (parseInt(status) === 1)
        return { backgroundColor: "#FFAF0B" + " !important" };
      else if (status === 2) return { background: "#98D86C" + " !important" };
      else if (status === 5) return { background: "#73B3DC" + " !important" };
      else return { background: "#e5513d" + " !important" };
    },

    // controlar cuando crear elemento popover
    handlePopoverSlot(slot) {
      if (slot.booking && ![3, 6].includes(slot.booking.bosStatus)) return true;

      return false;
    },

    // procesar la redireccion en evento clic
    async redirect() {
      const slot = this.slotInfo;

      if (!slot) return;

      const status = slot.bosStatus;

      // Redirección para cotizaciones
      if (status == 1 || status == 5) {
        // 1 bloqueado  5 allotment
        const routeDataCotizacion = this.$router.resolve({
          path: `/quote/${slot.gctId}`
        });
        window.open(routeDataCotizacion.href, "_blank");
      }

      // Redirección para confirmaciones
      if (status == 2) {
        // 2 confirmado

        const {
          data: { data }
        } = await ConfirmacionServices.getCofIdByGctId(slot.gctId);
        const cofId = data;
        if (Boolean(cofId)) {
          const routeDataConfirmacion = this.$router.resolve({
            path: `/confirmations/${cofId}`
          });
          window.open(routeDataConfirmacion.href, "_blank");
        }
      }
    },

    // controlar evento show
    async onShowPopover(slot) {
      this.isBusy = true;

      await this.getSlotInfo(slot);

      this.isBusy = false;
    },

    // buscar data
    async getSlotInfo(slot) {
      // reset data
      this.slotInfo = [];
      Object.keys(this.timeLimit).forEach(key => (this.timeLimit[key] = null));

      // return if null
      if (slot.booking == null) return;

      // process slot

      const { data } = await AvailabilityServices.getInfobybosId(
        slot.booking.bosId
      );

      this.slotInfo = data[0];

      
      //SETEO TAGS PARA PINTAR LAS CABINAS
      this.tags = Array(data[0].tags.map(x => x.avsTag));
      //console.log("TAGS: " + JSON.stringify(this.tags.flat()))

      // set timelimit

      const time_limit = moment(this.slotInfo["bokTimeLimit"]);
      const now = moment();
      const { _data: duration } = moment.duration(time_limit.diff(now));

      this.timeLimit.hours = duration.hours;
      this.timeLimit.minutes = duration.minutes;
      this.timeLimit.days = duration.days;
      this.timeLimit.months = duration.months;
      this.timeLimit.years = duration.years;
    },
    getTotal(tags){
        let total = 0;
        var totalValor = 0;
        return totalValor = tags.filter((item) => item.bosNetRate > 0).reduce(function(prev, object) {
              return total += Number(object.bosNetRate);
        }, 0);
    }
  },

  created() {}
};
</script>

<style scoped>
* >>> .badge-confirmed {
  background-color: #98d86c !important;
}
* >>> .badge-hold {
  background-color: #ffaf0b !important;
}

* >>> .popover-body{
  width:285px;
}

* >>> .title{
font-size:0.8rem;
}

</style>
