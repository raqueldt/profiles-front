<template>
  <div>
    <multiselect v-model="selectedValue" :options="options" :multiple="true" track-by="value" label="text" />
  </div>
</template>

<script>
export default {
  props: {
    selected: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedValue: this.selected,
    };
  },
  watch: {
    selectedValue(newValue) {
      this.$emit('update:selected', newValue); // Emitir el evento con el nuevo valor
    },
  },
};
</script>

<style>
/* Estilos personalizados si es necesario */
</style>
