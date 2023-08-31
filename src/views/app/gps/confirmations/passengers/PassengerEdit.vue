<template>
  <div>
    <b-button @click="showModalPassenger()" size="xs" variant="link">
      Edit
    </b-button>
    <!-- {{getPassengers}} -->
    <b-modal
      ref="passenger-edit-modal"
      :title="$t('gps.pax.passenger')"
      modal-class="passenger-form"
      hide-header
      @hide="reset"
      size="lg"
    >
      <b-card no-body class="shadow-none">
        <b-tabs
          lazy
          v-model="activeTab"
          pills
          card
          vertical
          nav-class="separator-tabs custom-tabs conf pax ml-0 mb-0 "
          content-class="pax tab-content custom-tab"
        >
          <b-tab
            v-for="(pax, index) in getPassengers"
            :key="pax.lpaId"
            :title="'Pax ' + (index + 1)"
            :active="pax.lpaId === indice"
          >
            <b-form v-if="pax" class="mt-3">
              <h6 class="small text-muted mb-3"><strong>Main data</strong></h6>
              <b-row>
                <b-colxx class="">
                  <b-form-group class="mb-0">
                    <label class="form-group has-float-label mb-0">
                      <b-form-input
                        type="text"
                        size="sm"
                        maxlength="30"
                        class="form-control"
                        v-model="pax.lpaNombre"
                      />
                      <span>{{ $t("gps.pax.name") }}</span>
                    </label>
                  </b-form-group>
                </b-colxx>
                <b-colxx class="pl-0">
                  <b-form-group class="mb-0">
                    <!--last name-->
                    <label class="form-group has-float-label mb-0">
                      <b-form-input
                        type="text"
                        size="sm"
                        maxlength="30"
                        v-model="pax.lpaApellido"
                      />
                      <span>{{ $t("gps.pax.last-name") }}</span>
                    </label>
                  </b-form-group>
                </b-colxx>
                <b-colxx md="2" class="pl-0">
                  <!--group-->
                  <b-form-group class="mb-1">
                    <label class="form-group has-float-label mb-1">
                      <v-select
                        :options="grupos"
                        @input="setGroupDefault"
                        v-model="pax.lpaGrupo"
                      />
                      <span>{{ $t("gps.pax.group") }}</span>
                    </label>
                  </b-form-group>
                </b-colxx>
              </b-row>
              <b-row>
                <b-colxx>
                  <!--dob-->
                  <b-form-group class="mt-2 mb-0" :label="$t('gps.pax.dob')">
                    <v-date-picker v-model="pax.lpaDob" mode="date" is24hr>
                      <template v-slot="{ inputValue, togglePopover }">
                        <input
                          class="form-control"
                          :value="inputValue"
                          @click="togglePopover()"
                        />
                      </template>
                    </v-date-picker>
                  </b-form-group>
                </b-colxx>
                <b-colxx md="7" class="pl-0">
                  <!--email-->
                  <b-form-group class="mt-2 mb-0">
                    <label class="form-group has-float-label mb-0">
                      <b-form-input
                        maxlength="100"
                        v-model="pax.lpaCorreo"
                      />
                      <span>{{ $t("gps.pax.email") }}</span>
                    </label>
                  </b-form-group>
                </b-colxx>
              </b-row>

              <h6 class="small text-muted my-3"><strong>Secondary data</strong></h6>

              <b-row>
                <b-colxx class="pr-0">
                  <!--title-->
                  <b-form-group class="mt-2 mb-0">
                    <label class="form-group has-float-label mb-2">
                      <b-form-input
                        type="text"
                        size="sm"
                        maxlength="30"
                        v-model="pax.lpaTrato"
                      />
                      <span>{{ $t("gps.pax.title") }}</span>
                    </label>
                  </b-form-group>
                </b-colxx>
                <b-colxx class="pr-0">
                  <!--gender-->
                  <b-form-group class="mt-2 mb-0">
                    <label class="form-group has-float-label mb-2">
                      <v-select
                        :options="generos"
                        :reduce="(genero) => genero.metCodigo"
                        label="metName"
                        v-model="pax.lpaGenero"
                      />
                      <span>{{ $t("gps.pax.gender") }}</span>
                    </label>
                  </b-form-group>
                </b-colxx>
                <b-colxx>
                  <b-form-group class="mt-2 mb-2">
                    <label class="form-group has-float-label mb-2">
                      <v-select
                        :options="paises"
                        :reduce="(pais) => pais.paiId"
                        label="paiNombre"
                        v-model="pax.paiId"
                      />
                      <span>{{ $t("gps.pax.country") }}</span>
                    </label>
                  </b-form-group>
                </b-colxx>
              </b-row>
              <b-row>
                <b-colxx class="pr-0">
                  <!--passport-->
                  <b-form-group class="mb-0">
                    <label class="form-group has-float-label mt-0">
                      <b-form-input
                        maxlength="100"
                        v-model="pax.lpaNumeroPasaporte"
                      />
                      <span>{{ $t("gps.pax.passport") }}</span>
                    </label>
                  </b-form-group>
                </b-colxx>
                <b-colxx class="pr-0">
                  <!--expedition-->
                  <b-form-group
                    class="mb-0"
                    :label="$t('gps.pax.passport-expedition')"
                  >
                    <v-date-picker
                      v-model="pax.lpaFechaExpedicion"
                      mode="date"
                      is24hr
                    >
                      <template v-slot="{ inputValue, togglePopover }">
                        <input
                          class="form-control"
                          :value="inputValue"
                          @click="togglePopover()"
                        />
                      </template>
                    </v-date-picker>
                  </b-form-group>
                </b-colxx>
                <b-colxx>
                  <!--expiration-->
                  <b-form-group
                    class="mb-1"
                    :label="$t('gps.pax.passport-expiration')"
                  >
                    <v-date-picker
                      v-model="pax.lpaFechaVencimiento"
                      mode="date"
                      is24hr
                    >
                      <template v-slot="{ inputValue, togglePopover }">
                        <input
                          class="form-control"
                          :value="inputValue"
                          @click="togglePopover()"
                        />
                      </template>
                    </v-date-picker>
                  </b-form-group>
                </b-colxx>
              </b-row>

              <h6 class="small text-muted my-4"><strong>Notes Passengers</strong></h6>
              <b-row>
                <b-colxx class="pr-0">
                  <!--note-->
                  <b-form-group class="mb-0">
                    <label class="form-group has-float-label">
                      <b-textarea
                        v-model="pax.lpaNotas"
                        :rows="2"
                        :max-rows="2"
                      />
                      <span>{{ $t("gps.pax.note") }}</span>
                    </label>
                  </b-form-group>
                </b-colxx>
                <b-colxx class="pr-0">
                  <!--note salud-->
                  <b-form-group class="mb-0">
                    <label class="form-group has-float-label">
                      <b-textarea
                        v-model="pax.lpaNotasSalud"
                        :rows="2"
                        :max-rows="2"
                      />
                      <span>{{ $t("gps.pax.health-note") }}</span>
                    </label>
                  </b-form-group>
                </b-colxx>
                <b-colxx>
                  <!--note interna-->
                  <b-form-group class="mb-0">
                    <label class="form-group has-float-label">
                      <b-textarea
                        v-model="pax.lpaNotasInterno"
                        :rows="2"
                        :max-rows="2"
                      />
                      <span>{{ $t("gps.pax.internal-note") }}</span>
                    </label>
                  </b-form-group>
                </b-colxx>
              </b-row>
            </b-form>
            <hr />
            <b-colxx lg="12" v-if="showOptions">
              <b-button v-b-toggle.collapse-1 variant="primary"
                >Options</b-button
              >

              <b-button v-if="isSaving" variant="primary" disabled>
                <b-spinner small type="grow"></b-spinner>
                Saving...
              </b-button>
              <b-button
                v-else
                variant="primary"
                class="float-right"
                @click="applyChanges(pax)"
                >{{ $t("gps.pax.update-button") }}
              </b-button>

              <b-row>
                <b-collapse id="collapse-1" class="mt-2 w-100">
                  <b-card class="border p-2" no-body>

                    <!-- OPCIONES DE CANCELACION DE PASAJEROS CON DEPENDENCIA EN EL CRUCERO -->
                    <b-list-group class="mt-1" v-if="pax.bosId" flush>
                      <!-- Cancelar auto -->
                      <b-list-group-item class="flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-1">Cancelar</h5>
                        </div>

                        <p class="mb-1">
                          Cambiar el estado del pasajero a
                          <i><strong>cancelado</strong></i> y actualizar la
                          disponibilidad.
                        </p>

                        <b-button
                          variant="danger"
                          size="xs"
                          @click="setCancelMode('auto', pax)"
                          v-if="!bloqueoPreliminar"
                          :disabled="isBusy"
                        >
                          <b-spinner
                            small
                            type="grow"
                            v-if="isBusy"
                          ></b-spinner>
                          Continuar
                        </b-button>

                        <template v-if="cabinSettings.bookingSlotStatus">
                          <b-row class="mt-3">
                            <b-col cols="2">
                              <b-icon
                                icon="info-circle"
                                style="width: 40px; height: 40px"
                              ></b-icon>
                            </b-col>

                            <b-col cols="10">
                              <p class="mb-1">
                                Esta acción requiere aplicar políticas de
                                ocupación de la cabina
                              </p>
                              <v-select
                                v-model="cabinSettings.bookingSlotStatus"
                                :options="cabinSettings.optionsConditions"
                                :reduce="(option) => option.metCodigo"
                                label="metName"
                              />
                            </b-col>
                          </b-row>
                        </template>

                        <template v-if="bloqueoPreliminar">
                          <!-- cancellation fee -->
                          <b-row class="mt-5">
                            <b-col>
                              <b-form-group>
                                <label class="form-group has-float-label">
                                  <b-form-input
                                    id="input-fee"
                                    type="number"
                                    v-model="cancellationFee"
                                  />
                                  <span>Cancellation fee</span>
                                </label>
                              </b-form-group>
                            </b-col>
                          </b-row>

                          <!-- action buttons  -->
                          <div class="w-100">
                            <b-button
                              variant="danger"
                              @click="onCancelPassenger(pax)"
                              class="float-right"
                              :disabled="isCancelling"
                            >
                              <b-spinner
                                small
                                type="grow"
                                v-if="isCancelling"
                              ></b-spinner>
                              Cancel passenger
                            </b-button>

                            <b-button
                              variant="light"
                              @click="reset"
                              class="float-right"
                            >
                              Back
                            </b-button>
                          </div>

                          <!-- errors validation -->
                          <div class="w-100" v-if="hasErrors">
                            {{ errors }}
                          </div>
                        </template>
                      </b-list-group-item>
                    </b-list-group>

                    <!-- ELIMINAR PASAJEROS SIN DEPENDENCIA DEL CRUCERO -->
                    <b-list-group class="mt-3" v-else>
                      <b-list-group-item class="flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-1">Delete passenger</h5>
                        </div>

                        <p class="mb-3">Eliminar de la lista de pasajeros</p>

                        <b-button
                          block
                          variant="danger"
                          @click="onDeletePassenger(pax.lpaId)"
                          >Delete
                        </b-button>
                      </b-list-group-item>
                    </b-list-group>
                  </b-card>
                </b-collapse>
              </b-row>
            </b-colxx>
            <b-alert v-if="hasErrors" show variant="danger">
              {{ errors }}
            </b-alert>
          </b-tab>
        </b-tabs>
      </b-card>
      <template slot="modal-footer">
          <b-button variant="secondary" @click="hideModal('passenger-edit-modal')" >{{
            $t("gps.close")
          }}</b-button>
        </template>
    </b-modal>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import Calendar from "v-calendar/lib/components/calendar.umd";
import CalendarDatePicker from "v-calendar/lib/components/date-picker.umd";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import ListaPasajerosServices from "@/services/gps/lista-pasajeros/ListaPasajerosServices";
import PaisesServices from "@/services/gps/paises/PaisesServices";
import MetadataServices from "@/services/gps/metadata/MetadataServices";
import meta from "@/services/gps/metadata/MetadataConfig";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    "v-select": vSelect,

    DatePicker,
    Calendar,
    CalendarDatePicker,
  },

  props: {
    indice: {
      type: Number,
      required: true,
    },

  },

  data() {
    return {
      hasErrors: false,
      errors: null,

      isBusy: false, // control de proceso de verificacion activo

      isSaving: false,

      isCancelling: false,

      isCancelMode: false,
      activeTab: 0,

      cancellationFee: 0, // valor para gastos de cancelación
      bloqueoPreliminar: false,

      pasajero: null,
      paises: [],
      grupos: [],
      generos: [],

      cabinSettings: {
        optionsConditions: [],
        bookingSlotStatus: null,
        disabledSlots: null,
        slotReference: null,
        cabinRelease: null,
      },

      cancelOption: "cancel",
    };
  },

  watch: {
    activeTab: function (to, from) {
      this.isCancelMode = to == 0 ? false : true;
    },
  },

  computed: {
    ...mapGetters("pasajeros", ["getPassengers", "getPassenger"]),

    hasCancellationFee() {
      return this.cancellationFee <= 0 ? true : false;
    },

    user() {
      return this.$root.$loggedUserId;
    },

    showOptions() {
      if (this.pasajero.bosId) {
        // opciones de cancelacion estarán disponible cuando # pax cruise activos sea mayor a 1
        const countCruisePax = this.getPassengers.filter(
          (pax) => pax.bosId && pax.lpaEstado
        ).length;
        return countCruisePax == 1 ? false : true;
      }
      return true; // permitir siempre opciones de eliminar en pasajeros land
    },
  },

  methods: {
    ...mapActions("pasajeros", [
      "updatePassenger",
      "deletePassenger",
      "cancelPassenger",
      "expensesPassenger",
    ]),
    hideModal(refname) {
      this.$refs[refname].hide();
    },

    async showModalPassenger() {
      const paises = await PaisesServices.getPaises();
      this.paises = paises.data.data;

      const grupos = await MetadataServices.getByGroup(meta.metaGrupoPax);
      this.grupos = Object.values(grupos.data.data);

      const generos = await MetadataServices.getMetadataByGroup(
        meta.metaGeneros
      );
      this.generos = generos.data.data;

      await this.loadPassenger();

      this.$refs["passenger-edit-modal"].show();
    },

    async onDeletePassenger(infopax) {

      try {

        const request = {
          id: infopax,
          user: this.user,
        };

        await this.deletePassenger(request);

        this.$refs["passenger-edit-modal"].hide();
        var type = "success filled";
              var title = "Passenger";
              var message = "Deleted";
              this.$notify(type, title, message, {
                duration: 3000,
                permanent: false,
              });
      } catch (e) {
        console.log("catch error ", e);
      }
    },

    async onCancelPassenger(infopax) {
      this.hasErrors = false;
      this.errors = null;

      try {
        this.isCancelling = true;

        const request = {
          id: infopax.lpaId, // id slot para cancelar
          fee: this.cancellationFee,
          user: this.$root.$loggedUserId,
          slot: this.cabinSettings.slotReference, // id slot que cambiarà de status segùn condition
          condition: this.cabinSettings.bookingSlotStatus, // condiciòn aplica a slot restante
          disable: this.cabinSettings.disabledSlots, // control para deshabilitar slots vacios en cabina,
          release: this.cabinSettings.cabinRelease, // control para indicar que la cabina queda vacìa y será liberada
        };

        await this.cancelPassenger(request);
        this.$refs["passenger-edit-modal"].hide();
              var type = "success filled";
              var title = "Passenger";
              var message = "Cancelled";
              this.$notify(type, title, message, {
                duration: 3000,
                permanent: false,
              });
      } catch (e) {
        this.isCancelling = false;
        this.hasErrors = true;
        this.errors = e.response.data;

        console.log("ERROR ", e.response);
      }
    },

    async applyChanges(infopax) {
      this.hasErrors = false;
      this.isSaving = true;

      try {

        const passengerData = {
          ...infopax,
          user: this.user
        }

        await this.updatePassenger( passengerData )

             var type = "success filled";
              var title = "Passenger";
              var message = "Update";
              this.$notify(type, title, message, {
                duration: 3000,
                permanent: false,
              });

      } catch (e) {
        this.hasErrors = true;
        this.errors = e;
      }

      this.isSaving = false;
    },

    setGroupDefault(value) {
      if (value == null) this.pasajero.lpaGrupo = "A";
    },

    loadPassenger() {
      /*

        // obtener info desde la base de datos
        const id = this.lpaId
        const pax = this.getPassenger(id)

        if (!pax) return

        this.pasajero = pax

      */

      // obtener info con referencia  al store
      this.pasajero = { ...this.pax, user: this.$root.$loggedUserId };
    },

    cancel() {
      this.$refs["passenger-edit-modal"].hide();
    },

    reset() {
      //submit errors
      this.hasErrors = false;
      this.errors = null;
      //
      this.bloqueoPreliminar = false;

      //reset options tab
      this.cabinSettings = {
        optionsConditions: [],
        bookingSlotStatus: null,
        disabledSlots: null,
        slotReference: null,
        cabinRelease: null,
      };
    },

    async setCancelMode(mode,infopax) {
      switch (mode) {
        case "auto":
          this.isBusy = true;
          await this.controlCabina(infopax);
          this.isBusy = false;

          this.bloqueoPreliminar = true;

          break;

        default:
          break;
      }
    },

    async controlCabina(infopax) {
      this.cabinSettings.optionsConditions = [];

      // buscar condiciones de control de cabina
      const { data } = await ListaPasajerosServices.getControlCabina(
        infopax.lpaId
      );

      // crear opciones
      if (data.cabin.cabinSingleSupplement)
        this.cabinSettings.optionsConditions.push(
          ...data.cabin.cabinSingleSupplement.options
        );

      if (data.cabin.cabinShare)
        this.cabinSettings.optionsConditions.push(
          ...data.cabin.cabinShare.options
        );

      // default option
      if (this.cabinSettings.optionsConditions?.length) {
        const [defaultOption] = this.cabinSettings.optionsConditions;
        this.cabinSettings.bookingSlotStatus = defaultOption.metCodigo;
      }

      // control para deshabilitar slots
      this.cabinSettings.disabledSlots = data.cabin.cabinDisabledSlots;

      // identificar slot que modificarà status segùn condición elegida, excluir slots desactivados (status==0)
      const slot = data.cabin.currentBooking.slots.find(
        (slot) => slot.bosId && slot.bosStatus
      );

      this.cabinSettings.slotReference = slot?.bosId ?? null;

      // control para liberar cabina cuando quede vacía
      this.cabinSettings.cabinRelease = data.cabin.cabinRelease;
    },
  },

  created() {
    this.loadPassenger();
  },

  mounted() {},
};
</script>
