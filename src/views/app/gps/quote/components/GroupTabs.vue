/* Componente :
- Tabs grupo de cotizacion en preview */
<template>
  <div>
    <b-row>
      <b-colxx lg="12">
        <b-tabs
          nav-class="separator-tabs custom-tabs ml-0 mb-4"
          content-class="tab-content custom-tab"
          :no-fade="true"
        >
          <b-tab
            v-for="(item, index) in infoheadergct['cotizaciones'] "
            v-if="item.cotEstado == 1"
            @click="sendCot(item.cotId)"
            :key="index"
          >
            <template #title>
              <!-- {{item.cotEstado}} -->
              <i class="glyph-icon simple-icon-tag mr-1"></i> Q
              {{ item.cotCodigo }}
              <!-- - {{item.cotId}}
 -->
            </template>
          </b-tab>
          <quote-preview-by-group :cotId="cot" />

          <template #empty>
            <div class="text-center text-muted">
              There are no open tabs<br />
              Open a new tab using the <b>+</b> button above.
            </div>
          </template>
        </b-tabs>
      </b-colxx>
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
      infostatusgct: "",

      cot: "",
    };
  },
  methods: {
    sendCot(item) {
      this.cot = item;
    },
    getgrupocotizaciones() {
      GrupoCotizacionesServices.getgrupocotizaciones(this.gctId)
        .then((response) => {
          this.infoheadergct = response.data;
          this.cot = this.infoheadergct['cotizaciones'][0]['cotId'] ;
        })
        .catch((error) => {
          console.log("Error: " + error);
          showAnimation;
        });
    },

    getinfocotizaciones() {
      this.gctId;
      let data = {
        gctId: this.gctId,
      };

      GrupoCotizacionesServices.getgrupocotizaciones(data)
        .then((response) => {
          this.infostatusgct = response.data;
      //    this.infostatusgct = this.infostatusgct.shift();
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
  },
  mounted() {
    this.getgrupocotizaciones();
    this.getinfocotizaciones();
  },
};
</script>