<template>
  <b-card class="m-1">
    <div class="">
      <b-row>
        <b-col md="7">
          <p class="text-muted">{{ title }}</p>
          <span class="mb-0 text-center">{{ text }}</span>
        </b-col>
        <b-col md="" class="text-right">
          <div v-html="svg"></div>
        </b-col>
      </b-row>
    </div>
  </b-card>
</template>


<script>
export default {
	name: 'CardBasic',
	props: {
		title: String,
		text: String,
		svg: String // Propiedad para el código SVG
	}
};
</script>

<style scoped>
/* Agrega estilos específicos para este componente si es necesario */
</style>
