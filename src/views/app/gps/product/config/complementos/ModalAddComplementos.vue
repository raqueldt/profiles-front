<template>

  <div class="d-inline ">

    <template>
      <b-button @click="showModal()" variant="primary" class="border-0" size="sm" v-if="flag==='add'">
        <a> <i class="glyph-icon simple-icon-plus"></i> Añadir complemento</a>
      </b-button>
      <b-button @click="showModal()" variant="outline-primary" class="border-0 d-inline" size="sm" v-if="flag==='edit'">
        <i class="glyph-icon simple-icon-pencil"></i>
      </b-button>
    </template>

    <b-modal ref="complementos-modal" centered title="Añadir nuevo complemento" ok-only ok-title="Close"
      header-bg-variant="light" header-class="p-3 justify-content" body-class="px-3 py-0" cancel-variant="light"
      footer-class="p-3">

      <template #modal-footer="{ ok, cancel }">
        <!-- <h1>{{flag}}</h1> -->
        <b-button size="md" variant="primary" :disabled="areEmptyFields" @click="savePrestacion()" v-if="flag==='add'">
          Save
        </b-button>
        <b-button size="md" variant="primary" :disabled="areEmptyFields" @click="confirm()" v-if="flag==='edit'">
          Update
        </b-button>
        <b-button size="md" variant="outline-secondary" @click="cancel()">
          Cancel
        </b-button>
      </template>

      <b-form @submit.prevent="onBasicSubmit">
        <b-row class="align-items-center justify-content-center mt-3">
          <b-col lg="5" md="12" xs="12" cols="12">
            <b-form-group label="Prestación" description="required">

              <b-form-select size="sm" class="rounded-select" v-model="preId" :options="prestaciones"
                text-field="preNombre" value-field="preId">
                <b-form-select-option :value="null">-Seleccione opción-</b-form-select-option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col lg="5" md="12" xs="12" cols="12">
            <b-form-group label="Nombre" description="required">
              <b-form-input type="text" maxlength="50" v-model="cmpNombre" placeholder="Digite nombre"
                class="rounded-select" />
            </b-form-group>
          </b-col>

          <b-col lg="2" md="12" xs="12" cols="12">
            <b-row class="align-items-center justify-content-center text-center">

              <label class="mr-1">Estado </label><br>
              <switches v-model="cmpEstado" theme="custom" color="primary" class="vue-switcher-small"></switches>

            </b-row>
          </b-col>
        </b-row>

      </b-form>


    </b-modal>

  </div>

</template>

<script>
  import Switches from "vue-switches";
  import PrestacionesServices from "@/services/product/prestaciones/PrestacionesServices.js"
  import ComplementosServices from "@/services/product/complementos/ComplementosServices.js"

  export default {

    name: 'ItineraryInfoModal',
    components: {
      switches: Switches
    },
    props: ["flag", "cmpIdEdit"],
    data() {

      return {
        prestaciones: [],
        preId: null,
        cmpNombre: "",
        cmpEstado: true,
        isLoading: false,
      }

    },
    computed: {
      areEmptyFields() {
        if (!Boolean(this.preId) || !Boolean(this.cmpNombre)) return true
        else return false
      }
    },
    watch: {

    },
    async mounted() {
      await this.getPrestaciones();
    },
    created() {},
    methods: {
      async showModal() {
        this.$refs['complementos-modal'].show()

        if (Boolean(this.cmpIdEdit)) {
          await this.getAllComplementosByCmpId()
        }

      },
      async hideModal() {
        this.$refs['complementos-modal'].hide()
      },

      savePrestacion() {
        let data = {
          preId: this.preId,
          cmpNombre: this.cmpNombre,
          cmpEstado: this.cmpEstado,
        };
        ComplementosServices.addComplemento(data)
          .then((response) => {
            let mensaje = response.data.data;
            if (mensaje == 200) {
              this.successMessage("add");
              this.hideModal();
              this.clear();
              this.$emit('reload', mensaje)
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      confirm() {

        this.$swal({
          title: 'Are you sure to update?',
          text: ``,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, sure!',
          cancelButtonText: 'No, cancel!',
          confirmButtonColor: "#ED7117",
          reverseButtons: true
        }).then(result => {

          if (result.isConfirmed) {
            this.updateComplemento();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            // Elimino el ultimo elemento del array para evitar el bucle
          }
        })
      },
      updateComplemento() {
        let data = {
          preId: this.preId,
          cmpNombre: this.cmpNombre,
          cmpEstado: this.cmpEstado,
        };

        ComplementosServices.updateComplemento(this.cmpIdEdit, data)
          .then((response) => {
            let mensaje = response.data.data;

            if (mensaje == 200) {
              this.successMessage("edit");
              this.hideModal();
              this.clear();
              this.$emit('reload', mensaje)
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      successMessage(flag) {
        var type = "success filled";
        var title = "Success";
        var mensaje = "";
        if (flag === "add") mensaje = "Complemento almacenado correctamente";
        else mensaje = "Complemento actualizado correctamente";
        this.$notify(type, title, mensaje, {
          duration: 3000,
          permanent: false
        });
      },

      clear() {
        this.preId = "",
          this.cmpNombre = "",
          this.cmpEstado = true
      },
      getPrestaciones() {
        PrestacionesServices.getAllPrestaciones()
          .then((response) => {
            this.prestaciones = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      getAllComplementosByCmpId() {
        let cmpId = this.cmpIdEdit;
        ComplementosServices.getAllComplementosByCmpId(cmpId)
          .then((response) => {
            let complemento = response.data.data;
            if (complemento) {
              this.preId = complemento.preId
              this.cmpNombre = complemento.cmpNombre
              this.cmpEstado = complemento.cmpEstado === 1 ? true : false
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }

    }

  }

</script>
