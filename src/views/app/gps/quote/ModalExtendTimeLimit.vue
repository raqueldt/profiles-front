<template>

  <b-row class="pt-4 pb-4">
    
    <b-colxx xs="4">
      <label class="form-group has-float-label">
        <input
          v-model="this.totalbookingtime"
          type="text"
          disabled
          class="form-control"
        />
        <span>Actual Time Limit </span>
      </label>
    </b-colxx>
    <b-colxx xs="4">
    <label class="form-group has-float-label">
        <input
          v-model="newtimelimit"
          type="date"
          class="form-control"
            :min="totalbookingtime"
        />
        <span>New Time Limit </span>
       </label>
    </b-colxx>
    <b-colxx xs="4">
      <b-button v-if="newtimelimit" variant="success default" @click="SaveCategory()"
        >Extend Time Limit</b-button
      >
    </b-colxx>
  </b-row>
</template>
<script>
import IconCard from "../../../../components/Cards/IconCard";
import BookingServices from "../../../../services/gps/booking/BookingServices.js";
import moment from "moment";
export default {
  name: "modalnotequote",
  props: ["bokId","totalbookingtime"],
  components: {
    "icon-card": IconCard,
  },
  data() {
    return {
      newtimelimit: "",
      totalbooking: "",
    
    };
  },
  filters: {},
  computed: {
       userId() {
      return this.$root.$loggedUserId;
    },
  },
  methods: {
    SaveCategory() {
      let data = {
        newtimelimite: this.newtimelimit,
        bokingid: this.bokId,
        timelimitactual: this.tlactual,
        usuarioId:this.userId,
      };
      let self = this;
       if (confirm("Do you really extend?")) {
      BookingServices.updatejusttimelimit(data)
        .then((response) => {
          let mensaje = response.data.data;
          if (mensaje == "OK") {
            var type = "success filled";
            var title = "Extended";
            var message = "Time Limit";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
       
             this.$emit('updateQuoteAdmin', 1);
          } else {
            var title = "Category";
            var message = "NO add";
            this.$notify(type, title, message, {
              duration: 3000,
              permanent: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
        }
    },

    getinforslotsbybooking() {
      BookingServices.getinforslotsbybooking(this.bokId)
        .then((response) => {
          this.totalbooking = response.data.data;
          //console.log(this.totalbooking);
          //this.totalbookingtime=(this.totalbooking[0][0]['bokTimeLimit'])
      
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
  },

  mounted() {
    this.getinforslotsbybooking();
  },
};
</script>


