<!--Componente :
- Detalle de servicios por cotizacion y pop up interno para actualizacion por servicio -->

<template>
  <div>
    <b-row>
      <b-colxx lg="12">
        <div class="border-contenttab pt-2 pl-2 pr-2">
          <b-container>
            <b-row>
              <b-colxx lg="12">
                <b-row>
                  <b-container class="pl-0 pr-0">
                    <b-card class="custom-cardtabs d-flex">
                      <b-container>
                        <b-row>
                          <b-colxx lg="11" class="info-header-tab">
                            <detail-header :cotId="cotId" />
                          </b-colxx>
                          <!-- Seccion add services -->

                          <b-colxx sm="1" class="pr-0 mt-2">
                            <div class="float-right">
                              <b-button
                                id="addservice1"
                                v-if="detallecotizacion.cotEstado == 1"
                                v-b-modal.addservice
                                class="ml-1"
                                variant="outline-primary default"
                                size="sm"
                                ><i class="fas fa-concierge-bell"></i
                              >
                              <b-tooltip target="addservice1"
                                      placement="left"
                                      title="Add services">
                              </b-tooltip> 
                              </b-button>
                                  
                              <b-modal
                                id="addservice"
                                ref="addservice"
                                modal-class="modal-right modal-services"
                                :title="$t('gps.add-services')"
                              >
                                <quote-service
                                  v-if="showServices && selectedCot"
                                  @updatedetailcot="updateinfoservice"
                                  :cotId="selectedCot"
                                />
                                <template slot="modal-footer">
                                  <b-button
                                    class="mt-2 mb-2"
                                    variant="primary default"
                                    @click="hideModal('addservice')"
                                    >{{ $t("gps.close") }}</b-button
                                  >
                                </template>
                              </b-modal>

                              <b-modal
                                id="modalcodesclient"
                                ref="modalcodesclient"
                                modal-class="modal-center modal-services"
                                title="Codigos de Cliente"
                              >
                                <modal-codes-client
                                  :infocoti="detallecotizacion"
                                >
                                </modal-codes-client>
                                <template slot="modal-footer">
                                  <b-button
                                    class="mt-2 mb-2"
                                    variant="primary default"
                                    @click="hideModal('modalcodesclient')"
                                    >{{ $t("gps.close") }}</b-button
                                  >
                                </template>
                              </b-modal>
                              <!-- 
                              {{detallecotizacion.cotCodigo}} -->
                              <b-modal
                                id="modalpreconfirm"
                                size="lg"
                                ref="modalpreconfirm"
                                modal-class="modal-center modal-services modalpreconfirm"
                                :title="
                                  'Info preview to confirm Q ' +
                                  detallecotizacion.cotCodigo
                                "
                              >
                                <modal-pre-confirm
                                  :cotId="selectedCot"
                                >
                                </modal-pre-confirm>
                                <template slot="modal-footer">
                                  <b-button
                                    class="mt-2 mb-2"
                                    variant="info default"
                                    @click="hideModal('modalpreconfirm')"
                                    >{{ $t("gps.close") }}</b-button
                                  >
                                </template>
                              </b-modal>
                            </div>
                          </b-colxx>
                        </b-row>
                      </b-container>
                    </b-card>
                  </b-container>
                  <div class="custom-deatil">
                    <!--     {{ serviceselected }} -->
                    <b-collapse
                      v-if="serviceselected.bokId > 0 === true"
                      :id="'collapse-a' + serviceselected.codId"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card>
                        <detail-service-cruise
                          @updateinfoservice="updateinfoservice"
                          :serviceselected="serviceselected"
                          :detallecotizacion="detallecotizacion"
                        >
                        </detail-service-cruise>
                      </b-card>
                    </b-collapse>
                    <b-collapse
                      :id="'collapse-a1' + serviceselected.codId"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card>
                        <detail-service-product
                          @updateinfoservice="updateinfoservice"
                          :serviceselected="serviceselected"
                          :detallecotizacion="detallecotizacion"
                        >
                        </detail-service-product>
                      </b-card>
                    </b-collapse>
                  </div>
                </b-row>
              </b-colxx>
            </b-row>
            <div class="separator mb-1"></div>
          </b-container>
          <b-row class="title-details">
            <b-col md="1" class="ml-3"> Start date </b-col>
            <b-col md="1" class="ml-2"> End date </b-col>
            <b-col md="1"> QTY </b-col>
            <b-col> Description </b-col>
            <b-col md="1"> Unit Price </b-col>
            <b-col md="1"> Subtotal </b-col>
            <b-col md="1"> Discounts </b-col>
            <b-col md="1"> Total </b-col>
          </b-row>
          <!--   {{ detallecotizacion.detalles }}   -->

          <b-list-group class="custom-listgroup">
            <b-list-group-item
              v-for="(item, index) in detallecotizacion.detalles"
              :key="index"
            >
              <b-row
                v-if="item.bokId !== null"
                v-b-toggle="['collapse-a' + item.codId, 'collapse-b']"
                @click="captureservicedetail(item)"
                class="item-detail-row"
                style="cursor: pointer"
              >
                <b-col md="1" class="item-row ml-3">
                  {{
                    moment(item.codFechaInicio).format("DD MMM YYYY, ddd h:mm ")
                  }}
                </b-col>
                <b-col md="1" class="item-row ml-2">
                  {{
                    moment(item.codFechaFin).format("DD MMM YYYY, ddd h:mm ")
                  }}
                </b-col>
                <b-col md="1" class="item-row">{{ item.codCantidad }}</b-col>
                <b-col class="item-row" v-if="!item.codDetalle">
                  {{ item.codConcepto }} 
                  <b-button @click="captureservicedetail(item)" v-b-modal.modalbookingdetail variant="light modalbookingdetail"><i class="glyph-icon simple-icon-eye"></i></b-button>
                </b-col>
                <b-col class="item-row" v-else> {{ item.codDetalle }} </b-col>

                <b-col md="1" class="item-row text-right pr-2">
                  {{ item.codPrecioUnitarioTotal }}
                </b-col>
                <b-col md="1" class="item-row text-right pr-2">
                  {{ item.subTotal }}
                </b-col>
                <b-col
                  md="1"
                  class="item-row text-right pr-2"
                  :title="
                    'Extra discount :' +
                    item.codCruceroDescuentoExtra +
                    ' Children discount :' +
                    item.codCruceroDescuentoNinos
                  "
                >
                  {{ item.totalDescuentos }}
                </b-col>
                <b-col md="1" class="item-row text-right pr-4">
                  {{ item.precioTotal }}
                </b-col>

                <!--b-collapse
                  :id="'collapse-a' + serviceselected.codId"
                  accordion="my-accordion"
                  role="tabpanel"
                  v-if="serviceselected.bokId"
                  class="mt-2 col-lg-12 detail-row"
                >
                  <b-card-body>
                    <b-card>
                     {{serviceselected.bokId}}  -->
                     <b-modal id="modalbookingdetail" hide-header small size="lg" modal-class="modalbookingdetail" ref="modallong" :title="$t('modal.modal-title')">
                      <booking-details
                        :bokId="serviceselected.bokId"
                      ></booking-details>
                     </b-modal>
                    <!--/b-card>
                  </b-card-body>
                </b-collapse-->
              </b-row>
              <b-row
                v-else
                v-b-toggle="'collapse-a1' + item.codId"
                @click="captureservicedetail(item)"
                class="item-detail-row"
                style="cursor: pointer"
              >
                <b-col md="1" class="item-row ml-3">{{
                  moment(item.codFechaInicio).format("DD MMM YYYY, ddd h:mm ")
                }}</b-col>
                <b-col md="1" class="item-row ml-2">{{
                  moment(item.codFechaFin).format("DD MMM YYYY, ddd h:mm ")
                }}</b-col>
                <b-col md="1" class="item-row">{{ item.codCantidad }}</b-col>
                <b-col class="item-row" v-if="!item.codDetalle">
                  {{ item.codConcepto }}
                </b-col>
                <b-col class="item-row" v-else> {{ item.codDetalle }} </b-col>
                <b-col md="1" class="item-row text-right pr-2">
                  {{ item.codPrecioUnitarioTotal }}
                </b-col>
                <b-col md="1" class="item-row text-right pr-2">
                  {{ item.subTotal }}
                </b-col>
                <b-col
                  md="1"
                  class="item-row text-right pr-2"
                  :title="
                    'Extra discount :' +
                    item.codCruceroDescuentoExtra +
                    ' Children discount :' +
                    item.codCruceroDescuentoNinos
                  "
                >
                  {{ item.totalDescuentos }}
                </b-col>
                <b-col md="1" class="item-row text-right pr-4">
                  {{ item.precioTotal }}
                </b-col>
                <!--    <b-col md="1" class="item-row"> % </b-col> -->
              </b-row>
              <!-- Via space separated string of IDs passed to directive value -->
            </b-list-group-item>

            <!--          collapse para detalle de booking -->
          </b-list-group>
          <b-row class="quote-summary">
            <b-colxx md="8"></b-colxx>
            <b-colxx class="border">
              <div>
                <b-row class="title-summary">
                  <b-col md="4" class="border-right pl-0 pr-0 text-right">
                    <div class="pt-1 pb-1 border-bottom pr-3"> Subtotal </div>
                    <div class="pt-1 pb-1 pr-3">
                      <!--   {{  totalescotizacion.iva}}   -->
                      Iva
                      <b-form-select
                        v-model="totalescotizacion.iva"
                        :options="iva"
                        value-field="metName"
                        text-field="metName"
                        size="sm"
                        class="iva-select"
                        @change="updatecotizacioniva(totalescotizacion.iva)"
                      ></b-form-select>
                      %
                    </div>
                  </b-col>

                  <b-col class="border-bottom text-right pl-0 pr-2">
                    <div class="pt-1 pb-1 border-bottom">
                      {{ parseFloat(totalescotizacion.subtotal).toFixed(2) }}
                    </div>
                    <div class="pt-1 pb-1">
                      {{ parseFloat(totalescotizacion.valorIva).toFixed(2) }}
                    </div>
                  </b-col>
                </b-row>
                <b-row class="title-summary grant-total border-bottom">
                  <b-colxx md="4" class="text-right border-right p-1 pr-3 mt-1">
                    Total
                  </b-colxx>
                  <b-colxx class="text-right p-2">
                    $ {{ parseFloat(totalescotizacion.total).toFixed(2) }}
                  </b-colxx>
                </b-row>
                <!--  {{flag}}  -->
              </div>
            </b-colxx>
          </b-row>
          <div style="display: flex; justify-content: flex-end" class="pt-2">
            <div>
              <!--BOTON PARA QUE PRIMERO INGRESEN LOS NIÑOS -->
              <!--   {{detallecotizacion.cotEstado}} -->
              <div>
                <b-button
                  class="mr-2"
                  v-if="detallecotizacion.cotEstado == 1"
                  variant="success default"
                  @click="convertConfirmation(detallecotizacion)"
                >
                  {{ $t("gps.confirm") }}</b-button
                >
              </div>
              <!--BOTON PARA QUE PRIMERO INGRESEN LOS NIÑOS -->
            </div>

            <button
              @click="gotopreview(detallecotizacion['cotId'])"
              type="button"
              class="btn btn-info rounded-0"
            >
              <div class="glyph-icon simple-icon-magnifier d-inline"></div> {{ $t("gps.preview") }}
            </button>
          </div>
        </div>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>
/* *** SERVICES *** */
import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices.js";
import MetadataServices from "../../../../../services/gps/metadata/MetadataServices.js";

//import Tab from "../../../components/Form/Wizard/Tab";
export default {
  name: "ModalItinerary",
  props: ["cotId"],
  data() {
    return {
      iva: [],
      totalescotizacion: [],
      selectedCot: 0,
      detallecotizacion: [],
      detallecotizacionbooking: [],
      serviceselected: [],
      showServices: true,
    };
  },

  watch: {
    cotId: function (newVal, oldVal) {
      this.selectedCot = newVal;
      this.cotizaciondetalles();
      this.totalcotizacion();
      // this.showServices=false;
    },
  },
  mounted() {
    this.getIva();
  },

  methods: {
    updateinfoservice() {
      this.cotizaciondetalles();
      this.totalcotizacion();
    },
    hideModal(refname) {
      this.$refs[refname].hide();
    },
    gotopreview(cotId) {
      let routeData = this.$router.resolve({
        name: "quotepreview",
        params: { cotId: cotId },
      });
      window.open(routeData.href, "_blank");
    },

    captureservicedetail(item) {
      this.serviceselected = item;
    },

    cotizaciondetalles() {
      CotizacionesServices.cotizacionesdetalles(this.selectedCot)
        .then((response) => {
          // console.log("==> " + JSON.stringify(response.data));
          this.detallecotizacion = response.data;
          this.detallecotizacion = this.detallecotizacion.shift();
          this.detallecotizacionbooking = this.detallecotizacion["booking"];
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updatecotizacioniva(iva) {
      let data = {
        cotId: this.selectedCot,
        cotIva: iva,
      };

      CotizacionesServices.updatecotizacioniva(data)
        .then((response) => {
          let mensaje = response.data;
          if (mensaje.data == 200) {
            this.cotizaciondetalles();
            this.totalcotizacion();
          } else {
            var type = "error filled";
            var title = "Iva";
            var message = "No update";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getIva() {
      MetadataServices.getMetadataByGroup(31)
        .then((response) => {
          this.iva = response.data.data;
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
    totalcotizacion() {
      CotizacionesServices.totalescotizacion(this.selectedCot)
        .then((response) => {
          this.totalescotizacion = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

   

    convertConfirmation(infocoti) {
   
      const numeroninos = infocoti.booking.bokChildrenPax;
      const numeroCodigos = infocoti.numeroCodigos;

      if (numeroCodigos == 0) {
        var type = "info";
        var title = "Imposible create Confirmation";
          var message = "No Codes associated to this client, Please contact with administrator";
        {
          this.$notify(type, title, message, {
            duration: 3000,
            permanent: false,
          });
        }
      } else if (numeroninos > 0 || numeroCodigos > 0) {
        this.$refs.modalpreconfirm.show();
      } 

    },

    //
  },
};
</script>
