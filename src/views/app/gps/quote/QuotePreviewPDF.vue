<template>
  <div>
    <b-row>
 
      <b-colxx lg="12" class="quote-pdf-bg">
        <b-row>
     <!--       {{detallecotizacion}}  -->
          <b-colxx xs="8" class="p-5 quote-pdf-headerLeft">
            <div>
              <b-colxx class="quote-pdf-title">
                <span>{{ $t("gps.quote") }}</span>
              </b-colxx>
            </div>
            <div class="pt-1 quote-pdf-info">
              <div>
                <span>{{ $t("gps.quote-number") }}</span> #
                <span class="quote-pdf-atcref">{{
                  detallecotizacion[0]["cotCodigo"]
                }}</span>
              </div>
              <div>
                <span>Quote Date:</span>
                {{ detallecotizacion[0]["created_at"] }}
              </div>
            </div>
            <div class="pt-3 quote-pdf-client">
              <div class="quote-pdf-quoteTo">Quote to</div>
              <div class="quote-pdf-quoteClient"></div>
              <div class="pt-2">
                <span>Your Reference:</span
                >{{ detallecotizacion[0]["cotReferencia"] }}
              </div>
              <div></div>
              <div><span>SM:</span></div>
              <div><span>M:</span></div>
            </div>
          </b-colxx>
          <b-colxx xs="4" class="quote-pdf-headerRight">
            <div class="quote-pdf-headerBg">
              <div class="quote-pdf-headerLogo"></div>
            </div>
          </b-colxx>
        </b-row>
        <div class="row quote-pdf-tableBg pl-5 pr-5">
          <b-table
            responsive
            hover
            striped
            noCollapse
            :fields="bootstrapTable1.fields"
            :items="detallecotizacion[0]['cotizacionDetalle']"
            :empty-text="'No data!'"
            ref="custom-table"
            class="vuetable quote-pdf-table"
            sort-by="title"
            sort-desc.sync="false"
          >
            <template #cell(index)="data">
              {{ data.index + 1 }}
            </template>
            <template #cell(codConcepto)="data">
              <strong>Dates:</strong>
              {{
                moment(
                  detallecotizacion[0]["cotizacionDetalle"][data.index][
                    "codFechaInicio"
                  ],
                ).format("DD MMM YYYY, ddd h:mm ")}}ECT
              - <br /><small>
                {{
                  detallecotizacion[0]["cotizacionDetalle"][data.index][
                    "codConcepto"
                  ]
                }}</small
              >
            </template>
            <template #cell(total)="data">
              ${{
                detallecotizacion[0]["cotizacionDetalle"][data.index][
                  "total_paxput"
                ]
              }}
            </template>
          </b-table>
        </div>



           <div class="row">
            <b-colxx xs="8" class="quote-pdf-summaryLeft pl-5">
              <div class="pay-method">Payment Method</div>
              <div><span>40%:</span> Lorem Ipsum is simply dummy text</div>
              <div><span>100%:</span> Lorem Ipsum is simply dummy text</div>
            </b-colxx>
            <b-colxx xs="4 quote-pdf-summaryRight d-flex flex-row pt-1">
               <div class="summary">
                <div>Sub Total Rate</div>
            <!--     <div v-if="detallecotizacion[0]['cotCruceroDescuentoExtra']>0">Extra Discount</div>
             -->   <div v-if="detallecotizacion[0]['cotCruceroDescuentoNinos']>0" >Children Discount</div>
                <div >Subtotal</div>  
                <div v-if="detallecotizacion[0]['imdPorcentaje']>0" >Tax: IVA {{ detallecotizacion[0]["imdPorcentaje"] }}%</div>
                
              </div>
                   <div class="summary-prices">
                  <div>${{(subTotal).toFixed(2)}}</div> 
            <!--      <div v-if="detallecotizacion[0]['cotCruceroDescuentoExtra']>0">$  {{ detallecotizacion[0]["cotCruceroDescuentoExtra"] }}</div>
             -->     <div v-if="detallecotizacion[0]['cotCruceroDescuentoNinos']>0" >$  {{ detallecotizacion[0]["cotCruceroDescuentoNinos"] }}</div>
              <div>${{(getSubtotal).toFixed(2)}}</div> 
              <div v-if="detallecotizacion[0]['imdPorcentaje']>0">${{(getValueIva).toFixed(2)}}</div> 
              </div>
      
            </b-colxx>
          </div>


   <div class="row quote-pdf-terms pl-5">
             <b-colxx xs="6" class="p-2">
             </b-colxx>
             <b-colxx xs="2" class="p-0 quote-pdf-termWhiteSpace">
               White space
             </b-colxx>
             <b-colxx xs="5" class="p-0 quote-pdf-grand">
             </b-colxx>
           </div>
           <div class="row quote-pdf-terms pl-5">
             <b-colxx xs="6" class="p-0 title">
               Terms & Conditions:
             </b-colxx>
             <b-colxx xs="2" class="p-0 quote-pdf-termSpace">
             </b-colxx>
             <b-colxx xs="5" class="p-0 quote-pdf-grand d-flex flex-row pt-1">
               <div>Grand Total</div>
                 <div class="pl-5 quote-pdf-grandTotal">${{(getGrandTotal).toFixed(2)}}</div>
             </b-colxx>
           </div>
           <div class="row">
            <b-colxx xs="8" class="pl-5">
              <div class="p-4">Lorem Ipsum is simply dummy text of the printing and  industry. Lorem Ipsum has been the industry's</div>
            </b-colxx>
            <b-colxx xs="4 quote-pdf-summaryRight">
            </b-colxx>
          </div>
   
  <div class="row">
            <b-colxx xs="8" class=" pl-5">
              <div></div>
            </b-colxx>
            <b-colxx xs="4">
              <div class="p-3 quote-pdf-thanks">Thanks For Your Order</div>
            </b-colxx>
          </div>
          <div class="row">
            <b-colxx xs="6" class="quote-pdf-phones pl-5 d-flex flex-row">
              <div class="d-flex flex-row"> 
                <div class="glyph-icon simple-icon-phone"></div>
                <div>
                  <div>+(593) 2 222 8385</div>
             <div>+(593) 2 222 8487 </div>
                </div>
              </div>
             <div class="d-flex flex-row"> 
                <div class="glyph-icon simple-icon-globe"></div>
                <div>
                  <div>www.andeantc.com</div>
                  <div>enquiries@andeantc.com</div>
                </div>
              </div>
            </b-colxx>
            <b-colxx xs="6" class="quote-pdf-place">
              <div class="d-flex flex-row">
                <div class="glyph-icon simple-icon-location-pin"></div>
                <div>Guipuzcoa E13-117 y Lugo - La Floresta Quito, Ecuador</div>
              </div>
            </b-colxx>
          </div>
          <div class="row">
            <a class="btn btn-primary default btn-xs" @click="changestatusdestroy" href="javascript:history.go(-1)"> <i class="glyph-icon iconsminds-arrow-left"></i>Go Back</a>
             <a class="btn btn-primary default btn-xs"  @click="sendQuotescot()"> <i class="glyph-icon iconsminds-mail-block"></i>SEND QUOTE</a>
           
            <!--  <a class="btn btn-primary default btn-xs"  > <i class="glyph-icon iconsminds-mail-block"></i>Send Quote</a-->
          
           </div>
    </b-colxx>
  </b-row>

</div>
</template>
 
<script>
/* *** SERVICES *** */
import { apiUrl } from "../../../../constants/config";
import axios from "axios";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap";
import CotizacionesServices from "../../../../services/gps/cotizaciones/CotizacionesServices.js";
import MailServices from "../../../../services/gps/mail/MailServices.js";
export default {
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
  },
  props: ["cotid"],
  data() {
    return {
      detallecotizacion: [],
      isModeEndRequest:true,
      routesnodestroy:true,
      vuetableItems: {
        apiUrl: apiUrl + "/cakes/fordatatable",
      },
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
    
      bootstrapTable1: {
        selected: [],
        selectMode: "multi",
        fields: [
          {
            key: "index",
            label: "N°",
            sortable: false,
            sortDirection: "desc",
            tdClass: "index",
          },
          {
            key: "codConcepto",
            label: "ITEM DESCRIPTION",
            sortable: false,
            sortDirection: "codConcepto",
            tdClass: "codConcepto",
          },
          {
            key: "codPrecioUnitario",
            label: "UNIT PRICE",
            sortable: false,
            tdClass: "codPrecioUnitario",
          },
          {
            key: "codPax",
            label: "QUANTITY",
            sortable: false,
            tdClass: "codPax",
          },
          { key: "total", label: "TOTAL", sortable: false, tdClass: "total" },
        ],
      },
    };
  },
  filters: {},
  computed: {
   

    subTotal: function() {
        let total = 0;                
        let totalValor = 0;
        return totalValor = this.detallecotizacion[0]['cotizacionDetalle'].reduce(function(prev, object) {
            return total += parseFloat(object.total_paxput);
        }, 0);
    },
    
    getSubtotal() {
      let total = 0;
      let totalValor = 0;
    totalValor = this.detallecotizacion[0]['cotizacionDetalle'].reduce(function (prev, object) {
        total += parseFloat(object.total_paxput);
      }, 0);
      let subtotal = total - this.detallecotizacion[0]['cotCruceroDescuentoNinos'];
    /*   let subtotalniños = subtotal - this.detallecotizacion[0]['cotCruceroDescuentoExtra']; */
       let subtotalniños = subtotal; 
    
      return subtotalniños;
    },
     getValueIva(){
      let total = 0;         
        let totalValor = 0;
         totalValor = this.detallecotizacion[0]['cotizacionDetalle'].reduce(function (prev, object) {
        total += parseFloat(object.total_paxput);
      }, 0);
      let subtotal = total - this.detallecotizacion[0]['cotCruceroDescuentoNinos'];
      /* let subtotalniños = subtotal - this.detallecotizacion[0]['cotCruceroDescuentoExtra']; */
        let subtotalniños = subtotal; 
        let valoriva= subtotalniños*this.detallecotizacion[0]['imdPorcentaje']/100;
      // return total -(this.descuentoExtra+this.descuentoNinos); 
 return valoriva; 

    },
    getGrandTotal() {
      let total = 0;
      let grandTotal = 0;
      let subT = 0;
      let totalValor = 0;
         totalValor = this.detallecotizacion[0]['cotizacionDetalle'].reduce(function (prev, object) {
        total += parseFloat(object.total_paxput);
      }, 0);
      let subtotal = total - this.detallecotizacion[0]['cotCruceroDescuentoNinos'];
   /*    let subtotalniños = subtotal - this.detallecotizacion[0]['cotCruceroDescuentoExtra']; */
     let subtotalniños = subtotal; 
        let valoriva= subtotalniños*this.detallecotizacion[0]['imdPorcentaje']/100;
      let subtotalneto = subtotalniños;
      if (this.porcentaje > 0) {
        grandTotal = subT + total * (this.detallecotizacion[0]['imdPorcentaje'] / 100);
      } else {
        grandTotal = subT;
      }
      return subtotalneto + valoriva;
    },
  },
  methods: {
      changestatusdestroy(){
  
this.routesnodestroy=false;
 
    },
     endRequest(gctId) {
      this.$store.dispatch("updateStatusQuote", gctId).then(payload => {
        var response = payload.data.reqStatus;
        if (response == 0) {
          this.$store.commit("cleanRequestCliId");
          this.$router.push({
            name: "availabilitydistribution"
          });
        } else {
          var type = "error filled";
          var title = "Error";
          var mensaje = "Mail not sended. Try again";
          this.$notify(type, title, mensaje, {
            duration: 3000,
            permanent: false
          });
        }
      });
    },
    sendQuotescot(){
         if (confirm("Are you sure to send this quote")) {
         MailServices.sendQuotescot(this.cotid)
        .then((response) => {
          let mensaje = response.data.data;
          if (mensaje == 200) {
            var type = "success filled";
            var title = "Send Quote";
            var message = "Succesful";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
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
    },
    getDetailCotizacionDetalle() {
      CotizacionesServices.getCotizacionDetalleByCotId(this.cotid)
        .then((response) => {
          this.detallecotizacion = response.data.data;
          console.log('Grupo cotizacion '+this.detallecotizacion[0]['gctId'])
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    rowSelected(items) {
      this.bootstrapTable.selected = items;
    },
    dataProvider(ctx) {
      const params = this.apiParamsConverter(ctx);
      let promise = axios.get(apiUrl + "/cakes/fordatatable", {
        params: params,
      });

      return promise
        .then((result) => result.data)
        .then((data) => {
          this.currentPage = data.current_page;
          this.perPage = data.per_page;
          this.totalRows = data.total;
          const items = data.data;
          return items;
        })
        .catch((_error) => {
          return [];
        });
    },
    apiParamsConverter(params) {
      let apiParams = {};
      if (params.perPage !== 0) {
        apiParams.per_page = params.perPage;
      }
      if (params.currentPage >= 1) {
        apiParams.page = params.currentPage;
      }
      if (params.sortBy && params.sortBy.length > 0) {
        apiParams.sort = `${params.sortBy}|${params.sortDesc ? "desc" : "asc"}`;
      }
      if (params.filter && params.filter.length > 0) {
        // Optional
      }
      return apiParams;
    },
  },
  mounted() {
    this.getDetailCotizacionDetalle();
   
  },

   beforeDestroy() {
  //console.log(this.routesnodestroy+' Status routesnodestroy preview ');
  //console.log(this.isModeEndRequest+' Status isModeEndRequest preview' );
  //console.log(this.detallecotizacion[0]['gctId']+' grupo cotizacion preview' );
  if (this.isModeEndRequest && this.routesnodestroy) this.endRequest(this.detallecotizacion[0]['gctId']);
 }, 

};
</script>

