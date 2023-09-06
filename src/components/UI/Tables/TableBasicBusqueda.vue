<template>
  <div>
    <!-- Agrega un campo de entrada para el filtro -->
    <input type="text" v-model="searchTerm" placeholder="Buscar por nombre completo" />
    <b-table :items="displayedItems" :fields="fields" :per-page="perPage" :options="options" responsive bordered striped hover></b-table>
    <b-pagination v-model="currentPage" :total-rows="items.length" :per-page="perPage" align="center" @change="onPageChange"></b-pagination>
  </div>
</template>

<script>
export default {
  name: 'TableBasic',
  props: {
    items: Array, // Los datos de la tabla original
    fields: Array, // Los campos de la tabla
    perPage: Number, // Número de elementos por página
    options: Object // Las opciones personalizadas
  },
  data() {
    return {
      currentPage: 1,
      displayedItems: [], // Variable para mostrar los datos de la página actual
      searchTerm: '' // Propiedad para el término de búsqueda
    };
  },
  computed: {
    // Calcula el rango de índices de los elementos a mostrar en la página actual
    startIndex() {
      return (this.currentPage - 1) * this.perPage;
    },
    endIndex() {
      return this.currentPage * this.perPage;
    }
  },
  watch: {
    // Observa los cambios en la página actual y el término de búsqueda
    currentPage(newPage) {
      this.updateDisplayedItems(newPage);
    },
    searchTerm(newTerm) {
      this.updateDisplayedItems(this.currentPage);
    }
  },
  methods: {
    onPageChange(newPage) {
      this.currentPage = newPage;
    },
    // Actualiza los datos mostrados según la página actual y el término de búsqueda
    updateDisplayedItems(newPage) {
      const filteredItems = this.items.filter(item => {
        // Filtra por nombre_completo si hay un término de búsqueda
        return this.searchTerm ? item.nombre_completo.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
      });
      this.displayedItems = filteredItems.slice(this.startIndex, this.endIndex);
    }
  },
  created() {
    // Al crear el componente, inicialmente muestra los datos de la primera página
    this.updateDisplayedItems(this.currentPage);
  }
}
</script>

<style scoped>
/* Estilos CSS específicos para este componente de tabla según tu sistema de diseño */
</style>
