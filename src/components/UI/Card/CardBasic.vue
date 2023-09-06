<template>
  <b-card>
      <div class="col-md-8">
        <h4>{{ title }}</h4>
        <p>{{ text }}</p>


    </div>
  </b-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
    text: String,
  }
}
</script>

<style scoped>
/* Estilos adicionales específicos para tu componente, si es necesario */
</style>
