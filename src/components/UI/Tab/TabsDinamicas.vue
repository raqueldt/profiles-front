<template>
  <b-tabs>
    <b-tab v-for="(tab, index) in tabs" :key="index" :title="tab.nombre">
      <!-- Pasa datos como prop a cada componente -->
      <component :is="tab.component" :datos="datos"></component>
    </b-tab>
  </b-tabs>
</template>

<script>
export default {
  name: 'TabsDinamicas',
  props: {
    tabs: Array,
    datos: Object  // Agregar la prop datos
  }
};
</script>
