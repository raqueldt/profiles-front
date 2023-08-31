<template>
  <div class="modal-body">
    
    <div v-if="Boolean(sumid)" class="m-0 p-0">
      <!-- <h6 id="title-table">Itinerary</h6> -->
    <table
      class="table table-striped tb-rate table-bordered table-hover table-sm mb-1"
    >
      <thead>
        <tr>
          <th colspan="2">
            <center>
            <h4>Itinerary</h4>
            </center>
          </th>
        </tr>
        <tr>
          <th scope="col">{{ $t("gps.mod-itin-day") }}</th>
          <!-- <th scope="col">{{ $t("gps.mod-itin-meridian") }}</th> -->
          <!-- <th scope="col">{{ $t("gps.mod-itin-place") }}</th> -->
          <th scope="col">{{ $t("gps.mod-itin-site") }}</th>
          <!-- <th scope="col">{{ $t("gps.mod-itin-activities") }}</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sumid" :key="item.sumId">
          <td>{{ item.sumDay ? formatDay(item.sumDay) : "No day added" }} ({{
              item.sumMeridian
                ? formatMeridian(item.sumMeridian)
                : "No MERIDIAN added"
            }})</td>
          <!-- <td>
            {{
              item.sumMeridian
                ? formatMeridian(item.sumMeridian)
                : "No MERIDIAN added"
            }}
          </td> -->
          <!-- <td>{{ item.plaName ? item.plaName : "No Place added" }}</td> -->
          <td>{{ item.sitName ? item.sitName : "No Site added" }} ({{ item.plaName ? item.plaName : "No Place added" }})</td>
          <!-- <td>
            <ActivitySumary :sumId="item.sumId"></ActivitySumary>
          </td> -->
        </tr>
      </tbody>
    </table>
    </div>
    <div v-else>
      <div class="bg-primary p-3">No Information available</div>
    </div>
  </div>
</template>

<script>
import AvailabilityServices from "../../../../services/gps/availability/availabilityServices.js";

export default {
  props: ["avaid"],
  data() {
    return {
      sumid: [],
      days: [],
      conta: 0
    };
  },
  methods: {
    addconta() {
      return (this.conta += 1);
    },
    formatMeridian(meridian) {
      switch (meridian) {
        case "1":
          return "AM";
        case "2":
          return "PM";
      }
    },
    formatDay(day) {
      switch (day) {
        case "1":
          return "Monday";
        case "2":
          return "Tuesday";
        case "3":
          return "Wednesday";
        case "4":
          return "Thursday";
        case "5":
          return "Friday";
        case "6":
          return "Saturday";
        case "7":
          return "Sunday";
      }
    },

    getItinerariesbyAvailabilitys() {
      AvailabilityServices.getItinerariesbyAvailability(this.avaid)
        .then(response => {
          this.sumid = response.data.data;
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    }
  },
  mounted() {
    this.getItinerariesbyAvailabilitys();
  }
};
</script>
