<template>
  <b-container fluid class="mx-2">
    <h2>Prestaciones</h2>

    <b-row class="my-2"  align-v="center">
      <b-col lg="7" cols="6" align-self="center">
        <modal-add-prestaciones @reload="getAllPrestaciones" flag="add" />
      </b-col>

      <b-col lg="3" cols="6" align-self="center">
          <b-input-group size="sm" inline>
            <b-form-input
              id="filter-input"
              class="rounded-left-select "
              v-model="filter"
              type="search"
              placeholder="Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" variant="light" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
      </b-col>            

      <b-col lg="2" cols="3" align-self="center">        
          <b-form-select size="sm" class="numPerPage rounded-select" v-model="perPage" :options="pageOptions"  v-if="prestaciones.length > 5"></b-form-select>        
      </b-col>
    </b-row>

    <b-table :items="prestaciones" :fields="fields" striped responsive="sm" :fixed="fixed" :per-page="perPage"
      :current-page="currentPage" small :filter="filter" >

      <!-- CABECERA -->
      <template v-slot:head(preNombre)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(preNota)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(preCodigo)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(preIcono)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(preColor)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(mostrarCliente)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(grupo)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(estado)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(show_details)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>


      <template #cell(estado)="row">
          <span :class="row.item.preEstado === 1 ? 'text-success' : 'text-danger' ">
            {{row.item.estado}}
          </span>
      </template> 

      <template #cell(show_details)="row">
        <modal-add-prestaciones @reload="getAllPrestaciones" flag="edit" :preIdEdit="row.item.preId" />
        <b-button size="sm" @click="row.toggleDetails" :variant="!row.detailsShowing ? 'outline-primary' : 'light' " class="border-0 d-inline">
          <!-- {{ row.detailsShowing ? 'Hide' : 'Show'}} -->
          <!-- <div :style="changeStyle(row.detailsShowing)">
            <div class="glyph-icon simple-icon-list d-inline" ></div>
          </div> -->
          <div v-if="row.detailsShowing">
            <div class="glyph-icon simple-icon-arrow-up d-inline" v-tooltip="{content: 'Close'  }"></div>            
          </div>
          <div v-else>
            <div class="glyph-icon simple-icon-list d-inline" v-tooltip="{content: 'Show classes'  }"  ></div>
          </div>
        </b-button>
      </template>

      <template #cell(preColor)="row">
        <b-container>
        <div class="d-flex align-items-center justify-content-center w-100">
            <div class="circleBase type2 text-center" :style="{background:row.item.preColor}" v-if="Boolean(row.item.preColor)"></div>
        </div>
        </b-container>
      </template>

      <template #row-details="row">
        
        <b-card class="mb-3" :key="row.item.preId">

          <prestaciones-clase :preId ="row.item.preId" :preNombre="row.item.preNombre"></prestaciones-clase>

          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
       
      </template>

    </b-table>

    <b-pagination align="center" v-model="currentPage" :total-rows="prestaciones.length" :per-page="perPage"
      aria-controls="my-table" v-if="prestaciones.length > 5">
    </b-pagination>

  </b-container>
</template>

<script>
  import PrestacionesServices from "@/services/product/prestaciones/PrestacionesServices.js"
  import ModalAddPrestaciones from "./ModalAddPrestaciones";
  import PrestacionesClase from "./PrestacionesClase";

  export default {
    name: 'PrestacionesParent',
    components: {
      "modal-add-prestaciones": ModalAddPrestaciones,
      "prestaciones-clase": PrestacionesClase,
    },

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
        prestaciones: [],
        fields: [{
            key: 'preNombre',
            label: 'Nombre',
            tdClass: 'align-middle text-center',
            sortable: true
          },
          //   {
          //     key: 'preNota',
          //     label: 'Note',
          //     tdClass: 'align-middle text-center'
          //   },
          {
            key: 'preCodigo',
            label: 'Código',
            tdClass: 'align-middle text-center'
          },
          {
            key: 'preIcono',
            label: 'Icono',
            tdClass: 'align-middle text-center'
          },
          {
            key: 'preColor',
            label: 'Color',
            tdClass: 'align-middle text-center',
            thStyle: {
              width: "8%"
            },
          },
          {
            key: 'mostrarCliente',
            label: 'Mostrar en clientes',
            tdClass: 'align-middle text-center'
          },
          {
            key: 'grupo',
            label: 'Grupos',
            tdClass: 'align-middle text-center'
          },
          {
            key: 'estado',
            label: 'Estado',
            tdClass: 'align-middle text-center'
          },
          {
            key: 'show_details',
            label: 'Acciones',
            tdClass: 'align-middle text-center',
            thStyle: {
              width: "14%"
            },
          },
          //   'show_details'
        ]
      }
    },
    computed: {
     
    },
    methods: {
    changeStyle(toggleDetails){
        if(toggleDetails) return 'text-decoration:line-through';
        else return 'text-decoration: none';
      },
      getAllPrestaciones() {
        PrestacionesServices
          .getAllPrestaciones()
          .then(response => this.prestaciones = response.data.data)
          .catch(error => console.log("Error en traer prestaciones ", error))
      }
    },
    async mounted() {
      await this.getAllPrestaciones()
    }
  }

</script>

<style lang="scss" scoped>
  .circleBase {
    border-radius: 50%;
  }

  .type2 {
    width: 20px;
    height: 20px;
  }



</style>
