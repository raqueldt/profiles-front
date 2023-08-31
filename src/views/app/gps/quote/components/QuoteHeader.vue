/* Componente : - Cabecera grupo de cotizacion */
<template>


  <b-row>

    <b-col v-if="isLoading" cols="12">

      <b-skeleton></b-skeleton>

      <b-skeleton type="input"></b-skeleton>

    </b-col>



    <b-col v-else cols="12">

      <!-- ----------------------- BREADCRUM  -----------------------  -->
      <h1>{{ $t("gps.quotes") }}</h1>
      <span>
        <ul class="
            nav
            pt-0
            breadcrumb-container
            d-none d-sm-block d-lg-inline-block
          ">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/app" class="active" target="_self">Home</a>
            </li>

            <li class="breadcrumb-item active">
              <span aria-current="location">{{ $t("gps.quotes") }}</span>
            </li>
          </ol>
        </ul>
      </span>
      <span>
        <!--   -->
        <b-dropdown class="dropdown-container float-right mr-1 mt-3" variant="link" right
          toggle-class="text-decoration-none p-0 float-right" no-caret>
          <template #button-content>
            <i class="glyph-icon simple-icon-options-vertical" style="color: gray"></i>
          </template>

          <b-dropdown-item @click.prevent="gotopreview">
            <span class="text">Preview</span>
          </b-dropdown-item>


          <!-- 2023-02-14 | fg | desactivar opciones no disponibles cuando una cotizacion del grupo ha sido confirmada  -->
          <template v-if="isEditable">

            <b-dropdown-item :disabled="detallecotizacionheader['cotEstado'] != 1" @click.prevent="showModalInclude">
              <span class="text">Policies / Includes</span>
            </b-dropdown-item>

            <b-dropdown-divider />

            <b-dropdown-item :disabled="detallecotizacionheader['cotEstado'] != 1" @click.prevent="
                convertConfirmation(detallecotizacionheader)
              ">
              <span class="text-success">Confirm Quote</span>
            </b-dropdown-item>

            <b-dropdown-item :disabled="detallecotizacionheader['cotEstado'] != 1"
              @click.prevent="showModalOptionsQuote">
              <span class="text-info">Order Summary</span>
            </b-dropdown-item>

            <b-dropdown-item :disabled="detallecotizacionheader['cotEstado'] != 1"
              @click.prevent="showModalOptionsQuoteCancel">
              <span class="text-danger">Cancel Quote</span>
            </b-dropdown-item>

          </template>



        </b-dropdown>
      </span>
      <!-- ----------------------- FIN BREADCRUM  -----------------------  -->

      <div class="card p-1 mb-3 shadow-none">

        <b-container xxs="12" class="quote-header">
          <b-row align-self="stretch" class="align-items-center">

            <!-- Tabla de cliente, referencia y time limit -->
            <b-col lg="4" md="12" xs="12" cols="12">
              <b-row>
                <b-col lg="4" md="3" xs="3" cols="3" class="text-muted pr-0">Client:</b-col>
                <b-col lg="8" md="9" xs="9" cols="9" class="pl-0">
                  <b-button variant="link" v-if="detallecotizacionheader['cotEstado'] == 1" class="p-0"
                    v-b-modal.modal-cambio-cliente title="Click here to edit the client">
                    <strong> {{ infoheadergct.razon_social }}</strong>
                  </b-button>
                  <span v-if="detallecotizacionheader['cotEstado'] != 1">
                    {{ detallecotizacionheader["cotCliente"] }}
                  </span>
                </b-col>
                <b-col lg="4" md="3" xs="3" cols="3" class="text-muted pr-0">Reference:</b-col>
                <b-col lg="8" md="9" xs="9" cols="9" class="pl-0">
                  <b-button variant="link" class="p-0 text-left text-justify left-title-mobile"
                    @click="handleUpdateReference" :disabled="detallecotizacionheader['cotEstado'] != 1">
                    <strong>{{ detallecotizacionheader.cotReferencia }}</strong>
                  </b-button>
                  |
                  <strong>
                    <b-icon :title="detallecotizacionheader['nombreEstado']" icon="check-circle-fill" variant="success"
                      v-if="
												detallecotizacionheader['cotEstado'] == 1
											"></b-icon>
                    <!--  Cotizacion activa o confirmada -->
                    <b-icon :title="detallecotizacionheader['nombreEstado']" icon="check-square" variant="success" v-if="
												detallecotizacionheader['cotEstado'] == 2
											"></b-icon>
                    <b-icon :title="detallecotizacionheader['nombreEstado']" icon="alarm" variant="secondary" v-if="
												detallecotizacionheader['cotEstado'] == 3
											"></b-icon>
                    <b-icon :title="detallecotizacionheader['nombreEstado']" icon="x-circle-fill" variant="danger" v-if="
												detallecotizacionheader['cotEstado'] == 0
											"></b-icon>
                    <b-icon :title="detallecotizacionheader['nombreEstado']" icon="award" variant="info" v-if="
												detallecotizacionheader['cotEstado'] == 4
											"></b-icon>
                    <!-- Cotizacion cancelada -->
                  </strong>
                </b-col>
                <b-col lg="4" md="3" xs="3" cols="3" class="text-muted pr-0">Time limit:</b-col>
                <b-col lg="8" md="9" xs="9" cols="9" class="pl-0">
                  <b-button variant="link" v-if="detallecotizacionheader['cotEstado'] == 1" class="p-0"
                    v-b-modal.modal-time-limit title="Click here to edit the time limit of this quote">
                    <strong>
                      {{
												moment(detallecotizacionbooking["codTiempoLimite"]).format(
													"DD MMM YYYY, ddd h:mm "
												)
											}}ECT</strong>
                  </b-button>
                  <span v-if="detallecotizacionheader['cotEstado'] != 1">
                    {{
											moment(detallecotizacionbooking["codTiempoLimite"]).format(
												"DD MMM YYYY, ddd h:mm "
											)
										}}ECT
                  </span>

                </b-col>


                <b-col lg="4" md="3" xs="3" cols="3" class="text-muted pr-0">Email:</b-col>
                <b-col lg="8" md="9" xs="9" cols="9" class="pl-0">
                  <b-button variant="link" v-if="detallecotizacionheader['cotEstado'] == 1" class="p-0"
                    v-b-modal.modal-cambio-correo title="Click here to edit the email">
                    <strong>
                      {{ detallecotizacionheader["cotCorreoCliente"]	}}</strong>
                  </b-button>
                  <span v-if="detallecotizacionheader['cotEstado'] != 1">
                    {{ detallecotizacionheader["cotCorreoCliente"]}}
                  </span>
                </b-col>
              </b-row>

              <b-modal title="Update Reference" v-model="showModalReference">
                <form ref="form">
                  <b-form-group label="Reference" label-for="name-input" invalid-feedback="Reference is required">
                    <b-form-input id="name-input" v-model="newReference" maxlength="100" required />
                  </b-form-group>
                  <div class="text-center">
                    <b-button @click="updateReferenceCotizacion" variant="primary"
                      :disabled="!detallecotizacionheader.cotReferencia" class="mr-1" block>
                      Apply changes
                    </b-button>
                  </div>
                </form>
                <template slot="modal-footer">
                  <b-button @click="showModalReference = false" variant="secondary" class="mr-1">
                    {{ $t("gps.close") }}</b-button>
                </template>
              </b-modal>
            </b-col>
            <!-- Fin Tabla de cliente, referencia y time limit -->

            <b-col v-if="detallecotizacionheader['cotEstado'] == 1" lg="4" md="12" xs="12" cols="12"
              class="text-center px-0" v-b-modal.changePeriod style="cursor: pointer;" v-tooltip="{
								content: 'Click here to edit dates',
								placement: 'right',
							}">
              <formated-dates :startDate="detallecotizacionheader['cotDesde']"
                :endDate="detallecotizacionheader['cotHasta']">
              </formated-dates>
            </b-col>

            <b-col v-if="detallecotizacionheader['cotEstado'] != 1" lg="4" md="12" xs="12" cols="12"
              class="text-center ml-4">
              <formated-dates :startDate="detallecotizacionheader['cotDesde']"
                :endDate="detallecotizacionheader['cotHasta']">
              </formated-dates>
            </b-col>


            <b-col lg="4" md="12" xs="12" cols="12" class="container">

              <b-row class="justify-content-end">

                <b-col lg="12" md="12" xs="12" cols="12" class="text-right center-title-mobile mt-2">
                  <span class="text-muted h5"><small>TOTAL QUOTE</small></span>
                  <h4 class="mb-0 card-subtitle truncate font-weight-bold">
                    {{ getValorTotalCotizacion | currency }}
                  </h4>
                </b-col>

                <!-- ADD SERVICES -->
                <!-- <b-col lg="6" md="12" xs="12" class="mt-2 d-inline" >
					<b-row class="align-items-center">
						<b-col lg="9" md="12" xs="12" cols="12">
							<b-button block :disabled="detallecotizacionheader['cotEstado'] != 1" v-b-modal.modal-add-service
								title="Click here to add Services" size="xs" variant="outline-primary default" >
								<i :class="`iconsminds-data-center`"></i>Add services
							</b-button>
							<add-service @reload="showModalServices"></add-service>			
						</b-col>
						<b-col lg="3" md="12" xs="12" cols="12" class="text-left">
							<b-button id="reolad1" variant="btn btn-header-light icon-button" size="sm" @click="reload()"
							data-toggle="tooltip" data-placement="top" title="Reload quote" class="text-left">
							<i class="simple-icon-refresh" />
							</b-button>
						</b-col>						
					</b-row>
                </b-col> -->

              </b-row>

            </b-col>

          </b-row>
        </b-container>

        <!--  Modal Confirmacion -->
        <b-modal id="modalpreconfirm" size="lg" ref="modalpreconfirm"
          modal-class="modal-center modal-services modalpreconfirm" :title="
						'Info preview to confirm Q ' + detallecotizacionheader.cotCodigo
					">
          <modal-pre-confirm :cotId="getSelectedCot"> </modal-pre-confirm>
          <template slot="modal-footer">
            <b-button class="mt-2 mb-2" variant="danger default" @click="hideModal('modalpreconfirm')">
              {{ $t("gps.close") }}</b-button>
          </template>
        </b-modal>
        <!--  Modal Extender Time Limit -->
        <b-modal id="modal-time-limit" ref="modal-time-limit" modal-class="modal-center" title="Extend Time Limit">

          <quote-modal-extend-time-limit @updateExtendTimeLimit="reload" @hideModal="hideModal('modal-time-limit')"
            :cotId="getSelectedCot" />


          <template slot="modal-footer">
            <!--     <b-button
              variant="danger default"
              @click="hideModal('modal-time-limit')"
              >{{ $t("gps.close") }}</b-button
            > -->
            <b-button @click="hideModal('modal-time-limit')" variant="secondary" class="mr-1">{{ $t("gps.close") }}
            </b-button>
          </template>
        </b-modal>

        <!--  Modal Cambio de Cliente -->
        <b-modal id="modal-cambio-cliente" ref="modal-cambio-cliente" modal-class="modal-center" title="Update client">
          <modal-change-cliente @updatecliente="reload" @hideModal="hideModal('modal-cambio-cliente')"
            :cotId="getSelectedCot">
          </modal-change-cliente>
          <template slot="modal-footer">
            <b-button @click="hideModal('modal-cambio-cliente')" variant="secondary" class="mr-1">{{ $t("gps.close") }}
            </b-button>
          </template>
        </b-modal>

        <!--  Modal Cambio de correo -->
        <b-modal id="modal-cambio-correo" ref="modal-cambio-correo" modal-class="modal-center" title="Update email">
          <modal-change-correo @updatecorreo="reload" @hideModal="hideModal('modal-cambio-correo')"
            :cotId="getSelectedCot">
          </modal-change-correo>

          <template slot="modal-footer">

            <b-button @click="hideModal('modal-cambio-correo')" variant="secondary" class="mr-1">{{ $t("gps.close") }}
            </b-button>
          </template>
        </b-modal>
        <!-- Modal Extend Agregar Servicio Quote -->
        <b-modal id="modal-add-service" size="lg" ref="modal-add-service" modal-class="modal-right modal-services"
          :title="$t('gps.add-services')">
          <quote-service :cotId="getSelectedCot" />
          <template slot="modal-footer">
            <!--        <b-button
              class="mt-2 mb-2"
              variant="danger default"
              @click="hideModal('modal-add-service')"
              >{{ $t("gps.close") }}</b-button
            > -->
            <b-button @click="hideModal('modal-add-service')" variant="secondary" class="mr-1">{{ $t("gps.close") }}
            </b-button>
          </template>
        </b-modal>
        <!--  Modal Extend Period Quote -->
        <b-modal id="changePeriod" ref="changePeriod" modal-class="modal-center" title="Change Period Quote">
          <modal-setting-period @closeModal="hideModal('changePeriod')" :cotId="getSelectedCot">
          </modal-setting-period>
          <template slot="modal-footer">
            <!--   <b-button
              class="mt-2 mb-2"
              variant="danger default"
              @click="hideModal('changePeriod')"
              >{{ $t("gps.close") }}</b-button
            > -->
            <b-button @click="hideModal('changePeriod')" variant="secondary" class="mr-1">{{ $t("gps.close") }}
            </b-button>
          </template>
        </b-modal>
        <!--  Modal Extend Incluye No Incluye -->
        <b-modal id="include" ref="include" :title="$t('gps.includes-and-policies')" size="lg">
          <modal-settings-include @updateIncludes="hideModal('include')" :cotId="getSelectedCot">
          </modal-settings-include>
          <template slot="modal-footer">
            <b-button class="mt-2 mb-2" variant="secondary" @click="hideModal('include')">{{ $t("gps.close") }}
            </b-button>
          </template>
        </b-modal>
        <!-- Modal Cancel Quote -->
        <b-modal id="quoteCancel" ref="quoteCancel" modal-class="modal-center" :title="$t('gps.cancel-quote')">
          <modal-status-quote :cotId="getSelectedCot" @updateStatusQuote="updateStatusQuote()">
          </modal-status-quote>

          <template slot="modal-footer">
            <b-button class="mt-2 mb-2" variant="secondary" @click="hideModal('quoteCancel')">
              {{ $t("gps.close") }}</b-button>
          </template>
        </b-modal>
        <!-- Modal quote summary -->
        <b-modal id="quotesummary" ref="quotesummary" modal-class="modal-center" title="Order summary">
          <copy-quote :cotId="getSelectedCot">
          </copy-quote>

          <template slot="modal-footer">
            <b-button class="mt-2 mb-2" variant="secondary" @click="hideModal('quotesummary')">
              {{ $t("gps.close") }}</b-button>
          </template>
        </b-modal>
        <!--  Modal Extend Configuraciones del grupo de cotizacion -->
        <b-modal id="grquoteSettings" ref="grquoteSettings" :title="$t('gps.settings-group')" size="lg">
          <modal-settings-group @updateStatusGroup="updateStatusGroup" :gctId="gctId">
          </modal-settings-group>
          <template slot="modal-footer">
            <b-button class="mt-2 mb-2" variant="secondary" @click="hideModal('grquoteSettings')">{{ $t("gps.close") }}
            </b-button>
          </template>
        </b-modal>
      </div>
    </b-col>
  </b-row>
</template>
<script>
  import CotizacionesServices from "@/services/gps/cotizaciones/CotizacionesServices.js";
  import BookingServices from "@/services/gps/booking/BookingServices.js";
  import GrupoCotizacionesServices from "@/services/gps/grupocotizaciones/GrupoCotizacionesServices.js";
  import moment from "moment";

  import {
    mapActions,
    mapGetters,
    mapMutations
  } from "vuex";

  export default {

    name: 'QuoteHeader',

    components: {

      QuoteModalExtendTimeLimit: () => import('@/views/app/gps/quote/components/QuoteModalExtendTimeLimit')

    },

    props: ["gctId"],

    data() {
      return {

        isLoading: false,

        showModalReference: false,


        fullScreen: false,
        infoheadergct: "",
        detallecotizacionheader: [],
        detallecotizacionbooking: [],
        totalescotizacion: [],
        newReference: "",
        now: moment().format("YYYY-MM-DD"),
      };
    },

    watch: {
      getSelectedCot: function (newVal, oldVal) {
        this.cotizaciondetalles();
      },
      getChangeHeaderQuote() {
        this.cotizaciondetalles();
      },
    },

    computed: {

      ...mapGetters("cotizacion", [
        "getSelectedCot",
        "getChangeHeaderQuote",
        "getCotizacionTotales",
      ]),

      getValorTotalCotizacion() {
        return this.getCotizacionTotales ?.total ?? 0;
      },

      //2023-02-14 | fg | determinar si alguna cotizacion fue confirmada
      //2023-02-14 | fg | determinar si se permite agregar cotizaciones al grupo
      isEditable() {

        if (!this.infoheadergct) return false

        const {
          cotizaciones
        } = this.infoheadergct


        const cotizacionConfirmada = cotizaciones.filter(quote => quote.cotEstado ==
          2) // buscar cotizaciones confirmadas (status=2)

        if (cotizacionConfirmada.length) return false

        return true

      }



    },

    methods: {

      ...mapMutations("cotizacion", [
        "setChangeHeaderQuote",
        "setSummaryViewActive",
      ]),



      async cotizaciondetalles() {

        if (!this.getSelectedCot) return


        const {
          data
        } = await CotizacionesServices.cotizacionesdetalles(this.getSelectedCot)

        this.detallecotizacionheader = data

        this.detallecotizacionheader = this.detallecotizacionheader.shift();

        this.detallecotizacionbooking = this.detallecotizacionheader["booking"];

        this.newReference = this.detallecotizacionheader.cotReferencia

      },


      async updateStatusQuote() {

        await Promise.all([

          this.getgrupocotizaciones(),
          this.cotizaciondetalles()

        ])

        this.hideModal("quoteCancel");
        this.$emit("refreshQuote", 1);
      },



      hideModal(refname) {
        this.$refs[refname].hide();
        // console.log("hide modal:: " + refname);
      },


      /// MODAL CANCEL
      showModalOptionsQuoteCancel() {
        this.$refs["quoteCancel"].show();
      },

      /// MODAL summary
      showModalOptionsQuote() {
        this.$refs["quotesummary"].show();
      },


      /// MODAL CANCEL
      showModalInclude() {
        this.$refs["include"].show();
      },


      showModalServices() {
        this.$refs["modal-add-service"].show();
      },
      // ...mapActions("cotizacion", []),
      // ...mapMutations("cotizacion", ["setSummaryViewActive"]),

      updateStatusGroup() {
        this.hideModal("grquoteSettings");
        location.reload();
        /*
        	 recargar la pagina o buscar la manera de activar el quote tabs para actualizar la informacion */
      },


      hideModal(refname) {
        this.$refs[refname].hide();
        this.getgrupocotizaciones();
      },



      updateTitulo(titulo) {
        let data = {
          gctId: this.gctId,
          gctTitulo: titulo,
        };
        GrupoCotizacionesServices.updateTitulo(data)
          .then((response) => {
            let mensaje = response.data;
            if (mensaje.data == 200) {
              var type = "success filled";
              var title = "Group title";
              var message = "Updated";
              this.$notify(type, title, message, {
                duration: 3000,
                permanent: false,
              });
            } else {
              var type = "error filled";
              var title = "Titulo";
              var message = "No update";
              this.$notify(type, title, message, {
                duration: 3000,
                permanent: false,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },


      // controla peticion de actualizar referencia
      handleUpdateReference() {

        this.newReference = this.detallecotizacionheader.cotReferencia
        this.showModalReference = true

      },


      async updateReferenceCotizacion() {

        const dataToUpdate = {
          cotId: this.getSelectedCot,
          cotReferencia: this.newReference,
          bokId: this.detallecotizacionheader.booking.bokId,
          user: this.$loggedUserId
        };

        const {
          data: {
            data
          }
        } = await CotizacionesServices.updateReferenceCotizacion(dataToUpdate)

        // Se debe actualizar el valor de referencia en tabla Booking:
        const responseBooking = await this.updateReferenceBooking(this.newReference, this.detallecotizacionheader
          .booking.bokId)

        if (data == 200 && responseBooking == 200) {

          this.$notify("success filled", "Success", "Reference was updated successfully", {
            duration: 3000,
            permanent: false,
          });

          this.detallecotizacionheader.cotReferencia = this.newReference

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

        const {
          data: {
            data
          }
        } = await BookingServices.updateReference(dataToUpdate)

        if (data != 200) {
          this.$notify("error filled", "Error", "Reference could not be updated in Booking", {
            duration: 3000,
            permanent: false,
          });
        } else {
          return data;
        }

      },


      gotopreview() {
        let routeData = this.$router.resolve({
          name: "quotepreview",
          params: {
            cotId: this.getSelectedCot
          },
        });
        window.open(routeData.href, "_self");
      },



      async getgrupocotizaciones() {

        const {
          data
        } = await GrupoCotizacionesServices.getgrupocotizaciones(this.gctId)

        this.infoheadergct = data
        this.showAnimation = true

      },

      convertConfirmation(infocoti) {
        const numeroninos = infocoti.booking.bokChildrenPax;
        const numeroCodigos = infocoti.numeroCodigos;

        if (numeroCodigos == 0) {
          var type = "info";
          var title = "Imposible create Confirmation";
          var message =
            "No Codes associated to this client, Please contact with administrator"; {
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
          }
        } else if (numeroninos > 0 || numeroCodigos > 0) {
          this.$refs.modalpreconfirm.show();
        }
      },

      async reload() {
        //   location.reload();
        await this.getgrupocotizaciones(),
          await this.cotizaciondetalles()
      },
    },



    async created() {

      this.isLoading = true

      await Promise.all([
        this.getgrupocotizaciones(),
        this.cotizaciondetalles()
      ])

      this.isLoading = false

    },

  };

</script>

<style lang="scss" scoped>
  .modal-right.modal-services .modal-dialog {
    max-width: 650px;
  }

  .quote-header {
    font-size: 0.8rem;
  }

  .btn-outline-primary:disabled {
    color: #ed7117 !important;
  }

  .dropdown-container {
    z-index: 1000000;
  }

</style>
