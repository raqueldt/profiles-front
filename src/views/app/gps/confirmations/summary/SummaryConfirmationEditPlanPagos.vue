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

            <div class="row justify-content-center">

              <div class="col-lg-6 form-group">
                <label>
                  <div class="glyph-icon simple-icon-calendar d-inline"></div> Expiration date:
                </label>
                <input onpaste="return false" placeholder="Type day to" class="form-control" type="date" v-model.trim="form.to"
                  maxlength="3" id="to" @keypress="onlyNumber" :min="row.cofInicio" />
              </div>

              <div class="col-lg-6 form-group">
                <label>
                  <div class="glyph-icon simple-icon-pie-chart d-inline"></div> Porcent (%):
                </label>
                <input onpaste="return false" placeholder="Type porcent" class="form-control" type="text" v-model.trim="form.percent"
                  maxlength="3" id="percent" @keypress="onlyNumber" />
              </div>

              
              <div  class='col-md-8 form-group'>
                <button block class="btn btn-primary text_white btn-block btn-md btn-responsive" 
                  @click="actionUpdate()"
                  :disabled=" !this.enableSendButton()">
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
        enableButtonSend: false,
        form: {
          from: "",
          to: "",
          percent: "",
        },
      };
    },
    computed: {

    },
    watch: {

    },
    methods: {
      onlyNumber($event) {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
          $event.preventDefault();
        }
      },
      validateForm() {
        if(this.row.pocDetalle==='Payment Terms'){
            if ( this.form.to == "" || this.form.percent == "" ) {
              return false;
            } else {
              return true;
            }        
        }else{
          if ( this.form.to == "" || this.form.percent == "" ) {
          return false;
          } else {
            return true;
          }        
        }
        
      },
      enableSendButton() {
        if (this.validateForm()) {
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
          focusCancel: true,
        }).then(result => {
          if (result.isConfirmed) {
            this.updateAllPoliticaCancelacion();
          } else if (
            result.dismiss === this.$swal.DismissReason.cancel
          ) {

          }
        });
      },
      updateAllPoliticaCancelacion() {
        let data = {
          to: this.form.to,
          percent: this.form.percent,
          cofId: this.form.cofId
        };
        var cppId = this.row.cppId;
        PlanPagosServices.updatePlanPagos(cppId, data)
          .then(response => {
            this.displayMessage();
            this.$parent.closeModalAfterEdit();
          })
          .catch(error => {
            console.log(error);
            var type = "error filled";
            var title = "Error";
            var mensaje = error;
            this.$notify(type, title, mensaje, {
              duration: 2500,
              permanent: false,
            });
          });
      },

      displayMessage() {
        var type = "success filled";
        var title = "Success";
        var mensaje = this.$t('gps.confirmationslabels.updated-cancellation-policies');
        this.$notify(type, title, mensaje, {
          duration: 2500,
          permanent: false,
        });
      },
      init() {
        this.form.to = this.row.cppFecha;
        this.form.percent = this.row.cppPorcentaje;
        this.form.cofId = this.row.cofId;
      },
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