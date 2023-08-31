<template>
  <div class="container-fluid">

    <div class="row justify-content-center">
      <div class="col-lg-12">       
            <quote-preview :cotId="cotId" v-if="cotId"></quote-preview>
      </div>
    </div>

    <!-- <div class="w-100 text-center">
        <b-button
                class="mt-2"
                variant="link"
                @click="returnToAvailability()"
                data-toggle="tooltip"
                data-placement="top"
                title="Click here to return to Availability"
              > -->
                <!-- <div class="glyph-icon simple-icon-action-undo d-inline"></div> -->
                 <!-- Return to Availability
              </b-button> -->

              <!-- <b-button
                class="mt-2"
                variant="link"
                @click="gotogroupquote(data.item.grupoId)"
                data-toggle="tooltip"
                data-placement="top"
                title="Click here to return to Availability"
              > -->
                <!-- <div class="glyph-icon simple-icon-action-undo d-inline"></div> -->
                 <!-- Return to Quote
              </b-button> -->

    <!-- </div> -->

  </div>
</template>

<script>
export default {
  name: "SlotsPreview",
  props: ["cotId"],
  data() {
    return {};
  },

  methods: {
    returnToAvailability() {
      this.$router.push({ name: "newAvailability" });
    },

    gotogroupquote(gctId) {
      let routeData = this.$router.resolve({
        name: "quote",
        params: { gctId: gctId },
      });
      window.open(routeData.href, "_blank");
    }


  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
