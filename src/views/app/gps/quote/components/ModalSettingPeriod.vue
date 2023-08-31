/* Componente :
- Modal agregar o acortar fechas de cotizacion */
<template>
  <div>


  <b-row class="filters-card pl-0">
        <b-colxx xs="">
<!--      <div class="d-flex flex-row align-items-center mb-5">
            <router-link to="#"
              >
               <i :class="`large-icon initial-height iconsminds-time-backup`">
            <small>   {{infoquote.cotReferencia}}</small> 
               </i>
             
            </router-link> 

          </div> -->

          

        </b-colxx>

        </b-row>



    <b-row>
      <b-colxx lg="12">
        <!--  {{cotId}}
      {{detallecotizacionheader['cotDesde']}} -->

        <div>
          <label for="datepicker-dateformat1">{{
            $t("dashboards.start-date-quote")
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
            v-model="detallecotizacionheader['cotDesde']"
            :min="min"
            :max="detallecotizacionheader['cotDesde']"
          >
          </b-form-datepicker>

          <label class="mt-3" for="datepicker-dateformat2">{{
            $t("dashboards.end-date-quote")
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
            v-model="detallecotizacionheader['cotHasta']"
            :min="detallecotizacionheader['cotHasta']"
          >
          </b-form-datepicker>
        </div>
      </b-colxx>
    </b-row>

    <br />
    <b-row style="justify-content: center">
<!-- 
       <b-button  @click="updatePeriodo"   variant="link"
                          class="mr-1">{{ $t('gps.pax.save-button') }}</b-button> -->

                             <b-button
                
                      @click="updatePeriodo"
                      variant="primary"
                      class="mr-1"
                      >{{ $t("gps.pax.save-button") }}</b-button
                    >

    </b-row>
  </div>
</template>
<script>
import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices.js";
import { mapGetters, mapMutations } from "vuex";
import moment from "moment";
export default {
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
        infoquote: "",
      cotDesde: "",
      cotHasta: "",
    };
  },
  computed: {
    ...mapGetters("cotizacion", ["getChangeHeaderQuote"]),
  },
  methods: {
    ...mapMutations("cotizacion", ["setChangeHeaderQuote"]),
    currentDateTime() {
      return moment();
    },
    cotizaciondetalles() {
      CotizacionesServices.cotizacionesdetalles(this.cotId)
        .then((response) => {
          this.detallecotizacionheader = response.data;
          this.detallecotizacionheader = this.detallecotizacionheader.shift();
          this.detallecotizacionbooking =
            this.detallecotizacionheader["booking"];
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
       getInfoQuotebyAddServices() {
      CotizacionesServices.getInfoQuotebyAddServices(this.cotId)
        .then((response) => {
          this.infoquote = response.data.data;
        
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
    updatePeriodo() {
      let data = {
        cotId: this.cotId,
        cotDesde: this.detallecotizacionheader["cotDesde"],
        cotHasta: this.detallecotizacionheader["cotHasta"],
      };

      CotizacionesServices.updatePeriodo(data)
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
             this.$emit('closeModal')
            // this.$emit("updatePeriod");
            // Cargar a la tienda algun llamado
            this.setChangeHeaderQuote(1);
          }
          
           
        })
        .catch((error) => {
          var type = "error filled";
          var title = "Period";
          var message = "Out of range";
          this.$notify(type, title, message, {
            duration: 3000,
            permanent: false,
          });
                    this.$emit('closeModal')
        });
    },
  },
  mounted() {
    this.cotizaciondetalles();
        this.getInfoQuotebyAddServices();
  },
};
</script>