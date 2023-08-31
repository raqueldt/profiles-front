<template>
  <b-container>
    <!-- <h6>Prestaciones Clase</h6> -->

    <b-row class="my-2 align-items-center justify-content-center">
      <b-col lg="7" cols="6">
        <modal-add-prestaciones-clase flag="add" :preId="preId" :preNombre="preNombre"
          @reload="getAllPrestacionClaseByPreId"></modal-add-prestaciones-clase>
      </b-col>
      <b-col lg="3" cols="6">
          <b-input-group size="sm" inline>
            <b-form-input
              id="filter-input"
              class="rounded-left-select"
              v-model="filter"
              type="search"
              placeholder="Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" variant="light" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
      </b-col>
      <b-col lg="2" cols="6">
        <b-form-select size="sm" class="numPerPage rounded-select" v-model="perPage" :options="pageOptions"
          v-if="prestacionesClase.length > 5"></b-form-select>
      </b-col>
    </b-row>

    <b-table :items="prestacionesClase" :fields="fields" responsive :fixed="fixed" :per-page="perPage"
      :current-page="currentPage" show-empty small caption-top table-variant="light" head-variant="dark"  :filter="filter">

      <template #table-caption>
        Tipo de prestaciones por <b>{{preNombre}}:</b>
      </template>

      <!-- CABECERA -->
      <template v-slot:head(preNombre)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(pclDetalle)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(mostrarCliente)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(estado)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(actions)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>

      <template #cell(estado)="row">
          <span :class="row.item.cmiEstado === 1 ? 'text-success' : 'text-danger' ">
            {{row.item.estado}}
          </span>
      </template> 

      <template #cell(actions)="row">
        <modal-add-prestaciones-clase flag="edit" :preId="preId" :preNombre="preNombre" :pclDatos="row.item"
          @reload="getAllPrestacionClaseByPreId"></modal-add-prestaciones-clase>
        <b-button size="xs" variant="outline-primary" class="border-0" @click="confirmDelete(row.item.pclId)">
          <i class="glyph-icon simple-icon-trash"></i>
        </b-button>
      </template>

    </b-table>

    <b-pagination align="center" v-model="currentPage" :total-rows="prestacionesClase.length" :per-page="perPage"
      aria-controls="my-table" v-if="prestacionesClase.length > 10" size="sm">
    </b-pagination>

  </b-container>
</template>

<script>
  import PrestacionesClaseServices from "@/services/product/prestaciones/PrestacionesClaseServices.js"
  import ModalAddPrestacionesClase from "./ModalAddPrestacionesClase";

  export default {
    name: 'PrestacionesClase',
    components: {
      "modal-add-prestaciones-clase": ModalAddPrestacionesClase,
    },
    props: ["preId", "preNombre"],
    data() {
      return {
        filter: null,
        perPage: 10,
        currentPage: 1,
        fixed: true,
        pageOptions: [5, 10, 20, 50, {
          value: Number.MAX_SAFE_INTEGER,
          text: "show all"
        }],
        prestacionesClase: [],
        fields: [{
            key: 'preNombre',
            label: 'Prestación',
            tdClass: 'align-middle text-center',
            variant: 'secondary'
          },
          {
            key: 'pclDetalle',
            label: 'Detalle',
            tdClass: 'align-middle text-center',
            variant: 'light',
            sortable: true
          },
          {
            key: 'mostrarCliente',
            label: 'Mostrar en clientes',
            tdClass: 'align-middle text-center',
            variant: 'light'
          },
          {
            key: 'estado',
            label: 'Estado',
            tdClass: 'align-middle text-center',
            variant: 'light'
          },
          {
            key: 'actions',
            label: 'Acciones',
            tdClass: 'align-middle text-center',
            variant: 'light',
            thStyle: {
              width: "14%"
            },
          },
        ]
      }
    },

    methods: {
      confirmDelete(id) {
        this.$swal({
          title: 'Are you sure to delete?',
          text: ``,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, sure!',
          cancelButtonText: 'No, cancel!',
          confirmButtonColor: "#ED7117",
          reverseButtons: true
        }).then(result => {

          if (result.isConfirmed) {
            this.deletePrestacionClase(id);
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            // Elimino el ultimo elemento del array para evitar el bucle
          }
        })
      },

      deletePrestacionClase(id) {
        PrestacionesClaseServices
          .deletePrestacion(id)
          .then(response => {

            let mensaje = response.data.data;
            if (mensaje === 200) {
              this.successMessage("delete");
              this.getAllPrestacionClaseByPreId();
            } else {
              this.errorDeleteMessage(mensaje);
            }
          })
          .catch(error => console.log("Error en traer prestaciones ", error))
      },
      successMessage(flag) {
        var type = "success filled";
        var title = "Success";
        var mensaje = "";
        if (flag === "add") mensaje = "Prestación almacenada correctamente";
        if (flag === "delete") mensaje = "Registro eliminado correctamente";
        else mensaje = "Prestación actualizada correctamente";
        this.$notify(type, title, mensaje, {
          duration: 3000,
          permanent: false
        });
      },
      errorDeleteMessage(mensaje) {
        var type = "warning filled";
        var title = "Warning";
        var mensaje = mensaje;
        this.$notify(type, title, mensaje, {
          duration: 5000,
          permanent: false
        });
      },
      getAllPrestacionClaseByPreId() {
        PrestacionesClaseServices
          .getAllPrestacionClaseByPreId(this.preId)
          .then(response => this.prestacionesClase = response.data.data)
          .catch(error => console.log("Error en traer prestaciones ", error))
      }
    },
    async mounted() {
      await this.getAllPrestacionClaseByPreId()
    }
  }

</script>

<style lang="scss" scoped>


</style>
