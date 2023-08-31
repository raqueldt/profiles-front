<template>
  <div class="modal-body">
    <div class="table-wrapper-scroll-y my-custom-scrollbar">
      
      <b-container fluid class=" w-100 mb-2">

        <b-row class="mb-2 w-100">
            <!-- <b-button variant="outline-primary" 
              v-tooltip="{content: 'Copy information (For best experience, use Chrome browser)', placement: 'top'}"
              class="pull-right btn-xs"
              @click.prevent="copyTable()">Copy
            </b-button> -->
        </b-row>

        <b-row class="order-summary">
          <!-- {{detallecotizacionheader}} -->

      <!-- TABLA REFERENCIAL PARA FUNCIONALIDAD DE BOTÓN COPY -->
        <div  class="responsive w-100 mt-2">
          
          <table class="table table-striped table-bordered table-sm table-style" id="table-summary" >
            <tr>
              <th scope="col" class="p-1"><b>Yacht</b></th>
              <th scope="col" class="p-1 text-muted">{{ detallecotizacionbooking.cruName | uppercase}}</th>
            </tr>     
            <tr>
              <th scope="col" class="p-1"><b>Itinerary</b> </th>
              <th scope="col" class="p-1 text-muted">{{detallecotizacionbooking.itiName | uppercase}} (Nights: {{detallecotizacionbooking.itiNights}})</th>
            </tr>
            <tr>
              <th class="p-1"><b>Cruise dates</b> </th>
              <th class="p-1  text-muted">
                {{formatFecha(detallecotizacionbooking.depStartDate)}} - {{formatFecha(detallecotizacionbooking.depEndDate)}}
              </th>
            </tr>       
            <tr >
              <th class="p-1"><b>Pax</b> </th>
              <th class="p-1 text-muted">
               <!--  {{detallecotizaciondetalles}} -->
                {{ detallecotizaciondetalles.codPax}}
                <span v-if=" detallecotizacionbooking.bokChildrenPax > 0"> (Children: {{detallecotizacionbooking.bokChildrenPax}})</span>
            
            <!--   {{ subtotals}} -->
              </th>
            </tr>    
           <!--  {{subtotals}} -->
            <tr v-if="subtotals.totalGrossRate">
              <th class="p-1"><b>Gross Subtotal</b> </th>
              <th class="p-1 text-muted">{{subtotals.totalGrossRate | currency}}</th>
            </tr>
            <tr v-if="subtotals.totalNetRate ">
              <th class="p-1"><b>Net Subtotal</b> </th>
              <th class="p-1 text-muted">{{subtotals.totalNetRate | currency}}
            </th>
            </tr>
            <tr v-if="subtotals.valorIva">
              <th class="p-1"><b>Net IVA</b> </th>
              <th class="p-1 text-muted">
                {{subtotals.valorIva | currency}}
              </th>
            </tr>
            <tr>
              <th class="p-1"><b>Net Total</b> </th>
              <th class="p-1 text-muted">
                {{subtotals.total  | currency}}
              </th>
            </tr> 
          <!--   
            <tr v-if="getRowData.summary.summaryIVAGrossRate">
              <th class="p-1"><b>Gross IVA</b> </th>
              <th class="p-1 text-muted">{{
                parseFloat(getRowData.summary.summaryIVAGrossRate).toFixed(2) | currency}}
              </th>
            </tr>
            <tr>
              <th class="p-1"><b>Gross Total</b> </th>
              <th class="p-1 text-muted">
                {{getRowData.summary.summaryTotalGrossRate | currency}}
              </th>
            </tr>
          
          
               -->
            <tr>
              <th class="p-1"><b>Time limit</b> </th>
              <th class="p-1 text-muted">
                {{ formatDate(new Date(detallecotizacionbooking.codTiempoLimite))}} - {{detallecotizacionbooking.codTiempoLimite}}
              </th>
            </tr> 
          </table>
        
        </div>
    <!-- FIN TABLA REFERENCIAL PARA FUNCIONALIDAD DE BOTÓN COPY -->   
          <hr />
          <div class="pull-right" style="float:right">
            <b-button variant="primary" 
              v-tooltip="{content: 'Copy information (For best experience, use Chrome browser)', placement: 'top'}"
              class="pull-right"
              @click.prevent="copyTable()">Copy
            </b-button>
          </div>
      
        </b-row>


      </b-container>
    </div>
  </div>
</template>

<script>
  /* *** SERVICES *** */
  import Vue2Filters from "vue2-filters";
  import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices.js";
  import moment from "moment";

  export default {
    name: "modalcopyquote",
    props: ["cotId"],
    mixins: [Vue2Filters.mixin],
    data() {
      return {
        isSaveHold: "",
        message : "Your hold has been saved",
        getRowData: [],
        detallecotizacionheader: [],
      detallecotizacionbooking: [],
      detallecotizaciondetalles: [],
      bookingData:[],
      subtotals:[],
    
        allRowDataChoosen:[]
      };
    },
    filters: {},
    
    computed: {
      // allRowDataChoosen: {
      //   get() {
      //     return this.$store.getters.getAllRowDataChoosen;
      //   }
      // },
      getPax: function () {
        var dataFiltered = this.allRowDataChoosen.filter(p => p.depId == this.depId);
        return dataFiltered.length;
      }      
    },
    methods: { 
      showCopyMessage(){
        var type = "success filled";
        var title = "Copied";        
        var mensaje = "";        
        this.$notify(type, title, mensaje, {
          duration: 750,
          permanent: false
        });
      }, 
      copyTable(){
        var el = document.getElementById('table-summary');
        var body = document.body,
          range,
          sel;
        if (document.createRange && window.getSelection) {
          var trs = el.getElementsByTagName("tr");
          el.style.border = 'solid 1px #f3f3f3';
          el.style.width = '100%';
          el.style.fontFamily = 'Arial';
          el.style.fontSize = '12px';

          // PARA ALTERNAR COLORES ENTRE FILAS
          var elements = document.querySelectorAll("tr:nth-child(even)");
          for (i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = "#f3f3f3";
          }

          for(var i = 0; i < trs.length; i++) {
            var ths = trs[i].getElementsByTagName("th");
            for(var j = 0; j < ths.length; j++) {
              ths[j].style.border = 'solid 1px #f3f3f3';
            }
          }
          range = document.createRange();
          sel = window.getSelection();
          sel.removeAllRanges();
          try {
            range.selectNodeContents(el);
            sel.addRange(range);
          } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
          }
        } else if (body.createTextRange) {
          range = body.createTextRange();
          range.moveToElementText(el);
          range.select();
        }
        document.execCommand("Copy");
        this.showCopyMessage();
      },
      cotizaciondetalles() {
      CotizacionesServices.cotizacionesdetalles(this.cotId)
        .then((response) => {
          this.detallecotizacionheader = response.data;
          this.detallecotizacionheader = this.detallecotizacionheader.shift();
          this.detallecotizacionbooking =
            this.detallecotizacionheader["booking"];
            this.detallecotizaciondetalles= this.detallecotizacionheader['detalles'][0];
            this.bookingData= this.detallecotizacionheader['bookingData'];
            this.subtotals=this.bookingData['subtotals']

          //  console.log(this.detallecotizacionbooking);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 
      formatFecha(fecha) {
        return moment(fecha).format(' D MMMM  YYYY, ddd')
      },
   
    formatDate(fecha) {
      return moment(fecha).format('D MMMM  YYYY (ddd)')
    },      
    },
    async mounted() {
      this.cotizaciondetalles();
    },
  };

</script>

<style scoped>
  .modal .modal-header,
  .modal .modal-body,
  .modal .modal-footer {
    padding: 0 !important;
  }

  .date-departure {
    float: none !important;
  }

  .modal-dialog {
	  width: 650px  !important;
    max-width: 700px !important;
  }



table {
    font-family: "Nunito", sans-serif !important;
    border-collapse: collapse;
    width: 100%;
}


td, th {
    border: 1px solid #dddddd;
    text-align: left;
    /* padding: 8px; */
}

tr:nth-child(even) {
    background-color:  #f3f3f3;
}


</style>
