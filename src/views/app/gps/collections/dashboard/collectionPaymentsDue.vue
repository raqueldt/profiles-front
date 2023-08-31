<template>
  <div class="container-fluid">
    <div class="card">
      <!-- <pre>{{filtered}}</pre> -->
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
        responsive="sm"
        caption-top
        :items="filtered"
        :fields="fields"
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

        <template #cell(expected_payment_date)="data">
          <small>
            {{
              data.item.expected_payment_date
                ? moment(data.item.expected_payment_date).format(
                    "MMM DD YYYY, ddd"
                  )
                : ""
            }}
          </small>
        </template>

        <template #cell(amount_to_collect)="data">
          <!-- <small>{{ data.item.amount ? data.item.amount : 0 | currency}}</small> -->
          <small>{{ data.item.amount_to_collect | currency }}</small>
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
            $t("gps.collections.payments-due")
          }}</small>
        </template>
        <!-- FIN TITULO DE TABLA -->

        <!-- LINK EN FILE CODE -->
        <template #cell(file_code)="data">
          <a href="#">
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
          </a>
        </template>
        <!-- FIN LINK EN FILE CODE -->

        <!--template slot="top-row" slot-scope="{ fields }">
          <td v-for="field in fields" :key="field.key">
            
            <div v-if="field.key === 'file_code'">
              <b-form-input
                size="sm"
                type="text"
                v-model="filters['file_code']"
                :placeholder="field.label"
              />
            </div>
            <div v-else-if="field.key === 'expected_payment_date'">
              <b-form-input
                size="sm"
                type="date"
                v-model="filters['expected_payment_date']"
                :placeholder="field.label"
              />
            </div>
            <div v-else-if="field.key === 'amount_to_collect'">
              <b-form-input
                size="sm"
                maxlength="5"
                type="text"
                v-model="filters['amount_to_collect']"
                :placeholder="field.label"
                @keypress="onlyNumber"
              />
            </div>
            <div v-else-if="field.key === 'days_remaining_collection'">
              <b-form-input
                size="sm"
                maxlength="2"
                type="text"
                v-model="filters['days_remaining_collection']"
                :placeholder="field.label"
                @keypress="onlyNumber"
              />
            </div>
            <div v-else>
              <b-form-input
                size="sm"
                maxlength="20"
                type="text"
                v-model="filters[key]"
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
  name: "collectionPaymentsDue",
  data() {
    return {
      isBusy: false,
      //Paginación:
      perPage: 5,
      currentPage: 1,

      filters: {
        file_code: "",
        expected_payment_date: "",
        type: "",
        amount_to_collect: "",
        days_remaining_collection: "",
      },
     fields: [
        {
          key: "file_code",
          label: "File",
        },
        {
          key: "expected_payment_date",
          label: "Fecha vence",
        },

        {
          key: "type",
          label: "Tipo",
        },
        {
          key: "amount_to_collect",
          label: "Monto",
        },
        {
          key: "days_remaining_collection",
          label: "Días",
        }
      ],      
      messageNoResults:"There are no results.",
      items: [],
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
              expected_payment_date: "",
              type: "",
              amount_to_collect: "",
              days_remaining_collection: "",
            },
          ];
    },

    checkEmptyValues(){

      let obj = this.filtered;
      return obj.every(function (e){
        return e.file_code == '' && e.expected_payment_date == '' && e.type == '' &&
        e.amount_to_collect == '' &&  e.days_remaining_collection == ''
      });
      } 

  },
  methods: {

// Función para validar ingreso únicamente de campos numéricos
        onlyNumber ($event) {
          let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
          if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
              $event.preventDefault();
          }
        },


    // CONSUMO DE API
    async getPaymentsDue() {
      this.isBusy = true;

      const { data } = await CobranzasServices.getPaymentsDue();

      //Mapeo de resultado de acuerdo a items de la tabla
      this.items = data.map((x) => ({
        file_code: x.cofCodigo,
        expected_payment_date: x.cppFecha,
        type: x.paymentType,
        amount_to_collect: x.cppMonto,
        days_remaining_collection: x.daysRemaining,

        cofFechaVenta: x.cppFecha,
        cofId: x.cofId,
        idClient: x.id_client        
      }));

      this.isBusy = false;
    },
  },
  mounted() {},
  created() {
    this.getPaymentsDue();
  },
};
</script>

<style lang="scss" scoped>

.collection-dashboard table input.form-control {
  font-size: 0.7rem;
  padding: 0.1rem 0.25rem;
}

</style>