<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <div v-for="(it, key) in infordeck" :key="key">
        <b-carousel-slide
          class="caption-class"
          v-if="Boolean(it.arcPath)"
          :key="it.decId"
          :img-src="getUrlDeckImage(it.arcPath)"
          :caption="it.decName"
        >
        </b-carousel-slide>

        <b-carousel-slide
          v-else
          :key="it.decId"
          :img-src="getUrlDecksDefaultImage()"
          :caption="it.decName"
        ></b-carousel-slide>
      </div>
    </b-carousel>
  </div>
</template>

<script>
/* *** SERVICES *** */
import BookingServices from "../../../../services/gps/booking/BookingServices.js";
import FileboxServices from "@/services/gps/filebox/FileboxServices.js";
import Conf from "../../../../services/conf";
export default {
  name: "modalrates",
  props: ["dep_id"],
  data() {
    return {
      infordeck: [],
      currentDeckName: "",
      server: Conf.servergps,
      slide: 0,
      sliding: null
    };
  },
  filters: {},
  computed: {},
  methods: {
    //VISTA

    onSlideStart(slide) {
      console.log("Slide: " + slide);
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },

    getinformationdecks() {
      BookingServices.getinformationdeck(this.dep_id)
        .then(response => {
          this.infordeck = response.data.data;
          //console.log(this.infordeck);
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    },
    getUrlDeckImage(path) {
      let url = FileboxServices.serverUrl + path;
      return url;
    },
    getUrlDecksDefaultImage() {
      let url = FileboxServices.urlDefaulImages + "deckDefault.jpg";
      return url;
    }
  },
  async mounted() {
    await this.getinformationdecks();
  }
};
</script>

<style lang="scss">
.carousel-control-prev-icon,
.carousel-control-next-icon {
  height: 25px !important;
  width: 25px !important;
}

.carousel-control-prev-icon {
  margin-left: -133px;
}

.carousel-control-next-icon {
  margin-right: -133px;
}

.carousel-control-prev-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%22ff0000' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E") !important;
}
.carousel-control-next-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%22ff0000' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E") !important;
}

.caption-class {
  width: 100%;
  object-fit: cover;
  margin-bottom: 55px;
  padding-bottom: 20px;
}
</style>
