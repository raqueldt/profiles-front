<template>
  <b-card>
    <div class="card-title mb-0">
      <div class="d-flex">
        <h4 class="w-40 mb-0 mt-1 text-primary">{{ $t("gps.quotes") }}</h4>
        <b-refresh-button
          style="padding: 0.7rem"
          @click="this.getActiveQuotes"
        />

           <div class="w-25">
          <b-form-group inline size="sm">
            <b-form-select
              v-model="selecteduser"
              style="height: calc(2em + 0.5rem + 1px); font-size: 0.75rem"
              :options="namesUser"
              size="sm"
              text-field="userName"
              value-field="userName"
            >
              <template #first>
                <b-form-select-option :value="null">
                  All Users
                </b-form-select-option>
              </template>
            </b-form-select>
          </b-form-group>
        </div>

        <div class="w-25">
          <b-form-group inline size="sm">
            <b-form-input
              style="height: calc(2em + 0.5rem + 2px); font-size: 0.75rem"
              class="float-right"
              id="filter-input"
              v-model="filter"
              type="search"
              size="sm"
              placeholder="Search Quote"
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
    </div>



    <div v-if="loading" class="d-flex align-items-center"> 
        <div class="mx-auto">
          <div class="semipolar-spinner">
          <div class="ring"></div>
          <div class="ring"></div>
          <div class="ring"></div>
          <div class="ring"></div>
          <div class="ring"></div>
        </div>
        <span class="text-primary">Loading</span>
        </div>
    </div>    

    <b-modal id="modal-1" title="Detail Quote">
          <p class="my-4">{{infoquote}}  from modal!</p>
      <b-card :title="'Detail quote: ' + infoquote.cotCodigo">
        <div class="mb-4">
          <p class="mb-2">
            <!--    {{ infoquote }} -->
            Created at
            <span class="float-right text-muted"
              ><!-- {{infoquote.cotFecha}} -->

              {{ moment(infoquote.cotFecha).format("MMM DD YYYY h:mm:ss a") }}
            </span>
          </p>
          <p class="mb-2">
            <!--    {{ infoquote }} -->
            Time Limit
            <span class="float-right text-muted"
              ><!-- {{infoquote.cotFecha}} -->

              {{
                moment(infoquote.bokTimeLimit).format("MMM DD YYYY h:mm:ss a")
              }}
            </span>
          </p>
          <p class="mb-2">
            <!--    {{ infoquote }} -->
            Dates
            <span class="float-right text-muted"
              ><!-- {{infoquote.cotFecha}} -->
              {{ moment(infoquote.cotDesde).format("MMM DD YYYY ") }} to
              {{ moment(infoquote.cotHasta).format("MMM DD YYYY ") }}
            </span>
          </p>
        
          <p class="mb-2">
            <!--    {{ infoquote }} -->
            Seller
            <span class="float-right text-muted"
              ><!-- {{infoquote.cotFecha}} -->
              {{ infoquote.vendedorName }}
            </span>
          </p>
        </div>
      </b-card>
    </b-modal>

    <vue-perfect-scrollbar
      :class="allQuotes.lenght > 0 || allQuotes.lenght < 7 ? 'inactive' : ''"
      class="scroll dashboard dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
    >
      <b-table
        sticky-header
        :items="searchResult"
        :fields="fields"
        :filter="filter"
        show-empty
        small
        bordered
        hover
        class="dsh-resent border-table p-0"
        thead-class="border-table"
      >

      <template v-slot:head(cotCodigo)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(cotReferencia)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(vendedorName)="data">
        <div class="text-center">{{ data.label }}</div>
      </template> 
      <template v-slot:head(mail)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>      
      <template v-slot:head(status)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>            
      <template v-slot:head(actions)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>

        <template #cell(cotCodigo)="data">
          <!-- {{data.item}} -->
          <center>
          <div class="row px-1 ">
          <a
            href="#" 
            v-tooltip="{content:`${$t('gps.tooltips.general-information')}` }" 
            @click="gotogroupquote(data.item.grupoId)"
            class="badge badge-warning status  h4 ml-3"
            >{{ data.item.cotCodigo }}</a> 
   
          <!-- <i
            v-if="data.item.cotCorreoEnviado"
            v-b-tooltip.hover  placement="top" :title="'Quote sent '+
             format_date( data.item.cotCorreoEnviado)
            "
            :id="'tool-' + data.item.grupoId"
            class="fas fa-paper-plane email-send ml-2 text-muted"
          ></i> -->

          <div 
              v-if="data.item.cotCorreoEnviado"
              placement="top"
              :title="'Quote sent ' + format_date(data.item.cotCorreoEnviado)"
              :id="'tool-' + data.item.grupoId"
              class="glyph-icon iconsminds-mail-send ml-2 text-muted">
            </div>


        </div>
          </center>

        </template>
        <template #cell(cotReferencia)="data">
          <small class="mb-0 mr-2 text-muted">{{
            data.item.cotReferencia
          }}</small>
        </template>
        <template #cell(startdate)="data">
          <small class="mb-0 mr-2 text-muted">{{ data.item.clienteName }}</small
          ><!--  {{data.item}} -->
        </template>
        <template #cell(mail)="data">
          <small class="text-muted">{{data.item.cotCorreoCliente.trim()}}</small>
        </template>
        <template #cell(vendedorName)="data">
          <small class="d-block mb-0 mr-2 text-muted">{{ data.item.vendedorName}}</small>
          <small class="d-block text-muted">({{data.item.cotCorreoCliente}})</small>
        </template>
        <template #cell(actions)="data">
          <!-- v-if="data.item.cotEstado === 1" -->
          <b-button            
            :disabled="data.item.cotEstado != 1"
            variant="outline-info default actions"
            size="sm"
            data-toggle="tooltip"
            data-placement="top"
            title="Preview"
            @click="gotopreview(data.item.cotId)"
          >
            <i class="fas fa-file-import"></i>
          </b-button>
          <b-button
            variant="outline-primary default actions"
            size="sm"
            v-b-modal.modalcopyquote
            data-toggle="tooltip"
            data-placement="top"
            title="Click here to display and copy summary"
            @click="copyquote(data.item.cotId)"
          >
            <i class="fas fa-clipboard"></i>
          </b-button>
<!-- {{data.item}} -->
       <!--    <b-button
            variant="outline-info default actions"
            size="sm"
            data-toggle="tooltip"
            data-placement="top"
            title="Details"
            v-b-modal.modal-1
            @click="detailquote(data.item)"
          >
            <i class="fas fa-eye"></i> // este boton se quita por inconsitencias de datos para time limit
          </b-button> -->
        </template>
        <template #cell(status)="data">
            <!-- <b-badge
            :style="{ color: data.item.colorEstado }"
            variant="warning"
            class="p-1"
            size="sm"
            >{{ data.item.nombreEstado }}</b-badge> -->
            <b-badge
            :style="{ backgroundColor: data.item.colorEstado }"
            variant="warning"
            class="p-1"
            size="sm"
            >{{ data.item.nombreEstado }}</b-badge>
        </template>
      </b-table>
    </vue-perfect-scrollbar>

    <b-modal  id="modalcopyquote" size="md" :title="'Order Summary'"
          hide-footer>
          <copy-quote :cotId="cot"></copy-quote>
        </b-modal>
  
      </b-card>
  
</template>

<script>
import DashboardServices from "../../../../services/gps/dashboard/DashboardServices.js";
import MailServices from "../../../../services/gps/mail/MailServices.js";
import moment from "moment";
export default {
  name: "LastConfirmations",

  data() {
    return {
       namesUser: [],
       cot:"",
      selecteduser: null,
      allQuotes: [],
      perPage: 3,
      loading: false,
      infoquote: [],
      currentPage: 1,
      filter: null,
      fields: [
        {
          key: "cotCodigo",
          label: "Code",
          sortable: false,
          sortDirection: "desc",
          tdClass: "align-middle  w-15",
        },
        {
          key: "cotReferencia",
          label: "Reference",
          sortable: false,
          sortDirection: "desc",
          tdClass: "align-middle ",
        },
    /*     {
          key: "startdate",
          label: "Client",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate",
        }, */
        {
          key: "vendedorName",
          label: "Seller",
          sortable: false,
          sortDirection: "desc",
          tdClass: "align-middle ",
        },        
        // {
        //   key: "mail",
        //   label: "Prepared by",
        //   sortable: false,
        //   sortDirection: "desc",
        //   tdClass: "align-middle ",
        // },
        {
          key: "status",
          label: "Status",
          sortable: false,
          sortDirection: "desc",
          tdClass: "align-middle text-center",
        },

        { key: "actions", label: "Actions", tdClass: "align-middle  text-center" },
      ],
    };
  },
  computed: {
    rows() {
      return this.allQuotes.length;
    },
    searchResult() {
      let tempRecipes = this.allQuotes;
      if (this.selecteduser != "" && this.selecteduser) {
        tempRecipes = tempRecipes.filter((item) => {
          if(Boolean(item.vendedorName))  return item.vendedorName.includes(this.selecteduser);
        });
      }else{
        return tempRecipes;
      }

      return tempRecipes;
    },
  },
  methods: {
      format_date(value){
         if (value) {
           return moment(String(value)).format('MMM DD YYYY h:mm:ss a')
          }
      },
      copyquote(cot){
        this.cot=cot

      },
    sendQuotescot(id) {
      if (confirm("Are you sure to send this quote")) {
        let cotizacion = id;
        MailServices.sendQuotescot(cotizacion)
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
    detailquote(informacionquote) {
      this.infoquote = informacionquote;
    },
    getActiveQuotes() {
      this.loading = true;

      DashboardServices.getActiveQuotes()
        .then((response) => {
          this.allQuotes = response.data.data;
          this.loading = false;


       this.selecteduser = null;

          if (this.allQuotes.length > 0) {
            let myArray = this.allQuotes;
            let groups = Object.create(null);
            let grouped = [];

            myArray.forEach(function (o) {
              if (!groups[o.vendedorName]) {
                groups[o.vendedorName] = [];
                grouped.push({
                  userName: o.vendedorName,
                });
              }
            });
            this.namesUser = grouped.sort((c1, c2) => c1.userName > c2.userName);
          }



        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },

    goToQuote(gctId) {
      this.$router.push({ path: `/quote/${gctId}` });
    },

    gotogroupquote(gctId) {
      let routeData = this.$router.resolve({
        name: "quote",
        params: { gctId: gctId },
      });
      window.open(routeData.href, "_blank");
    },

    gotopreview(cotId) {
      let routeData = this.$router.resolve({
        name: "quotepreview",
        params: { cotId: cotId },
      });
      window.open(routeData.href, "_blank");
    },
  },
  mounted() {
    this.getActiveQuotes();
  },
};
</script>


<style scoped>
* >>> .table.dsh-resent th, .table-sm.dsh-resent th, .table-sm.dsh-resent td {
  border-color: #b6b3b3 !important;
  text-align: center;
  font-size: 13px;
}
/* Estilos de cabecera con sticky header (Fixed al hacer scroll) */
* >>> .b-table-sticky-header > .table.b-table > thead > tr > th {
  background: #b6b3b3;
  text-align: center;
  font-size: 12px;
  color: white;
}
.height-filters {
font-size: 0.7rem !important;
height: calc(2.3rem + 3px) !important;
}

.border-table {
border-radius: 15px !important;
}

.scroll-area  {
position: relative;
margin: auto;
width: 400px;
height: 700px;
}

* >>>.b-table-sticky-header {
max-height: 1900px !important;
}

* >>>.scroll-area {
height: 100%;
}

.text-time-limit{
font-size: 12px;
}

</style>