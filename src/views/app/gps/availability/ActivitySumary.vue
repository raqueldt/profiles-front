
<template>
  <div class="container p-0">
    <div
      v-for="element in rowdata"
      :key="element.sueId"
      class="justify-content-center align-self-center d-inline mt-1"
    >
    
         <img 
          width="18" height="18"
          v-if="element.activityName!=null || element.activityName!='' || !element"           
          :src="'../../../../../assets/img/atc/'+ formatActivity(element.activityName)" alt=""
          data-toggle="tooltip"
          data-placement="top"
          :title="element.activityName">  <!-- <span 
          
          v-if="element.activityName!=null || element.activityName!='' || !element"   
          >{{element.activityName}} </span>  -->
        <span v-else class="itin-acti"> No Activiy added </span>

    </div>
  </div>
</template>
<script>
import SummaryServices from "../../../../services/gps/summary/SummaryServices.js";

export default {
  props: ["sumId"],
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {},
  data() {
    return {
      rowdata: [],
    };
  },

  methods: {
    getschedule() {
      SummaryServices.getactivitiesbysummary(this.sumId)
        .then((response) => {
          this.rowdata = response.data.data;
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
     formatActivity(activity) {
      switch (activity) {
        case "Check Dive":
          return "checkdive.svg";
        case "Dive Scuba":
          return "scuba.svg";
        case "Snorkel":
          return "snorkel.svg";
        case "Hike":
          return "hike.svg";
        case "Kayak":
          return "kayak.svg";
        case "Panga Ride":
          return "panga.svg";
        case "Dive Night":
          return "scubanight.svg";
          case "paddle board":
          return "paddleboard.svg";
      }
    },
  },
  mounted() {
    this.getschedule();
  },
};
</script>

<style scoped>
/*img.itin-acti {
  width: 22% !important;  
}*/
</style>