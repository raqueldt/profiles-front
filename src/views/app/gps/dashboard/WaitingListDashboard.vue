<template>
  <b-card>
    <div class="card-title mb-0">
      <div class="d-flex">
        <h4 class="w-40 mb-0 mt-1 text-primary">{{ $t("gps.tooltips.waiting-list") }}</h4>
        <b-refresh-button
          style="padding: 0.7rem"
          @click="this.getWaitingList"
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
              placeholder="Search"
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

    <vue-perfect-scrollbar
      :class="allQuotes.lenght > 0 || allQuotes.lenght < 7 ? 'inactive' : ''"
      class="scroll dashboard dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
    >
      <b-table
        sticky-header
        :items="waitingList"
        :fields="fields"
        :filter="filter"
        show-empty
        small
        bordered
        class="dsh-resent border-table p-0"
        thead-class="border-table"
      >

      <template v-slot:head(userName)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(clientName)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(wtlNote)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>      
      <!-- <template v-slot:head(status)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>             -->
      <template v-slot:head(actions)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>

        <template #cell(userName)="data">
            <span class="mr-4 d-block">
              <b>{{data.item.userName}}</b>
            </span>
            <small class="mb-0 mr-2 text-muted  d-block">{{formatDate(data.item.created_at)}}</small><br>            
        </template>
        <template #cell(clientName)="data">
            <b class="mb-0 mr-2 text-info  d-block">
                {{data.item.clientName}}
            </b>
            <small class="mb-0 text-muted d-block">{{formatDate(data.item.depStartDate)}}</small>
            <small class="mb-0 text-muted d-block">{{formatDate(data.item.depEndDate)}}</small>
        </template> 
        <template #cell(wtlNote)="data">
            <small class="mb-0 mr-2 text-muted text-justify">
                {{data.item.wtlNote}}
            </small>
        </template> 
        <template #cell(wtlStatus)="data">
          <center>
            <small v-if="data.item.wtlStatus == 1" class="text-success text-center">
                Active
            </small>
            <small v-else class="text-warning text-center">
              Inactive
            </small>
          </center>
        </template>                        
        <template #cell(actions)="data">
          
          <center>
          <b-button
            v-if="data.item.wtlStatus == 1"
            v-tooltip="{content: 'Change status', placement: 'top', classes: ['itineraries'],}"
            variant="outline-info default actions"
            size="sm"
            data-toggle="tooltip"
            data-placement="top"
            title="Preview"
            @click="updateStatus(data.item.wtlId)"
          >
            <i class="fas iconsminds-flash-2"></i>
          </b-button>
          </center>
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
import DashboardServices from "../../../../services/gps/dashboard/DashboardServices.js";
import WaitingListServices from "@/services/gps/waitinglist/WaitingListServices.js";
import MailServices from "../../../../services/gps/mail/MailServices.js";
import moment from "moment";
export default {
  name: "LastConfirmations",

  data() {
    return {
        userId: this.$store.getters.currentUser.id,
        waitingList:[],
      loading: false,
      allQuotes: [],
      perPage: 3,
      loading: false,
      infoquote: [],
      currentPage: 1,
      filter: null,
      fields: [
        {
          key: "userName",
          label: "User",
          sortable: false,
          tdClass: 'align-middle'
        },
        {
          key: "clientName",
          label: "Client",
          sortable: false,
          tdClass: 'align-middle'
        },
        // {
        //   key: "depStartDate",
        //   label: "Init",
        //   sortable: false,
        //   tdClass: "list-item-enddate",
        // },        
        // {
        //   key: "depEndDate",
        //   label: "End",
        //   sortable: false,
        //   tdClass: "list-item-enddate",
        // },                
        {
          key: "wtlNote",
          label: "Comment",
          sortable: false,
          sortDirection: "desc",
          tdClass: 'align-middle'
        },
        {
          key: "wtlStatus",
          label: "Status",
          sortable: false,
          sortDirection: "desc",
          tdClass: 'align-middle'
        },

        { key: "actions", label: "Actions", tdClass: 'align-middle' },
      ],
    };
  },
  computed: {
    rows() {
      return this.waitingList.length;
    },
  },
  methods: {
      formatDate(value){
         if (value) {
           return moment(String(value)).format('MMM DD YYYY h:mm:ss a')
          }
      },     
      getWaitingList() {
        this.loading = true;
        let userId = this.userId
        WaitingListServices.getWaitingListByUserId(userId)
          .then((response) => {
            this.waitingList = response.data.data;
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
          });
      },
			updateStatus(wtlId){	
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
              this.update(wtlId);
            } else if (
              result.dismiss === this.$swal.DismissReason.cancel
            ) {
            }
          });
			},
      update(wtlId){
          let data ={
            estado:0,
          };
          WaitingListServices.updateStatus(wtlId, data).then((response) => {
            this.successUpdateMessage();
          }).catch(error => {console.log("No event was updated: " + error)})
          .finally(() => this.getWaitingList());
      },
      successUpdateMessage() {
        let type = "success filled";
        let title = "Success";
        let message = "Waiting list updated successfully"; {
          this.$notify(type, title, message, {
            duration: 5000,
            permanent: false,
          });
        }
      }            
  },
  mounted() {
    this.getWaitingList();
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
