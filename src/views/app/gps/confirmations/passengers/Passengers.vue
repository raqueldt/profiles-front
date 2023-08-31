<template>

  <div>

    <b-row>



      <b-colxx xxs="12">

          <div class="border-contenttab pt-2 pl-2 pr-2">

          <b-row>
            <b-col cols="9" class="mt-3">

              <div class="mb-2">

                <b-button-group class="mb-2">

                  <b-button
                      v-b-modal="'passenger-create-modal'"
                      variant="outline-primary"
                      size="sm"

                  >
                    Create non-cruise passenger
                  </b-button>

                  <!-- 2023-02-17 | funcionalidad reemplazada por proceso 'edit booking'  -->
                  <!--
                  <b-button variant="outline-primary"
                    @click="addPaxAvailability"
                    size="sm">
                      {{ $t('gps.pax.add-pax') }}

                  </b-button>
                  -->

                </b-button-group>




              </div>

            </b-col>

            <b-col cols="3" class="mt-3 text-right">
                <button class="btn btn-header-light icon-button" @click="initListaPasajeros">
                    <i class="simple-icon-refresh" />
                </button>
            </b-col>

          </b-row>

    <!--pre>{{getPassengers}}</pre-->

            <b-table

              bordered
              hover
              small
              responsive="sm"
              head-variant="light"

              :items="getPassengers"
              :fields="fields"

              :busy="isLoading"

              :tbody-tr-class="rowClass"

            >

              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>

              <template #cell(Indice)="data">
                  <span :title="data.item.created_at">{{ data.item.Indice }}</span>
              </template>

              <template #cell(lpaNombre)="data">
                <span v-html="fullNameFormat(data)"></span>
              </template>

              <template #cell(lpaDob)="data">
                <span>
                  {{ dateFormat(data.item.lpaDob) }}
                </span>
              </template>

              <template #cell(_actions)="row">
<!-- {{row.item}} -->
                <passenger-edit
                    :indice="row.item.lpaId"
                    v-if="row.item.lpaEstado"
                />
                <span v-else>
                    <b-badge variant="light">Cancelled</b-badge>
                </span>

              </template>

            </b-table>


          </div>

      </b-colxx>


      <passenger-modal
        :cof-id="cofIdCurrent"
      />


    </b-row>

  </div>
</template>

<script>

import Vuetable from "vuetable-2/src/components/Vuetable"
import VuetablePaginationBootstrap from "@/components/Common/VuetablePaginationBootstrap"

import moment  from 'moment'

import PassengerEdit from "@/views/app/gps/confirmations/passengers/PassengerEdit"
import PassengerModal from "@/views/app/gps/confirmations/passengers/PassengerModal"

import BookingSlotsServices from "@/services/gps/bookingslots/BookingSlotsServices"

import { mapGetters, mapActions, mapState  } from 'vuex'


export default {

  name: 'Passengers',

  components: {

    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,

    PassengerEdit,
    PassengerModal,

  },

  data() {

    return {

      availability: {

        bokId: null,
        depId: null,
        clientId: null,

      },

      lpaIdSelected: null,

      fields: [

        {
          key: "Indice",
          sortable: true,
          label: "",
          class: 'text-center',
          thClass: 'text-center'

        },
        {
          key: "lpaNombre",
          sortable: true,
          label: "Name",
          class: 'pl-3',
          thClass: 'text-center'
        },
        {
          key: "avsTag",
          sortable: true,
          label: "Slot",
          class: 'text-center',
          thClass: 'text-center'
        },
        {
          key: "lpaNumeroPasaporte",
          sortable: true,
          label: "Passport",
          class: 'pl-3',
          thClass: 'text-center'
        },
        {
          key: "lpaDob",
          sortable: true,
          label: "DOB",
          class: 'pl-2',
          thClass: 'text-center'
        },
        {
          key: "age",
          sortable: true,
          label: "Age",
          class: 'text-center',
          thClass: 'text-center'
        },
        {
          key: "lpaGrupo",
          sortable: true,
          label: "Group",
          class: 'text-center',
          thClass: 'text-center'
        },
        {
          key: "lpaNotas",
          sortable: true,
          label: "Note",
          class: 'text-center',
          thClass: 'text-center'
        },
        {
          key: "_actions",
          class: 'text-center',
          thClass: 'text-center'
        }
      ],

    }
  },

  computed: {

    ...mapGetters('pasajeros', ['getPassengers']),

    ...mapState('pasajeros', ['isLoading']),

    selectedPax() {
      return this.lpaIdSelected || 0
    },

    cofIdCurrent() {

      const { cofId } = this.$route.params

      return parseInt(cofId)
    },





  },

  methods: {

    ...mapActions('pasajeros',['loadPassengers']),

    addPaxAvailability() {

      const { bokId, depId, clientId } = this.availability

      // this.$router.push({
      //                     name: 'SlotsParentEdit',
      //                     params: { bokId, depId, clientId },
      //                     query: { c: this.cofIdCurrent, m: 'add'  }
      //                 })

      this.$router.push({
                          name: 'SlotsParentEdit',
                          params: { bokId, depId, clientId },
                          query: { c: this.cofIdCurrent, m: ''  }
                      })

    },

    async setAvailabilityParams() {


      const pax = this.getPassengers.find(pax => pax.bosId != null)

      const {data} = await BookingSlotsServices.getBookingEditParams(pax.bosId)

      this.availability.depId = data.data.depId
      this.availability.bokId = data.data.bokId
      this.availability.clientId = data.data.bokClientId

    },

    async initListaPasajeros() {

       const confirmacion = this.cofIdCurrent

       await this.loadPassengers(confirmacion)

       this.setAvailabilityParams()

    },

    dateFormat(date) {

       //return date ? moment(date, "YYYY-MM-DD").format( "YYYY-MM-DD" ): null
       return date ? moment(date, "YYYY-MM-DD").format( "ddd, MMM DD YYYY" ): null
    },

    fullNameFormat(data) {

       let commaCharacter = data.item.lpaApellido ? ', ' : ''
       let genero = data.item.Genero ? data.item.Genero+' ' : ''
       let apellido = data.item.lpaApellido ? data.item.lpaApellido : ''
       let nombre = data.item.lpaNombre ? data.item.lpaNombre : ''

       return `${genero}<b>${apellido}</b>${commaCharacter}${nombre}`

    },

    rowClass( item, type) {
        if (!item || type !== 'row') return
        if (item.lpaEstado != 1) return 'table-danger'
    }


  },

  created(){

     this.initListaPasajeros()



  }




}

</script>


