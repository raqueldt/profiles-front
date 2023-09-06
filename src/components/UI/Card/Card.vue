<template>
  <b-card>
    <div class="row m-1">
      <div class="col-md-4">
        <b-img :src="imageSrc" alt="Card Image" thumbnail fluid rounded-circle />
      </div>

      <div class="col-md-8">
        <h4>{{ title }}</h4>
        <p>{{ text }}</p>

        <!-- Footer de la tarjeta -->
      </div>
    </div>
        <b-card-footer>
          {{ footer }}
        </b-card-footer>
  </b-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
    imageSrc: String,
    text: String,
    footer: String
  }
}
</script>

<style scoped>
/* Estilos adicionales específicos para tu componente, si es necesario */
</style>
