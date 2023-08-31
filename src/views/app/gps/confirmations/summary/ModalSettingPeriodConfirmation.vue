/* Componente :
- Modal agregar o acortar fechas de cotizacion */
<template>
  <div>


  <b-row class="filters-card pl-0">
        <b-colxx xs="">
     <div class="text-center mb-5">
               <i :class="` text-muted large-icon initial-height iconsminds-time-backup`">
                  <small>   {{detalleconfirmacion.cofCodigo}}</small> 
               </i>
      </div>

        </b-colxx>

        </b-row>

    <b-row>
      <b-colxx lg="12">
     
        <div>
          <label for="datepicker-dateformat1">{{
            $t("dashboards.start-date-confirmation")
          }}</label>


          <b-form-datepicker
            id="datepicker-dateformat1"
            :date-format-options="{
              year: 'numeric',
              month: 'short',
              day: '2-digit',
              weekday: 'short',
            }"
            locale="en"
            v-model="detalleconfirmacion['cofInicio']"
            :min="min"
            :max="detalleconfirmacion['cofInicio']"
          >
          </b-form-datepicker>

          <label class="mt-3" for="datepicker-dateformat2">{{
            $t("dashboards.end-date-confirmation")
          }}</label>
          <b-form-datepicker
            id="datepicker-dateformat2"
            :date-format-options="{
              year: 'numeric',
              month: 'short',
              day: '2-digit',
              weekday: 'short',
            }"
            locale="en"
            v-model="detalleconfirmacion['cofFinal']"
            :min="detalleconfirmacion['cofFinal']"
          >
          </b-form-datepicker>
        </div>
      </b-colxx>
    </b-row>

    <br />
    <b-row style="justify-content: center">
      <b-button
        variant="primary"
        size="md"
        class="float-right mt-2"
        @click="updatePeriodo"
        > 
        <!-- <i class="fas fa-check-double"></i> -->
         Save</b-button
      >
    </b-row>
  </div>
</template>
<script>
import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices.js";
import ConfirmacionServices from "../../../../../services/gps/confirmacion/ConfirmacionServices";
import moment from "moment";
import { mapGetters, mapMutations } from "vuex";
export default {
  props: ["cofId"],
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 15th two months prior
    const minDate = new Date(today);
    return {
      detalleconfirmacion: [],
      detallecotizacionbooking: [],
      dateSelected: "",
      selectedCot: "",
      min: minDate,
        infoquote: "",
      cofInicio: "",
      cofFinal: "",
    };
  },
  computed: {
     ...mapGetters("confirmacion", ["getChangeHeaderConfirmation"]),
       },
  methods: {
     ...mapMutations("confirmacion", ["setChangeHeaderConfirmation"]),
    currentDateTime() {
      return moment();
    },
    getInfoConfirmacion() {
      ConfirmacionServices.getInfoConfirmacion(this.cofId)
        .then((response) => {
          this.detalleconfirmacion = response.data.data;
          this.detalleconfirmacion = this.detalleconfirmacion.shift();
      
      })
        .catch((error) => {
          console.log(error);
        });
    },
    hideModal(refname) {
      this.$refs[refname].hide();
      console.log("hide modal:: " + refname);
    },
    somethingModal(refname) {
      this.$refs[refname].hide();
      console.log("something modal:: " + refname);
    },

    updatePeriodo() {
      let data = {
        cofId: this.cofId,
        cofInicio: this.detalleconfirmacion["cofInicio"],
        cofFinal: this.detalleconfirmacion["cofFinal"],
      };

      ConfirmacionServices.updatePeriodo(data)
        .then((response) => {
          let mensaje = response.data;

          if (mensaje.data == 200) {
            var type = "success filled";
            var title = "Period Update";
            var message = "Add";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
         //   this.$emit("update");
          }        //    this.$emit("update");
                 //      this.setChangeHeaderConfirmation(1);
                 location.reload();
          
        })
        .catch((error) => {
          var type = "error filled";
          var title = "Period";
          var message = "Out of range";
          this.$notify(type, title, message, {
            duration: 3000,
            permanent: false,
          });
        });
        this.setChangeHeaderConfirmation(1);
    },
  },
  mounted() {
    this.getInfoConfirmacion();
  },
};
</script>