<template>
  <transition name="modal">
    <div class="modal modal-mask" style="display: block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>

            <b-form-group class="h6" label="Select status" v-slot="{ ariaDescribedby }">
              <b-form-radio-group id="btn-radios" v-model="selectedValue" :options="status"
                :aria-describedby="ariaDescribedby" button-variant="outline-secondary" size="xs" value-field="id"
                text-field="status" name="radio-btn-outline" buttons></b-form-radio-group>
            </b-form-group>

            <!-- Selected: {{selectedValue}} <br> -->
            <b-button variant="success" block squared class="mt-4" @click="updateStatus()">
              <i class="glyph-icon simple-icon-check"></i> Update status
            </b-button>

          </div>

          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BookingSlotsServices from "../../../../../services/gps/bookingslots/BookingSlotsServices.js";

  export default {
    name: 'departures-block-slots-modal',
    props: ['avsId', 'bosStatus'],
    data() {
      return {
        selectedValue: this.bosStatus,
        default: null,
        status: [{
            id: 0,
            status: 'No available',
            value: false
          },
          {
            id: 1,
            status: 'Blocked',
            value: false
          },
          {
            id: 2,
            status: 'Confirmed',
            value: false
          },
          {
            id: 3,
            status: 'Released',
            value: false
          },
          {
            id: null,
            status: 'Available',
            value: false
          }
        ],
      }
    },
    watch: {

    },
    async mounted() {

    },
    methods: {
      updateStatus() {
        let avsId = this.avsId;
        let data = {
          status: this.selectedValue,
        };
        BookingSlotsServices.updateStatus(avsId, data)
          .then((response) => {
            this.$emit('closeModal');
            this.notify();
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
        // .finally(() => );
      },
      notify() {
        var type = "success filled";
        var title = "Success";
        var mensaje = "Status updated successfully";
        this.$notify(type, title, mensaje, {
          duration: 3000,
          permanent: false,
        });
      },

    }
  }

</script>
<style scoped>
  .table-responsive {
    overflow-x: hidden;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .info-status > div {
    font-size: 0.70rem !important;
  }

</style>
