<template>
  <div class="container-fluid">
    <div class="card">
      <b-table
        id="my-table"
        sticky-header
        striped
        show-empty
        empty-text="No data available"
        empty-filtered-text="0 records found"
        small
        fixed
        hover
        :busy.sync="isBusy"
        :fields="fields"
        responsive="sm"
        caption-top
        :items="filtered"
        class="small text-center collection-dashboard"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <!-- EMPTY ROWS -->
        <template v-slot:empty="{ emptyText }">
          <div class="text-center">
            <h6>{{ emptyText }}</h6>
          </div>
        </template>
        <!-- FIN EMPTY ROWS -->

        <!-- FORMATEO DE CAMPOS -->

        <template #cell(date_register)="data">
          <small>
            {{
              data.item.date_register
                ? moment(data.item.date_register).format("DD MMM YYYY, ddd")
                : ""
            }}
          </small>
        </template>

        <template #cell(amount)="data">
          <small>{{ data.item.amount | currency }}</small>
        </template>

        <template #cell(remaining_receivable)="data">
          <small>{{ data.item.remaining_receivable | currency }}</small>
        </template>

        <template #cell(payment_number)="data">
          <small>{{ data.item.payment_number }}</small>
        </template>


        <!-- FIN FORMATEO DE CAMPOS -->

        <!-- SPINNER LOADING DATA -->
        <template v-slot:table-busy>
          <div class="text-center text-info my-2">
            <b-spinner class="align-middle"></b-spinner>
          </div>
        </template>
        <!-- FIN SPINNER LOADING DATA -->

        <!-- TITULO DE TABLA -->
        <template #table-caption>
          <small class="h6 ml-2">{{
            $t("gps.collections.recent-payments-recorded")
          }}</small>
        </template>
        <!-- FIN TITULO DE TABLA -->

        <!-- LINK EN FILE CODE -->
        <template #cell(file_code)="data">
          
            <router-link
            class="badge text-ref"
              tag="a"
              :to="{
                path: 'collection-file-manager',
                query: { 
                  c: data.item.idClient, 
                  f: data.item.cofId,
                  s: data.item.cofFechaVenta, 
                  e: data.item.cofFechaVenta 
                },
              }"
              >{{ data.item.file_code }}
            </router-link>
          
        </template>
        <!-- FIN LINK EN FILE CODE -->

        <!--template slot="top-row" slot-scope="{ fields }">
          <td v-for="field in fields" :key="field.key">
            <div v-if="field.key === 'date_register'">
              <b-form-input
                size="sm"
                type="date"
                v-model="filters['date_register']"
                :placeholder="field.label"
              />
            </div>
            <div v-else-if="field.key === 'amount'">
              <b-form-input
                size="sm"
                maxlength="5"
                type="text"
                v-model="filters['amount']"
                :placeholder="field.label"
                @keypress="onlyNumber"
              />
            </div>
            <div v-else-if="field.key === 'remaining_receivable'">
              <b-form-input
                size="sm"
                maxlength="2"
                type="text"
                v-model="filters['remaining_receivable']"
                :placeholder="field.label"
                @keypress="onlyNumber"
              />
            </div>
            <div v-else-if="field.key === 'payment_number'">
              <b-form-input
                size="sm"
                maxlength="5"
                type="text"
                v-model="filters['payment_number']"
                :placeholder="field.label"
                @keypress="onlyNumber"
              />
            </div>
            <div v-else>
              <b-form-input
                size="sm"
                type="text"
                v-model="filters[field.key]"
                :placeholder="field.label"
              />
            </div>
          </td>
        </template-->
      </b-table>

      <!-- MENSAJE DE DATOS VACIOS -->
      <div class="text-center mb-2" v-if="checkEmptyValues">
        <small class="h6">{{ messageNoResults }}</small>
      </div>
      <!-- MENSAJE DE DATOS VACIOS -->

      <!-- PAGINACION -->
      <div v-if="rows > 5">
        <b-pagination
          class="text-center"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          size="sm"
          align="center"
        ></b-pagination>
      </div>
      <!-- FIN PAGINACION -->
    </div>
  </div>
</template>

<script>
import CobranzasServices from "@/services/gps/cobranzas/CobranzasServices";

export default {
  name: "collectionRecentPaymentsRecorded",
  data() {
    return {
      isBusy: false,
      //Paginación:
      perPage: 5,
      currentPage: 1,

      filters: {
        file_code: "",
        date_register: "",
        user: "",
        amount: "",
        remaining_receivable: "",
        payment_number: "",
      },
      messageNoResults: "There are no results.",
      items: [],
      fields:[
        {key: "file_code", label: 'File'},
        {key: "date_register", label: 'Fecha'},
        {key: "user", label: 'Usuario'},
        {key: "amount", label: 'Monto'},
        {key: "remaining_receivable", label: 'Saldo'},
        {key: "payment_number", label: 'Cuota'}                           
      ]
    };
  },
  computed: {
    //Paginación
    rows() {
      return this.items.length;
    },
    filtered() {
      const filtered = this.items.filter((item) => {
        return Object.keys(this.filters).every((key) =>
          String(item[key]).includes(this.filters[key])
        );
      });
      return filtered.length > 0
        ? filtered
        : [
            {
              file_code: "",
              date_register: "",
              user: "",
              amount: "",
              remaining_receivable: "",
              payment_number: "",
            },
          ];
    },
    checkEmptyValues() {
      let obj = this.filtered;
      return obj.every(function (e) {
        return (
          e.file_code === "" &&
          e.date_register === "" &&
          e.user === "" &&
          e.amount === "" &&
          e.remaining_receivable === "" &&
          e.payment_number === ""
        );
      });
    },
  },
  methods: {
    // Función para validar ingreso únicamente de campos numéricos
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },

    // CONSUMO DE API
    getPaymentRecords() {
      this.isBusy = true;
      CobranzasServices.getLatestPayments()
        .then((response) => {
          //Mapeo de resultado de acuerdo a items de la tabla
          this.items = response.data.map((x) => ({
            file_code: x.cofCodigo,
            date_register: x.ccoFecha,
            user: x.user,
            amount: x.datosAbono.monto,
            remaining_receivable: x.datosAbono.saldoActual,
            payment_number: x.datosAbono.indiceAbono,
            cofId: x.cofId,
            id_client: x.id_client,

            cofFechaVenta: x.ccoFecha,
            cofId: x.cofId,
            idClient: x.id_client   
          }));          
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => (this.isBusy = false));
    },
  },
  mounted() {},
  created() {
    this.getPaymentRecords();
  },
};
</script>

<style lang="scss" scoped>

    .collection-dashboard table input.form-control {
      font-size: 0.7rem;
      padding: 0.1rem 0.25rem;
    }

</style>