/* Componente :
- Tabs grupo de cotizacion */
<template>
  <div>

    <b-row v-if="isLoading" class="my-2">

      <b-col>
          <b-skeleton></b-skeleton>
      </b-col>

    </b-row>

    <b-row v-else>

      <b-col cols="12">

        <b-tabs
          nav-class="separator-tabs custom-tabs ml-0 mb-0 "
          content-class="tab-content custom-tab"
          :no-fade="true"
        >
          <!--     {{infoheadergct}} -->
          <b-tab
            v-for="(item, index) in infoheadergct['cotizaciones']"
            @click="sendCot(item.cotId)"
            :key="index"
          >
            <template #title>
              <i class="glyph-icon simple-icon-tag mr-1"></i> Q
              {{ item.cotCodigo }}
              <!--          {{item}} -->
            </template>
          </b-tab>

          <detail-items
          :cotId="cot"
          :clientId="infostatusgct.gctClienteId"
          :cotEstado="parseInt(infoheadergct['cotizaciones'].map(x => x.cotEstado))"
          />

          <!-- New Tab Button (Using tabs-end slot) -->
          <!-- {{infostatusgct.gctEstado}} -->

          <template
            v-if="canAddQuotes  && Boolean(infostatusgct) && infostatusgct.gctEstado == 1"
            #tabs-end
          >
            <b-nav-item role="presentation" class="tab-end" href="#">
              <i @click="addQuote" title="Add quote to this request" class="glyph-icon simple-icon-plus" />
            </b-nav-item>
          </template>



          <!-- Render this if no tabs -->
          <template #empty>
            <div class="text-center text-muted">
              There are no open tabs<br />
              Open a new tab using the <b>+</b> button above.
            </div>
          </template>

        </b-tabs>
      </b-col>

    </b-row>
  </div>
</template>


<script>

import GrupoCotizacionesServices from "@/services/gps/grupocotizaciones/GrupoCotizacionesServices.js";
import { mapGetters, mapMutations } from 'vuex'

export default {

  name: 'QuotaTabs',

  props: ["gctId", "refresh"],

  data() {

    return {

      isLoading: false,

      infoheadergct: "",

      infostatusgct: "",

      cot: "",

    };

  },


  watch: {
  'refresh': function (newVal, oldVal){
      
      if(newVal === 1){
        Promise.all([
          this.getgrupocotizaciones(),
          this.getinfocotizaciones()
        ])
      }
     },
  },

  computed:{

    ...mapGetters('cotizacion', ['getSelectedCot']),

    //2023-02-14 | fg | determinar si se permite agregar cotizaciones al grupo
    canAddQuotes(){

      if ( !this.infostatusgct )  return false

      const { cotizaciones } = this.infostatusgct


      const cotizacionConfirmada = cotizaciones.filter( quote => quote.cotEstado == 2 )   // buscar cotizaciones confirmadas (status=2)

      if ( cotizacionConfirmada.length )  return false

      return true

    }


  },

  methods: {

    ...mapMutations('cotizacion', ['setSelectedCot']),

    // 2021-09-14 | fg | redigir hacia disponibilidad con id grupo-cotizacion
    addQuote() {
      this.$router.push({
        path: `/availability`,
        query: {
          gct: `${this.gctId}`,
          req: `${this.infoheadergct.reqId}`,
        },
      });
    },

    sendCot(item) {

      this.cot = item;
      this.setSelectedCot( this.cot );
    },

    async getgrupocotizaciones() {

      const { data } = await GrupoCotizacionesServices.getgrupocotizaciones(this.gctId)

      this.infoheadergct = data
      this.cot = this.infoheadergct["cotizaciones"][0]["cotId"]; // Enviamos por defecto la primera cotizacion

      this.setSelectedCot( this.cot );


    },



    async getinfocotizaciones() {

      const { data } = await GrupoCotizacionesServices.getgrupocotizaciones(this.gctId)

      this.infostatusgct = data

    },

  },

  async created() {

    this.isLoading = true

    await Promise.all([
      this.getgrupocotizaciones(),
      this.getinfocotizaciones()
    ])

    this.isLoading = false

  },

};
</script>
