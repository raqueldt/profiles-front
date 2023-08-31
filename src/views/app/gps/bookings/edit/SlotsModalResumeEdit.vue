<template>
    <div class="modal-body">
      <div class="table-wrapper-scroll-y my-custom-scrollbar">

          <b-container fluid class=" w-100 mb-4"  v-if="rowDataHeaderAndSummarySlots">
            <!-- {{rowDataHeaderAndSummarySlots.summary}} -->

                  <b-row class="border-2">
                      <b-colxx>

                          <div class="row w-100 bg-light p-2">
                                <div class="col-lg-5">
                                    <span class="mx-1"> <span class="text-muted">Cruise: {{rowDataHeaderAndSummarySlots.cruName}}</span>  </span>
                                </div>
                                <div class="col-lg-4">
                                    <span class="mx-1"><span class="text-muted">{{rowDataHeaderAndSummarySlots.itiName}}</span> | </span> <span class="text-primary mx-1">{{rowDataHeaderAndSummarySlots.itiNights}} Nights </span> 
                                </div>
                                <div class="col-lg-3">
                                    <span class="mx-1"><span class="text-primary">{{rowDataHeaderAndSummarySlots.summary.summarySelectedChildren}} Children </span></span>
                                </div>

                                <div class="col-lg-5">
                                    <span class="mx-1"> <span class="text-muted">Departure: {{rowDataHeaderAndSummarySlots.depStartDate}} - {{rowDataHeaderAndSummarySlots.depEndDate}}</span>  </span>
                                </div>
                                <div class="col-lg-3">
                                    <span class="badge badge-primary" style="background-color: #dea30f !important">Hold</span>
                                </div>
                          </div>


                        <!-- <span class="mx-1"><b>Cruise Info:</b> <span class="text-muted">{{rowDataHeaderAndSummarySlots.cruName}}</span> | </span>
                        <span class="mx-1"><b>Departure:</b> <span class="text-muted">{{rowDataHeaderAndSummarySlots.depStartDate}} - {{rowDataHeaderAndSummarySlots.depEndDate}}</span> | </span>
                        <span class="mx-1"><b>Itinerary: </b> <span class="text-muted">{{rowDataHeaderAndSummarySlots.itiName}}</span> | </span><br>
                        <span class="text-primary mx-1">{{rowDataHeaderAndSummarySlots.itiNights}} Nights </span>|
                        <span class="mx-1"><span class="text-info">{{rowDataHeaderAndSummarySlots.summary.summarySelectedChildren}} Children </span></span> -->

                        <!-- <br><b>DepId:</b> {{item.depId}} -->
                        <hr>
                        <b-row >
                          <!-- <pre>{{rowDataHeaderAndSummarySlots}}</pre> -->

                          <!-- INFORMACION DE SLOTS -->
                              <b-row class="m-1 w-100">
                                <b-colxx md="4">
                                  <b>Number of pax:</b> <span class="text-muted">{{getRowDataChoosenByDepId(rowDataHeaderAndSummarySlots.depId).length}}</span>
                                </b-colxx>
                                <b-colxx md="8">
                                  <b>Lower:</b>   <span class="text-muted">{{getRowDataChoosenByDepId(rowDataHeaderAndSummarySlots.depId).filter((p) => p.cabName ==="Lower" ).length}}</span> |
                                  <b>Twin:</b>    <span class="text-muted">{{getRowDataChoosenByDepId(rowDataHeaderAndSummarySlots.depId).filter((p) => p.cabName ==="Twin").length}}</span> |
                                  <b>Triple:</b>  <span class="text-muted">{{getRowDataChoosenByDepId(rowDataHeaderAndSummarySlots.depId).filter((p) => p.cabName ==="Triple").length}}</span> |
                                  <b>Double:</b>  <span class="text-muted">{{getRowDataChoosenByDepId(rowDataHeaderAndSummarySlots.depId).filter((p) => p.cabName ==="Double").length}}</span> |
                                  <b>Suite:</b>   <span class="text-muted">{{getRowDataChoosenByDepId(rowDataHeaderAndSummarySlots.depId).filter((p) => p.cabName ==="Suite Family").length}}</span> |
                                </b-colxx>
                              </b-row>
                          <!-- FIN INFORMACION DE SLOTS -->

                          <!-- SUMMARY -->
                            <div class="row mt-3 w-100" v-if="rowDataHeaderAndSummarySlots.summary" >
                              <div class="col-lg-4 text-right">
                                <div class="col-lg-12 mb-2"><small class="text-white">-</small></div>
                                <div class="col-lg-12"><span class="font-weight-bold text-primary">Subtotal Rate:</span> </div>
                                <!-- <div class="col-lg-12" v-if="item.summary.summaryCustomDiscountNet && item.summary.summaryCustomDiscountGross"><small class="font-weight-bold">Discounts</small></div>-->
                                <div class="col-lg-12" v-if="rowDataHeaderAndSummarySlots.summary.summaryIVAGrossRate"><span class="font-weight-bold text-primary">IVA (12%)</span></div>
                                <div class="col-lg-12" v-if="rowDataHeaderAndSummarySlots.summary.summaryDiscountChildrenGross && rowDataHeaderAndSummarySlots.summary.summaryDiscountChildrenNet"><span class="font-weight-bold text-primary">Discount children</span></div> 
                                <div class="col-lg-12"><span class="font-weight-bold text-primary">Total:</span></div>
                              </div>
                              <div class="col-lg-4 ">
                                <div class="col-lg-12 mb-2"><span class="font-weight-bold">GROSS RATE</span></div>
                                <div class="col-lg-12"><span class="text-muted"> USD {{rowDataHeaderAndSummarySlots.summary.summarySubtotalGrossRate}}</span></div>
                                <!-- <div class="col-lg-12" v-if="item.summary.summaryCustomDiscountGross">USD {{item.summary.summaryCustomDiscountGross }}</div>-->
                                <div class="col-lg-12" v-if="rowDataHeaderAndSummarySlots.summary.summaryIVAGrossRate">USD {{parseFloat(rowDataHeaderAndSummarySlots.summary.summaryIVAGrossRate).toFixed(2)}}</div>
                                <div class="col-lg-12" v-if="rowDataHeaderAndSummarySlots.summary.summaryDiscountChildrenGross">USD {{ parseFloat(rowDataHeaderAndSummarySlots.summary.summaryDiscountChildrenGross).toFixed(2)}}</div> 
                                <div class="col-lg-12 font-weight-bold"><span>USD {{rowDataHeaderAndSummarySlots.summary.summaryTotalGrossRate}}</span></div>
                              </div>
                              <div class="col-lg-4 ">
                                <div class="col-lg-12  mb-2"><span class="font-weight-bold">NET RATE</span></div>
                                <div class="col-lg-12"><span class="text-muted"> USD {{ parseFloat(rowDataHeaderAndSummarySlots.summary.summarySubtotalNetRate).toFixed(2)}}</span></div>
                                <!-- <div class="col-lg-12" v-if="item.summary.summaryCustomDiscountNet">USD {{item.summary.summaryCustomDiscountNet}}</div> -->
                                <div class="col-lg-12" v-if="rowDataHeaderAndSummarySlots.summary.summaryIVANetRate"> USD {{ parseFloat(rowDataHeaderAndSummarySlots.summary.summaryIVANetRate).toFixed(2) }}</div>
                                <div class="col-lg-12" v-if="rowDataHeaderAndSummarySlots.summary.summaryDiscountChildrenNet">USD {{ parseFloat(rowDataHeaderAndSummarySlots.summary.summaryDiscountChildrenNet).toFixed(2)}}</div>
                                <div class="col-lg-12 font-weight-bold"><span>USD {{rowDataHeaderAndSummarySlots.summary.summaryTotalNetRate}}</span></div>
                              </div>
                            </div>
                          <!-- FIN SUMMARY -->

                        </b-row>
                      </b-colxx>
                      <hr>
                  </b-row>

              <!-- </div> -->
              
          </b-container>
      </div>
    </div>
</template>

<script>
/* *** SERVICES *** */

import AvailabilityServices from "../../../../../services/gps/availability/availabilityServices.js";

export default {
  name: "modalrates",
  props: ["depId"],
  data() {
    return {
      isSaveHold:"",
    };
  },
  filters: {},
  computed: {
    allRowDataChoosen: {
      get() {return this.$store.getters.getAllRowDataChoosen },
    },
    rowDataHeaderAndSummarySlots: {
      // get() {return this.$store.getters.getRowDataHeaderAndSummarySlotsByDepId(this.depId) },
      get() {return this.$store.getters.getRowDataHeaderAndSummarySlots },
    },
    rowDataChoosenByDepId: {
      get() {return this.$store.getters.getRowDataChoosen(this.depId) },
    },
    isSaveHold2: {
      get() { return this.$store.getters.isSaveHold },
    },
  },
  methods: {
    getRowDataChoosenByDepId(depId) {
      var dataFiltered = this.allRowDataChoosen.filter((p) => p.depId == depId);
      return dataFiltered;
    }
  },
  mounted() {
    this.isSaveHold = this.$store.state.slots.isSaveHold;
  },
};
</script>

<style scoped>
.modal .modal-header, .modal .modal-body, .modal .modal-footer {
    padding: 0 !important;
}
</style>
