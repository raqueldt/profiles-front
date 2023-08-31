<template>
  <div>
    <b-row class="filters-card pl-0">
      <b-col lg="9" class="pr-0">
        <div class="form-group has-float-label custom-input mb-0">
          <span>{{ $t("gps.add-services") }}</span>
        </div>
      </b-col>

      <b-col lg="3" class="pl-0">
        <b-button
          v-b-toggle.collapse1
          size="sm"
          id="tool-filters"
          variant="primary default plusfilter"
        >
          <template>
            <i class="glyph-icon iconsminds-filter-2"></i>
          </template>

          <template>
            <i class="glyph-icon simple-icon-equalizer rotate-90"></i>
          </template>
        </b-button>

        <b-collapse id="collapse1" class="custom-fiters">
          <div>
            <b-card-body class="p-2" :title="$t('gps.aditional-services')">
              <b-colxx xxs="12" class="mb-1">
         
                <template #default="{}">
                  <div class="separator mb-2"></div>
                  <div class="mt-3 mb-3">
                    <div class="p-3">
                      <span class="text-add-services">
                        {{ $t("gps.message-services") }}
                      </span>
                    </div>
                    <div class="p-4">
                      <b-row class="pt-2 pb-2">
                        <b-colxx xs="6">
                          <div>
                            <!--    <span>{{ $t("gps.date-services") }}</span> -->
                            <b-form-datepicker
                              v-model="dateSelected"
                              :min="cotstartdate"
                              class="mb-2"
                              :max="cotenddate"
                              locale="en"
                            ></b-form-datepicker>
                          </div>
                        </b-colxx>
                        <b-colxx xs="3">
                          <label class="form-group has-float-label">
                            <input
                              type="number"
                              v-model="order"
                              class="form-control"
                              minlength="1"
                              maxlength="2"
                              onKeyPress="if(this.value.length==2) return false;"
                              min="0"
                              @keypress="onlyNumber"
                            />
                            <span>Order</span>
                          </label>
                        </b-colxx>
                        <b-colxx xs="3">
                          <label class="form-group has-float-label">
                            <input
                              type="number"
                              v-model="numPax"
                              class="form-control"
                              minlength="1"
                              maxlength="2"
                              onKeyPress="if(this.value.length==2) return false;"
                              min="1"
                              @keypress="onlyNumber"
                            />
                            <span>{{ $t("gps.num-pax") }}</span>
                          </label>
                        </b-colxx>
                      </b-row>

                      <b-row class="pt-1 pb-1">
                        <b-colxx>
                          <div
                            class="form-group has-float-label custom-selects"
                          >
                            <span>{{ $t("gps.search-services") }}</span>

                            <v-select
                              label="CampoBusqueda"
                              v-model="productosSelected"
                              :options="productos"
                            >
                            </v-select>
                            <!--        {{productosSelected}} -->
                          </div>
                        </b-colxx>
                      </b-row>

                      <b-row class="pt-1 pb-1">
                        <table
                          v-if="numPax > 0 && productosSelected && dateSelected"
                          class="table bg-white services table-striped"
                        >
                          <thead>
                            <tr>
                              <th>Select Item</th>
                              <th class="pp text-center">PP</th>
                              <th class="pv text-center">PV</th>
                              <th class="total text-center">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{{ productosSelected.CampoBusqueda }}</td>
                              <td class="pp">
                                {{
                                  productosSelected.tarNeta > 0
                                    ? productosSelected.tarNeta
                                    : 0
                                }}
                              </td>
                              <td class="pv">
                                {{ productosSelected.tarVenta }}
                              </td>
                              <td class="pv">
                                {{
                                  (
                                    productosSelected.tarVentaTotal * numPax
                                  ).toFixed(2)
                                }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!-- Mensaje de alerta de NumPax -->
                        <div
                          v-if="numPax > copPaxHasta"
                          class="alert alert-warning w-100"
                        >
                          <i class="glyph-icon simple-icon-people"></i> {{ $t("gps.number-passengers-great") }} ({{
                            copPaxHasta
                          }}
                          )
                        </div>
                        <!-- Mensaje de alerta de NumPax -->
                      </b-row>

                      <b-row>
                        <b-card class="add-buttons">
                          <b-button
                            class="mb-1"
                            v-if="
                              numPax > 0 && productosSelected && dateSelected
                            "
                            variant="primary default"
                            size="xs"
                            @click="addCotizacionDetalle()"
                            >+{{ $t("gps.add") }}</b-button
                          >
                          <b-button
                            class="mb-1"
                            v-else
                            variant="primary default"
                            disabled
                            size="xs"
                            >+{{ $t("gps.add") }}</b-button
                          >

                          <b-button
                            v-b-toggle.collapse1
                            class="mb-1"
                            variant="info default"
                            size="xs"
                            >Close</b-button
                          >
                        </b-card>
                      </b-row>
                    </div>
                  </div>
                </template>
              </b-colxx>
            </b-card-body>
          </div>
        </b-collapse>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices.js";
import IconCard from "../../../../../components/Cards/IconCard";
import InputTag from "../../../../../components/Form/InputTag";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapActions } from "vuex";
import moment from "moment";

export default {
  name: "modalrates",
  props: ["cotId"],
  components: {
    "icon-card": IconCard,
    "input-tag": InputTag,
    "v-select": vSelect,
  },
  data() {
    return {
      dateSelected: "",
      productosSelected: "",
      numPax: "1",
      totalbooking: "",
      infoquote: "",
      cotstartdate: "",
      cotenddate: "",
      copPaxHasta: "",
      order: "0",
    };
  },
  filters: {},

  computed: {
    productos: {
      get() {
        return this.$store.getters.getProductos;
      },
    },
  },
  methods: {
    getInfoQuotebyAddServices() {
      CotizacionesServices.getInfoQuotebyAddServices(this.cotId)
        .then((response) => {
          this.infoquote = response.data.data;
          //  console.log(this.infoquote);

          this.cotstartdate = moment(this.infoquote["cotDesde"]).format(
            "YYYY-MM-DD"
          );
          this.cotenddate = moment(this.infoquote["cotHasta"]).format(
            "YYYY-MM-DD"
          );

          this.copPaxHasta = this.infoquote["copPaxHasta"];
          this.corId = this.infoquote["corId"];
          this.copId = this.infoquote["copId"];
        })
        .catch((error) => {
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

    addCotizacionDetalle() {
      let data = [];
      let corId = this.corId;
      let copId = this.copId;
      let fecha = this.dateSelected;
      let productosSelected = this.productosSelected;
      let numPax = this.numPax;
      let order = this.order;

      data.push(corId, copId, fecha, productosSelected, numPax, order);

      this.$store.dispatch("addCotizacionDetalle", data).then((payload) => {
        let response = payload.data;
        if (response == 200) {
          var type = "success filled";
          var title = "Success";
          var mensaje = "Service added successfull";
          //this.$emit("updateQuoteAdmin", 1);
        } else {
          var type = "error filled";
          var title = "Error";
          var mensaje = "Service were no added. Try again";
        }
        this.$notify(type, title, mensaje, {
          duration: 3000,
          permanent: false,
        });
      });
      this.clearFields();
    },
    clearFields() {
      (this.productosSelected = []),
        (this.numPax = 1)((this.dateSelected = "")((this.order = 0)));
    },
  },
  mounted() {
    this.getProductos();
    this.getInfoQuotebyAddServices();
  },
};
</script>

