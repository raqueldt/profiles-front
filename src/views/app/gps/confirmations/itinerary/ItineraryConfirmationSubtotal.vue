<template>
<b-container >
  <b-row class="quote-summary align-items-center" v-if="Boolean(getConfirmationTotals)">

    <b-col lg="12" >

      <b-row class="title-summary align-items-center pl-2">
        <b-col lg="6" md="6" xs="6" cols="6"  class="border-right">
          <b-row> Subtotal </b-row>
          <b-row style="padding: 0.24rem">
            IVA
            <b-form-select
              :disabled="$isOperador"
              v-model="selectedIva"
              :options="ivaList"
              value-field="metName"
              text-field="metName"
              size="sm"
              class="iva-select"
              @change="updateIva"
            ></b-form-select>
            %
          </b-row>
        </b-col>

        <b-col  lg="6" md="6" xs="6" cols="6" class="border-right ">
          <b-row  class="border" >
            <b-col class="text-right  border-bottom">
              {{ getConfirmationTotals.subtotal | number('0,0.00')}}
            </b-col>
          </b-row>
          <b-row  class="border">
            <b-col class="text-right">
              {{ getConfirmationTotals.valorIva | number('0,0.00') }}
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="title-summary align-items-center  pl-2 border-right border">
        <b-col  lg="6" md="6" xs="6" cols="6" class="border-right ">
          <b-row>Total</b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col class="text-right">
              {{ getConfirmationTotals.total | number('0,0.00')}}
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>


  </b-row>
</b-container>
</template>

<script>

/* *** SERVICES *** */
import MetadataServices from "@/services/gps/metadata/MetadataServices.js";
import ConfirmacionesServices from "@/services/gps/confirmacion/ConfirmacionServices";

import { mapGetters, mapMutations, mapActions } from "vuex";


export default {

  props: ["cofId"],

  data() {
    return {

      ivaList: [],

      selectedIva: null,

    };
  },

  watch: { 

  },

  computed: {

    ...mapGetters("confirmacion", ["getChangeHeaderConfirmation", "getConfirmationTotals"]),


  },
  methods: {

    ...mapMutations("confirmacion", ["setChangeHeaderConfirmation"]),
    ...mapActions("confirmacion", ["getTotalConfirmacionAction"]),

    async getIva() {

      const { data: { data }  } = await MetadataServices.getMetadataByGroup(31)

      this.ivaList = data

    },

    async updateIva() {

      const params = {
        cofId: this.cofId,
        cofIva: parseInt(this.selectedIva)
      };

      try {

        const { data } = ConfirmacionesServices.updateConfirmacionIva( params )

        this.setChangeHeaderConfirmation(1) //??

        // Ejecuto action totalConfirmacion para actualizar valor total en Cabecera
        await this.getTotalConfirmacionAction( this.cofId )
        
        

        const type = "success filled";
        const title = "Success";
        const message = this.$t('gps.confirmation-itinerary.iva-updated');
        this.$notify(type, title, message, { duration: 3000, permanent: false });

      } catch (error) {

        const type = "error filled";
        const title = "Iva";
        const message = this.$t('gps.confirmation-itinerary.iva-no-updated');
        this.$notify(type, title, message, { duration: 3000, permanent: false });

      }
      this.$forceUpdate();
      await this.setValueIVA();

    },
    async setValueIVA(){
      var valZeroIVA = parseInt(this.ivaList.filter(f => f.metCodigo === 1).map(a => a.metName));
      var valIVA = parseInt(this.ivaList.filter(f => f.metCodigo === 2).map(a => a.metName));
      if(Boolean(this.getConfirmationTotals)){        
        if(this.getConfirmationTotals.iva > 0 ) this.selectedIva = valIVA
        else this.selectedIva = valZeroIVA
      }
    }
  },


  async created() {
    await this.getIva()
    await this.setValueIVA()
  },
  async mounted() {
    
  },

};
</script>
