<template>
  <b-container fluid class="mx-2">
    <h2>Complementos</h2>

    <b-row class="my-2"  align-v="center">
      <b-col lg="7" cols="4" align-self="center">
        <modal-add-complementos @reload="getAllComplementos" flag="add" />
      </b-col>

      <b-col lg="3" cols="5" align-self="center">
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
          <b-form-select size="sm" class="numPerPage rounded-select" v-model="perPage" :options="pageOptions"  v-if="complementos.length > 5"></b-form-select>        
      </b-col>
    </b-row>

    <b-table :items="complementos" :fields="fields" striped responsive="sm" :fixed="fixed" :per-page="perPage"
      :current-page="currentPage" show-empty  small :filter="filter">

      <!-- CABECERA -->
      <template v-slot:head(preNombre)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(cmpNombre)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(estado)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(show_details)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>

      <template #cell(estado)="row">
          <span :class="row.item.cmpEstado === 1 ? 'text-success' : 'text-danger' ">
            {{row.item.estado}}
          </span>
      </template>      

      <template #cell(show_details)="row">
        <modal-add-complementos @reload="getAllComplementos" flag="edit" :cmpIdEdit="row.item.cmpId" />
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

      <template #row-details="row">
        <b-card class="mb-3">

          <complemento-items :cmpId ="row.item.cmpId" :preNombre="row.item.preNombre" :cmpNombre="row.item.cmpNombre"></complemento-items>

          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>

    </b-table>

    <b-pagination align="center" v-model="currentPage" :total-rows="complementos.length" :per-page="perPage"
      aria-controls="my-table" v-if="complementos.length > 5">
    </b-pagination>

  </b-container>
</template>

<script>
  import ComplementosServices from "@/services/product/complementos/ComplementosServices.js"
  import ModalAddComplementos from "./ModalAddComplementos";
  import ComplementoItems from "./ComplementoItems";
//   import PrestacionesClase from "./PrestacionesClase";

  export default {
    name: 'ComplementosParent',
    components: {
      "modal-add-complementos": ModalAddComplementos,
      "complemento-items": ComplementoItems,
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
        complementos: [],
        fields: [
          {
            key: 'cmpNombre',
            label: 'Nombre',
            tdClass: 'align-middle text-center'
          },
          {
            key: 'preNombre',
            label: 'Prestación',
            tdClass: 'align-middle text-center',
            sortable: true
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
      getAllComplementos() {
        ComplementosServices
          .getAllComplementos()
          .then(response => this.complementos = response.data.data)
          .catch(error => console.log("Error en traer prestaciones ", error))
      }
    },
    async mounted() {
      await this.getAllComplementos()
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
