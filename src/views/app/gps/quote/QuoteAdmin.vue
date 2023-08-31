<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <h1>{{ $t("gps.quotes") }}</h1>
        <!-- {{rowBookingSlots}} -->
        <div
          class="form-group has-float-label custom-input float-right col-lg-5"
        ><!-- 
        no usado -->
          <b-colxx
            v-for="(item, index) in rowBookingSlots"
            :key="index"
            xxs="12"
            class="quote-header"
          >
            <b-row>
              <b-colxx xxs="6" class="pl-2 pr-2">
                <div class="client">
                  <strong>{{ $t("gps.quote-client") }}: </strong>
                  <span
                    v-if="
                      headerQuote !== undefined &&
                      headerQuote.headerCompany.razon_social
                    "
                    >{{ headerQuote.headerCompany.razon_social }}</span
                  >
                  <span v-else>"ATC ejemplo"</span>
                </div>
                <div>
                  <strong>{{ $t("gps.estadocot") }}: </strong>
                  <span
                    v-if="formatEstadoCotizacion(item[0].cotEstado) == 'Active'"
                    style="font-size: 0.9rem"
                  >
                    <strong class="text-success">{{
                      formatEstadoCotizacion(item[0].cotEstado)
                    }}</strong>
                  </span>
                  <span v-else style="font-size: 0.85rem">
                    <strong class="text-muted">{{
                      formatEstadoCotizacion(item[0].cotEstado)
                    }}</strong>
                  </span>
                </div>
              </b-colxx>
              <b-colxx xxs="6" class="p-0">
                <div>
                  <!-- info de referencia de bloqueo -->
                  <strong>{{ $t("gps.your-reference") }}: </strong>
                  <span>
                    {{ item[0].cotReferencia }}
                  </span>
                </div>
                <div>
                  <!-- ATC+id de pedido -->
                  <strong>{{ $t("gps.time-limit") }}:</strong>
                  <span class="ref">
                    {{
                      moment(item[0].bokTimeLimit, "YYYY-MM-DD").format(
                        "DD MMM YYYY, ddd - HH:MM:SS"
                      )
                    }}
                  </span>
                </div>
              </b-colxx>
              <!--      {{ this.rowBookingSlots[0][0].bokId }} -->
            </b-row>
          </b-colxx>
        </div>

        <!--     {{this.rowBookingSlotsRequests[0].gctEstado}}  -->
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
                <a href="/app" class="active" target="_self">{{ $t("menu.home") }}</a>
              </li>
              <li class="breadcrumb-item">
                <a
                  href="/app/gps/availability/AvailabilityDistribution"
                  class="active"
                  target="_self"
                  >{{ $t("gps.availability") }}</a
                >
              </li>
            </ol>
          </ul>
        </span>
        <div class="separator mb-2"></div>
      </b-colxx>
    </b-row>
    <div class="float-right hold_other">
      <b-row>
        <b-colxx xxs="12">
          <b-button
            v-if="rowBookings.length <= maxAddQuotes"
            variant="primary default other"
            @click="goToAvailability()"
            size="sm"
            >{{ $t("gps.hold-another") }}</b-button
          >
          <!-- 05/04/2021 FS: desactivar botón según clickup "Eliminar funcionalidad de boton request finish." Testing. Quotes>> Quote Admin -->
          <!--b-button
            variant="success default"
            @click="endRequest(this.gctId)"
            size="sm"
            >{{ $t("gps.finish-request") }}</b-button
          -->

          <!--     <a href="#">
              <i class="simple-icon-reload" @click="recargar()" />
              <span class="d-inline-block">Reload</span>
              <span class="float-right"></span>
            </a> -->
        </b-colxx>
      </b-row>
    </div>

    <!--               <p> {{rowBookingSlotsRequests[0]['gctId']}}</p>  -->
    <!-- ------------------------------------------- CONSTRUCCION DE TABS ------------------------------------------- -->
    <!--h1>ReqId: {{reqIdQuote}}</h1><br-->
    <!-- CliId: {{rowBookingSlotsRequests.slice(0, 1).map(a => a.bokClientId)}} -->
    <!--  Childrens: {{childrens}}  -->

    <b-tabs
      nav-class="separator-tabs ml-0 mb-2"
      content-class="tab-content"
      :no-fade="true"
    >
      <b-tab
        title=""
        v-for="(book, index) in rowBookingSlotsRequests"
        :key="index"
        :active="rowBookingSlotsRequests.length - 1 === index"
        @click="getBookingSlots(book.cotId)"
      >
        <!--    {{book}} -->
        <template #title>
          {{ $t("gps.quote") + " " + book.cotNumero }}
          <br />
          <span class="sub_tilte-tab">
            Q{{ book.cotId }}-{{ book.cotCodigo }}
            <!-- <br>
            08-02-2021-->
          </span>
        </template>
        <b-colxx xxs="12" class="pl-0 pr-0">
          <b-card class="mb-4 quote-content">
            <!-- PINTAR ARRAY rowBookingSlots -->
            <div v-if="rowBookingSlots.length > 0">
              <!-- -------------------------------------------- ACTIONS -------------------------------------------- -->
              <b-row>
                <b-colxx xxs="12">
                  <b-row>
                    <b-colxx xxs="2">
                      <!--Id de Quote + Versión + fecha de creación-->
                      <div
                        class="quote-name"
                        v-if="
                          rowBookingSlotsRequests[0].numberconfirmations == 0
                        "
                      >
                        
    <span class="header-filters text-muted">
        <div class="col-lg-10 text-left" >
          <div class="row">
            <div class="col-lg-6 pr-0">
              <div class="mt-2">
                
 
                <add-services
                :cotId="94"
                >
                </add-services>

              </div>
            </div>

          </div>
          





      </div>
    </span> 

                        <b-dropdown
                          id="ddown3"
                          :text="$t('gps.quote-actions')"
                          size="md"
                          variant="primary no-round"
                        >
                          <b-dropdown-item v-b-toggle.sidebar-no-header>{{
                            $t("gps.add-services")
                          }}</b-dropdown-item>
                          <b-dropdown-item
                            @click="openModalExtraDiscount(book.bokId)"
                            v-b-modal.modalextradiscount
                          >
                            {{ $t("gps.extra-discount") }}
                          </b-dropdown-item>
                          <b-dropdown-divider></b-dropdown-divider>
                          <b-dropdown-item
                            @click="
                              goToEditBooking(book.bokId),
                                changestatusdestroyanyview()
                            "
                            >{{ $t("gps.quote-edit-depar") }}
                          </b-dropdown-item>

                          <b-dropdown-item
                            @click="
                              openModalExtendTimeLimit(
                                book.bokId,
                                rowBookingSlots[0][0]['bokTimeLimit']
                              )
                            "
                            v-b-modal.modalextendtimelimit
                            >{{ $t("gps.quote-extend-time") }}
                          </b-dropdown-item>
                          <b-dropdown-item
                            @click="cancelQuote(book.cotId, book.bokId)"
                            >{{ $t("gps.cancel-quote") }}
                          </b-dropdown-item>
                        </b-dropdown>
                      </div>
                    </b-colxx>
                    <!-- PARTE DE NOTAS POR ITEM -->
                    <b-colxx v-if="selected.length">
                      <ModalNoteQuote
                        @updateQuoteAdmin="updateQuoteAdmin"
                        :detailconf="selected[0]"
                      ></ModalNoteQuote>
                    </b-colxx>
                    <!-- PARTE DE NOTAS POR ITEM -->
                  </b-row>

                  <b-row>
                    <!-- AÑADIR SERVICIOS -->
                    <!-- <pre>{{book}}</pre> -->

                    <quoteaddservices
                      @updateQuoteAdmin="updateQuoteAdmin"
                      :bokId="rowBookingSlots[0][0]['bokId']"
                      :corId="book.corId"
                      :copId="book.copId"
                      :copPaxHasta="book.copPaxHasta"
                      :cotDesde="book.cotDesde"
                    >
                    </quoteaddservices>
                    <!-- :detail="rowBookingSlots[0][0]" -->
                    <!-- FIN AÑADIR SERVICIOS -->
                  </b-row>

                  <div class="separator mb-2"></div>
                </b-colxx>
              </b-row>
              <!-- -------------------------------------------- FIN ACTIONS -------------------------------------------- -->
              <!--    <pre>{{rowBookingSlots}}</pre>  -->

              <b-row>
                <b-colxx xxs="12">
                  <div
                    v-for="(quote, index) in rowBookingSlots"
                    :key="index"
                    :class="
                      quote.length < 5 ? 'scroll--inactive' : 'scroll--active'
                    "
                  >
                    <vue-perfect-scrollbar
                      class="scroll dashboard-list-with-thumbs"
                      :settings="{
                        suppressScrollX: true,
                        wheelPropagation: false,
                      }"
                    >
                      <!-- TABLA -->
                      <b-table
                        :items="quote"
                        :fields="fields"
                        :outlined="true"
                        :select-mode="selectMode"
                        responsive="sm"
                        ref="selectableTable"
                        selectable
                        @row-selected="onRowSelected"
                        :small="small"
                        class="vuetable quote"
                      >
                        <template #cell(index)="data">
                          {{ data.index + 1 }}
                        </template>
                        <template #cell(selected)="{ rowSelected }">
                          <template v-if="rowSelected">
                            <span aria-hidden="true">&check; </span>
                            <span class="sr-only">Selected</span>
                          </template>
                          <template v-else>
                            <span aria-hidden="true">&nbsp;</span>
                            <span class="sr-only">Not selected</span>
                          </template>
                        </template>
                      </b-table>

                      <!-- FIN TABLA -->
                    </vue-perfect-scrollbar>
                  </div>
                </b-colxx>
              </b-row>
              <!-- 
PARTE DE TOTALES INFERIORES -->
              <b-row>
                <b-colxx xxs="12">
                  <b-row>
                    <b-colxx xxs="6"> </b-colxx>
                    <b-colxx xxs="6">
                      <div class="float-right">
                        <table class="table">
                          <thead class="thead-dark"></thead>
                          <tbody>
                            <tr>
                              <td class="quotes-summary">
                                {{ $t("gps.sub-total") }}
                              </td>
                              <td class="quotes-summary">
                                {{ getTotal.toFixed(2) }}
                              </td>
                            </tr>
                            <tr v-if="book.cotCruceroDescuentoNinos > 0">
                              <td class="quotes-summary">
                                Cruise Children Discount
                              </td>
                              <td class="quotes-summary">
                                {{ book.cotCruceroDescuentoNinos }}
                              </td>
                            </tr>
                            <tr>
                              <td class="quotes-summary">Subtotal</td>
                              <td class="quotes-summary">
                                {{
                                  (
                                    getTotal -
                                    (parseFloat(book.cotCruceroDescuentoNinos) +
                                      0)
                                  ).toFixed(2)
                                }}
                              </td>
                            </tr>
                            <tr v-if="book.imdPorcentaje > 0">
                              <td class="quotes-summary">
                                I.V.A. {{ book.imdPorcentaje }}
                              </td>
                              <td class="quotes-summary">
                                {{
                                  (
                                    (getTotal -
                                      (parseFloat(
                                        book.cotCruceroDescuentoNinos
                                      ) +
                                        0)) *
                                    (book.imdPorcentaje / 100)
                                  ).toFixed(2)
                                }}
                              </td>
                            </tr>
                            <tr>
                              <td class="quotes-summary">
                                {{ $t("gps.grant-total") }}
                              </td>
                              <td class="quotes-summary">
                                {{
                                  (
                                    getTotal -
                                    (parseFloat(book.cotCruceroDescuentoNinos) +
                                      0) +
                                    (getTotal -
                                      (parseFloat(
                                        book.cotCruceroDescuentoNinos
                                      ) +
                                        0)) *
                                      (book.imdPorcentaje / 100)
                                  ).toFixed(2)
                                }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </b-colxx>
                  </b-row>
                </b-colxx>
              </b-row>
              <!-- 
PARTE DE TOTALES INFERIORES -->
            </div>
            <div v-else>
              <div
                role="alert"
                aria-live="polite"
                aria-atomic="true"
                class="alert alert-warning m-2"
              >
                <h3>
                  <i class="glyph-icon iconsminds-up-1"></i> No Quote selected.
                </h3>
                Please select a <b>Quote</b> and try again
              </div>
            </div>
            <!-- FIN  PINTAR ARRAY rowBookingSlots -->
          </b-card>
        </b-colxx>

        <!-- SECCION BOTONES -->
        <b-row>
          <b-colxx xxs="12">
            <b-row>
              <b-colxx xxs="6"> </b-colxx>
              <b-colxx xxs="6">
                <div class="float-right">
                  <b-button-group class="mb-2">
                    <!--   <router-link
                      class="btn btn-info rounded-0"
                      :to="{
                        name: 'quotepreviewpdf',
                        params: { cotid: book.cotId }
                      }"
                    >
                      <i class="glyph-icon iconsminds-mail-search"></i>
                      {{ $t("gps.preview") }}
                    </router-link> -->
                    <button
                      type="button"
                      @click="changestatusdestroy(book.cotId)"
                      class="btn btn-info rounded-0"
                    >
                      {{ $t("gps.preview") }}
                    </button>
                    <!-- {{rowBookingSlotsRequests[0].numberconfirmations}} #confirmationes en este grupo -->
                    <div v-for="(item, index) in rowBookingSlots" :key="index">
                      <div v-if="item[0].bokChildrenPax == childrens.length">
                        <b-button
                          v-if="
                            rowBookingSlotsRequests[0].numberconfirmations ==
                              0 && buildMailArray()[1].length > 0
                          "
                          variant="success default"
                          @click="convertConfirmation()"
                          >{{ $t("gps.confirm") }}</b-button
                        >
                      </div>
                      <div v-else>
                        <!--BOTON PARA QUE PRIMERO INGRESEN LOS NIÑOS -->
                        <div v-for="item in rowBookingSlots">
                          <b-button
                            variant="success default"
                            v-if="item[0].bokChildrenPax > 0"
                            v-b-modal.modal-4
                          >
                            {{ $t("gps.confirm") }}</b-button
                          >
                        </div>
                        <!--BOTON PARA QUE PRIMERO INGRESEN LOS NIÑOS -->
                      </div>
                    </div>
                  </b-button-group>
                </div>
              </b-colxx>
            </b-row>
          </b-colxx>
        </b-row>
        <!-- FIN SECCION BOTONES -->
      </b-tab>
      <!-- ------------------------------------------- FIN CONSTRUCCION DE TABS ------------------------------------------- -->
      <!--       {{this.rowBookingSlots[0][0].bokId}} -->
      <b-modal
        id="modalextradiscount"
        size="lg"
        ref="modalextradiscount"
        :title="'Extra Discounts'"
        :no-close-on-backdrop="true"
      >
        <ModalExtraDiscount
          @updateQuoteAdmin="updateQuoteAdmin"
          :bokId="bookId"
        ></ModalExtraDiscount>
        <template slot="modal-footer">
          <b-button
            variant="primary"
            @click="
              UpdateCotizacionesDetailExtraDiscount(
                rowBookingSlots[0][0]['bokId']
              ),
                hideModal('modalextradiscount')
            "
            >Save</b-button
          >
        </template>
      </b-modal>
      <!--   {{booktimelimitid}} -->
      <b-modal
        id="modalextendtimelimit"
        size="lg"
        ref="modalextendtimelimit"
        :title="'Extend time limit'"
      >
        <ModalExtendTimeLimit
          @updateQuoteAdmin="updateQuoteAdmin"
          :bokId="booktimelimitid"
          :totalbookingtime="booktimelimitactual"
        ></ModalExtendTimeLimit>
        <template slot="modal-footer">
          <b-button
            variant="secondary"
            @click="hideModal('modalextendtimelimit')"
            >{{ $t("gps.close") }}</b-button
          >
        </template>
      </b-modal>
      <b-modal id="modal-1" ref="modalcodigos" size="lg" title="Codes ">
        <label class="form-group has-float-label">
          <b-form-select
            v-model="codigo"
            :options="listacodigos"
            text-field="codigo"
            value-field="id"
          ></b-form-select>
          <span>Select Code</span>
        </label>
        <b-button variant="success default" @click="GenerateCode(codigo)"
          >Confirm Code</b-button
        >
        <template slot="modal-footer">
          <b-button variant="secondary" @click="hideModal('modalcodigos')">{{
            $t("gps.close")
          }}</b-button>
        </template>
        <!--<b-button @click="funcionALlamar()"> </b-button> -->
      </b-modal>
      <!--   {{codigo}} -->
      <div v-for="item in rowBookingSlots"></div>
      <!--  CONTENIDO DE MODAL PARA NIÑOS -->
      <b-modal
        id="modal-4"
        size="xl"
        ref="modalchildrenpax"
        :no-close-on-backdrop="true"
        title="Children Pax"
      >
        <div id="addChildrens" class="container">
          <!-- Formulario para añadir childrens -->
          <section class="form">
            <form action="" class="text-center">
              <div v-for="item in rowBookingSlots">
                You have to register {{ item[0].bokChildrenPax }} childrens
                preview to confirm this quote <br />
                <strong
                  >To complete, click on the "Save" button to continue the
                  confirmation
                </strong>
              </div>

              <div class="form-group row">
                <div class="col-sm-6">
                  <b-input-group prepend="Name" class="mt-3">
                    <b-form-input
                      id="input-live"
                      v-model="nombre"
                      aria-describedby="input-live-help input-live-feedback"
                      placeholder="Please enter name children"
                      trim
                    ></b-form-input>
                  </b-input-group>
                </div>
                <div class="col-sm-6">
                  <b-input-group prepend="Last Name" class="mt-3">
                    <b-form-input
                      id="input-live"
                      v-model="apellido"
                      aria-describedby="input-live-help input-live-feedback"
                      placeholder="Please enter last name children"
                      trim
                    ></b-form-input>
                  </b-input-group>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-6">
                  <b-input-group prepend="DOB" class="mt-2">
                    <b-form-input
                      id="input-live"
                      v-model="dob"
                      type="date"
                      aria-describedby="input-live-help input-live-feedback"
                      placeholder="Enter Date of Birth"
                      trim
                    >
                    </b-form-input>
                  </b-input-group>

                  <small> Age {{ age }} years</small>
                  <small v-if="age > 12">
                    Children must be less than 12 years</small
                  >
                </div>
                <div class="col-sm-6">
                  <b-input-group prepend="Passport" class="mt-2">
                    <b-form-input
                      id="input-live"
                      v-model="passport"
                      aria-describedby="input-live-help input-live-feedback"
                      placeholder="Please enter passport children"
                      trim
                    ></b-form-input>
                  </b-input-group>
                </div>
              </div>
              <!--   {{childrens.length}} -->

              <div v-for="item in rowBookingSlots">
                <input
                  @click="createChildrenPax(item[0].bokId)"
                  v-if="
                    nombre &&
                    apellido &&
                    dob &&
                    passport &&
                    item[0].bokChildrenPax > childrens.length &&
                    age < 12
                  "
                  type="button"
                  value="Add Children"
                  class="btn btn-success"
                />
              </div>
            </form>
          </section>
          <!-- Tabla donde se muestran los datos -->
          <section class="data">
            <caption>
              <!--         Childrens :      {{childrens.length}} -->
            </caption>
            <table class="table">
              <thead>
                <tr>
                  <!--  <th scope="col">id</th> -->
                  <th scope="col">Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Dob</th>
                  <th scope="col">Passport</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(children, index) in childrens">
                  <!--    <td>{{ children.id }}</td> -->
                  <td>
                    <span v-if="formActualizar && idActualizar == index">
                      <!-- Formulario para actualizar -->
                      <input
                        v-model="nombreActualizar"
                        type="text"
                        class="form-control"
                      />
                    </span>
                    <span v-else>
                      <!-- Dato nombre -->
                      {{ children.lpaNombre }}
                      <!-- {{ children.lpaId }} -->
                    </span>
                  </td>
                  <td>
                    <span v-if="formActualizar && idActualizar == index">
                      <!-- Formulario para actualizar -->
                      <input
                        v-model="edadActualizar"
                        type="text"
                        class="form-control"
                      />
                    </span>
                    <span v-else>
                      <!-- Dato apellido -->
                      {{ children.lpaApellido }}
                    </span>
                  </td>
                  <td>
                    <span v-if="formActualizar && idActualizar == index">
                      <!-- Formulario para actualizar -->
                      <!--       <input
                        v-model="dobActualizar"
                        type="text"
                        class="form-control"
                      /> -->
                      <b-form-input
                        id="input-live"
                        v-model="dobActualizar"
                        type="date"
                        aria-describedby="input-live-help input-live-feedback"
                        placeholder="Enter Date of Birth"
                        trim
                      >
                      </b-form-input>
                    </span>
                    <span v-else>
                      <!-- Dato apellido -->
                      {{ children.lpaDob }}
                    </span>
                  </td>
                  <td>
                    <span v-if="formActualizar && idActualizar == index">
                      <!-- Formulario para actualizar -->
                      <input
                        v-model="passportActualizar"
                        type="text"
                        class="form-control"
                      />
                    </span>
                    <span v-else>
                      <!-- Dato apellido -->
                      {{ children.lpaNumeroPasaporte }}
                    </span>
                  </td>
                  <td>
                    <!-- Botón para guardar la información actualizada -->
                    <span v-if="formActualizar && idActualizar == index">
                      <button
                        @click="guardarActualizacion(index, children.lpaId)"
                        class="btn btn-success"
                      >
                        Updates
                      </button>
                    </span>
                    <span v-else>
                      <!-- Botón para mostrar el formulario de actualizar -->
                      <button
                        @click="verFormActualizar(index)"
                        class="btn btn-warning"
                      >
                        Update
                      </button>
                      <!-- Botón para borrar -->
                      <button
                        @click="borrarChildren(index, children.lpaId)"
                        class="btn btn-danger"
                      >
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
        <template slot="modal-footer">
          <div v-for="(item, index) in rowBookingSlots" :key="index">
            <b-button
              v-if="item[0].bokChildrenPax == childrens.length"
              variant="primary"
              @click="hideModal('modalchildrenpax')"
              >Save</b-button
            >
          </div>
        </template>
      </b-modal>
      <!--  CONTENIDO DE MODAL PARA NIÑOS -->
    </b-tabs>
  </div>
</template>

<script>
/* *** SERVICES *** */
import { apiUrl } from "../../../../constants/config";
import axios from "axios";
import Vuetable from "vuetable-2/src/components/Vuetable";
import PasajeroServices from "../../../../services/gps/confirmacion/PasajeroServices.js";
import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap";
import AvailabilityServices from "../../../../services/gps/availability/availabilityServices.js";
import CotizacionesServices from "../../../../services/gps/cotizaciones/CotizacionesServices.js";
import AutonumericoServices from "../../../../services/gps/autonumerico/autonumericoServices";
import BookingServices from "../../../../services/gps/booking/BookingServices.js";
import BookingRequestSummary from "../../../../services/gps/bookingsRequest/bookingRequestServices.js";
import CotizacionDetalleServices from "../../../../services/gps/cotizaciondetalle/CotizacionDetalleServices.js";
import ConfirmacionServices from "../../../../services/gps/confirmacion/ConfirmacionServices.js";

export default {
  name: "QuoteAdmin",
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
  },
  props: ["gctId", "header"],
  data() {
    return {
      //Opcion table
      selectMode: "single",
      small: true,
      selected: [],
      // FS: Variable para validar si es Hold Another mantenga el $store
      isModeEndRequest: true,
      // VALIDACION NIÑOS
      routesnodestroy: true,
      //variable control destroy
      nombre: "",
      // Input apellido
      apellido: "",
      // Input fecha nacimiento
      dob: "",
      // Input fecha nacimiento
      passport: "",
      // Ver o no ver el formulario de actualizar
      formActualizar: false,
      // La posición de tu lista donde te gustaría actualizar
      idActualizar: -1,
      // Input nombre dentro del formulario de actualizar
      nombreActualizar: "",
      // Input apellido dentro del formulario de actualizar
      edadActualizar: "",
      // Lista de childrens
      childrens: [],
      // VALIDACION NIÑOS

      defaultTab: "",
      headerQuote: [],
      gctIdQuote: "",
      rowBookings: [],
      vendedor: this.$store.getters.currentUser.id,
      rowBookingSlotsRequests: [],
      rowBookingSlots: [],
      maxAddQuotes: 50,
      bookId: "",
      booktimelimitid: "",
      booktimelimitactual: "",
      cotizacionId: "",
      bookingid: "",
      codeclient: "",
      empresa: "",
      tipomodulo: 2,
      periodo: 2021,
      codId: "",
      codnota: "",
      codigo: "",
      codpax: "",
      codconcepto: "",
      codpreciounitario: "",
      codcostunitariototal: "",
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      arrayPreview: [],
      arrayPreviewApi: [],
      detallecotizacion: [],
      listacodigos: "",
      numerocodigos: "",
      fields: [
        {
          key: "index",
          label: "#",
          sortable: false,
          sortDirection: "desc",
          tdClass: "index",
        },
        {
          key: "selected",
          label: "",
          sortable: false,
          sortDirection: "desc",
          tdClass: "index",
        },
        {
          key: "codFechaInicio",
          label: "Start date",
          sortable: false,
          sortDirection: "desc",
          tdClass: "list-item-startdate",
        },
        {
          key: "codFechaFin",
          label: "End date",
          sortable: false,
          tdClass: "list-item-enddate",
        },
        {
          key: "codPax",
          label: "Pax",
          sortable: false,
          tdClass: "nums",
        },

        //{ key: 'decName', label: '', sortable: false, tdClass: 'text-muted' },
        {
          key: "proveedor",
          label: "Supplier",
          tdClass: "pricess supplier",
        },
        {
          key: "codConcepto",
          label: "Item",
          sortable: false,
          tdClass: "text-concepto",
        },
        /*     {
              key: "codCostoUnitarioTotal",
              label: "PP",
              sortable: false,
              tdClass: "pricess",
            }, */
        {
          key: "codPrecioUnitarioTotal",
          label: "PP Net",
          sortable: false,
          tdClass: "pricess",
        },
        /*   {
              key: 'total_ssput',
               label: "SS",
             tdClass: "pricess",
            }, */

        {
          key: "total_paxput",
          label: "Total Net",
          sortable: false,
          tdClass: "pricess",
        },

        //{ key: 'actions', label: 'actions', sortable: false, tdClass: '' }
      ],

      slotsTotales: 0,
      subTotalQuote: 0,
      totalDiscount: 0,
      porcentajeIVA: 0,
      valorIVA: 0,
      totalGeneral: 0,
      childrenDiscount: 0,
      subTotalChildrenDiscount: 0,
    };
  },
  filters: {},
  computed: {
    checkEnableButtonSendMail() {
      if (this.rowBookingSlots.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    getTotal() {
      var cotizacion = this.rowBookingSlots[0];
      var suma = 0;
      for (var x = 0; x < cotizacion.length; x++) {
        suma += parseFloat(cotizacion[x].total_paxput);
      }
      return suma;
    },

    age: function () {
      let currentDate = new Date();
      let birthDate = new Date(this.dob);
      let difference = currentDate - birthDate;
      let age = Math.floor(difference / 31557600000);
      return age;
    },
  },

  methods: {
    //table
    onRowSelected(items) {
      this.selected = items;
    },
    /* VALIDACION NIÑOS */
    getChildPaxByCotId() {
      CotizacionesServices.getChildPaxByCotId(this.cotizacionId)
        .then((response) => {
          this.childrens = response.data.data;
          // console.log(this.childrens);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
    createChildrenPax(bokId) {
      // Anyadimos a nuestra
      var dataNewChild = [];
      dataNewChild.push({
        id: +new Date(),
        nombre: this.nombre,
        apellido: this.apellido,
        dob: this.dob,
        passport: this.passport,
        cotId: this.cotizacionId,
        bokId: bokId,
      });
      //var datos=[{cotId:this.cotizacionId},this.childrens];

      PasajeroServices.saveChildPaxList(dataNewChild)
        .then((response) => {
          let resp = response.data.data;
          //   console.log(resp);
          this.getChildPaxByCotId(); //Permite actualizar la tabla inmediatamente se agregue un niño
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
      // Vaciamos el formulario de añadir
      this.nombre = "";
      this.apellido = "";
      this.dob = "";
      this.passport = "";
    },
    verFormActualizar: function (children_id) {
      // Antes de mostrar el formulario de actualizar, rellenamos sus campos
      this.idActualizar = children_id;
      this.nombreActualizar = this.childrens[children_id].nombre;
      this.edadActualizar = this.childrens[children_id].apellido;
      this.dobActualizar = this.childrens[children_id].dob;
      this.passportActualizar = this.childrens[children_id].passport;
      // Mostramos el formulario
      this.formActualizar = true;
    },

    borrarChildren: function (children_id, paxid) {
      // Borramos de la lista
      //  this.childrens.splice(children_id, 1);
      //console.log("id pax"+ paxid);
      PasajeroServices.borrarChildren(paxid).then((response) => {
        let mensaje = response.data.data;
        // console.log(response.data.data);

        if (mensaje == 200) {
          this.getChildPaxByCotId();
        } else;
      });
    },

    guardarActualizacion: function (children_id, paxid) {
      // Ocultamos nuestro formulario de actualizar
      this.formActualizar = false;
      // Actualizamos los datos
      this.childrens[children_id].nombre = this.nombreActualizar;
      this.childrens[children_id].apellido = this.edadActualizar;
      this.childrens[children_id].dob = this.dobActualizar;
      this.childrens[children_id].passport = this.passportActualizar;
      /*  console.log("id tabla"+ this.childrens[children_id].nombre)

          console.log("id pax"+ paxid) */
      var dataUpdateChild = [];

      var dataUpdateChild = [];
      // VALIDAMOS VALORES NULOS PARA INGRESO EN LA ACTUALIZACION
      if (this.nombreActualizar === undefined) {
        this.childrens[children_id].nombre = null;
        console.log(this.childrens[children_id].nombre);
      }
      if (this.edadActualizar === undefined) {
        this.childrens[children_id].apellido = null;
        console.log(this.childrens[children_id].apellido);
      }
      if (this.dobActualizar === undefined) {
        this.childrens[children_id].dob = null;
        console.log(this.childrens[children_id].dob);
      }
      if (this.passportActualizar === undefined) {
        this.childrens[children_id].passport = null;
        console.log(this.childrens[children_id].passport);
      }
      // VALIDAMOS VALORES NULOS PARA INGRESO EN LA ACTUALIZACION

      dataUpdateChild.push({
        lpaId: paxid,
        lpaNombre: this.childrens[children_id].nombre,
        lpaApellido: this.childrens[children_id].apellido,
        lpaDob: this.childrens[children_id].dob,
        lpaNumeroPasaporte: this.childrens[children_id].passport,
      });

      PasajeroServices.updateChildrenInf(dataUpdateChild)
        .then((response) => {
          let resp = response.data.data;
          //   console.log(resp);
          if (resp == 200) {
            this.getChildPaxByCotId();
          }
          //this.getChildPaxByCotId(); //Permite actualizar la tabla inmediatamente se agregue un niño
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },

    /* VALIDACION NIÑOS */
    recargar() {
      window.location.reload();
    },
    // ----------- Actualizo QuoteAdmin desde cualquier hijo -----------
    updateQuoteAdmin(data) {
      if (data == 1) {
        var self = this;
        let cotId = this.cotizacionId;
        this.$store
          .dispatch("getCotizacionDetalleBygctId", this.gctIdQuote)
          .then((payload) => {
            self.rowBookingSlotsRequests = payload.data;
            self.rowBookingSlots = self.rowBookingSlotsRequests
              .filter((p) => p.cotId == cotId)
              .map((a) => a.cotizacionDetalle);
          });
      }
    },
    // ----------- Fin Actualizo QuoteAdmin desde cualquier hijo -----------
    updateCart(e) {
      var self = this;
      this.$store
        .dispatch("getCotizacionDetalleBygctId", this.gctIdQuote)
        .then((payload) => {
          self.rowBookingSlotsRequests = payload.data;
        });
    },
    openModalExtraDiscount(id) {
      this.bookId = id;
    },
    openModalExtendTimeLimit(id, ta) {
      this.booktimelimitid = id;
      this.booktimelimitactual = ta;
    },
    cancelQuote(cotid, bokid) {
      this.cotizacionId = cotid;
      this.bookingid = bokid;
      if (confirm("Do you really want to cancel this quote?")) {
        CotizacionesServices.cancelquote(this.cotizacionId, this.bookingid)
          .then((response) => {
            let mensaje = response.data.data;
            // console.log(response.data.data);

            if (mensaje == "OK") {
              var type = "success filled";
              var title = "Deleted";
              var message = "Service deleted";
              {
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false,
                });
              }
              this.getCotizacionDetalleBygctId();
              // console.log("porcentaje lleno");
            }
            if (mensaje == "Error") {
              var type = "warning";
              var title = "Error";
              var message = "Is not a service";
              {
                this.$notify(type, title, message, {
                  duration: 3000,
                  permanent: false,
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    changestatusdestroy(coti) {
      this.routesnodestroy = false;
      //console.log(this.routesnodestroy+'boton accionado');
      this.$router.push({ name: "quotepreviewpdf", params: { cotid: coti } });
    },
    changestatusdestroyanyview() {
      this.routesnodestroy = false;
    },
    openModalNoteQuote(id, nota, pax, concepto, pu, cut) {
      this.codId = id;
      this.codnota = nota;
      this.codpax = pax;
      this.codconcepto = concepto;
      this.codpreciounitario = pu;
      this.codcostunitariototal = cut;
    },
    hideModal(refname) {
      this.$refs[refname].hide();
      if (refname === "modalnestedinline") {
        this.$refs["modalnested"].show();
      }
    },
    somethingModal(refname) {
      this.$refs[refname].hide();
      if (refname === "modalnestedinline") {
        this.$refs["modalnested"].show();
      }
    },

    getCotizacionDetalleBygctId() {
      var self = this;
      // console.log("reqId: " + this.gctIdQuote);
      this.$store
        .dispatch("getCotizacionDetalleBygctId", this.gctIdQuote)
        .then((payload) => {
          self.rowBookingSlotsRequests = payload.data;
        });
    },
    getBookingSlots(cotId) {
      this.cotizacionId = cotId;
      this.rowBookingSlots = this.rowBookingSlotsRequests
        .filter((p) => p.cotId == cotId)
        .map((a) => a.cotizacionDetalle);

      this.getChildPaxByCotId();
    },
    calcularSubTotales() {
      // Inicializar la variable para recorrer el arreglo y obtener valores finales
      this.subTotalQuote = this.rowBookingSlots.reduce(function (
        acumulador,
        valor
      ) {
        return acumulador + parseFloat(valor.totalPP);
      },
      0);
      this.subTotalChildrenDiscount =
        this.subTotalQuote - this.childrenDiscount;
      this.valorIVA = this.slotsTotales.reduce(function (
        acumulador,
        valorActual
      ) {
        let localValorIVA;
        if (valorActual.bosValorIva == null) localValorIVA = 0;
        else localValorIVA = parseFloat(valorActual.bosValorIva);
        return acumulador + localValorIVA;
      },
      0);
      //this.totalGeneral = this.subTotalQuote-this.totalDiscount+this.valorIVA
      this.totalGeneral = this.subTotalChildrenDiscount + this.valorIVA;
    },
    goToAvailability() {
      //FS: variable para validar que no ejecute la función endRequest()
      this.isModeEndRequest = false;

      var cliId = this.rowBookingSlotsRequests
        .slice(0, 1)
        .map((a) => a.bokClientId);
      if (cliId) {
        this.$store.commit("setRequestCliId", cliId);
        // ===========> OJO: Al momento de confirmar un booking, se debe limpiar el requestCliId <==========================
        this.$router.push({
          name: "availabilitydistribution",
        });
      }
    },
    // Envio de correo:
    sendMailQuotes(rowBookingSlots) {
      console.log("Enviando correo");
      let data = this.buildMailArray(rowBookingSlots);

      var self = this;
      // this.$store.dispatch('sendQuotes', rowBookingSlots).then((payload) => {
      this.$store.dispatch("sendQuotes", data).then((payload) => {
        var response = payload.data;
        if (response == 200) {
          var type = "success filled";
          var title = "Success";
          var mensaje = "Quote sended by mail successfully";
          this.$notify(type, title, mensaje, {
            duration: 3000,
            permanent: false,
          });
          //this.$router.push({ name: 'availabilitydistribution' });
          // this.$router.push({ name: 'quoteadmin', params: {
          //   reqId: reqId,
          //   header: this.header
          // } })
        } else {
          var type = "error filled";
          var title = "Error";
          var mensaje = "Mail not sended. Try again";
          this.$notify(type, title, mensaje, {
            duration: 3000,
            permanent: false,
          });
        }
      });
    },
    buildMailArray(rowBookingSlots) {
      let data = [];
      let rowDetails = this.rowBookingSlots;
      let rowClientAndUserInfo = this.headerQuote;
      let bookdata = this.rowBookingSlotsRequests.filter(
        (p) => p.cotId == this.cotizacionId
      );
      data.push(rowClientAndUserInfo, rowDetails, bookdata[0]);
      return data;
    },

    confirmRequest(gctId) {
      BookingRequestSummary.confirmQuote(gctId, this.cotizacionId)
        .then((response) => {
          let datos_summary = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.dispatch("updateStatusQuote", gctId).then((payload) => {
        var response = payload.data.reqStatus;
        if (response == 0) {
          /*     var type = "success filled";
            var title = "Success";
            var mensaje = "Quote Status updated successfully";
            this.$notify(type, title, mensaje, {
              duration: 3000,
              permanent: false,
            }); */

          this.$store.commit("cleanRequestCliId");
        } else {
          var type = "error filled";
          var title = "Error";
          var mensaje = "Mail not sended. Try again";
          this.$notify(type, title, mensaje, {
            duration: 3000,
            permanent: false,
          });
        }
      });
    },
    endRequest(gctId) {
      this.$store.dispatch("updateStatusQuote", gctId).then((payload) => {
        var response = payload.data.reqStatus;
        if (response == 0) {
          this.$store.commit("cleanRequestCliId");
          this.$router.push({
            name: "availabilitydistribution",
          });
        } else {
          var type = "error filled";
          var title = "Error";
          var mensaje = "Mail not sended. Try again";
          this.$notify(type, title, mensaje, {
            duration: 3000,
            permanent: false,
          });
        }
      });
    },

    GenerateCode(codigoelegido) {
      if (this.numerocodigos > 1) {
        let codigoele = codigoelegido;
        this.$refs.modalcodigos.show();
        this.empresa = this.listacodigos[0]["empresa_id"];
        /*    console.log("ID ELEGIDO SUPERIOR A UNO" + codigoele);
          console.log("EMPRESA SUPERIOR A UNO" + this.empresa);
          console.log("TIPO == CERO" + this.tipomodulo);
          console.log("TIPO == CERO" + this.periodo); */
        let data = {
          tipo: this.tipomodulo,
          cliente: this.empresa,
          codigo: codigoele,
          periodo: this.rowBookingSlots[0][0].periodo,
        };

        //PRIMERO GENERAMOS UN CODIGO
        AutonumericoServices.getSecuencialConfirmacion(data).then(
          (response) => {
            let respuestaautonumerico = response.data.data;
            if (respuestaautonumerico) {
              //AQUI CONVERTIMOS A CONFIRMACION LA COTIZACION
              ConfirmacionServices.InsertConfirmationsfromQuote(
                this.cotizacionId,
                this.vendedor,
                respuestaautonumerico
              )
                .then((response) => {
                  let mensaje = response.data.data;
                  console.log(mensaje);
                  if (mensaje > 0) {
                    var type = "success filled";
                    var title = "Confirmation Created";
                    var message = "Service deleted";
                    {
                      this.$notify(type, title, message, {
                        duration: 3000,
                        permanent: false,
                      });
                    }
                    //INGRESAMOS PASAJEROS
                    this.confirmRequest(this.gctIdQuote);
                    //FIN INGRESO PASAJEROS
                    this.$router.push({
                      name: "confirmationparent",
                      params: {
                        cofId: mensaje,
                      },
                    });
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
              //FIN CONVERSION A CONFIRMACION LA COTIZACION
            }
          }
        );
        //FIN GENERACION CODIGO GENERAMOS UN CODIGO
      }
    },
    UpdateCotizacionesDetailExtraDiscount(id) {
      let booking_id = id;
      BookingServices.UpdateCotizacionesDetailExtraDiscount(booking_id)
        .then((response) => {
          let mensaje = response.data.data;

          if (mensaje == "OK") {
            location.reload();
          }
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
      // console.log(this.rowdataslots);
    },
    convertConfirmation() {
      /*   OPCION 1    SI EL NUMERO DE CODIGOS  == 0 NO SE PUEDE CONFIRMAR  */
      if (this.numerocodigos == 0) {
        var type = "info";
        var title = "Imposible create Confirmation";
        var message = "No Codes";
        {
          this.$notify(type, title, message, {
            duration: 3000,
            permanent: false,
          });
        }
      }
      /*   FIN OPCION 1  */
      /*   OPCION 2    SI EL NUMERO DE CODIGOS  == 1 SE PUEDE CONFIRMAR CON EL CODIGO QUE VIENE POR API */
      if (this.numerocodigos == 1) {
        this.codeclient = this.listacodigos[0]["id"];
        this.empresa = this.listacodigos[0]["empresa_id"];

        let data = {
          tipo: this.tipomodulo,
          cliente: this.empresa,
          codigo: this.codeclient,
          periodo: this.rowBookingSlots[0][0].periodo,
        };

        // GENERAMOS UN CODIGO
        AutonumericoServices.getSecuencialConfirmacion(data).then(
          (response) => {
            let respuestaautonumerico = response.data.data;
            if (respuestaautonumerico) {
              // CONVERTIMOS A CONFIRMACION LA COTIZACION
              ConfirmacionServices.InsertConfirmationsfromQuote(
                this.cotizacionId,
                this.vendedor,
                respuestaautonumerico
              )
                .then((response) => {
                  let mensaje = response.data.data;
                  console.log(mensaje);
                  if (mensaje > 0) {
                    var type = "success filled";
                    var title = "Confirmation";
                    var message = "Created";
                    {
                      this.$notify(type, title, message, {
                        duration: 3000,
                        permanent: false,
                      });
                    }
                    //INGRESAMOS PASAJEROS
                    this.confirmRequest(this.gctIdQuote);
                    //FIN INGRESO PASAJEROS
                    this.$router.push({
                      name: "confirmationparent",
                      params: {
                        cofId: mensaje,
                      },
                    });
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        );
        /* FIN GENERACION DE UN CODIGO
         */
      }
      /*   FIN OPCION 2  */

      /*  OPCION 3     SI EL NUMERO DE CODIGOS  > SE PUEDE CONFIRMAR ELIGIENDO EL CODIGO ABRIENDO EL MODAL*/
      if (this.numerocodigos > 1) {
        /*         this.$refs.modalchildrenpax.show();
        if(this.createChildrenPax())
 */
        this.$refs.modalcodigos.show();
      }
      /* FIN  OPCION 3*/
    },
    getCodesofClient() {
      ConfirmacionServices.getCodesofClient(this.gctIdQuote)
        .then((response) => {
          this.listacodigos = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
      /* 
          FIN ENVIAR COTIZACION PARA INGRESO EN CONFIRMACIONES */
    },
    getNumberofCodesofClient() {
      ConfirmacionServices.getNumberofCodesofClient(this.gctIdQuote)
        .then((response) => {
          this.numerocodigos = response.data.data;
          //  console.log("Numero de codigos"+this.numerocodigos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // ----------------------------------------------------------------------------------------------------------------
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },

    dataProvider(ctx) {
      const params = this.apiParamsConverter(ctx);
      let promise = axios.get(apiUrl + "/cakes/fordatatable", {
        params: params,
      });
      return promise
        .then((result) => result.data)
        .then((data) => {
          this.currentPage = data.current_page;
          this.perPage = data.per_page;
          this.totalRows = data.total;
          const items = data.data;
          return items;
        })
        .catch((_error) => {
          return [];
        });
    },
    apiParamsConverter(params) {
      let apiParams = {};
      if (params.perPage !== 0) {
        apiParams.per_page = params.perPage;
      }
      if (params.currentPage >= 1) {
        apiParams.page = params.currentPage;
      }
      if (params.sortBy && params.sortBy.length > 0) {
        apiParams.sort = `${params.sortBy}|${params.sortDesc ? "desc" : "asc"}`;
      }
      if (params.filter && params.filter.length > 0) {
        // Optional
      }
      return apiParams;
    },
    checkInitialVariablesFromStorage() {
      //props: ["reqId", "header"],
      if (!this.gctId) {
        this.gctIdQuote = sessionStorage.getItem("quoteAdminGctId");
      } else {
        sessionStorage.setItem("quoteAdminGctId", this.gctId); // (*)
        this.gctIdQuote = this.gctId;
      }
      if (!this.header) {
        this.headerQuote = JSON.parse(
          sessionStorage.getItem("quoteAdminHeader")
        );
      } else {
        sessionStorage.setItem("quoteAdminHeader", JSON.stringify(this.header)); // (*)
        this.headerQuote = this.header;
      }
    },
    formatEstadoCotizacion(status) {
      switch (status) {
        case 1:
          return "Active";
        case 2:
          return "Inactive";
        case 3:
          return "Confirmed";
        case 4:
          return "Cancelled";
        default:
          return "No defined";
      }
    },
    goToEditBooking(bokId) {
      if (bokId) {
        this.$store.dispatch("getAllDataBoking", bokId).then((payload) => {
          var header = payload.data.bookingData;
          var slots = payload.data.slots;
          // if(payload.data != 500){
          if (header && slots.length > 0) {
            var arrayUpdate = [];
            arrayUpdate.push(payload.data);
            // Array 1: arrayUpdate.bookingData
            // Array 2: arrayUpdate.slots
            this.$store.commit("setArrayUpdate", arrayUpdate);
            sessionStorage.setItem(
              "setArrayUpdate",
              JSON.stringify(arrayUpdate)
            );
            this.$router.push({
              name: "SlotsParentEdit",
              params: {
                bokId: bokId,
                arrayUpdate: arrayUpdate,
              },
            });
            console.log("INICIO: " + JSON.stringify(arrayUpdate));
          } else {
            var type = "error filled";
            var title = "Error";
            var mensaje = "No Data Loaded. Please refresh page";
            this.$notify(type, title, mensaje, {
              duration: 3000,
              permanent: false,
            });
          }
        });
      }
    },
    goToEditUpdateTimeLimit(bokId) {
      CotizacionDetalleServices.addnotedetailquote(data)
        .then((response) => {
          let mensaje = response.data.data;
          if (mensaje == "OK") {
            var type = "success filled";
            var title = "Time Limit";
            var message = "Update";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });

            /*       this.$emit('updateQuoteAdmin', 1); */
          } else {
            var title = "Time Limit";
            var message = "FAIL UPDATE";
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
    setDefaultTab() {
      if (this.headerQuote.headerCompany.cotId) {
        this.getBookingSlots(this.headerQuote.headerCompany.cotId);
      } else {
        let cotId = this.rowBookingSlotsRequests
          .slice(-1)
          .map((a) => a.cotId)
          .pop();
        this.getBookingSlots(cotId);
      }
    },
  },
  created() {
    this.checkInitialVariablesFromStorage();
  },
  mounted() {
    this.getNumberofCodesofClient();
    this.getCotizacionDetalleBygctId();
    setTimeout(() => this.setDefaultTab(), 2050);
    this.getCodesofClient();
  },

  //FS 05/04/2021: Se da funcionalidad a endRequest(this.gctId) que tenia el evento clic del botón "Request Finish"

  // beforeRouteLeave(to, from, next) {
  //   console.log("Ruta actual==> " + this.$route.name);
  //   console.log("ruta actual 2==> " + this.$router.history.current.path);
  //   console.log("ruta actual 3==> " + window.location.href);
  // },

  /*  beforeDestroy() {
  console.log(this.routesnodestroy+' Status routesnodestroy QA ');
  console.log(this.isModeEndRequest+' Status isModeEndRequest QA' );
  console.log(this.gctIdQuote+' grupo cotizacion QA' );
  
  if (this.isModeEndRequest && this.routesnodestroy) this.endRequest(this.gctIdQuote);
 },  */
};
</script>
