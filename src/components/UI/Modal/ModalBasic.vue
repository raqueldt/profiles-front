<template>
  <b-modal v-if="showModal" v-on:hide="closeModal">
    <div class="d-block text-center">
      <h5>{{ title }}</h5>
      <p>{{ text }}</p>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'CustomModal',
  props: {
    title: String,
    text: String,
    showModal: Boolean
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
/* Estilos adicionales específicos para tu componente, si es necesario */
</style>
