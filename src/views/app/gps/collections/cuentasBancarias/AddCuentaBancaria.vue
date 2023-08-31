<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <b-button size="sm" variant="primary" v-if="!showForm" @click="showFormCuenta()"
          data-toggle="tooltip" data-placement="top" title="Añadir cuenta bancaria"> + Añadir Cuenta Bancaria</b-button>
      </div>
      <div class="col-md-12" v-if="showForm">

        <b-form inline class="my-3">
          <label class="sr-only" for="inline-form-input-name"> Nombre cuenta bancaria</label>
          <b-form-input class="mb-2 mr-sm-2 mb-sm-0" v-model="cbaNombre" maxlength="20"
            placeholder="Digite nombre de cuenta">
          </b-form-input>
          <b-button-group>
            <b-button variant="secondary"  @click="hideFormCuenta()">Discard</b-button>
            <b-button variant="primary"  :disabled="isBusy ||  !Boolean(cbaNombre)"
              @click.prevent="handleSubmit">
              <template v-if="isBusy">
                <b-spinner small type="grow"></b-spinner>
                Saving
              </template>
              <template v-else>
                Save
              </template>
            </b-button>
          </b-button-group>
        </b-form>

      </div>
    </div>
  </div>
</template>

<script>
  import CuentasBancariasServices from "@/services/gps/cobranzas/CuentasBancariasServices";
  export default {
    name: 'AddCuentaBancaria',

    data() {
      return {
        showForm: false,
        isBusy: false,
        cbaNombre: ""
      }
    },

    methods: {
      showFormCuenta() {
        this.showForm = true;
      },
      hideFormCuenta() {
        this.showForm = false;
      },
      handleSubmit() {
        let data = {
          cbaNombre: this.cbaNombre,
        };

        CuentasBancariasServices.addCuentaBancaria(data)
          .then((response) => {
            let mensaje = response.data.data;

            if (mensaje === 'OK') {
              this.displaySuccessMessage();
              this.clear();
              this.$emit("refresh", true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      displaySuccessMessage() {
        var type = "success filled";
        var title = "Success";
        var message = "Cuenta bancaria agregada correctamente";
        this.$notify(type, title, message, {
          duration: 3000,
          permanent: false
        });
      },
      clear() {
        this.cbaNombre = "";
        this.showForm = false;
      }
    },
    mounted() {

    }
  }

</script>

<style lang="scss" scoped></style>
