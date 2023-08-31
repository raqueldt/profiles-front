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

        <template #cell(booking_dates_start)="data">
          <small>
            {{
              data.item.booking_dates_start
                ? moment(data.item.booking_dates_start).format(
                    "MMM DD YYYY, ddd"
                  )
                : ""
            }}
          </small>
        </template>

        <template #cell(booking_dates_end)="data">
          <small>
            {{
              data.item.booking_dates_end
                ? moment(data.item.booking_dates_end).format("MMM DD YYYY, ddd")
                : ""
            }}
          </small>
        </template>

        <template #cell(expected_payment_amount)="data">
          <!-- <small>{{
            data.item.expected_payment_amount
              ? data.item.expected_payment_amount
              : 0 | currency
          }}
          </small> -->

          <small>{{ data.item.expected_payment_amount | currency }}</small>
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
            $t("gps.collections.overdue-payments")
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
            <div v-if="field.key === 'type'">
              <b-form-input
                size="sm"
                type="text"
                v-model="filters['type']"
                :placeholder="field.label"
              />
            </div>
            <div v-if="field.key === 'expected_payment_date'">
              <b-form-input
                size="sm"
                type="date"
                v-model="filters['expected_payment_date']"
                :placeholder="field.label"
              />
            </div>

            <div v-if="field.key === 'booking_dates_start'">
              <b-form-input
                size="sm"
                type="date"
                v-model="filters['booking_dates_start']"
                :placeholder="field.label"
              />
            </div>

            <div v-if="field.key === 'booking_dates_end'">
              <b-form-input
                size="sm"
                type="date"
                v-model="filters['booking_dates_end']"
                :placeholder="field.label"
              />
            </div>

            <div v-else-if="field.key === 'expected_payment_amount'">
              <b-form-input
                size="sm"
                maxlength="5"
                type="text"
                v-model="filters['expected_payment_amount']"
                :placeholder="field.label"
                @keypress="onlyNumber"
              />
            </div>

            <div v-else-if="field.key === 'days_overdue'">
              <b-form-input
                size="sm"
                maxlength="5"
                type="text"
                v-model="filters['days_overdue']"
                :placeholder="field.label"
                @keypress="onlyNumber"
              />
            </div>

            <div v-else-if="field.key === 'days_to_begin'">
              <b-form-input
                size="sm"
                maxlength="5"
                type="text"
                v-model="filters['days_to_begin']"
                :placeholder="field.label"
                @keypress="onlyNumber"
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
  name: "collectionOverduePayments",
  data() {
    return {
      isBusy: false,
      //Paginación:
      perPage: 5,
      currentPage: 1,

      filters: {
        file_code: "",
        expected_payment_date: "",
        expected_payment_amount: "",
        type: "",
        days_overdue: "",
        booking_dates_start: "",
        booking_dates_end: "",
        days_to_begin: "",
      },
     fields: [
        {
          key: "file_code",
          label: "File",
        },
        {
          key: "expected_payment_date",
          label: "Fecha vencimiento",
        },
        {
          key: "expected_payment_amount",
          label: "Monto vencido",
        },
        {
          key: "type",
          label: "Tipo",
        },
        {
          key: "days_overdue",
          label: "Días",
        },
        {
          key: "booking_dates_start",
          label: "Inicio tour",
        },
        {
          key: "booking_dates_end",
          label: "Fin tour",
        },
        {
          key: "days_to_begin",
          label: "Días para iniciar",
        }

      ],      
      messageNoResults: "There are no results.",
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
              expected_payment_amount: "",
              type: "",
              days_overdue: "",
              booking_dates_start: "",
              booking_dates_end: "",
              days_to_begin: "",
            },
          ];
    },
    checkEmptyValues() {
      let obj = this.filtered;
      return obj.every(function (e){
        return e.file_code == '' && e.expected_payment_date == '' &&  e.expected_payment_amount == '' && e.type == '' &&
        e.days_overdue == ''&& e.booking_dates_start == ''  && e.booking_dates_end == '' && e.days_to_begin == ''
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
    async getOverduePayments() {
      this.isBusy = true;

      const { data } = await CobranzasServices.getOverduePayments();

      //Mapeo de resultado de acuerdo a items de la tabla
      this.items = data.map((x) => ({
        file_code: x.cofCodigo,
        expected_payment_date: x.cppFecha,
        expected_payment_amount: x.cppMonto,
        type: x.paymentType,
        days_overdue: x.daysOverdue,
        booking_dates_start: x.cofInicio,
        booking_dates_end: x.cofFinal,
        days_to_begin: x.daysToBegin,
        
        cofFechaVenta: x.cppFecha,
        cofId: x.cofId,
        idClient: x.id_client        
      }));

      this.isBusy = false;
    },
  },
  mounted() {},
  created() {
    this.getOverduePayments();
  },
};
</script>

<style lang="scss" scoped>
.collection-dashboard table input.form-control {
  font-size: 0.7rem;
  padding: 0.1rem 0.25rem;
}
</style>