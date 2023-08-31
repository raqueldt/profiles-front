<template>
  <div class="overflow-auto">
    <b-table
      id="my-table"
      head-variant="dark"
      hover
      :items="departuresprice"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      small
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(depStartDate)="data">
        <span>
          {{ moment(data.item.depStartDate).format("DD MMM YYYY, ddd") }}
        </span>
      </template>

      <template #cell(depEndDate)="data">
        <span>
          {{ moment(data.item.depEndDate).format("DD MMM YYYY, ddd") }}
        </span>
      </template>

      <template #cell(metName)="data">
        <b-badge
          class="mb-1"
          href="#"
          variant="muted"
          :class="formatStatus(data.item.dprStatus)"
          >{{ data.item.metName }}</b-badge
        >
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import Pricing from "../../../services/gps/pricing/PricingServices.js";

export default {
  props: ["ratesetId"],
  data() {
    return {
      perPage: 8,
      currentPage: 1,
      departuresprice: "",
      fields: [
        {
          key: "index",
          label: "#",
          sortable: false,
          sortDirection: "desc",
          tdClass: "index"
        },
        {
          key: "cruName",
          label: "Cruise",
          sortable: false,
          sortDirection: "desc",
          tdClass: "index"
        },
           {
          key: "itiCode",
          label: "Itinerary",
          sortable: false,
          sortDirection: "desc",
          tdClass: "index"
        },
        {
          key: "depStartDate",
          label: "Start Date",
          sortable: false,
          sortDirection: "desc",
          tdClass: "index"
        },
        {
          key: "depEndDate",
          label: "End Date",
          sortable: false,
          sortDirection: "desc",
          tdClass: "index"
        },
        {
          key: "metName",
          label: "Status",
          sortable: false,
          sortDirection: "desc",
          tdClass: "index"
        }
      ]
    };
  },
  methods: {
    formatStatus(status) {
      var response = "";
      switch (status) {
        case 1:
          response = "text-success";
          break;
        case 0:
          response = "text-danger";
          break;
        default:
          response = true;
      }
      return response;
    },
    getPricing() {
      Pricing.getDeparturesByPromotion(this.ratesetId)
        .then(response => {
          this.departuresprice = response.data.data;
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    }
  },
  computed: {
    rows() {
      return this.departuresprice.length;
    }
  },
  mounted() {
    this.getPricing();
  }
};
</script>
