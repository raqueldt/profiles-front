<template>
  <div>
    <b-table :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    items: Array, // Los datos de la tabla
    fields: Array // Los campos de la tabla
  }
}
</script>

<style scoped>
/* Estilos CSS específicos para este componente de tabla según tu sistema de diseño */
</style>
