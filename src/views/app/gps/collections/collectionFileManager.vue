<template>
  <div>
    <!-- ENCABEZADO -->
    <collection-header tag="gps.collections.file"></collection-header>
    <!-- FIN ENCABEZADO -->

    <b-container fluid>

      <b-row>
        <b-col>

          <b-card
            title="File Manager"
            no-body
            class="p-1"
          >
              <b-row>
                <b-col>
                  <v-select
                    :options="getClientes"
                    :reduce="cliente => cliente.id"
                    label="razon_social"
                    v-model="cliente"
                    class="custom-selects"
                    @input="handleUpdateParams"
                    >
                  </v-select>
                </b-col>

                <b-col >

                  <date-range-picker
                    :locale-data="locale"
                    v-model="dateRange"
                    @update="handleUpdateParams"
                    class="float-right customdate"
                    opens="left"
                  >
                      <template v-slot:input="picker" class="mt-1" style="min-width: 450px;">
                        <i class="glyph-icon simple-icon-calendar mr-3"></i>
                        {{ picker.startDate | date }} | {{ picker.endDate | date }}
                        <i class="fa fa-caret-down ml-3"></i>
                      </template>
                  </date-range-picker>


                </b-col>
              </b-row>
          </b-card>

          <b-card
            v-if="!getSelectedFile"
            class="mt-4"
            no-body
          >

            <b-card-body class="text-center">


              <b-img
                src="/assets/img/atc/empty-state/no_result_found.png"
                fluid
                alt="No result found"
                width="400"
              />


              <b-card-title><h1><strong>No results found</strong></h1></b-card-title>

              <b-card-text>
                Try adjusting you search options to find what you're looking for
              </b-card-text>


            </b-card-body>



          </b-card>



        </b-col>
      </b-row>



      <b-row >
        <b-colxx lg="3" class="pr-2">
            <collection-file-manager-filter></collection-file-manager-filter>
        </b-colxx>
        <b-colxx lg="9" class="pl-4">
            <collection-file-manager-tabs></collection-file-manager-tabs>
        </b-colxx>
      </b-row>
    </b-container>


  </div>
</template>
<script>

import DateRangePicker from 'vue2-daterange-picker'
import vSelect from 'vue-select'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import moment from 'moment'
export default {

  name: "CollectionFileManager",

  components: {
    DateRangePicker,
    vSelect
  },


  data() {
    return {

      dateRange: {
        startDate: new Date(),
        endDate: new Date()
      },

      cliente: null,
      start: null,
      end: null,

      idFileDefault: null,

      locale: {
        separator: ' - '
      },

    }
  },

  computed: {


    ...mapGetters('fileManager', ['getClientes', 'getFileManager', 'getSelectedFile']),

    clientIdCurrent() {

      const { c } = this.$route.query
      return parseInt(c)

    },

    fileIdCurrent() {

      const { f } = this.$route.query
      return parseInt(f)

    },

    startDateCurrent() {

      const { s } = this.$route.query
      return s ?? new Date()

    },

    endDateCurrent() {

      const { e } = this.$route.query
      return e ?? new Date()

    },

    today() {
      let today = new Date()
      today.setHours(0, 0, 0, 0)
      return today
    },


  },

  filters: {

    date(val) {
      return val ? moment(val).format("YYYY-MM-DD") : "";
    }

  },

  methods: {

    ...mapActions('fileManager',['loadFileManager', 'loadClientes']),

    ...mapMutations('fileManager', ['setSelectedFile']),


    async handleUpdateParams () {

      //actualizar rango local de consulta
      const { startDate, endDate } = this.dateRange
      this.start = moment(startDate).format("YYYY-MM-DD")
      this.end = moment(endDate).format("YYYY-MM-DD")

      // ejecutar carga de datos
      await this.loadData()

      // actualizar url
      const queryParams = {
         c: this.cliente,
         f: this.idFileDefault,
         s: this.start,
         e: this.end
      }

      //console.log("HANDLE UPDATE PARAMS", queryParams)
      //update url
      this.$router.push({ name: 'collection-file-manager', query: { ...queryParams } })


    },

    setParameters (){




      this.cliente = this.clientIdCurrent

      const dateRange = {
        startDate: moment().startOf('month').toDate(),
        endDate: moment().endOf('month').toDate()
      }

      this.dateRange = {...dateRange}

      this.start = this.startDateCurrent
      this.end = this.endDateCurrent

      //console.log("SET", dateRange)


    },

    async loadData () {

      if ( !this.cliente ) return

      // leer parametros actuales
      const params = {
          client: this.cliente,
          start: this.start,
          end: this.end
      }

      // cargar file manager
      await this.loadFileManager(params)

      // establecer id primer file encontrado
      const files = [...this.getFileManager]
      this.idFileDefault = files.length ? files[0]['cofId'] : 0;
      this.setSelectedFile(this.idFileDefault)

    }


  },
  mounted() {


  },

  async created() {

    // cargar clientes
    await this.loadClientes()

    // establecer parametros desde url
    await this.setParameters()

    // cargar data segùn parametros

    await this.loadData()


  },
};
</script>

<style scoped>
* >>>.customdate .form-control.reportrange-text {
    width: 255px !important;
    line-height: 25px;
    height: 36px !important;
}
</style>
