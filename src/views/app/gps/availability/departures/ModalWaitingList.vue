<template>
  <div class="container-fluid">

    <b-row>

      <!-- Formulario para añadir Waiting list -->
      <b-col lg="12" >
        <b-row>
          <b-col lg="4">
            <b-form-group label="Client" label-cols="12" label-cols-lg="12" label-size="sm">
              <v-select v-model="company" :options="filterCompany" label="razon_social"
                item-value="header.headerCompany" item-text="razon_social" v-on:keyup.enter="save" />
            </b-form-group>
          </b-col>
          <b-col lg="5">
            <b-form-group label="Comments:" label-cols="12" label-cols-lg="12" label-size="sm">
              <b-input placeholder="Type commmets" v-model="nota" maxlength="50" v-on:keyup.enter="save"/>
            </b-form-group>
          </b-col>
          <b-col lg="3" class="row align-items-center">
            <center>
              <b-button variant="primary" :disabled="!checkForm" @click="save()">
                Add to waiting list
              </b-button>
            </center>
          </b-col>
        </b-row>
        <hr>
      </b-col>     
      <!-- Fin Formulario para añadir Waiting list -->

<!-- {{waitingListActive.length}}
{{waitingListActive.length}} -->
      <template v-if="waitingListActive.length > 0 && waitingListInActive.length">
            <b-col lg="7" class="p-0 m-0">
              <table-waiting-list :item="waitingListActive" tag="Active" @reloadWaitingList="getWaitingList"></table-waiting-list>
            </b-col>
            <b-col lg="5" class="p-0 m-0">
              <table-waiting-list :item="waitingListInActive" tag="Inactive" @reloadWaitingList="getWaitingList"></table-waiting-list>
            </b-col>
      </template>
      <template v-if="waitingListActive.length > 0 && waitingListInActive.length == 0">
            <b-col lg="12" class="p-0 m-0">
              <table-waiting-list :item="waitingListActive" tag="Active" @reloadWaitingList="getWaitingList"></table-waiting-list>
            </b-col>
      </template>
      <template v-if="waitingListActive.length == 0 && waitingListInActive.length == 0">
            <b-col lg="12" class="p-0 m-0">
              <table-waiting-list :item="waitingListActive" tag="Active" @reloadWaitingList="getWaitingList"></table-waiting-list>
            </b-col>
      </template>      
      <template v-if="waitingListActive.length == 0 && waitingListInActive.length > 0">
            <b-col lg="12" class="p-0 m-0">
              <table-waiting-list :item="waitingListInActive" tag="Inactive" @reloadWaitingList="getWaitingList"></table-waiting-list>
            </b-col>
      </template>      
    
      <!-- <b-col lg="7" class="p-0 m-0">
        <table-waiting-list :item="waitingListActive" tag="Active" @reloadWaitingList="getWaitingList"></table-waiting-list>
      </b-col>

      <b-col lg="5" class="p-0 m-0">
        <table-waiting-list :item="waitingListInActive" tag="Inactive" @reloadWaitingList="getWaitingList"></table-waiting-list>
      </b-col> -->

      <b-col lg="12" class=" mt-4">
        <div class="modal-footer">
          <b-button variant="secondary" @click="$emit('closeModalWaitingList')">Close
          </b-button>
        </div>
      </b-col>
    </b-row>

  </div>
</template>

<script>
  import WaitingListServices from "../../../../../services/gps/waitinglist/WaitingListServices.js";
  import ProfilesServices from "../../../../../services/gps/profiles/ProfilesServices.js";
  import vSelect from "vue-select";
  import "vue-select/dist/vue-select.css";
  import moment from "moment";
  

  export default {
    name: 'ModalWaitingList',
    props: ["departure"],
    components: {
      "v-select": vSelect,
    },
    data() {
      return {
        userId: this.$store.getters.currentUser.id,
        company: "",
        nota: "",
        waitingListActive: "",
        waitingListInActive: "",
        filterCompany:[]
      }
    },

    computed: {
      // filterCompany: {
      //   get() {
      //     return this.$store.getters.getInitialCompanyList;
      //   },
      //   set(value) {
      //     this.value = value;
      //   }
      // },
      checkForm() {
        if (Boolean(this.nota) && Boolean(this.company)) return true
        else return false
      }
    },
    methods: {
      formatDate(fecha) {
        return moment(fecha).format('MMMM Do, YYYY -  h:mm')
      },
      save() {
        let data = {
          depId: this.departure.depId,
          wtlClientId: this.company.id,
          wtlNote: this.nota,
          wtlUserId: this.userId,
        };

        WaitingListServices.addWaitingList(data)
          .then((response) => {
            this.successMessage();
            //EventBus.$emit('addWaitingListMethodBus');    //Evento que permitía recargar toda la disponibilidad
          })
          .catch((error) => {
            console.log(error);
          }).finally(() => {
            this.getWaitingList();
            this.$emit('closeModalWaitingList');
            this.clear();
          });
      },
      async getWaitingList() {
        let depId = this.departure.depId
        await WaitingListServices.getWaitingListByDepId(depId)
          .then((response) => {
            this.waitingListActive = response.data.data.filter(f => f.wtlStatus === 1);
            this.waitingListInActive = response.data.data.filter(f => f.wtlStatus === 0);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      clear() {
        this.company = "";
        this.nota = "";
      },
      successMessage() {
        let type = "success filled";
        let title = "Success";
        let message = "Waiting list added successfully"; {
          this.$notify(type, title, message, {
            duration: 5000,
            permanent: false,
          });
        }
      },
      getCompanies(){
        ProfilesServices.getComisionGPS()
        .then(response => {
          this.filterCompany = response.data.data
        })
        .catch(error => {
            console.log("Error: " + error.data);
        });
      }

    },
    async mounted() {
      await this.getCompanies();
      await this.getWaitingList();      
    }
  }

</script>

<style lang="scss" scoped></style>
