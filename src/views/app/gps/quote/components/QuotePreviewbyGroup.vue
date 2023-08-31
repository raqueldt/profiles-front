<!-- Componente :
- Cotizacion dentro del grupo de cotizacion -->
<template>
  <b-row>
    <b-colxx lg="12" :class="clientePE==='ATC INT'?'':'ec'" class="quote-pdf-bg p-0">
      <b-row class="p-0 q-header">
        <table class="table">
          <tr>
            <td width="56%"></td>
            <td>
              <img class="cabecera3" :src="clientePE==='ATC INT'?'/assets/img/formato_pdf/cabecera3.svg':'/assets/img/formato_pdf/cabecera3-atc.svg'" >
            </td>
            <td class="bg-quote-c"></td>
          </tr>
        </table>
      </b-row>

      <b-row class="p-0 q-header">
        <table class="table">
          <tr>
            <td width="45%" class="bg-quote-b">
              <img :src="clientePE==='ATC INT'?'/assets/logos/log_oniric_white.svg':'/assets/logos/white-pdf.svg'" alt="">
            </td>
            <td>
              <img class="cabecera1" :src="clientePE==='ATC INT'?'/assets/img/formato_pdf/cabecera1.svg':'/assets/img/formato_pdf/cabecera1-atc.svg'" alt="">
            </td>
            <td>
              <img class="cabecera2" src="/assets/img/formato_pdf/cabecera2.svg" alt="">
            </td>
            <td width="45%" class="bg-quote-g">
              {{$t('gps.quotes_labels.quote_n')}}: {{ detallecotizacionheader["cotCodigo"] }}
            </td>
          </tr>
        </table>
      </b-row>

      <b-row class="p-0 q-header">
        <table class="table">
          <tr>
            <td width="56%">
              <div class="q-client-info">
                <div>
                  <span>{{$t('gps.quotes_labels.q_client')}}:</span> {{ detallecotizacionheader["clienteName"] }}
                </div>
                <div>
                  <span>{{$t('gps.quotes_labels.q_reference')}}:</span> {{ detallecotizacionheader["cotReferencia"] }}
                </div>
                <div>
                  <span>{{$t('gps.quotes_labels.q_prepared_by')}}:</span> {{ detallecotizacionheader["vendedorName"] }} ({{ detallecotizacionheader["vendedorEmail"] }})
                </div>
                <div>
                  <span>{{$t('gps.quotes_labels.q_date')}}:</span> {{
                    moment(
                        detallecotizacionheader["cotFecha"]
                      ).format("DD MMM YYYY, ddd")
                    }}
                  
                </div>
              </div>
            </td>
            <td style="vertical-align: top;">
              <table class="table">
                <tr>
                  <td width="8%">
                  </td>
                  <td width="0.05%">
                    <img class="cabecera3" :src="clientePE==='ATC INT'?'/assets/img/formato_pdf/cabecera3.svg':'/assets/img/formato_pdf/cabecera3-atc.svg'" alt="">
                  </td>
                  <td class="bg-quote-c" width="90%"></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </b-row>

      <b-row  class="p-0"> 
        <div class="w-90 m-auto">
          <div class="q-title">
          {{$t('gps.quotes_labels.q_thank')}}
          </div>
          <div class="q-title-info">
            {{$t('gps.quotes_labels.order_processed')}}
          </div>
          <div class="q-sep-order"></div>
        </div>
      </b-row>

      <b-row>
        <div class="w-90 mx-auto mt-1">
           <div class="q-title-detail">
          {{$t('gps.quotes_labels.quote_details')}}
          </div>
        </div>
      </b-row>

      <b-row class="p-0">
        <b-table-simple
          responsive
          class="vuetable q-detail-table"
          sort-by="title"
          sort-desc.sync="false"
        >
          <thead class="">
            <tr class="">
              <th>
                <div>{{$t('gps.quotes_labels.q_dates')}}</div>
              </th>
              <th>
                <div>{{$t('gps.quotes_labels.q_status')}}</div>
              </th>
              <th>
                <div>{{$t('gps.quotes_labels.q_service')}}</div>
              </th>
              <th>
                <div>{{$t('gps.quotes_labels.q_quantity')}}</div>
              </th>
              <th>
                <div>{{$t('gps.quotes_labels.q_net')}}</div>
              </th>
               <th>
                <div>{{$t('gps.quotes_labels.q_discounts')}}</div>
              </th>
               <th>
                <div>{{$t('gps.quotes_labels.q_net_total')}}</div>
              </th>
            </tr>
          </thead>
            <tbody >
            <tr v-for=" (item_q, index) in detallecotizacionheader['detalles']" :key="index" class="">
              <td>
                <div class="text-center"  v-if=" item_q.bokId == null">
                {{ moment(item_q.codFechaInicio
                ).format("DD MMM YYYY, ddd")}}  
                </div>
                <div v-else class="text-center booking">
                {{ moment(item_q.codFechaInicio
                ).format("DD MMM YYYY, ddd")}} to<br>
                {{ moment(item_q.codFechaFin
                ).format("DD MMM YYYY, ddd")}} 
                </div>       
              </td>
              <td>
                <div class="text-center"  v-if=" item_q.bokId == null">
                {{$t('gps.quotes_labels.q_available')}}  
                </div>
                <div v-else class="text-center hold">
                {{$t('gps.quotes_labels.q_hold')}}  <br>
                <span>{{ moment(detallecotizacionbooking["codTiempoLimite"])
                .format("DD MMM YYYY, ddd h:mm ")}}ECT</span>
                </div>           
              </td>
              <td>
                <div class="text-center"  v-if=" item_q.bokId == null">
                {{item_q.codConcepto}} 
                </div>
                <div v-else class="text-center">
                {{item_q.codConcepto}} 
                </div>       
              </td>
              <td>
                <div class="text-center"  v-if=" item_q.bokId == null">
                {{item_q.codCantidad}} 
                </div>
                <div v-else class="text-center">
                  NA
                </div>            
              </td>
              <td>
                <div class="text-center"  v-if=" item_q.bokId == null">
                {{item_q.codPrecioUnitario}} 
                </div>
                <div v-else class="text-center">
                  NA
                </div>        
              </td>
              <td>
                <div class="text-center" v-if="item_q.bokId == null">
                 <div>
                    <div v-if="item_q.totalDescuentos > 0">
                      {{item_q.totalDescuentos}} 
                    </div>
                 </div>
                </div>
                <div v-else class="text-center">
                    NA
                </div>          
              </td>
              <td class="text-center">
                {{item_q.precioTotal}}
              </td>
            </tr>
            <tr class="totales">
              <td>
                
              </td>
              <td>
                           
              </td>
              <td>
                   
              </td>
              <td>
                           
              </td>
              <td >
                
              </td>
              <td class="text-right">
                <div class="pl-2 pr-3">
                  {{$t('gps.quotes_labels.q_net_subtotal')}}
                </div>
              </td>
              <td class="text-center"> 
                {{parseFloat(totalescotizacion.subtotal).toFixed(2)}}  
              </td>
            </tr>
            <tr class="totales">
              <td>
                
              </td>
              <td>
                           
              </td>
              <td>
                   
              </td>
              <td>
                           
              </td>
              <td >
                
              </td>
              <td class="text-right">
                <div class="pl-2 pr-3">
                  {{$t('gps.quotes_labels.q_tax')}}
                </div>
              </td>
              <td class="text-center">
                <div v-if="totalescotizacion.valorIva > 0">
                  {{parseFloat(totalescotizacion.valorIva).toFixed(2)}} 
                </div>
                <div v-else>-</div>
              </td>
            </tr>
            <tr class="net totales">
              <td>
                
              </td>
              <td>
                           
              </td>
              <td>
                   
              </td>
              <td>
                           
              </td>
              <td >
                
              </td>
              <td class="text-right">
                <div class="pl-2 pr-3">
                  {{$t('gps.quotes_labels.q_net_total')}}
                </div>
              </td>
              <td class="text-center"> 
                {{parseFloat(totalescotizacion.total).toFixed(2)}}  
              </td>
            </tr>
          </tbody>
        </b-table-simple>
      </b-row>

      <b-row>
        <div class="w-90 mx-auto mt-1">
           <div class="q-cabin-detail">
          {{$t('gps.quotes_labels.cabin_selection')}}
          </div>
          <div class="q-cabin-info">
            {{$t('gps.quotes_labels.please_refer')}}
          </div>
        </div>
      </b-row>

      <b-row>
        <b-table-simple
          responsive
          class="vuetable q-detail-table cabin"
          sort-by="title"
          sort-desc.sync="false"
        >
          <thead class="">
            <tr class="">
              <th>
                <div>{{$t('gps.quotes_labels.q_item')}}</div>
              </th>
              <th>
                <div>{{$t('gps.quotes_labels.q_cabin')}}</div>
              </th>
              <th>
                <div>{{$t('gps.quotes_labels.q_publish')}}</div>
              </th>
              <th>
                <div>{{$t('gps.quotes_labels.q_discounts')}}</div>
              </th>
              <th>
                <div>{{$t('gps.quotes_labels.q_final_retail')}}</div>
              </th>
               <th>
                <div>{{$t('gps.quotes_labels.q_agency')}}</div>
              </th>
            </tr>
          </thead>
          <tbody >
            <tr v-for=" (catalogs , index) in booking_details_children_slots" :key="index" class="">
              <td class="text-center">
                {{index+1}}
              </td>
              <td>
                  {{catalogs.catName}} - {{catalogs.cabName}}
              </td>
              <td class="text-center">
                {{catalogs.bosGrossRate}}  
              </td>
              <td class="text-center">
                <div v-if="catalogs.extraDiscount.length>0">
                  <div v-for="cat_dis in catalogs.extraDiscount" :key="cat_dis.bsrId">
                      <span v-if="cat_dis.bsrAmount > 0">
                        {{cat_dis.bsrAmount}}
                      </span>
                      <span v-else-if="cat_dis.bsrPercent > 0">
                      {{parseFloat(cat_dis.bsrPercent).toFixed(0)}}% <small>( -{{(catalogs.bosGrossRate*cat_dis.bsrPercent)/100}} USD )</small>
                      </span>
                  </div>
                </div>
              </td>
              <td class="text-center" v-if="catalogs.extraDiscount.length>0">
                  <div v-for="cat_dis in catalogs.extraDiscount" :key="cat_dis.bsrId">
                      <span v-if="cat_dis.bsrAmount > 0">
                        {{(catalogs.bosGrossRate-cat_dis.bsrAmount).toFixed(2)}}
                      </span>
                      <span v-else-if="cat_dis.bsrPercent > 0">
                        {{(catalogs.bosGrossRate-(catalogs.bosGrossRate*cat_dis.bsrPercent)/100).toFixed(2)}}
                      </span>
                  </div>
              </td>
              <td class="text-center" v-else>
                {{catalogs.bosGrossRate}}
              </td>
              <td class="text-center">
                {{catalogs.bosNetRate}}
              </td>

            </tr>
            <tr class="totales cabin">
              <td>
                
              </td>
              <td class="text-right">
                  <div class="pr-3">{{$t('gps.quotes_labels.q_cruise_rate')}}</div>
              </td>
              <td class="text-center">
                   {{totalGrossRate.toFixed(2)}}
              </td>
              <td class="text-center">
                  {{totalDiscount.toFixed(2)}}         
              </td>
              <td class="text-center">
                {{finalRetailRate.toFixed(2)}}
              </td>
              <td class="text-center">
               {{totalNetRate.toFixed(2)}}
              </td>
            </tr>
            <tr class="totales cabin">
              <td>
                
              </td>
              <td class="text-right">
                  <div class="pr-3">
                    {{$t('gps.quotes_labels.child_discount')}}
                  </div>
              </td>
              <td class="text-left">
                
              </td>
              <td>
              </td>
              <td>
              </td>
              <td class="text-center">
                {{booking_details_children.bokChildrenDiscount}}
              </td>
            </tr>
          </tbody>
        </b-table-simple>
      </b-row>
      <footer class="mt-4">
        <div class="q-sep-order"></div>
        <div class="mt-4 footer-text">
          Guipuzcoa E13-117 & Lugo <br>
          {{$t('gps.quotes_labels.postalCode')}}: 170109 <br>
          {{$t('gps.quotes_labels.phone')}}: (593-2) 2228 385 / 2228 487 * Mobile: (593-9) 84695 409 / 4696 115<br>
          <div class="mt-2">www.andeantc.com * Quito - Ecuador</div>
          info@andeantc.com
        </div>
        <div class="footer-line mt-4">
          <div></div>
          <div>
            <table>
              <tr>
                <td class="footer-line-l"></td>
                <td width="32"><img :src="clientePE==='ATC INT'?'/assets/img/formato_pdf/pie.svg':'/assets/img/formato_pdf/pie-atc.svg'" alt=""></td>
                <td class="footer-line-r"></td>
              </tr>
            </table>
          </div>
          <div></div>
        </div>
        <div class="my-4"></div>
      </footer>  
    </b-colxx>
    <!--page2-->
    <b-colxx lg="12" :class="clientePE==='ATC INT'?'':'ec'" class="quote-pdf-bg information p-0 mt-5">
      <b-row class="p-0 q-header">
        <table class="table">
          <tr>
            <td width="56%"></td>
            <td>
              <img class="cabecera3" :src="clientePE==='ATC INT'?'/assets/img/formato_pdf/cabecera3.svg':'/assets/img/formato_pdf/cabecera3-atc.svg'" alt="">
            </td>
            <td class="bg-quote-c"></td>
          </tr>
        </table>
      </b-row>

      <b-row class="p-0 q-header">
        <table class="table">
          <tr>
            <td width="45%" class="bg-quote-b">
              <img :src="clientePE==='ATC INT'?'/assets/logos/log_oniric_white.svg':'/assets/logos/white-pdf.svg'" alt="">
            </td>
            <td>
              <img class="cabecera1" :src="clientePE==='ATC INT'?'/assets/img/formato_pdf/cabecera1.svg':'/assets/img/formato_pdf/cabecera1-atc.svg'" alt="">
            </td>
            <td>
              <img class="cabecera2" src="/assets/img/formato_pdf/cabecera2.svg" alt="">
            </td>
            <td width="45%" class="bg-quote-g">
              {{$t('gps.quotes_labels.quote_n')}}: {{ detallecotizacionheader["cotCodigo"] }}
            </td>
          </tr>
        </table>
      </b-row>
      <b-row class="p-0 q-header">
        <table class="table">
          <tr>
            <td width="56%">
            </td>
            <td style="vertical-align: top;">
              <table class="table">
                <tr>
                  <td width="8%">
                  </td>
                  <td width="0.05%">
                    <img class="cabecera3" :src="clientePE==='ATC INT'?'/assets/img/formato_pdf/cabecera3.svg':'/assets/img/formato_pdf/cabecera3-atc.svg'" alt="">
                  </td>
                  <td class="bg-quote-c" width="90%"></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </b-row>
      <div class="w-90 mx-auto mb-5">
        <b-row>
          <span class="important mb-4">
            <img :src="clientePE==='ATC INT'?'/assets/img/formato_pdf/info.svg':'/assets/img/formato_pdf/info-atc.svg'"alt="">
            {{$t('gps.quotes_labels.important')}}
          </span>
          <div>
            {{$t('gps.quotes_labels.important_please')}}
          </div>
          <div class="titles mt-3">
            {{$t('gps.quotes_labels.important_information')}}
          </div>
          <div>
            <ul>
              <li>{{$t('gps.quotes_labels.information_list')}}</li>
              <li>{{$t('gps.quotes_labels.information_list1')}}</li>
              <li>{{$t('gps.quotes_labels.information_list2')}}</li>
              <li>{{$t('gps.quotes_labels.information_list3')}}</li>
              <li>{{$t('gps.quotes_labels.information_list4')}}</li>
              <li>{{$t('gps.quotes_labels.information_list5')}}</li>
            </ul>
          </div>
        </b-row>
        <div class="q-sep-order my-3"></div>
        <b-row>
          <div class="titles mb-2">
            <img :src="clientePE==='ATC INT'?'/assets/img/formato_pdf/include.svg':'/assets/img/formato_pdf/include-atc.svg'" alt="">
            {{$t('gps.quotes_labels.q_included')}}
          </div>
          <div v-html='detallecotizacionheader["cotIncluye"]'>
          </div>
        </b-row>
        <div class="q-sep-order my-3"></div>
        <b-row>
          <div class="titles mb-2">
            <img :src="clientePE==='ATC INT'?'/assets/img/formato_pdf/no-include.svg':'/assets/img/formato_pdf/no-include-atc.svg'" alt="">
            {{$t('gps.quotes_labels.q_no_include')}}
          </div>
          <div v-html='detallecotizacionheader["cotNoincluye"]'>
          </div>
        </b-row>
        <div class="q-sep-order my-3"></div>
        <b-row>
          <div class="titles mb-2">
            {{$t('gps.quotes_labels.q_general')}}
          </div>
          <div v-html='detallecotizacionheader["cotPoliticas"]'>
          </div>
        </b-row>
      </div>
      
      <footer class="pt-5">
        <div class="q-sep-order w-90"></div>
        <div class="mt-4 footer-text">
          Guipuzcoa E13-117 & Lugo <br>
          {{$t('gps.quotes_labels.postalCode')}}: 170109 <br>
          {{$t('gps.quotes_labels.phone')}}: (593-2) 2228 385 / 2228 487 * Mobile: (593-9) 84695 409 / 4696 115<br>
          <div class="mt-2">www.andeantc.com * Quito - Ecuador</div>
          info@andeantc.com
        </div>
        <div class="footer-line mt-4">
          <div></div>
          <div>
            <table>
              <tr>
                <td class="footer-line-l"></td>
                <td width="32"><img :src="clientePE==='ATC INT'?'/assets/img/formato_pdf/pie.svg':'/assets/img/formato_pdf/pie-atc.svg'" alt=""></td>
                <td class="footer-line-r"></td>
              </tr>
            </table>
          </div>
          <div></div>
        </div>
        <div class="my-4"></div>
      </footer>  
    </b-colxx>
  </b-row>
</template>
 
<script>
/* *** SERVICES *** */
import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices.js";
import BookingServices from "../../../../../services/gps/booking/BookingServices.js";
import MailServices from "../../../../../services/gps/mail/MailServices.js";

export default {
  props: ["cotId"],
  components: {
  },
  data() {
    return {
      detallecotizacion: [],
      selectedCot: "",
      booking_details_children_slots:[],
      totalescotizacion: [],
      detallecotizacionheader: [],
      detallecotizacionbooking: [],
      booking_details_children:[],
      bokId:"",
      booking_details:[],
      isModeEndRequest: true,
      routesnodestroy: true,
    };
  },
  filters: {},

  watch: {
    cotId: function (newVal, oldVal) {
      this.selectedCot = newVal;
      //console.log (this.selectedCot+'QPBG');
      this.cotizaciondetalles();
      this.totalcotizacion();
    },
  },

  computed: {
    totalGrossRate: function(){
      let sum = 0;
      for(let i = 0; i < this.booking_details_children_slots.length; i++){
        sum += parseFloat(this.booking_details_children_slots[i].bosGrossRate);
      }
     return sum;
    },
    totalDiscount: function(){
        let sum = 0;
        let bosGrossRate;
        let numPercent;
        let numAmount;
        let sumPercent = 0;
        let sumAmount = 0;
        for(let i = 0; i < this.booking_details_children_slots.length; i++){
          const extraDiscount = this.booking_details_children_slots[i].extraDiscount;
          //console.log(this.booking_details_children_slots[i].extraDiscount);
          bosGrossRate = parseFloat(this.booking_details_children_slots[i].bosGrossRate);
          extraDiscount.forEach(function(discounts) {
            
            if(discounts.bsrPercent > 0 ){
              numPercent=(bosGrossRate*discounts.bsrPercent)/100;
              sumPercent+=parseFloat(numPercent);
            }
            if(discounts.bsrAmount > 0 ){
              numAmount=discounts.bsrAmount;
              sumAmount+=parseFloat(numAmount);
            }
            console.log(sumAmount)
            sum = parseFloat(sumAmount)+parseFloat(sumPercent);
            
          });
        }
      return sum;
    },
    grossRate: function(){
        let sum = 0;
        for(let i = 0; i < this.booking_details_children_slots.length; i++){
          const extraDiscount = this.booking_details_children_slots[i].extraDiscount;
          if(extraDiscount.length===0){
          sum += parseFloat(this.booking_details_children_slots[i].bosGrossRate);
          }
        }
      return sum;
    },
    finalRetailRate: function(){
        let sum = 0;
        sum = this.totalGrossRate-this.totalDiscount;
        return sum;
    },
    totalNetRate: function(){
        let sum = 0;
        for(let i = 0; i < this.booking_details_children_slots.length; i++){
          sum += parseFloat(this.booking_details_children_slots[i].bosNetRate);
        }

      return sum;
    },
    discountChildren: function(){
      let discount = 0;
        for(let i = 0; i < this.detallecotizacionheader['detalles'].length; i++){
          discount = parseFloat(this.detallecotizacionheader['detalles'][i].codCruceroDescuentoNinos);
        }

      return discount;
    }

  },
  methods: {
    totalcotizacion() {
      CotizacionesServices.totalescotizacion(this.selectedCot)
        .then((response) => {
          this.totalescotizacion = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cotizaciondetalles() {
      CotizacionesServices.cotizacionesdetalles(this.selectedCot)
        .then((response) => {
          this.detallecotizacionheader = response.data;
          this.detallecotizacionheader = this.detallecotizacionheader.shift();
            this.detallecotizacionbooking =
            this.detallecotizacionheader["booking"]
            this.bokId= [this.detallecotizacionbooking.bokId]
            this.bookingDetails(this.bokId)
            ;
        })
        .catch((error) => {
          console.log(error);
        });
    },


 bookingDetails(bokId) {
      BookingServices.getBookingDetails(bokId)
        .then((response) => {
          this.booking_details = response.data;
          this.booking_details_children = this.booking_details.booking;
          this.booking_details_children_slots = this.booking_details.slots;
          /*      console.log(
                JSON.stringify(
                  this.booking_details.booking
                )
            ); */
        })
        .catch((error) => {
          console.log(error);
        });
    },


  },
  mounted() {},
};
</script>
