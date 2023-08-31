<template>
  <div>
    <!-- 
{{detallecotizacion}} --><!-- {{serviceselected}} -->
    <b-colxx lg="12" class="pl-0 pr-0">
      <b-row>
        <b-colxx lg="4" class="border-right">
          <b-row>
            <b-form class="ml-3 mb-2">
              <b-input-group label-size="xs" class="mt-2">
                <b-input-group prepend="Date" size="xs">
                  <b-form-datepicker
                    :disabled="serviceselected.bokId > 0"
                    id="datepicker-sm"
                    size="sm"
                    class="h-100"
                    locale="en"
                    v-model="serviceselected.codFechaInicio"
                    :min="detallecotizacion['cotDesde']"
                    :max="detallecotizacion['cotHasta']"
                  ></b-form-datepicker>
                </b-input-group>
              </b-input-group>
            </b-form>
      <!--       <b-form class="ml-3">
              <b-input-group label-size="xs" class="mt-2">
                <b-input-group prepend="Order" size="xs">
                  <b-form-input
                    type="number"
                    class="gr-title number"
                    value="0"
                    v-model="serviceselected.codOrden"
                    @keypress="onlyNumber"
                    min="0"
                  />
                </b-input-group>
              </b-input-group>
            </b-form> -->
          </b-row>
          <b-row>
            <b-form class="ml-3">
              <b-input-group label-size="xs" class="mt-1">
                <b-input-group prepend="Service" size="xs">
                  <b-form-input
                    style="width: 16.2rem"
                    v-if="!serviceselected.codDetalle"
                    type="text"
                    class="gr-title"
                    :placeholder="serviceselected.codConcepto"
                    v-model="serviceselected.codConcepto"
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
          </b-row>
             <b-row>
            <b-form class="ml-3">
              <b-input-group label-size="xs" class="mt-1">
                <b-input-group prepend="Supplier" size="xs">
             <!--      {{serviceselected.provider}} -->
                  <b-form-input
                  disabled
                    style="width: 16.2rem"
                    type="text"
                    class="gr-title"
                    v-model="serviceselected.provider"
                  />
           
                </b-input-group>
              </b-input-group>
            </b-form>
          </b-row>
        </b-colxx>

        <b-colxx lg="4" class="border-right">
          <b-row>           
            <b-form class="ml-3">
              <b-input-group label-size="xs" class="mt-2">
                <b-input-group prepend="Unit price" class="mb-1" size="xs">
                  <b-form-input
                    type="text"
                    class="gr-title number"
                    value="150"
                    style="width: 100px"
                    v-model="serviceselected.codPrecioUnitarioTotal"
                    @keypress="onlyNumber"
                  />
                </b-input-group>
              </b-input-group>
            </b-form>

            <b-form class="ml-3">
              <b-input-group label-size="xs" class="mt-2">
                <b-input-group prepend="Total price" class="mb-3" size="xs">
                  <b-form-input
                    type="text"
                    class="gr-title number"
                    style="width: 100px"
                    :value="serviceselected.subTotal | currency"
                    disabled
                  />
                </b-input-group>
              </b-input-group>
            </b-form>

            <div class="d-flex">
              <b-form>
                <small v-if="validate_inputs == false">
                  Please enter a valid value</small
                >
                <b-tooltip target="change-pp" title="Unit Price"></b-tooltip>
              </b-form>
            </div>

            <!-- ----------------------------------------------------------------- -->
          </b-row>
          <b-row>
             <b-form class="ml-3">
              <b-input-group label-size="xs" class="mt-0">
                <b-input-group prepend="Quantity" class="mb-3" size="sm">
                  <b-form-input
                    :disabled="serviceselected.bokId > 0"
                    type="number"
                    class="gr-title number"
                    min="1"
                    value="150"
                    v-model="serviceselected.codCantidad"
                    @keypress="onlyNumber"
                  />
                </b-input-group>
              </b-input-group>
            </b-form>

          </b-row>
        </b-colxx>

        <b-colxx lg="3" class="border-right">
          <b-form>
            <b-form-group label-size="xs" >
              <div class="d-flex text-area">
                <b-form-textarea
                  id="textarea"
                  :placeholder="$t('gps.add-notes')"
                  rows="1"
                  max-rows="2"
                  v-model="serviceselected.codNota"
                ></b-form-textarea>
              </div>
            </b-form-group>
          </b-form>
        </b-colxx>
        

        <b-colxx lg="1" class="row align-items-center ">
          <!-- <b-button
            block
            v-if="serviceselected.bokId && detallecotizacion.cotEstado == 1"
            disabled
            variant="primary default"
            class="float-right ml-2"
            size="sm"
            >{{ $t("gps.edit-booking") }}</b-button
          >
          <b-button
            block
            v-if="serviceselected.bokId && detallecotizacion.cotEstado == 1"
            variant="primary default"
            class="float-right ml-2"
            size="sm"
            >{{ $t("gps.edit-booking") }}</b-button
          > -->
          <b-button
            block
            :disabled="
              detallecotizacion.cotEstado != 1 ||
                total_discounts == false ||
                validate_inputs == false
            "
            @click="updatecotizaciondetalles(serviceselected)"
            variant="primary default"
            class="float-right ml-2"
            size="sm"
            >Save</b-button
          >
          <b-button
            block
            v-if="detallecotizacion.cotEstado == 1 && !serviceselected.bokId"
            variant="danger default"
            class="float-right ml-2"
            size="sm"
            @click="deleteservice(serviceselected.codId)"
            >Delete</b-button
          >
         

              <b-button
            block
            v-if="detallecotizacion.cotEstado == 1 && !serviceselected.bokId"
            variant="secondary default"
            class="float-right ml-2"
            size="sm"
            @click="closeaction"
            >Close</b-button
          >
        </b-colxx>

        <!--b-colxx lg="2">
                              
                            </b-colxx-->
      </b-row>
    </b-colxx>
    <div v-if="total_discounts == false" class="alert alert-danger w-100">
      <i class="glyph-icon simple-icon-people"></i>
      Discount exceed value of service
    </div>
  </div>
</template>

<script>
/* *** SERVICES *** */
import { mapGetters, mapMutations, mapActions } from "vuex";
import CotizacionDetalleServices from "../../../../../services/gps/cotizaciondetalle/CotizacionDetalleServices.js";
export default {
  props: ["serviceselected", "detallecotizacion"],

  data() {
    return {};
  },
    watch: {

      'serviceselected.codCantidad' : function (newYear, oldYear) {

         this.serviceselected.subTotal = this.serviceselected.codCantidad * this.serviceselected.codPrecioUnitarioTotal;
 
      },

'serviceselected.codPrecioUnitarioTotal' : function (newYear, oldYear) {

         this.serviceselected.subTotal = this.serviceselected.codCantidad * this.serviceselected.codPrecioUnitarioTotal;
 
      },
      

      },

  computed: {
    total_discounts: function() {
      //console.log(this.productosSelected.tarVenta + "valor unitario");
      let totalventa = this.serviceselected.subTotal;
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
    ...mapActions("cotizacion", ["getTotalCotizacionAction"]),

    closeaction(){
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
    deleteservice(id) {
      this.$swal({
        title: "Delete service",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#ED7117",
        reverseButtons: true
      }).then(result => {
        if (result.isConfirmed) {
          CotizacionDetalleServices.deleteservice(id)
            .then(response => {
              let mensaje = response.data.data;
              if (mensaje == 200) {
                var type = "warning";
                var title = "Service Deleted";
                var message = "Deleted";
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false
                });
                this.$emit("updateinfoservice");
              } else {
                var type = "error filled";
                var title = "Detail";
                var message = "No delete";
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
      });
    },
    updatecotizaciondetalles(detailservice) {
      let data = {
        codId: detailservice.codId,
        codFechaInicio: detailservice.codFechaInicio,
        codFechaFin: detailservice.codFechaInicio,
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


            // Ejecuto action totalConfirmacion para actualizar valor total en Cabecera           
            if(Boolean(this.detallecotizacion)){
                var cotId = this.detallecotizacion.cotId;
                this.getTotalCotizacionAction(cotId)
            }

          if (mensaje.data == 200) {
            var type = "success filled";
            var title = "Detail ";
            var message = "Updated";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false
            });
            this.$emit("updateinfoservice");
          }
        })
        .catch(error => {
          if (error.response) {
            // console.log(error.response.data.data);
            let msj = error.response.data.data;
            var type = "info";
            var title = "No update";
            var message = msj;
            {
              this.$notify(type, title, message, {
                duration: 3000,
                permanent: false
              });
            }
          }
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