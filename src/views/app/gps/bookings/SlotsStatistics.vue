<template>
  <b-container>
    <b-row class="space-actions mb-2 mt-3">
      <!-- ==>Store: {{proccessingCharter}} -->
      <!-- ---------------------------------------------<br>
rowDataChoosen: {{rowDataChoosen.length}}<br>
availableSlots: {{availableSlots}}<br>
blockedSlots: {{blockedSlots}}<br>
cruPaxLimit: {{cruPaxLimit}}<br>
totalAvailableSlots: {{totalAvailableSlots}}<br>
tag: {{tag}} -->
      <!-- charterStatus: {{charterStatus}} -->
      <!-- rowDataChoosen: {{rowDataChoosen.length}}<br>
availableSlots: {{availableSlots}}<br>
blockedSlots: {{blockedSlots}}<br>
confirmedSlots: {{confirmedSlots}}<br></br>
cruPaxLimit: {{cruPaxLimit}}<br>
totalAvailableSlots: {{totalAvailableSlots}}<br>
tag: {{tag}} -->
      <!-- {{rowData}} -->

      <!-- rowDataChoosen: {{rowDataChoosen.length}}<br>
blockedSlots: {{blockedSlots}}<br>
confirmedSlots: {{confirmedSlots}}<br></br>
cruPaxLimit: {{cruPaxLimit}}<br>
totalAvailableSlots: {{totalAvailableSlots}}<br> -->

      <!-- {{rowData.length}} -->

      <!-- //No eliminar: -->
      <span class="d-none">totalAvailableSlots: {{ totalAvailableSlots }}</span>

      <b-colxx xxs="6" class="px-2 ">
        <b-row class="text-center">
          <b-colxx xxs="3">
            <b-badge class="" variant="info">
              {{ rowDataChoosen.length }}
            </b-badge>
            <br />
            <small class="custom-text">{{ $t("gps.selected") }}</small>
          </b-colxx>
          <b-colxx xxs="3" class="align-middle">
            <!-- <b-badge class="" variant="success">
            {{totalAvailableSlots >= 0 ? totalAvailableSlots : 0 }}
          </b-badge> -->
            <b-button style="cursor:default" class="badge " variant="av">
              <span>
                {{ totalAvailableSlots >= 0 ? totalAvailableSlots : 0 }}
                <!-- {{freeSlots}} -->
              </span>
            </b-button>
            <br />
            <small class="custom-text">{{ $t("gps.available") }}</small>
          </b-colxx>
          <b-colxx xxs="3">
            <b-button style="cursor:default" class="badge " variant="bl">
              <span> {{ blockedSlots }}</span>
            </b-button>
            <br />
            <small class="custom-text">{{ $t("gps.on-hold") }}</small>
          </b-colxx>
          <!-- <b-colxx xxs="3">
          <b-button 
            style="cursor:default"
            class="badge"
            variant="pb" >
            <span>
                {{confirmedSlots}}</span>
          </b-button>          
          <br>
          <small class="custom-text">{{$t('gps.confirmed')}}</small>
        </b-colxx> -->
        </b-row>
      </b-colxx>

      <b-colxx xxs="6" class="px-1">
        <b-row class="text-center">
          <div class="col-1"></div>
          <div class="col-4">
            <b-button
              v-if="!proccessingCharter"
              :disabled="rowDataChoosen.length == 0 ? true : false"
              href="#"
              variant="default space-clear"
              size="sm"
              class=" text-center"
              @click="setInitialCheck()"
              data-toggle="tooltip"
              data-placement="top"
              title="Click here to clear all selected slots"
            >
              <i class="glyph-icon simple-icon-close"></i> </b-button
            ><br />
            <small v-if="!proccessingCharter" class="custom-text">{{
              $t("gps.clear-all")
            }}</small>
          </div>
          <!-- {{cruPaxLimit}} -->

          <div
            class="col-3"
            v-if="
              blockedSlots == 0 &&
                tag == 'create' &&
                confirmedSlots == 0 && tag == 'create' &&
                allotmentSlots == 0 && tag == 'create' &&
                NASlots == 0 && tag == 'create'
            "
          >
            <b-button
              href="#"
              variant="default space-clear"
              v-if="!charterStatus"
              size="sm"
              class=" text-center"
              @click="charterAll()"
              data-toggle="tooltip"
              data-placement="top"
              title="Click here to charter all"
            >
              <i class="glyph-icon iconsminds-check"></i> </b-button
            ><br />
            <small class="custom-text" v-if="!charterStatus">{{
              $t("gps.charter")
            }}</small>
          </div>

          <b-colxx class="col-3" v-if="!hasConfirmedSlotInEdit">
            <b-form-checkbox
              v-model="allotment"
              :disabled="rowDataChoosen.length == 0 ? true : false"
              id="allotment"
              @change="setAllotmentsChange"
            >
            </b-form-checkbox>
            <small
              class="custom-text"
              data-toggle="tooltip"
              data-placement="top"
              title="Check if you want to block slots as allotments"
              >{{ $t("gps.allotments") }}</small
            >
          </b-colxx>
        </b-row>
      </b-colxx>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "SlotsStatitics",
  props: [
    "rowDataChoosen",
    "rowData",
    "availableSlots",
    "blockedSlots",
    "confirmedSlots",
    "tag",
    "cruPaxLimit",
    "setAllotmentToEdit",
    "allotmentSlots",
    "NASlots",
    "NASlotsEnGris",
    "freeSlots",
    "hasConfirmedSlotInEdit"
  ],
  data() {
    return {
      allotment: "",
      charter: "",
      valueCheckbox: "",
      statusProccessingCharter: false,
      charterStatus: false
    };
  },
  watch: {
    rowDataChoosen() {
      if (this.rowDataChoosen.length == this.cruPaxLimit) {
        this.statusProccessingCharter = false;
      } else if (
        this.rowDataChoosen.length < this.cruPaxLimit &&
        this.rowDataChoosen.length > 0
      ) {
        this.statusProccessingCharter = false;
      }
    },
    setAllotmentToEdit: function(val, oldVal) {
      this.allotment = val;
      //this.$emit('setAllotment', this.allotment)
    }
  },
  computed: {
    totalAvailableSlots() {
      // console.log("cruPaxLimit: " + this.cruPaxLimit);
      // console.log("blockedSlots: " + this.blockedSlots);
      // console.log("confirmedSlots: " + this.confirmedSlots);
      // console.log("allotmentSlots: " + this.allotmentSlots);
      // console.log("NASlots: " + this.NASlots);
      // console.log("NASlotsEnGris: " + this.NASlotsEnGris);
      // console.log("rowDataChoosen.length: " + this.rowDataChoosen.length);

      // var totalAvailableSlots =
      // this.cruPaxLimit -
      // this.blockedSlots -
      // this.confirmedSlots -
      // this.allotmentSlots -
      // this.NASlots -
      // this.rowDataChoosen.length;
      // this.$emit("totalAvailableSlotsFromStatitics", totalAvailableSlots);
      // return totalAvailableSlots;

      var totalAvailableSlots = "";
      if (this.rowData.length == 16) {
        totalAvailableSlots = this.freeSlots;
      } else {
        totalAvailableSlots =
          this.cruPaxLimit -
          this.blockedSlots -
          this.confirmedSlots -
          this.allotmentSlots -
          this.NASlots -
          this.rowDataChoosen.length;
      }
      this.$emit("totalAvailableSlotsFromStatitics", totalAvailableSlots);
      return totalAvailableSlots;
    },
    proccessingCharter: {
      get() {
        return this.$store.getters.getProccessingCharter;
      }
    }
  },
  methods: {
    setInitialCheck() {
      this.allotment = false;
      this.charter = false;
      if (this.tag == "create") {
        document.getElementById("allotment").checked = false;
      }
      // document.getElementById("charter").checked = false;
      this.$emit("clearRowDataChoosen");

      this.statusProccessingCharter = false;
      this.charterStatus = false;
    },
    // setAllotmentsChange(){
    //   console.log("allotment" + this.allotment);
    //   this.$emit('setAllotment', this.allotment)
    // },
    setAllotmentsChange(checked) {
      //console.log("Checked: " + checked)
      console.log("allotment: " + this.allotment);
      //this.allotment = checked;
      //this.allotment = checked ? checked : false;
      this.$emit("setAllotment", this.allotment);
    },
    charterAll() {
      this.$emit("selectAllForCharter");

      this.statusProccessingCharter = true;
      this.charterStatus = true;
      this.$store.commit("startProccessingCharter");
    }
    // setAllotmentInit(){
    //   Boolean(this.setAllotmentToEdit) ? this.allotment = this.setAllotmentToEdit : this.allotment = false;
    // }
  },
  created() {
    //this.setAllotmentInit()
  },
  mounted() {
    //setTimeout(() =>  this.setAllotmentInit(), 250);
  }
};
</script>

<style lang="scss" scoped></style>
