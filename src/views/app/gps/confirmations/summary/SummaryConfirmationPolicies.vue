<template>
  <b-card class="shadow">

    <b-col lg="12">
      <h4>{{$t('gps.cancelation_policy')}}</h4>
    </b-col>
<!-- CotId: {{cotId}}<br>
CliId: {{clientId}}<br>
Total: {{cotValor}}<br> -->

<!-- <pre>{{politicasAplicadas}}</pre>
<pre>{{summaryCancelationPolice}}</pre> -->
        
    <b-row v-if="summaryCancelationPolice.length > 0">
      <b-col lg="6" md="12" xs="12" cols="12" >
        <div class="container mb-3">
          <div class="row justify-content-md-center">
            <b-button-group>
              <b-button v-for="(police, index) in summaryCancelationPolice" :key="index" data-toggle="tooltip"
                data-placement="top" :title="$t('gps.confirmationslabels.tooltip-button-cancelation-policies')"
                @click="addConfirmationCancelacion(police.pocId, police.pocReferencia)" href="#"
                class="btn_pol btn-sm p-2 mx-1"
                :disabled="pocReferenciaClicked === police.pocReferencia  ? true : false"
                :variant="pocReferenciaClicked === police.pocReferencia  ? 'primary' : 'outline-primary'">
                <span>{{ police.pocReferencia }} </span>
              </b-button>
            </b-button-group>

          </div>
        </div>

      </b-col>
      <b-colxx  lg="3" md="12" xs="12" cols="12">
      </b-colxx>
    </b-row>
    <b-row v-else class="w-100">
      <b-col  lg="12" md="12" xs="12" cols="12">
        <div class="text-center">
          <alertsglobal type='warning' :title=" $t('gps.confirmationslabels.no-generated-cancelation-policies')"
            :message=" $t('gps.confirmationslabels.generate-cancelation-policies') " class="w-100">
          </alertsglobal>
        </div>
      </b-col>
    </b-row>

    <div class="separator mb-4"></div>
    <div class="text-center" v-if="!isLoadingRow">
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow" variant="primary"></b-spinner>
    </div>
    <div v-else>

      <b-row>
        <b-col  lg="12" md="12" xs="12" cols="12" class="m-auto">
          <b-card no-body class="pol_cancel_alert">

            <template v-if="summaryCancelationPolice.length > 0 && !politicasAplicadas.length ">
              <div class="text-center">

                <alertsglobal type='warning' :title=" $t('gps.confirmationslabels.no-add-cancelation-policies')"
                  :message=" $t('gps.confirmationslabels.assing-cancelation-policies') " class="w-100">
                </alertsglobal>

              </div>
            </template>

            <template v-if="summaryCancelationPolice.length > 0 && politicasAplicadas.length > 0 ">
              <b-alert variant="primary" show>
                <div class="glyph-icon simple-icon-star d-inline"></div>
                {{$t('gps.confirmationslabels.cancelation-policies-changed')}} <strong>{{pocReferenciaClicked}}</strong>
              </b-alert>

              <b-row class="w-100 mb-2 mx-1">
                <b-col  lg="6" md="12" xs="12" cols="12">

                  <!-- <summary-confirmation-table-payments-policies @closeModalAfterEdit=closeModalAfterEdit
                    :politicasAplicadas="politicasAplicadasPayments"
                    :cotValor="cotValor">
                  </summary-confirmation-table-payments-policies> -->
                  
                  <!-- PLAN DE PAGOS -->
                  <summary-confirmation-plan-pagos :cofId="cofId" ref="planPagos"></summary-confirmation-plan-pagos>

                </b-col>
                <b-col  lg="6" md="12" xs="12" cols="12">
                  <summary-confirmation-table-cancellation-policies @closeModalAfterEdit=closeModalAfterEdit
                    :politicasAplicadas="politicasAplicadasCancellation"
                    :cotValor="cotValor">
                  </summary-confirmation-table-cancellation-policies>
                </b-col>
              </b-row>

            </template>
          </b-card>

        </b-col>

      </b-row>

    </div>

  </b-card>
</template>
<script>
  import ConfirmacionesSummaryServices from "../../../../../services/gps/confirmaciones/ConfirmacionesSummaryServices";
  import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices"

  export default {
    name: "SummaryCancelationPolice",
    props: ["cofId", "cotId", "summaryDetails"],
    data() {
      return {
        isLoadingRow: false,
        showModalEdit: false,
        rowEdit: '',
        summaryCancelationPolice: [],
        politicasAplicadas: [],
        politicasAplicadasCancellation: [],
        politicasAplicadasPayments: [],
        cofIdCancelacion: this.cofId,
        pocIdClicked: "",
        pctIdClicked: "",
        pocReferenciaClicked: "",
        clientId:'',
        cotValor:''
      }
    },
    created() {

    //1. Extriago valores de clienteId y cotValor:
      this.getClientIdFromCotizaciones();
      this.getTotalFromCotizaciones();
    },

    watch: {
      clientId: {
          deep:true,
          handler:function(val) {
            if(Boolean(val)){
    //2. En caso de que exista clientId, llamo a métodos de cancelación de políticas
              this.getPoliticasCancelaciones();
              this.getConfirmacionCancelaciones();
            }
          },
      },
    },
    mounted() {
      

    },
    computed: {
      groupedSummaryCancelationPolice() {
        return this.groupBy(this.summaryCancelationPolice, 'pocDetalle')
      }
    },
    methods: {

      //  *************************** EXTRAIGO VALORES DE CLIENT_ID Y COTVALOR *************************** 
      getClientIdFromCotizaciones(){
            const cotId = this.cotId;
            CotizacionesServices.cotizacionesdetalles(cotId)
              .then(response => {                
                this.clientId = response.data.map(a => a.clienteId)[0];
              })
              .catch(error => {
                console.log("Error: " + error);
              }).finally(() => {
                
              });
      },
      getTotalFromCotizaciones(){
        const cotId = this.cotId;
        CotizacionesServices.totalescotizacion(cotId)
          .then(response => {
            this.cotValor = response.data.total;            
          })
          .catch(error => {
            console.log("Error: " + error);
          }).finally(() => {
            
          });
      },      
      //  *************************** FIN EXTRAIGO VALORES DE CLIENT_ID Y COTVALOR *************************** 
      
      // MODAL
      closeModalAfterEdit() {
        this.showModalEdit = false;
        this.getConfirmacionCancelaciones();
      },
      // FIN MODAL
      groupBy(array, key) {
        const result = {}
        array.forEach(item => {
          if (!result[item[key]]) {
            result[item[key]] = []
          }
          result[item[key]].push(item)
        })
        return result
      },
      // Método para traer las políticas de Cancelación de Cabecera (Botones)
      getPoliticasCancelaciones() {
        if(this.clientId){
          const clientId = this.clientId;
          ConfirmacionesSummaryServices.getPoliticasCancelaciones(clientId)
            .then(response => {
              this.summaryCancelationPolice = response.data.data
            })
            .catch(error => {
              this.showMessageConfirmationError(error)
            }).finally(() => {
              this.isLoadingRow = true;
            });
        }
      },
      getConfirmacionCancelaciones() {
        if(this.clientId){
            ConfirmacionesSummaryServices.getConfirmacionCancelaciones(this.cofIdCancelacion, this.clientId)
              .then(response => {
                let code = response.status;
                if(code == 200){             
                    this.politicasAplicadas = response.data.data;
                    this.politicasAplicadasCancellation = this.politicasAplicadas.filter(item => item.pocDetalle ===
                      'Cancellation Terms');
                    this.politicasAplicadasPayments = this.politicasAplicadas.filter(item => item.pocDetalle ===
                      'Payment Terms');

                    //Extraigo el pocId de la tabla Confirmacion_cancelacion
                    if (Boolean(this.politicasAplicadas) && Boolean(this.politicasAplicadas[0])) {
                      this.pocIdClicked = this.politicasAplicadas[0].pocId;
                      //this.pctIdClicked = this.politicasAplicadas[0].pctId;
                      this.pocReferenciaClicked = this.politicasAplicadas[0].pocReferencia
                    }

                    //Actualizo Plan de Pagos:                   
                    if(Boolean(this.$refs.planPagos)) this.$refs.planPagos.getPlanPagos()

                }else if(code == 204){
                  //let msj = response.statusText;
                  let msj = "There are not confirmation records. ";
                  this.showMessageConfirmationNoData(msj)
                }

              })
              .catch(error => {
                this.showMessageConfirmationError(error)
              })
        }
      },

      addConfirmationCancelacion(pocId, pocReferencia) {
        let data = {
          pocId: pocId,
          pocReferencia: pocReferencia,
          users_id: this.clientId,
          cofId: this.cofIdCancelacion,
          cofUsuarioId: this.$store.getters.currentUser.id,
        }
        ConfirmacionesSummaryServices.addConfirmationCancelacion(data)
          .then(response => {
            //console.log("addConfirmationCancelacion: " + JSON.stringify(response))
            let code = response.status;

            if(code == 200){
              this.getConfirmacionCancelaciones();
              this.showMessageConfirmationAddedPolicy();
            }else if(code == 204){
              let msj = response.statusText;
              this.showMessageConfirmationNoData(msj)
            }            
          })
          .catch(error => {
            console.log(error)
            this.showMessageConfirmationError(error)
          })
      },
      showMessageConfirmationAddedPolicy() {
        var type = "success filled";
        var title = "Success";
        var mensaje = this.$t('gps.confirmationslabels.policy-added-successfully');
        this.$notify(type, title, mensaje, {
          duration: 2500,
          permanent: false,
        });
      }, 
      showMessageConfirmationNoData(msj) {
        var type = "warning filled";
        var title = "Empty records";
        var mensaje = msj;
        this.$notify(type, title, mensaje, {
          duration: 3500,
          permanent: false,
        });
      },    
      showMessageConfirmationError(error) {
        var type = "error filled";
        var title = "Error";
        var mensaje = error;
        this.$notify(type, title, mensaje, {
          duration: 3500,
          permanent: false,
        });
      },          
    },
  }

</script>
