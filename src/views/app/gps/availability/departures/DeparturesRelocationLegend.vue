<template>
  <div class="container-fluid mb-1">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <!-- <div class="card"> -->
          <div class="text-primary">
            {{ $t("gps.relocation.legend-slot") }}
          </div>

          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-lg-2">
                <b-button
                  class="space btn"
                  style="cursor:default"
                  id="popover-target"
                  disabled=""
                  variant="primary"
                  >{{ $t("gps.relocation.slot-to-be-relocated") }}
                </b-button>
              </div>
              <div class="col-lg-2">
                <b-button
                  class="space btn"
                  style="cursor:default"
                  id="popover-target"
                  disabled=""
                  variant="bl"
                  >{{ $t("gps.relocation.blocked-slot") }}
                </b-button>
              </div>
              <div class="col-lg-2">
                <b-button
                  class="space btn"
                  style="cursor:default"
                  id="popover-target"
                  disabled=""
                  variant="pb"
                  >{{ $t("gps.relocation.confirmed-slot") }}
                </b-button>
              </div>
              <div class="col-lg-2">
                <b-button
                  class="space btn"
                  style="cursor:default"
                  id="popover-target"
                  disabled=""
                  variant="av"
                  >{{ $t("gps.relocation.disabled-slot") }}
                </b-button>
              </div>
              <div class="col-lg-2">
                <b-button
                  class="space btn"
                  style="cursor:default"
                  id="popover-target"
                  disabled=""
                  variant="al"
                  >{{ $t("gps.relocation.allotment-slot") }}
                </b-button>
              </div>
            </div>
            <small class="text-muted">{{ $t("gps.relocation.relocate-message") }}</small>
          </div>

        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeparturesRelocationLegend",
  data() {
    return {};
  },

  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
