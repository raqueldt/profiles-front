<template>
  <b-card>
    <div class="card-title mb-0 ">
      <div class="d-flex">
        <h4 class="w-40 mb-0 mt-1 text-primary" v-if="flag==='seller'">Requests from my clients</h4>
        <h4 class="w-40 mb-0 mt-1 text-primary" v-if="flag==='all'">All client requests</h4>

        <b-refresh-button style="padding: 0.7rem" @click="this.getPublicRequest" />

        <div class="w-25">
          <b-form-group inline size="sm">
            <b-form-input style="height: calc(2em + 0.5rem + 2px); font-size: 0.75rem" class="float-right"
              id="filter-input" v-model="filter" type="search" size="sm" placeholder="Search"></b-form-input>
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

    <vue-perfect-scrollbar :class="requests.lenght > 0 || requests.lenght < 7 ? 'inactive' : ''"
      class="scroll dashboard dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }">

      <b-table sticky-header fixed responsive :items="searchResult" :fields="fields" :filter="filter" show-empty small
        bordered hover :tbody-tr-class="rowClass" class="dsh-resent border-table p-0" id="mytable"
        thead-class="border-table" caption-top>

        <template #table-caption>From the partners website</template>

        <template v-slot:head(mail)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(prqName)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(prqReference)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(prqPax)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(dates)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(prqType)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(prqNotes)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(cruName)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(itiName)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template v-slot:head(sellerName)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>

        <template #cell(mail)="data">
          <small class="mb-0  text-muted">            
            
            <!-- Mostrar envio de correos desde Public Request -->
            <template v-if="Boolean(data.item.prqEmailTo)">
                <i class="h6 text-success glyph-icon iconsminds-mail-send"
                data-toggle="tooltip" data-placement="top" :title="'Mail sent to client: '+ data.item.prqEmailTo"
                ></i>
            </template>
            <template v-else>
                <i class="h6 text-danger glyph-icon iconsminds-mail-remove-x"
                data-toggle="tooltip" data-placement="top" title="Mail no sent to client"
                ></i>
            </template>

            <template v-if="Boolean(data.item.prqSellerEmailTo)">
                <i class="h6 text-success glyph-icon iconsminds-mail-send"
                data-toggle="tooltip" data-placement="top" :title="'Mail sent to seller: '+ data.item.prqSellerEmailTo"
                ></i>
            </template>
            <template v-else>
                <i class="h6 text-danger glyph-icon iconsminds-mail-remove-x"
                data-toggle="tooltip" data-placement="top" title="Mail no sent to ATC seller"
                ></i>
            </template>    
            <!-- Fin mostrar envio de correos desde Public Request -->        

          </small>
        </template>

        <template #cell(prqName)="data">
          <!-- {{data.item}} -->
          <small class="d-block text-muted">
            <b>{{data.item.prqName}}</b>
          </small>
          <small class="d-block  font-italic text-muted">({{data.item.prqEmail}})</small>
        </template>
        <template #cell(prqReference)="data">
          <small class="mb-0  text-muted">{{
              data.item.prqReference
            }}
          </small>
        </template>
        <template #cell(dates)="data">
          <center>
            <small class="mb-0 d-block text-muted">
              {{ formatDate(data.item.depStartDate) }} to
            </small>
            <small class="d-block text-muted"> {{ formatDate(data.item.depEndDate)}}
            </small>
            <small class="d-block text-muted"> Itinerary code: <b>{{ data.item.itiCode}}</b>
            </small>
          </center>
        </template>
        <!-- <template #cell(end)="data">
            <center>
            <small class="mb-0  text-muted">
              {{ formatDate(data.item.depEndDate)}}
            </small>
            </center>
          </template> -->
        <template #cell(prqPax)="data">
          <small class="mb-0  text-muted">{{
              data.item.prqPax
            }}</small>
        </template>

        <template #cell(prqType)="data">
          <small class="mb-0  text-muted">{{
              data.item.prqType
            }}</small>
        </template>

        <template #cell(prqNotes)="data">
          <small class="mb-0  text-muted">{{
              data.item.prqNotes
            }}</small>
        </template>

        <template #cell(cruName)="data">
          <center>
            <small class="mb-0  text-muted">{{
              data.item.cruName
            }}</small>
          </center>
        </template>

        <!-- <template #cell(itiName)="data">
            <center>
            <small class="mb-0  text-muted">{{
              data.item.itiName
            }}</small>
            </center>
          </template>   -->

        <template #cell(created_at)="data">
          <center>
            <small class="mb-0  text-muted">
              {{ moment(data.item.created_at).format("DD MMM YYYY, ddd  HH:mm") }}
            </small>
          </center>
        </template>

        <template #cell(sellerName)="data">
          <small class="mb-0  text-muted">{{data.item.sellerName}}
          </small>
        </template>


        <template #cell(status)="data">
          <center>
            <template v-if="data.item.prqStatus === '1'">
              <b-button variant="outline-primary default actions" size="sm" data-toggle="tooltip" data-placement="top"
                title="Pending. Click here to update status" @click="updateStatus(data.item.prqId)">
                <i class="glyph-icon simple-icon-pencil"></i>
              </b-button>
            </template>
            <template v-else>
              <i class="text-success h5 glyph-icon iconsminds-yes" data-toggle="tooltip" data-placement="top"
                title="Processed"></i>
            </template>

          </center>
        </template>


        <!-- <template #cell(actions)="data">
            <b-button variant="outline-info default actions" size="sm" data-toggle="tooltip" data-placement="top"
              title="Preview" @click="gotopreview(data.item.cotId)">
              <i class="fas fa-file-import"></i>
            </b-button>
          </template> -->

      </b-table>
    </vue-perfect-scrollbar>
  </b-card>
</template>

<script>
  import DashboardServices from "../../../../services/gps/dashboard/DashboardServices.js";
  import PublicRequestServices from "../../../../services/gps/publicrequest/PublicRequestServices.js";
  import MailServices from "../../../../services/gps/mail/MailServices.js";
  import moment from "moment";
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from "vuex";
  import VueSweetalert2 from 'vue-sweetalert2';
  import 'sweetalert2/dist/sweetalert2.min.css';

  export default {
    name: "LastConfirmations",
    props: ["flag"],
    data() {

      return {
        namesUser: [],
        selecteduser: null,
        requests: [],
        perPage: 3,
        loading: false,
        infoquote: [],
        currentPage: 1,
        hours: "",
        months: "",
        minutes: "",
        days: "",
        userId: this.$store.getters.currentUser.id,
        filter: null,
        fields: [
          {
            key: "mail",
            label: "Mail",
            sortable: false,
            sortDirection: "desc",
            tdClass: "align-middle text-center bg-light",
            thClass: ' align-middle bg-warning',
             thStyle: {
              width: "4%"
            },
          },
          {
            key: "prqName",
            label: "Client",
            sortable: false,
            sortDirection: "desc",
            tdClass: "align-middle",
          },

          {
            key: "prqReference",
            label: "Reference",
            sortable: false,
            sortDirection: "desc",
            tdClass: "align-middle",
          },
          {
            key: "prqPax",
            label: "Pax",
            sortable: false,
            sortDirection: "desc",
            tdClass: "align-middle text-center",
            thStyle: {
              width: "3%"
            },
          },
          {
            key: "prqType",
            label: "Type",
            sortable: false,
            sortDirection: "desc",
            tdClass: "align-middle",
          },
          {
            key: "prqNotes",
            label: "Notes",
            sortable: false,
            sortDirection: "desc",
            tdClass: "align-middle",
          },
          {
            key: "cruName",
            label: "Cruise",
            sortable: false,
            sortDirection: "desc",
            tdClass: "align-middle",
            thStyle: {
              width: "5%"
            },
          },
          {
            key: "dates",
            label: "Dates",
            sortable: false,
            sortDirection: "desc",
            tdClass: "align-middle",
          },
          // {
          //   key: "itiName",
          //   label: "Itinerary",
          //   sortable: false,
          //   sortDirection: "desc",
          //   tdClass: "align-middle",
          // },
          {
            key: "created_at",
            label: "Created",
            sortable: false,
            sortDirection: "desc",
            tdClass: "align-middle",
          },
          {
            key: "sellerName",
            label: "Seller",
            sortable: false,
            sortDirection: "desc",
            tdClass: "align-middle",
            thClass: "align-middle",
            tdClass: this.flag === 'all' ? "d-none" : "align-middle",
            thClass: this.flag === 'all' ? "d-none" : "align-middle",
            thStyle: {
              width: "10%"
            },
          },
          {
            key: "status",
            label: "Status",
            sortable: false,
            sortDirection: "desc",
            tdClass: "align-middle",
            thStyle: {
              width: "5%"
            },
          },
        ],
      };
    },
    computed: {
      ...mapGetters({
        currentUser: "currentUser",
      }),
      rows() {
        return this.requests.length;
      },
      searchResult() {
        let tempRecipes = this.requests;

        if (this.selecteduser != "" && this.selecteduser) {
          tempRecipes = tempRecipes.filter((item) => {
            return item.vendedorName.includes(this.selecteduser);
          });
        }

        return tempRecipes;
      },
    },
    methods: {
      format_date(value) {
        if (value) {
          return moment(String(value)).format('MMM DD YYYY h:mm:ss a')
        }
      },

      formatRemaining(fecha) {
        var inicio = moment();
        var fin = moment(fecha);
        var duration = moment.duration(fin.diff(inicio));
        var days = duration.asDays();
        var hours = duration.asHours();
        if (days > 0) return `${parseInt(days)} day(s) remaining`
        else return "Expired"
      },

      getPublicRequest() {
        this.loading = true;

        PublicRequestServices.getPublicRequest()
          .then((response) => {

            // Discriminación por vendedor: 
            let sellerId = this.currentUser.id;
            if (this.flag === 'seller') this.requests = response.data.data.filter(item => item.sellerId == sellerId)
            if (this.flag === 'all') this.requests = response.data.data.filter(item => !Boolean(item.sellerId) || !
              Boolean(item.prqUser))

            this.loading = false;
            this.selecteduser = null;
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
      },

      gotopreview(cotId) {
        let routeData = this.$router.resolve({
          name: "quotepreview",
          params: {
            cotId: cotId
          },
        });
        window.open(routeData.href, "_blank");
      },
      formatDate(fecha) {
        if (fecha) return moment(fecha).format("D MMMM  YYYY");
        else return null;
      },
      updateStatus(prqId) {
        this.$swal({
          title: "Update status?",
          text: "",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          confirmButtonColor: "#ED7117",
          reverseButtons: true
        }).then(result => {
          if (result.isConfirmed) {
            this.update(prqId);
          } else if (
            result.dismiss === this.$swal.DismissReason.cancel
          ) {}
        });
      },
      update(prqId) {
        let data = {
          estado: 2,
        };
        PublicRequestServices.updateStatus(prqId, data).then((response) => {
            this.successMessage();
          }).catch(error => {
            console.log("No event was updated: " + error)
          })
          .finally(() => this.getPublicRequest());
      },
      successMessage() {
        let type = "success filled";
        let title = "Success";
        let message = "Status updated successfully"; {
          this.$notify(type, title, message, {
            duration: 2000,
            permanent: false,
          });
        }
      },
      rowClass(item, type) {
        if (Boolean(item) && item.prqStatus === '1') return 'table-warning'
      },
    },
    mounted() {
      this.getPublicRequest();
    },
  };

</script>
<style scoped>
  *>>>.table.dsh-resent th,
  .table-sm.dsh-resent th,
  .table-sm.dsh-resent td {
    border-color: #b6b3b3 !important;
    text-align: center;
    font-size: 13px;
  }

  /* Estilos de cabecera con sticky header (Fixed al hacer scroll) */
  *>>>.b-table-sticky-header>.table.b-table>thead>tr>th {
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

  .scroll-area {
    position: relative;
    margin: auto;
    width: 400px;
    height: 700px;
  }

  *>>>.b-table-sticky-header {
    max-height: 1900px !important;
  }

  *>>>.scroll-area {
    height: 100%;
  }

  .text-time-limit {
    font-size: 12px;
  }

</style>
