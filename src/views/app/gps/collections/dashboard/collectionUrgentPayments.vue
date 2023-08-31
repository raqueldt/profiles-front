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
        <!-- FORMATEO DE CAMPOS -->

        <template #cell(dates_booking_tour_start)="data">
          <small>
            {{
              data.item.dates_booking_tour_start
                ? moment(data.item.dates_booking_tour_start).format(
                    "DD MMM YYYY, ddd"
                  )
                : ""
            }}
          </small>
        </template>
        <template #cell(dates_booking_tour_end)="data">
          <small>
            {{
              data.item.dates_booking_tour_end
                ? moment(data.item.dates_booking_tour_end).format(
                    "MMM DD YYYY, ddd"
                  )
                : ""
            }}
          </small>
        </template>

        <template #cell(total_booking_amount)="data">
          <!-- <small>{{ data.item.total_booking_amount ? data.item.total_booking_amount : 0 | currency}}</small> -->
          <small>{{ data.item.total_booking_amount | currency }}</small>
        </template>

        <template #cell(total_remaining)="data">
          <!-- <small>{{ data.item.total_remaining ? data.item.total_remaining : 0 | currency}}</small> -->
          <small>{{ data.item.total_remaining | currency }}</small>
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
            $t("gps.collections.urgent-payments")
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
                  s:data.item.cofFechaVenta, 
                  e:data.item.cofFechaVenta 
                },
              }"
              >{{ data.item.file_code }}
              <!-- <pre class="h3">{{ data.item }}</pre> -->
            </router-link>
          
          </a>
        </template>
        <!-- FIN LINK EN FILE CODE -->
      

        <!--template slot="top-row" slot-scope="{ fields }">
          
          <td v-for="(field, key) in fields.filter((item) => item.key != 'cofId' && item.key != 'idClient')" :key="key">
            <div v-if="field.key === 'dates_booking_tour_start'">
              <b-form-input
                size="xs"
                type="date"
                v-model="filters['dates_booking_tour_start']"
                :placeholder="field.label"
              />
            </div>

            <div v-if="field.key === 'file_code'">
              <b-form-input
                size="xs"
                type="text"
                v-model="filters['file_code']"
                :placeholder="field.label"
              />
            </div>

            <div v-if="field.key === 'last_minute'">
              <b-form-input
                size="xs"
                type="text"
                v-model="filters['last_minute']"
                :placeholder="field.label"
              />
            </div>

            <div v-if="field.key === 'dates_booking_tour_end'">
              <b-form-input
                size="sm"
                type="date"
                v-model="filters['dates_booking_tour_end']"
                :placeholder="field.label"
              />
            </div>

            <div v-else-if="field.key === 'total_booking_amount'">
              <b-form-input
                size="sm"
                maxlength="5"
                type="text"
                v-model="filters['total_booking_amount']"
                :placeholder="field.label"
                @keypress="onlyNumber"
              />
            </div>

            <div v-else-if="field.key === 'total_remaining'">
              <b-form-input
                size="sm"
                maxlength="5"
                type="text"
                v-model="filters['total_remaining']"
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
  name: "collectionUrgentPayments",
  data() {
    return {
      isBusy: false,
      //Paginación:
      perPage: 5,
      currentPage: 1,

      filters: {
        file_code: "",
        dates_booking_tour_end: "",
        dates_booking_tour_start: "",
        total_booking_amount: "",
        total_remaining: "",
        last_minute: "",
      },     
      fields: [
        {
          key: "file_code",
          label: "File",
        },
        {
          key: "dates_booking_tour_start",
          label: "Inicio tour",
        },

        {
          key: "dates_booking_tour_end",
          label: "Fin tour",
        },
        {
          key: "total_booking_amount",
          label: "Monto",
        },
        {
          key: "total_remaining",
          label: "Saldo",
        },
        {
          key: "last_minute",
          label: "Last minute",
        },
      ],      
      messageNoResults: "There are no results.",
      items: [],
      showColumn: false
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
              dates_booking_tour_start: "",
              dates_booking_tour_end: "",
              total_booking_amount: "",
              total_remaining: "",
              last_minute: "",
            },
          ];
    },

    checkEmptyValues() {
      let obj = this.filtered;
      return obj.every(function (e) {
        return (
          e.file_code == "" &&
          e.dates_booking_tour_start == "" &&
          e.dates_booking_tour_end == "" &&
          e.total_booking_amount == "" &&
          e.total_remaining == "" &&
          e.last_minute == ""
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
    async getUrgentPayments() {
      this.isBusy = true;

      const { data } = await CobranzasServices.getUrgentPayments();

      //Mapeo de resultado de acuerdo a items de la tabla
      this.items = data.map((x) => ({
        file_code: x.cofCodigo,
        dates_booking_tour_start: x.cofInicio,
        dates_booking_tour_end: x.cofFinal,
        total_booking_amount: x.totalConfirmacion,
        total_remaining: x.saldoConfirmacion,
        last_minute: x.lastMinute,
        
        cofFechaVenta: x.cofFechaVenta,
        cofId: x.cofId,
        idClient: x.id_client
      }));

      this.isBusy = false;
    },
  },
  mounted() {},
  created() {
    this.getUrgentPayments();
  },
};
</script>

<style lang="scss" scoped>
.collection-dashboard table input.form-control {
  font-size: 0.7rem;
  padding: 0.1rem 0.25rem;
}

/* .b-table-sticky-header > .table.b-table > thead > tr > th {
  font-size: .7rem;
  font-weight: 600;
} */
</style>