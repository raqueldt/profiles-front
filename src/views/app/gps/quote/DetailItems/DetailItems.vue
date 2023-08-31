<!--Componente :
- Detalle de servicios por cotizacion y pop up interno para actualizacion por servicio -->

<template>
  <b-container fluid>
    <b-row>
      <b-colxx lg="12">
        <div class="border-contenttab pt-2 pl-2 pr-2">
          <!-- Formulario interno detalles de cotización -->
          <b-colxx class="container-fluid" v-if="selectedRow" :class="selectedRow ? 'sticky-top' : ''"
            :style="selectedRow ? 'top: 70px !important;' : ''">
            <div v-if="selectedRow.bokId > 0">
              <div class="custom-deatil">
                <b-card>
                  <detail-service-cruise @updateinfoservice="updateinfoservice" :serviceselected="selectedRow"
                    :detallecotizacion="detallecotizacion" />
                </b-card>
              </div>
            </div>
            <div v-else>
              <div class="custom-deatil">
                <b-card>
                  <detail-service-product @updateinfoservice="updateinfoservice" :serviceselected="selectedRow"
                    :detallecotizacion="detallecotizacion" />
                </b-card>
              </div>
            </div>
          </b-colxx>
          <!-- Fin Formulario interno detalles de cotización -->

          <div v-for="(group,
            groupedLabelFechaInicio,
            indexFechaInicio) in groupedByFechaInicio" :key="indexFechaInicio" class="mt-1">
            <div class="container mb-2">
              <b-row class=" align-items-center">
                <b-col lg="10" md="12" xs="12">
                  <div class="text-primary ">
                    <b> {{moment(groupedLabelFechaInicio).format("DD MMM YYYY, ddd")}}</b>
                  </div>
                </b-col>

                <!-- ADD SERVICES -->
                <b-col lg="2" md="12" xs="12" class="mt-2 d-inline" v-if="$isAdministrador ">
                  <b-row class=" justify-content-center align-items-center">
                    <b-col lg="9" md="9" xs="9" cols="9">
                      <b-button block :disabled="cotEstado != 1" v-b-modal.modal-add-service
                        title="Click here to add Services" size="xs" variant="outline-primary default">
                        <i :class="`iconsminds-data-center`"></i>Add services
                      </b-button>
                      <add-service></add-service>
                    </b-col>
                    <b-col lg="3" md="3" xs="3" cols="3" class="text-center">
                      <b-button id="reolad1" variant="btn btn-header-light" size="sm" @click="refresh()"
                        data-toggle="tooltip" data-placement="top" title="Reload quote" class="text-center">
                        <i class="simple-icon-refresh" />
                      </b-button>
                    </b-col>
                  </b-row>
                </b-col>
                <!-- END ADD SERVICES -->
                
              </b-row>

            </div>

            <b-table v-sortable="sortableOptions" :no-local-sorting="true" head-variant="light" id="my_table"
              :items="group" :fields="fields" :outlined="true" :select-mode="selectMode" table-class="w-auto"
              :ref="'selectableTable' + indexFechaInicio" selectable selectedVariant="warning" empty-text="NO DATA"
              @row-selected="onRowSelected" :class="indexTab ? 'b-table-row-selected table-active' : ''" @row-clicked="
                (item, index, event) =>
                  myRowClickHandler(
                    indexFechaInicio,
                    groupedLabelFechaInicio,
                    index
                  )
              " :busy="isLoading">
              <!-- CABECERA -->
              <!-- <template v-slot:head(codFechaInicio)="data">
                  <div class="text-capitalize">{{ data.label }}</div>
              </template>
              <template v-slot:head(codCantidad)="data">
                  <div class="text-capitalize">{{ data.label }}</div>
              </template>
              <template v-slot:head(provider)="data">
                  <div class="text-capitalize">{{ data.label }}</div>
              </template>
              <template v-slot:head(codConcepto)="data">
                  <div class="text-capitalize">{{ data.label }}</div>
              </template>                             -->

              <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                </div>
              </template>

              <template #cell(selectCotizacion)="row">
                <span :id="'paper_' + row.item.codId" :values="JSON.stringify(row.item)"></span>
                <!-- {{row.item.codOrden}} -->
                <i class="glyph-icon iconsminds-up---down"
                  v-tooltip="{ content: `Drag and drop to order services` }"></i>
              </template>

              <template #cell(codFechaInicio)="data">
                <span v-if="data.item.bokId == null">
                  {{
                    moment(data.item.codFechaInicio).format("DD MMM YYYY, ddd")
                  }}
                </span>
                <span v-else>
                  {{
                    moment(data.item.codFechaInicio).format("DD MMM YYYY, ddd")
                  }}
                  to<br />
                  {{ moment(data.item.codFechaFin).format("DD MMM YYYY, ddd") }}
                </span>
              </template>

              <template #cell(codConcepto)="data">
                <span style="
                  word-break: break-;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: block;
                  line-height: 11px;
                ">
                  <div v-if="Boolean(data.item.codNota)">
                    <i title="Note added" class="glyph-icon iconsminds-pen-2"></i>
                  </div>
                  <b-button v-if="data.item.bokId" v-b-modal.modalbookingdetail data-toggle="tooltip"
                    data-placement="top" title="Service information" class="text-primary p-0"
                    variant="modalbookingdetail" size="xs"><i class="glyph-icon simple-icon-eye"></i>
                  </b-button>

                  <span v-if="!data.item.codDetalle">
                    {{ data.item.codConcepto ? data.item.codConcepto : "-" }}
                  </span>
                  <span v-else>
                    {{ data.item.codDetalle ? data.item.codDetalle : "-" }}
                  </span>

                  <b-modal v-if="data.item.bokId" ref="modalbookingdetail" id="modalbookingdetail" small size="lg"
                    modal-class="modalbookdetail" title="Cabin selection breakdown">
                    <booking-details :bokId="data.item.bokId"></booking-details>

                    <template slot="modal-footer">
                      <b-button class="mt-2 mb-2" variant="secondary" @click="$bvModal.hide('modalbookingdetail')">
                        {{ $t("gps.close") }}</b-button>
                    </template>
                  </b-modal>
                </span>
              </template>
              <template #cell(provider)="data">
                <span v-if="data.item.provider">
                  {{ data.item.provider }}
                </span>
                <span v-else> - </span>
              </template>
              <template #cell(precioTotal)="data">
                <span>
                  {{ data.item.precioTotal | currency }}
                </span>
              </template>
              <template #cell(subTotal)="data">
                <span>
                  {{ data.item.subTotal | currency }}
                </span>
              </template>
              <template #cell(totalDescuentos)="data">
                <span>
                  {{ data.item.totalDescuentos | currency }}
                </span>
              </template>

              <template #cell(codPrecioUnitarioTotal)="data">
                <span v-if="!data.item.bokId">
                  {{ data.item.codPrecioUnitarioTotal | currency }}
                </span>
                <span v-else> - </span>
              </template>

              <template #cell(codCantidad)="data">
                <span v-if="!data.item.bokId">
                  {{ data.item.codCantidad }}
                </span>
                <span v-else> - </span>
              </template>

              <template #cell(codNota)="data">
                <div v-if="Boolean(data.item.codNota)" class="mt-0">
                  <i title="Note added" class="glyph-icon iconsminds-pen-2"></i>
                </div>
              </template>

              <template #cell(edit)="data">
                <!-- {{data.item}} -->

                <!-- BOTON DE EDICION -->

                <div class="text-center" v-if="data.item.bokId > 0">
                  <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                    <template #button-content>
                      <i class="glyph-icon simple-icon-options-vertical" style="color:gray"></i>
                    </template>
                    <b-dropdown-item href="#" v-if="data.item.bokId" :disabled="data.item.bokId && cotEstado == 0"
                      @click="
                          $router.push({
                            name: 'SlotsParentEdit',
                            params: {
                              bokId: data.item.bokId,
                              depId: data.item.depId,
                              clientId: clientId
                            }
                          })
                        ">Edit Booking</b-dropdown-item>
                    <!-- <b-dropdown-item href="#">
                        <itinerary-cruise-customize-rate v-if=" $isAdministradorTarifas" :bok-id="data.item.bokId"
                          from="submenu" @reload="handleCustomizeRates" />

                      </b-dropdown-item> -->
                    <b-dropdown-item href="#">
                      <service-cruise-customize-rate v-if=" $isAdministradorTarifas" :bokId="data.item.bokId"
                        :cotId="cotId" from="submenu" @reload="refresh" />
                    </b-dropdown-item>

                  </b-dropdown>
                </div>


                <!-- <b-button
                  v-if="data.item.bokId && cotEstado === 1"
                  variant="outline-primary"
                  class="border-0"
                  size="xs"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Edit booking"
                  @click="
                    $router.push({
                      name: 'SlotsParentEdit',
                      params: {
                        bokId: data.item.bokId,
                        depId: data.item.depId,
                        clientId: clientId
                      }
                    })
                  "
                  ><i class="simple-icon-pencil"></i
                ></b-button>
                <b-button
                  v-if="data.item.bokId && cotEstado == 0"
                  disabled
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Edit booking not available"
                  variant="outline-primary"
                  class=""
                  size="xs"
                  ><i class="simple-icon-pencil"></i
                ></b-button> -->


                <!-- FIN BOTON DE EDICION -->
              </template>
            </b-table>
          </div>

          <!-- summary section -->
          <template v-if="isLoading">
            <b-row>
              <b-col cols="7"> </b-col>
              <b-col>
                <b-skeleton-table :rows="2" :columns="2" />
              </b-col>
            </b-row>
          </template>

          <template v-else>
            <b-container>
              <b-row class="quote-summary">
                <b-col lg="7"></b-col>
                <b-col lg="5" class="pr-0">

                  <b-row class="title-summary">

                    <b-col lg="4" md="6" xs="6" cols="6" class="border-right pl-0 pr-0 text-right">
                      <div v-if="getCotizacionTotales.services > 0" class="pt-1 pb-1 border-bottom pr-3">
                        Aditional Services Subtotal
                      </div>
                      <div class="py-1 border-bottom pr-3 pl-1 right-title-mobile">
                        Cruise Subtotal
                      </div>

                      <div v-if="getCotizacionTotales.cruiseChildDiscount > 0"
                        class="py-1 pl-1 border-bottom pr-3 right-title-mobile">
                        Child discount
                      </div>
                      <div v-if="detallecotizacion.cotEstado == 1"
                        class="py-1 pl-1 pr-3 border-bottom  right-title-mobile">
                        Tax
                        <b-form-select v-model="getCotizacionTotales.iva" :options="iva" value-field="metName"
                          text-field="metName" size="sm" class="iva-select" @change="
                            updatecotizacioniva(getCotizacionTotales.iva)
                          "></b-form-select>
                        %
                      </div>
                      <div v-else class="py-1 pl-1 pr-3 border-bottom  right-title-mobile">
                        Tax
                        <b-form-select disabled v-model="getCotizacionTotales.iva" :options="iva" value-field="metName"
                          text-field="metName" size="sm" class="iva-select"></b-form-select>
                        %
                      </div>
                      <div class="py-1 pl-1 border-bottom pr-3  right-title-mobile">
                        Total Quote
                      </div>
                    </b-col>

                    <b-col class="border-bottom text-right pl-0 pr-2">
                      <div v-if="getCotizacionTotales.services > 0" class="pt-1 pb-1 border-bottom">
                        {{ getCotizacionTotales.services | currency }}
                      </div>
                      <div class="pt-1 pb-1 border-bottom">
                        {{ getCotizacionTotales.cruise | currency }}
                      </div>
                      <div v-if="getCotizacionTotales.cruiseChildDiscount > 0" class="pt-1 pb-1 border-bottom">
                        {{
                          getCotizacionTotales.cruiseChildDiscount | currency
                        }}
                      </div>
                      <div class="pt-1 pb-1  border-bottom">
                        {{ getCotizacionTotales.valorIva | currency }}
                      </div>
                      <div class="pt-1 pb-1  border-bottom">
                        {{ getCotizacionTotales.total | currency }}
                      </div>
                    </b-col>
                  </b-row>

                </b-col>
              </b-row>
            </b-container>
          </template>
        </div>
      </b-colxx>
    </b-row>
  </b-container>
</template>

<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.10.2/Sortable.min.js"></script>

<script>
  /* *** SERVICES *** */
  import Sortable from "sortablejs";
  import quotes from "../../../../../mixins/quotes/quotes.js";
  import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices.js";
  import CotizacionDetalleServices from "../../../../../services/gps/cotizaciondetalle/CotizacionDetalleServices.js";
  import MetadataServices from "../../../../../services/gps/metadata/MetadataServices.js";
  import {
    mapActions,
    mapGetters,
    mapMutations,
    mapState
  } from "vuex";

  export default {
    name: "DetailItems",

    components: {
      ServiceCruiseCustomizeRate: () => import('@/views/app/gps/quote/DetailItems/ServiceCruiseCustomizeRate')
    },

    mixins: [quotes],

    props: ["cotId", "clientId", "cotEstado"],

    //  --------------------- Métodos para hacer draggable  ---------------------
    directives: {
      sortable: {
        bind(el, binding, vnode) {
          let self = el;
          Sortable.create(el.querySelector("tbody"), {
            ...binding.value,
            vnode: vnode,
            onEnd: e => {
              var itemEl = e.item;
              let ids = el.querySelectorAll("span[id^=paper_]");
              let order = [];
              for (let i = 0; i < ids.length; i++) {
                let item = JSON.parse(ids[i].getAttribute("values"));
                //extract items checkbox onChange v-model
                let itemInThisData = vnode.context.detallecotizacion.detalles.filter(
                  i => i.codId == item.codId
                );
                order.push({
                  codId: item.codId,
                  codFechaInicio: item.codFechaInicio,
                  // codCantidad: item.codCantidad,
                  // codConcepto: item.codConcepto,
                  // provider: item.provider,
                  // codPrecioUnitarioTotal: item.codPrecioUnitarioTotal,
                  // precioTotal: item.precioTotal,
                  selectCotizacion: itemInThisData[0].selectCotizacion
                });
              }

              binding.value = [];
              vnode.context.items = [];
              binding.value = order;
              vnode.context.items = order;
              console.table(vnode.context.items);

              // Llamo directamaente a la API para actualizar
              CotizacionDetalleServices.updateOrderArrayCotizaciones(order)
                .then(response => {
                  vnode.context.refresh();
                  vnode.context.draggableMessage();
                })
                .catch(error => {
                  console.log("No event was updated: " + error);
                });
            }
          });
        }
      }
    },
    //  ---------------------  Fin Métodos para hacer draggable  ---------------------

    data() {
      return {
        isLoading: false,

        sortableOptions: {
          chosenClass: "bg-info"
        },

        indiceFechaInicio: "",
        arrayFromTableByFechaInicio: [],
        selectMode: "single",
        selected: [],
        indexClicked: "",

        selectedRow: null,
        selectMode: "single",
        noCollapse: false,
        indexTab: 0,
        small: true,
        fields: [
          // 'codId',
          {
            key: "selectCotizacion",
            label: "",
            sortable: true,
            thStyle: {
              width: "1%"
            }
          },
          {
            key: "codFechaInicio",
            label: this.$t("gps.quote-itinerary.dates"),
            tdClass: "",
            selectCotizacion: false,
            thStyle: {
              width: "12%"
            }
          },
          {
            key: "codCantidad",
            label: this.$t("gps.quote-itinerary.qty"),
            tdClass: "",
            selectCotizacion: false,
            thStyle: {
              width: "3%"
            }
          },
          {
            key: "provider",
            label: this.$t("gps.quote-itinerary.supplier"),
            tdClass: "",
            selectCotizacion: false,
            thStyle: {
              width: "15%"
            }
          },
          {
            key: "codConcepto",
            label: this.$t("gps.quote-itinerary.service"),
            tdClass: "text-left",
            width: "350px",
            selectCotizacion: false,
            thStyle: {
              width: "20%"
            }
          },

          {
            key: "codPrecioUnitarioTotal",
            label: this.$t("gps.quote-itinerary.p-unit"),
            tdClass: "",
            selectCotizacion: false,
            thStyle: {
              width: "10%"
            }
          },
          // {
          //   key: "subTotal",
          //   label: this.$t("gps.quote-itinerary.subtotal"),
          //   tdClass: ""
          // },
          /*   {
                key: "totalDescuentos",
                label: this.$t("gps.quote-itinerary.discounts"),
                tdClass: "",
              }, */
          {
            key: "precioTotal",
            label: this.$t("gps.quote-itinerary.total"),
            tdClass: "",
            selectCotizacion: false,
            thStyle: {
              width: "10%"
            }
          },
          {
            key: "edit",
            label: "Actions",
            tdClass: "",
            selectCotizacion: false,
            thStyle: {
              width: "2%"
            }
          }
        ],
        iva: [],
        selectedCot: this.cotId,
        detallecotizacion: [],
        detallecotizacionbooking: [],
        serviceselected: [],
        showServices: true
      };
    },

    watch: {
      cotId: function (newVal, oldVal) {
        this.selectedCot = newVal;
      },

      selectedCot: function (newVal, oldVal) {
        this.loadCotizacion();
      },

      getChangeHeaderQuote() {
        this.updateinfoservice();
        this.setChangeHeaderQuote(0);
      }
    },

    computed: {
      ...mapGetters("cotizacion", [
        "getChangeHeaderQuote",
        "getCotizacionTotales"
      ]),

      groupedByFechaInicio() {
        if (this.detallecotizacion != "") {
          return this.groupByFechaInicio(
            this.detallecotizacion.detalles,
            "codFechaInicio"
          );
        }
      }
    },

    methods: {
      ...mapActions("cotizacion", ["loadCotizacionTotales"]),
      ...mapMutations("cotizacion", [
        "setChangeHeaderQuote",
        "setSelectedCotizacionFechaInicio"
      ]),

      // -------------- Funciones para habilitar teclar "SHIFT" --------------
      onRowSelected(items) {
        this.selectedRow = "";
        this.selectedRow = items;
        this.selectedRow = this.selectedRow.shift();
      },

      myRowClickHandler(indexFechaInicio, fechaInicio, index) {
        // console.log("Index: " + JSON.stringify(index))
        // console.log("indexFechaInicio: " + JSON.stringify(indexFechaInicio))
        // console.log("fechaInicio: " + JSON.stringify(fechaInicio))

        this.indexClicked = index;
        this.arrayFromTableByFechaInicio = this.detallecotizacion.detalles.filter(
          f => f.codFechaInicio === fechaInicio
        );
        this.indiceFechaInicio = indexFechaInicio;

        //Seteo fecha de inicio en store para inyectarlo en formulario de Add Services
        this.setSelectedCotizacionFechaInicio(fechaInicio);

        // Función para limpiar cualquier otra fila seleccionada en otra tabla:
        this._clearRef(indexFechaInicio);
      },
      detectKey(tag) {
        /*    console.log("--------------------------------------------------------------- Tecla presionada...." + tag); */
        let newIndex = "";
        if (tag === "up") newIndex = parseInt(this.indexClicked) - 1;
        if (tag === "down") newIndex = parseInt(this.indexClicked) + 1;

        let checkIndex = Object.keys(this.arrayFromTableByFechaInicio).filter(
          obj => parseInt(obj) === newIndex
        );

        let lastIndex = Object.keys(this.arrayFromTableByFechaInicio).length - 1;
        // console.log("Array=>" + Object.keys(this.arrayFromTableByFechaInicio));
        // console.log("Indice a ser checkeado=>" + newIndex);
        // console.log("checkIndex=>" + checkIndex);
        // console.log("lastIndex=>" + lastIndex);

        if (checkIndex != "") {
          //Método _getRef se encuentra en mixins/quote
          /*       console.log("...Opcion 1"); */

          var indiceARecorrer = newIndex;
          this._getRef(this.indexClicked, indiceARecorrer);
        } else {
          /*   console.log("...Opcion 2. No  existe indice...vuelvo al principio"); */

          if (tag === "up") {
            /*  console.log("En up.."); */
            var indiceARecorrer = lastIndex;
            this._getRef(this.indexClicked, indiceARecorrer);
          } else if (tag === "down") {
            /*  console.log("En down.."); */
            var indiceARecorrer = 0;
            this._getRef(this.indexClicked, indiceARecorrer);
          }
        }
      },
      // --------------  Fin Funciones para habilitar teclar "Tab" --------------
      rowClass(item, type) {
        if (!item || type !== "row") return;
        if (item.cfdEstado === 0) return "new-table-no-status";
        if (item.cfdEstado === 1) return "new-table-no-status";
        if (item.cfdEstado === 2) return "new-table-hold";
        if (item.cfdEstado === 3) return "new-table-cancel";
        if (item.cfdEstado === 4) return "new-table-confirm";
        if (item.cfdEstado === 5) return "new-table-wait-list";
        if (item.cfdEstado === 6) return "new-table-no-available";
        else return "new-table-warning";
      },

      // clearSelected() {
      //   this.$refs.selectableTable.clearSelected();
      // },
      updateinfoservice() {
        this.loadCotizacion();
        this.selectedRow = null;
      },

      refresh() {
        this.detallecotizacion = [];
        this.loadCotizacion();
        this.selectedRow = null;
      },

      hideModal(refname) {
        this.$refs[refname].hide();
      },

      gotopreview(cotId) {
        let routeData = this.$router.resolve({
          name: "quotepreview",
          params: {
            cotId: cotId
          }
        });
        window.open(routeData.href, "_blank");
      },

      captureservicedetail(item) {
        this.serviceselected = item;
      },

      async cotizaciondetalles() {
        if (!this.selectedCot) return;

        const {
          data
        } = await CotizacionesServices.cotizacionesdetalles(
          this.selectedCot
        );

        this.detallecotizacion = data;
        this.detallecotizacion = this.detallecotizacion.shift();
        this.detallecotizacionbooking = this.detallecotizacion["booking"];
      },

      updatecotizacioniva(iva) {
        let data = {
          cotId: this.selectedCot,
          cotIva: iva
        };

        CotizacionesServices.updatecotizacioniva(data)
          .then(response => {
            let mensaje = response.data;
            if (mensaje.data == 200) {
              this.loadCotizacion();
            } else {
              var type = "error filled";
              var title = "Iva";
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
      },

      async getIva() {
        const {
          data: {
            data
          }
        } = await MetadataServices.getMetadataByGroup(31);
        this.iva = data;
      },

      async totalcotizacion() {
        if (!this.selectedCot) return;

        await this.loadCotizacionTotales(this.selectedCot);
      },

      convertConfirmation(infocoti) {
        const numeroninos = infocoti.booking.bokChildrenPax;
        const numeroCodigos = infocoti.numeroCodigos;

        if (numeroCodigos == 0) {
          var type = "info";
          var title = "Imposible create Confirmation";
          var message =
            "No Codes associated to this client, Please contact with administrator"; {
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false
            });
          }
        } else if (numeroninos > 0 || numeroCodigos > 0) {
          this.$refs.modalpreconfirm.show();
        }
      },

      groupByFechaInicio(array, key) {
        const result = {};
        array.forEach(item => {
          if (!result[item[key]]) {
            result[item[key]] = [];
          }
          result[item[key]].push(item);
        });
        return result;
      },

      draggableMessage() {
        var type = "success filled";
        var title = "Updated";
        var message = "Order was updated successfully";
        this.$notify(type, title, message, {
          duration: 3000,
          permanent: false
        });
      },

      async loadCotizacion() {
        this.isLoading = true;

        await Promise.all([this.cotizaciondetalles(), this.totalcotizacion()]);

        this.isLoading = false;
      }
    },

    async created() {
      await this.getIva();
      await this.loadCotizacion();

      // ------------------ Capturo tecla SHIFT ------------------
      var self = this;
      document.onkeyup = function (e) {
        var key = window.event.keyCode;
        if (key == 38) {
          // TECLA ARRIBA
          self.detectKey("up");
        } else if (key == 40) {
          // TECLA ABAJO
          self.detectKey("down");
        }
      };
      // ------------------ Fin Capturo tecla SHIFT ------------------
    },

    mounted() {}
  };

</script>

<!-- <link rel="stylesheet" href="https://unpkg.com/buefy/dist/buefy.min.css"> -->

<style lang="css" scoped>
  tr:focus {
    /* outline: 0; */
    outline: 2 !important;
    border: solid 1px red;
  }

  tr:focus-visible {
    /* outline: 0; */
    outline: 2 !important;
    border: solid 1px green;
  }

  .b-table-row-selected {
    font-weight: bold;
  }

  *>>>.table th,
  .table td {
    padding: 0.2rem !important;
  }

  *>>>.table>tbody>tr>td {
    vertical-align: middle !important;
    padding: 0.3rem 0.1rem !important;
    font-size: 0.7rem;
    font-weight: 600;
    color: #636363;
  }

  /* * >>>.table > tbody > tr > td > span > .fa, .fas
{
  font-size: 0.9rem;
}   */

</style>
