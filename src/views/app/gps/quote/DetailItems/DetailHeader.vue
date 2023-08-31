<!-- /* Componente :
- Cabecera de cotizacion */ -->
<template>
  <div>
    <b-row>
      <b-col md="4" class="pl-0">
        <div class="d-flex mt-1">
          <!-- info de referencia de cliente -->
          <!--  {{selectedCot}} -->
          <span class="mt-1"><strong>Client Ref: </strong></span>

          <div class="d-flex">
            <div class="ml-2 mr-2" style="margin-top: 0.1rem">
              {{ detallecotizacionheader["cotReferencia"] }}
            </div>
         <!--    <b-button
              type="submit"
              disabled
              variant="outline-primary default"
              size="sm"
              ><i class="fas fa-bookmark"></i
            ></b-button> -->
          </div>
        </div>
        <div class="d-flex info-quote-ref">
          <div>
            <!--     <span>
              <strong>Atc Ref:</strong> -->
            <!--         <span>{{ detallecotizacionheader["cotReferenciaCliente"] }}</span> -->
            <small class="text-muted text-uppercase">{{
              detallecotizacionheader.cotId
            }}</small>
            <!--     </span> -->
          </div>
          <span class="ml-1 mr-1"><strong class="text-dark">|</strong></span>
          <div>
            <span>
              <strong>User:</strong>
              <span> {{ detallecotizacionheader["vendedorName"] }} </span>
            </span>
          </div>
          <span class="ml-1 mr-1"><strong class="text-dark">|</strong></span>
          <div>
            <span >
              <strong> <span :style="{'color': detallecotizacionheader['colorEstado']}">{{detallecotizacionheader["nombreEstado"]}}</span></strong>
            </span>
     
            <!-- Solo se puede cancelar una cotizacion validacion cotEstado=1 -->
            <b-button
              v-if="detallecotizacionheader['cotEstado'] == 1"
              v-b-modal.qoutestatusSettings
              variant="outline-primary default"
              size="sm"
              ><i class="fa fa-lock-open"></i>
            </b-button>
          </div>
        </div>
      </b-col>
      <b-col>
        <div class="mt-2">
          <span class="mt-1">
            <strong>From: </strong
            ><span>
              <!-- {{
                moment(
                  detallecotizacionheader["cotDesde"],
                  "YYYY-MM-DD"
                ).format("MMM DD YYYY, ddd")
              }} -->

              {{
                moment(
                  detallecotizacionheader["cotDesde"],
                  "DD MMM YYYY, ddd h:mm"
                ).format("DD MMM YYYY, ddd h:mm ")}}ECT
            </span>
          </span>
          <br />
          <span>
            <strong> To: </strong
            ><span>
              {{
                moment(
                  detallecotizacionheader["cotHasta"],
                  "YYYY-MM-DD"
                ).format("DD MMM YYYY, ddd h:mm ")}}ECT
              
            </span>
          </span>
          <b-button
            v-if="detallecotizacionheader['cotEstado'] == 1"
            v-b-modal.dateSettings
            class="ml-1"
            variant="outline-primary default"
            size="sm"
            ><i class="fa fa-cog"></i>
          </b-button>
        </div>
      </b-col>
      <b-col class="pl-0 pr-0">
        <div class="mt-2">
          <span class="mt-1">
            <strong>Time Limit: </strong>
          </span>
          <br />
          <span class="mt-1" style="font-size:0.67rem">
            <!--   {{
              moment(
                detallecotizacionbooking["codTiempoLimite"],
                "YYYY-MM-DD"
              ).format("MMM DD YYYY h:mm:ss a")
            }} -->
            <!-- {{detallecotizacionbooking["codTiempoLimite"]}} -->
            {{ moment(detallecotizacionbooking["codTiempoLimite"]).format("DD MMM YYYY, ddd h:mm ")}}ECT
            
          </span>
          <b-button
            v-if="detallecotizacionheader['cotEstado'] == 1"
            v-b-modal.timelimitSettings
            class="ml-1"
            variant="outline-primary default"
            size="sm"
            ><i class="fa fa-clock"></i
          ></b-button>
        </div>
      </b-col>
      <b-col class="pr-0">
        <div class="mt-2">
          <span>
            <strong>Quote date created:</strong><br />
            <span>
              {{
                moment(
                  detallecotizacionheader["created_at"],
                  "YYYY-MM-DD"
                ).format("DD MMM YYYY, ddd h:mm ")}}ECT
            </span>
          </span>
        </div>
      </b-col>
    </b-row>

    <!-- Modal Extend Time Limit -->
    <b-modal
      id="timelimitSettings"
      ref="timelimitSettings"
      modal-class="modal-right"
      title="Extend Time Limit"
    >
      <modal-extend-timelimit
        v-if="selectedCot"
        @updateExtendTimeLimit="updateExtendTimeLimit"
        :cotId="selectedCot"
      >
      </modal-extend-timelimit>
      <modal-extend-timelimit
        v-else
        @updateExtendTimeLimit="updateExtendTimeLimit"
        :cotId="cotId"
      >
      </modal-extend-timelimit>
      <template slot="modal-footer">
        <b-button
          class="mt-2 mb-2"
          variant="primary default"
          @click="hideModal('timelimitSettings')"
          >{{ $t("gps.close") }}</b-button
        >
      </template>
    </b-modal>
    <!-- Modal Extend Period Quote -->
    <b-modal
      id="dateSettings"
      ref="dateSettings"
      modal-class="modal-right"
      title="Change Period Quote"
    >
      <modal-setting-period
        v-if="selectedCot"
        @updatePeriod="updatePeriod"
        :cotId="selectedCot"
      >
      </modal-setting-period>
      <modal-setting-period v-else @updatePeriod="updatePeriod" :cotId="cotId">
      </modal-setting-period>
      <template slot="modal-footer">
        <b-button
          class="mt-2 mb-2"
          variant="primary default"
          @click="hideModal('dateSettings')"
          >{{ $t("gps.close") }}</b-button
        >
      </template>
    </b-modal>
    <!-- Modal Cancel Quote -->
    <b-modal
      id="qoutestatusSettings"
      ref="qoutestatusSettings"
      modal-class="modal-right"
      :title="$t('gps.cancel-quote')"
    >
      <modal-status-quote
        v-if="selectedCot"
        @updateStatusQuote="updateStatusQuote"
        :cotId="selectedCot"
      >
      </modal-status-quote>
      <modal-status-quote
        v-else
        @updateStatusQuote="updateStatusQuote"
        :cotId="cotId"
      >
      </modal-status-quote>

      <template slot="modal-footer">
        <b-button
          class="mt-2 mb-2"
          variant="primary default"
          @click="hideModal('qoutestatusSettings')"
          >{{ $t("gps.close") }}</b-button
        >
      </template>
    </b-modal>
  </div>
</template>
<script>
/* *** SERVICES *** */

import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices.js";

export default {
  name: "ModalItinerary",
  props: ["cotId"],

  data() {
    return {
      cotizacion: "",
      selectedCot: "",
      detallecotizacionheader: [],
      detallecotizacionbooking: [],
    };
  },
  filters: {},
  computed: {},

  watch: {
    cotId: function (newVal, oldVal) {
      this.selectedCot = newVal;
      this.cotizaciondetalles();
    },
  },

  mounted() {
    this.cotizaciondetallesinit();
  },

  methods: {
    gotopreview(cotId) {
      let routeData = this.$router.resolve({
        name: "quotepreview",
        params: { cotId: cotId },
      });
      window.open(routeData.href, "_blank");
    },
    hideModal(refname) {
      this.$refs[refname].hide();
    },
    updateStatusQuote() {
      this.cotizaciondetalles();
      this.hideModal("qoutestatusSettings");
    },
    updatePeriod() {
      this.cotizaciondetalles();
      this.hideModal("dateSettings");
    },
    updateExtendTimeLimit() {
      this.cotizaciondetalles();
      this.hideModal("timelimitSettings");
    },

    cotizaciondetalles() {
      CotizacionesServices.cotizacionesdetalles(this.selectedCot)
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

    cotizaciondetallesinit() {
      if (this.cotId > 0) {
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
      }
    },
  },
};
</script>
