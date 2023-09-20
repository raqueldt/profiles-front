<template>
  <b-table :items="items" :per-page="perPage" :options="options" responsive bordered hover>
    <b-table-column label="Editar">
      <template v-slot="data">
        <b-button @click="handleEditClick(data.item)">Editar</b-button>
      </template>
    </b-table-column>
    <!-- Otras columnas aquí -->
  </b-table>
</template>

<script>
export default {
  props: {
    items: Array,
    perPage: Number,
    options: Object,
    fields: Array // Nueva prop para los campos
  },
  methods: {
    handleEditClick(item) {
      this.$emit('editar-click', item);
    }
  }
}
</script>

<style scoped>
/* Estilos CSS específicos para este componente de tabla según tu sistema de diseño */
</style>
