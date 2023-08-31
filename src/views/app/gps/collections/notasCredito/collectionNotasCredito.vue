<template>
  <b-container fluid>
    <!-- ENCABEZADO -->
    <collection-header tag="gps.collections.dashboard"></collection-header>
    <!-- FIN ENCABEZADO -->

    <b-card no-body>
      <b-row class="my-1 w-100 justify-content-center align-items-center">
        <b-col lg="8">

        </b-col>

        <b-col lg="3">

          <date-range-picker :locale-data="locale" v-model="dateRange"
            class="float-right customdate" opens="left">
            <template v-slot:input="picker" class="mt-1" style="min-width: 450px;">
              <i class="glyph-icon simple-icon-calendar mr-3"></i>
              {{ customDate(picker.startDate) }} | {{ customDate(picker.endDate)  }}
              <i class="fa fa-caret-down ml-3"></i>
            </template>
          </date-range-picker>

        </b-col>
        <b-col lg="1" class="text-center">
          <b-button @click="getNotasCredito" class="border-0" size="xs" variant="light"
            data-toggle="tooltip" data-placement="top" title="Refresh">
            <i class="glyph-icon simple-icon-refresh"></i>
          </b-button>
        </b-col>
      </b-row>
    </b-card>


    <b-card class="shadow" no-body>

      <component :is="filtered.length > 2 ? 'vue-perfect-scrollbar' : 'div' "
        :class='filtered.length > 2 ? "scroll-area" : ""'
        :settings="{ suppressScrollX: true, wheelPropagation: false }">

        <b-table :items="filtered" :fields="fields" striped show-empty hover responsive="lg" class="my-table" >

          <!-- MENSAJE DATOS VACIOS -->
          <template #empty="scope">
            <center v-if="scope">
              <span class="text-center">No existen registros disponibles</span>
            </center>
          </template>

          <!-- CHILD ROW -->
          <template #cell(show_details)="row">
            <b-button size="sm" @click="editNotaCredito(row.item.devId, row)" class="mr-2">
              {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
            </b-button>
          </template>

          <template #row-details="row">

            <b-card>
              <form>
                <b-row class="mt-2">
                  <b-colxx class="pl-4 pr-0">
                    <b-input-group>
                      <div class="form-group has-float-label custom-selects ">
                        <v-date-picker mode="date" is24hr v-model="creditNote.devFecha" :min="nowDate">
                          <template v-slot="{ inputValue, inputEvents }">
                            <input class="form-control" :value="inputValue" v-on="inputEvents" />
                          </template>
                        </v-date-picker>
                        <span>Fecha</span>
                      </div>
                    </b-input-group>
                  </b-colxx>
                  <b-colxx md="6" class="pl-1 pr-0">
                    <b-input-group>
                      <div class="form-group has-float-label custom-selects ">
                        <b-form-input type="text" class="text-class-form amount" v-model="creditNote.devReferencia"
                          maxlength="30"></b-form-input>
                        <span>Detalle</span>
                      </div>
                    </b-input-group>
                  </b-colxx>
                  <b-colxx md="3" class="pl-1 pr-4">
                    <b-input-group>
                      <div class="form-group has-float-label custom-selects ">
                        <b-form-input type="number" min="0" class="text-class-form fess" v-model="creditNote.devMonto">
                        </b-form-input>
                        <span>Monto</span>
                      </div>
                    </b-input-group>
                  </b-colxx>
                </b-row>
                <b-row>
                  <b-col cols="12" class="pr-4 mt-2">

                    <div class="d-flex justify-content-end">
                      <b-button squared size="sm" @click="row.toggleDetails">Cerrar</b-button>
                      <b-button squared variant="success" size="sm" @click="updateNotaCredito" :disabled="isSaving">
                        Aplicar
                      </b-button>
                    </div>

                  </b-col>
                </b-row>

              </form>
            </b-card>

          </template>

          <!-- FILTROS -->
          <template slot="top-row" slot-scope="{ fields }">
            <td v-for="field in fields" :key="field.key">
              <template v-if="field.key === 'nombreCliente'">

                <b-form-select v-model="filters['nombreCliente']" :options="clientes" class="height-filters rounded"
                  value-field="razon_social" text-field="razon_social" size="xs">

                  <template #first>
                    <b-form-select-option value="">-- Todos --</b-form-select-option>
                  </template>

                </b-form-select>

              </template>
              <template v-if="field.key === 'cofReferencia'">
                <b-form-input type="text" v-model="filters['cofReferencia']" :placeholder="field.label" size="sm" class="height-filters rounded"/>
              </template>
              <template v-if="field.key === 'devReferencia'">
                <b-form-input type="text" v-model="filters['devReferencia']" :placeholder="field.label" size="sm" class="height-filters rounded"/>
              </template>
              <template v-if="field.key === 'nombreUsuario'">
                <b-form-input type="text" v-model="filters['nombreUsuario']" :placeholder="field.label" size="sm" class="height-filters rounded"/>
              </template>
              <!-- <template v-if="field.key === 'detalle'">
                <b-form-input type="text" v-model="filters['detalle']" :placeholder="field.label" size="sm" class="height-filters rounded"/>
              </template>               -->
                         
            </td>
          </template>

          <!-- CABECERA -->
          <template v-slot:head(nombreCliente)="data">
            <div class="text-center">{{ data.label }}</div>
          </template>
          <template v-slot:head(cofReferencia)="data">
            <div class="text-center">{{ data.label }}</div>
          </template>
          <template v-slot:head(devReferencia)="data">
            <div class="text-center">{{ data.label }}</div>
          </template>
          <template v-slot:head(devMonto)="data">
            <div class="text-center">{{ data.label }}</div>
          </template>
          <template v-slot:head(saldo)="data">
            <div class="text-center">{{ data.label }}</div>
          </template>
          <template v-slot:head(nombreUsuario)="data">
            <div class="text-center">{{ data.label }}</div>
          </template>
          <template v-slot:head(devFecha)="data">
            <div class="text-center">{{ data.label }}</div>
          </template>
          <template v-slot:head(detalle)="data">
            <div class="text-center">{{ data.label }}</div>
          </template>
          <template v-slot:head(acciones)="data">
            <div class="text-center">{{ data.label }}</div>
          </template>          

          <!-- DETALLES -->

          <template #cell(nombreCliente)="row">
            <span v-if="row.item.nombreCliente">
              {{ row.item.nombreCliente }}
            </span>
          </template> 

          <template #cell(cofReferencia)="row">
            <span v-if="row.item.cofReferencia">
              {{ row.item.cofReferencia }}
            </span>
          </template>        

          <template #cell(devReferencia)="row">
            <span v-if="row.item.devReferencia">
              {{ row.item.devReferencia }}
            </span>
          </template>             

          <template #cell(devMonto)="row">
            <span v-if="row.item.devMonto > 0">
              {{ row.item.devMonto | currency('$', 2, { spaceBetweenAmountAndSymbol: true })}}
            </span>
          </template>
                 
          <template #cell(saldo)="row">
            <span v-if="row.item.saldo > 0" class="d-block">
                {{ row.item.saldo | currency('$', 2, { spaceBetweenAmountAndSymbol: true })}}

              <span :class="(row.item.devMonto - row.item.saldo) === 0 ? 'text-success' : 'text-danger'"  class="d-block">
                ({{ (row.item.devMonto - row.item.saldo) | currency('$', 2, { spaceBetweenAmountAndSymbol: true })}})
              </span>

            </span>
          </template>

          <template #cell(nombreUsuario)="row">
            <span v-if="row.item.nombreUsuario">
              {{ row.item.nombreUsuario }}
            </span>
          </template> 

          <template #cell(detalle)="row">

            <!-- MODAL PARA MOSTRAR NOTAS DE CREDITO APLICADAS -->

            <b-button v-if="row.item.detalle.length > 0" size="xs" variant="outline-primary" v-b-modal="`modal-${row.item.devId}`"
              data-toggle="tooltip" data-placement="top" title="Detalle de notas de crédito aplicadas"
              >{{row.item.detalle.length}}</b-button>

            <b-modal :id="`modal-${row.item.devId}`" title="Notas de crédito aplicadas" ok-only ok-title="Close" >

                  <table class="table table-striped table-bordered table-hove table-sm text-center">
                      <tr>
                          <th>File</th>
                          <th>Referencia</th>
                          <th>Valor</th>
                          <th>Fecha</th>
                      </tr>
                      <tr v-for="(det, index) in row.item.detalle" :key="index">
                          <td class="align-middle">

                            <b-button @click="redFileManager(det.cofCodigo)" variant="link"
                              data-toggle="tooltip" data-placement="top" 
                              title="Ir al File Manager">
                              {{ det.cofCodigo }}
                            </b-button>

                          </td>
                          <td class="align-middle">{{ det.ccoNotas }}</td>
                          <td class="align-middle">${{ det.ccoMonto }}</td>
                          <td class="align-middle">{{ det.ccoFecha.toString() }}</td>
                      </tr>
                  </table>

            </b-modal>

            <!-- FIN MODAL PARA MOSTRAR NOTAS DE CREDITO APLICADAS -->

          </template>

          <template #cell(devFecha)="row">
            <span v-if="row.item.devFecha">
              {{ row.item.devFecha }}
            </span>
          </template>           

          <!-- botones de acciòn -->
          <template #cell(acciones)="row">
            <center>
              <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret class="text-center"
                data-toggle="tooltip" data-placement="top" title="Más opciones">
                <template #button-content>
                  <i class="glyph-icon simple-icon-options-vertical" style="color:gray"></i>
                </template>
                <b-dropdown-item href="#" @click="editNotaCredito(row.item.devId, row)">Editar
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="handleDelete(row.item.devId)">Eliminar
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="downloadNotaCredito(row.item.devId)">Descargar
                </b-dropdown-item>
              </b-dropdown>
            </center>
          </template>

        </b-table>

      </component>

    </b-card>

  </b-container>
</template>

<script>
  import CobranzasServices from "@/services/gps/cobranzas/CobranzasServices";
  import ProfilesServices from "@/services/gps/profiles/ProfilesServices";
  import DateRangePicker from 'vue2-daterange-picker';
  import moment from 'moment';
  import {
    mapActions,
    mapGetters
  } from 'vuex'
  import vSelect from 'vue-select'

  export default {
    name: 'collectionNotasCredito',

    components: {
      DateRangePicker,
      vSelect
    },

    data() {
      return {
        isLoading: false,
        isCreateMode: false,
        isEditMode: false,
        picker: new Date().toISOString().substr(0, 10),
        nowDate: new Date().toISOString().slice(1, 0),
        isSaving: false,
        dateRange: {
          startDate: moment().add(1, 'd').startOf('month').format('YYYY-MM-DD'),
          endDate: moment().add(1, 'd').endOf('month').format('YYYY-MM-DD')
        },
        locale: {
          separator: ' - '
        },
        start: null,
        end: null,

        creditNote: {
          devId: null,
          cofId: null,
          devCliente: null,
          devReferencia: null,
          devFecha: null,
          devNota: null,
          devTipo: null,
          devMonto: null,
          devUsuario: null
        },

        notasCredito: [],
        clientes: [],
        filters: {
          nombreCliente: '',
          cofReferencia: '',
          devReferencia: '',
          nombreUsuario: '',
          // detalle: '',
        },

        fields: [
          // {
          //   key: 'devId',
          //   label: 'devId',
          //   tdClass: 'align-middle text-center',
          //   thClass: "align-middle",
          //   sortable: true
          // },          
          {
            key: 'nombreCliente',
            label: 'Cliente',
            tdClass: 'align-middle text-center',
            thClass: "align-middle",
            sortable: true
          },
          {
            key: 'cofReferencia',
            label: 'ATC referencia',
            tdClass: 'align-middle text-center',
            sortable: false
          },
          {
            key: 'devReferencia',
            label: 'Descripción',
            tdClass: 'align-middle text-center',
            thClass: "align-middle",            
            sortable: false
          },
          {
            key: 'devMonto',
            label: 'Monto',
            tdClass: 'align-middle text-center',
            thClass: "align-middle",    
            thStyle: { width: "9%" },       
            sortable: false
          },
          {
            key: 'saldo',
            label: 'Aplicado',
            tdClass: 'align-middle text-center',
            thClass: "align-middle",     
            thStyle: { width: "9%" },           
            sortable: false
          },
          {
            key: 'nombreUsuario',
            label: 'Usuario',
            tdClass: 'align-middle text-center',
            thClass: "align-middle",            
            sortable: false
          },

          {
            key: 'devFecha',
            label: 'Fecha',
            tdClass: 'align-middle text-center',
            thClass: "align-middle",                 
            sortable: false
          },
          {
            key: 'detalle',
            label: 'Detalle',
            tdClass: 'align-middle text-center',
            thClass: "align-middle",            
            sortable: false
          },          
          {
            key: 'acciones',
            label: 'Acciones',
            sortable: false,
            thClass: 'align-middle text-center',
            tdClass: "align-middle",            
            // thStyle: {
            //   width: "15%"
            // },
          },
          // 'show_details'
        ]
      }
    },

    computed: {
      ...mapGetters('cobranzasCreditNotes', ['getCreditNotes', 'getCreditNote']),

      filtered() {
        const filtered = this.notasCredito.filter(item => {         
          return Object.keys(this.filters).every(key =>            
            String(item[key]).includes(this.filters[key])                                  
          )
        })

        // Adecuación para que filtro por rango de fechas
          const start =  moment(this.dateRange.startDate).format('YYYY-MM-DD');
          const end   =  moment(this.dateRange.endDate).format('YYYY-MM-DD');
          const resultado = filtered.filter(item => item.devFecha >= start && item.devFecha <= end)
        // Fin Adecuación para que filtro por rango de fechas

        return resultado.length > 0 ? resultado : []

        //return filtered.length > 0 ? filtered : []
      },
    },

    methods: {
      ...mapActions('cobranzasCreditNotes',
        [
          'loadCreditNotes',
          'createCreditNote',
          'updateCreditNote',
          'deleteCreditNote'
        ]),

      async getNotasCredito() {
        const {
          data
        } = await CobranzasServices.getNotasCredito();
        this.notasCredito = data.data;

      },
      async getClients() {
        const {
          data
        } = await ProfilesServices.getClientes();

        this.clientes = data;

      },

      async handleUpdateParams() {
        await this.loadData()
      },

      async downloadNotaCredito(devId) {
        let routeData = CobranzasServices.serverDownloadNotaCreditoUrl + devId;
        await CobranzasServices.downloadNotaCredito(devId)
        window.open(routeData);

      },
      async handleDelete(id) {

        this.$swal({
          title: '¿Estás seguro que deseas eliminar la nota de crédito?',
          text: `Se eliminarán también todos los abonos aplicados por esta nota de crédito`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: "#ED7117",
          reverseButtons: true
        }).then( result => {

          if (result.isConfirmed) {
            this.deleteNotaCredito(id)
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            // Elimino el ultimo elemento del array para evitar el bucle
          }
        })
      

      },
      async deleteNotaCredito(id) {

        this.hasErrors = false
        this.isSaving = true

        try {

          await this.deleteCreditNote(id)
          this.getNotasCredito()

        } catch (e) {

          this.hasErrors = true
          this.errors = e
          console.log("CATCH", e)
        }
        this.isSaving = false
      },
      async editNotaCredito(id, row) {
        //const creditNote = await this.getCreditNote(id)
        this.creditNote = {
          ...row.item,
          devUsuario: this.$root.$loggedUserId
        }
        this.handleEdit();
        this.showToogleDetails(row);
      },
      resetForm() {
        Object.keys(this.creditNote).forEach(key => this.creditNote[key] = null)
      },
      showToogleDetails(row) {
        if (row.detailsShowing) {
          row.toggleDetails()
        } else {
          this.filtered.forEach(item => {
            this.$set(item, '_showDetails', false)
          })
          this.$nextTick(() => {
            row.toggleDetails()
          })
        }
      },

      handleEdit() {
        this.isCreateMode = false
        this.isEditMode = true
      },
      async updateNotaCredito() {

        this.hasErrors = false
        this.isSaving = true

        try {
          await this.updateCreditNote({
            ...this.creditNote
          })
          this.resetForm()
          this.isEditMode = false
          await this.getNotasCredito();
          await this.successCharterMessage();
        } catch (e) {

          this.hasErrors = true
          this.errors = e

          console.log("CATCH", e)
        }

        this.isSaving = false

      },
      successCharterMessage() {
        const type = "success filled";
        const title = "Success";
        const mensaje = "Nota de crédito actualizada correctamente";
        this.$notify(type, title, mensaje, {
          duration: 2500,
          permanent: false
        });
      },

      customDate(date) {
        return moment(date).format('YYYY-MM-DD')
      },
      redFileManager(codeFile) {
            this.$router.push({ path: '/collection-search-file', query: { q: codeFile } })
      },    


    },
    async mounted() {
      await this.getNotasCredito();
      await this.getClients();
    }
  }

</script>

<style lang="scss" scoped>
  .scroll-area {
    position: relative;
    margin: 0px;
    width: auto;
    height: 658px;
  }

.height-filters {
  font-size: 0.65rem !important;
  height: calc(2rem + 1px) !important;
}  
.custom-select {
  padding: 0px 0.55rem !important;
}  

</style>

<style scoped>
  *>>>.customdate .form-control.reportrange-text {
    width: 255px !important;
    line-height: 25px;
    height: 36px !important;
  }

</style>
