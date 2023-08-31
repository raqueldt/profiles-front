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

    <b-modal ref="prestaciones-clase-modal" centered :title="Boolean(pclDatos) ? 'Editar tipo de Prestación' : 'Añadir tipo de prestación'" ok-only ok-title="Close"
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
            <b-form-group label="Prestación" description="required">
              <!-- <b-form-input type="text" maxlength="50"  v-model="preNombre" placeholder="Type name" /> -->
              
                <b-form-select size="sm" class="rounded-select" v-model="preIdEdited" :options="prestaciones"
                text-field="preNombre" value-field="preId"></b-form-select>

            </b-form-group>
          </b-col>
          <b-col lg="6" md="12" xs="12" cols="12">
            <b-form-group label="Detalle" description="required">
              <b-form-input type="text" maxlength="80" v-model="pclDetalle" placeholder="Digite detalle" class="rounded-select" />
            </b-form-group>
          </b-col>        

          <b-col lg="12" md="12" xs="12" cols="12">
            <b-row class="align-items-center justify-content-center text-center">
              <b-col lg="6" md="6" xs="6" cols="6">
                <label>Mostrar en clientes</label><br>
                <switches v-model="pclMostrarCliente" theme="custom" color="primary" class="vue-switcher-small">
                </switches>
              </b-col>

              <b-col lg="6" md="6" xs="6" cols="6">
                <label>Estado</label><br>
                <switches v-model="pclEstado" theme="custom" color="primary" class="vue-switcher-small"></switches>
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
  import PrestacionesClaseServices from "@/services/product/prestaciones/PrestacionesClaseServices.js"
  import PrestacionesServices from "@/services/product/prestaciones/PrestacionesServices.js"

  export default {

    name: 'ItineraryInfoModal',
    components: {
      switches: Switches
    },
    props: ["flag", "preId", "preNombre", "pclDatos"],
    data() {

      return {
        preIdEdited: "",
        pclDetalle: "",
        pclMostrarCliente: false,
        pclEstado: true,
        isLoading: false,
        prestaciones:[]
      }

    },

    computed: {
      areEmptyFields() {
        if ( !Boolean(this.pclDetalle)) return true
        else return false
      }
    },
    watch: {

    },

    async mounted() {      
      await this.getAllPrestaciones();
    },

    created() {

    },

    methods: {


      async showModal() {
        this.$refs['prestaciones-clase-modal'].show()

        if(Boolean(this.pclDatos)){
            await this.setData()
        }
        if (Boolean(this.preId)) {
          this.preIdEdited = this.preId;
        }
      },
      async hideModal() {
        this.$refs['prestaciones-clase-modal'].hide()
      },

      savePrestacion() {
        let data = {
          preId: this.preIdEdited,
          pclDetalle: this.pclDetalle,
          pclMostrarCliente: this.pclMostrarCliente,
          pclEstado: this.pclEstado,
        };

        PrestacionesClaseServices.addPrestacionClase(data)
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
            this.updatePrestacionClase();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            // Elimino el ultimo elemento del array para evitar el bucle
          }
        })
      },
      updatePrestacionClase() {
        let data = {
          preId: this.preIdEdited,
          pclDetalle: this.pclDetalle,
          pclMostrarCliente: this.pclMostrarCliente,
          pclEstado: this.pclEstado,
        };

        let pclId = this.pclDatos.pclId;

        PrestacionesClaseServices.updatePrestacionClase(pclId, data)
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
          this.pclDetalle = ""
      },
      setData(){
        let data = this.pclDatos;     
        this.pclDetalle         = data.pclDetalle
        this.pclMostrarCliente  = data.pclMostrarCliente === 1 ? true : false
        this.pclEstado          = data.pclEstado === 1 ? true : false       
      },
      getAllPrestaciones() {
        PrestacionesServices
          .getAllPrestaciones()
          .then(response => this.prestaciones = response.data.data)
          .catch(error => console.log("Error en traer prestaciones ", error))
      }      

    }

  }

</script>
