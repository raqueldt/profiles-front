<template>

  <div>

    <template v-if="isLoading">

      <b-card>
        <b-skeleton animation="fade" width="85%"></b-skeleton>
        <b-skeleton animation="fade" width="55%"></b-skeleton>
        <b-skeleton animation="fade" width="70%"></b-skeleton>
      </b-card>

    </template>

    <template v-else>


      <!-- empty/disabled state -->
      <template v-if="isDisabled">
        <b-row>
          <b-col>
            <b-card>
              <b-card-body class="text-center">
                <b-card-title>
                  <h1>Invoice not found</h1>
                </b-card-title>

                <b-card-text>
                  The confirmation documents will be available when the invoice is generated for the total value of the confirmation

                  <center>
                    <b-list-group class="w-50 expanded-group-item-mobile mt-2">
                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        Total confirmation value:
                        <span class="h6">{{totalesConfirmacion.total | currency('$', 2, { spaceBetweenAmountAndSymbol: true })}}</span>
                      </b-list-group-item>

                      <b-list-group-item class="d-flex justify-content-between align-items-center"
                        v-if="totalesConfirmacion.total != totalInvoices.totalInvoices && totalInvoices.totalInvoices != 0">
                        Total invoices generated:
                        <span class="h6">{{totalInvoices.totalInvoices | currency('$', 2, { spaceBetweenAmountAndSymbol: true })}}</span>
                      </b-list-group-item>

                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        Remaining: 
                        <b class="h5 font-weight-bold">{{totalesConfirmacion.total - totalInvoices.totalInvoices | currency('$', 2, { spaceBetweenAmountAndSymbol: true })}}</b>
                      </b-list-group-item>
                    </b-list-group>
                  </center>

                </b-card-text>

                <b-button variant="primary" squared @click.prevent="showModalCreateInvoice">Create invoice</b-button>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>

      </template>


      <!-- data section  -->
      <template v-else>

        <b-row class="align-items-center  h-100">
          <!--pre>{{summaryDetails}}</pre
                    {{this.cofId}} {{this.sendbokId}}-->
          <b-col>
            <div class="border-contenttab pt-2 pl-2 pr-2">
              <b-tabs nav-class="separator-tabs mt-3 ml-3 mr-3 mb-4" content-class="tab-content">

                <b-tab title="Confirmation">
                  <div class="text-center" v-if="!isLoadingRow">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow" variant="primary">
                    </b-spinner>
                  </div>
                  <div v-else>
                    <b-colxx lg="10" class="m-auto" v-if="Boolean(summaryDetails)"
                      :class="parseFloat(totalesConfirmacion.total).toFixed(2)==parseFloat(totalInvoices.totalInvoices).toFixed(2) ? '' : 'not-enabled'">

                      <b-table-simple hover small bordered responsive v-b-tooltip.hover
                        :title="parseFloat(totalesConfirmacion.total).toFixed(2)==parseFloat(totalInvoices.totalInvoices).toFixed(2) ? '' : $t('gps.message_confirmations')">
                        <b-thead class="text-center">
                          <b-tr>
                            <b-th class="bg-light">{{$t('gps.status')}}</b-th>
                            <b-th class="bg-light">{{$t('gps.date_created')}}</b-th>
                            <b-th class="bg-light">{{$t('gps.user')}}</b-th>
                            <b-th class="bg-light">{{$t('gps.amount')}}</b-th>
                            <b-th class="bg-light">{{$t('gps.link')}}</b-th>
                            <b-th class="bg-light">{{$t('gps.actions')}}</b-th>
                          </b-tr>
                        </b-thead>
                        <b-tbody class="text-center">
                          <b-tr>
                            <b-td
                              v-if="parseFloat(totalesConfirmacion.total).toFixed(2)==parseFloat(totalInvoices.totalInvoices).toFixed(2)"
                              class="align-middle pl-3 font-weight-bold" :style="{color:summaryDetails.colorEstado}">
                              {{ summaryDetails.nombreEstado }}
                            </b-td>
                            <b-td v-else class="align-middle pl-3 text-muted font-weight-bold">
                              {{ $t('button.disabled')}}
                            </b-td>
                            <b-td class="text-center align-middle font-weight-bold">
                              {{
                                                            moment(summaryDetails.cofFechaVenta, "YYYY-MM-DD").format(
                                                                "DD MMM YYYY, ddd"
                                                            )
                                                            }}
                            </b-td>
                            <b-td class="text-center align-middle">{{summaryDetails.vendedorName}}
                              {{summaryDetails.vendedorLastName}}</b-td>
                            <b-td class=" font-weight-bold text-primary align-middle pr-3">
                              $ {{ parseFloat(totalesConfirmacion.total).toFixed(2) }}
                            </b-td>
                            <b-td class="text-center align-middle">

                              <b-button id="tool-confirmation" :disabled='isDisabled' variant="link"
                                @click="downloadConfirmation(summaryDetails.cofId)" class="p-0">
                                <i class="far fa-file-pdf" style="font-size:1.2rem"></i>
                              </b-button>
                              <b-tooltip target="tool-confirmation" placement="left"
                                :title="$t('gps.download_cofirmation')">
                              </b-tooltip>
                            </b-td>
                            <b-td class="text-center align-middle">

                              <b-button id="tool-confirmationmail" variant="link" @click="sendConfirmation()"
                                :disabled='isDisabled' class="p-0">
                                <i class="fas fa-paper-plane" v-if="summaryDetails.cofCorreoEnviado==null" :class="
                                                                parseFloat(totalesConfirmacion.total).toFixed(2)==parseFloat(totalInvoices.totalInvoices).toFixed(2)
                                                                ? 'text-info': 'text-muted'"
                                  style="font-size:1rem"></i>
                                <i v-else class="mt-1 fas fa-envelope-open" :class="
                                                                parseFloat(totalesConfirmacion.total).toFixed(2)==parseFloat(totalInvoices.totalInvoices).toFixed(2)
                                                                ? 'text-success': 'text-muted'"
                                  style="font-size:1rem"></i>
                              </b-button>
                              <b-tooltip target="tool-confirmationmail" placement="left"
                                :title="$t('gps.send_confirmation')">
                              </b-tooltip>
                            </b-td>
                          </b-tr>
                        </b-tbody>
                      </b-table-simple>


                    </b-colxx>
                  </div>
                </b-tab>

                <b-tab title="Travel voucher">
                  <div class="text-center" v-if="!isLoadingRow">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow" variant="primary">
                    </b-spinner>
                  </div>
                  <div v-else>
                    <!--pre>{{voucheDetails}}</pre-->
                    <b-colxx lg="10" class="m-auto" v-if="Boolean(voucheDetails)"
                      :class="parseFloat(totalesConfirmacion.total).toFixed(2)==parseFloat(totalInvoices.totalInvoices).toFixed(2) ? '' : 'not-enabled'">
                      <b-table-simple hover small bordered responsive v-b-tooltip.hover
                        :title="parseFloat(totalesConfirmacion.total).toFixed(2)==parseFloat(totalInvoices.totalInvoices).toFixed(2) ? '' : $t('gps.message_confirmations')">
                        <b-thead class="text-center">
                          <b-tr>
                            <b-th class="bg-light">{{$t('gps.date_created')}}</b-th>
                            <b-th class="bg-light">{{$t('gps.user')}}</b-th>
                            <b-th class="bg-light">{{$t('gps.amount')}}</b-th>
                            <b-th class="bg-light">{{$t('gps.link')}}</b-th>
                            <b-th class="bg-light">{{$t('gps.actions')}}</b-th>
                          </b-tr>
                        </b-thead>
                        <b-tbody class="text-center">
                          <b-tr>
                            <b-td class="text-center align-middle font-weight-bold">
                              {{ moment(voucheDetails.confirmacion.cofFechaVenta, "YYYY-MM-DD").format("DD MMM YYYY, ddd")}}
                            </b-td>
                            <b-td class="text-center align-middle">{{voucheDetails.confirmacion.vendedorName}}
                              {{voucheDetails.confirmacion.vendedorLastName}}</b-td>
                            <b-td class=" font-weight-bold text-primary align-middle pr-3">
                              $ {{ parseFloat(totalesConfirmacion.total).toFixed(2) }}
                            </b-td>
                            <b-td class="text-center align-middle">

                              <b-button id="tool-vaucher" :disabled='isDisabled' variant="link"
                                @click="downloadVouchers(voucheDetails.confirmacion.cofId)" class="p-0">
                                <i class="far fa-file-pdf" style="font-size:1.2rem"></i>
                              </b-button>
                              <b-tooltip target="tool-vaucher" placement="left" :title="$t('gps.download_voucher')">
                              </b-tooltip>
                            </b-td>
                            <b-td class="text-center align-middle">

                              <b-button id="tool-vauchermail" variant="link" @click="sendVoucher()"
                                :disabled='isDisabled' class="p-0">
                                <i class="fas fa-paper-plane" v-if="voucheDetails.cofCorreoEnviado==null" :class="
                                                                parseFloat(totalesConfirmacion.total).toFixed(2)==parseFloat(totalInvoices.totalInvoices).toFixed(2)
                                                                ? 'text-info': 'text-muted'"
                                  style="font-size:1rem"></i>
                                <i v-else class="mt-1 fas fa-envelope-open" :class="
                                                                parseFloat(totalesConfirmacion.total).toFixed(2)==parseFloat(totalInvoices.totalInvoices).toFixed(2)
                                                                ? 'text-success': 'text-muted'"
                                  style="font-size:1rem"></i>
                              </b-button>
                              <b-tooltip target="tool-vauchermail" placement="left" :title="$t('gps.send_voucher')">
                              </b-tooltip>
                            </b-td>
                          </b-tr>
                        </b-tbody>
                      </b-table-simple>


                    </b-colxx>
                  </div>
                  <div v-if="sendmail" class="text-center" style="float: center">
                    <cube v-bind:loading="sendmail"> </cube>
                    <h5 class="quote-pdf-atcref">
                      <strong>Send Quote <i class="glyph-icon iconsminds-mail-send"></i>
                      </strong>
                    </h5>
                  </div>
                </b-tab>

                <b-tab :title="$t('menu.invoice')">
                  <invoice-documents :cofId="cofId"></invoice-documents>
                </b-tab>

                <template #tabs-end>
                  <div class="col-lg-12 mb-2 align-self-center mx-auto">

                    <button class="btn btn-header-light icon-button float-right ml-2" size="sm" @click="initMethod()">
                        <i class="simple-icon-refresh" />
                    </button>

                    <b-button :variant="
                                    parseFloat(totalesConfirmacion.total).toFixed(2)==parseFloat(totalInvoices.totalInvoices).toFixed(2)
                                    ? 'outline-primary': 'outline-light'" size="sm" class="float-right mt-1"
                      @click="generarConfVoucher()" :disabled='isDisabled'>
                      Generate confirmations and vouchers
                    </b-button>
                  </div>
                </template>
              </b-tabs>
            </div>
          </b-col>


        </b-row>



      </template>



    </template>

    <!--  modal new invoice -->
    <b-modal id="modal-create-invoice" ref="modal-create-invoice" :title="$t('menu.new-invoice')"
      modal-class="modal-right">
      <new-invoice :cofId="this.cofId" :totalInvoices="totalInvoices.totalInvoices" totalamout=0
        @closeModalNewInvoice="hideModalAndRefresh"></new-invoice>
      <template slot="modal-footer">
        <b-button variant="secondary default" @click="hideModalCreateInvoice">Close</b-button>
      </template>
    </b-modal>

  </div>
</template>

<script>
  import Vuetable from 'vuetable-2/src/components/Vuetable'
  import VuetablePaginationBootstrap from '../../../../../components/Common/VuetablePaginationBootstrap'
  import ConfirmacionesSummaryServices from "../../../../../services/gps/confirmacion/ConfirmacionServices"
  import ConfirmacionesServices from "../../../../../services/gps/confirmacion/ConfirmacionServices";
  import InvoiceServices from "../../../../../services/gps/invoice/InvoiceServices";
  import moment from "moment";
  import Axios from 'axios';
  import Conf from '../../../../../services/conf.js';
  const axios = require('axios');
  const resource = '/api/confirmacion/'
  const server = Conf.servergps;
  export default {
    name: 'documents',
    props: ["cofId"],
    components: {
      'vuetable': Vuetable,
      'vuetable-pagination-bootstrap': VuetablePaginationBootstrap
    },

    data() {
      return {

        isLoading: true,


        sendmail: false,
        totalesConfirmacion: [],
        totalInvoices: [],
        isLoadingRow: false,
        /*items: [
            { type: 'Active', date_created: 'Mon, 03-22-2021', user: 'Administrador', Amount:'USD 20019', link: ''},
        ],*/
        summaryDetails: [],
        voucheDetails: [],
        isModeEndRequest: true,
        routesnodestroy: true,
        fields: [{
            key: '_type',
            label: 'Type',
            tdClass: "text-success pl-3",
            thClass: "text-center"
          },
          {
            key: 'cofFechaVenta',
            label: 'Date Created',
            tdClass: "text-center",
            thClass: "text-center"
          },
          {
            key: 'vendedorName',
            tdClass: "text-center",
            thClass: "text-center"
          },
          //{ key: 'Amount', tdClass: "text-right pr-3", thClass: "text-center"},
          {
            key: '_link',
            label: 'Link',
            thClass: "text-center",
            tdClass: "text-center"
          }
        ],
        bokId: [],
      }
    },

    computed: {
      user() {
        return this.$root.$loggedUserId
      },

      isDisabled: function () {

        return !(parseFloat(this.totalInvoices.totalInvoices).toFixed(2) === parseFloat(this.totalesConfirmacion
          .total).toFixed(2))

      },

      sendbokId: function () {
        let bokId;
        let cont = this.bokId.length;
        for (let i = 0; i < cont; i++) {
          bokId = this.bokId[i].bokId;
        }
        return bokId;
      }
    },

    methods: {

      async totalConfirmacion() {

        const {
          data
        } = await ConfirmacionesServices.totalesConfirmacion(this.cofId)
        this.totalesConfirmacion = data

      },

      async totalInvoice() {

        const {
          data: {
            data
          }
        } = await InvoiceServices.totalInvoices(this.cofId)
        this.totalInvoices = data

      },

      async documentConfirmation() {

        this.isLoadingRow = false;

        const cofId = this.cofId;

        const {
          data: {
            data
          }
        } = await ConfirmacionesSummaryServices.documentConfirmation(cofId)

        this.summaryDetails = data
        this.bokId = []

        this.summaryDetails.confirmacion_detalle.forEach((item) => {

          if (item.bokId != null) {
            let item_confirmacion_detalle = {
              bokId: item.bokId
            }
            this.bokId.push(item_confirmacion_detalle);
          }

        });

        let cotId = this.summaryDetails.cotId;
        this.$emit('cotId', cotId)

        this.isLoadingRow = true;

        /*   console.log("created adata", data); */
      },

      async documentVouchers() {
        this.isLoadingRow = false;
        const cofId = this.cofId;
        const {
          data: {
            data
          }
        } = await ConfirmacionesSummaryServices.documentVouchers(cofId)
        this.voucheDetails = data
        let cotId = this.voucheDetails.cotId
        this.$emit('cotId', cotId)
        this.isLoadingRow = true
      },

      downloadConfirmation(cofId) {
        let routeData = server + resource + `download-confirmation/` + cofId + `/` + this.sendbokId;
        window.open(routeData);
      },

      downloadVouchers(cofId) {
        let routeData = server + resource + `download-voucher/` + cofId + `/` + this.sendbokId;
        window.open(routeData);
      },

      sendConfirmation() {
        this.$swal({
          iconHtml: '<i class="fas fa-paper-plane text-muted"></i>',
          customClass: {
            icon: 'border-0 small m-3 ml-auto mr-auto',
            input: 'form-control mt-1',
            title: 'p-1',
            confirmButton: 'btn btn-sm',
            cancelButton: 'btn btn-sm',
          },
          showCancelButton: true,
          confirmButtonText: "Send Confirmartion",
          confirmButtonColor: "#ED7117",
          title: "<h2>Enter email address!</h2>",
          input: "email",
          // inputValue:this.detallecotizacionheader["cotCorreoCliente"],
          showCancelButton: true,
          showLoaderOnConfirm: true,
          preConfirm: (email) => {},
        }).then((result) => {
          //console.log(result.value+'email');
          const mail = result.value;
          //PENDIENTE CREACION DE API QUE RECIBA EL CORREO PARA ACTUALIZAR EN EL CAMPO DE COTIZACION
          if (result.isConfirmed) {
            this.sendmail = true;

            ConfirmacionesSummaryServices.sendConfirmation(this.cofId, mail, this.user, this.sendbokId)
              .then((response) => {
                let mensaje = response.data.data;
                if (mensaje == 200) {
                  var type = "success filled";
                  var title = "Send Confirmation";
                  var message = "Succesful";
                  this.$notify(type, title, message, {
                    duration: 3000,
                    permanent: false,
                  });
                  this.sendmail = false;
                } else {
                  var title = "Category";
                  var message = "NO add";
                  this.$notify(type, title, message, {
                    duration: 3000,
                    permanent: false,
                  });
                }
              })
              .catch((error) => {
                console.log("Error: " + error);
              });
          }
        });
      },

      sendVoucher() {
        this.$swal({
          iconHtml: '<i class="fas fa-paper-plane text-muted"></i>',
          customClass: {
            icon: 'border-0 small m-3 ml-auto mr-auto',
            input: 'form-control mt-1',
            title: 'p-1',
            confirmButton: 'btn btn-sm',
            cancelButton: 'btn btn-sm',
          },
          showCancelButton: true,
          confirmButtonText: "Send Voucher",
          confirmButtonColor: "#ED7117",
          title: "<h2>Enter email address ! </h2>",
          input: "email",
          // inputValue:this.detallecotizacionheader["cotCorreoCliente"],
          showCancelButton: true,
          showLoaderOnConfirm: true,
          preConfirm: (email) => {},
        }).then((result) => {
          //console.log(result.value+'email');
          const mail = result.value;
          //PENDIENTE CREACION DE API QUE RECIBA EL CORREO PARA ACTUALIZAR EN EL CAMPO DE COTIZACION
          if (result.isConfirmed) {
            this.sendmail = true;
            ConfirmacionesSummaryServices.sendVoucher(this.cofId, mail, this.user, this.sendbokId)
              .then((response) => {
                let mensaje = response.data.data;
                if (mensaje == 200) {
                  var type = "success filled";
                  var title = "Send Voucher";
                  var message = "Succesful";
                  this.$notify(type, title, message, {
                    duration: 3000,
                    permanent: false,
                  });
                  this.sendmail = false;
                } else {
                  var title = "Category";
                  var message = "NO add";
                  this.$notify(type, title, message, {
                    duration: 3000,
                    permanent: false,
                  });
                }
              })
              .catch((error) => {
                console.log("Error: " + error);
              });
          }
        });
      },

      generarConfVoucher() {
        this.$swal({
          iconHtml: '<i class="fas fa-paper-plane text-muted"></i>',
          customClass: {
            icon: 'border-0 small m-3 ml-auto mr-auto',
            input: 'form-control mt-1',
            title: 'p-1',
            confirmButton: 'btn btn-sm',
            cancelButton: 'btn btn-sm',
          },
          showCancelButton: true,
          confirmButtonText: "Send Confirmartion",
          confirmButtonColor: "#ED7117",
          title: "<h2>Enter email address to send confirmation!</h2>",
          input: "email",
          // inputValue:this.detallecotizacionheader["cotCorreoCliente"],
          showCancelButton: true,
          showLoaderOnConfirm: true,
          preConfirm: (email) => {},
        }).then((result) => {
          //console.log(result.value+'email');
          const mail = result.value;
          //PENDIENTE CREACION DE API QUE RECIBA EL CORREO PARA ACTUALIZAR EN EL CAMPO DE COTIZACION
          if (result.isConfirmed) {
            this.sendmail = true;

            ConfirmacionesSummaryServices.generarConfVoucher(this.cofId, mail, this.user, this.sendbokId)
              .then((response) => {
                let mensaje = response.data.data;
                if (mensaje == 200) {
                  var type = "success filled";
                  var title = "Send Confirmation & Voucher";
                  var message = "Succesful";
                  this.$notify(type, title, message, {
                    duration: 3000,
                    permanent: false,
                  });
                  this.sendmail = false;
                } else {
                  var title = "Category";
                  var message = "NO add";
                  this.$notify(type, title, message, {
                    duration: 3000,
                    permanent: false,
                  });
                }
              })
              .catch((error) => {
                console.log("Error: " + error);
              });
          }
        });
      },


      showModalCreateInvoice() {

        this.$refs['modal-create-invoice'].show()

      },

      async hideModalCreateInvoice() {

        await this.$refs['modal-create-invoice'].hide()
        
      },

      async hideModalAndRefresh(){
        await this.$refs['modal-create-invoice'].hide()
        await this.initMethod();
      },

      async initMethod() {
        this.isLoading = true
        await this.documentConfirmation()
        await this.documentVouchers()
        await this.totalConfirmacion()
        await this.totalInvoice()
        this.isLoading = false
      }
    },

    async created() {
      await this.initMethod();
    },

    mounted() {


    },

  }

</script>
<style scoped>
  .not-enabled {
    opacity: .45;
  }

  .not-enabled:hover {
    cursor: not-allowed !important;
  }

  .popover,
  .tooltip {
    top: -100px !important;
  }

</style>
