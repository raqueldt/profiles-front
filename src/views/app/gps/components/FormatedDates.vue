<template>
  <div v-if="Boolean(startDate) && Boolean(endDate)" class="container">
    <!-- <div class="row justify-content-center"> -->
    <div class="row justify-text-mobile" :class="alignContent">
      <div class="d-flex date-departure mt-1">
        <div class="d-flex start-dates">
          <div class="d-flex">
            <div class="day align-self-start text-primary">
              {{ moment(startDate, "YYYY-MM-DD").format("DD") }}
            </div>
            <div class="month-year align-self-start">
              <div class="month">
                {{ moment(startDate, "YYYY-MM-DD").format("MMM YYYY") }}
              </div>
              <div>
                {{ moment(startDate, "YYYY-MM-DD").format("dddd") }}
                <br /><span class="mt-4 text-primary">START DATE</span>
              </div>
            </div>
          </div>
        </div>
        <div class="separator"></div>
        <div class="d-flex end-dates">
          <div class="d-flex">
            <div class="day text-primary">
              {{ moment(endDate, "YYYY-MM-DD").format("DD") }}
            </div>
            <div class="month-year">
              <div class="month">
                {{ moment(endDate, "YYYY-MM-DD").format("MMM YYYY") }}
              </div>
              <div>
                {{ moment(endDate, "YYYY-MM-DD").format("dddd") }}
                <br /><span class="mt-4 text-primary">END DATE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "FormatedDate",
  props: ["startDate", "endDate", "align"],
  components: {},

  data() {
    return {};
  },
  created() {},

  async mounted() {},
  computed: {
     alignContent() {
      // Paramentros enviados en prop: align==> start / center /end
      if(Boolean(this.align)) return `justify-content-${this.align}`
      else return 'justify-content-center'
        
      },
  },
  methods: {}
};
</script>

<style scoped lang="scss">


@media (max-width: 768px) {
 .justify-text-mobile{
    text-align: center !important;
    justify-content: center !important;
  }
}

</style>