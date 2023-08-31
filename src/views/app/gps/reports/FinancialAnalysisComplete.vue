<template>
  <div>
    <b-row v-if="summaryViewActive">
      <b-col>
        <b-card>
          <b-card-title>Financial Analysis <!-- {{year}}  -->
          
           {{
                      moment(year, "YYYY").format("y")
                    }}
          
          </b-card-title>

          <b-row>
            <b-col>
         <!--      <b-form-group label="Type report">
                <b-form-radio-group
                  id="btn-radios-2"
                  v-model="typeReport"
                  :options="options"
                  button-variant="outline-primary"
                  name="radio-btn-outline"
                  buttons
                  @change="updateData"
                ></b-form-radio-group>
              </b-form-group> -->
              <!--      <b-form-group label="Type report">
      <b-form-radio v-model="typeReport"  name="some-radios"  value="1">Monthly</b-form-radio>

      <b-form-radio v-if="filters.cruises.length  == 0 || filters.cruises.length >1 " v-model="typeReport" disabled name="some-radios" value="2">Departure</b-form-radio>
      <b-form-radio v-else v-model="typeReport"  name="some-radios" value="2">Departure</b-form-radio>
  
  </b-form-group> 
 -->
       <label for="input-year"  style="font-weight: normal">Type report</label> <br>
<div class="btn-group" data-toggle="buttons" >
      <label  class="btn btn-primary">
        <input  v-model="typeReport"   type="radio" value="1" name="options" id="option1" checked> Monthly
      </label>
      <label v-if="filters.cruises.length  == 0 || filters.cruises.length >1 " class="btn btn-primary">
            <input  v-model="typeReport"   type="radio" value="2" disabled name="options" id="option1"> Departure
      </label>
        <label v-else class="btn btn-primary">
            <input  v-model="typeReport"   type="radio" value="2" name="options" id="option1"> Departure
      </label>
    
</div>

            </b-col>
<!-- {{validateOptions}} -->
            <template>
              <b-col>
                <label for="input-year" style="font-weight: normal">Year</label>
          <br />

                <date-picker
                  id="input-year"
                  v-model="year"
                  type="year"
                  placeholder="Select year"
                  :clearable="false"
                  style="width: 100px"
                >
                </date-picker>
              </b-col>
            </template>

            <b-col v-if="typeReport == 2">
              <b-form-group label="Itinerary Type">
           <!--      <b-form-checkbox-group
                id="checkbox-group-1"
                  v-model="typeReportItinerary"
                  :options="optionsitinerary"
                   name="flavour-1"
                  size="xs"
                  stacked
                ></b-form-checkbox-group> -->
                    <b-form-checkbox-group
      v-model="typeReportItinerary"
      :options="optionsitinerary"
      class="mb-3"
      value-field="value"
      text-field="text"
    ></b-form-checkbox-group>
              </b-form-group>
<!-- {{typeReportItinerary}} -->
            <!--   {{this.typeReportItinerary.length}} -->
            </b-col>

            <b-col v-if="typeReport == 1">
              <label for="select-client" style="font-weight: normal"
                >Cruises</label
              ><br />

              <v-select
                id="select-cruises"
                label="cruName"
                multiple
                :options="getCruises"
                :reduce="(cruId) => cruId.cruId"
                v-model="filters.cruises"
                clearable
              >
              </v-select>
            </b-col>
            <b-col v-if="typeReport == 2">
              <label for="select-client" style="font-weight: normal"
                >Cruises</label
              ><br />

              <v-select
                id="select-cruises"
                label="cruName"
                :options="getCruises"
                :reduce="(cruId) => cruId.cruId"
                v-model="filters.cruises"
                clearable
              >
              </v-select>
            </b-col>
          </b-row>
      
          <b-row >
<!-- {{typeReport}} -->
<!-- {{getData.length>0}} -->
          <b-col v-if="typeReport == 1 && getData.length>0 ">
              <template v-if="isLoading">
                <div>Cargando...</div>
              </template>

              <template v-else>
                <b-table
                  :items="getData"
                  :fields="fields"
                  :select-mode="selectMode"
                  responsive="sm"
                  ref="selectableTable"
                  selectable
                  small
                  @row-selected="onRowSelected"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                >
                  <template #cell(month)="row">
                    <span>
               <strong>   {{ row.item.mes_nombre }} - {{ row.item.year }} </strong>    
                    </span>
                  </template>

                  <template #cell(costo)="row">
                    <span v-if="row.item.costo">
                      {{ row.item.costo | currency }}</span
                    >
                    <span v-else> 0</span>
                  </template>
                  <template #cell(venta)="row">
                    <span v-if="row.item.venta">
                      {{ row.item.venta | currency }}</span
                    >
                    <span v-else> 0</span>
                  </template>
                  <template #cell(percent)="row">
                    <span v-if="row.item.percent > 0" style="color: green">
                      {{ row.item.percent }}%</span
                    >
                    <span v-if="row.item.percent < 0" style="color: red">
                      {{ row.item.percent }}%</span
                    >
                    <span v-if="row.item.percent == 0">
                      {{ row.item.percent }}%</span
                    >
                    <span v-if="row.item.percent == null"> $0</span>
                  </template>
                  <template #cell(profit)="row">
                    <span v-if="row.item.profit > 0" style="color: green">
                      {{ row.item.profit | currency }}</span
                    >
                    <span v-if="row.item.profit < 0" style="color: red">
                      {{ row.item.profit | currency }}</span
                    >
                    <span v-if="row.item.profit == 0">
                      {{ row.item.profit | currency }}</span
                    >
                    <span v-if="row.item.profit == null"> $0</span>
                  </template>
                  <template slot="bottom-row" slot-scope="data">
                    <td class="text-left" style="background: antiquewhite">
                      <template v-if="selectedRows && selectedRows.length">
                        <br />
                        <span class="text-muted">
                          <strong>SELECTED</strong>
                        </span>
                      </template>
                    </td>
                    <td class="text-left" style="background: antiquewhite">
                      <span>
                        <strong> {{ getTotalCostoMonth | currency }} </strong
                        ><!--  {{selectedRows}} -->
                        <template v-if="selectedRows && selectedRows.length">
                          <br />
                          <span class="text-muted">
                            <strong>{{ totalCostoSelected | currency }}</strong>
                          </span>
                        </template>
                      </span>
                    </td>
                    <td class="text-left" style="background: antiquewhite">
                      <span>
                        <strong>
                          {{ getTotalVentaMonth | currency }}
                        </strong>
                        <template v-if="selectedRows && selectedRows.length">
                          <br />
                          <span class="text-muted">
                            <strong>{{ totalVentaSelected | currency }}</strong>
                          </span>
                        </template>
                      </span>
                    </td>
                    <td class="text-left" style="background: antiquewhite">
                      <span>
                        <strong>
                          {{ getTotalProfitMonth | currency }}
                        </strong>
                        <template v-if="selectedRows && selectedRows.length">
                          <br />
                          <span class="text-muted">
                            <strong>{{
                              totalProfitSelected | currency
                            }}</strong>
                          </span>
                        </template>
                      </span>
                    </td>
                    <td class="text-left" style="background: antiquewhite">
                      <span>
                        <strong> {{ getTotalPercentMonth }} % </strong>
                        <template v-if="selectedRows && selectedRows.length">
                          <br />
                          <span class="text-muted">
                            <strong>{{ totalPercentSelected }}%</strong>
                          </span>
                        </template>
                      </span>
                    </td>
                  </template>
                </b-table>
              </template>
            </b-col>
            <b-col v-if="typeReport == 1  && getData.length == 0">
                  <b-card            
                                        class="mt-4"
                                        no-body
                                    >

                                        <b-card-body class="text-center">

                                        
                                        <b-img 
                                            src="/assets/img/atc/empty-state/no_result_found.png" 
                                            fluid 
                                            alt="No result found"   
                                            width="400"             
                                        />
                                        
                                        
                                        <b-card-title><h1><strong>No results found</strong></h1></b-card-title>

                                        <b-card-text>
                                            Try adjusting you search options to find what you're looking for
                                        </b-card-text>

                                        
                                        </b-card-body>          
                                        
                                        

                                    </b-card>                            

              </b-col>



            <b-col v-if="typeReport == 2  && getDataDepartures.length>0" >
              <template>
                <b-table
                  :items="getDataDepartures"
                  :fields="fieldsdepartures"
                  :select-mode="selectMode"
                  responsive="sm"
                  ref="selectableTable"
                  selectable
                  @row-selected="onRowSelectedDepartures"
                  small
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                >
                  <template #cell(departures)="row">
                    <div>
                      <strong> 
                      <span>
                        {{
                          moment(row.item.depStartDate).format("DD MMM YYYY ")
                        }}-
                        {{ moment(row.item.depEndDate).format("DD MMM YYYY ") }}

                      </span>
                      </strong>
                    </div>
                  </template>
  <template #cell(code)="row">
                    <span> {{ row.item.code }}</span>
                  </template>
                  <template #cell(itiNights)="row">
                    <span> {{ row.item.itiNights }}</span>
                  </template>
                  <template #cell(depCost)="row">
                    <span> {{ row.item.depCost | currency }}</span>
                  </template>
                  <template #cell(ocupacion)="row">
                    <span> {{ row.item.ocupacion }}%</span>
                  </template>
                  <template #cell(allotment)="row">
                    <span> {{ row.item.allotment }}%</span>
                  </template>
                  <template #cell(venta)="row">
                    <span> {{ row.item.venta | currency }}</span>
                  </template>

                  <template #cell(pppppn)="row">
                    <span> {{ row.item.pppppn }}</span>
                  </template>
                  <template #cell(grossmargin)="row">
                    <span v-if="row.item.grossmargin > 0" style="color: green">
                      {{ row.item.grossmargin }}</span
                    >
                    <span v-if="row.item.grossmargin < 0" style="color: red">
                      {{ row.item.grossmargin }}</span
                    >
                    <span v-if="row.item.grossmargin == 0">
                      {{ row.item.grossmargin }}</span
                    >
                  </template>

                  <template slot="bottom-row" slot-scope="data">
                    <td class="text-left" style="background: antiquewhite">
                 <template v-if="selectedRowsDepartures && selectedRowsDepartures.length">
                        <br />
                        <span class="text-muted">
                          <strong>SELECTED</strong>
                        </span>
                      </template>
                    </td>
                         <td class="text-left" style="background: antiquewhite">
                
                    </td>
                    <td class="text-left" style="background: antiquewhite">
                      <span>
                        <strong>
                          {{ getTotalNightsDepartures }}
                        </strong>
                        <template
                          v-if="
                            selectedRowsDepartures &&
                            selectedRowsDepartures.length
                          "
                        >
                          <br />
                          <span class="text-muted">
                            <strong>{{ totalNightsSelectedDepartures }}</strong>
                          </span>
                        </template>
                      </span>
                    </td>
                    <td class="text-left" style="background: antiquewhite">
                      <span>
                        <strong>
                          {{ getTotalCostoDepartures | currency }}
                        </strong>
                        <template
                          v-if="
                            selectedRowsDepartures &&
                            selectedRowsDepartures.length
                          "
                        >
                          <br />
                          <span class="text-muted">
                            <strong>{{
                              totalCostoSelectedDepartures | currency
                            }}</strong>
                          </span>
                        </template>
                      </span>
                    </td>
                    <td class="text-left" style="background: antiquewhite">
                      <span>
                        <strong> {{ getTotalOcupancyDepartures }}% </strong>
                        <template
                          v-if="
                            selectedRowsDepartures &&
                            selectedRowsDepartures.length
                          "
                        >
                          <br />
                          <span class="text-muted">
                            <strong
                              >{{ totalOcupancySelectedDepartures }}%</strong
                            >
                          </span>
                        </template>
                      </span>
                    </td>
                    <td class="text-left" style="background: antiquewhite">
                      <span>
                        <strong> {{ getTotalAllotmentDepartures }}% </strong>
                        <template
                          v-if="
                            selectedRowsDepartures &&
                            selectedRowsDepartures.length
                          "
                        >
                          <br />
                          <span class="text-muted">
                            <strong
                              >{{ totalAllotmentSelectedDepartures }}%</strong
                            >
                          </span>
                        </template>
                      </span>
                    </td>
                    <td class="text-left" style="background: antiquewhite">
                      <span>
                        <strong>
                          {{ getTotalVentaDepartures | currency }}
                        </strong>
                        <template
                          v-if="
                            selectedRowsDepartures &&
                            selectedRowsDepartures.length
                          "
                        >
                          <br />
                          <span class="text-muted">
                            <strong>{{
                              totalVentaSelectedDepartures | currency
                            }}</strong>
                          </span>
                        </template>
                      </span>
                    </td>
                    <td class="text-left" style="background: antiquewhite">
                      <span>
                        <strong>
                          {{ getTotalPPPPPNDepartures | currency }}
                        </strong>
                        <template
                          v-if="
                            selectedRowsDepartures &&
                            selectedRowsDepartures.length
                          "
                        >
                          <br />
                          <span class="text-muted">
                            <strong>{{
                              totalPPPPPNSelectedDepartures | currency
                            }}</strong>
                          </span>
                        </template>
                      </span>
                    </td>
                    <td class="text-left" style="background: antiquewhite">
                      <span>
                        <strong>
                          {{ getTotalGrossMargin | currency }}
                        </strong>
                        <template
                          v-if="
                            selectedRowsDepartures &&
                            selectedRowsDepartures.length
                          "
                        >
                          <br />
                          <span class="text-muted">
                            <strong>{{
                              totalGrossMarginSelectedDepartures | currency
                            }}</strong>
                          </span>
                        </template>
                      </span>
                    </td>
                  </template>
                </b-table>
              </template>
            </b-col>
             <b-col v-if="typeReport == 2  && getDataDepartures.length == 0">
                  <b-card            
                                        class="mt-4"
                                        no-body
                                    >

                                        <b-card-body class="text-center">

                                        
                                        <b-img 
                                            src="/assets/img/atc/empty-state/no_result_found.png" 
                                            fluid 
                                            alt="No result found"   
                                            width="400"             
                                        />
                                        
                                        
                                        <b-card-title><h1><strong>No results found</strong></h1></b-card-title>

                                        <b-card-text>
                                            Try adjusting you search options to find what you're looking for
                                        </b-card-text>

                                        
                                        </b-card-body>          
                                        
                                        

                                    </b-card>                            

              </b-col>
            
          </b-row>








        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import DateRangePicker from "vue2-daterange-picker";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { getSum } from "./utils";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import moment from "moment";

import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "SalesbyTravel",

  components: {
    DatePicker,
    "v-select": vSelect,
    DateRangePicker,
  },

  data() {
    return {
      filters: {
        year: null,
        month: "0",
        country: null,
        cruises: [],
        selectcruise:""
      },
      typeReportItinerary: [1],

      typeReport: "1", // 1 fecha de venta, 2 fecha de viaje
      options: [{ text: "Monthly", value: "1" }],
      optionsitinerary: [
        { text: "Simple", value: "1" },
        { text: "Combined", value: "2" },
      ],

      isLoading: false,
      sortBy: "age",
      sortDesc: false,
      // seccion para filtro de fecha
      year: null,
      dateRange: {
        startDate: new Date(),
        endDate: new Date(),
      },
      locale: {
        separator: " - ",
        format: "dd mmm yyyy",
      },
      isModeYear: true,
     

      params: {
        inicio: null,
        fin: null,
      },

      summary: [],

      fields: [
        { key: "month", label: "MONTH", thClass: "text-left" },
        /*  { key: "itiNights", label: "OP. DAYS", thClass: "text-left" }, */
        {
          key: "costo",
          label: "OP. COST",
          thClass: "text-left",
          sortable: true,
        },
        /*       {
          key: "cofInicio",
          label: "OCCUPANCY",
            thClass: "text-left",
          sortable: true,
        },
        {
          key: "cofFinal",
          label: "ALLOTMENT",
            thClass: "text-left",
          sortable: true,
        }, */
        {
          key: "venta",
          label: "CRUISE REVENUE",
          thClass: "text-left",
          sortable: true,
        },
        /*         {
          key: "mes",
          label: "TOTAL IVA",
           thClass: "text-left",
          sortable: true,
        }, */

        {
          key: "profit",
          label: "PROFIT/LOSS",
          thClass: "text-left",
          sortable: true,
        },
        {
          key: "percent",
          label: "%",
          thClass: "text-left",
          sortable: true,
        },
      ],
      fieldsdepartures: [
        { key: "departures", label: "DEPARTURE", thClass: "text-left" },
        { key: "itiCode", label: "CODE", thClass: "text-left" },
     
     { key: "itiNights", label: "OP. DAYS", thClass: "text-left" },
        {
          key: "depCost",
          label: "OP. COST",
          thClass: "text-left",
          sortable: true,
        },
        {
          key: "ocupacion",
          label: "OCCUPANCY",
          thClass: "text-left",
          sortable: true,
        },
        {
          key: "allotment",
          label: "ALLOTMENT",
          thClass: "text-left",
          sortable: true,
        },
        {
          key: "venta",
          label: "TOTAL REVENUE",
          thClass: "text-left",
          sortable: true,
        },
        /*    {
          key: "mes",
          label: "TOTAL IVA",
          tdClass: "text-right",
          thClass: "text-right",
          sortable: true,
        }, */
        {
          key: "pppppn",
          label: "PPPPPN",
          thClass: "text-left",
          sortable: true,
        },
        {
          key: "grossmargin",
          label: "PROFIT/LOSS",
          thClass: "text-left",
          sortable: true,
        },
      ],

      selectMode: "multi",
      selectedRows: [],
      selectedRowsDepartures: [],

      totals: {
        ventas: 0,
      },

      selectedTotals: {
        ventas: 0,
      },

      detailsData: [],
    };
  },

  computed: {
    // detectar cambios en los registros seleccionados para procesar los totales

    getTotalVentaMonth() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.getData.map((item) => Number(item.venta)).reduce(sumar, 0);
    },
    getTotalCostoMonth() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.getData.map((item) => Number(item.costo)).reduce(sumar, 0);
    },
    getTotalProfitMonth() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.getData.map((item) => Number(item.profit)).reduce(sumar, 0);
    },
    getTotalPercentMonth() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.getData.map((item) => Number(item.percent)).reduce(sumar, 0);
    },

    getTotalCostoDepartures() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.getDataDepartures
        .map((item) => Number(item.depCost))
        .reduce(sumar, 0);
    },
    getTotalNightsDepartures() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.getDataDepartures
        .map((item) => Number(item.itiNights))
        .reduce(sumar, 0);
    },
    getTotalOcupancyDepartures() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.getDataDepartures
        .map((item) => Number(item.ocupacion))
        .reduce(sumar, 0);
    },
    getTotalAllotmentDepartures() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.getDataDepartures
        .map((item) => Number(item.allotment))
        .reduce(sumar, 0);
    },
    getTotalVentaDepartures() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.getDataDepartures
        .map((item) => Number(item.venta))
        .reduce(sumar, 0);
    },
    getTotalPPPPPNDepartures() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.getDataDepartures
        .map((item) => Number(item.pppppn))
        .reduce(sumar, 0);
    },
    getTotalGrossMargin() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.getDataDepartures
        .map((item) => Number(item.grossmargin))
        .reduce(sumar, 0);
    },

    totalVentaSelected() {
      return this.selectedRows.reduce(
        (acc, item) => acc + parseFloat(item.venta),
        0
      );
    },

    totalCostoSelected() {
      return this.selectedRows.reduce(
        (acc, item) => acc + parseFloat(item.costo),
        0
      );
    },
    totalPercentSelected() {
      return this.selectedRows.reduce(
        (acc, item) => acc + parseFloat(item.percent),
        0
      );
    },
    totalProfitSelected() {
      return this.selectedRows.reduce(
        (acc, item) => acc + parseFloat(item.profit),
        0
      );
    },
    totalNightsSelectedDepartures() {
      return this.selectedRowsDepartures.reduce(
        (acc, item) => acc + parseFloat(item.itiNights),
        0
      );
    },
    totalCostoSelectedDepartures() {
      return this.selectedRowsDepartures.reduce(
        (acc, item) => acc + parseFloat(item.depCost),
        0
      );
    },
    totalOcupancySelectedDepartures() {
      return this.selectedRowsDepartures.reduce(
        (acc, item) => acc + parseFloat(item.ocupacion),
        0
      );
    },
    totalAllotmentSelectedDepartures() {
      return this.selectedRowsDepartures.reduce(
        (acc, item) => acc + parseFloat(item.allotment),
        0
      );
    },
    totalVentaSelectedDepartures() {
      return this.selectedRowsDepartures.reduce(
        (acc, item) => acc + parseFloat(item.venta),
        0
      );
    },
    totalPPPPPNSelectedDepartures() {
      return this.selectedRowsDepartures.reduce(
        (acc, item) => acc + parseFloat(item.pppppn),
        0
      );
    },

    totalGrossMarginSelectedDepartures() {
      return this.selectedRowsDepartures.reduce(
        (acc, item) => acc + parseFloat(item.grossmargin),
        0
      );
    },

    ...mapState("financial-analysis", ["summaryViewActive"]),
    ...mapGetters("financial-analysis", [
      "getData",
      "getCruises",
      "getDataDepartures",
    ]),

    minDateYear() {
      return moment(this.year).startOf("year").format("L");
    },


    maxDateYear() {
      return moment(this.year).endOf("year").format("L");
    },

    showRanges() {
      //return moment().format('Y') == this.dateRange.startDate.format('Y')
      return false;
    },
/*     validateOptions() {
      console.log('typeReportItinerary'+this.typeReportItinerary.length)
        if(this.typeReportItinerary.length == 0){
          this.typeReportItinerary = [1]

        }
    }, */
  },

  watch: {

    typeReportItinerary: function (newYear, oldYear) {
     
     if(this.typeReportItinerary.length > 0){
     
     this.updateData();
     
        }
            if(this.typeReportItinerary.length == 0){
  this.typeReportItinerary=['1']
            }
        
    },
    year: function (newYear, oldYear) {
      //sincronizar date range
      const startDateOfTheYear = moment(newYear).startOf("year");
      const endDateOfTheYear = moment(newYear).endOf("year");

      this.dateRange.startDate = startDateOfTheYear;
      this.dateRange.endDate = endDateOfTheYear;

      // reload data
      this.updateData();
    },
    "filters.cruises": function (newCountry, oldCountry) {
      this.updateData();
  
    },
    typeReport:function(newType, oldType){
       if (this.typeReport == 1) this.loadReportDataMonth()
      if (this.typeReport == 2) this.loadReportDataDeparture()
       
    }
  },

  methods: {
    ...mapActions("financial-analysis", ["loadData", "loadDataDepartures"]),
    ...mapMutations("financial-analysis", ["setSummaryViewActive"]),
    onRowSelected(items) {
      this.selectedRows = items;
    },
    onRowSelectedDepartures(items) {
      this.selectedRowsDepartures = items;
    },
    updateData() {
      let startDateOfTheYear = null;
      let endDateOfTheYear = null;

      if (this.isModeYear) {
        startDateOfTheYear = moment(this.year)
          .startOf("year")
          .format("YYYY-MM-DD");
        endDateOfTheYear = moment(this.year).endOf("year").format("YYYY-MM-DD");
      } else {
        startDateOfTheYear = moment(this.dateRange.startDate).format(
          "YYYY-MM-DD"
        );
        endDateOfTheYear = moment(this.dateRange.endDate).format("YYYY-MM-DD");
      }

      this.params.inicio = startDateOfTheYear;
      this.params.fin = endDateOfTheYear;
     if (this.typeReport == 1) this.loadReportDataMonth()
      if (this.typeReport == 2) this.loadReportDataDeparture()
    },
   

    // valores iniciales
    async setInitialParameters() {
      this.year = new Date();
      this.setSummaryViewActive(true);
    },

    async loadReportDataMonth() {
      
      this.isLoading = true;
      const params = {
        inicio: this.params.inicio,
        fin: this.params.fin,
        tipo: this.typeReport,
   
        cruise_ids: this.filters.cruises,
        }
         await this.loadData(params);
     this.isLoading = false;
    },
    async loadReportDataDeparture() {


      this.isLoading = true;
      const params = {
        inicio: this.params.inicio,
        fin: this.params.fin,
        buildMode: this.typeReportItinerary,
        cruise: this.filters.cruises,
      };

      await this.loadDataDepartures(params);

      this.isLoading = false;


    },
    
    handleRange() {
      this.updateData();
    },

    handleDetails(itemData) {
      this.setSummaryViewActive(false);

      this.detailsData = itemData;
    },

  },

  async created() {
    await this.setInitialParameters();
  },
};
</script>


