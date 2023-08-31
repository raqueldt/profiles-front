<template>

<!-- OBSOLETO. 
ARCHIVO HABIL: QuotesDashboard -->


  <b-card>
    <div class="card-title mb-0">
      <div class="d-flex">
        <h4 class="w-40 mb-0 mt-1">{{ $t("gps.quotes") }}</h4>
        <b-refresh-button
          style="padding: 0.7rem"
          @click="this.getActiveQuotes"
        />
        <div class="w-50">
          <b-form-group inline size="sm">
            <b-form-input
              style="height: calc(1.3em + 0.5rem + 2px); font-size: 0.75rem"
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

    <!-- {{allQuotes}} -->
    <div class="col-md-6 float-right">
      <!--a href="#" @click="this.getActiveQuotes" > <i style="float:right" 
           
            class="glyph-icon iconsminds-refresh mr-1"
          ></i></a-->

      <div class="text-center" v-if="loading">
        <b-button variant="dark" disabled>
          <b-spinner small></b-spinner>
          <span class="sr-only">Loading...</span>
        </b-button>

        <b-button variant="dark" disabled>
          <b-spinner small type="grow"></b-spinner>
          Loading...
        </b-button>
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
        :items="allQuotes"
        :fields="fields"
        :filter="filter"
        show-empty
        small
        bordered
        class="dsh-resent"
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
      <template v-slot:head(status)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>            
      <template v-slot:head(actions)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>

        <template #cell(cotCodigo)="data">
          <!-- {{data.item}} -->
          <center>
          <a
            href="#" 
            @click="gotogroupquote(data.item.grupoId)"
            class="badge badge-warning status  h4"
            >ATC-{{ data.item.cotCodigo }}</a
          > <!-- {{data.item}} -->
          <i
            v-if="data.item.cotCorreoEnviado"
            v-b-tooltip.hover  placement="top" :title="'Quote sent '+
             format_date( data.item.cotCorreoEnviado)
            "
            :id="'tool-' + data.item.grupoId"
            class="fas fa-paper-plane email-send ml-2 text-muted"
          ></i>
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
        <template #cell(vendedorName)="data">
          <small class="mb-0 mr-2 text-muted">{{
            data.item.vendedorName
          }}</small>
        </template>
        <template #cell(actions)="data">
          <b-button
            variant="outline-info default actions"
            size="sm"
            data-toggle="tooltip"
            data-placement="top"
            title="Preview"
            @click="gotopreview(data.item.cotId)"
          >
            <i class="fas fa-file-import"></i>
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
          <b-badge
            :style="{ color: data.item.colorEstado }"
            variant="outline"
            class="p-1"
            size="sm"
            >{{ data.item.nombreEstado }}</b-badge
          >
        </template>
      </b-table>
    </vue-perfect-scrollbar>
  </b-card>
</template>

<script>
import DashboardServices from "../../../services/gps/dashboard/DashboardServices.js";
import MailServices from "../../../services/gps/mail/MailServices.js";
import moment from "moment";
export default {
  name: "LastConfirmations",

  data() {
    return {
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
          tdClass: "list-item-enddate",
        },
        {
          key: "cotReferencia",
          label: "Reference",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate",
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
          tdClass: "list-item-enddate",
        },

        {
          key: "status",
          label: "Status",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-enddate text-center",
        },

        { key: "actions", label: "Preview", tdClass: "text-center" },
      ],
    };
  },
  computed: {
    rows() {
      return this.allQuotes.length;
    },
  },
  methods: {
      format_date(value){
         if (value) {
           return moment(String(value)).format('MMM DD YYYY h:mm:ss a')
          }
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
