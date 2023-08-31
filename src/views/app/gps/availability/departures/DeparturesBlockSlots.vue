<template>
  <div class="container mt-1 bg-light">

    <b-list-group horizontal>

      <b-list-group-item v-for="(space, index_cabin) in slots.cabins" :key="index_cabin" class="space-li">

        <span >
          <b-colxx class="max-width info-status mx-1 bg-light">

            <div :class="space.decName+' deck-name'">
              <span style="cursor: pointer;" :id="`popover-target-${slots.depId}-${index_cabin}`">
                <small>{{ space.cabCode }}</small>
              </span>
            </div>

            <!-- Información de la cabina -->
            <b-popover :target="`popover-target-${slots.depId}-${index_cabin}`" :placement="'top'"
              variant="custom-info">

              <b-row>

                <b-col class="pr-0">
                  <b-img center src="https://picsum.photos/100/100/?image=1" alt="Cabin image" class="card-img-top">
                  </b-img>
                </b-col>

                <b-col class="text-cabin-info mt-2">

                  <p class="font-weight-medium mb-0">
                    <small>{{ $t("gps.deck") }}</small>
                    <small><strong>{{ space.decName }}</strong></small>
                  </p>

                  <p class="font-weight-medium mb-0">
                    <small>{{ $t("dashboards.category") }}:</small>
                    <small><strong>{{ space.cabinCategory }}</strong></small>
                  </p>

                  <p class="font-weight-medium mb-0">
                    <small>{{ $t("gps.capacity") }}:</small>
                    <small><strong>{{ space.cabMax }} pax</strong></small>
                  </p>

                </b-col>

              </b-row>

            </b-popover>


            <b-button-group size="xs" class="st">

              <template v-for="(item, index) in space.slots">

                <!-- {{item.bosStatus}} -->
                <b-button :variant="formatSlots(item.bosStatus)" :id="`popover-slot-${item.avsId}`"
                  :key="`popover-slot-${item.avsId}`+index" @click="openModal(item.avsId, item.bosStatus)">
                  {{  formatOrder(item.avsOrder) }}
                </b-button>

                <departures-block-slots-modal v-if="showModal" :avsId="avsId" :bosStatus="bosStatus" :key="index"
                  @closeModal=closeModal>
                  <h3 slot="header" class="modal-title">
                    {{ $t("gps.block-slots") }}
                  </h3>

                  <div slot="footer">
                    <button type="button" class="btn btn-primary" @click="closeModal()">
                      <i class="glyph-icon simple-icon-close"></i> {{ $t("gps.close") }}
                    </button>
                  </div>
                </departures-block-slots-modal>


                <!-- Información de bloqueos/confirmaciones -->
                <b-popover :target="`popover-slot-${item.avsId}`" triggers="hover" placement="top"
                  variant="custom-info space-info" v-if="item.bokId" :key="`popover-slot-${item.avsId}`">
                  <template #title>Booking Info {{ item.bokId }} {{ item.avsId }}</template>
                  <strong>{{ $t("gps.client") }}:</strong><span>#nombre cliente</span> <br>
                  <strong>Referencia: </strong><span>{{ item.bokReference }}</span>

                </b-popover>

              </template>

            </b-button-group>
          </b-colxx>

        </span>

      </b-list-group-item>

    </b-list-group>
  </div>
</template>

<script>

  export default {

    name: 'DeparturesSlots',

    props: ["slots"],

    data() {
      return {
        showModal: false,
        avsId: '',
        bosStatus: '',
      }
    },

    methods: {
      /* Modal */
      openModal(id, status) {
        this.showModal = true;
        this.avsId = id;
        this.bosStatus = status;
      },
      closeModal() {
        this.showModal = false;
        this.bosStatus = "";
        this.avsId = "";
        this.$emit('reload');
      },
      /*  End Modal */

      formatOrder(order) {
        switch (order) {
          case 1:
            return "A";
          case 2:
            return "B";
          case 3:
            return "C";
          case 4:
            return "D";
          default:
            return "No defined";
        }
      },
      formatSlots(status) {
        switch (status) {
          case 0:
            return "av"; //0. inhabilitado
          case 1:
            return "bl"; // 1. Bloqueado
          case 2:
            return "pb"; // 2. Confirmado
          case 3:
            return "av"; // 3. Cancelado (se libera el slot)
            // case 4:
            //   return "co";
            // case 5:
            //   return "cp"; 
            // case 6:
            //   return "al"; //allotment
            // case 7:
            //   return "dr"; //drydock
            // case 8:
            //   return "hi"; //hidden
          default:
            return "av";
        }
      },
    },
    mounted() {
      /* popover manuel close */
      this.$root.$on('bv::popover::show', () => {
        this.$root.$emit('bv::hide::popover')
      })
      document.addEventListener('click', e => {
        if (e.target.id.indexOf('popover-target-') === -1) {
          this.$root.$emit('bv::hide::popover')
        }
      })
    }
  }

</script>

<style lang="scss" scoped></style>
