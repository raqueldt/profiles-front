<template>
  <div class="container-fluid">

    <vue-perfect-scrollbar class="scroll dashboard dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }">
      <div v-if="item.length > 0">
        <b-table small :items="item" :fields="newFields" striped responsive="sm" table-layout:fixed caption-top
        :tbody-tr-class="rowClass" sticky-header>

          <!-- CABECERAS -->
          <template v-slot:head(index)="data">
            <div class="text-center">{{ data.label }}</div>
          </template>
          <template v-slot:head(userName)="data">
            <div class="text-center">{{ data.label }}</div>
          </template>
          <template v-slot:head(wtlNote)="data">
            <div class="text-center">{{ data.label }}</div>
          </template>          
          <template v-slot:head(actions)="data">
            <div v-if="tag==='Active'" class="text-center">{{ data.label }}</div>
          </template>

      <template #table-caption>        
        <h6 v-if="tag==='Active'"> Active waiting list</h6>
        <h6 v-else> Inactive waiting list</h6>
      </template>

      <template #cell(index)="data">
        <center>
        {{ data.index + 1 }}
        </center>
      </template>

          <template #cell(userName)="data">
            <span class="text-primary">
              <i class="glyph-icon simple-icon-user"></i> {{data.item.userName}}
            </span><br>
            <small class="text-black">
              <i class="glyph-icon simple-icon-calendar"></i> {{formatDate(data.item.created_at)}}
            </small><br>
            <small class="text-muted">{{data.item.clientName}}</small>
          </template>

          <template #cell(actions)="data">
            <div v-if="tag !='Inactive'">
            <center>
              <b-button size="sm" variant="outline-danger" class="border-0" @click="confirmDelete(data.item.wtlId)"
              v-tooltip="{content: 'Click here to deactive this register', placement: 'top', classes: ['itineraries'],}">
                <i class="glyph-icon simple-icon-ban"></i>
              </b-button>
            </center>
            </div>
          </template>

        </b-table>
      </div>
      <div v-else>
        <b-alert class="w-100 text-justify" variant="primary" show v-if="waitingList.length == 0 && tag=='Active'">
          <h4 class="alert-heading">
            <i class="glyph-icon iconsminds-information"></i> No waiting list added!
          </h4>
          <span>There is not waiting list information to this departure.
            In order to add a new register, please <b>select client</b> and <b>add a comment</b>
          </span>
        </b-alert>
      </div>
    </vue-perfect-scrollbar>

  </div>
</template>

<script>
  import WaitingListServices from "../../../../../services/gps/waitinglist/WaitingListServices.js";
  import vSelect from "vue-select";
  import "vue-select/dist/vue-select.css";
  import moment from "moment";

  export default {
    name: 'ModalWaitingList',
    props: ["item", "tag"],
    components: {
      "v-select": vSelect,
    },
    data() {
      return {
        waitingList: "",
      }
    },
    watch: {
    },
    computed: {
      newFields(){
        if(this.tag==='Active'){
          return  [
          {
            key: "index",
            label: "Priority",
            tdClass: 'align-middle text-center'
          },          
          {
            key: "userName",
            label: "User",
            width: '200px',
            tdClass: 'align-middle text-center'
          },
          {
            key: "wtlNote",
            label: "Comment",            
            tdClass: 'align-middle text-center'
          },
          {
            key: "actions",
            label: "Actions",
            tdClass: 'align-middle text-center'
          },
        ];
        }else{
          return  [
          {
            key: "index",
            label: "Priority",
            thClass: 'd-none', 
            tdClass: 'd-none'
          },          
          {
            key: "userName",
            label: "User",     
            tdClass: 'align-middle text-center'       
          },
          {
            key: "wtlNote",
            label: "Comment",            
            tdClass: 'align-middle text-center'
          },
          {
            key: "actions",
            label: "Actions",
            thClass: 'd-none', 
            tdClass: 'd-none'
          },
        ];
        }
      }
    },
    methods: {
      rowClass(item, type) {
        if (this.tag === 'Active') return 'table-success'
      },
      formatDate(fecha) {
        return moment(fecha).format('DD MMMM  YYYY, ddd - H:mm')
      },
      confirmDelete(wtlId) {
        this.$swal({
          title: 'Deactivate this register?',
          text: "It seems that yo want to deactivate this register. Do you want to proceed?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, deactivate it!',
          cancelButtonText: 'No, cancel!',
          confirmButtonColor: "#ED7117",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            //this.delete(wtlId);
            this.updateStatus(wtlId);
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {

          }
        })
      },
      delete(wtlId) {
        WaitingListServices.deleteWaitingListById(wtlId)
          .then(() => {
            this.getWaitingList()
          })
          .catch(error => console.log(error))
      },
      updateStatus(id) {
        let data = {
          estado: 0,
        };
        WaitingListServices.updateStatus(id, data).then((response) => {}).catch(error => {
            console.log("No event was updated: " + error)
          })
          .finally(() => {
            //this.getWaitingList()
            this.$emit("reloadWaitingList");
          });
      },
    },
    mounted() {
    }
  }

</script>

<style lang="scss" scoped></style>
