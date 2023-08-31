<template>
  <b-container>

    <b-row class="my-2 align-items-center justify-content-center">
      <b-col lg="7" cols="6">
        <modal-add-complemento-items flag="add" :cmpId="cmpId" :preNombre="preNombre"
          @reload="getAllComplementosItemCmpId"></modal-add-complemento-items>
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
          v-if="complementosItems.length > 5"></b-form-select>
      </b-col>
    </b-row>

    <b-table :items="complementosItems" :fields="fields" responsive :fixed="fixed" :per-page="perPage"
      :current-page="currentPage" show-empty small caption-top table-variant="light" head-variant="dark"  :filter="filter">

      <template #table-caption>
        Complemento: <b>{{cmpNombre}}</b>,    Prestación: <b>{{preNombre}}</b>
      </template>

      <!-- CABECERA -->
      <template v-slot:head(preNombre)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(cmpNombre)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(cmiNombre)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(cmiIcono)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(cmiAplica)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(estado)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>
      <template v-slot:head(actions)="data">
        <div class="text-center">{{ data.label }}</div>
      </template>    

      <!-- DETALLES -->
       <template #cell(cmiAplica)="row">
            {{formatAplica(row.item.cmiAplica)}}
        </template>  

      <template #cell(estado)="row">
          <span :class="row.item.cmiEstado === 1 ? 'text-success' : 'text-danger' ">
            {{row.item.estado}}
          </span>
      </template>        

      <template #cell(actions)="row">
        <modal-add-complemento-items flag="edit" :cmpId="cmpId" :preNombre="preNombre" :cmiDatos="row.item"
          @reload="getAllComplementosItemCmpId"></modal-add-complemento-items>
        <b-button size="xs" variant="outline-primary" class="border-0" @click="confirmDelete(row.item.cmiId)">
          <i class="glyph-icon simple-icon-trash"></i>
        </b-button>
      </template>

    </b-table>

    <b-pagination align="center" v-model="currentPage" :total-rows="complementosItems.length" :per-page="perPage"
      aria-controls="my-table" v-if="complementosItems.length > 10" size="sm">
    </b-pagination>

  </b-container>
</template>

<script>
    import ComplementoItemServices from "@/services/product/complementos/ComplementoItemServices.js"
    import ModalAddComplementosItem from "./ModalAddComplementosItem";

  export default {
    name: 'ComplementoItems',
    components: {
      "modal-add-complemento-items": ModalAddComplementosItem,
    },
    props: ["cmpId", "preNombre", "cmpNombre"],
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
        complementosItems: [],
        fields: [
          {
            key: 'cmpNombre',
            label: 'Complemento',
            tdClass: 'align-middle text-center',
            variant: 'secondary'
          },
          // {
          //   key: 'preNombre',
          //   label: 'Prestación',
          //   tdClass: 'align-middle text-center',
          //   variant: 'light'
          // },                      
          {
            key: 'cmiNombre',
            label: 'Item',
            tdClass: 'align-middle text-center',
            variant: 'light',
            sortable: true
          },
          {
            key: 'cmiIcono',
            label: 'Icono',
            tdClass: 'align-middle text-center',
            variant: 'light'
          },
          {
            key: 'cmiAplica',
            label: 'Aplica',
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
            label: 'Actions',
            tdClass: 'align-middle text-center',
            variant: 'light',
            thStyle: {
              width: "14%"
            },
          },
        ],
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
            this.deleteComplementoItem(id);
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === this.$swal.DismissReason.cancel
          ) {
            // Elimino el ultimo elemento del array para evitar el bucle
          }
        })
      },

      deleteComplementoItem(id) {
        ComplementoItemServices
          .deleteComplementoItem(id)
          .then(response => {
            let mensaje = response.data.data;
            if (mensaje === 200) {
              this.successMessage("delete");
              this.getAllComplementosItemCmpId();
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
      getAllComplementosItemCmpId() {
        ComplementoItemServices
          .getAllComplementosItemCmpId(this.cmpId)
          .then(response => this.complementosItems = response.data.data)
          .catch(error => console.log("Error en traer prestaciones ", error))
      },
      formatAplica(item){          
          return this.aplicaList.filter(f => f.id === item).map(a => a.value).toString()
      }
    },
    async mounted() {
      await this.getAllComplementosItemCmpId()
    }
  }

</script>

<style lang="scss" scoped></style>
