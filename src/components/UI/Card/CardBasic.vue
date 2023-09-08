<template>
	<b-card class="m-1">
		<div class="card-body">
			<div class="d-flex">
				<div class="flex-grow-1">
					<p class="text-muted">{{ title }}</p>
					<span class="mb-0 text-center">{{ text }}</span>
				</div>
				<div class="flex align-self-center">
					<div v-html="svg"></div>
				</div>
			</div>
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
