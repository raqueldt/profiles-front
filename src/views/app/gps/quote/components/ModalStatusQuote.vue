/* Componente :
- Modal cancelar una cotizacion*/
<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-jumbotron
          header=""
          lead="Are you sure to cancel this quote?"
          header-level="4"
        >
          <hr class="my-2" />
          <ol
            style="
              color: #8f8f8f;
              font-size: 14px;
              padding-bottom: 20px;
              padding-left: 20px;
              line-height: 1.6;
            "
          > <br>
            <li>{{ $t("gps.spaces-specific-released") }}</li> <br>
            <li>{{ $t("gps.not-reactivate-quote") }}</li>
          </ol>
          <p class="lead text-center">
            <b-button variant="primary" @click="cancelquote">I'm sure</b-button>
          </p>
        </b-jumbotron>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices.js";

export default {
  props: ["cotId"],
  methods: {
    cancelquote() {
      CotizacionesServices.cancelquote(this.cotId, this.userId)
        .then((response) => {
          let mensaje = response.data;
          // console.log(response.data);

          if (mensaje == true) {
            var type = "success filled";
            var title = "Quote cancelled";
            var message = "Cancelled";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
            this.$emit("updateStatusQuote");
          } else {
            var type = "error filled";
            var title = "Quote";
            var message = "No cancelled";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {},
  computed: {
    userId() {
      return this.$root.$loggedUserId;
    },
  },
};
</script>
