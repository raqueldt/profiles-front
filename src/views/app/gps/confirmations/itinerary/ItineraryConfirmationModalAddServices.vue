/* Componente :
- Agregar servicios a confirmacion
 */
<template>
  <div class="mb-1">
    <div class="p-2">
      <b-row class="filters-card pl-0">
        <b-colxx xs="">
          <div class="d-flex flex-row align-items-center mb-3">
            <router-link to="#">
              <i :class="`large-icon initial-height iconsminds-male`"></i>
              <small> {{ infoConfirmacion.cofTitulo }} </small>
            </router-link>
          </div>
        </b-colxx>
        <b-colxx>
          <!-- getSelectedConfirmacionFechaInicio{{getSelectedConfirmacionFechaInicio}} -->
          <div class="d-flex flex-row mb-3">
            <div
              style="cursor: pointer"
              @click="changeEditPeriod"
              class="pl-3 pt-2 pb-2"
            >
              <formated-dates
                :startDate="infoConfirmacion.cofInicio"
                :endDate="infoConfirmacion.cofFinal"
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
                >You can change the period of confirmation
              </label>
              <br />
              <label for="datepicker-dateformat1">{{
                $t("dashboards.start-date-confirmation")
              }}</label>
              <b-form-datepicker
                id="datepicker-dateformat1"
                :date-format-options="{
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  weekday: 'short',
                }"
                locale="en"
                v-model="infoConfirmacion.cofInicio"
                :min="min"
                :max="infoConfirmacion.cofInicio"
              >
              </b-form-datepicker>

              <label class="mt-3" for="datepicker-dateformat2">{{
                $t("dashboards.end-date-confirmation")
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
                v-model="infoConfirmacion.cofFinal"
                :min="infoConfirmacion.cofFinal"
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
          </div>
        </b-colxx>
      </b-row>

      <b-row class="filters-card pl-0">
        <b-colxx xs="">
          <!-- DATE-->
          <!-- {{infoConfirmacion}} -->
          <!-- {{currentDateTime}} -->
          <b-form-datepicker
            v-model="cfdFechaInicio"
            class="mb-2"
            locale="en"
            :min="infoConfirmacion.cofInicio"
            :max="infoConfirmacion.cofFinal"
            required
          ></b-form-datepicker>
        </b-colxx>
      </b-row>
      <br />
      <!-- ORDER -->
      <b-row class="filters-card pl-0">
        <!-- <b-colxx md="4">
          <label class="form-group has-float-label">
            <input
              disabled
              type="number"
              v-model="cfdOrden"
              class="form-control"
              minlength="1"
              maxlength="2"
              onKeyPress="if(this.value.length==2) return false;"
              min="0"
              @keypress="onlyNumber"
            />
            <span> {{ $t("gps.order") }}</span>
          </label>
        </b-colxx> -->

        <!-- Group -->

        <b-colxx xs="12" style="justify-content: center">
          <span>{{ $t("gps.pax.group") }} </span
          ><span style="color: red">*</span>
          <b-form-group>
            <b-form-checkbox
              v-for="option in dataGrupos"
              v-model="grupos"
              :key="option.lpaGrupo"
              :value="option"
              name="flavour-4a"
              inline
            >
              {{ option.lpaGrupo }}
            </b-form-checkbox>
          </b-form-group>
        </b-colxx>
        <!--   {{grupos}} -->

        <!-- NUM PAX -->
        <b-colxx md="6">
          <label class="form-group has-float-label">
            <input
              type="number"
              v-model="cfdPax"
              class="form-control"
              minlength="1"
              maxlength="2"
              @keypress="onlyNumber"
              required
            />
            <span
              >{{ $t("gps.num-pax") }} <span style="color: red">*</span>
            </span>
          </label>
        </b-colxx>
        <b-colxx md="6">
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
      <br />
      <!-- EXTRA DISCOUNT -->
      <!--     <b-row class="filters-card pl-0">
        <b-colxx md="6">
          <label class="form-group has-float-label">
            <input
              type="number"
              v-model="cfdDescuentoExtra"
              class="form-control"
              minlength="1"
              maxlength="3"
              onKeyPress="if(this.value.length==4) return false;"
              min=0
              @keypress="onlyNumber"
              required
            />
            <span> {{ $t("gps.extra-discount") }}</span>
          </label>
        </b-colxx>
 -->
      <!-- CHILDREN DISCOUNT-->

      <!--       <b-colxx md="6">
          <label class="form-group has-float-label">
            <input
              type="number"
              v-model="cfdDescuentoNinos"
              class="form-control"
              minlength="1"
              maxlength="3"
              onKeyPress="if(this.value.length==4) return false;"
              min=0
              @keypress="onlyNumber"
            />
            <span>{{ $t("gps.children-discount") }}</span>
          </label>
        </b-colxx>
      </b-row>
      <br /> -->
      <!-- SEARCH SERVICES -->
      <b-row class="filters-card pl-0">
        <b-colxx md="12">
          <label class="form-group has-float-label">
            <v-select
              label="CampoBusqueda"
              v-model="productosSelected"
              :options="dataservicios"
              required
            ></v-select>
            <span
              >{{ $t("gps.search-services") }}
              <span style="color: red">*</span></span
            >
          </label>
        </b-colxx>
      </b-row>

      <br />
      <!-- MENSAJES DE ERROR  -->

      <div class="w-100 mt-2 rounded" v-if="!checkPropertiesInErrorMessages">
        <!-- {{formValidationsMessage.discountsMoreThanTotal}} -->
        <div
          v-for="(messageValidation, index) in formValidationsMessage"
          :key="index"
        >
          <ul class="list-group list-group-flush" style="text-align: center">
            <li class="list-group-item list-group-item-danger">
              <medium>{{ messageValidation }}</medium>
            </li>
          </ul>
        </div>
      </div>
      <!-- FIN MENSAJES DE ERROR  -->
      <br />
      <!-- mensaje de numeros negativos -->
      <div
        v-if="
          cfdPax <= 0 
          && grupos.length>0
        "
        class="alert alert-warning"
        style="text-align: center"
      >
        {{ $t("Please enter a valid value, not negative") }}
      </div>
      <!-- TABLE -->
      <div>
        <table
          v-if="
            Object.entries(productosSelected).length &&
            cfdPax &&
            grupos.length > 0 &&
            cfdFechaInicio
          "
          class="table"
        >
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
              <td>{{ productosSelected.prdDetalle }}</td>
              <td>
                {{ cfdPax }}
              </td>
              <td>
                {{ productosSelected.tarVenta }}
              </td>

              <td>
                {{ totalVenta.toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="text-center">
     <b-button   @click="addConfirmacionDetalle()"  :disabled="validationForm"
        v-if="
          Object.entries(productosSelected).length &&
          grupos.length > 0 &&
          cfdFechaInicio &&
          cfdDescuentoExtra >= 0 &&
          cfdPax > 0 &&
          cfdDescuentoNinos >= 0 &&
          cfdOrden >= 0
        " variant="primary" >{{ $t("gps.add") }}</b-button>
    </div>
  </div>
</template>

<script>
import ProductosServices from "../../../../../services/gps/productos/ProductosServices.js";
import ConfirmacionServices from "../../../../../services/gps/confirmacion/ConfirmacionServices.js";
import vSelect from "vue-select";
import moment from "moment";
import "vue-select/dist/vue-select.css";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    "v-select": vSelect,
  },

  props: ["cofId"],

  data() {
    /*     const now = new Date()
    const minDate = new Date(today) */
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 15th two months prior
    const minDate = new Date(today);
    return {
      min: minDate,
      grupos: [],
      productosSelected: "",
      cfdFechaInicio: "",
      dataGrupos: [],
      editPeriod: false,

      cfdPax: "",
      cfdOrden: 3,
      dataOrder: [],
      dataservicios: ["*"],
      cfdDescuentoExtra: 0,
      cfdDescuentoNinos: 0,
      confstartdate: "",
      confenddate: "",
      infoConfirmacion: "",
      totalDesc: "",
      loggedUserId: "",
      loggedUserName: "",

      sum: "",
      formValidationsMessage: {
        discountsMoreThanTotal: "",
        paxMoreThanTotal: "",
      },

      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD HH:mm", // Uses 'iso' if missing
      },
    };
  },

  methods: {
    ...mapMutations("confirmacion", ["setChangeHeaderConfirmation"]),
    ...mapActions("confirmacion", ["getTotalConfirmacionAction"]),
    currentDateTime() {
      return moment().format("MMMM Do YYYY, h:mm:ss a");
    },
    changeEditPeriod() {
      if (!this.editPeriod) this.editPeriod = true;
      else this.editPeriod = false;
    },
    updatePeriodo() {
      let data = {
        cofId: this.cofId,
        cofInicio: this.infoConfirmacion.cofInicio,
        cofFinal: this.infoConfirmacion.cofFinal,
      };

      ConfirmacionServices.updatePeriodo(data)
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
          }
          this.editPeriod = false;
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
    /* API SEARCH */
    getListadeProductos() {
      ProductosServices.getProductos()
        .then((response) => {
          this.dataservicios = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /* post */

    addConfirmacionDetalle() {
      let data = {
        cfdOrden: this.cfdOrden,
        cfdFechaInicio: this.cfdFechaInicio,
        cfdPax: this.cfdPax,
        cfdDescuentoExtra: this.cfdDescuentoExtra,
        cfdDescuentoNinos: this.cfdDescuentoNinos,
        productosSelected: this.productosSelected,
        grupos: this.grupos,
        cofId: this.cofId,
        loggedUserId: this.loggedUserId,
        loggedUserName: this.loggedUserName,
      };

      ConfirmacionServices.addConfirmacionDetalle(data)
        .then((response) => {
          let mensaje = response.data;
          if (mensaje.data == 200) {
            this.showSuccessMessage();
            this.$emit("updatedService");
            this.setChangeHeaderConfirmation(1);

            // Ejecuto action totalConfirmacion para actualizar valor total en Cabecera
            this.getTotalConfirmacionAction(this.cofId);
          } else {
            var type = "error filled";
            var title = "Iva";
            var message = "No update";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
          }
          this.setChangeHeaderConfirmation(1);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },

    clearFields() {
      this.productosSelected = {};
      this.cfdPax = 1;
      //  this.cfdFechaInicio = "";
      this.cfdDescuentoExtra = 0;
      this.cfdDescuentoNinos = 0;
      this.grupos = [];
      this.cfdOrden = 0;
    },

    showSuccessMessage() {
      var type = "success filled";
      var title = "Service";
      var message = "Service added successfully";
      this.$notify(type, title, message, {
        duration: 3500,
        permanent: false,
      });
      this.clearFields();
    },

    /* API GROPUP */
    getListadeGrupos() {
      ConfirmacionServices.getGrupos(this.cofId)
        .then((response) => {
          this.dataGrupos = response.data.data;
          //     this.grupos= this.dataGrupos[0];
          /* console.log(this.dataGrupos); */
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /* VALIDACIONES DATE */

    /* DATE */
    getInfoConfirmacion() {
      ConfirmacionServices.getInfoConfirmacion(this.cofId)

        .then((response) => {
          this.infoConfirmacion = response.data.data;
          this.infoConfirmacion = this.infoConfirmacion.shift();
          this.cfdPax = this.infoConfirmacion.pax;

          //Fecha de inicio desde store
          // this.cfdFechaInicio= this.infoConfirmacion.cofInicio;
          this.cfdFechaInicio = this.getSelectedConfirmacionFechaInicio
            ? this.getSelectedConfirmacionFechaInicio
            : this.infoConfirmacion.cofInicio;
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },

    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
  },

  watch: {
    $loggedUserId() {
      if (Boolean(this.$loggedUserId)) this.loggedUserId = this.$loggedUserId;
    },
    $loggedUserName() {
      if (Boolean(this.$loggedUserName))
        this.loggedUserName = this.$loggedUserName;
    },
    grupos() {
      function sumar(total, valor) {
        return total + valor;
      }
      this.sum = this.grupos
        .map((item) => Number(item.count_group))
        .reduce(sumar, 0);
      this.cfdPax = this.sum;
    },

    cfdPax() {
      if (this.cfdPax > this.sum) this.cfdPax = 0;
    },
  },
  /* VALIDACION DE LOS DESCUENTOS NO SEAN MAYORES AL TOTAL */
  async mounted() {
    await this.getListadeProductos();
    await this.getListadeGrupos();
    await this.getInfoConfirmacion();
  },

  computed: {
    ...mapGetters("confirmacion", [
      "getChangeHeaderConfirmation",
      "getSelectedConfirmacionFechaInicio",
    ]),
    checkPropertiesInErrorMessages: function () {
      // ==> Determino si existe dentro del objeto formValidationsMessage alguna propiedad llena
      return Object.values(this.formValidationsMessage).every(
        (x) => x === null || x === ""
      );
    },

    validationForm: function () {
      // ==> Validador principal de formulario
      // Si es false ==> habilito botón
      // Si es true ==> deshabilito botón
      return this.validationFormTotal;
    },

    subtotalVenta: function () {
      return this.productosSelected.tarVenta * this.cfdPax;
    },

    totalVenta: function () {
      return this.subtotalVenta - this.totalDesc;
    },

    validationFormTotal: function () {
      var subtotalVenta = this.subtotalVenta;
      var descuentosExtra = this.cfdDescuentoExtra ? this.cfdDescuentoExtra : 0;
      var descuentosChild = this.cfdDescuentoNinos ? this.cfdDescuentoNinos : 0;

      let totalDiscounts =
        parseFloat(descuentosExtra) + parseFloat(descuentosChild);
      this.totalDesc = totalDiscounts;

      if (totalDiscounts > subtotalVenta) {
        this.formValidationsMessage.discountsMoreThanTotal = this.$t(
          "gps.discounts-more-than"
        );
        return true;
      } else if (totalDiscounts <= subtotalVenta) {
        this.formValidationsMessage.discountsMoreThanTotal = "";
        return false;
      }
    },

    /*    validatePax: function () {
      let totalPax = (this.totalDesc = totalPax);

      if (cfdPax > infoConfirmacion.pax) {
        this.formValidationsMessage.paxMoreThanTotal = this.$t("block-slots");
        return true;
      } else if (totalPax) {
        this.formValidationsMessage.paxMoreThanTotal = "";
        return false;
      }
    }, */
    /*     validatePax() {
    
    }, */
  },
};
</script>