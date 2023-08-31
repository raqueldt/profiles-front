<template>
  <div>
    <b-row>
      <!-- date/service section  -->
      <b-col lg="4" md="12" xs="12" cols="12">
        
          <b-form class="ml-1">
            <b-input-group label-size="lg" class="mt-2">
              <b-input-group prepend="Date" size="xs">
                <b-form-datepicker
                  :disabled="serviceselected.bokId > 0"
                  id="datepicker-sm"
                  class="h-100"
                  size="xs"
                  locale="en"
                  v-model="serviceselected.codFechaInicio"
                  :min="detallecotizacion['cotDesde']"
                  :max="detallecotizacion['cotHasta']"
                ></b-form-datepicker>
              </b-input-group>
            </b-input-group>
          </b-form>
        
        
          <b-form class="ml-1">
            <b-input-group label-size="xs" class="mt-1">
              <b-input-group prepend="Service" size="xs">
                <b-form-input
                  style="width: 16.2rem"
                  v-if="!serviceselected.codDetalle"
                  type="text"
                  class="gr-title"
                  :placeholder="serviceselected.codConcepto"
                  @keydown.enter.prevent="
                    updatecotizaciondetalles(serviceselected)
                  "
                  v-model="serviceselected.codConcepto"
                  :readonly="!isEditable"
                />
                <b-form-input
                  v-else
                  style="width: 16.2rem"
                  type="text"
                  class="gr-title"
                  v-model="serviceselected.codDetalle"
                />
              </b-input-group>
            </b-input-group>
          </b-form>
        
      </b-col>

      <!-- price section   -->
      <b-col lg="4" md="12" xs="12" cols="12" class="border-left">
        <b-list-group class="my-2 text-small">
          <b-list-group-item
            class="py-1 d-flex justify-content-between align-items-center"
          >
            Unit price
            <span
              ><strong>{{
                serviceselected.codPrecioUnitarioTotal | number("0,0.00")
              }}</strong></span
            >
          </b-list-group-item>
          <b-list-group-item
            class="py-1 d-flex justify-content-between align-items-center"
          >
            Total price
            <span
              ><strong>{{
                serviceselected.precioTotal | number("0,0.00")
              }}</strong></span
            >
          </b-list-group-item>
          <b-list-group-item
            class="py-1 d-flex justify-content-between align-items-center"
          >
            Children discount
            <span
              ><strong>{{
                serviceselected.codCruceroDescuentoNinos | number("0,0.00")
              }}</strong></span
            >
          </b-list-group-item>
          <b-list-group-item
            class="py-1 d-flex justify-content-between align-items-center"
          >
            Extra discount
            <span
              ><strong>{{
                serviceselected.codCruceroDescuentoExtra | number("0,0.00")
              }}</strong></span
            >
          </b-list-group-item>
        </b-list-group>
      </b-col>

      <!-- note section -->
      <b-col lg="4" md="12" xs="12" cols="12" class="border-left">
        <b-input-group label-size="xs" class="mt-2">
          <b-input-group prepend="" class="w-100" size="xs">
            <b-form-textarea
              id="textarea"
              :placeholder="$t('gps.add-notes')"
              rows="1"
              max-rows="3"
              v-model="serviceselected.codNota"
              :readonly="!isEditable"
            ></b-form-textarea>
          </b-input-group>
        </b-input-group>
      </b-col>
    </b-row>

    <!-- action buttons -->
    <!-- 2023-02-14 | fg | solo disponible en cotizaciones ACTIVAS status = 1 -->
    <b-row v-if="isEditable">
      <b-col class="my-2 ">
        <hr class="mt-0 mb-2" />

        <div class="text-right center-title-mobile" >
          <!-- customize -->
          <!-- <div>

            <service-cruise-customize-rate
              :bokId="cruiseBookingId"
              :cotId="cotizacionId"
              @update="updateServicesDetail"
            />

          </div> -->

          <!-- action buttons -->
          <div >
            <!-- BOTON DE EDICION -->
            <!-- <b-button
            v-if="serviceselected.bokId"
            variant="info"
            size="md"
            @click="
              $router.push({
                name: 'SlotsParentEdit',
                params: {
                  bokId: serviceselected.bokId,
                  depId: serviceselected.depId,
                  clientId: detallecotizacion.clienteId
                }
              })
            "
            >{{ $t("gps.edit-booking") }}</b-button
          > -->

            <!-- <b-button
            v-if="serviceselected.bokId && detallecotizacion.cotEstado == 0"
            disabled
            variant="info"
            class=""
            size="md"
            >{{ $t("gps.edit-booking") }}</b-button 
          >-->
            <!-- FIN BOTON DE EDICION -->

            <b-button
              :disabled="
                detallecotizacion.cotEstado != 1 ||
                  total_discounts == false ||
                  validate_inputs == false
              "
              @click="updatecotizaciondetalles(serviceselected)"
              variant="primary"
            >
              <span class="px-4">Save</span>
            </b-button>

            <b-button variant="secondary" @click="closeaction">
              <span class="px-4">Close</span>
            </b-button>
          </div>
        </div>
      </b-col>
    </b-row>

    <div v-if="total_discounts == false" class="alert alert-danger w-100">
      <i class="glyph-icon simple-icon-people"></i>
      Discount exceed value of service
    </div>
  </div>
</template>

<script>
/* *** SERVICES *** */

import CotizacionDetalleServices from "../../../../../services/gps/cotizaciondetalle/CotizacionDetalleServices.js";

import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "DetailServiceCruise",

  props: ["serviceselected", "detallecotizacion"],

  components: {
    ServiceCruiseCustomizeRate: () =>
      import("@/views/app/gps/quote/DetailItems/ServiceCruiseCustomizeRate")
  },

  data() {
    return {};
  },

  computed: {
    //2023-02-13 | fg | limitar acciones de usuario solo al estado 1(activo)
    isEditable() {
      return this.detallecotizacion?.cotEstado == 1;
    },

    cotizacionId() {
      return this.detallecotizacion?.cotId ?? 0;
    },

    cruiseBookingId() {
      return this.serviceselected?.bokId ?? 0;
    },

    total_discounts: function() {
      //console.log(this.productosSelected.tarVenta + "valor unitario");
      let totalventa = this.serviceselected.precioTotal;
      let total =
        parseFloat(this.serviceselected.codCruceroDescuentoExtra) +
        parseFloat(this.serviceselected.codCruceroDescuentoNinos);
      //  console.log(total + "total descuentos");
      if (total > totalventa) return false;
      if (total <= totalventa) return true;
    },
    validate_inputs: function() {
      //console.log(this.productosSelected.tarVenta + "valor unitario");
      let descuentosextras = this.serviceselected.codCruceroDescuentoExtra;
      let descuentosniños = this.serviceselected.codCruceroDescuentoNinos;
      let cantidad = this.serviceselected.codCantidad;
      let orden = this.serviceselected.codOrden;
      if (!descuentosextras || descuentosextras < 0)
        // return "Please enter a extra discount | miminal 0";
        return false;

      if (!descuentosniños || descuentosniños < 0)
        //return "Please enter a discount children | minimal 0";
        return false;

      if (!cantidad || cantidad < 1)
        //return "Please enter a cantidad | minimal 1";
        return false;

      if (orden < 0)
        //  return "Please enter a order | minimal 0";
        return false;
    },
    productos: {
      get() {
        return this.$store.getters.getProductos;
      }
    }
  },
  methods: {
    ...mapActions("cotizacion", ["loadCotizacionTotales"]),

    updateServicesDetail() {
      this.$emit("updateinfoservice");
    },

    handleEditBooking() {
      this.$router.push({
        name: "SlotsParentEdit",
        params: {
          bokId: serviceselected.bokId,
          depId: serviceselected.depId,
          clientId: detallecotizacion.clienteId
        }
      });
    },

    closeaction() {
      this.$emit("updateinfoservice");
    },

    onlyNumber($event) {
      //console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },

    updatecotizaciondetalles(detailservice) {
      let data = {
        codId: detailservice.codId,
        codFechaInicio: detailservice.codFechaInicio,
        codFechaFin: detailservice.codFechaFin,
        codOrden: detailservice.codOrden,
        codCantidad: detailservice.codCantidad,
        codDetalle: detailservice.codDetalle,
        codPrecioUnitarioTotal: detailservice.codPrecioUnitarioTotal,
        codNota: detailservice.codNota,
        codCruceroDescuentoNinos: detailservice.codCruceroDescuentoNinos,
        codCruceroDescuentoExtra: detailservice.codCruceroDescuentoExtra,
        codConcepto: detailservice.codConcepto
      };
      CotizacionDetalleServices.updatecotizaciondetalles(data)
        .then(response => {
          let mensaje = response.data;
          if (mensaje.data == 200) {
            var type = "success filled";
            var title = "Detail ";
            var message = "Updated";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false
            });
            this.$emit("updateinfoservice");

            // Ejecuto action totalConfirmacion para actualizar valor total en Cabecera
            if (Boolean(this.detallecotizacion)) {
              this.loadCotizacionTotales(this.cotizacionId);
            }
          } else {
            var type = "error filled";
            var title = "Period";
            var message = "No update";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.input-group-text {
  font-size: 11px !important;
}
</style>
