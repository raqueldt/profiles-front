<template>
  <div>
    <b-row class="title-summary">
      <b-col md="4" class="border-right">
        <b-row> Subtotal </b-row>
        <b-row>
          <b-form-select
            v-model="totalescotizacion.iva"
            value-field="metName"
            text-field="metName"
            :options="iva"
            size="sm"
            class="mt-3"
          ></b-form-select>
        </b-row>
      </b-col>

      <b-col class="border-right">
        <b-row> {{ totalescotizacion.subtotal }} </b-row>
        <b-row> {{ totalescotizacion.valorIva }} </b-row>
      </b-col>
<!-- {{detallecotizacion}} -->
      <!--   <b-col class="border-right">
        <b-row> n/a </b-row>
        <b-row> n/a </b-row>
      </b-col> -->
    </b-row>
    <b-row class="title-summary">
      <b-colxx md="3">
        <b-row>Grant Total123</b-row>
      </b-colxx>
      <b-colxx>
        <b-row>$ {{ totalescotizacion.total }} </b-row>
      </b-colxx>
    </b-row>
    <!--  {{flag}}  -->  </div>
</template>

<script>
/* *** SERVICES *** */

import MetadataServices from "../../../../../services/gps/metadata/MetadataServices.js";

import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices.js";

export default {
  props: ["cotId","flag"],

  data() {
    return {
      cotizacion: "",
      selectedCot: 0,

      iva: [],
      detallecotizacion: [],
      totalescotizacion: [],
      detallecotizacionheader: [],
    };
  },
  watch: {
    cotId: function (newVal, oldVal) {
      this.selectedCot = newVal;
      this.cotizaciondetalles();
      this.totalcotizacion();
    },
        flag: function (newVal, oldVal) {
     this.selectedCot = newVal;
      this.totalcotizacion();
    },
  },

    computed: {
    fullName: function () {
      CotizacionesServices.totalescotizacion(this.cotId)
        .then((response) => {
          this.totalescotizacion = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });

        return this.totalescotizacion();
    }
  },

  methods: {
    cotizaciondetalles() {
      CotizacionesServices.cotizacionesdetalles(this.selectedCot)
        .then((response) => {
          // console.log("==> " + JSON.stringify(response.data));
          this.detallecotizacion = response.data;
          this.detallecotizacion = this.detallecotizacion.shift();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    totalcotizacion() {
      CotizacionesServices.totalescotizacion(this.selectedCot)
        .then((response) => {
          this.totalescotizacion = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getIva() {
      MetadataServices.getMetadataByGroup(31)
        .then((response) => {
          this.iva = response.data.data;
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
  },
  mounted() {
    this.getIva();
  },
};
</script>
