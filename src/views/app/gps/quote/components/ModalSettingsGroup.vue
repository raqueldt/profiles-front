/* Componente :
- Modal acciones por grupo de cotizacion */

<template>
  <div>
    <!--     {{ infoheadergct }} -->
    <b-row>
      <b-colxx lg="12">
        <b-alert show variant="info" class="mb-3">
          {{ $t("gps.confirm-send-group") }}
          
          <b-button
            :disabled="infoheadergct.gctEstado == 0"
            variant="info default"
            size="sm"
            class="float-right"
            @click="gotopreview(infoheadergct.gctId)"
            >{{ $t("gps.send-all-qoutes") }}</b-button
          >
        </b-alert>
      </b-colxx>
    </b-row>

    <div class="separator mb-3"></div>
    <b-row>
      <b-colxx lg="12">
        <b-alert show variant="danger" class="mb-1">
          <strong>
            {{ $t("gps.preview-cancel-quote-group") }}
          </strong>
          <br />
          <br />
          <strong> * </strong> {{ $t("gps.spaces-released") }} <br />
          <strong> * </strong> {{ $t("gps.quotas-denied") }}

          <b-button
            :disabled="infoheadergct.gctEstado == 0"
            variant="danger default"
            size="sm"
            class="float-right"
            @click="cancelargrupocotizaciones()"
            >{{ $t("gps.cancel-all-quotes") }}
          </b-button>
        </b-alert>
      </b-colxx>
      <!--      <vue-confirm-dialog></vue-confirm-dialog> recordatorio-->
    </b-row>
  </div>
</template>
<script>
import GrupoCotizacionesServices from "../../../../../services/gps/grupocotizaciones/GrupoCotizacionesServices.js";
export default {
  props: ["gctId"],
  data() {
    return {
      infoheadergct: "",
    };
  },
    computed:{
    userId () {
        return this.$root.$loggedUserId
        }
  },
  mounted() {
    this.getgrupocotizaciones();
  },
  methods: {
    gotopreview(gctId) {
      let routeData = this.$router.resolve({
        name: "quotepreviewgroup",
        params: { gctId: gctId },
      });
      window.open(routeData.href, "_blank");
    },
    getgrupocotizaciones() {
      GrupoCotizacionesServices.getgrupocotizaciones(this.gctId)
        .then((response) => {
          this.infoheadergct = response.data;
        })
        .catch((error) => {
          console.log("Error: " + error);
        })
    },

    cancelargrupocotizaciones() {
      this.$swal({
        title: "Cancel Group",
        html:
          '<span style="float:left" > <strong> 1) Spaces in all quotes will be released </strong></span> </br>' +
          '<span style="float:left"> <strong>2) You will not be able to reactivate this quotes  </strong></span></br>',

        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#ED7117",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          GrupoCotizacionesServices.cancelgrupocotizaciones(this.gctId, this.userId)
            .then((response) => {
              let mensaje = response.data;

              if (mensaje.data == true) {
                var type = "success filled";
                var title = "Quote Group";
                var message = "Cancelled";
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false,
                });
                this.$emit("updateStatusGroup");
              } else {
                var type = "error filled";
                var title = "Group";
                var message = "No cancelled";
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false,
                });
                this.$emit("updateStatusGroup");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
  },
};
</script>