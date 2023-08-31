<template>
  <b-card class="shadow">

          <div class="row mb-2">
            <div class="col-lg-8">
              <h6>{{ $t("gps.payments_policy") }}</h6>
            </div>
            <div class="col-lg-4">
                <a
                    class="btn btn-primary btn-sm float-right text-white d-inline"
                    type="button"
                      @click="openModalEditMasive()"
                    :title="$t('gps.confirmationslabels.update-tooltip')"
                >
                  <div class="glyph-icon iconsminds-pen d-inline"></div>
                </a>

            </div>
          </div>

            <!-- Modal edición masiva -->
            <summary-plan-pagos-edit-porcents v-if="showModalEditMasive"  :row="rowEditMasive">
                
                <h3 slot="header" class="modal-title">
                    Edit payment policies
                </h3>                

                <div slot="footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        @click="closeModalEditMasive()"
                    >
                        Close
                    </button>
                </div>
            </summary-plan-pagos-edit-porcents>
            <!-- Fin Modal edición masiva -->

            <!-- Modal para edicion por registro -->
            <summary-confirmation-edit-plan-pagos v-if="showModalEdit"  :row="rowEdit">
                
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
            </summary-confirmation-edit-plan-pagos>
            <!-- Fin Modal para edicion por registro -->

    <div class="w-100" v-if="planPagos.length > 0">
      <table class="table table-striped table-bordered table-sm">
        <thead class="text-center  small font-weight-bold">
          <!-- <th class="align-middle">Fecha inicio</th>
          <th class="align-middle">Total </th> -->
          <th class="align-middle">Expiration Date</th>
          <th class="align-middle">Percent</th>
          <th class="align-middle">Mount</th>
          <!-- <th class="align-middle">Actions</th> -->
        </thead>
        <tbody>
          <tr v-for="(item, index) in planPagos" :key="index">
            <!-- <td class="text-center text-muted">{{item.cofInicio}}</td>
            <td class="text-center text-muted">{{item.total | currency}}</td> -->
            <td class="text-center text-muted">
              <small>
                {{ moment(item.cppFecha, "YYYY-MM-DD").format("MMM DD YYYY, ddd")}}
                </small>
            </td>
            <td class="text-center text-muted">
              <small>{{ item.cppPorcentaje }}%</small>
            </td>
            <td class="text-center text-muted">
              <small>{{ item.cppMonto | currency('$', 2, { spaceBetweenAmountAndSymbol: true }) }}</small>
            </td>
            <!-- <td class="text-center">
                <a
                    class="btn btn-success btn-sm text-center text-white"
                    type="button"
                      @click="openModalEdit(item)"
                    :title="$t('gps.confirmationslabels.update-tooltip')"
                >
                  <div class="glyph-icon iconsminds-pen d-inline"></div>
                </a>
            </td>             -->
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <b-alert show variant="warning">{{
        $t("gps.confirmationslabels.no-payments-policies")
      }}</b-alert>
    </div>
  </b-card>
</template>
<script>
import PlanPagosServices from "@/services/gps/planPagos/PlanPagosServices";
export default {
  name: "SummaryCancelationPolice",
  props: ["cofId"],
  data() {
    return {
      showModalEdit: false,
      showModalEditMasive: false,
      isLoadingRow: false,
      planPagos: []
    };
  },
  mounted() {
    this.getPlanPagos();
  },
  created() {},
  computed: {},
  methods: {
      // MODAL
        // openModalEdit(row) {
        //     this.rowEdit = row;
        //     this.showModalEdit = true;
        // },
        // closeModalEdit() {
            
        //     this.showModalEdit = false;
        // },
        // closeModalAfterEdit() {
        //      this.showModalEdit = false;
        //      this.getPlanPagos();
        // },
      // FIN MODAL    

      // MODAL PERCENTS
        openModalEditMasive() {
            this.rowEditMasive = this.planPagos;
            this.showModalEditMasive = true;
        },
        closeModalEditMasive() {            
            this.showModalEditMasive = false;
        },
        closeModalAfterEditMasive() {
             this.showModalEditMasive = false;
             this.getPlanPagos();
        },
      // FIN MODAL PERCENTS      
    showMessageConfirmationAddedPolicy() {
      var type = "success filled";
      var title = "Success";
      var mensaje = this.$t(
        "gps.confirmationslabels.policy-added-successfully"
      );
      this.$notify(type, title, mensaje, {
        duration: 2500,
        permanent: false
      });
    },
    getPlanPagos() {
      let cofId = this.cofId;
      PlanPagosServices.getConfirmacionPlanPagos(cofId)
        .then(response => {
          this.planPagos = response.data.data;
        })
        .catch(error => {
          this.showMessageConfirmationError(error);
        })
        .finally(() => {
          this.isLoadingRow = true;
        });
    }
  }
};
</script>

<style scoped>
.btn-sm {
  font-size: 9px !important;
  padding: 5px 5px !important;
  border-radius: 15px !important;
}
</style>
