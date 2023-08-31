<template>

  <div class="d-inline">

    <template>

      <b-button
        v-if="headerPercent"
        @click="showModal()" variant="outline-primary" class="d-inline border-0 font-weight-bold" size="sm"
        v-tooltip="{content: `${$t('gps.tooltips.click-update-percent')}`}">
        <a> <i class="glyph-icon simple-icon-pencil font-weight-bold"></i> </a>
      </b-button>

      <b-button
        v-if="headerPercent && formPercent && formReason"
        @click="setOriginalPercent()" variant="outline-primary" class="d-inline border-0 font-weight-bold" size="sm"
        v-tooltip="{content: `${$t('gps.tooltips.click-update-current')}`}">
        <a> <i class="glyph-icon simple-icon-tag font-weight-bold"></i> </a>
      </b-button>

    </template>

    <b-modal
      ref="itinerary-modal"
      centered
      :id="`modal-itinerary-${this.headerPercent}`"
      :title="`${$t('gps.current-percent')} : ${headerPercent}%`"
      ok-only
      ok-title="Close"
      ok-variant="secondary"
      header-bg-variant="light"
      header-class="p-3 justify-content"
      body-class="px-3 py-0"
      footer-class="p-3" size="xs"
    >

      <form enctype="multipart/form-data" class="row p-2">

        <div class="col-lg-12 form-group">
          <label for="titulo" class="control-label">Percent:
          </label>
          <input
            @keypress="onlyNumber"
            placeholder="Type new percent" v-model="formPercent" value="formPercent" name="formPercent" type="text"
            maxlength="2" id="formPercent" class="form-control" />
        </div>

        <div class="col-lg-12 form-group">
          <label for="titulo" class="control-label">Reason:
          </label>
          <b-textarea v-model="formReason" :rows="2" :max-rows="2" maxlength="200" placeholder="Type a reason for the percentage change"/>
        </div>
        <div class="col-lg-12 form-group">
          <center>
            <button
              class="btn btn-primary text_white btn-md btn-responsive px-6"
              :disabled="isEmptyForm"
              @click.prevent="confirm()"
            >
              Apply
            </button>
          </center>
        </div>


      </form>

    </b-modal>

  </div>

</template>

<script>

  import moment from "moment";

  var toastrConfigs = {
    position: "top right",
    showDuration: 2000,
  };

  export default {

    name: 'SlotsModalChangePercent',

    props: ["headerPercent"],

    data() {

      return {
        isLoading: false,
        now: moment().format("YYYY-MM-DD"),
        formPercent: "",
        formReason: "",
      }

    },

    computed: {

      isEmptyForm() {

        if ( this.formPercent == "" || this.formReason == "" )
           return true

        return false

      },


    },

    watch: {

    },

    mounted() {

    },

    created() {

    },

    methods: {

      clear() {
        this.formPercent = "";
        this.formReason = "";
      },

      showModal() {
        this.$refs['itinerary-modal'].show()
      },

      closeModal() {
        this.$refs['itinerary-modal'].hide()
      },

      confirm() {

        this.$swal({
          title: 'Are you sure to modify commission percentage?',
          text: `You are going to modify from ${this.headerPercent}% to ${this.formPercent}%`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, sure!',
          cancelButtonText: 'No, cancel!',
          confirmButtonColor: "#ED7117",
          reverseButtons: true
        }).then( result => {

          if (result.isConfirmed) {
            this.saveChanges();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            // Elimino el ultimo elemento del array para evitar el bucle
          }
        })
      },

      saveChanges() {
        this.$emit("addNewPercent", this.formPercent);
        this.$emit("changePercent", this.formPercent);
        this.$emit("addNewReason", this.formReason);
        this.$refs['itinerary-modal'].hide();
      },

      setOriginalPercent() {
        this.$emit("setOriginalPercent");
        this.$emit("addNewReason", "");
        this.$emit("addNewPercent", "");
        this.clear();
      },

      onlyNumber ($event) {

          let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
          if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
              $event.preventDefault();
          }
      },

    }

  }

</script>
