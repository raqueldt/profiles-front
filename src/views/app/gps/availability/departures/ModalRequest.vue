<template>
  <div class="container-fluid">
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

    <!--  En caso de no existir datos, por defecto el array viene con un solo objeto con todos sus
        elemenos en null, por lo que es importante validar si existe 1 objeto y que su bokId no sea vacio
         -->
    <div v-if="request.length > 0 && Boolean(request[0].bokId)">

      <component
        :is="request.length > 10 ? 'vue-perfect-scrollbar' : 'div' "
        :class='request.length > 10 ? "scroll-area" : ""'
        :settings="{ suppressScrollX: true, wheelPropagation: false }"
      >

      <b-table
      :striped="false"
        small
        responsive="sm"
        table-layout:fixed
        bordered
        :items="request"
        :fields="fields"
      >
        <template v-slot:head(code)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(razon_social)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(cotReferencia)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(nombreEstado)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(cotFecha)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(vendedorName)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(show_details)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>


        <template #cell(code)="data">
          <a
            v-if="Boolean(data.item.cofCodigo)"
            href="#"
            v-tooltip="{ content: `${$t('gps.tooltips.general-information')}` }"
            @click="goToConfirmations(data.item.cofId)"
            class="badge badge-success status h3 w-100"
            >{{ data.item.cofCodigo }}X</a
          >
          <a
            v-else
            href="#"
            v-tooltip="{ content: `${$t('gps.tooltips.general-information')}` }"
            @click="goToGroupQuote(data.item.gctId)"
            class="badge badge-warning status  h3  w-100"
            >{{ data.item.cotCodigo }}</a
          >
        </template>
        <template #cell(razon_social)="data">
          <span> {{ data.item.razon_social }} </span>
        </template>
        <template #cell(cotReferencia)="data">
          <span> {{ data.item.cotReferencia }} </span>
        </template>
        <template #cell(nombreEstado)="data">
          <!-- <pre>{{data.item}}</pre> -->
          <!-- <strong>
            <span :style="{ color: data.item.colorEstado }">
              {{ data.item.nombreEstado }}
            </span>
          </strong> -->
          
          <b-badge class="" :style="{backgroundColor: data.item.colorEstado + '!important'}">{{ data.item.nombreEstado }}</b-badge>

        </template>
        <template #cell(cotFecha)="data">
          <span> {{ formatDate(data.item.cotFecha) }} </span>
        </template>
        <template #cell(vendedorName)="data">
          <span> {{ data.item.vendedorName }} </span>
        </template>

        <template #cell(show_details)="row">
          <!-- <pre>{{row}}</pre> -->
          <template v-if="!Boolean(row.item.cofCodigo)">
            <b-button variant="primary" size="sm" 
            @click="goToGroupQuote(row.item.gctId)">
            Go
            </b-button>  
          </template>
          <template v-else>
            <b-button variant="primary" size="sm" 
            @click="goToConfirmations(row.item.cofId)">
            Go
            </b-button> 
          </template>


          <template v-if="row.detailsShowing ">
            <b-button variant="primary" size="sm" @click="row.toggleDetails">
              <small>Details <i class="glyph-icon simple-icon-arrow-up"></i> </small>
            </b-button>
          </template>
          <template v-else>
            <b-button variant="primary" size="sm" @click="row.toggleDetails">
              <small>Details <i class="glyph-icon simple-icon-arrow-down"></i> </small>
            </b-button>
          </template>

          <!-- <b-button variant="primary" size="sm" @click="row.toggleDetails">
            {{ row.detailsShowing ? '<i class="glyph-icon iconsminds-like"></i> Details' : "Show" }}
          </b-button>
          <b-button variant="primary" size="sm" @click="row.toggleDetails">
            {{ row.detailsShowing ? "Hide" : "Show" }} Details
          </b-button> -->

          <!-- <b-button variant="primary" size="sm" @click="row.toggleDetails">
            Details
          </b-button> -->
        </template>


        <template #row-details="row">
          <center>
          <b-card no-body v-if="!Boolean(row.item.cofCodigo)"  class=" w-85">
            <history-quote :cotId="row.item.cotId"></history-quote>
          </b-card>
          <b-card no-body header-bg-variant="primary" v-else  class=" w-85">
            <history-confirmation
              :cofId="row.item.cofId"
            ></history-confirmation>
          </b-card>
          </center>
        </template>

            
      </b-table>
    </component>  
    </div>

    <div v-else-if="request.length === 1 && !Boolean(request[0].bokId)">
      <b-alert class="w-100 text-justify" variant="primary" show>
        <h4 class="alert-heading">
          <i class="glyph-icon iconsminds-information"></i> No requests added!
        </h4>
        <span>There is not requests information to this departure. </span>
      </b-alert>
    </div>

    <b-col lg="12" class=" mt-3">
      <div class="modal-footer">
        <b-button variant="secondary" @click="$emit('closeModalRequest')"
          >Close
        </b-button>
      </div>
    </b-col>
  </div>
</template>

<script>
import DeparturesServices from "../../../../../services/gps/departures/DeparturesServices.js";
import moment from "moment";

export default {
  name: "ModalWaitingList",
  props: ["depId"],
  data() {
    return {
      modeHistory: false,
      userId: this.$store.getters.currentUser.id,
      history_quote: [],
      // fieldshistory: ["Date", "User", "Action"],

      request: [],
      loading: false,
      // fields1: ["Date", "User", "Action"],
      // items: [
      //   { isActive: true, Date: 40, User: "Dickerson", Action: "Macdonald" }
      // ],
      nameHistory: "",
      fields: [
        {
          key: "code",
          label: "Code",
          tdClass: "align-middle text-center",
          thStyle: { width: "7%" },
        },
        {
          key: "vendedorName",
          label: "User",
          tdClass: "align-middle text-center"
        },  
        {
          key: "cotFecha",
          label: "Processed",
          tdClass: "align-middle text-center"
        },                    
        {
          key: "cotReferencia",
          label: "Reference",
          tdClass: "align-middle text-center"
        },        
        {
          key: "razon_social",
          label: "Client",
          tdClass: "align-middle text-center"
        },
        {
          key: "nombreEstado",
          label: "Status",
          tdClass: "align-middle text-center"          
        },
        {
          key: "show_details",
          label: "Actions",
          tdClass: "align-middle text-center",
          thStyle: { width: "12%" },
          
        },
      ]
    };
  },

  computed: {
    filterCompany: {
      get() {
        return this.$store.getters.getInitialCompanyList;
      },
      set(value) {
        this.value = value;
      }
    },
    checkForm() {
      if (Boolean(this.nota) && Boolean(this.company)) return true;
      else return false;
    }
  },
  methods: {
  
    rowClass(item, type) {
      if (Boolean(item) && item.cotEstado === 0) return "table-danger";
    },
    formatDate(fecha) {
      if (fecha) return moment(fecha).format("D MMMM  YYYY, ddd");
      else return null;
    },
    async getRequest() {
      this.loading = true;
      await DeparturesServices.getHistoryDeparture(this.depId)
        .then(response => {
          this.request = response.data.data;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => (this.loading = false));
    },
    clear() {
      this.company = "";
      this.nota = "";
    },
    goToConfirmations(id) {
      let routeData = this.$router.resolve({
        name: "confirmations",
        params: { cofId: id }
      });
      window.open(routeData.href, "_blank");
    },

    goToGroupQuote(gctId) {
      let routeData = this.$router.resolve({
        name: "quote",
        params: { gctId: gctId }
      });
      window.open(routeData.href, "_blank");
    },
    successMessage() {
      let type = "success filled";
      let title = "Success";
      let message = "Waiting list added successfully";
      {
        this.$notify(type, title, message, {
          duration: 5000,
          permanent: false
        });
      }
    },
    
  },
  async mounted() {
    await this.getRequest();
  }
};
</script>

<style lang="scss" scoped>
  .scroll-area {
    position: relative;
    margin: 0px;
    width: auto;
    height: 400px;
  }
</style>
