<template>
  <div>
    <b-button variant="link" class="ml-3 mr-4 pull-right btn-xs" @click="copy">
      <i class="simple-icon-docs" /> Copy</b-button
    >

    <b-table
      id="departurereport"
      :items="data"
      :fields="fieldsdepartures"
       head-variant="light"
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
         

           <span class="text-primary" >
         {{ moment(row.item.depStartDate).format("DD MMM YYYY ") }}-
              {{ moment(row.item.depEndDate).format("DD MMM YYYY ") }} <b-badge title="Dry Dock" v-if="row.item.dryId" href="#" style="background-color:#3f4462">D</b-badge>
        </span> <!-- <b-badge variant="primary" style="color:#3f4462">N/A</b-badge> -->
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
        <span> {{ row.item.ocupacion | percent }}</span>
      </template>
      <template #cell(allotmentPercentage)="row">
        <span> {{ row.item.allotmentPercentage | percent }}</span>
      </template>
      <template #cell(venta)="row">
        <span> {{ row.item.venta | currency }}</span>
      </template>
          <template #cell(dbc)="row">
        

              <span v-if="!(row.item.totalDbc / row.item.totalFiles)" >0</span>
<span v-else > {{(row.item.totalDbc / row.item.totalFiles) | number}}</span>

       </template>

      <template #cell(paxPromedio)="row">
        <span> {{ row.item.paxPromedio | currency }}</span>
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
          <template
            v-if="selectedRowsDepartures && selectedRowsDepartures.length"
          >
            <br />
            <span class="text-muted">
              <strong>SELECTED</strong>
            </span>
          </template>
        </td>
        <td class="text-left" style="background: antiquewhite"></td>
        <td class="text-center" style="background: antiquewhite">
          <span>
            <strong>
              {{ getTotalNightsDepartures }}
            </strong>
            <template
              v-if="selectedRowsDepartures && selectedRowsDepartures.length"
            >
              <br />
              <span class="text-muted">
                <strong>{{ totalNightsSelectedDepartures }}</strong>
              </span>
            </template>
          </span>
        </td>
        <td class="text-right" style="background: antiquewhite">
          <span>
            <strong>
              {{ getTotalCostoDepartures | currency }}
            </strong>
            <template
              v-if="selectedRowsDepartures && selectedRowsDepartures.length"
            >
              <br />
              <span class="text-muted">
                <strong>{{ totalCostoSelectedDepartures | currency }}</strong>
              </span>
            </template>
          </span>
        </td>
        <td class="text-right" style="background: antiquewhite">
          <span>
            <strong> {{ getTotalOcupancyDepartures | filterDecimal }}% </strong>
            <template
              v-if="selectedRowsDepartures && selectedRowsDepartures.length"
            >
              <br />
              <span class="text-muted">
                <strong
                  >{{
                    totalOcupancySelectedDepartures | filterDecimal
                  }}%</strong
                >
              </span>
            </template>
          </span>
        </td>
              <td class="text-right" style="background: antiquewhite">
          <span>
            <strong>   </strong>
            <template
              v-if="selectedRowsDepartures && selectedRowsDepartures.length"
            >
              <br />
              <span class="text-muted">
                <strong
                  ></strong
                >
              </span>
            </template>
          </span>
        </td>
        <td class="text-right" style="background: antiquewhite">
          <span>
            <strong>
              {{ getTotalAllotmentDepartures | filterDecimal }}%
            </strong>
            <template
              v-if="selectedRowsDepartures && selectedRowsDepartures.length"
            >
              <br />
              <span class="text-muted">
                <strong
                  >{{
                    totalAllotmentSelectedDepartures | filterDecimal
                  }}%</strong
                >
              </span>
            </template>
          </span>
        </td>
        <td class="text-right" style="background: antiquewhite">
          <span>
            <strong>
              {{ getTotalVentaDepartures | currency }}
            </strong>
            <template
              v-if="selectedRowsDepartures && selectedRowsDepartures.length"
            >
              <br />
              <span class="text-muted">
                <strong>{{ totalVentaSelectedDepartures | currency }}</strong>
              </span>
            </template>
          </span>
        </td>
        <td class="text-right" style="background: antiquewhite">
          <span>
            <strong>
              {{ getTotalPPPPPNDepartures | currency }}
            </strong>
            <template
              v-if="selectedRowsDepartures && selectedRowsDepartures.length"
            >
              <br />
              <span class="text-muted">
                <strong>{{ totalPPPPPNSelectedDepartures | currency }}</strong>
              </span>
            </template>
          </span>
        </td>
        <td class="text-right" style="background: antiquewhite">
          <span>
            <strong v-if="getTotalGrossMargin > 0" style="color: green">
              {{ getTotalGrossMargin | currency }}
            </strong>
            <strong v-if="getTotalGrossMargin < 0" style="color: red">
              {{ getTotalGrossMargin | currency }}
            </strong>
            <strong v-if="getTotalGrossMargin == 0">
              {{ getTotalGrossMargin | currency }}</strong
            >

            <template
              v-if="selectedRowsDepartures && selectedRowsDepartures.length"
            >
              <br />

              <span
                v-if="totalGrossMarginSelectedDepartures > 0"
                style="color: green"
              >
                <strong
                  >{{ totalGrossMarginSelectedDepartures | currency }}
                </strong>
              </span>
              <span
                v-if="totalGrossMarginSelectedDepartures < 0"
                style="color: red"
              >
                <strong
                  >{{ totalGrossMarginSelectedDepartures | currency }}
                </strong></span
              >
              <span v-if="totalGrossMarginSelectedDepartures == 0">
                <strong
                  >{{ totalGrossMarginSelectedDepartures | currency }}
                </strong></span
              >
            </template>
          </span>
        </td>
      </template>

      <template slot="top-row" slot-scope="data">
        <td
          v-if="selectedRowsDepartures && selectedRowsDepartures.length"
          class="text-left"
          style="background: antiquewhite"
        >
          <span class="text-muted">
            <strong>SELECTED</strong>
          </span>
        </td>
        <td
          v-if="selectedRowsDepartures && selectedRowsDepartures.length"
          class="text-left"
          style="background: antiquewhite"
        ></td>
        <td
          v-if="selectedRowsDepartures && selectedRowsDepartures.length"
          class="text-center"
          style="background: antiquewhite"
        >
          <span class="text-muted">
            <strong>{{ totalNightsSelectedDepartures }}</strong>
          </span>
        </td>
        <td
          v-if="selectedRowsDepartures && selectedRowsDepartures.length"
          class="text-right"
          style="background: antiquewhite"
        >
          <span class="text-muted">
            <strong>{{ totalCostoSelectedDepartures | currency }}</strong>
          </span>
        </td>
        <td
          v-if="selectedRowsDepartures && selectedRowsDepartures.length"
          class="text-right"
          style="background: antiquewhite"
        >
          <span class="text-muted">
            <strong
              >{{ totalOcupancySelectedDepartures | filterDecimal }}%</strong
            >
          </span>
        </td>
        
           <td
          v-if="selectedRowsDepartures && selectedRowsDepartures.length"
          class="text-right"
          style="background: antiquewhite"
        >
          <span class="text-muted">
            <strong
              > </strong
            >
          </span>
        </td>
        
        
        <td
          v-if="selectedRowsDepartures && selectedRowsDepartures.length"
          class="text-right"
          style="background: antiquewhite"
        >
          <span class="text-muted">
            <strong
              >{{ totalAllotmentSelectedDepartures | filterDecimal }}%</strong
            >
          </span>
        </td>
        <td
          v-if="selectedRowsDepartures && selectedRowsDepartures.length"
          class="text-right"
          style="background: antiquewhite"
        >
          <span class="text-muted">
            <strong>{{ totalVentaSelectedDepartures | currency }}</strong>
          </span>
        </td>
        <td
          v-if="selectedRowsDepartures && selectedRowsDepartures.length"
          class="text-right"
          style="background: antiquewhite"
        >
          <span class="text-muted">
            <strong>{{ totalPPPPPNSelectedDepartures | currency }}</strong>
          </span>
        </td>
        <td
          v-if="selectedRowsDepartures && selectedRowsDepartures.length"
          class="text-right"
          style="background: antiquewhite"
        >
          <span
            v-if="totalGrossMarginSelectedDepartures > 0"
            style="color: green"
          >
            <strong
              >{{ totalGrossMarginSelectedDepartures | currency }}
            </strong>
          </span>
          <span
            v-if="totalGrossMarginSelectedDepartures < 0"
            style="color: red"
          >
            <strong
              >{{ totalGrossMarginSelectedDepartures | currency }}
            </strong></span
          >
          <span v-if="totalGrossMarginSelectedDepartures == 0">
            <strong
              >{{ totalGrossMarginSelectedDepartures | currency }}
            </strong></span
          >
        </td>
      </template>
    </b-table>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { copyToClipBoard } from "./utils";

export default {
  name: "FinancialDeparture",
  props: ["data"],

  components: {
    "v-select": vSelect,
  },

  data() {
    return {
      sortBy: "age",
      sortDesc: false,

      fieldsdepartures: [
        {
          key: "departures",
          label: "DEPARTURE",
          sortable: true,
          thClass: "text-left",
        },
        {
          key: "itiCode",
          label: "CODE",
          sortable: true,
          tdClass: "text-center",
          thClass: "text-center",
        },

        {
          key: "itiNights",
          label: "NIGHTS",
          tdClass: "text-center",
          sortable: true,
          thClass: "text-center",
        },
        {
          key: "depCost",
          label: "OP. COST",
          thClass: "text-right",
          tdClass: "text-right",
          sortable: true,
        },
        {
          key: "ocupacion",
          label: "OCCUPANCY",
          thClass: "text-right",
          tdClass: "text-right",
          sortable: true,
        },
            {
          key: "dbc",
          label: "DBC",
          thClass: "text-right",
          tdClass: "text-right",
          sortable: true,
        },
        {
          key: "allotmentPercentage",
          label: "ALLOTMENT",
          thClass: "text-right",
          tdClass: "text-right",
          sortable: true,
        },
        {
          key: "venta",
          label: "CRUISE REVENUE",
          thClass: "text-right",
          tdClass: "text-right",
          sortable: true,
        },

        {
          key: "paxPromedio",
          label: "PPPPPN",
          thClass: "text-right",
          tdClass: "text-right",
          sortable: true,
        },
        {
          key: "grossmargin",
          label: "GROSS MARGIN",
          thClass: "text-right",
          tdClass: "text-right",
          sortable: true,
        },
      ],

      selectMode: "multi",
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
  filters: {
    filterDecimal(value) {
      return parseFloat(value).toFixed(2);
    },
  },
  methods: {
    copy() {
      copyToClipBoard("departurereport");
      var type = "success filled";
      var title = "Success";
      var mensaje = "Report copied";
      this.$notify(type, title, mensaje, { duration: 3000, permanent: false });
    },
    onRowSelectedDepartures(items) {
      this.selectedRowsDepartures = items;
    },
  },
  computed: {
    getTotalCostoDepartures() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.data.map((item) => Number(item.depCost)).reduce(sumar, 0);
    },
    getTotalNightsDepartures() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.data.map((item) => Number(item.itiNights)).reduce(sumar, 0);
    },
    getTotalOcupancyDepartures() {
      function sumar(total, valor) {
        return total + valor;
      }
      let total = this.data
        .map((item) => Number(item.ocupacion))
        .reduce(sumar, 0);
      let totalValor = parseFloat(total / this.data.length);
      return totalValor * 100;
    },
       getTotalDBCDeparturesFiles() {
      function sumar(total, valor) {
        return total + valor;
      }
      let total = this.data
        .map((item) => Number((item.totalFiles)))
        .reduce(sumar, 0);
      let totalValor = parseFloat(total / this.data.length);
      return totalValor * 100;
    },
    


    getTotalAllotmentDepartures() {
      function sumar(total, valor) {
        return total + valor;
      }
      let total = this.data
        .map((item) => Number(item.allotmentPercentage))
        .reduce(sumar, 0);
      let totalValor = parseFloat(total / this.data.length);
      return totalValor * 100;
    },
    getTotalVentaDepartures() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.data.map((item) => Number(item.venta)).reduce(sumar, 0);
    },
    getTotalPPPPPNDepartures() {
      function sumar(total, valor) {
        return total + valor;
      }

      let total = this.data
        .map((item) => Number(item.paxPromedio))
        .reduce(sumar, 0);
      let totalValor = parseFloat(total / this.data.length);
      return totalValor;
    },
    getTotalGrossMargin() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.data.map((item) => Number(item.grossmargin)).reduce(sumar, 0);
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
      let total = this.selectedRowsDepartures.reduce(
        (acc, item) => acc + parseFloat(item.ocupacion),
        0
      );
      let totalValor = parseFloat(total / this.selectedRowsDepartures.length);
      return totalValor * 100;
    },
        totalDBCSelectedDepartures() {
      let total = this.selectedRowsDepartures.reduce(
        (acc, item) => acc + parseFloat(item.totalDbc/item.totalFiles),
        0
      );
      let totalValor = parseFloat(total / this.selectedRowsDepartures.length);
      return totalValor * 100;
    },
    totalAllotmentSelectedDepartures() {
      let total = this.selectedRowsDepartures.reduce(
        (acc, item) => acc + parseFloat(item.allotmentPercentage),
        0
      );
      let totalValor = parseFloat(total / this.selectedRowsDepartures.length);
      return totalValor * 100;
    },
    totalVentaSelectedDepartures() {
      return this.selectedRowsDepartures.reduce(
        (acc, item) => acc + parseFloat(item.venta),
        0
      );
    },
    totalPPPPPNSelectedDepartures() {
      let total = this.selectedRowsDepartures.reduce(
        (acc, item) => acc + parseFloat(item.paxPromedio),
        0
      );
      let totalValor = parseFloat(total / this.selectedRowsDepartures.length);
      return totalValor;
    },

    totalGrossMarginSelectedDepartures() {
      return this.selectedRowsDepartures.reduce(
        (acc, item) => acc + parseFloat(item.grossmargin),
        0
      );
    },
  },
};
</script>


