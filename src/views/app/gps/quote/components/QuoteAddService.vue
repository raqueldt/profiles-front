/* Componente :
- Agregar servicios a cotizacion */
<!-- ********************* FORMULARIO PARA AÑADIR SERVICIOS A COTIZACION VALIDO********************* -->

<template>
  <div class="mb-3">
    <div class="p-2">
      <b-row class="filters-card pl-0">
        <b-colxx xs="">
          <div class="d-flex flex-row align-items-center mb-3">
         
            <i :class="`large-icon initial-height iconsminds-male`"></i>
            <small>{{ infoquote.cotReferencia }} </small>
          </div>
        </b-colxx>
        <b-colxx>
          <div class="d-flex flex-row mb-3">
            <div
              style="cursor: pointer"
              @click="changeEditPeriod"
              class="pl-3 pt-2 pb-2"
            >
              <formated-dates
                :startDate="infoquote.cotDesde"
                :endDate="infoquote.cotHasta"
              >
              </formated-dates>
            </div>
          </div>
        </b-colxx>
      </b-row>

      <b-row v-if="editPeriod">
        <b-colxx>
          <div class="mb-3">
            <div>
              <label class="text-center" style="float: center" for=""
                >You can change the period of this quote
              </label>
              <br />

              <label for="datepicker-dateformat1">{{
                $t("dashboards.start-date-quote")
              }}</label>
              <br />
              <b-form-datepicker
                id="datepicker-dateformat1"
                :date-format-options="{
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  weekday: 'short',
                }"
                locale="en"
                v-model="infoquote.cotDesde"
                :min="min"
                :max="infoquote.cotDesde"
              >
              </b-form-datepicker>

              <label class="mt-3" for="datepicker-dateformat2">{{
                $t("dashboards.end-date-quote")
              }}</label>
              <b-form-datepicker
                id="datepicker-dateformat2"
                :date-format-options="{
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  weekday: 'short',
                }"
                locale="en"
                v-model="infoquote.cotHasta"
                :min="infoquote.cotHasta"
              >
              </b-form-datepicker>
              <b-row style="justify-content: center">
                <b-button
                  variant="primary"
                  size="md"
                  class="float-right mt-2"
                  @click="updatePeriodo"
                >
                  Save</b-button
                >

                <b-button
                  variant="secondary"
                  size="md"
                  class="float-right mt-2"
                  @click="changeEditPeriod"
                >
                  Close</b-button
                >
              </b-row>
            </div>
          </div> </b-colxx
        ><!-- 
        Seccion para agregar servicios -->
      </b-row>

      <div v-if="!editPeriod">
        <b-row class="filters-card pl-0">
          <b-colxx xs="">
            <!-- DATE-->

            <b-form-datepicker
              v-model="dateSelected"
              :min="cotstartdate"
              class="mb-2"
              :max="cotenddate"
              locale="en"
            ></b-form-datepicker>
          </b-colxx>
        </b-row>

        <!-- ORDER -->
        <b-row class="filters-card pl-0">
          <!--     <b-colxx md="4">
          <label class="form-group has-float-label">
            <input
              disabled
              type="number"
              v-model="order"
              class="form-control"
              minlength="1"
              maxlength="2"
              onKeyPress="if(this.value.length==2) return false;"
              min="0"
              @keypress="onlyNumber"
              v-on:keyup.enter="addCotizacionDetalle"
            />
            <span>Order </span>
          </label>
        </b-colxx> -->

          <!-- NUM PAX -->
          <b-colxx md="4">
            <label class="form-group has-float-label">
              <input
                type="number"
                v-model="numPax"
                class="form-control"
                minlength="1"
                maxlength="2"
                min="1"
                @keypress="onlyNumber"
                v-on:keyup.enter="addCotizacionDetalle"
              />
              <span>Num pax</span>
            </label>
          </b-colxx>
          <!-- NUM NETA RATE -->
          <b-colxx md="4">
            <label class="form-group has-float-label">
              <input
                :disabled="!productosSelected"
                type="number"
                v-model="productosSelected.tarVenta"
                class="form-control"
                minlength="1"
                min="1"
              />
              <span>Rate</span>
            </label>
          </b-colxx>
        </b-row>

        <!-- SEARCH SERVICES -->
        <b-row class="filters-card pl-0">
          <b-colxx xs="">
            <div class="form-group has-float-label">
              <span>{{ $t("gps.search-services") }}</span>

              <v-select
                label="CampoBusqueda"
                v-model="productosSelected"
                :options="productos"
              >
              </v-select>
            </div>
          </b-colxx>
        </b-row>

        <b-row
          v-if="numPax > 0 && productosSelected && dateSelected"
          class="pt-1 pb-1"
        >
          <table class="table">
            <thead class="thead-light">
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Provider</th>
                <th scope="col">Pax</th>
                <th scope="col">PV</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{{ productosSelected.CampoBusqueda }}</th>
                <!-- <td>{{ productosSelected.proNombre }}</td>
               -->
                <td>{{ productosSelected.prdDetalle }}</td>

                <td>{{ numPax }}</td>
                <td>{{ productosSelected.tarVenta | currency }}</td>

                <!-- {{productosSelected}} -->
                <td>
                  {{ (productosSelected.tarVenta * numPax) | currency }}
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Mensaje de alerta de NumPax -->
          <div v-if="numPax > copPaxHasta" class="alert alert-danger w-100">
            <i class="glyph-icon simple-icon-people"></i> Number of passengers
            is greater than the booking ({{ copPaxHasta }}
            )
          </div>
          <div v-if="total_discounts == false" class="alert alert-danger w-100">
            <i class="glyph-icon simple-icon-people"></i> Discount exceed value
            of service
          </div>
          <!-- Mensaje de alerta de NumPax -->
        </b-row>
        <!-- {{productosSelected}} -->
        <br />
        <b-row style="justify-content: center">
          <b-button
            size="md"
            v-if="
              numPax > 0 &&
              productosSelected &&
              dateSelected &&
              total_discounts == true
            "
            data-toggle="tooltip"
            data-placement="top"
            type="submit"
            variant="primary "
            class="mr-1"
            @click="addCotizacionDetalle()"
          >
            <!-- :disabled="cfnNota.length <= 0" -->

            {{ $t("gps.pax.save-button") }}
          </b-button>

          <!-- <b-button  @click="updatePeriodo" variant="success" class="mr-1">{{ $t('gps.pax.save-button') }}</b-button>
 -->

          <b-button v-else disabled class="mr-1" variant="primary">
            {{ $t("gps.pax.save-button") }}</b-button
          >
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices.js";
import { mapGetters, mapMutations } from "vuex";
//import { ValidationProvider } from 'vee-validate';
import IconCard from "../../../../../components/Cards/IconCard";
import InputTag from "../../../../../components/Form/InputTag";
import { extend } from "vee-validate";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapActions } from "vuex";
import moment from "moment";
extend("min", (value) => {
  return value >= 3;
});
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
      maxLength: 100,
      minLength: 0,
      errorName: "",
      editPeriod: false,
      dateSelected: "",
      visible: false,
      productosSelected: "",
      numPax: null,
      totalbooking: "",
      infoquote: "",
      cotstartdate: "",
      cotenddate: "",
      copPaxHasta: "",
      order: "3",
      extradiscount: "0",
      discountchildren: "0",
      selectedCot: "",

      totaldiscounts: 0,
    };
  },
  filters: {},
  watch: {
    cotId: function (newVal, oldVal) {
      this.selectedCot = newVal;
      this.getInfoQuotebyAddServices();
      this.dateSelected = "";
      this.productosSelected = "";
      this.order = 0;
      this.extradiscount = 0;
      this.discountchildren = 0;
      this.numPax = 1;
    },
    discountchildren: function (newVal, oldVal) {
      //  console.log(newVal+'newvalor')
      if (!newVal) this.discountchildren = 0;
    },
    extradiscount: function (newVal, oldVal) {
      //  console.log(newVal+'newvalor')
      if (!newVal) this.extradiscount = 0;
    },
  },
  computed: {
    ...mapGetters("cotizacion", [
      "getChangeHeaderQuote",
      "getSelectedCotizacionFechaInicio",
    ]),
    total_discounts: function () {
      //console.log(this.productosSelected.tarVenta + "valor unitario");+
      /*    El maximo de control en descuentos se basa en el total */
      let totalventa = this.productosSelected.tarVenta * this.numPax;
      let total =
        parseFloat(this.extradiscount) + parseFloat(this.discountchildren);
      //  console.log(total + "total descuentos");

      if (total > totalventa) return false;
      if (total <= totalventa) return true;
    },
    productos: {
      get() {
        return this.$store.getters.getProductos;
      },
    },
  },
  methods: {
    ...mapMutations("cotizacion", [
      "setChangeHeaderQuote",
      "setSelectedCotizacionFechaInicio",
    ]),
    ...mapActions("cotizacion", ["getTotalCotizacionAction"]),

    updatePeriodo() {
      let data = {
        cotId: this.cotId,
        cotDesde: this.infoquote.cotDesde,
        cotHasta: this.infoquote.cotHasta,
      };

      CotizacionesServices.updatePeriodo(data)
        .then((response) => {
          let mensaje = response.data;

          if (mensaje.data == 200) {
            var type = "success filled";
            var title = "Period Update";
            var message = "Add";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
            this.setChangeHeaderQuote(1);
            this.getInfoQuotebyAddServicesinit();
            this.editPeriod = false;
          }
        })
        .catch((error) => {
          var type = "error filled";
          var title = "Period";
          var message = "Out of range";
          this.$notify(type, title, message, {
            duration: 3000,
            permanent: false,
          });
        });
    },
    changeEditPeriod() {
      if (!this.editPeriod) this.editPeriod = true;
      else this.editPeriod = false;
    },
    ...mapMutations("cotizacion", ["setChangeHeaderQuote"]),
    clear() {
      this.productosSelected = "";
    },

    getInfoQuotebyAddServices() {
      CotizacionesServices.getInfoQuotebyAddServices(this.selectedCot)
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
    getInfoQuotebyAddServicesinit() {
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

          this.numPax = this.copPaxHasta;

          //this.dateSelected = this.cotstartdate;
          this.dateSelected = this.getSelectedCotizacionFechaInicio
            ? this.getSelectedCotizacionFechaInicio
            : this.cotstartdate;
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
      let data = {
        corId: this.corId,
        copId: this.copId,
        fecha: this.dateSelected,
        productosSelected: this.productosSelected,
        numPax: this.numPax,
        order: this.order,
        codCruceroDescuentoNinos: this.discountchildren,
        codCruceroDescuentoExtra: this.extradiscount,
      };

      this.$store.dispatch("addCotizacionDetalle", data).then((payload) => {
        let response = payload.data;
        if (response == 200) {
          var type = "success filled";
          var title = "Success";
          var mensaje = "Service added successfull";
          this.$emit("updatedetailcot");

          // Cargar a la tienda algun llamado
          this.setChangeHeaderQuote(1);

          // Ejecuto action totalConfirmacion para actualizar valor total en Cabecera
          this.getTotalCotizacionAction(this.cotId);

          this.productosSelected = "";
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
      //   this.clearFields();
    },
  },
  mounted() {
    this.getProductos();
    this.getInfoQuotebyAddServicesinit();
    //   this.getInfoQuotebyAddServices();
  },
};
</script>