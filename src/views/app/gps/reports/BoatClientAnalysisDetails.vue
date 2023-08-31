<template>
  <div>
    <b-card>
      <b-card-title>
        <!-- {{getDataDetail}} -->
        <div class="d-flex">
          <div>
            <strong>{{ details.clienteName }}</strong
            ><br />
            <small>{{ details.pais }}</small>
          </div>
          <div class="ml-auto">
            <b-button @click="handleView"> Back </b-button>
          </div>
        </div>
      </b-card-title>
<!-- {{getDataDetail}} -->
      <b-table
        :items="getDataDetail"
        :fields="fields"
        responsive="sm"
        class="mt-3"
        small
      >
        <template #cell(cofCodigo)="row">
          <router-link
            :to="{ name: 'confirmations', params: { cofId: row.item.cofId } }"
          >
            <span class="text-primary">
              <small
                ><strong>{{ row.item.cofCodigo }}</strong></small
              >
            </span>
          </router-link>
        </template>
        <template #cell(cofClienteId)="row">
          <small>{{ row.item.cruName }}</small>
        </template>
        <template #cell(cofReferencia)="row">
          <small>{{ row.item.cofReferencia }}</small>
        </template>

        <template #cell(cofInicio)="row">
          <small>
            {{ moment(row.item.cofInicio, "YYYY-MM-DD").format("DD MMM YYYY") }}
            -
            {{ moment(row.item.cofFinal, "YYYY-MM-DD").format("DD MMM YYYY") }}
            <small> </small>
          </small>
        </template>

        <!--        <template #cell(cofFinal)="row">
                    <small>
                      {{ moment(row.item.cofFinal, 'YYYY-MM-DD').format('DD MMM YYYY') }}
                    </small>
                </template> -->

        <template #cell(nights)="row">
          <small>{{ row.item.nights }}N/{{ row.item.days }}D</small>
        </template>

        <template #cell(dba)="row">
          <small>{{ row.item.dba }}</small>
        </template>

        <template #cell(cofPasajeros)="row">
          <small>
            {{ row.item.cofPasajeros ? row.item.cofPasajeros : 0 }}
          </small>
        </template>

        <template #cell(venta)="row">
          <small>
            {{ row.item.venta | currency }}
          </small>
        </template>

        <template #cell(cofFechaVenta)="row">
          <small>
            {{
              moment(row.item.cofFechaVenta, "YYYY-MM-DD").format(
                "ddd, DD MMM YYYY"
              )
            }}
          </small>
        </template>

        <template #cell(vendedor)="row">
          <small>
            {{ row.item.vendedor }}
          </small>
        </template>

        <template slot="bottom-row" slot-scope="data">
          <td colspan="5" class="text-right" style="background: antiquewhite">
            <small>
              <strong> TOTAL </strong>
            </small>
          </td>
          <td class="text-right" style="background: antiquewhite">
            <small>
              <strong>
                {{ getTotalPax }}
              </strong>
            </small>
          </td>
          <td class="text-right" style="background: antiquewhite">
            <small>
              <strong>
                {{ getTotalSale | currency }}
              </strong>
            </small>
          </td>
          <td style="background: antiquewhite" colspan="2"></td>
        </template>
      </b-table>
    </b-card>
  </div>
</template>   
<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "ClientAnalysisDetails",
  props: ["details", "inicio", "fin", "tipo", "barco"],
  data() {
    return {
      fields: [
       

        {
          key: "cofCodigo",
          label: "Booking Code",
          tdClass: "text-left",
          thClass: "text-left",
           sortable: true
        },
         {
          key: "cofClienteId",
          label: "Yacht",
          tdClass: "text-left",
          thClass: "text-left",
           sortable: true
        },
        {
          key: "cofReferencia",
          label: "Reference",
          tdClass: "text-center",
          thClass: "text-center",
           sortable: true
        },
        {
          key: "cofInicio",
          label: "Date Cruise",
          tdClass: "text-center",
          thClass: "text-center",
           sortable: true
        },
        /*    {key: 'cofFinal', label: 'Fecha Final', tdClass: 'text-center', thClass: 'text-center'},
         */ {
          key: "cofFechaVenta",
          label: "Confirmation date",
          tdClass: "text-center",
          thClass: "text-center",
           sortable: true
        },

        {
          key: "cofPasajeros",
          label: "Pax",
          tdClass: "text-right",
          thClass: "text-right",
           sortable: true
        },
        {
          key: "cofPasajeros",
          label: "Pax",
          tdClass: "text-right",
          thClass: "text-right",
           sortable: true
        },
        {
          key: "venta",
          label: "Sale",
          tdClass: "text-right",
          thClass: "text-right",
           sortable: true
        },
        { key: "vendedor", label: "Salesperson", tdClass: "text-left" },
      ],
    };
  },
  computed: {
    ...mapState("boat-client-analysis", ["summaryViewActive"]),
    ...mapGetters("boat-client-analysis", ["getDataDetail"]),

    getTotalPax() {
      function sumar(total, valor) {
        return total + valor;
      }
      //sumar pax
      return this.getDataDetail
        .map((item) => Number(item.cofPasajeros))
        .reduce(sumar, 0);
    },

    getTotalSale() {
      function sumar(total, valor) {
        return total + valor;
      }
      //sumar pax
      return this.getDataDetail
        .map((item) => Number(item.venta))
        .reduce(sumar, 0);
    },
  },
  methods: {
    ...mapActions("boat-client-analysis", ["loadDataDetail"]),
    ...mapMutations("boat-client-analysis", ["setSummaryViewActive"]),

    handleView() {
      this.$emit("updateinfo");

      this.setSummaryViewActive(true);
    },
    // buscar y cargar data segun parametros
    async loadReportData() {
      const params = {
        inicio: this.inicio,
        fin: this.fin,
        tipo: this.tipo,
        barco: this.barco,
        cliente: this.details.cofClienteId,
      };

      await this.loadDataDetail(params);
    },
  },

  async mounted() {
    await this.loadReportData();
  },
};
</script>