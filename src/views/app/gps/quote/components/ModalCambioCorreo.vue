/* Componente :
- Modal accion para editar el correo */
<template>
  <div>
    <b-row class="my-1">
      <b-col sm="2">
        <label for="input-small">Email:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input
          id="input-small"
          type="email"
          v-model="detallecotizacionheader.cotCorreoCliente"
          size="sm"
          placeholder="Enter your name"
        ></b-form-input>
      </b-col>
    </b-row>
    <br />
    <b-row>
      <b-col sm="5"> </b-col>
      <div>
        <b-button
          v-if="detallecotizacionheader.cotCorreoCliente"
          @click="updateCorreo"
          variant="primary"
          class="mr-1"
          >{{ $t("gps.pax.save-button") }}</b-button
        >
      </div>
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
    return {
      detallecotizacionheader: [],
      detallecotizacionbooking: [],
     };
  },
  computed: {
    ...mapGetters("cotizacion", ["getChangeHeaderQuote"]),
    userId() {
      return this.$root.$loggedUserId;
    },
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
    updateCorreo() {
      let data = {
        cotId: this.cotId,
        cotCorreoCliente: this.detallecotizacionheader.cotCorreoCliente,
        depId: this.detallecotizacionbooking.depId,
        bokClientId:this.detallecotizacionbooking.bokClientId,
        usuarioId:this.userId,
      };

      CotizacionesServices.updateCorreo(data)
        .then((response) => {
          let mensaje = response.data;
          if (mensaje.data == 200) {
            var type = "success filled";
            var title = "Success";
            var message = "Reference was updated successfully";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
          } else {
            var type = "error filled";
            var title = "Titulo";
            var message = "No update";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
          }
          this.$emit("hideModal");
          this.setChangeHeaderQuote(1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.cotizaciondetalles();
  },
};
</script>