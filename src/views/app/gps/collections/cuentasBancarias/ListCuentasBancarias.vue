<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">

        <b-row class="mb-3">
          <b-col lg="8" class="text-secondary text-center">
            <b>Cuenta Bancaria</b>
          </b-col>
          <b-col lg="2" class="text-secondary text-center">
            <b>Estado</b>
          </b-col>
          <b-col lg="2" class="text-center">
            <b>Acciones</b>
          </b-col>
        </b-row>

        <template v-for="(cuenta, index) in cuentasBancarias">

          <b-row class="mb-2" v-if="cuenta" :key="`key-${index}`">
            <b-col lg="8">
              <span :class="isEditMode && selectedId === cuenta.cbaId ? 'font-weight-bold' : ''">
                {{ cuenta.cbaNombre }}
              </span>
            </b-col>
            <b-col lg="2" :class="cuenta.cbaEstado === 1 ? 'text-success' : 'text-danger' ">
              <span :class="isEditMode && selectedId === cuenta.cbaId ? 'font-weight-bold' : ''">
                {{ cuenta.cbaEstado === 1 ? 'Active' : 'Inactive' }}
              </span>
            </b-col>
            <b-col lg="1" class="text-center">
              <b-button v-if="!isEditMode" variant="link" class="p-0"
                @click.prevent="handleEdit(cuenta.cbaId, cuenta.cbaNombre, cuenta.cbaEstado)" data-toggle="tooltip"
                data-placement="top" title="Editar">
                <i class="glyph-icon simple-icon-pencil"></i>
              </b-button>
            </b-col>
            <b-col lg="1" class="text-center">
              <b-button variant="link" class="p-0" @click.prevent="confirmDelete(cuenta.cbaId)" data-toggle="tooltip"
                data-placement="top" title="Eliminar">
                <i class="glyph-icon simple-icon-trash"></i>
              </b-button>
            </b-col>
          </b-row>

          <b-form :key="cuenta.cbaId" inline v-if="isEditMode && selectedId === cuenta.cbaId" class="mb-4 mx-0">
            <label class="sr-only" for="inline-form-input-name">{{ cuenta.cbaNombre }}</label>
            <b-form-input class="mb-2 mr-sm-2 mb-sm-0" v-model="selectedValue" maxlength="20">
            </b-form-input>

            <b-form-group label="" v-slot="{ ariaDescribedby }">
              <b-form-radio-group v-model="selectedStatus" :options="options" :aria-describedby="ariaDescribedby"
                name="radio-inline" stacked value-field="value" text-field="status"></b-form-radio-group>
            </b-form-group>

            <b-button-group class="ml-3">
              <b-button variant="secondary" size="sm" @click="handleDiscard">Discard</b-button>
              <b-button variant="primary" size="sm" :disabled="isBusy || selectedValue == 0  || !Boolean(selectedValue)"
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

        </template>

      </div>
    </div>
  </div>
</template>

<script>
  import CuentasBancariasServices from "@/services/gps/cobranzas/CuentasBancariasServices";

  export default {
    name: "ListcuentasBancarias",
    // props: ["slots"],
    data() {
      return {
        cuentasBancarias: [],
        isEditMode: false,
        isBusy: false,
        selectedId: "",
        selectedValue: "",
        selectedStatus: "",
        options: [{
            status: 'Active',
            value: '1'
          },
          {
            status: 'Inactive',
            value: '0'
          },
        ]

      };
    },

    methods: {
      async getAllCuentasBancarias() {
        const {
          data
        } = await CuentasBancariasServices.getAllCuentasBancarias();
        this.cuentasBancarias = data.data;
        //console.log("settings: " + JSON.stringify(this.settings))
      },
      handleEdit(id, value, status) {
        this.selectedId = id;
        this.selectedValue = value;
        this.selectedStatus = status;
        this.isEditMode = true;
        //this.displayMessageOK = false;
      },
      handleDiscard() {
        this.isEditMode = false;
        //this.displayMessageOK = false;
      },
      async handleSubmit() {
        try {
          this.isBusy = true;

          const dataToUpdate = {
            cbaNombre: this.selectedValue,
            cbaEstado: this.selectedStatus
          };

          await CuentasBancariasServices.updateCuentaBancaria(this.selectedId, dataToUpdate);

          this.isBusy = false;
          this.isEditMode = false;

          this.displaySuccessMessage("Value updated successfully");
          this.getAllCuentasBancarias();
          this.$emit("refresh", true);

        } catch (e) {
          console.log("UNEXPECTED", e);

          if (e.response.status && e.response.status == 400) {
            const {
              data: errors
            } = e.response;
            this.errors = errors;
            this.isBusy = false;
          }
        }
      },

      confirmDelete(id) {

        this.$swal({
          title: '¿Estas seguro de eliminar esta cuenta bancaria?',
          text: ``,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, eliminar!',
          cancelButtonText: 'No, cancelar!',
          confirmButtonColor: "#ED7117",
          reverseButtons: true
        }).then(result => {

          if (result.isConfirmed) {
            this.handleDelete(id);
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            // Elimino el ultimo elemento del array para evitar el bucle
          }
        })
      },
      async handleDelete(id) {
        try {
          this.isBusy = true;
          await CuentasBancariasServices.deleteCuentaBancaria(id);

          this.isBusy = false;
          this.isEditMode = false;

          this.displaySuccessMessage("Value deleted successfully");
          this.getAllCuentasBancarias();
          this.$emit("refresh", true);

        } catch (e) {
          console.log("UNEXPECTED", e);

          if (e.response.status && e.response.status == 400) {
            const {
              data: errors
            } = e.response;
            this.errors = errors;
            this.isBusy = false;
          }
        }
      },
      displaySuccessMessage(message) {
        var type = "success filled";
        var title = "Success";
        //var message = "Value updated successfully";
        this.$notify(type, title, message, {
          duration: 3000,
          permanent: false
        });
      },
      onlyNumber($event) {
        //console.log($event.keyCode); //keyCodes value
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
          $event.preventDefault();
        }
      },
    },
    async mounted() {
      await this.getAllCuentasBancarias();
    }
  };

</script>

<style lang="scss" scoped></style>
