<template>
  <div class="d-inline">
    <template>
      <b-button @click="showModal()" variant="outline-primary" size="sm" v-if="flag==='add'">
        <a> <i class="glyph-icon simple-icon-plus"></i> Añadir item</a>
      </b-button>
      <b-button @click="showModal()" variant="outline-primary" class="border-0 d-inline" size="sm" v-if="flag==='edit'">
        <i class="glyph-icon simple-icon-pencil"></i>
      </b-button>
    </template>

    <b-modal ref="complemento-items-modal" centered
      :title="Boolean(cmiDatos) ? 'Edit complemento item' : 'Añadir complemento item'" ok-only ok-title="Close"
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
        <b-row class="align-items-center justify-content-center mt-4">

          <b-col lg="6" md="12" xs="12" cols="12">
            <b-form-group label="Complemento" description="required">
              <b-form-select size="sm" class="rounded-select" v-model="cmpIdEdited" :options="complementos"
                text-field="cmpNombre" value-field="cmpId"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12" xs="12" cols="12">
            <b-form-group label="Nombre" description="required">
              <b-form-input type="text" maxlength="80" v-model="cmiNombre" placeholder="Digite nombre"
                class="rounded-select" />
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12" xs="12" cols="12">
            <b-form-group label="Icono" description="">
              <b-form-input type="text" maxlength="80" v-model="cmiIcono" placeholder="Digite ícono"
                class="rounded-select" />
            </b-form-group>
          </b-col>

          <b-col lg="6" md="6" xs="6" cols="6" class="text-center">


            <b-form-group label="Aplica:" description="required" v-slot="{ ariaDescribedby }">
              <b-form-radio-group size="xs" id="checkbox-group-2" v-model="cmiAplica"
                :aria-describedby="ariaDescribedby" name="flavour-2" buttons>
                <b-form-radio size="xs" v-for="(aplica, index) in aplicaList" :key="index" :value="aplica.id" button
                  button-variant="outline-primary">{{ aplica.value }}
                </b-form-radio>
              </b-form-radio-group>
            </b-form-group>

            <!-- cmiAplica: {{cmiAplica}} -->

          </b-col>

          <b-col lg="12" md="6" xs="6" cols="6" class="text-center">

            <label>Status</label><br>
            <switches v-model="cmiEstado" theme="custom" color="primary" class="vue-switcher-small"></switches>

          </b-col>

        </b-row>

      </b-form>


    </b-modal>

  </div>

</template>

<script>
  import Switches from "vue-switches";
  import PrestacionesClaseServices from "@/services/product/prestaciones/PrestacionesClaseServices.js";
  import ComplementosServices from "@/services/product/complementos/ComplementosServices.js"
  import ComplementoItemServices from "@/services/product/complementos/ComplementoItemServices.js"

  export default {

    name: 'ModalAddComplementoItems',
    components: {
      switches: Switches
    },
    props: ["flag", "cmpId", "preNombre", "cmiDatos"],
    data() {

      return {
        //preId: "",
        complementos: [],
        cmpIdEdited: "",
        cmiNombre: "",
        cmiIcono: "",
        cmiAplica: "",
        cmiEstado: true,
        isLoading: false,
        aplicaList: [{
            id: 'P',
            value: 'Product'
          },
          {
            id: 'O',
            value: 'Offer'
          },
          {
            id: 'A',
            value: 'Both'
          },
        ]
      }

    },

    computed: {
      areEmptyFields() {
        if (!Boolean(this.cmpIdEdited) || !Boolean(this.cmiNombre) || !Boolean(this.cmiAplica)) return true
        else return false
      }
    },
    watch: {

    },

    async mounted() {
      await this.getAllComplementos();
    },

    created() {

    },

    methods: {


      async showModal() {
        this.$refs['complemento-items-modal'].show()

        if (Boolean(this.cmiDatos)) {
          await this.setData()
        }
        if (Boolean(this.cmpId)) {
          this.cmpIdEdited = this.cmpId;
        }
      },
      async hideModal() {
        this.$refs['complemento-items-modal'].hide()
      },

      savePrestacion() {
        let data = {
          cmpId: this.cmpIdEdited,
          cmiNombre: this.cmiNombre,
          cmiIcono: this.cmiIcono,
          cmiAplica: this.cmiAplica,
          cmiEstado: this.cmiEstado,
        };

        ComplementoItemServices.addComplementoItem(data)
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
            this.updateComplementoItem();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            // Elimino el ultimo elemento del array para evitar el bucle
          }
        })
      },
      updateComplementoItem() {
        let data = {
          cmpId: this.cmpIdEdited,
          cmiNombre: this.cmiNombre,
          cmiIcono: this.cmiIcono,
          cmiAplica: this.cmiAplica,
          cmiEstado: this.cmiEstado,
        };

        let cmiId = this.cmiDatos.cmiId;

        ComplementoItemServices.updateComplementoItem(cmiId, data)
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
        if (flag === "add") mensaje = "Prestación almacenada correctamente";
        else mensaje = "Prestación actualizada correctamente";
        this.$notify(type, title, mensaje, {
          duration: 3000,
          permanent: false
        });
      },

      clear() {
        this.cmiNombre = "",
          this.cmiIcono = "";
        this.cmiAplica = "";
      },
      setData() {
        let data = this.cmiDatos;
        this.cmpId = data.cmpId;
        this.cmiNombre = data.cmiNombre;
        this.cmiIcono = data.cmiIcono;
        this.cmiAplica = data.cmiAplica;
        this.cmiEstado = data.cmiEstado;
        // this.cmiIcono = data.pclMostrarCliente === 1 ? true : false
        // this.pclEstado = data.pclEstado === 1 ? true : false
      },
      getAllComplementos() {
        ComplementosServices
          .getAllComplementos()
          .then(response => this.complementos = response.data.data)
          .catch(error => console.log("Error en traer prestaciones ", error))
      }

    }

  }

</script>
