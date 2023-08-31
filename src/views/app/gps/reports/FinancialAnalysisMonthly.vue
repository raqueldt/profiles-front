
<template>
  <div>
    <b-button variant="link" class="ml-3 mr-4 pull-right btn-xs" @click="copy">
      <i class="simple-icon-docs" /> Copy</b-button
    >

    <b-table
      id="monthreport"
      :items="data"
      :fields="fields"
      :select-mode="selectMode"
       head-variant="light"
      responsive="sm"
      ref="selectableTable"
      selectable
      small
      @row-selected="onRowSelected"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <template #cell(month)="row">
        <span class="text-primary" >
          {{ row.item.mes_nombre }} - {{ row.item.year }} 
        </span>
      </template>

      <template #cell(costo)="row">
        <span v-if="row.item.costo"> {{ row.item.costo | currency }}</span>
        <span v-else> 0</span>
      </template>
      <template #cell(ocupacion)="row">
        <span> {{ row.item.ocupacion | percent }}</span>
      </template>
      <template #cell(allotmentPercentage)="row">
        <span> {{ row.item.allotmentPercentage | percent }}</span>
      </template>
      <template #cell(venta)="row">
        <span v-if="row.item.venta"> {{ row.item.venta | currency }}</span>
        <span v-else> 0</span>
      </template>
      <template #cell(percent)="row">
        <span v-if="row.item.percent > 0" style="color: green">
          {{ row.item.percent }}%</span
        >
        <span v-if="row.item.percent < 0" style="color: red">
          {{ row.item.percent }}%</span
        >
        <span v-if="row.item.percent == 0"> {{ row.item.percent }}%</span>
        <span v-if="row.item.percent == null"> $0</span>
      </template>
      <template #cell(paxPromedio)="row">
        <span> {{ row.item.paxPromedio | currency }}</span>
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
        <td class="text-right" style="background: antiquewhite">
          <template v-if="selectedRows && selectedRows.length">
            <br />
            <span class="text-muted">
              <strong>SELECTED</strong>
            </span>
          </template>
        </td>
        <td class="text-right" style="background: antiquewhite">
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
        <td class="text-right" style="background: antiquewhite">
          <span>
            <strong> {{ getTotalOcupancy | filterDecimal }}% </strong>
            <template v-if="selectedRows && selectedRows.length">
              <br />
              <span class="text-muted">
                <strong>{{ totalOcupancySelected | filterDecimal }}%</strong>
              </span>
            </template>
          </span>
        </td>

        <td class="text-right" style="background: antiquewhite">
          <span>
            <strong> {{ getTotalAllotment | filterDecimal }}% </strong>
            <template v-if="selectedRows && selectedRows.length">
              <br />
              <span class="text-muted">
                <strong>{{ totalAllotmentSelected | filterDecimal }}%</strong>
              </span>
            </template>
          </span>
        </td>

        <td class="text-right" style="background: antiquewhite">
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
        <td class="text-right" style="background: antiquewhite">
          <span>
            <strong>
              {{ getTotalPPPPPN | currency }}
            </strong>
            <template v-if="selectedRows && selectedRows.length">
              <br />
              <span class="text-muted">
                <strong>{{ totalPPPPPNSelected | currency }}</strong>
              </span>
            </template>
          </span>
        </td>


        <td class="text-right" style="background: antiquewhite">
          <span>
            <strong v-if="getTotalProfitMonth > 0" style="color: green">
              {{ getTotalProfitMonth | currency }}
            </strong>
            <strong v-if="getTotalProfitMonth < 0" style="color: red">
              {{ getTotalProfitMonth | currency }}
            </strong>
            <strong v-if="getTotalProfitMonth == 0">
              {{ getTotalProfitMonth | currency }}</strong
            >

            <template v-if="selectedRows && selectedRows.length">
              <br />

              <span v-if="totalProfitSelected > 0" style="color: green">
                <strong>{{ totalProfitSelected | currency }} </strong>
              </span>
              <span v-if="totalProfitSelected < 0" style="color: red">
                <strong>{{ totalProfitSelected | currency }} </strong></span
              >
              <span v-if="totalProfitSelected == 0">
                <strong>{{ totalProfitSelected | currency }} </strong></span
              >
            </template>
          </span>
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
  name: "SalesbyTravel",
  props: ["data"],
  components: {
    "v-select": vSelect,
  },

  data() {
    return {
      sortBy: "age",
      sortDesc: false,
      fields: [
        { key: "month", label: "MONTH", thClass: "text-left",  sortable: true, },
        {
          key: "costo",
          label: "OP. COST",
          thClass: "text-right",
          sortable: true,
          tdClass: "text-right"
        },
        {
          key: "ocupacion",
          label: "OCCUPANCY",
          thClass: "text-right",
          sortable: true,
          tdClass: "text-right"
        },
        {
          key: "allotmentPercentage",
          label: "ALLOTMENT",
          thClass: "text-right",
          sortable: true,
          tdClass: "text-right"
        },
        {
          key: "venta",
          label: "CRUISE REVENUE",
          thClass: "text-right",
          sortable: true,
          tdClass: "text-right"
        },
        {
          key: "paxPromedio",
          label: "PPPPPN",
          thClass: "text-right",
          sortable: true,
          tdClass: "text-right"
        },
        {
          key: "profit",
          label: "GROSS MARGIN",
          thClass: "text-right",
          sortable: true,
          tdClass: "text-right"
        },
      
      ],

      selectMode: "multi",
      selectedRows: [],

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
    getTotalCostoMonth() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.data.map((item) => Number(item.costo)).reduce(sumar, 0);
    },

    totalCostoSelected() {
      return this.selectedRows.reduce(
        (acc, item) => acc + parseFloat(item.costo),
        0
      );
    },

    getTotalOcupancy() {
      function sumar(total, valor) {
        return total + valor;
      }
      let total = this.data
        .map((item) => Number(item.ocupacion))
        .reduce(sumar, 0);
      let totalValor = parseFloat(total / this.data.length);
      return totalValor * 100;
    },
    totalOcupancySelected() {
      let total = this.selectedRows.reduce(
        (acc, item) => acc + parseFloat(item.ocupacion),
        0
      );
      let totalValor = parseFloat(total / this.selectedRows.length);
      return totalValor * 100;
    },


    getTotalVentaMonth() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.data.map((item) => Number(item.venta)).reduce(sumar, 0);
    },

    totalVentaSelected() {
      return this.selectedRows.reduce(
        (acc, item) => acc + parseFloat(item.venta),
        0
      );
    },

    getTotalPPPPPN() {
      function sumar(total, valor) {
        return total + valor;
      }

      let total = this.data
        .map((item) => Number(item.paxPromedio))
        .reduce(sumar, 0);
      let totalValor = parseFloat(total / this.data.length);
      return totalValor;
    },

    getTotalAllotment() {
      function sumar(total, valor) {
        return total + valor;
      }
      let total = this.data
        .map((item) => Number(item.allotmentPercentage))
        .reduce(sumar, 0);
      let totalValor = parseFloat(total / this.data.length);
      return totalValor * 100;
    },

    totalAllotmentSelected() {
      let total = this.selectedRows.reduce(
        (acc, item) => acc + parseFloat(item.allotmentPercentage),
        0
      );
      let totalValor = parseFloat(total / this.selectedRows.length);
      return totalValor * 100;
    },

    totalPPPPPNSelected() {
      let total = this.selectedRows.reduce(
        (acc, item) => acc + parseFloat(item.paxPromedio),
        0
      );
      let totalValor = parseFloat(total / this.selectedRows.length);
      return totalValor;
    },

    getTotalProfitMonth() {
      function sumar(total, valor) {
        return total + valor;
      }
      return this.data.map((item) => Number(item.profit)).reduce(sumar, 0);
    },
    totalProfitSelected() {
      return this.selectedRows.reduce(
        (acc, item) => acc + parseFloat(item.profit),
        0
      );
    },

    getTotalPercentMonth() {
      function sumar(total, valor) {
        return total + valor;
      }
      let total = this.data
        .map((item) => Number(item.percent))
        .reduce(sumar, 0);
      let totalValor = total / this.data.length;
      return totalValor;
    },
    totalPercentSelected() {
      let total = this.selectedRows.reduce(
        (acc, item) => acc + parseFloat(item.percent),
        0
      );
      let totalValor = total / this.selectedRows.length;
      return totalValor;
    },
  },

  methods: {
    copy() {
      copyToClipBoard("monthreport");
      var type = "success filled";
      var title = "Success";
      var mensaje = "Report copied";
      this.$notify(type, title, mensaje, { duration: 3000, permanent: false });
    },
    onRowSelected(items) {
      this.selectedRows = items;
    },
  },

  filters: {
    filterDecimal(value) {
      return parseFloat(value).toFixed(2);
    },
  },
};
</script>


