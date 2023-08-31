<template>
  <div>
    <b-row>
      <b-colxx lg="7" class="data pb-0 pl-3 pr-2">
        <h4 class="pt-3 text-primary">
          Confirmation Details
          <i class="glyph-icon iconsminds-file-clipboard-file---text"></i>
        </h4>
        <b-row class="border-bottom border-top ml-0 mr-2 mt-0">
          <b-colxx class="pt-2 pb-2 pl-1 pr-1 d-flex">
            <span class="font-weight-bold"
              >Select a client code:
              <!--   <b-button variant="outline-info default" size="xs"  @click="codigosCliente"> Click here </b-button> -->
            </span>
            <b-form-group label-cols="1">
              <b-form-radio
                v-for="(item, index) in codigoscliente"
                :key="index"
                :value="item.id"
               v-model="selected"
                @change="captureitem(item.id, item.codigo)"
                name="some-radios"
              >
                {{ item.codigo }}
              </b-form-radio>
            </b-form-group>
          </b-colxx>
        </b-row>
        <b-row class="border-bottom addChildrens ml-0 mr-0">
          <b-colxx class="pt-2 pb-2 pl-0 pr-0">
            <div
              v-if="detallecotizacionbooking.bokChildrenPax > 0"
              id="addChildrens"
            >
              <span>
                You have to register
                <strong>
                  {{ detallecotizacionbooking.bokChildrenPax }}
                  children(s)
                </strong>
                information preview to confirm this quote
              </span>
              <form action="">
                <b-row class="pt-3">
                  <b-colxx class="pr-0">
                    <label class="form-group has-float-label">
                      <input
                        class="form-control"
                        id="input-live"
                        :disabled="
                          detallecotizacionbooking.bokChildrenPax ==
                          childrens.length
                        "
                        maxlength="20"
                        v-model="lpaNombre"
                        aria-describedby="input-live-help input-live-feedback"
                        placeholder="Please enter name children"
                        trim
                        required
                      />
                      <span>Name Children</span>
                    </label>
                  </b-colxx>
                  <b-colxx class="pr-0">
                    <label class="form-group has-float-label">
                      <input
                        class="form-control"
                        id="input-live"
                        :disabled="
                          detallecotizacionbooking.bokChildrenPax ==
                          childrens.length
                        "
                        maxlength="20"
                        v-model="lpaApellido"
                        aria-describedby="input-live-help input-live-feedback"
                        placeholder="Please enter last name children"
                        trim
                        required
                      />
                      <span>Last name</span>
                    </label>
                  </b-colxx>
                  <b-colxx class="pr-0">
                    <div class="form-group has-float-label">
                      <datepicker
                        :bootstrap-styling="true"
                        v-model="lpaDob"
                        :disabled="
                          detallecotizacionbooking.bokChildrenPax ==
                          childrens.length
                        "
                        locale="en"
                        :disabled-dates="state.disabledDates"
                      ></datepicker>

                      <!--    {{maxDate}} -->
                      <!--b-form-datepicker
                      v-model="lpaDob"
                      :disabled="
                        detallecotizacionbooking.bokChildrenPax ==
                        childrens.length
                      "
                      :max="maxDate"
                      locale="en"
                    ></b-form-datepicker-->
                      <span>Date of birth</span>
                    </div>
                  </b-colxx>
                  <b-colxx lg="2" class="pr-0 pl-0">
                    <b-button
                      v-if="lpaNombre && lpaApellido && lpaDob && age < 12"
                      @click="createChildrenPax()"
                      size="xs"
                      variant="primary default"
                      ><i class="fas fa-save"></i> Save</b-button
                    >
                    <b-button
                      v-else
                      disabled
                      variant="primary default"
                      size="xs"
                      ><i class="fas fa-save"></i> Save</b-button
                    >
                  </b-colxx>
                </b-row>
              </form>
              <b-row>
                <b-colxx class="text-center text-primary">
                  <small v-if="lpaDob"> Age {{ age }} years</small>
                  <small v-if="age > 12">
                    Children must be less than 12 years</small
                  >
                </b-colxx>
              </b-row>
              <b-row>
                <div class="m-auto col-lg-12 pl-2 pr-1">
                  <table
                    v-if="childrens.length > 0"
                    class="table table-sm table-striped table-bordered"
                  >
                    <thead>
                      <tr>
                        <!--  <th scope="col">id</th> -->
                        <th scope="col">Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Dob</th>

                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="(children, index) in childrens" :key="index">
                        <!--    <td>{{ children.id }}</td> -->
                        <td>
                          <span v-if="formActualizar && idActualizar == index">
                            <!-- Formulario para actualizar -->
                            <input
                              maxlength="20"
                              v-model="lpaNombreActualizar"
                              type="text"
                              class="form-control"
                            />
                          </span>
                          <span v-else>
                            <!-- Dato lpaNombre -->
                            {{ children.lpaNombre }}
                            <!-- {{ children.lpaId }} -->
                          </span>
                        </td>
                        <td>
                          <span v-if="formActualizar && idActualizar == index">
                            <!-- Formulario para actualizar -->
                            <input
                              maxlength="20"
                              v-model="lpaApellidoActualizar"
                              type="text"
                              class="form-control"
                            />
                          </span>
                          <span v-else>
                            <!-- Dato lpaApellido -->
                            {{ children.lpaApellido }}
                          </span>
                        </td>
                        <td>
                          <span v-if="formActualizar && idActualizar == index">
                            <!-- Formulario para actualizar -->

                            <!--   <b-form-datepicker
                              v-model="lpaDobActualizar"
                              class="mb-2"
                              locale="en"
                              :max="maxDate"
                            ></b-form-datepicker> -->

                            <datepicker
                              :bootstrap-styling="true"
                              v-model="lpaDobActualizar"
                              locale="en"
                              :disabled-dates="state.disabledDates"
                            ></datepicker>
                          </span>
                          <span v-else>
                            <!-- Dato lpaApellido -->

                            {{
                              moment(children.lpaDob, "DD MMM YYYY, ddd").format(
                                "DD MMM YYYY, ddd"
                              )
                            }}
                            ({{ moment().diff(children.lpaDob, "years") }} Y )
                          </span>
                        </td>

                        <td>
                          <!-- Botón para guardar la información actualizada -->
                          <span v-if="formActualizar && idActualizar == index">
                            <b-button
                              @click="guardarActualizacion(index)"
                              v-if="
                                lpaNombreActualizar &&
                                lpaApellidoActualizar &&
                                lpaDobActualizar &&
                                ageactualizar < 12
                              "
                              class="ml-1"
                              variant="outline-success default"
                              size="sm"
                              ><i class="fas fa-save"></i
                            ></b-button>
                          </span>
                          <span v-else>
                            <b-button
                              @click="verFormActualizar(index)"
                              class="ml-1"
                              variant="success default"
                              size="xs"
                              ><i class="fas fa-edit"></i
                            ></b-button>

                            <b-button
                              @click="borrarChildren(index)"
                              class="ml-1"
                              variant="secondary default"
                              size="xs"
                              ><i class="fas fa-trash-alt"></i
                            ></b-button>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-row>
            </div>
            <div v-else>
              <span class="text-info">
                You don't have <strong> children associated </strong> in this
                quote.
              </span>
            </div>
          </b-colxx>
        </b-row>
      </b-colxx>
      <b-colxx lg="5" class="resumen">
        <h5 class="pt-3 pl-2 text-info">
          Resumen <i class="glyph-icon iconsminds-handshake"></i>
        </h5>
        <b-colxx lg="11" class="m-auto p-0 resumen-content">
          <div
            class="d-flex flex-row align-items-center mb-0 m-auto"
            style="padding: 0.9rem 0.5rem 0rem; width: fit-content"
          >
            <div class="resumen-comfirm">
              <i class="iconsminds-dollar-sign-2"></i>
            </div>
            <div class="list-item-heading mb-1">
            <!--   {{ parseFloat(this.total | currency) }} -->

              {{
                        parseFloat(
                          this.total
                        ).toFixed(2) | currency
                      }}


            </div>
          </div>
          <div class="m-auto col-lg-11 pb-2 text-center">
            <small class="text-info font-weight-semibold">
              Reference: {{ detallecotizacion.cotReferencia }}</small
            >
          </div>
        </b-colxx>
        <b-row class="mt-3">
          <div
            class="m-auto col-lg-12 pl-2 pr-1 pb-2 text-center resumen-validate"
          >
            <table class="table no-border table-sm pl-2 pr-2">
              <tbody>
                <tr>
                  <td class="col-md-5">
                    <strong>Tour departure dates</strong>
                  </td>
                  <td class="font-medium text-info">
                    <small
                      >{{ moment(detallecotizacion.cotDesde).format("DD MMM YYYY, ddd") }} to
                      {{
                        moment(detallecotizacion.cotHasta).format("DD MMM YYYY, ddd")
                      }}</small
                    >
                  </td>
                </tr>
                <tr>
                  <td class="col-md-5"><strong>Client</strong></td>
                  <td class="font-medium text-info">
                    {{ detallecotizacion.clienteName }}
                    <i class="simple-icon-check ml-2 text-success"></i>
                  </td>
                </tr>
                <tr>
                  <td class="col-md-5"><strong> Code</strong></td>
                  <td v-if="codigoname" class="font-medium text-info">
                    {{ codigoname }}
                    <i class="simple-icon-check ml-2 text-success"></i>
                  </td>
                  <td v-else class="">
                    <b-badge variant="danger"> Please select a code</b-badge>
                  </td>
                </tr>
                <tr
                  style="
                    border-bottom: 1px solid #dee2e6;
                    border-color: #f3f3f3 !important;
                  "
                >
                  <td class="col-md-5"><strong>Info Children</strong></td>
                  <td
                    v-if="
                      detallecotizacionbooking.bokChildrenPax ==
                      childrens.length
                    "
                    class="font-medium text-info"
                  >
                    <b-badge variant="info">Complete</b-badge>
                    <i class="simple-icon-check ml-2 text-success"></i>
                  </td>
                  <td v-else class="">
                    <b-badge variant="danger">Incomplete</b-badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="m-auto col-lg-12 pl-2 pr-1 pb-2 text-center resumen-validate"
          >
            <b-button
              @click="ConfirmQuote()"
              v-if="
                detallecotizacionbooking.bokChildrenPax == childrens.length &&
                codigo
              "
              variant="success default"
              class="mr-2"
            >
              <i class="fas fa-check-double"></i>
              Confirm
            </b-button>
            <b-button v-else disabled variant="success default" class="mr-2">
              <i class="fas fa-check-double"></i>
              Confirm
            </b-button>
          </div>
        </b-row>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices.js";
import ConfirmacionesServices from "../../../../../services/gps/confirmacion/ConfirmacionServices";

import IconCard from "../../../../../components/Cards/IconCard";
import Datepicker from "vuejs-datepicker";
//component code

export default {
  components: {
    "icon-card": IconCard,
    datepicker: Datepicker,
  },

  name: "",
  props: ["cotId"],
  data() {
    return {
      state: {
        disabledDates: {
          from: new Date(), // Disable all dates after specific date
        },
      },
      selectedFruit: [],
      selected: '',
      maxDate: new Date(),
      codigoscliente: [],
      codigo: "",
      lpaNombre: "",
      lpaApellido: "",
      lpaDob: "",
      formActualizar: false,
      idActualizar: -1,
      lpaNombreActualizar: "",
      lpaApellidoActualizar: "",
      lpaDobActualizar: "",
      // Input lpaApellido dentro del formulario de actualizar
      detallecotizacion: [],
      detallecotizacionbooking: [],
      clienteId: "",
      childrens: [],
      respuestaautonumerico: "",
      periodo: "",
      codigoname: "",
      totalescotizacion: [],
      total: "",
      cofId: "",
      userId: this.$store.getters.currentUser.id,
    };

    /* calendario */
  },

  computed: {
    age: function () {
      let currentDate = new Date();
      let birthDate = new Date(this.lpaDob);
      let difference = currentDate - birthDate;
      let age = Math.floor(difference / 31557600000);
      return age;
    },
    ageactualizar: function () {
      let currentDate = new Date();
      let birthDate = new Date(this.lpaDobActualizar);
      let difference = currentDate - birthDate;
      let age = Math.floor(difference / 31557600000);
      return age;
    },
  },

  mounted() {
    this.cotizaciondetalles();
    this.totalcotizacion();
  },
  methods: {
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if (/^[A-Za-z]+$/.test(char)) return true;
      // Match with regex
      else e.preventDefault(); // If not match, don't add to input text
    },

    createChildrenPax() {
      // Anyadimos a nuestra
      this.childrens.push({
        id: +new Date(),
        lpaNombre: this.lpaNombre,
        lpaApellido: this.lpaApellido,
        lpaDob: this.lpaDob,
      });

      this.lpaNombre = "";
      this.lpaApellido = "";
      this.lpaDob = "";
    },
    verFormActualizar: function (children_id) {
      // Antes de mostrar el formulario de actualizar, rellenamos sus campos
      this.idActualizar = children_id;
      this.lpaNombreActualizar = this.childrens[children_id].lpaNombre;
      this.lpaApellidoActualizar = this.childrens[children_id].lpaApellido;
      this.lpaDobActualizar = this.childrens[children_id].lpaDob;
      this.formActualizar = true;
    },

    borrarChildren: function (children_id) {
      this.childrens.splice(children_id, 1);
    },

    guardarActualizacion: function (children_id) {
      // Ocultamos nuestro formulario de actualizar
      this.formActualizar = false;
      // Actualizamos los datos
      this.childrens[children_id].lpaNombre = this.lpaNombreActualizar;
      this.childrens[children_id].lpaApellido = this.lpaApellidoActualizar;
      this.childrens[children_id].lpaDob = this.lpaDobActualizar;
    },
    cotizaciondetalles() {
      CotizacionesServices.cotizacionesdetalles(this.cotId)
        .then((response) => {
          this.detallecotizacion = response.data;
          this.detallecotizacion = this.detallecotizacion.shift();
          this.detallecotizacionbooking = this.detallecotizacion["booking"];
          this.clienteId = this.detallecotizacion.clienteId;
          this.periodo = this.detallecotizacion.detalles[0].codFechaInicio;
          this.periodo = new Date(this.periodo);
          this.periodo = this.periodo.getFullYear();
          this.codigosCliente(this.clienteId);
        })

        .catch((error) => {
          console.log(error);
        });
    },
    codigosCliente(id) {
      ConfirmacionesServices.codigosCliente(id)
        .then((response) => {
          this.codigoscliente = response.data.data;

        let default_code =  this.codigoscliente.filter(codigo => codigo.principal == 1);
        if(default_code.length>0) {
        this.selected= default_code[0]['id'];
            this.codigo = this.selected
            this.codigoname = default_code[0]['codigo'];
            }
        else {
        this.selected = this.codigoscliente[0]['id'];
    this.codigo =  this.selected
     this.codigoname = this.codigoscliente[0]['codigo'];
    }


        })
        .catch((error) => {
          console.log(error);
        });
    },
    captureitem(id, codigos) {
      /*  console.log('s'+id); */
      this.codigo = id;
      this.codigoname = codigos;
    },

    ConfirmQuote() {

      let queryParams = {
        id: this.cotId,
        userId:this.userId,
        codigo: this.codigo,
        periodo: this.periodo,
        children: this.childrens,
        clienteId: this.clienteId
      };

      CotizacionesServices.confirmQuote(queryParams)
        .then((response) => {

          this.cofId = response.data.data;
          /*   console.log("==> COnfirmacion" + JSON.stringify(this.cofId));
           */
          if (this.cofId) {
            this.$router.push({
              name: "confirmations",
              params: {
                cofId: this.cofId,
              },
            });
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log("Error" + JSON.stringify(error.response.data.data));
            //let msj = error.response.data.msj;
            let msj = error.response.data.data + '. Check assigned operator and seller, and try again' ;
            var type = "error filled";
            var title = "Imposible create Confirmation";
            var message = msj;
            {
              this.$notify(type, title, message, {
                duration: 5000,
                permanent: false,
              });
            }
          }
        });
    },


    totalcotizacion() {
      CotizacionesServices.totalescotizacion(this.cotId)
        .then((response) => {
          this.totalescotizacion = response.data;
          this.total = this.totalescotizacion.total;
          this.total = parseFloat(this.total);
          /*
          console.log("==> Total" + JSON.stringify(this.total)); */
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
