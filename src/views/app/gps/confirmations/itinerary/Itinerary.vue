/* Componente : - Agregar servicios a confirmacion */
<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <!-- loading state -->
        <template v-if="isLoading">
          <b-skeleton-table class="mt-3" :rows="1" :columns="6"></b-skeleton-table>
        </template>

        <template v-else>
          <!-- begin card -->
          <div class="card mt-0">


            <!-- BOTÓN PARA AÑADIR SERVICIOS -->

            <!-- <div class="d-flex justify-content-between p-3">
              <div class="float-right w-100">
                <b-button id="reolad1" variant="btn btn-header-light icon-button" size="sm" @click="reload()"
                  data-toggle="tooltip" data-placement="top" title="Reload confirmation" class="float-right">
                  <i class="simple-icon-refresh" />
                </b-button>
                <b-button id="addservice1" :disabled="$isOperador" size="sm" v-b-modal.modalbasic
                  variant="outline-primary default" data-toggle="tooltip" data-placement="top"
                  title="Click here to add Services" class="px-3 py-2 float-right">
                  <i :class="`iconsminds-data-center`"></i>Add Service
                </b-button>
              </div>
            </div> -->
            <!-- FIN BOTÓN PARA AÑADIR SERVICIOS -->

            <add-service v-if="!$isOperador && dataConfirmation.cofEstado != 0" @reload="showModalServices" />

            <!-- MODAL ADD SERVICES -->
            <b-modal size="lg" id="modalbasic" ref="modalbasic" modal-class="modal-right modal-ser"
              :title="$t('gps.add-services')">
              <itinerary-confirmation-add-services :cofId="cofId" @updatedService="updatedService">
              </itinerary-confirmation-add-services>
              <template slot="modal-footer">
                <b-button class="mt-2 mb-2" variant="secondary default" @click="hideModal('modalbasic')">
                  {{ $t("gps.close") }}</b-button>
              </template>
            </b-modal>
            <!-- END MODAL ADD SERVICES -->

            <div class="container-fluid">
              <!-- TABLE -->
              <b-container fluid>
                <!-- {{selectedRow}} -->

                <b-col v-if="selectedRow" class="container-fluid" :class="selectedRow ? 'sticky-top' : ''"
                  :style="selectedRow ? 'top: 70px !important; z-index:1' : ''">
                  <itinerary-confirmation-form :cofId="cofId" @closeChild="clearSelectedTable"
                    @updatedService="updatedService" @itineraryReload="silentItineraryReload"
                    :serviceselected="[selectedRow]" />
                </b-col>

                <div class="mx-2 table-cabecera mt-2">

                  <b-table 
                    :fields="fields" 
                    empty-text="No itineraries" 
                     small responsive fixed
                    >

                    <!-- CABECERA -->
                    <template v-slot:head(cfdEstado)="data">
                      <div class="text-center">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(cfdFechaInicio)="data">
                      <div class="text-center">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(supplier)="data">
                      <div class="text-center">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(cfdConcepto)="data">
                      <div class="text-center">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(cfdCantidad)="data">
                      <div class="text-center">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(cfdVenta)="data">
                      <div class="text-center">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(subTotal)="data">
                      <div class="text-center">{{ data.label }}</div>
                    </template>

                  </b-table>

                </div>
                <!-- ------------------------------------- AGRUPACION POR FECHA -------------------------------------  -->
                <div v-for="(group,
                  groupedLabelFechaInicio,
                  indexFechaInicio) in groupedByFechaInicio" :key="indexFechaInicio" class="mt-0">
                  <!-- top section -->
                  <div class="container-fluid">
                    <div class="text-primary mx-2"
                      style="padding: 3px 8px; border-bottom: 1px solid #f9eeee; border-top: 1px solid #f9eeee; background: #fbf9f9;">
                      <b style="color: #7a7a7a !important; font-size: .7rem;">{{
                        moment(groupedLabelFechaInicio).format(
                          "DD MMM YYYY, ddd"
                        )
                      }}</b>
                    </div>
                  </div>

                  <!-- tabla por cada fecha  -->
                  <!-- sticky-header -->
                  <b-table v-sortable="sortableOptions" head-variant="light" caption-top id="my_table" :items="group"
                    :no-border-collapse="noCollapse" :fields="fields" :outlined="true" :select-mode="selectMode"
                    responsive="sm" :ref="'selectableTable' + indexFechaInicio" selectable selectedVariant="warning"
                    empty-text="No itineraries" @row-selected="onRowSelected"
                    :class="indexTab ? 'b-table-row-selected table-active' : ''" @row-clicked="
                      (item, index, event) =>
                        myRowClickHandler(
                          indexFechaInicio,
                          groupedLabelFechaInicio,
                          index
                        )
                    " :small="small" class="mx-2" table-class="b-sevices">
                    <!-- CABECERA -->
                    <template v-slot:head(cfdEstado)="data">
                      <div class="text-left">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(cfdFechaInicio)="data">
                      <div class="text-left">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(supplier)="data">
                      <div class="text-left">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(cfdConcepto)="data">
                      <div class="text-left">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(cfdCantidad)="data">
                      <div class="text-center">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(cfdVenta)="data">
                      <div class="text-center">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(subTotal)="data">
                      <div class="text-center">{{ data.label }}</div>
                    </template>
                    <template v-slot:head(Total)="data">
                      <div class="text-center">{{ data.label }}</div>
                    </template>

                    <!-- busy state -->
                    <template v-slot:table-busy>
                      <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                      </div>
                    </template>

                    <!-- drag -->
                    <template #cell(selectConfirmacion)="row">
                      <span :id="'paper_' + row.item.cfdId" :values="JSON.stringify(row.item)"></span>
                      <!-- {{row.item.cfdOrden}} -->
                      <i class="fas fa-grip-vertical" style="color: #c5c5c5; font-size: 0.7rem;font-weight: 600;"
                        v-tooltip="{
                          content: `Drag and drop to order services`
                        }"></i>
                    </template>

                    <!-- record id -->
                    <template #cell(cfdId)="data">
                      <span>
                        {{ data.item.cfdId }}
                      </span>
                    </template>

                    <!-- status -->
                    <template #cell(cfdEstado)="data">
                      <span class="text-left d-flex">
                        <!-- {{data.item.cfdOrden}}  -->
                        <div class="ml-1" :class="formatIconStatus(data.item.cfdEstado)" :style="
                            paintIcon(
                              data.item.cfdEstado,
                              data.item.colordetalleconf
                            )
                          " style="font-size: 0.7rem;"></div>
                        <span class="ml-1" :style="paintIcon(data.item.cfdEstado)">{{ data.item.estadodetalleconf }}
                        </span>
                      </span>
                    </template>

                    <!-- fecha servicio -->
                    <template #cell(cfdFechaInicio)="data">
                      <span v-if="data.item.bokId == null" class="text-left w-100">
                        {{
                          moment(data.item.cfdFechaInicio).format(
                            "DD MMM YYYY, ddd"
                          )
                        }}
                      </span>
                      <span v-else class="text-left  w-100">
                        {{
                          moment(data.item.cfdFechaInicio).format(
                            "DD MMM YYYY, ddd"
                          )
                        }}
                        to<br />
                        {{
                          moment(data.item.cfdFechaFin).format(
                            "DD MMM YYYY, ddd"
                          )
                        }}
                      </span>
                    </template>

                    <!-- proveedor -->
                    <template #cell(supplier)="data">
                      <span class="ml-3">
                        {{ data.item.supplier ? data.item.supplier : "-" }}
                      </span>
                    </template>

                    <!-- service detail -->
                    <template #cell(cfdConcepto)="data">
                      <span
                        style="word-break:break-; overflow: hidden; text-overflow: ellipsis; display:block; width:250px !important; line-height: 11px;">
                        <b-button v-if="data.item.bokId" v-b-modal.modalbookingdetail data-toggle="tooltip"
                          data-placement="top" title="Booking details" variant="link" size="xs" class="p-0"><i
                            class="far fa-eye small text-primary mr-1" style="font-size:.72rem"></i>
                        </b-button>

                        {{
                          data.item.cfdConcepto ? data.item.cfdConcepto : "-"
                        }}

                        <b-modal v-if="data.item.bokId" ref="modalbookingdetail" id="modalbookingdetail" small size="lg"
                          modal-class="modalbookdetail" title="Cabin selection breakdown">
                          <booking-details :bokId="data.item.bokId"></booking-details>

                          <template slot="modal-footer">
                            <b-button class="mt-2 mb-2" variant="secondary"
                              @click="$bvModal.hide('modalbookingdetail')">
                              {{ $t("gps.close") }}</b-button>
                          </template>
                        </b-modal>
                      </span>
                    </template>

                    <!-- precio de venta -->
                    <template #cell(cfdVenta)="data">
                      <div class="text-center">
                        <span v-if="!data.item.bokId">
                          {{ data.item.cfdVenta | number("0,0.00") }}
                        </span>
                        <span v-else>{{
                          data.item.Total | number("0,0.00")
                        }}</span>
                      </div>
                    </template>

                    <!-- subtotal -->
                    <template #cell(subTotal)="data">
                      <div class="text-center">
                        <span class="pr-3">
                          <span v-if="!data.item.bokId">
                            {{ data.item.subTotal | number("0,0.00") }}
                          </span>
                          <span v-else>
                            {{ data.item.Total | number("0,0.00") }}
                          </span>
                        </span>
                      </div>
                    </template>
                    <!-- descuentos -->
                    <!--template #cell(totalDescuentos)="data">

                          <span>
                            {{ (data.item.totalDescuentos) | number('0,0.00') }}
                          </span>

                        </!--template-->

                    <!-- total -->
                    <template #cell(Total)="data">
                      <div class="text-center">
                        <span class="pr-3">
                          {{ data.item.Total | number("0,0.00") }}
                        </span>
                      </div>
                    </template>

                    <template #cell(edit)="data">

                      <!-- <div class="text-right" v-if="data.item.bokId > 0"> -->    <!-- Para editar solo línea de barco y no de servicios -->
                      <div class="text-center" v-if="data.item.bokId > 0">
                        <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                          <template #button-content>
                            <i class="glyph-icon simple-icon-options-vertical" style="color:gray"></i>
                          </template>
                          <b-dropdown-item href="#" v-if="data.item.bokId" :disabled="data.item.cofEstado === 0" @click="
                              $router.push({
                                name: 'SlotsParentEdit',
                                params: {
                                  bokId: data.item.bokId,
                                  depId: data.item.depId,
                                  clientId: data.item.bokClientId
                                },
                                query: { c: data.item.cofId, m: '' }
                              })
                            " >Edit Booking</b-dropdown-item>
                          <b-dropdown-item href="#">
                            <itinerary-cruise-customize-rate v-if=" $isAdministradorTarifas" :bok-id="data.item.bokId"
                              from="submenu" @reload="handleCustomizeRates" />

                          </b-dropdown-item>
                        </b-dropdown>
                      </div>

                      <!-- BOTON DE EDICION -->
                      <!-- <b-button
                  :disabled="data.item.cofEstado === 0"
                  v-if="data.item.bokId" 
                  data-toggle="tooltip" data-placement="top" title="Edit booking"
                  @click="
                  $router.push({
                              name: 'SlotsParentEdit',
                              params: {
                                bokId: data.item.bokId,
                                depId: data.item.depId,
                                clientId: data.item.bokClientId,                            
                              },                      
                              query: { c: data.item.cofId, m: ''  }
                          })               
                  " 
                  class="border-0"
                  variant="outline-primary"><i class="simple-icon-pencil"></i>
                </b-button>
                <b-button
                  v-else 
                  disabled
                  class="border-0"
                  variant="outline-primary"><i class="simple-icon-pencil"></i>
                </b-button>                 -->

                      <!-- FIN BOTON DE EDICION -->
                    </template>

                    <!-- <template #cell(saletotal)="data">
                          <span>
                              ${{ parseFloat(data.item.cfdVenta * data.item.numPax) | number('0,0.00') }}
                          </span>
                        </template> -->
                  </b-table>
                </div>
                <!-- ------------------------------------- FIN AGRUPACION POR FECHA -------------------------------------  -->

                <!-- COMPONENTE SUMMARY -->
                <!-- <b-container fluid>
                  <b-row align-h="end">
                    <b-col lg="4" md="12" xs="12" cols="12"  class="my-3">
                      <itinerary-confirmation-subtotal ref="childSubtotal" :cofId="cofId">
                      </itinerary-confirmation-subtotal>
                    </b-col>
                  </b-row>
                </b-container> -->
                <!-- FIN COMPONENTE SUMMARY -->
              </b-container>
              <!-- END TABLE -->
            </div>

            <!-- COMPONENTE SUMMARY -->
                <b-container fluid>
                  <b-row align-h="end">
                    <b-col lg="4" md="12" xs="12" cols="12"  class="my-3">
                      <itinerary-confirmation-subtotal ref="childSubtotal" :cofId="cofId">
                      </itinerary-confirmation-subtotal>
                    </b-col>
                  </b-row>
                </b-container>
                <!-- FIN COMPONENTE SUMMARY -->

          </div>
          <!-- end card -->
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";

  import Sortable from "sortablejs";
  import quotes from "@/mixins/quotes/quotes.js";

  import ConfirmacionServices from "@/services/gps/confirmacion/ConfirmacionServices";
  import roles from '@/mixins/roles/roles'
  import {
    mapActions,
    mapGetters,
    mapMutations
  } from "vuex";

  export default {
    name: "Itinerary",
    props: ["cofId"],
    mixins: [quotes],
    components: {
      "ItineraryCruiseCustomizeRate": () => import(
        '@/views/app/gps/confirmations/itinerary/ItineraryCruiseCustomizeRate')
    },

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
                let itemInThisData = vnode.context.itinerariesConfirmation.filter(
                  i => i.cfdId == item.cfdId
                );
                order.push({
                  cfdId: item.cfdId,
                  cfdFechaInicio: item.cfdFechaInicio,
                  // codCantidad: item.codCantidad,
                  // codConcepto: item.codConcepto,
                  // provider: item.provider,
                  // codPrecioUnitarioTotal: item.codPrecioUnitarioTotal,
                  // precioTotal: item.precioTotal,
                  selectConfirmacion: itemInThisData[0].selectConfirmacion
                });
              }

              binding.value = [];
              vnode.context.items = [];
              binding.value = order;
              vnode.context.items = order;
              console.table(vnode.context.items);

              // Llamo directamaente a la API para actualizar
              ConfirmacionServices.updateOrderArrayConfirmaciones(order)
                .then(response => {
                  vnode.context.reloadOnDraggable();
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
          chosenClass: "bg-light"
        },
        indiceFechaInicio: "",
        arrayFromTableByFechaInicio: [],
        selectMode: "single",
        selected: [],
        indexClicked: "",

        cotBokId: "",
        fields: [{
            key: "selectConfirmacion",
            label: "",
            tdClass: "td-drop td-sep",
            thStyle: {
              width: "1.5%"
            },
            sortable: false
          },
          {
            key: "cfdEstado",
            label: this.$t("gps.confirmation-itinerary.status"),
            tdClass: "text-left td-sep",
            thStyle: {
              width: "9%"
            },
            selectConfirmacion: false
          },
          //"cfdAsuntoSecuencia",
          {
            key: "cfdFechaInicio",
            label: this.$t("gps.confirmation-itinerary.dates"),
            tdClass: "text-left td-sep",
            thStyle: {
              width: "10%"
            },
            selectConfirmacion: false
          },
          {
            key: "cfdCantidad",
            label: this.$t("gps.confirmation-itinerary.qty"),
            tdClass: " td-sep",
            thStyle: {
              width: "5%"
            },
            selectConfirmacion: false
          },
          //"supplier",
          {
            key: "supplier",
            label: this.$t("gps.confirmation-itinerary.supplier"),
            tdClass: "text-left td-sep",
            thStyle: {
              width: "15%"
            },
            selectConfirmacion: false
          },
          {
            key: "cfdConcepto",
            label: this.$t("gps.confirmation-itinerary.service"),
            tdClass: "text-left td-sep",
            thStyle: {
              width: "30%"
            },
            selectConfirmacion: false
          },
          {
            key: "cfdVenta",
            label: this.$t("gps.confirmation-itinerary.p-unit"),
            tdClass: "text-center td-sep",
            thStyle: {
              width: "7%"
            },
            selectConfirmacion: false
          },
          {
            key: "subTotal",
            label: this.$t("gps.confirmation-itinerary.subtotal"),
            tdClass: "text-center td-sep",
            thStyle: {
              width: "7%"
            },
            selectConfirmacion: false
          },
          {
            key: "Total",
            label: this.$t("gps.confirmation-itinerary.total"),
            tdClass: "text-center td-sep",
            thStyle: {
              width: "7%"
            },
            selectConfirmacion: false
          },
          {
            key: "edit",
            label: "Actions",
            tdClass: "text-center td-sep",
            thStyle: {
              width: "4%"
            },
            selectConfirmacion: false
          }
        ],
        selectedRow: null,
        selectMode: "single",
        small: true,
        dark: true,
        noCollapse: false,
        indexTab: 0,
        dataConfirmation: [],

        itinerariesConfirmation: [],
        iva: [],
        totalescotizacion: [],
        selectedCot: 0,
        detallecotizacion: [],
        detallecotizacionbooking: [],
        serviceselected: [],
        showServices: true
      };
    },

    computed: {
      ...mapGetters("confirmacion", ["getSelectedConfirmacionFechaInicio"]),

      groupedByFechaInicio() {
        if (this.itinerariesConfirmation != "") {
          return this.groupByFechaInicio(
            this.itinerariesConfirmation,
            "cfdFechaInicio"
          );
        }
      }
    },

    watch: {
      cotId: function (newVal, oldVal) {
        this.selectedCot = newVal;
      }
    },

    methods: {
      ...mapMutations("confirmacion", ["setSelectedConfirmacionFechaInicio"]),
      ...mapActions("confirmacion", ["getTotalConfirmacionAction"]),

      async handleCustomizeRates() {
        await this.$emit("itineraryReload")

        await this.getConfirmationItineraries();
        await this.getTotalConfirmacionAction(this.cofId)

      },

      async getConfirmationHeader() {
        const {
          data
        } = await ConfirmacionServices.getConfirmationHeader(
          this.cofId
        );

        this.dataConfirmation = data;
        this.dataConfirmation = this.dataConfirmation.shift();
      },

      formatIconStatus(status) {
        var response = "";
        switch (status) {
          case 1: //No status
            response = "fas fa-question-circle";
            break;
          case 2: //Hold
            response = "fas fa-circle";
            break;
          case 3: // Cancel
            response = "fas fa-circle";
            break;
          case 4: //Confirm
            response = "fas fa-check-circle";
            break;
          case 5: //Wait List
            response = "fas fa-clock";
            break;
          case 6: //No availabile
            response = "fas fa-exclamation-circle";
            break;
          default:
            response = "simple-icon-arrow-right";
        }
        return response;
      },

      paintIcon(status, color) {
        if (Boolean(status) && Boolean(color)) {
          return `color: ${color}b3`;
        } else {
          return "color:#636363 ";
        }
      },

      rowClass(item, type) {
        //console.log("iterm " + item.colordetalleconf);

        // if (!item || type !== "row") return;
        // if (item.cfdEstado === 0) return "new-table-danger";
        // if (item.cfdEstado === 2) return "new-table-success";
        // if (item.cfdEstado === 3 || item.cfdEstado === 4)
        //   return "new-table-warning";

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

      clearSelected() {
        this.$refs.selectableTable.clearSelected();
      },

      async updatedService() {
        await this.fetchData();
      },

      hideModal(refname) {
        this.$refs[refname].hide();
      },

      async getConfirmationItineraries() {
        const {
          data: {
            data
          }
        } = await ConfirmacionServices.getDetailConfirmation(this.cofId);

        this.itinerariesConfirmation = data;
      },

      // 2022-09-07 | fg | cargar de data
      async fetchData() {
        await Promise.all([
          this.getConfirmationItineraries(),
          this.getTotalConfirmacionAction(this.cofId)
        ]);
      },

      // 2022-09-07 | fg | silent reload
      async silentItineraryReload() {
        await this.getConfirmationItineraries();
      },

      async reload() {
        this.messageReload();

        await this.fetchData();
      },

      async reloadOnDraggable() {
        this.itinerariesConfirmation = [];

        await this.fetchData();

        this.messageDraggableSuccess();
      },

      showModalServices() {
        this.$refs["modalbasic"].show();
      },

      messageReload() {
        const type = "success filled";
        const title = "Success";
        const message = this.$t("gps.confirmation-itinerary.reload-successfully");
        this.$notify(type, title, message, {
          duration: 2000,
          permanent: false
        });
      },

      messageDraggableSuccess() {
        const type = "success filled";
        const title = "Success";
        const message = "Order updated successfully";
        this.$notify(type, title, message, {
          duration: 2000,
          permanent: false
        });
      },

      //Modal:
      hideModal(refname) {
        this.$refs[refname].hide();

        if (refname === "modalnestedinline") this.$refs["modalnested"].show();
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

      // -------------- Funciones para habilitar teclar "SHIFT" --------------
      // onRowSelected(items) {
      //   //En caso de que la confirmación sea 0 (Cancelada), minimizar el form y no permitir su visualización
      //   let status = parseInt(items.map(a => a.cfdEstado));
      //   if (status != 0) {
      //     this.selectedRow = "";
      //     this.selectedRow = items;
      //   } else {
      //     this.$refs.selectableTable.clearSelected();
      //   }
      // },

      onRowSelected(items) {
        this.selectedRow = "";
        this.selectedRow = items;
        this.selectedRow = this.selectedRow.shift();
      },
      myRowClickHandler(indexFechaInicio, fechaInicio, index) {
        this.indexClicked = index;
        this.arrayFromTableByFechaInicio = this.itinerariesConfirmation.filter(
          f => f.cfdFechaInicio === fechaInicio
        );
        this.indiceFechaInicio = indexFechaInicio;

        //Seteo fecha de inicio en store para inyectarlo en formulario de Add Services
        this.setSelectedConfirmacionFechaInicio(
          moment(fechaInicio).format("YYYY-MM-DD")
        );

        // Función para limpiar cualquier otra fila seleccionada en otra tabla:
        this._clearRef(indexFechaInicio);
      },
      clearSelectedTable(data) {
        this._clearAllSelectableTable();
      },
      detectKey(tag) {
        console.log(
          "--------------------------------------------------------------- Tecla presionada...." +
          tag
        );
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
          console.log("...Opcion 1");

          var indiceARecorrer = newIndex;
          this._getRef(this.indexClicked, indiceARecorrer);
        } else {
          console.log("...Opcion 2. No  existe indice...vuelvo al principio");

          if (tag === "up") {
            console.log("En up..");
            var indiceARecorrer = lastIndex;
            this._getRef(this.indexClicked, indiceARecorrer);
          } else if (tag === "down") {
            console.log("En down..");
            var indiceARecorrer = 0;
            this._getRef(this.indexClicked, indiceARecorrer);
          }
        }
      }
      // --------------  Fin Funciones para habilitar teclar "Tab" --------------
      // getTotal(cfdVenta, numPax){
      //   return parseFloat(cfdVenta * numPax);
      // }

      //
    },

    mounted() {},

    async created() {
      this.isLoading = true;

      await Promise.all([
        this.getConfirmationItineraries(),

        this.getConfirmationHeader()
      ]);

      // ------------------ Capturo tecla SHIFT ------------------
      const self = this;

      document.onkeyup = function (e) {
        const key = window.event.keyCode;

        if (key == 38) self.detectKey("up"); // TECLA ARRIBA

        if (key == 40) self.detectKey("down"); // TECLA ABAJO
      };
      // ------------------ Fin Capturo tecla SHIFT ------------------

      this.isLoading = false;
    }
  };

</script>


<style lang="scss">
// Ubicación de menú de 3 botones a la izquierda
ul.show{
  transform: translate3d(-110px, 24px, 0px) !important;
}
</style>



<style scoped>
  /* .new-table-success {
  background-color: #d9ffde !important;
}
.new-table-danger {
  background-color: #fce3e3 !important;
}
.new-table-warning {
  background-color: #fdffdc !important;
}
 */
  .modal-right.modal-ser .modal-dialog {
    max-width: 650px;
  }

  /* NUEVOS ESTADOS */
  *>>>.new-table-no-status {
    background-color: #ffffff !important;
  }

  *>>>.new-table-hold {
    background-color: #e5f74d37 !important;
  }

  *>>>.new-table-cancel {
    background-color: #e2515133 !important;
  }

  *>>>.new-table-confirm {
    background-color: #57cb3a26 !important;
  }

  *>>>.new-table-wait-list {
    background-color: #ffa31a3b !important;
  }

  *>>>.new-table-no-available {
    background-color: #dbdbdb75 !important;
  }

  *>>>.font {
    font-size: 11px !important;
  }

  *>>>.fade-enter-active,
  .fade-leave-active {
    transition: opacity 1.3s ease;
  }

  *>>>.fade-enter,
  .fade-leave-to

  /* .component-fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
  }

  *>>>.b-table-row-selected {
    color: #e97725 !important;
    padding-left: 50px;
    /*border-left: solid 7px #e97725 !important;
  border-right: solid 7px #e97725 !important;*/
  }

  *>>>.b-table-row-selected.table-warning {
    background-color: #fff9e8 !important;
  }

  *>>>.table>tbody>tr.b-table-row-selected,
  .table>tbody>tr.b-table-row-selected>td,
  .table>tbody>tr.b-table-row-selected>th {
    background-color: #f8f8f8 !important;
  }

  *>>>.table>tbody>tr>td {
    vertical-align: middle !important;
    padding: 0.3rem 0.1rem !important;
    font-size: 0.7rem;
    font-weight: 600;
    text-align: center;
    color: #636363;
  }

  *>>>.table {
    color: #909090 !important;
    font-weight: 600;
    border: 0 !important;
  }

  *>>>.table>tbody>tr>td>span>.fa,
  .fas {
    font-size: 0.9rem;
  }

  /* * >>>.table .thead-light th {
  background: transparent !important;
    color: #4d4d4d;
    font-size: 0.72rem;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 9px;
    font-weight: 500;
} */
  *>>>.table th,
  .table td {
    /*padding: .20rem !important;*/
  }

  *>>>.table.b-sevices th {
    background-color: transparent !important;
    border: 0 !important;
    color: transparent !important;
    padding: 0 !important;
    border-color: transparent !important;
    height: 0 !important;
    content: " " !important;
    line-height: 0 !important;
  }

  *>>>.table td.td-sep {
    padding: 0.3rem 0.1rem !important;
    color: #636363 !important;
    border-color: #f8f8f8 !important;
    border-top: 6px solid #f8f8f8 !important;
    border-bottom: 1px solid #f3f3f3 !important;
  }

  *>>>.table tr:first-child td.td-sep {
    border-top: 1px solid #fff !important;
  }

  *>>>.table td.td-drop {
    background: #f9f9f9;
    -webkit-box-shadow: 1px 0 0px 0 #f9eded;
    box-shadow: 1px 0 0px 0 #f9eded;
    border-top: 0;
  }

  *>>>.table-cabecera .table-responsive {
    margin-bottom: 0 !important;
  }

  *>>>.table-cabecera .table {}

  *>>>.table-cabecera .table th {
    color: #8b8b8b !important;
    font-size: 0.7rem;
    text-align: center;
    padding: 0.3rem 0.1rem 0.2rem;
    font-weight: 600;
    border-bottom: 0 !important;
    border-top: 0 !important;
  }




</style>
