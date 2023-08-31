<template>

  <div>
    <template v-if="isLoading">
      <b-card>
        <b-skeleton animation="fade" width="85%"></b-skeleton>
        <b-skeleton animation="fade" width="55%"></b-skeleton>
        <b-skeleton animation="fade" width="70%"></b-skeleton>
      </b-card>
    </template>

    <!-- data section -->
    <template v-else>

      <!-- empty/error data  -->
      <template>
      </template>

      <template>

        <div class="container-fluid">
          <!-- ----------------------- BREADCRUM  -----------------------  -->
          <h1>{{ $t("gps.confirmations") }}</h1>
          <span>
            <ul
              class="
                nav
                pt-0
                breadcrumb-container
                d-none d-sm-block d-lg-inline-block
              "
            >
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="/app/dashboard" class="active" target="_self">{{
                    $t("menu.home")
                  }}</a>
                </li>
                <li class="breadcrumb-item active">
                  <span aria-current="location">{{ $t("gps.confirmations") }}</span>
                </li>
              </ol>
            </ul>
          </span>


          <!-- menú contextual  -->
          <span>
            <b-dropdown class="float-right mr-1 mt-3" variant="link" right toggle-class="text-decoration-none p-0" no-caret>
              <template #button-content>
                <i class="glyph-icon simple-icon-options-vertical" style="color:gray"></i>
              </template>
              <b-dropdown-item href="#"
                :disabled="dataConfirmation.cofEstado == 0"
                @click.prevent="showModalPeriodConfirmation"

              >Update date range</b-dropdown-item>
              <b-dropdown-divider/>
              <b-dropdown-item
                :disabled="dataConfirmation.cofEstado == 0"
                @click.prevent="showModalOptionsConfirmation"
              >
                <span class="text-danger">Cancel Confirmation</span>
              </b-dropdown-item>
            </b-dropdown>
          </span>
          <!-- ----------------------- FIN BREADCRUM  -----------------------  -->

          <!-- header confirmation-->
          <b-row >
            <b-col >
              <b-card no-body class="p-2 mb-2">

                <div class="row align-items-center">

                  <!-- left section -->
                  <div class="col-lg-4">
                    <!-- Tabla de cliente, referencia y time limit -->
                    <b-row >

                      <b-col lg="12"  md="12" xs="12" cols="12" class="text-muted pr-0">

                        <!-- code file section -->
                        <div class="d-flex align-items-center">
                          <div>
                            <!-- status indicator -->
                            <b-icon icon="check-circle-fill" variant="success" v-if="dataConfirmation.cofEstado" :title="statusConfirmation"></b-icon>
                            <b-icon icon="x-circle-fill" variant="danger" v-else></b-icon>
                            <!-- FAM indicator -->
                            <span v-if="dataConfirmation.cofFam == 1">
                                <small><b-badge variant="info" class="mx-1">FAM</b-badge></small>
                            </span>
                          </div>
                          <!-- code file update form -->
                          <div >
                            <b-button
                              variant="link"
                              class="p-0 ml-1"
                              @click.prevent="showModalFileCode"
                            >
                              <h6 class="m-0"><strong>{{ dataConfirmation.cofCodigo }}</strong></h6>
                            </b-button>
                            <!-- The modal -->
                            <b-modal
                              v-model="showModalCode"
                              title="Update Confirmation Code"
                              @show="resetModalFileCode"
                              @hidden="resetModalFileCode"
                              @ok="handleEditFileCode"
                              ok-title="Apply"
                              cancel-title="Discard"
                            >
                              <form ref="form" @submit.stop.prevent="handleFileCodeSubmit">
                                <b-form-group
                                  label="Confirmation code"
                                  label-for="code-input"
                                  invalid-feedback="File Code is required"
                                  :state="fileCodeState"
                                >
                                  <b-form-input
                                    id="code-input"
                                    v-model="fileCode"
                                    :state="fileCodeState"
                                    maxlength="50"
                                    required
                                  ></b-form-input>
                                </b-form-group>
                              </form>

                            </b-modal>
                          </div>
                        </div>

                      </b-col>

                      <!-- referencia -->
                      <b-col lg="3"  md="4" xs="4" cols="4"  class="text-muted pr-0">Reference:</b-col>
                      <b-col lg="9"  md="8" xs="8" cols="8"  class="pl-0">
                        <b-button
                          variant="link"
                          class="p-0"
                          @click="handleUpdateReference"
                        >
                          {{ dataConfirmation.cofReferencia }}
                        </b-button>
                      </b-col>

                      <!-- cliente -->
                      <b-col lg="3" md="4" xs="4" cols="4"  class="text-muted pr-0">Client:</b-col>
                      <b-col lg="9" md="8" xs="8" cols="8" class="pl-0">
                        {{ dataConfirmation.clienteName }}
                      </b-col>

                    </b-row>
                    <!-- Fin Tabla de cliente, referencia y time limit -->
                  </div>

                  <!-- center section -->
                  
                   <b-col lg="4" md="12" xs="12" cols="12">
                      <formated-range-date
                        :startDate="dataConfirmation.cofInicio"
                        :endDate="dataConfirmation.cofFinal"
                      >
                      </formated-range-date>
                    </b-col> 
                  

                  <!-- right section -->
                  
                  <b-col lg="4" md="12" xs="12" cols="12" >

                    <!-- total section  -->
                    <b-row >
                      <b-col class="text-right center-title-mobile mt-2">
                        <span class="text-muted h5"><small>TOTAL CONFIRMATION</small></span>
                        <h5 class="mb-0 card-subtitle truncate font-weight-bold">{{ getConfirmationTotals.total | currency }}</h5>
                      </b-col>
                    </b-row>

                  </b-col> 

                </div>

              </b-card>
            </b-col>
          </b-row>

          <!-- modal ???  -->
          <b-modal
            id="optionsconfirm"
            ref="optionsconfirm"
            title="Cancel File"
            size="md"
          >
            <confirmation-options
              :infoconfi="dataConfirmation"
            ></confirmation-options>

            <template slot="modal-footer">
              <b-button
                class="mt-2 mb-2"
                variant="secondary"
                @click="hideModal('optionsconfirm')"
                >{{ $t("gps.close") }}</b-button
              >
            </template>
          </b-modal>

          <!-- modal reference update -->
          <b-modal
            v-model="showModalReference"
            title="Update reference"
          >
            <form ref="form">
              <b-form-group
                label="Reference"
                label-for="name-input"
                invalid-feedback="Reference is required"
              >
                <b-form-input
                  v-model="localReferencia"
                  id="name-input"
                  maxlength="100"
                  required
                />
              </b-form-group>
              <div class="text-center">
                <b-button
                  @click="updateReferenceConfirmacion"
                  class="text-center"
                  variant="primary"
                  block
                  :disabled="!this.localReferencia"
                  >Apply changes</b-button
                >
              </div>
            </form>
            <template slot="modal-footer">
              <b-button class="mt-2 mb-2" @click="showModalReference = false" variant="secondary">{{
                $t("gps.close")
              }}</b-button>
            </template>
          </b-modal>

          <!-- Modal Extend Period Confirmation -->
          <b-modal
            id="dateSettingsHeader"
            ref="dateSettingsHeader"
            title="Change Period Confirmation"
          >
            <modal-setting-period-confirmation
              :cofId="cofId"
            >
            </modal-setting-period-confirmation>
            <template slot="modal-footer">
              <b-button
                class="mt-2 mb-2"
                variant="secondary "
                @click="hideModal('dateSettingsHeader')"
                >{{ $t("gps.close") }}</b-button
              >
            </template>
          </b-modal>
        </div>

        <!-- ------------------------------------------- CONSTRUCCION DE TABS ------------------------------------------- -->

        <b-row>
          <b-colxx lg="12">
            <b-tabs
              nav-class="separator-tabs custom-tabs conf ml-0 mb-0 "
              content-class="tab-content custom-tab"
              :no-fade="true"
            >
              <b-tab lazy :title="$t('gps.summary_messages')" active>
                <confirmations-summary :cofId="cofId"></confirmations-summary>
              </b-tab>
              <b-tab :title="$t('gps.passengers')" lazy>
                <confirmations-passengers :cofId="cofId"></confirmations-passengers>
              </b-tab>
              <b-tab :title="$t('gps.itinerary')" lazy>
                <confirmations-itinerary :cofId="cofId"></confirmations-itinerary>
              </b-tab>
              <b-tab :title="$t('gps.documents')" lazy>
                <confirmations-documents :cofId="cofId"></confirmations-documents>
              </b-tab>
              <b-tab :title="$t('gps.attachments')" lazy>
                <confirmations-attachments
                  :cofId="cofId"
                ></confirmations-attachments>
              </b-tab>
              <b-tab :title="$t('gps.history')" lazy>
                <confirmations-history :cofId="cofId"></confirmations-history>
              </b-tab>
            </b-tabs>
          </b-colxx>
        </b-row>
        <!-- ------------------------------------------- FIN CONSTRUCCION DE TABS ------------------------------------------- -->




      </template>

    </template>


  </div>

</template>


<script>

import ConfirmacionServices from "@/services/gps/confirmacion/ConfirmacionServices.js"
import BookingServices from "@/services/gps/booking/BookingServices.js";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import { mapActions, mapGetters, mapMutations } from "vuex"

export default {
  components: {
    "v-select": vSelect,
  },

  /* props: ["cofId"], */

  name: "confirmations",

  data() {
    return {
      // is loading
      isLoading: false,
      // end is loading
      showModalReference: false,
      localReferencia: null,
      showModalCode: false,


      dataConfirmation: "",
      totalesConfirmacion: [],
      clienteName: "",
      cofCodigo: "",
      cofClienteId: "",
      cofReferencia: "",
      cotCodigo: "",
      cofId: parseInt(this.$route.params.cofId),
      /// file code modal
      fileCode: null,
      fileCodeState: null,
    }
  },

  computed: {

    ...mapGetters("confirmacion", [
      "getSelectedCof",
      "getChangeHeaderConfirmation",
      "getConfirmationTotals"
    ]),

    statusConfirmation () {

      return this.dataConfirmation?.cofEstado ? 'Active confirmation' : 'Canceled confirmation'

    }

  },


  watch: {
    getChangeHeaderConfirmation() {
      // this.totalConfirmacion();
    },
  },


  methods: {

    ...mapMutations("confirmacion", ["setChangeHeaderConfirmation", "setTotalConfirmacion"]),

    ...mapActions("confirmacion", ["getTotalConfirmacionAction"]),

    //AM: Valido que el parametro de ruta sea entero, caso contrario lanza pantalla 404
    checkNumericParameter() {

       if ( parseInt(this.$route.params.cofId) == false )
          this.$router.push({ name: "error" })

    },

    hideModal(refname) {
      this.$refs[refname].hide();
    },

    handleUpdateReference(){

      this.localReferencia = this.dataConfirmation.cofReferencia
      this.showModalReference = true

    },

    async updateReferenceConfirmacion() {

      const dataToUpdate = {
        bokId: this.dataConfirmation.bokId,
        cofId: this.cofId,
        cofReferencia: this.localReferencia,
        user: this.$loggedUserId
      };

      const { data: { data }} = await ConfirmacionServices.updateReferenceConfirmacion(dataToUpdate)

      // Se debe actualizar el valor de referencia en tabla Booking:
			const responseBooking = await this.updateReferenceBooking(this.localReferencia, this.dataConfirmation.bokId)		

      if (data == 200 && responseBooking == 200) {

         this.$notify("success filled", "Success", "Reference was updated successfully", {
           duration: 3000,
           permanent: false,
         })

         this.dataConfirmation.cofReferencia = this.localReferencia
         this.showModalReference = false

      } else {
            this.$notify("error filled", "Error", "Something went wrong", {
              duration: 3000,
              permanent: false,
            });
      }

    },

		async updateReferenceBooking(reference, bokId) {

			const dataToUpdate = {
				newReference: reference,
				bokId: bokId
			};

			const { data: { data } } = await BookingServices.updateReference(dataToUpdate)

			if (data != 200) {
				this.$notify("error filled", "Error", "Reference could not be updated in Booking", {
					duration: 3000,
					permanent: false,
				});
			} else {
					return data;
			}

		},    

    async getConfirmationHeader() {

      const { data } = await ConfirmacionServices.getConfirmationHeader(this.cofId)

      this.dataConfirmation = data
      this.dataConfirmation = this.dataConfirmation.shift()


    },

    async updateConfirmacionCabecera() {

      const dataToUpdate = {
        cofId: this.cofId,
        cofCodigo: this.fileCode,
        bokId: this.dataConfirmation.bokId,
        user: this.$loggedUserId
      };

      const { data: { data }} = await ConfirmacionServices.updateConfirmacionCabecera(dataToUpdate)

      if (  data == 200 ) {
        this.$notify("success filled", "Confirmation Code", "Confirmation Code was updated successfully", {
          duration: 3000,
          permanent: false,
        });
      } else {
        this.$notify("error filled", "Error", "Something went wrong", {
          duration: 3000,
          permanent: false,
        });
      }

    },

    async totalConfirmacion() {

      const { data } = ConfirmacionServices.totalesConfirmacion( this.cofId )

      this.totalesConfirmacion = data

    },

    /// Modal FILE CODE

    showModalFileCode (){

      this.fileCode = this.dataConfirmation.cofCodigo
      this.showModalCode = true

    },

    resetModalFileCode() {

    },

    async handleEditFileCode(bvModalEvent) {

      bvModalEvent.preventDefault()

      // file code required
      if ( this.fileCode == null || this.fileCode.length == 0 ) {

         this.fileCodeState = false

         return

      }


      // TODO  check file code unique - implementacion pendiente
      console.log("check file code unique")



      this.handleFileCodeSubmit()

    },



    async handleFileCodeSubmit() {

      await this.updateConfirmacionCabecera()

      this.dataConfirmation.cofCodigo = this.fileCode

      this.$nextTick(() => {
        this.showModalCode = false
      })

    },

    /// END MODAL FILE CODE

    /// MODAL CANCEL
    showModalOptionsConfirmation () {

      this.$refs['optionsconfirm'].show()

    },
       /// MODAL CANCEL
    showModalPeriodConfirmation () {

      this.$refs['dateSettingsHeader'].show()

    }

  },


  async created() {


    this.isLoading = true

    await this.checkNumericParameter();

    await this.getConfirmationHeader();

    // Ejecuto action totalConfirmacion para actualizar valor total en Cabecera
    this.getTotalConfirmacionAction( this.cofId )

    this.isLoading = false
  },
};
</script>

<style>
li.rightside {
  float: right;
  line-height: 34px;
}
.custom-tabs.conf .nav-item .nav-link.active {
    color: #ed7117 !important;
    background: transparent !important;
    border-radius: 0 !important;
}
.nav-tabs.separator-tabs.conf .nav-link.active::before{
    content: " ";
    background: #ed7117 !important;
    border-radius: 0 !important;
    bottom: unset !important;
    top: 0 !important;
}
</style>
