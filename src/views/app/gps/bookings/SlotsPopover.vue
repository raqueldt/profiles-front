<template>
  <div class="container">
    <!-- bosStatus: {{ bosStatus }} -->

    <div class=" text-center" v-if="bosStatus == 1">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="text-left p-1">
            <small>
              <span
                ><i class="glyph-icon iconsminds-right-1"></i>
                <strong>Vessel1:</strong>
                <span class="text-muted float-right">{{ vslName }}</span></span
              ><br />
              <span
                ><i class="glyph-icon iconsminds-right-1"></i>
                <strong>Deck:</strong>
                <span class="text-muted float-right">{{ decName }}</span></span
              ><br />
              <span
                ><i class="glyph-icon iconsminds-right-1"></i>
                <strong>Cabin:</strong>
                <span class="text-muted float-right">{{ cabName }}</span></span
              ><br />
              <span
                ><i class="glyph-icon iconsminds-right-1"></i>
                <strong>Client:</strong>
                <span class="text-muted float-right">{{ bokClientName }}</span></span
              >
            </small>
          </div>
        </div>
      </div>
    </div>
    <div class=" text-center" v-if="bosStatus == 2">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="text-left p-1">
            <small>
              <span
                ><i class="glyph-icon iconsminds-right-1"></i>
                <strong>Client:</strong>
                <span class="text-muted float-right">{{ bokClientName }}</span></span
              ><br />
              <span
                ><i class="glyph-icon iconsminds-right-1"></i>
                <strong>Value:</strong>
                <span class="text-muted float-right">{{
                  offNetRate | currency
                }}</span></span
              ><br />
              <span
                ><i class="glyph-icon iconsminds-right-1"></i
                ><strong>Reference:</strong>
                <span class="text-muted float-right">{{ cofReferencia }}</span></span
              ><br />
              <span
                ><i class="glyph-icon iconsminds-right-1"></i
                ><strong>Confirmation Code:</strong>
                <span class="text-muted float-right">{{ cofCodigo }}</span></span
              ><br />
            </small>
          </div>
        </div>
      </div>
    </div>
    <div v-if="bosStatus == 3" class="row text-center">      
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="text-left p-1">
            <small>
              <span
                ><i class="glyph-icon iconsminds-right-1"></i>
                <strong>Vessel3:</strong>
                <span class="text-muted float-right">{{ vslName }}</span></span
              ><br />
              <span
                ><i class="glyph-icon iconsminds-right-1"></i>
                <strong>Cabin:</strong>
                <span class="text-muted float-right">{{ cabName }}</span></span
              ><br />
              <span
                ><i class="glyph-icon iconsminds-right-1"></i
                ><strong>Deck:</strong>
                <span class="text-muted float-right">{{ decName }}</span></span
              ><br />
              <span
                ><i class="glyph-icon iconsminds-right-1"></i>
                <strong># Bed(s):</strong>
                <span class="text-muted float-right">{{
                  bedsNumber
                }}</span></span
              ><br />
              <span
                ><i class="glyph-icon iconsminds-right-1"></i>
                <strong>Max booking(s):</strong>
                <span class="text-muted float-right">{{
                  layMaxBooking
                }}</span></span
              ><br />
            </small>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!Boolean(bosStatus)" class="text-center">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="text-left p-1">
            <small>
              <span
                ><i class="glyph-icon iconsminds-right-1"></i>
                <strong>Vessel0:</strong>
                <span class="text-muted float-right">{{ vslName }}</span></span
              ><br />
              <span
                ><i class="glyph-icon iconsminds-right-1"></i>
                <strong>Cabin:</strong>
                <span class="text-muted float-right">{{ cabName }}</span></span
              ><br />
              <span
                ><i class="glyph-icon iconsminds-right-1"></i
                ><strong>Deck:</strong>
                <span class="text-muted float-right">{{ decName }}</span></span
              ><br />
              <span
                ><i class="glyph-icon iconsminds-right-1"></i>
                <strong># Bed(s):</strong>
                <span class="text-muted float-right">{{
                  bedsNumber
                }}</span></span
              ><br />
              <span
                ><i class="glyph-icon iconsminds-right-1"></i>
                <strong>Max booking(s):</strong>
                <span class="text-muted float-right">{{
                  layMaxBooking
                }}</span></span
              >

            </small>
          </div>
        </div>
      </div>
    </div>

    <!-- INFORMACIÓN PARA TESTING -->
     <!-- <hr />
    <small>
      <span
        >avsId: {{ avsId }}- layId: {{ layId }} - cabId: {{ cabId }} - cruId:
        {{ cruId }}
        - priId: {{ priId }} - offId: {{ offId }}</span
      ><br />
      <span
        >layMaxBooking: {{ layMaxBooking }} - Camas: {{ bedsNumber }} - layPax:
        {{ layPax }} </span
      >
    </small> -->
    <!-- INFORMACIÓN PARA TESTING -->
  </div>
</template>

<script>
import slotsConditions from "../../../../mixins/slots/slotsConditions.js";
import slotsConditionsOnClick from "../../../../mixins/slots/slotsConditionsOnClick.js";
import slotsFormat from "../../../../mixins/slots/slotsFormat.js";

export default {
  name: "DeparturesSlots",
  props: ["row"],
  data() {
    return {
      avsId: "",
      layId: "",
      layPax: "",
      vslName: "",
      cruId: "",
      decName: "",
      cabName: "",
      offNetRate: "",
      bosStatus: "",
      bosCondition: "",
      bokClientName: "",
      cofReferencia: "",
      cofCodigo: "",
      bedsNumber: "",
      layMaxBooking: "",
      cabId: "",
      priId: "",
      offId: ""
    };
  },

  methods: {},
  mounted() {
    if (Boolean(this.row)) {
      let {
        avsId,
        layId,
        layPax,
        vslName,
        cruId,
        cabId,
        priId,
        offId,
        decName,
        cabName,
        offNetRate,
        bedsNumber,
        layMaxBooking
      } = this.row;
      // let {bosStatus, bosCondition, bokClientName, cofReferencia, cofCodigo} = this.row.booking;

      this.avsId = avsId;
      this.layId = layId;
      this.layPax = layPax;
      this.vslName = vslName;
      this.cruId = cruId;
      this.cabId = cabId;
      this.priId = priId;
      this.offId = offId;
      this.decName = decName;
      this.cabName = cabName;
      this.offNetRate = offNetRate;
      this.bedsNumber = bedsNumber;
      this.layMaxBooking = layMaxBooking;

      if (Boolean(this.row.booking)) {
        let {
          bosStatus,
          bosCondition,
          bokClientName,
          cofReferencia,
          cofCodigo
        } = this.row.booking;

        this.bosStatus = bosStatus;
        this.bosCondition = bosCondition;
        this.bokClientName = bokClientName;
        this.cofReferencia = cofReferencia;
        this.cofCodigo = cofCodigo;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
