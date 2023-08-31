<template>
  <div class="card m-0 p-0">
    <!-- Cabeceras de la tabla de disponibilidad -->
    <!-- head-departures -->
    <b-container fluid class=" b-border-bottom pt-1 mt-0">
      <div class="table-responsive">
      <b-table        
        :items="departures"
        :fields="fields"
        bordered
        show-empty
        responsive
        small
        caption-top
        class="my-table table-fit"
        table-class="text-nowrap"
        id="newAvailability"
      >
        <template v-slot:head(send-option)="data">
          <div class="text-center align-self-center">
            <!-- {{ data.label }} -->

            <i class="glyph-icon iconsminds-mail-forward titulo-cabecera"></i>
          </div>
        </template>
        <template v-slot:head(yacht)="data">
          <div class="text-center align-self-center titulo-cabecera">{{ data.label }}</div>
        </template>
        <template v-slot:head(departure)="data">
          <div class="text-center titulo-cabecera">{{ data.label }}</div>
        </template>
        <template v-slot:head(itinerary)="data">
          <div class="text-center titulo-cabecera">{{ data.label }}</div>
        </template>
        <template v-slot:head(available)="data">
          <div class="text-center titulo-cabecera">{{ data.label }}</div>
        </template>
        <template v-slot:head(hold)="data">
          <div class="text-center titulo-cabecera">{{ data.label }}</div>
        </template>
        <template v-slot:head(prices)="data">
          <div class="text-center titulo-cabecera">{{ data.label }}</div>
        </template>
        <template v-slot:head(cabins-distribution)="data">
          <!-- <div class="text-center">{{ data.label }}</div> -->

          <template>
            <b-row class="justify-content-center align-items-center cabin-distribution-mobile">
              <b-col lg="4">
                <span class="d-block titulo-cabecera">{{
                  $t("gps.availability-labels.cabin-distribution")
                }}</span>
              </b-col>
              <b-col lg="5">
                <!-- LEYENDA DECKS -->
                <b-row class="w-100">
                  <b-col>
                    <div
                      class="rounded"
                      style="background-color:#72b4dc; width: 15px;height: 15px;"
                    >
                      <span class="ml-4 d-inline-block" style="color:#72b4dc; ">Lower</span>
                    </div>
                  </b-col>
                  <b-col>
                    <div
                      class="rounded"
                      style="background-color:#003260; width: 15px;height: 15px;">
                      <span class="ml-4 d-inline-block" style="color:#003260">Main</span>
                    </div>
                  </b-col>
                  <b-col>
                    <div
                      class="rounded"
                      style="background-color:#00a4d6; width: 15px;height: 15px;"
                    >
                      <span class="ml-4 d-inline-block" style="color:#00a4d6">Upper</span>
                    </div>
                  </b-col>
                </b-row>
                <!-- FIN LEYENDA DECKS -->
              </b-col>
            </b-row>
          </template>

          <!-- FIN LEYENDA DECKS -->
        </template>
        <template v-slot:head(request)="data">
          <div class="text-center titulo-cabecera">{{ data.label }}</div>
        </template>

        <!-- ---------------------------------- CONTENIDO  ----------------------------------  -->
        <template #cell(send-option)="row">
          
          <departures-checkbox
            :departure="row.item"
            :selected="selectedDeparturesFromChild.map(x => x.depId)"
            @selectedDepartures="selectedDepartures"
          >
          </departures-checkbox>
        </template>
        <template #cell(yacht)="row">
          <div
            class="m-0 p-0"
            :class="
              selectedDeparturesFromChild
                .map(x => x.depId)
                .some(f => f === row.item.depId)
                ? 'selected-row'
                : ''
            "
          >
            <departures-yacht
              :departure="row.item"
              :selected="selectedDeparturesFromChild.map(x => x.depId)"
              @selectedDepartures="selectedDepartures"
            >
            </departures-yacht>
          </div>
        </template>
        <template #cell(departure)="row">
          <departures-dates
            :departure="row.item"
            :selected="selectedDeparturesFromChild.map(x => x.depId)"
            @selectedDepartures="selectedDepartures"
          >
          </departures-dates>
        </template>
        <template #cell(itinerary)="row">
          <departures-itinerary
            :departure="row.item"
            :selected="selectedDeparturesFromChild.map(x => x.depId)"
            @selectedDepartures="selectedDepartures"
          >
          </departures-itinerary>
        </template>
        <template #cell(available)="row">
          <template v-if="isDepartureReady(row.item)">
            <departures-available :departure="row.item"> </departures-available>
          </template>
        </template>
        <template #cell(hold)="row">
          <template v-if="isDepartureReady(row.item)">
            <departures-on-hold :departure="row.item"> </departures-on-hold>
          </template>
        </template>
        <template #cell(prices)="row">
          <template v-if="isDepartureReady(row.item)">
            <div :class="Number(row.item.depFixedDiscountRate)  > 0 ? 'alert-danger' : ''"
              data-toggle="tooltip" 
              data-placement="top" 
              :title="Number(row.item.depFixedDiscountRate)  > 0 ?  `Fixed commission last minute: ${row.item.depFixedDiscountRate} %` : ''">
              <departures-prices-table :departure="row.item">
              </departures-prices-table>
            </div>
          </template>
        </template>
        <template #cell(cabins-distribution)="row">
          <template v-if="isDepartureReady(row.item)">
            <departures-distribution-table
              :departure="row.item"
              @reload="reload"
            >
            </departures-distribution-table>
          </template>
          <template v-else>
            <b-col md="12" align-self="center" class="py-2">
              <!-- dry dock -->
              <template v-if="row.item.depStatus == 2">
                <span class="text-muted">
                  <small>
                    <b-icon icon="tools" />
                    {{ $t("gps.availability-view.dry-dock-departure") }}
                    <b-icon icon="tools" />
                  </small>
                </span>
              </template>

              <!-- not available -->
              <template v-else>
                <span class="text-muted">
                  <small>
                    <b-icon icon="calendar2-x" />
                    {{ $t("gps.availability-view.disabled-departure") }}
                    <b-icon icon="calendar2-x" />
                  </small>
                </span>
              </template>
            </b-col>
          </template>
        </template>
        <template #cell(request)="row">
          <departures-request :departure="row.item"> </departures-request>
        </template>
      </b-table>
    </div>
    </b-container>

    <div class="card-body pt-0 pb-3 mt-1" v-if="departures.length > 0">
      <!-- MODAL Y BOTÓN PARA MOSTRAR OPCIONES DE DEPARTURES SELECCIONADOS -->

      <b-modal
        id="modalsendoptions"
        size="lg"
        ref="modalsendoptions"
        :title="'Send options'"
      >
        <ModalonAvailability
          :selectedDepartures="selectedDeparturesFromChild"
        ></ModalonAvailability>
        <template slot="modal-footer">
          <b-button
            variant="secondary"
            @click="hideModal('modalsendoptions')"
            >{{ $t("gps.close") }}</b-button
          >
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "AvailabilityDepartures",
  props: ["departures", "cleanSelectedDeparturesClick"],
  data() {
    return {
      selectedDeparturesFromChild: [],
      fields: [
        {
          key: "send-option",
          label: "",
          // tdClass: "align-middle text-center",
          tdClass: (value, key, item) => {
            var arraySelectedDepartures = Array.from(this.selectedDeparturesFromChild.map(x => x.depId));
            if(arraySelectedDepartures.includes(parseInt(item.depId)) ) return 'align-middle  text-center bg-selected'
            else  return 'align-middle  text-center';
          },
          thClass: "align-middle text-center",
          // thStyle: { width: "0.2% !important" }
          // thStyle: { maxWidth: "0.2% !important" }
        },
        {
          key: "yacht",
          label: "Yacht",
          // tdClass: "align-middle bg-success",
          tdClass: (value, key, item) => {
            var arraySelectedDepartures = Array.from(this.selectedDeparturesFromChild.map(x => x.depId));
            if(arraySelectedDepartures.includes(parseInt(item.depId)) ) return 'align-middle bg-selected'
            else  return 'align-middle';
          },
          thClass: "align-middle",
          // thStyle: { width: "2% !important" }
        },
        {
          key: "departure",
          label: "Departure",
          tdClass: "p-0 m-0 align-middle",
          // 
          tdClass: (value, key, item) => {
            var arraySelectedDepartures = Array.from(this.selectedDeparturesFromChild.map(x => x.depId));
            if(arraySelectedDepartures.includes(parseInt(item.depId)) ) return 'align-middle bg-selected'
            else  return 'align-middle';
          },
          thClass: "align-middle",
          // thStyle: { width: "12%  !important" }
        },
        {
          key: "itinerary",
          label: "Itinerary",
          thClass: "align-middle",
          // tdClass: "p-0 m-0 align-middle",
          tdClass: (value, key, item) => {
            var arraySelectedDepartures = Array.from(this.selectedDeparturesFromChild.map(x => x.depId));
            if(arraySelectedDepartures.includes(parseInt(item.depId)) ) return 'p-0 m-0 align-middle bg-selected'
            else  return 'p-0 m-0 align-middle';
          },
          // thStyle: { width: "1%" }
        },
        {
          key: "available",
          label: "Available",
          thClass: "align-middle",
          // tdClass: "p-0 m-0 align-middle",
          tdClass: (value, key, item) => {
            var arraySelectedDepartures = Array.from(this.selectedDeparturesFromChild.map(x => x.depId));
            if(arraySelectedDepartures.includes(parseInt(item.depId)) ) return 'p-0 m-0 align-middle bg-selected'
            else  return 'p-0 m-0 align-middle';
          },
          // thStyle: { width: "1%" }
        },
        {
          key: "hold",
          label: "Hold",
          thClass: "align-middle",
          // tdClass: "p-0 m-0 align-middle",
          tdClass: (value, key, item) => {
            var arraySelectedDepartures = Array.from(this.selectedDeparturesFromChild.map(x => x.depId));
            if(arraySelectedDepartures.includes(parseInt(item.depId)) ) return 'p-0 m-0 align-middle bg-selected'
            else  return 'p-0 m-0 align-middle';
          },
          // thStyle: { width: "2%" }
        },
        {
          key: "prices",
          label: "Prices",
          thClass: "align-middle",
          // tdClass: "p-0 m-0 align-middle",
          tdClass: (value, key, item) => {
            var arraySelectedDepartures = Array.from(this.selectedDeparturesFromChild.map(x => x.depId));
            if(arraySelectedDepartures.includes(parseInt(item.depId)) ) return 'p-0 m-0 align-middle bg-selected'
            else  return 'p-0 m-0 align-middle';
          },
          // thStyle: { width: "10%" }
        },
        {
          key: "cabins-distribution",
          label: "Cabins distribution",
          thClass: "align-middle cabin-distribution-mobile",
          // tdClass: "p-0 m-0 align-middle",
          tdClass: (value, key, item) => {
            var arraySelectedDepartures = Array.from(this.selectedDeparturesFromChild.map(x => x.depId));
            if(arraySelectedDepartures.includes(parseInt(item.depId)) ) return 'p-0 m-0 align-middle bg-selected'
            else  return 'p-0 m-0 align-middle cabin-distribution-mobile';
          },
          // thStyle: { width: "40%" }
        },
        {
          key: "request",
          label: "WL/ Request",
          thClass: "align-middle",
          // tdClass: "p-0 m-0 align-middle",
          tdClass: (value, key, item) => {
            var arraySelectedDepartures = Array.from(this.selectedDeparturesFromChild.map(x => x.depId));
            if(arraySelectedDepartures.includes(parseInt(item.depId)) ) return 'p-0 m-0 align-middle bg-selected'
            else  return 'p-0 m-0 align-middle ';
          },
          // thStyle: { width: "3%" }
        }
      ]
    };
  },
  watch: {
    selectedDeparturesFromChild: {
        deep:true,
        handler(val){ 
          this.$emit('selectedDeparturesFromChild', val)
        },
    },
    cleanSelectedDeparturesClick: {
        deep:true,
        handler(val){ 
          this.cleanSelectedDepartures()
        },
    },
  },
  computed: {},
  methods: {
    selectedDepartures(data) {
      var index = this.selectedDeparturesFromChild.findIndex(function(element) {
        return element.depId === data.depId;
      });
      if (index > -1) {
        this.selectedDeparturesFromChild.splice(index, 1);
      } else {
        this.selectedDeparturesFromChild.push(data);
      }

      //OPCION 2:
      // var depId = data.depId;
      // var index = this.selectedDeparturesFromChild.findIndex(function(element) { return element.depId === data.depId });
      // var checkDepIdInArray = this.selectedDeparturesFromChild.some(e => e.depId === depId);
      // if(Boolean(checkDepIdInArray)) this.selectedDeparturesFromChild.splice(index, 1);
      // else this.selectedDeparturesFromChild.push(data);

      //return this.selectedDeparturesFromChild.includes(data.depId)
    },
    cleanSelectedDepartures() {
      this.selectedDeparturesFromChild = [];
    },

    reload() {
      this.$emit("reload");
    },

    isDepartureReady(departure) {
      if (departure.depStatus != "1") return false;

      return true;
    },

    departureStatus(status) {
      if (status == "2") return "Dry dock";
      return "Not available";
    },

    hideModal(refname) {
      this.$refs[refname].hide();
    }
  }
};
</script>

<style scoped>
.no-gutter {
  -webkit-box-shadow: inset 0px -3px 6px 0 #dddddd56;
  box-shadow: inset 0px -3px 6px 0 #dddddd56;
}
.no-gutter3 {
  -webkit-box-shadow: inset inset 0px 4px 4px 0 #dddddd56;
  box-shadow: inset 0px 4px 6px 0 #dddddd56;
}

/* .selected-row {
   background-color: gray !important;
  border:solid 2px green;
  opacity: 0.9;
  transition: all 0.3s ease;
  transform: scale(1.003);
  width: 100%;
} */

* >>>.bg-selected {
  background-color: #F3F1F1!important;
}

.estilo_cabecera {
  margin-left: -20px !important;
}

#circle {
  float: left;
  width: 15px;
  height: 15px;
  margin: 20px;
  shape-outside: circle(50% at 30%);
  clip-path: circle(50% at 0%);
  background: lightblue;
}

.titulo-cabecera {
  color: #18466f !important;
}

.size-text {
  font-size: 12px;
}

@media only screen and (min-width: 1492px) {
  .estilo_cabecera {
    margin-left: -37px !important;
  }
}

@media only screen and (min-width: 1900px) {
  .estilo_cabecera {
    margin-left: -57px !important;
  }
}

@media only screen and (max-width: 1024px) {
  .responsive-prices {
    text-align: left !important;
    padding: 0 !important;
    margin: 0 !important;
  }
}
</style>
