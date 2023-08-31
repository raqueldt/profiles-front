
<template>
  <div>
    <!--     <b-button variant="link" class="ml-3 mr-4 pull-right btn-xs" @click="copy">
      <i class="simple-icon-docs" /> Copy</b-button
    > -->

    <b-table
      id="monthreport"
      responsive
      sticky-header
      head-variant="light"
      small
      :fields="fields"
      :items="data"
    >
      <template #cell(itiCode)="row"> <!-- {{row.item.vslColor}} -->
     <!--    <b-badge  variant="outline"  :style="{ color: row.item.vslColor }" > {{ row.item.itiCode }}</b-badge> -->
   <b-badge variant="primary" > {{ row.item.itiCode }} | {{row.item.itiNights}}N </b-badge>
      </template>
      <template #cell(files)="row">
        <span> {{ row.item.files }}</span>
      </template>
      <template #cell(pax)="row">
        <span> {{ row.item.pax }}</span>
      </template>
      <template #cell(pppppn)="row">
        <span> {{ row.item.pppppn | currency }}</span>
      </template>
      <template #cell(average)="row">
        <span> {{ row.item.average | currency }}</span>
      </template>
      <template #cell(dbc)="row">
        <span> {{ row.item.dbc }} days</span>
      </template>
      <template #cell(revenue)="row">
        <span> {{ row.item.revenue | currency }}</span>
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
        {
          key: "itiCode",
          label: "ITINERARY",
          thClass: "text-center",
          sortable: true,
          tdClass: "text-center",
        },
        {
          key: "files",
          label: "FILES",
          thClass: "text-center",
          sortable: true,
          tdClass: "text-center",
        },
        {
          key: "pax",
          label: "PAX",
          thClass: "text-center",
          sortable: true,
          tdClass: "text-center",
        },
        {
          key: "pppppn",
          label: "PPPPPN",
          thClass: "text-right",
          sortable: true,
          tdClass: "text-right",
        },
        {
          key: "average",
          label: "AVG X FILE",
          thClass: "text-right",
          sortable: true,
          tdClass: "text-right",
        },
        {
          key: "dbc",
          label: "DBC",
          thClass: "text-right",
          sortable: true,
          tdClass: "text-right",
        },

        {
          key: "venta",
          label: "SALES",
          thClass: "text-right",
          sortable: true,
          tdClass: "text-right",
        },
          {
          key: "revenue",
          label: "AVG X PP",
          thClass: "text-right",
          sortable: true,
          tdClass: "text-right",
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


