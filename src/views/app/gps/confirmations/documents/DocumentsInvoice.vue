<template>
    <div>
        <b-colxx lg="12">
            <div class="position-absolute card-top-buttons">
                <button class="btn btn-header-light icon-button"  @click="updatedInvoice()">
                    <i class="simple-icon-refresh" />
                </button>
            </div>
            <b-row>
                <b-card class="col-lg-10 m-auto pt-3 pb-3" no-body>
                    <b-row>
                        <b-colxx lg="9">
                            <div v-if="totalAmount > 0">
                                <strong>
                                    Total Invoice<span v-if="invoceDetails_list.length > 1">s</span> {{$t('gps.amount')}}:
                                    <span
                                    :class="
                                    [(totalAmount >  parseFloat(precioValor).toFixed(2) ? 'text-danger': 'text-success'),
                                    (totalAmount <  parseFloat(precioValor).toFixed(2) ? 'text-dark': '')]">
                                    USD {{parseFloat(totalAmount).toFixed(2)}}
                                    </span>
                                    <i v-if="totalAmount == parseFloat(precioValor).toFixed(2)" class="ml-1 text-success fas fa-check-circle"></i>
                                    <i v-else-if="totalAmount > parseFloat(precioValor).toFixed(2)" class="ml-1 text-danger fas fa-times-circle"></i>
                                </strong> <br>
                                <div class="small text-primary font-weight-bold">
                                   {{$t('gps.sale_price')}}: USD {{
                                       parseFloat(precioValor).toFixed(2)
                                       }}
                                </div>

                                <div v-if="totalAmount > parseFloat(precioValor).toFixed(2)" style="line-height: 12px;">
                                    <span class="small text-danger font-weight-bold">{{$t('gps.value_invoice_exd')}}
                                    </span>
                                    <span class="small font-weight-bold" >
                                        {{$t('gps.value_invoice_exd_1')}}
                                    </span>
                                </div>
                                <div v-else>
                                    <div class="small text-muted font-weight-bold">
                                   {{$t('gps.remaining')}}: USD
                                        {{parseFloat(precioValor-totalAmount).toFixed(2)}}
                                </div>
                                </div>
                            </div>
                            <div v-else>
                                <strong>{{$t('gps.new_invoice')}}</strong>  <br>
                               <div class="small text-primary font-weight-bold">
                                   {{$t('gps.sale_price')}}: USD {{
                                       parseFloat(precioValor).toFixed(2)
                                       }}
                                </div>
                            </div>
                        </b-colxx>
                        <b-colxx lg="3">
                            <b-row class="float-right">
                                <b-button v-b-modal.modalnewinvoice variant="outline-primary" size="sm" class="mr-4"
                                :style="
                                   totalAmount >= parseFloat(precioValor).toFixed(2) ? {'pointer-events': 'none !important','opacity':'.65'}: ''">
                                    {{ $t('menu.new-invoice') }}
                                </b-button>
                                <!--b-button variant="info default" size="xs"  class="mr-1"
                                :class="(totalAmount == 0 ) || (totalAmount > invoceDetails.confirmacion[0].total_confirmacion) ? 'd-none': ''">
                                    Send Invoices
                                </b-button>
                                <b-button variant="light default" size="xs" class="mr-4"
                                :class="(totalAmount == 0 ) || (totalAmount > invoceDetails.confirmacion[0].total_confirmacion) ? 'd-none': ''">
                                    Dowload Invoices
                                </b-button-->
                            </b-row>
                        </b-colxx>
                    </b-row>
                </b-card>
            </b-row>
            <b-row class="mt-4">
                <div class="text-center col-lg-12" v-if="!isLoadingRow">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow" variant="primary"></b-spinner>
                </div>
                <div v-else class="col-lg-12">
                   <!--pre>{{voucheDetails}}</pre-->
                    <b-colxx lg="10" class="m-auto" v-if="Boolean(invoceDetails)">
                        <b-table-simple hover small bordered responsive>
                            <b-thead class="text-center">
                                <b-tr>
                                    <b-th class="bg-light">#</b-th>
                                    <b-th class="bg-light">{{$t('gps.date_created')}}</b-th>
                                    <b-th class="bg-light">{{$t('gps.user')}}</b-th>
                                    <b-th class="bg-light">{{$t('gps.detail')}}</b-th>
                                    <b-th class="bg-light">{{$t('gps.amount')}}</b-th>
                                    <b-th class="bg-light">{{$t('gps.status')}}</b-th>
                                    <b-th class="bg-light">{{$t('gps.link')}}</b-th>
                                    <b-th class="bg-light">{{$t('gps.actions')}}</b-th>
                                </b-tr>
                            </b-thead>
                            <b-tbody class="text-center">
                                <b-tr v-for="(item, index) in invoceDetails.detalle" :key="index"
                                :class="item.invAnulada===0 ? '': 'anulada'">
                                    <b-td>
                                        {{item.numinvoice}}
                                    </b-td>
                                    <b-td class="text-center align-middle"
                                     :class="item.invAnulada===0 ? 'font-weight-bold': 'font-weight-normal'">
                                        {{
                                        moment(item.invFecha, "YYYY-MM-DD").format(
                                            "MMM DD YYYY, ddd"
                                        )
                                        }}
                                    </b-td>
                                    <b-td class="text-center align-middle">{{item.usuarioVendedor}}</b-td>
                                    <b-td class="align-middle">
                                        {{item.invConcepto}}
                                    </b-td>
                                    <b-td class=" align-middle pr-3 text-right mr-2"
                                    :class="item.invAnulada==0 ? 'font-weight-bold text-primary': ''">
                                        USD {{ parseFloat(item.invValor).toFixed(2) }}
                                    </b-td>
                                    <b-td class="text-center align-middle">
                                        <div v-if="item.invAnulada==0" class="text-success font-weight-bold">{{$t('gps.active-rate')}}</div>
                                        <div v-else>{{$t('gps.inoice_cancel')}}</div>
                                    </b-td>
                                    <b-td class="text-center align-middle">

                                        <b-button :id="'tool-download-'+item.invId" variant="link" class="p-0" @click="downloadInvoices(cofId, item.invId)"
                                        :style="
                                            totalAmount > parseFloat(precioValor).toFixed(2) ? {'pointer-events': 'none !important','opacity':'.65'}: ''">
                                            <i class="far fa-file-pdf"
                                            :class="item.invAnulada==0 ? 'text-primary': 'text-muted' " style="font-size:1.2rem"></i>
                                        </b-button>
                                        <b-tooltip :target="'tool-download-'+item.invId"
                                                placement="left"
                                                title="Download invoice">
                                        </b-tooltip>
                                    </b-td>
                                    <b-td class="text-center align-middle">
                                        <b-button
                                        @click="
                                        item.invAnulada==1 ? '' :
                                        $bvModal.show('modaleditinvoice'+item.invId), sendInfo(item.invId)"
                                        :id="'tool-edit-'+item.invId" variant="link" class="p-0">
                                                        <i class="mr-2"
                                                        :class="item.invAnulada==0 ?
                                                        'fas fa-pencil-alt text-muted': 'fas fa-ban text-muted' "
                                                        style="font-size:.95rem"></i>
                                        </b-button>
                                         <b-tooltip v-if="item.invAnulada==0" :target="'tool-edit-'+item.invId"
                                                placement="right"
                                                title="Edit Invoice">
                                        </b-tooltip>

                                        <b-button :id="'tool-anular-'+item.invId" variant="link" class="p-0" @click="sendInvoce(item.invId)"
                                        :style="
                                            totalAmount > parseFloat(precioValor).toFixed(2) ? {'pointer-events': 'none !important','opacity':'.65'}: ''">
                                                        <i
                                                        v-if="item.invCorreoEnviado==null"
                                                        class="mt-1"
                                                        :class="item.invAnulada==0 ?
                                                        'fas fa-paper-plane text-info':
                                                        'fas fa-ban' " style="font-size:1rem"></i>
                                                        <i
                                                        v-else
                                                        class="mt-1"
                                                        :class="item.invAnulada==0 ?
                                                        'fas fa-envelope-open text-success':
                                                        'fas fa-ban' " style="font-size:1rem"></i>
                                        </b-button>
                                         <b-tooltip v-if="item.invAnulada==0 && item.invCorreoEnviado==null" :target="'tool-anular-'+item.invId"
                                                placement="right"
                                                title="Send Invoice">
                                        </b-tooltip>
                                        <b-tooltip v-else :target="'tool-anular-'+item.invId"
                                                placement="right"
                                                title="Invoice sent">
                                        </b-tooltip>

                                    </b-td>
                                    <b-modal :id="'modaleditinvoice'+item.invId" ref="modaleditinvoice" :title="$t('menu.edit-invoice')" modal-class="modal-right">
                                    <edit-invoice :cofId="cofId" :invId='selectedinvId' @updatedInvoice="updatedInvoice"></edit-invoice>
                                     <template slot="modal-footer">
                                        <b-button variant="secondary default" @click="hideModal2('modaleditinvoice'+item.invId)">Close</b-button>
                                    </template>
                                </b-modal>
                                </b-tr>
                            </b-tbody>
                        </b-table-simple>

                    </b-colxx>
                </div>
                <!--div v-if="sendmail" class="text-center" style="float: center">
                    <cube v-bind:loading="sendmail"> </cube>
                    <h5 class="quote-pdf-atcref">
                    <strong
                        >Send Quote <i class="glyph-icon iconsminds-mail-send"></i>
                    </strong>
                    </h5>
                </div-->
            </b-row>
        </b-colxx>

        <b-modal id="modalnewinvoice" ref="modalnewinvoice" :title="$t('menu.new-invoice')" modal-class="modal-right">            
                <new-invoice :cofId="this.cofId" :totalamout="this.totalAmount" @updatedInvoice="updatedInvoice" @closeModalNewInvoice="hideModal('modalnewinvoice')"></new-invoice>
                <template slot="modal-footer">
                    <b-button variant="secondary default" @click="hideModal('modalnewinvoice')">Close</b-button>
                </template>
        </b-modal>

    </div>
</template>
<script>
    import Vuetable from 'vuetable-2/src/components/Vuetable'
    import VuetablePaginationBootstrap from '../../../../../components/Common/VuetablePaginationBootstrap'
    import ConfirmacionesServices from "../../../../../services/gps/confirmacion/ConfirmacionServices";
    import InvoiceServices from "../../../../../services/gps/invoice/InvoiceServices";
    import moment from "moment";
    
    import Conf from '../../../../../services/conf.js';
    
    const resource = '/api/invoice/'
    const server = Conf.servergps;
    export default {
    name: 'nvoice-documents',
    props: ["cofId"],
    components: {
        'vuetable' : Vuetable,
        'vuetable-pagination-bootstrap' : VuetablePaginationBootstrap
    },
     data () {
        return {
                //totalesConfirmacion: [],
                invoceDetails: [],
                invoceDetails_list:[{id: '', amount: '', anulada: ''}],
                invoceConfirmacion:[],
                selectedinvId:'',
                //user:'',
                //priceTotal:invoceDetails.confirmacion,
                isLoadingRow: false,
                fields: [
                { key: '_type', label:'Type', tdClass: "text-success pl-3", thClass: "text-center" },
                { key: 'cofFechaVenta', label:'Date Created', tdClass: "text-center", thClass: "text-center" },
                { key: 'vendedorName', tdClass: "text-center", thClass: "text-center" },
                //{ key: 'Amount', tdClass: "text-right pr-3", thClass: "text-center"},
                { key: '_link', label:'Link', thClass: "text-center", tdClass: "text-center" }
                ]
            }
        },
    created() {
        //this.documentConfirmation();
        //this.documentVouchers();
        this.showInvoice();
        },
    methods:{
        updatedInvoice() {
            this.showInvoice();
        },
        showInvoice() {
        this.isLoadingRow = false;
        const cofId = this.cofId;
        //const loggedUserId = this.loggedUserId
        InvoiceServices.show(cofId)
          .then(response => {
            this.invoceDetails = response.data.data;
            this.invoceDetails_list = [];

            this.invoceDetails.detalle.forEach((item) => {
                let item_invoices = {
                id: item.invId,
                amount: item.invValor,
                anulada:item.invAnulada,
                };
            this.invoceDetails_list.push(item_invoices);
            });

            this.invoceConfirmacion = [];
            this.invoceDetails.confirmacion.forEach((item) => {
                let item_confirmacion = {
                    price:item.total_confirmacion,
                };
            this.invoceConfirmacion.push(item_confirmacion);
            });
            //console.log(this.invoceConfirmacion);
          })
          .catch(error => {
            console.log("Error: " + error);
          }).finally(() => {
            this.isLoadingRow = true;
          });
      },
      sendInfo(invId) {
        this.selectedinvId = invId;
        //$("#modalnewinvoice"+invId).modal('show');
        if (this.refname === "modaleditinvoice") {
                this.$refs['modaleditinvoice'+invId].show()
            }
         //console.log("item "+invId);
      },
      hideModal (refname) {
        this.$refs[refname].hide()
        //console.log('hide modal:: ' + refname)

        if (refname === 'modalnestedinline') {
            this.$refs['modalnested'].show()
        }
      },
       hideModal2(refname2) {
          this.$root.$emit('bv::hide::modal', refname2, '#btnShow')
      },
        somethingModal (refname) {
            this.$refs[refname].hide()
            //console.log('something modal:: ' + refname)

            if (refname === 'modalnestedinline') {
                this.$refs['modalnested'].show()
            }
        },
        sendInvoce(invId) {
            //const invId = this.invId;
            this.$swal({
            iconHtml: '<i class="fas fa-paper-plane text-muted"></i>',
            customClass: {
                icon: 'border-0 small m-3 ml-auto mr-auto',
                input: 'form-control mt-1',
                title:'p-1',
                confirmButton:'btn btn-sm',
                cancelButton:'btn btn-sm',
            },
            showCancelButton: true,
            confirmButtonText: "Send Invoice",
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
                InvoiceServices.sendInvoce(this.cofId, invId, mail, this.user)
                    .then((response) => {
                    let mensaje = response.data.data;
                    if (mensaje == 200) {
                        var type = "success filled";
                        var title = "Send Invoice";
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
        downloadInvoices(cofId, invId) {
            //const cofId = this.cofId;
            let routeData = server + resource + `download-invoice/`+ cofId + `/` + invId;
            window.open(routeData);
        },
    },
    mounted () {
        //this.totalConfirmacion();
        this.showInvoice();
    },
    watch:{
       /* $loggedUserId(){
            if(Boolean(this.$loggedUserId)) this.loggedUserId=this.$loggedUserId;
        },*/
        /*$loggedUserName(){
          if(Boolean(this.$loggedUserName)) this.loggedUserName=this.$loggedUserName;
        },*/
    },
     computed : {
        totalAmount: function(){
            let sum = 0;
            var totalsum = 0;
            for(let i = 0; i < this.invoceDetails_list.length; i++){
                if(this.invoceDetails_list[i].anulada==0){
                sum += (parseFloat(this.invoceDetails_list[i].amount));
                totalsum = sum.toFixed(2);
                }
            }
            return totalsum;
        },
        precioValor: function(){
            let sum1 = 0;
            for(let i = 0; i < this.invoceConfirmacion.length; i++){
                sum1 = (parseFloat(this.invoceConfirmacion[i].price));
            }
            return sum1;
        },
        user () {
        return this.$root.$loggedUserId
        }
        /*invId: function(){
            let invId = 0;
            for(let i = 0; i < this.invoceDetails_list.length; i++){
                if(this.invoceDetails_list[i].anulada==0){
                invId = this.invoceDetails_list[i].id;
                }
            }
            return invId;
        },*/
     }
}
</script>
