/* Componente :
- Agregar servicios a cotizacion */
<template>

  <div class="custom-addservices">
    <b-collapse id="collapse1" class="content-services" v-model="visible">
    
      <div>
<!-- {{cotId}}  -->
<!--   {{infoquote}}  -->
        <b-card-body class="p-2" :title="$t('gps.aditional-services')+ ' '+'Q '+infoquote.cotCodigo ">
          <b-colxx xxs="12" class="mb-1">
            <template #default="{}">
              <div class="separator mb-2"></div>
              <div class="mt-3 mb-3">
                <div class="p-3">
                  <span class="text-add-services">
                    {{ $t("gps.message-services") }}
                  </span>
            <!--       {{infoquote}} -->

                  <!--  <b-button squared variant="outline-secondary" size="sm"
                    ><i @click="clearFields" class="fas fa-broom"></i
                  ></b-button> -->
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
                        <span>Order<!--  {{order}} --> </span>
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
                        <span>Num pax</span>
                      </label>
                    </b-colxx>
                  </b-row>

                  <b-row class="pt-1 pb-1">
                    <b-colxx>
                      <div class="form-group has-float-label custom-selects">
                        <span>{{ $t("gps.search-services") }}</span>

                        <v-select
                          label="CampoBusqueda"
                          v-model="productosSelected"
                          :options="productos"
                        >
                        </v-select>
                        <!--  {{ productosSelected }}
                        {{total_discounts}} -->
                      </div>
                    </b-colxx>
                  </b-row>
                  <b-row class="pt-2 pb-2">
                    <b-colxx xs="6">
                      <label class="form-group has-float-label">
                    <!--        {{productosSelected}}  -->
                        <input
                          :disabled="productosSelected.length == 0"
                          type="number"
                          v-model="extradiscount"
                          class="form-control"
                          minlength="1"
                          maxlength="3"
                          min="0"
                          @keypress="onlyNumber"
                        />
                        <span>Extra discount<!--  {{order}} --> </span>
                      </label>
                    </b-colxx>
                    <b-colxx xs="6">
                      <label class="form-group has-float-label">
                         <input
                          type="number"
                          :disabled="productosSelected.length == 0"
                          v-model="discountchildren"
                          class="form-control"
                          minlength="1"
                          maxlength="3"
                          min="1"
                          @keypress="onlyNumber"
                        />
 
<!-- <ValidationProvider rules="min:3" v-slot="{ errors }">
  <input v-model="discountchildren" type="text">
  <span>{{ errors[0] }}</span>
</ValidationProvider> -->



                        <span>Discount children</span>
                      </label>
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
                          <th class="pv text-center">PV</th>
                             <th class="pp text-center">DSC</th>
                       
                          <th class="total text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{ productosSelected.CampoBusqueda }}</td>
                            <td class="pv">
                            {{ productosSelected.tarVenta }}
                          </td>
                          <td class="pp">
                       <!--      {{
                              productosSelected.tarNeta > 0
                                ? productosSelected.tarNeta
                                : 0
                            }} -->
                            {{parseFloat(discountchildren)+parseFloat(extradiscount)}}
                          </td>
                       
                          <td v-if="discountchildren || extradiscount" class="pv">
                            {{
                              (( 
                                productosSelected.tarVentaTotal * numPax
                              )-(parseFloat(discountchildren)+parseFloat(extradiscount))).toFixed(2)
                            }}
                          </td>
                           <td v-else class="pv">
                            {{
                              ( 
                                productosSelected.tarVentaTotal * numPax
                              ).toFixed(2)
                            }}
                          </td>
                        </tr>
                      </tbody>
                      <!--         {{
                        total_discounts
                      }} -->
                    </table>
                    <!-- Mensaje de alerta de NumPax -->
                    <div
                      v-if="numPax > copPaxHasta"
                      class="alert alert-warning w-100"
                    >
                      <i class="glyph-icon simple-icon-people"></i> Number of
                      passengers is greater than the booking ({{ copPaxHasta }}
                      )
                    </div>
                    <div
                      v-if="total_discounts == false"
                      class="alert alert-danger w-100"
                    >
                      <i class="glyph-icon simple-icon-people"></i> Discount
                      exceed value of service
                    </div>
                    <!-- Mensaje de alerta de NumPax -->
                  </b-row>

                  <b-row>
                    <b-card class="add-buttons">
                      <b-button
                        class="mb-1"
                        v-if="
                          numPax > 0 &&
                          productosSelected &&
                          dateSelected &&
                          total_discounts == true
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
  </div>
</template>

<script>
import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices.js";
//import { ValidationProvider } from 'vee-validate';
import IconCard from "../../../../../components/Cards/IconCard";
import InputTag from "../../../../../components/Form/InputTag";
import { extend } from 'vee-validate';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapActions } from "vuex";
import moment from "moment";
extend('min', value => {
  return value >= 3;
});
export default {
  name: "modalrates",
  props: ["cotId"],
  components: {
    "icon-card": IconCard,
    "input-tag": InputTag,
    "v-select": vSelect,
 //   ValidationProvider
  },
  data() {
    return {
   
   maxLength: 100,
   minLength: 0,
   errorName: "",

      dateSelected: "",
      visible: false,
      productosSelected: "",
      numPax: "1",
      totalbooking: "",
      infoquote: "",
      cotstartdate: "",
      cotenddate: "",
      copPaxHasta: "",
      order: "0",
      extradiscount: "0",
      discountchildren: "0",
      selectedCot: "",
      /*  tarVentavalue:"",
      extradiscountvalue:"",
      childrendiscountvalue:"",
      totaldiscounts:"",
     */
      totaldiscounts: 0,
    };
  },
  filters: {},
  watch: {
    cotId: function (newVal, oldVal) {
      this.selectedCot = newVal;
      this.getInfoQuotebyAddServices();
      this.dateSelected="";
      this.productosSelected= "";
      this.order=0;
      this.extradiscount=0;
      this.discountchildren=0;
      this.numPax=1;

    },
       discountchildren: function (newVal, oldVal) {
   //  console.log(newVal+'newvalor')
if(!newVal) this.discountchildren=0;

     },
      extradiscount: function (newVal, oldVal) {
   //  console.log(newVal+'newvalor')
if(!newVal) this.extradiscount=0;

     },

 
  },
  computed: {
    total_discounts: function () {
      //console.log(this.productosSelected.tarVenta + "valor unitario");
      let totalventa = this.productosSelected.tarVenta;
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