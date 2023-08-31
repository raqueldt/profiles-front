<template>
  <div>
    <b-sidebar
      id="sidebar-no-header"
      ref="mySidebar"
      bg-variant="light2"
      aria-labelledby="sidebar-no-header-title"
      class="add-service"
      no-header
      right
      shadow
    >
      <template #default="{ hide }">
        <div class="add-service-header">
          <h4 id="sidebar-no-header-title">
            <i class="glyph-icon iconsminds-receipt-4"></i>
            {{ $t("gps.aditional-services") }}
          </h4>
          <b-button aria-label="Close" class="close" @click="hide">
            <i class="glyph-icon iconsminds-close h6"></i>
          </b-button>
        </div>
        <div class="separator mb-2"></div>
        <div class=" mt-3 mb-3">
          <div class="p-3">
            <span class="text-add-services">
              <!-- {{$t('gps.quote-text-services')}} -->
              Please select a <b>Date</b>, <b>number of pax</b> and search
              <b>Services</b>. Num Pax must be between <b>1</b> and
              <b>{{ copPaxHasta }}</b>
            </span>
          </div>
          <div class="p-4">
            <b-row class="pt-2 pb-2">
              <b-colxx xs="6">
                <label class="form-group has-float-label">
                  <input
                    v-model="dateSelected"
                    type="date"
                    class="form-control"
                    :min="depstartdate"
                    :max="dependdate"
                  />
                  <span>{{ $t("gps.date-services") }}</span>
                </label>
              </b-colxx>
              <b-colxx xs="2"></b-colxx>
              <b-colxx xs="4">
                <label class="form-group has-float-label">
                  <input
                    type="number"
                    v-model="numPax"
                    class="form-control"
                    minlength="1"
                    maxlength="2"
                    onKeyPress="if(this.value.length==2) return false;"
                    min="0"
                    :max="copPaxHasta"
                    @keypress="onlyNumber"
                  />
                  <span>Num pax</span>
                </label>
              </b-colxx>
            </b-row>

            <b-row class="pt-1 pb-1">
              <b-colxx>
                <div class="form-group has-float-label custom-selects">
                  <span>{{ $t("gps.search-services") }}</span>
                  <multiselect
                    v-model="productosSelected"
                    :options="productos"
                    :multiple="true"
                    :searchable="true"
                    :showNoOptions="true"
                    placeholder=""
                    track-by="tarId"
                    label="CampoBusqueda"
                  >
                  </multiselect>
                </div>
              </b-colxx>
            </b-row>

            <b-row class="p0">
              <vue-perfect-scrollbar
                class="scroll services dashboard-list-with-thumbs"
                :settings="{ suppressScrollX: true, wheelPropagation: false }"
              >
                <table class="table bg-white services table-striped">
                  <thead>
                    <tr>
                      <th>Select items</th>
                      <th class="pp text-center">PP</th>
                      <th class="pv text-center">PV</th>
                      <th class="total text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(prod, index) in productosSelected" :key="index">
                      <td>{{ prod.CampoBusqueda }}</td>
                      <td class="pp">
                        {{ prod.tarNeta > 0 ? prod.tarNeta : 0 }}
                      </td>
                      <td class="pv">{{ prod.tarVenta }}</td>
                      <td>{{ prod.tarVentaTotal }}</td>
                    </tr>
                  </tbody>
                </table>
              </vue-perfect-scrollbar>
              <!-- Mensaje de alerta de NumPax -->
              <div
                v-if="numPax > copPaxHasta"
                class="alert alert-warning w-100"
              >
                <i class="glyph-icon simple-icon-people"></i> Num Pax must be
                between 1 and {{ copPaxHasta }}
              </div>
            </b-row>

            <b-row>
              <b-card class="add-buttons">
                <b-button
                  class="mb-1"
                  v-if="
                    numPax > 0 && numPax <= copPaxHasta && productosSelected
                  "
                  variant="primary default"
                  size="xs"
                  @click="addCotizacionDetalle()"
                  >+{{ $t("gps.add") }}</b-button
                >
                <b-button
                  class="mb-1"
                  variant="info default"
                  size="xs"
                  aria-label="Close"
                  @click="hide"
                  >{{ $t("gps.close") }}</b-button
                >
              </b-card>
            </b-row>
          </div>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>
import BookingServices from "../../../../services/gps/booking/BookingServices.js";
import IconCard from "../../../../components/Cards/IconCard";
import InputTag from "../../../../components/Form/InputTag";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapState, mapMutations, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "modalrates",
  props: ["bokId", "corId", "copId", "copPaxHasta", "cotDesde"],
  components: {
    "icon-card": IconCard,
    "input-tag": InputTag,
    "v-select": vSelect
  },
  data() {
    return {
      dateSelected: "",
      productosSelected: "",
      numPax: "",
      totalbooking: "",
      depstartdate: "",
      dependdate: ""
    };
  },
  filters: {},
  watch: {
    numPax: function() {
      this.calculateTotal();
    },
    productosSelected: function() {
      this.calculateTotal();
    }
  },
  computed: {
    productos: {
      get() {
        return this.$store.getters.getProductos;
      }
    }
  },
  methods: {
    getinforslotsbybooking() {
      BookingServices.getinforslotsbybooking(this.bokId)
        .then(response => {
          this.totalbooking = response.data.data;
          this.depstartdate = moment(
            this.totalbooking[0][0]["depStartDate"]
          ).format("YYYY-MM-DD");
          this.dependdate = moment(
            this.totalbooking[0][0]["depEndDate"]
          ).format("YYYY-MM-DD");
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    },
    ...mapActions(["getProductos"]),
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    // calculateTotal(){
    //     var self = this;
    //     if(this.productosSelected.length>0){
    //         this.productosSelected.filter(function(elemento, indice, array) {
    //             if (self.numPax>0) {
    //                 elemento.tarVentaTotal = parseFloat(elemento.tarVenta * self.numPax).toFixed(2);
    //             }
    //         })
    //     }
    // },
    calculateTotal() {
      var self = this;
      this.productosSelected.filter(function(elemento, indice, array) {
        if (self.numPax > 0) {
          elemento.tarVentaTotal = parseFloat(
            elemento.tarVenta * self.numPax
          ).toFixed(2);
        }
      });
    },
    addCotizacionDetalle() {
      var self = this;
      let data = [];
      let bokId = this.bokId;
      let corId = this.corId;
      let copId = this.copId;
      let fecha = this.dateSelected;
      let productosSelected = this.productosSelected;
      let numPax = this.numPax;
      data.push(bokId, corId, copId, fecha, productosSelected, numPax);

      this.$store.dispatch("addCotizacionDetalle", data).then(payload => {
        let response = payload.data;
        if (response == 200) {
          var type = "success filled";
          var title = "Success";
          var mensaje = "Services added successfullys";
          this.$emit("updateQuoteAdmin", 1);
        } else {
          var type = "error filled";
          var title = "Error";
          var mensaje = "Services were no added. Try again";
        }
        this.$notify(type, title, mensaje, {
          duration: 3000,
          permanent: false
        });
        this.$refs.mySidebar.hide();
      });
      this.clearFields();
    },
    clearFields() {
      (this.productosSelected = []), (this.numPax = 0);
    }
  },
  mounted() {
    this.getProductos();
    this.getinforslotsbybooking();
  }
};
</script>
