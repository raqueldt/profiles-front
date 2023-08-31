<template>
  <b-card class="shadow">
            <h6>{{$t('gps.payments_policy')}}</h6>

            <!-- Modal para asignacion de Opeadores masivamente -->
            <summary-confirmation-edit-policies v-if="showModalEdit"  :row="rowEdit">
                
                <h3 slot="header" class="modal-title">
                    Edit policies for client
                </h3>                

                <div slot="footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        @click="closeModalEdit()"
                    >
                        Close
                    </button>
                </div>
            </summary-confirmation-edit-policies>
            
            <!-- Modal para asignacion de Opeadores masivamente --> 
              <div class="w-100" v-if="politicasAplicadas.length > 0">
                <table class="table table-striped table-bordered table-sm" >
                  <thead class="text-center  small font-weight-bold">
                    <th class="align-middle">Days Before Arrival</th>
                    <th class="align-middle">Cancelation Date</th>
                    <th class="align-middle">Cancelation %</th>
                    <th class="align-middle">Cancelation USD</th>
                    <th class="align-middle">Actions</th>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in politicasAplicadas" :key="index" >   
                    <td class="text-center text-muted">
                        <small>{{ item.etiquetaDesde }} to {{ item.etiquetaHasta }} days</small>
                      </td>
                      <td class="text-center text-muted">
                        <small>{{ item.fechaCancelacion }}</small>
                      </td>
                      <td class="text-center text-muted">
                        <small>{{ item.ccxPorcentaje }}%</small>
                      </td>
                      <td class="text-center text-muted">
                        <small>{{calculateCancelationMount(cotValor, item.ccxPorcentaje)}}</small>
                      </td>                    
                      <td class="text-center">
                          <a
                              class="btn btn-primary btn-sm text-center text-white"
                              type="button"
                               @click="openModalEdit(item)"
                              :title="$t('gps.confirmationslabels.update-tooltip')"
                          >
                           <div class="glyph-icon iconsminds-pen d-inline"></div>
                          </a>
                      </td>                      
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                      <b-alert show variant="warning">{{ $t('gps.confirmationslabels.no-payments-policies') }}</b-alert>                
              </div>              

  </b-card>
</template>
<script>
  import ConfirmacionesSummaryServices from "../../../../../services/gps/confirmaciones/ConfirmacionesSummaryServices"
  export default {
    name: "SummaryCancelationPolice",
    props: ["politicasAplicadas", "cotValor"],
    data() {
      return {
        isLoadingRow: false,
        showModalEdit: false,
        rowEdit: '',
        summaryCancelationPolice: [],
        //politicasAplicadas: [],
        cofIdCancelacion: this.cofId,
        pocIdClicked: "",
        pctIdClicked: "",
        pocReferenciaClicked: ""
      }
    },
    mounted() {

    },
    computed: {
     
    },
    methods: {
      // MODAL
        openModalEdit(row) {
            this.rowEdit = row;
            this.showModalEdit = true;
        },
        closeModalEdit() {
            
            this.showModalEdit = false;
        },
        closeModalAfterEdit() {
             this.showModalEdit = false;
             this.$emit('closeModalAfterEdit')
        },
      // FIN MODAL
      calculateCancelationMount(cotValor, porcent){
        return (cotValor - (cotValor*porcent)/100).toFixed(2);
      },      
      showMessageConfirmationAddedPolicy(){				
				var type = "success filled";
				var title = "Success";
				var mensaje = this.$t('gps.confirmationslabels.policy-added-successfully');
				this.$notify(type, title, mensaje, {
					duration: 2500,
					permanent: false,
				});
			}
    },
  }

</script>

<style scoped>
.btn-sm { 
  font-size: 9px  !important;
  padding: 5px 5px !important;
  border-radius: 15px !important;
}
</style>