<template>
  <div>
    <b-row>
      <b-col cols="12">
        <span class="text-muted" >ACTUAL TIME LIMIT:</span>
        {{ moment(detallecotizacionbooking["codTiempoLimite"]).format("DD MMM YYYY, ddd h:mm ")}}ECT
        <br><br>
        <label for="datepicker-dateformat1">
          {{ $t("dashboards.new-date-time-limit") }}
        </label>

        <b-form-datepicker
          id="datepicker-dateformat1"
          :date-format-options="{
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            weekday: 'short',
          }"
          locale="en"
          v-model="dateSelected"
          :min="detallecotizacionbooking['codTiempoLimite']"
          :max="detallecotizacionheader['cotDesde']"
        />

        <div>

          <label class="mt-3" for="datepicker-dateformat2">
            {{ $t("dashboards.new-time-limit") }}
          </label>
          <b-form-timepicker v-model="value" locale="en"/>

        </div>

      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col cols="12">
        <b-button
          block
          variant="primary"
          v-if="dateSelected && value"
          @click="updateTimeLimit"
        >
          {{ $t('gps.pax.save-button') }}
        </b-button>
      </b-col>
    </b-row>

  </div>
</template>

<script>

import CotizacionesServices from "@/services/gps/cotizaciones/CotizacionesServices.js";
import BookingServices from "@/services/gps/booking/BookingServices.js";
import { mapGetters, mapMutations } from 'vuex'
import moment from "moment";
export default {

  name: 'ModalExtendTimeLimit',

  props: ["cotId"],

  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 15th two months prior
    const minDate = new Date(today);
    return {
      detallecotizacionheader: [],
      detallecotizacionbooking: [],
      dateSelected: "",
      selectedCot: "",
      min: minDate,
      cotDesde: "",
      cotHasta: "",
      value: '12:00',
    };
  },

  computed: {
    ...mapGetters('cotizacion', ['getChangeHeaderQuote']),
    userId() {
      return this.$root.$loggedUserId;
    },
  },

  methods: {

    ...mapMutations('cotizacion', ['setChangeHeaderQuote']),


    async loadCotizacionDetalles() {

      const { data } = await CotizacionesServices.cotizacionesdetalles(this.cotId)

      this.detallecotizacionheader = data
      this.detallecotizacionheader = this.detallecotizacionheader.shift();
      this.detallecotizacionbooking = this.detallecotizacionheader["booking"];

    },

    hideModal(refname) {
      this.$refs[refname].hide();
     // console.log("hide modal:: " + refname);
    },
    somethingModal(refname) {
      this.$refs[refname].hide();
     // console.log("something modal:: " + refname);
    },

    updateTimeLimit() {

      let datetimeA = this.dateSelected + " " + this.value;
     // console.log(datetimeA);

      let queryparams = {
        bokId: this.detallecotizacionbooking["bokId"],
        bokTimeLimit: datetimeA,
        usuarioId:this.userId,
      };

      BookingServices.updateTimeLimit(queryparams)
        .then((response) => {
          let mensaje = response.data;
          if (mensaje.data == 200) {
            var type = "success filled";
            var title = "Success";
            var message = "Time Limit updated successfully";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
          this.$emit("updateExtendTimeLimit");
              // Cargar a la tienda algun llamado
         this.setChangeHeaderQuote( 1 );
          } else {
          }
        })
        .catch((error) => {
          // console.log(error);
          var type = "error filled";
          var title = "Time Limit";
          var message = "Out of range";
          this.$notify(type, title, message, {
            duration: 3000,
            permanent: false,
          });
        }).finally(() => this.$emit("hideModal"));
    },
  },

  created () {

    this.loadCotizacionDetalles()

  },
};
</script>
