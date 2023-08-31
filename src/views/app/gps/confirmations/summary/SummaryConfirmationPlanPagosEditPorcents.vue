<template>
  <div class="container windowModal">
    <div class="modal modal-mask" style="display: block" id="dialogo1">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content p-4">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
            <!-- <pre>{{row}}</pre> -->
            <div class="row justify-content-center">
              <table class="table table-striped table-bordered table-sm">
                <thead class="text-center  small font-weight-bold">
                  <!-- <th class="align-middle">Fecha inicio</th> -->
                  <th class="align-middle col-3">Expiration Date</th>
                  <th class="align-middle col-2">Percent (%)</th>
                  <th class="align-middle col-3">Mount</th>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in form" :key="index">
                    <!-- <td class="text-center text-muted">{{item.cofInicio}}</td> -->
                    <td class="text-center text-muted">
                      <!-- <small>
                        {{
                          moment(item.cppFecha, "YYYY-MM-DD").format(
                            "MMM DD YYYY, ddd"
                          )
                        }}
                      </small> -->

                      <input
                        onpaste="return false"
                        placeholder="Type day to"
                        class="form-control"
                        type="date"
                        maxlength="3"
                        id="to"
                        @keypress="onlyNumber"
                        :min="item.cofInicio"
                        v-model="item.cppFecha"
                      />
                    </td>
                    <td class="text-center text-muted">
                      <!-- <small>{{ item.cppPorcentaje }}%</small> -->

                      <input
                        onpaste="return false"
                        placeholder="Type porcent"
                        class="form-control"
                        type="text"
                        maxlength="3"
                        id="percent"
                        @keypress="onlyNumber"
                        v-model="item.cppPorcentaje"
                      />
                    </td>
                    <td class="text-center text-muted">
                      <!-- <small>{{ item.cppMonto | currency }}</small><br> -->
                      <p>{{
                        recalculateMonto(item.total, item.cppPorcentaje)
                          | currency("$", 2, {
                            spaceBetweenAmountAndSymbol: true
                          })
                      }}</p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                class="col-md-12  text-danger  text-center mb-2"
                v-if="messageValidacionPorcentajes"
              >
                <i class="simple-icon-exclamation"></i>
                {{ messageValidacionPorcentajes }}
              </div>

              <div
                class="col-md-12 text-danger text-center mb-2"
                v-if="messageValidacionFecha"
              >
                <i class="simple-icon-exclamation"></i>
                {{ messageValidacionFecha }}
              </div>

              <div class="col-md-8 form-group">
                <button
                  block
                  class="btn btn-primary text_white btn-block btn-md btn-responsive"
                  @click="actionUpdate()"
                  :disabled="!this.enableSendButton()"
                >
                  Update policy
                </button>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer"> </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* *** SERVICES *** */
import PlanPagosServices from "@/services/gps/planPagos/PlanPagosServices";

/* *** SERVICES *** */
export default {
  name: "summaryconfirmationeditplanpagos",
  props: ["row"],

  data() {
    return {
      messageValidacionPorcentajes: "",
      messageValidacionFecha: "",
      form: [],
      enableButtonSend: false
    };
  },
  computed: {
    // validateTotalPorcentajes(){
    //     return this.form.reduce((total, item)=>{
    //       return total + Number(item.cppPorcentaje)
    //     },0)
    // },
    validateTotalPorcentajes() {
      var total = this.form.reduce((total, item) => {
        return total + Number(item.cppPorcentaje);
      }, 0);

      return total === 100 ? true : false;
    },
    validateFechaNoVacia() {
      return this.form
        .map(x => ({ cppFecha: x.cppFecha }))
        .every(e => Boolean(e.cppFecha));
    }
  },
  watch: {},
  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    validateForm() {
      //Validación de porcentajes que sumen 100%
      if (this.validateTotalPorcentajes) {
        this.messageValidacionPorcentajes = "";
        return true;
      } else {
        this.messageValidacionPorcentajes =
          "The sum of percentages must be 100%";
        return false;
      }
    },
    validateFechas() {
      //Validación de fechas que no sean nulas:
      if (this.validateFechaNoVacia) {
        this.messageValidacionFecha = "";
        return true;
      } else {
        this.messageValidacionFecha = "Dates can not be empty";
        return false;
      }
    },
    recalculateMonto(total, cppPorcentaje) {
      return (total * cppPorcentaje) / 100;
    },
    enableSendButton() {
      if (this.validateForm() && this.validateFechas()) {
        return true;
      } else {
        return false;
      }
    },
    actionUpdate() {
      this.$swal({
        title: "Are you sure?",
        text: "You are about to update terms",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Update",
        cancelButtonText: "Cancel",
        cancelButtonColor: "#C82333",
        confirmButtonColor: "#218838",
        reverseButtons: true,
        focusConfirm: false,
        focusCancel: true
      }).then(result => {
        if (result.isConfirmed) {
          this.updateAllPoliticaCancelacion();
        } else if (result.dismiss === this.$swal.DismissReason.cancel) {
        }
      });
    },
    updateAllPoliticaCancelacion() {
      var data = this.form;
      PlanPagosServices.updateMasivePlanPagos(data)
        .then(response => {
          this.displayMessage();
          this.$parent.closeModalAfterEditMasive();
        })
        .catch(error => {
          console.log(error);
          var type = "error filled";
          var title = "Error";
          var mensaje = error;
          this.$notify(type, title, mensaje, {
            duration: 2500,
            permanent: false
          });
        });
    },

    displayMessage() {
      var type = "success filled";
      var title = "Success";
      var mensaje = this.$t(
        "gps.confirmationslabels.updated-cancellation-policies"
      );
      this.$notify(type, title, mensaje, {
        duration: 2500,
        permanent: false
      });
    },
    init() {
      let self = this;
      this.row.forEach(function(key) {
        self.form.push({
          cppId: key.cppId,
          cofId: key.cofId,
          cppFecha: key.cppFecha,
          cppPorcentaje: key.cppPorcentaje,
          cppMonto: key.cppMonto,
          cofInicio: key.cofInicio,
          total: key.total,
          loggedUserId: self.$store.getters.currentUser.id,
        });
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
.swal2-container {
  z-index: 100000000000 !important;
}
</style>
