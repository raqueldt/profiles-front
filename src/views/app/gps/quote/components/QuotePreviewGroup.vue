/* Componente :
- Preview padre Grupo de cotizacion  - Muestra las tabs de cotizaciones activas  */
<template>
  <div>
    <b-row>
      <b-colxx lg="12" class="quotegr-pdf-bg">
        <b-row class="pt-2 pl-2 pb-2 pr-0">
          <div class="quotegr-pdf-title col col-md-4 ml-1">
          <!--   {{infoheadergct}} -->
            <span v-if="infoheadergct['gctTitulo']">
              {{ infoheadergct["gctTitulo"] }}
            </span>
            <span v-else> Group </span>
           <!--  <span class="quote-pdf-atcref"
              ># {{ Math.random().toString(36).substring(9) }}-{{
                infoheadergct.gctId
              }}</span
            > -->
          </div>
          <div class="col-md-4 d-flex">
            <div class="mt-2">
              <span class="font-weight-bold">Client:</span>
              <span class="quote-pdf-atcref">
                {{ infoheadergct["razon_social"] }}
              </span>
            </div>
            <div class="mt-2 ml-3">
              <span class="font-weight-bold">Created:</span>
              <span>
                {{
                  moment(infoheadergct["created_at"], "YYYY-MM-DD").format(
                    "MMM DD YYYY, ddd"
                  )
                }}
              </span>
            </div>
          </div>
          <div class="col pr-0">
             <a style="float:right" 
              class="btn btn-primary default text-white"
              @click="sendGroupQuotescot()"
            >
              <i class="glyph-icon iconsminds-mail-block mr-1"></i>Send All</a
            >
          </div>
        </b-row>
        <div v-if="sendmail" class="text-center" style="float: center">
          <cube v-bind:loading="sendmail"> </cube>
          <h5 class="quote-pdf-atcref">
            <strong
              >Send Quotes <i class="glyph-icon iconsminds-mail-send"></i>
            </strong>
          </h5>
        </div>
      </b-colxx>
    </b-row>

    <b-row class="mt-3">
      <!-- {{infoheadergct}} -->
      <b-colxx lg="12 pl-0 pr-0">
        <group-tabs :gctId="gctId" />
      </b-colxx>
    </b-row>
  </div>
</template>
 
<script>
/* *** SERVICES *** */
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePaginationBootstrap from "../../../../../components/Common/VuetablePaginationBootstrap";
import MailServices from "../../../../../services/gps/mail/MailServices.js";
import GrupoCotizacionesServices from "../../../../../services/gps/grupocotizaciones/GrupoCotizacionesServices.js";
export default {
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
  },
  data() {
    return {
      sendmail: false,
      cotId: "",
      infoheadergct: "",
      detallecotizacion: [],
      totalescotizacion: [],
      detallecotizacionheader: [],
      detallecotizacionbooking: [],
      isModeEndRequest: true,
      routesnodestroy: true,
      perPage: 5,
      totalRows: 0,
    };
  },
  filters: {},
  created() {
    this.gctId = this.$route.params.gctId;
  },
  computed: {},
  methods: {
    sendGroupQuotescot() {
      this.$swal({
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Send",
        confirmButtonColor: "#ED7117",
        title: "Email address",
        input: "email",
        // inputValue:this.detallecotizacionheader["cotCorreoCliente"],
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: (email) => {},
      }).then((result) => {
        const mail = result.value;
        if (result.isConfirmed) {
          this.sendmail = true;
          MailServices.sendGroupQuotescot(this.gctId, mail)
            .then((response) => {
              let mensaje = response.data.data;
              if (mensaje == 200) {
                var type = "success filled";
                var title = "Send Quote";
                var message = "Succesful";
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false,
                });
                this.sendmail = false;
              } else {
                var title = "Error";
                var message = "no send";
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false,
                });
              }
            })
            .catch((error) => {
             var title = "Error";
                var message = "no send";
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false,
                });
            });
        }
      });
    },
    getgrupocotizaciones() {
      GrupoCotizacionesServices.getgrupocotizaciones(this.gctId)
        .then((response) => {
          var respuesta = response.data;
            this.infoheadergct = response.data;
        })
        .catch((error) => {
          console.log("Error: " + error);
          showAnimation;
        })
        .finally(() => (this.showAnimation = true));
    },
  },
  mounted() {
    this.getgrupocotizaciones();
  },
};
</script>

