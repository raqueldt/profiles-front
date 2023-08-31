<template>
  <div>
    <b-row>
      <b-colxx lg="11" class="quote m-auto p-0" :class="clientePE==='ATC INT'?'':'ec'">
        <div class="header">
          <div class="quote_code">
              {{$t('gps.quotes_labels.quote_n')}}: <span>{{ cotizacion["cotCodigo"] }}</span>
          </div>
        </div>
        {{activities}}
        <div class="main-quote">
          <b-row>
            <b-colxx>
              <div class="client-info">
                  <div class="lista top">
                    <div class="title">{{$t('gps.quotes_labels.q_client')}}:</div> 
                    <div>{{ cotizacion["clienteName"] }}</div>
                  </div>
                  <div class="lista">
                    <div class="title">{{$t('gps.quotes_labels.q_reference')}}:</div> 
                    <div>{{ cotizacion["cotReferencia"] }}</div>
                  </div>
                  <div class="lista">
                    <div class="title">{{$t('gps.quotes_labels.q_prepared_by')}}:</div> 
                    <div>{{ cotizacion["vendedorName"] }} ({{ cotizacion["vendedorEmail"] }})</div>
                  </div>
                  <div class="lista">
                    <div class="title">{{$t('gps.quotes_labels.q_date')}}:</div>
                    <div>{{moment(cotizacion["cotFecha"]).format("DD MMM YYYY, ddd")}}</div>
                  </div>
                </div>
            </b-colxx>
            <b-colxx>
              <div class="net-total d-flex">
                <div class="img"></div>
                <div class="text">
                  {{$t('gps.quotes_labels.q_net_total_n')}}: <span>{{cotizacionQuoteDetailsSubtotal.total | currency('')}}</span> 
                </div>
              </div>
            </b-colxx>
          </b-row>

          <b-row>
            <div class="order">
              <div class="thanks">
                {{$t('gps.quotes_labels.q_thank')}}
              </div>
              <div>{{$t('gps.quotes_labels.order_processed')}}</div>
              <div class="timelimit">
                {{ moment(cotizacionInfoBooking.codTiempoLimite).format("DD MMM, YYYY - h.mm ")}}
              </div>
              <div class="closed">
                {{$t('gps.quotes_labels.all_holds')}}
              </div>
            </div>
        </b-row>
        
        <b-row v-if="cotizacionQuoteDetailsItems.length > 1" class="detail">
          <div class="text">
            {{$t('gps.quotes_labels.quote_details')}}
          </div>
          <div class="services">
            <b-table-simple  hover small caption-top responsive>
              <b-thead>
                <b-tr>
                  <b-th class="dates">{{$t('gps.quotes_labels.q_dates')}}</b-th>
                  <b-th class="service">{{$t('gps.quotes_labels.q_service')}}</b-th>
                  <b-th class="qty">{{$t('gps.quotes_labels.q_quantity')}}</b-th>
                  <b-th class="unit">{{$t('gps.quotes_labels.q_net')}}</b-th>
                  <b-th class="net">{{$t('gps.quotes_labels.q_net_total')}}</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(dates_item, index) in cotizacionQuoteDetailsDates" :key="index">
                  <b-th>{{moment(index).format("DD MMM YYYY, (ddd)")}}</b-th> 
                  <b-th colspan="4" class="items">
                    <div  v-for="(dates_item, index_d) in cotizacionQuoteDetailsItems" :key="index_d" class="serv">
                    <b-table-simple small table-variant="cont" v-if="dates_item.date == index">
                        <b-tbody>
                          <tr v-for="(service, index_s) in dates_item.services" :key="index_s">
                            <b-td class="service">{{service.codConcepto}}</b-td>
                            <b-td class="qty">{{service.codCantidad}}</b-td>
                            <b-td class="unit">{{service.codPrecioUnitarioTotal | currency('')}}</b-td>
                            <b-td class="net">{{service.subTotal | currency('')}}</b-td>
                          </tr>
                        </b-tbody>
                    </b-table-simple>
                    </div>
                  </b-th>
                </b-tr>
                <b-tr class="subtotales">
                  <b-td></b-td>
                  <b-td colspan="3" class="text-right pr-3 font-weight-bold">{{$t('gps.quotes_labels.subtotal_aditional')}}</b-td>
                  <b-td class="font-weight-bold">{{cotizacionQuoteDetailsSubtotal.services | currency('')}}</b-td>
                </b-tr>
                <b-tr class="subtotales">
                  <b-td></b-td>
                  <b-td colspan="3" class="text-right pr-3 font-weight-bold">{{$t('gps.quotes_labels.qoute_subtotal')}}</b-td>
                  <b-td class="font-weight-bold">{{cotizacionQuoteDetailsSubtotal.cruise | currency('')}}</b-td>
                </b-tr>
                <b-tr class="subtotales" v-if="cotizacionQuoteDetailsSubtotal.cruiseChildDiscount != 0">
                  <b-td></b-td>
                  <b-td colspan="3" class="text-right pr-3 font-weight-bold">{{$t('gps.quotes_labels.subtotal_childdiscount')}}</b-td>
                  <b-td class="font-weight-bold">{{cotizacionQuoteDetailsSubtotal.cruiseChildDiscount | currency('')}}</b-td>
                </b-tr>
                <b-tr class="subtotales" v-if="cotizacionQuoteDetailsSubtotal.valorIva != 0">
                  <b-td></b-td>
                  <b-td colspan="3" class="text-right pr-3 font-weight-bold">{{$t('gps.quotes_labels.q_tax')}} ({{cotizacionQuoteDetailsSubtotal.iva}}%)</b-td>
                  <b-td class="font-weight-bold">{{cotizacionQuoteDetailsSubtotal.valorIva | currency('')}}</b-td>
                </b-tr>
                <b-tr class="subtotales">
                  <b-td></b-td>
                  <b-td colspan="3" class="text-right pr-3 font-weight-bold cruisetotal">{{$t('gps.quotes_labels.subtotal_quotetotal')}}</b-td>
                  <b-td class="cruisetotal font-weight-bold">{{cotizacionQuoteDetailsSubtotal.total | currency('')}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>
        </b-row>
        <b-row class="slots">
          <div class="text">
            {{cotizacionInfoBooking.cruName}} - {{$t('gps.quotes_labels.cabin_selection')}}
            <div class="departures">
              <span>{{$t('gps.from')}}</span> {{ moment(cotizacionInfoBooking.depStartDate).format("DD MMM YYYY, ddd")}} <span class="ml-2">{{$t('gps.to')}}</span> {{ moment(cotizacionInfoBooking.depEndDate).format("DD MMM YYYY, ddd")}}
            </div>
            <div class="cru-remarks" v-if="cruiseRemarks != null">
            <strong>{{$t('gps.quotes_labels.cru-remarks')}}:</strong> {{cruiseRemarks}}
            </div>
          </div>
          <div class="cabins">
            <b-table-simple  hover small caption-top responsive>
              <b-thead>
                <b-tr>
                  <b-th class="pax">{{$t('gps.quotes_labels.q_item')}}</b-th>
                  <b-th class="type">{{$t('gps.quotes_labels.q_cabin')}}</b-th>
                  <b-th class="retail">{{$t('gps.quotes_labels.q_publish')}}</b-th>
                  <b-th class="agency">{{$t('gps.quotes_labels.q_agency')}}</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(slots, index_sl) in cotizacionBookingSlots" :key="index_sl">
                  <b-td>{{index_sl+1}}</b-td>
                  <b-td class="text-left">
                    {{slots.catName}} - {{slots.cabName}}  
                    <span v-if="slots.condition =='SS' "> (Single)</span>
                    <span v-else-if="slots.condition =='SM' "> (Share Male)</span>
                    <span v-else-if="slots.condition =='SF' "> (Share Female)</span>
                    <span v-else> {{slots.condition }}</span>
                  </b-td>
                  <b-td class="text-right">{{slots.bosGrossRate}}</b-td>
                  <b-td class="text-right">{{slots.bosNetRate}}</b-td>
                </b-tr>
                <b-tr class="subtotales">
                  <b-td></b-td>
                  <b-td class="text-right pr-3 font-weight-bold">{{$t('gps.quotes_labels.subtotal')}}</b-td>
                  <b-td class="font-weight-bold text-right">
                    {{ parseFloat(cotizacionBookingSlotsTotals.totalGrossRate) | currency('') }}
                  </b-td>
                  <b-td class="font-weight-bold">{{ parseFloat(cotizacionBookingSlotsTotals.totalNetRate) | currency('') }}</b-td>
                </b-tr>
                <b-tr class="subtotales" v-if="cotizacionBookingSlotsTotals.totalChildDiscount != 0">
                  <b-td></b-td>
                  <b-td class="text-right pr-3 font-weight-bold">{{$t('gps.quotes_labels.subtotal_childdiscount')}}</b-td>
                  <b-td class="font-weight-bold"></b-td>
                  <b-td class="font-weight-bold">{{cotizacionBookingSlotsTotals.totalChildDiscount | currency('')}}</b-td>
                </b-tr>
                <b-tr class="subtotales" v-if="cotizacionBookingSlotsTotals.totalExtraDiscount != 0">
                  <b-td></b-td>
                  <b-td class="text-right pr-3 font-weight-bold">{{$t('gps.quotes_labels.subtotal_otherdiscounts')}}</b-td>
                  <b-td class="font-weight-bold"></b-td>
                  <b-td class="font-weight-bold">{{cotizacionBookingSlotsTotals.totalExtraDiscount | currency('')}}</b-td>
                </b-tr>
                <b-tr class="subtotales" v-if="cotizacionBookingSlotsTotals.valorIva != 0">
                  <b-td></b-td>
                  <b-td class="text-right pr-3 font-weight-bold">{{$t('gps.quotes_labels.q_tax')}} ({{cotizacionBookingSlotsTotals.iva}}%)</b-td>
                  <b-td class="font-weight-bold"></b-td>
                  <b-td class="font-weight-bold">{{cotizacionBookingSlotsTotals.valorIva | currency('')}}</b-td>
                </b-tr>
                <b-tr class="subtotales">
                  <b-td></b-td>
                  <b-td class="text-right pr-3 font-weight-bold cruisetotal">{{$t('gps.quotes_labels.subtotal_cruisetotal')}}</b-td>
                  <b-td class="cruisetotal font-weight-bold text-right">{{cotizacionBookingSlotsTotals.totalGrossRate  | currency('')}}</b-td>
                  <b-td class="cruisetotal font-weight-bold">{{cotizacionBookingSlotsTotals.total | currency('')}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple> 
          </div>
        </b-row>

        <b-row class="itinerary">
          <b-colxx lg="10" class="m-auto">
            <div class="text text-left pl-3">
              {{$t('gps.itinerary')}} {{cotizacionInfoBooking.itiCode}}
            </div>
            <div class="days">
              <b-table-simple  hover small caption-top responsive>
              <b-tbody>
                <tr v-for="(day_itin, index_da) in cotizacionItineraryDays" :key="index_da">
                  <td class="days">
                    <span style="text-transform: uppercase">{{$t('gps.mod-itin-day')}}</span> {{index_da+1}} <br>
                    <span style="font-size:.6rem; font-weight: normal"> {{moment(day_itin.date).format("DD MMM YYYY, (ddd)")}}</span>  </td>
                  <td class="activities">
                    <b-table-simple small class="mb-0">
                      <b-tbody>
                        <b-td>
                          <div v-for="(activities, index_ac) in day_itin.activities" :key="index_ac">
                            <div v-if="activities.sumDay == day_itin.dayOfWeek">
                              <div>
                                <span v-if="activities.sumMeridian == 1">
                                  {{activities.meridianName}}: {{activities.sitName}} ({{activities.plaName}})
                                </span>
                              </div>
                            </div>
                          </div>
                        </b-td>
                        <b-td>
                          <div v-for="(activities, index_ac) in day_itin.activities" :key="index_ac">
                            <div v-if="activities.sumDay == day_itin.dayOfWeek">
                              <div>
                                <span v-if="activities.sumMeridian == 2">
                                  {{activities.meridianName}}: {{activities.sitName}} ({{activities.plaName}})
                                </span>
                              </div>
                            </div>
                          </div>
                        </b-td>
                      </b-tbody>
                    </b-table-simple>
                  </td>
                </tr>
              </b-tbody>
            </b-table-simple> 
            </div>
          </b-colxx>
        </b-row>  
        </div>

        <div class="footer">
            <div class="info">
            Guipuzcoa E13-117 &amp; Lugo / Quito - Ecuador / {{$t('gps.quotes_labels.postalCode')}}: 170109 <br>
            {{$t('gps.quotes_labels.phone')}}: (593-2) 2228 385 / 2228 487 * Mobile: (593-9) 84695 409 / 4696 115<br>
            <div class="webmail"> <b><router-link tag="a" :to="'https://'+web">{{web}}</router-link></b> / {{email}} </div>
          </div>
          <div class="pie"></div>
          </div>
      </b-colxx>
    </b-row>

    <b-row class="mt-5">
      <b-colxx lg="11" class="quote m-auto p-0" :class="clientePE==='ATC INT'?'':'ec'">
        <div class="header">
          <div class="quote_code">
              {{$t('gps.quotes_labels.quote_n')}}: <span>{{ cotizacion["cotCodigo"] }}</span>
          </div>
        </div>
        
        <div class="main-quote">
          <div class="w-90 m-auto important mb-5">
            <b-row>
              <div class="img_important"></div>
              <div class="title impo">{{$t('gps.quotes_labels.important')}}</div>
              <div class="w-100 my-2">
                {{$t('gps.quotes_labels.important_please')}}
              </div>
            </b-row>
            <b-row class="sep">
              <div class="title">{{$t('gps.quotes_labels.important_information')}}</div>
              <div class="w-100">
                <ol class="information">
                  <li>{{$t('gps.quotes_labels.information_list')}}</li>
                  <li>{{$t('gps.quotes_labels.information_list1')}}</li>
                  <li>{{$t('gps.quotes_labels.information_list2')}}</li>
                  <li>{{$t('gps.quotes_labels.information_list3')}}</li>
                  <li>{{$t('gps.quotes_labels.information_list4')}}</li>
                  <li>{{$t('gps.quotes_labels.information_list5')}}</li>
                </ol>
              </div>
            </b-row>
            <b-row class="sep">
              <div class="img_include"></div>
              <div class="title">{{$t('gps.quotes_labels.q_included')}}:</div>
              <div class="w-100">
                <div class="include" v-html="cotizacion.cotIncluye"></div>
              </div>
            </b-row>
            <b-row class="sep">
              <div class="img_noinclude"></div>
              <div class="title">{{$t('gps.quotes_labels.q_no_include')}}:</div>
              <div class="w-100">
                <div class="include" v-html="cotizacion.cotNoincluye"></div>
              </div>
            </b-row>
            <b-row>
              <div class="title">{{$t('gps.quotes_labels.q_general')}}:</div>
              <div class="w-100">
                <div class="include" v-html="cotizacion.cotPoliticas"></div>
              </div>
            </b-row>
          </div>
        </div>
        
        <div class="footer">
            <div class="info">
            Guipuzcoa E13-117 &amp; Lugo / Quito - Ecuador / {{$t('gps.quotes_labels.postalCode')}}: 170109 <br>
            {{$t('gps.quotes_labels.phone')}}: (593-2) 2228 385 / 2228 487 * Mobile: (593-9) 84695 409 / 4696 115<br>
            <div class="webmail"> <b><router-link tag="a" :to="'https://'+web">{{web}}</router-link></b> / {{email}} </div>
          </div>
          <div class="pie"></div>
        </div>
      </b-colxx>
    </b-row>
    <!-- Botones Send,Return quote and availability -->

<!-- <b-row class="mt-3">
      <b-colxx lg="11" class="quote m-auto p-0" :class="clientePE==='ATC INT'?'':'ec'"> -->
<br>





<div class="container text-center " >

  <!-- action buttons-->
  <b-row>
    <b-col>
        <b-button
                  
                  variant="secondary btn-block"
                  @click="gotogroupquote(cotizacion.grupoId)"
                >
                  Return to Quote
                </b-button>
    </b-col>
    <b-col>
        <b-button
                  
                  variant="secondary btn-block"
                  @click="returnToAvailability()"
                >
                  Return to Availability
                </b-button>
    </b-col>
    <b-col>
        <b-button
            variant="primary btn-block"
            @click="sendQuotescot()"
          >
            {{$t('gps.send-quote')}}
          </b-button>
    </b-col>
  </b-row>  




  </div>
    <b-row class="mt-3">
      <b-colxx lg="11" class="quote m-auto p-0" :class="clientePE==='ATC INT'?'':'ec'">
        <div v-if="sendmail" class="text-center" style="float: center">
          <cube v-bind:loading="sendmail"> </cube>
          <h5 class="quote-pdf-atcref">
            <strong
              >{{$t('gps.send-all-qoutes')}} <i class="glyph-icon iconsminds-mail-send"></i>
            </strong>
          </h5>
        </div>
      </b-colxx>
    </b-row>
  </div>

</template>

<script>
import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices.js";
import MailServices from "../../../../../services/gps/mail/MailServices.js";

export default {
  props: ["cotId"],
  components: {
   
  },
  data() {
    return {
      sendmail: false,
      cotizacion:[],
      cotizacionDetalles:[],

      cotizacionInfoBooking:[],
      cotizacionBookingData:[],
      cotizacionBookingSlots:[],
      cotizacionBookingSlotsTotals:[],

      cotizacionItinerary:[],
      cotizacionItineraryInfo:[],
      cotizacionItineraryDays:[],

      cotizacionQuoteDetails:[],
      cotizacionQuoteDetailsDates:[],
      cotizacionQuoteDetailsItems:[],
      cotizacionQuoteDetailsSubtotal:[],
      bokId: "",
      
      isModeEndRequest: true,
      routesnodestroy: true,
      clientePE:""
    };
  },
  filters: {
    
  },
  created() {
    this.cotId = this.$route.params.cotId;
  },
  computed: {
    web: function(){
      var clientePE = this.clientePE;
      var web;
      if(clientePE === "ATC INT"){
        web = "www.oniriccruises.com";
      }else{
        web = "www.andeantc.com";
      }
      return web;
    },
    email: function(){
      var clientePE = this.clientePE;
      var mail;
      if(clientePE === "ATC INT"){
        mail= "enquiries@andeantc.com";
      }else{
        mail= "info@andeantc.com";
      }
      return mail;
    },
    returnToAvailability() {
      this.$router.push({ name: "newAvailability" });
    },


    cruiseRemarks: function(){
      var cruiseRemarks;
      const detalles = this.cotizacionDetalles;
      detalles.forEach(function (element) {
        if(element.bokId!=null){
          cruiseRemarks= element.codNota;
        }
      });
      return cruiseRemarks;
    }
  },
  methods: {
        gotogroupquote(gctId) {
      let routeData = this.$router.resolve({
        name: "quote",
        params: { gctId: gctId },
      });
      window.open(routeData.href, "_self");
    },
    cotizacionData() {
      CotizacionesServices.getCotizacion(this.cotId)
        .then((response) => {
          this.cotizacion = response.data;
          this.cotizacion = this.cotizacion.shift();

          this.cotizacionDetalles = this.cotizacion['detalles'];

          this.cotizacionInfoBooking = this.cotizacion['booking'];
          this.cotizacionBookingData = this.cotizacion['bookingData'];
          
          this.cotizacionBookingSlots = this.cotizacion['bookingData']['slots'];
          this.cotizacionBookingSlotsTotals = this.cotizacion['bookingData']['subtotals'];

          this.cotizacionItinerary = this.cotizacion['itinerary'];
          this.cotizacionItineraryInfo = this.cotizacion['itinerary']['info'];
          this.cotizacionItineraryDays = this.cotizacion['itinerary']['days'];

          this.cotizacionQuoteDetails = this.cotizacion['quoteDetails'];
          this.cotizacionQuoteDetailsDates = this.cotizacion['quoteDetails']['datesServices'];
          this.cotizacionQuoteDetailsItems = this.cotizacion['quoteDetails']['items'];
          this.cotizacionQuoteDetailsSubtotal = this.cotizacion['quoteDetails']['subtotal'];
          
       //console.log("===> Quotes : " + JSON.stringify(this.cotizacion['quoteDetails']['datesServices']));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cotizaciondetalles() {
      CotizacionesServices.cotizacionesdetalles(this.cotId)
        .then((response) => {
          this.detallecotizacionheader = response.data;
          this.detallecotizacionheader = this.detallecotizacionheader.shift();
          this.clientePE = this.detallecotizacionheader.clientePE;
          this.detallecotizacionbooking =
          this.detallecotizacionheader["booking"];
          this.bokId = [this.detallecotizacionbooking.bokId];
         //console.log("hola " + this.clientePE);
         //this.bookingDetails(this.bokId);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    sendQuotescot() {
      this.$swal({
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Send",
        confirmButtonColor: "#ED7117",
        title: "Email address",
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
          MailServices.sendQuotescot(this.cotId, mail)
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
                this.sendmail = false;
              }
            })
            .catch((error) => {
              var title = "Quote";
              var message = "No sent, please contact with administrator";
              this.$notify(type, title, message, {
                duration: 3000,
                permanent: false,
              });
            });
        }
      });
    },
  },
  mounted() {
    this.cotizacionData();
    this.cotizaciondetalles();
  },
};
</script>