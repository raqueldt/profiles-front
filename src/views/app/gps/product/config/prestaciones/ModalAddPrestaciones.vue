<template>

  <div class="d-inline ">

    <template>
      <b-button @click="showModal()" variant="primary" class="border-0" size="sm" v-if="flag==='add'" >
        <a> <i class="glyph-icon simple-icon-plus"></i> Añadir prestación</a>
      </b-button>
      <b-button @click="showModal()" variant="outline-primary" class="border-0 d-inline" size="sm" v-if="flag==='edit'">
         <i class="glyph-icon simple-icon-pencil"></i> 
      </b-button>
    </template>

    <b-modal ref="prestaciones-modal" centered :title="flag === 'add' ? 'Añadir prestación' : 'Editar prestación'" ok-only ok-title="Close"
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
          <b-col lg="6" md="12" xs="12" cols="12">
            <b-form-group label="Nombre" description="required">
              <b-form-input type="text" maxlength="50" v-model="preNombre" placeholder="Digite nombre"  class="rounded-select"/>
            </b-form-group>
          </b-col>
          <b-col lg="6" md="12" xs="12" cols="12">
            <b-form-group label="Código" description="required">
              <b-form-input type="text" maxlength="5" v-model="preCodigo" placeholder="Digite código" class="rounded-select"/>
            </b-form-group>
          </b-col>

          <b-col lg="6" md="12" xs="12" cols="12">
            <b-form-group label="Icono" description="">
              <b-form-input type="text" maxlength="10" v-model="preIcono" placeholder="Digite ícono" class="rounded-select"/>
            </b-form-group>
          </b-col>

          <b-col lg="6" md="12" xs="12" cols="12">
            <b-form-group label="Color" description="">
              <b-form-input type="color" v-model="preColor" placeholder="Seleccione color" />
            </b-form-group>
          </b-col>

          <b-col lg="12" md="12" xs="12" cols="12">
            <b-row class="align-items-center justify-content-center text-center">
              <b-col lg="4" md="4" xs="4" cols="4">
                <label>Mostrar en clientes</label><br>
                <switches v-model="preMostrarCliente" theme="custom" color="primary" class="vue-switcher-small">
                </switches>
              </b-col>

              <b-col lg="4" md="4" xs="4" cols="4">
                <label>Grupos</label><br>
                <switches v-model="preGrupo" theme="custom" color="primary" class="vue-switcher-small"></switches>
              </b-col>

              <b-col lg="4" md="4" xs="4" cols="4">
                <label>Estado</label><br>
                <switches v-model="preEstado" theme="custom" color="primary" class="vue-switcher-small"></switches>
              </b-col>
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

  export default {

    name: 'ItineraryInfoModal',
    components: {
      switches: Switches
    },
    props: ["flag", "preIdEdit"],
    data() {

      return {
        preNombre: "",
        preCodigo: "",
        preIcono: "",
        preColor: "",
        preMostrarCliente: false,
        preGrupo: false,
        preEstado: true,

        isLoading: false,
      }

    },

    computed: {
      areEmptyFields() {
        if (!Boolean(this.preNombre) || !Boolean(this.preCodigo)) return true
        else return false
      }
    },

    watch: {



    },


    async mounted() {
       

    },


    created() {



    },


    methods: {


      async showModal() {
        this.$refs['prestaciones-modal'].show()

        if(Boolean(this.preIdEdit)){
            await this.getPrestacionByPreId()
        }

      },
      async hideModal() {
        this.$refs['prestaciones-modal'].hide()
      },

      savePrestacion() {
        let data = {
          preNombre: this.preNombre,
          preCodigo: this.preCodigo,
          preIcono: this.preIcono,
          preColor: this.preColor,
          preMostrarCliente: this.preMostrarCliente,
          preGrupo: this.preGrupo,
          preEstado: this.preEstado,
        };

        PrestacionesServices.addPrestacion(data)
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
        }).then( result => {

          if (result.isConfirmed) {
            this.updatePrestacion();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            // Elimino el ultimo elemento del array para evitar el bucle
          }
        })
      },
      updatePrestacion() {
        let data = {
          preNombre: this.preNombre,
          preCodigo: this.preCodigo,
          preIcono: this.preIcono,
          preColor: this.preColor,
          preMostrarCliente: this.preMostrarCliente,
          preGrupo: this.preGrupo,
          preEstado: this.preEstado,
        };

        PrestacionesServices.updatePrestacion(this.preIdEdit, data)
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
        if(flag==="add") mensaje = "Prestación almacenada correctamente";
        else mensaje = "Prestación actualizada correctamente";
        this.$notify(type, title, mensaje, {
          duration: 3000,
          permanent: false
        });
      },

      clear() {
          this.preNombre = "",
          this.preCodigo = "",
          this.preIcono = "",
          this.preColor = "",
          this.preMostrarCliente = false,
          this.preGrupo = false,
          this.preEstado = true
      },
      getPrestacionByPreId(){
        let preId = this.preIdEdit;        
        PrestacionesServices.getAllPrestacionByPreId(preId)
          .then((response) => {
            let prestacion = response.data.data;
            if (prestacion) {
                this.preNombre          = prestacion.preNombre
                this.preCodigo          = prestacion.preCodigo
                this.preIcono           = prestacion.preIcono
                this.preColor           = prestacion.preColor
                this.preMostrarCliente  = prestacion.preMostrarCliente === 1 ? true : false
                this.preGrupo           = prestacion.preGrupo === 1 ? true : false
                this.preEstado          = prestacion.preEstado === 1 ? true : false
            }
          })
          .catch((error) => {
            console.log(error);
          });
        
      }

    }

  }

</script>
