<template>
	<b-card class="m-1">
		<div class="row ">
			<div class="col-6">
				<b-img :src="imageSrc" alt="Card Image" thumbnail fluid class="rounded-circle border border-light" />
			</div>

			<div class="col">
				<div class="text-right">
					<h3>{{ title }}</h3>
					<p>{{ text }}</p>
				</div>
				<hr>
				<div class="row">
					<b-col md="12" v-for="(item, index) in adicional" :key="index" class="text">

						<b-row>
							<b-col> <label class="text-muted">{{ item.titulo }}</label></b-col>
							<b-col><label class="mb-0 text-center">{{ item.texto }}</label></b-col>
						</b-row>


					</b-col>
				</div>
			</div>
		</div>
	</b-card>
</template>

<script>
export default {
	name: 'Card',
	props: {
		title: String,
		imageSrc: String,
		text: String,
		adicional: Array // Cambiado a un Array
	}
}
</script>

<style scoped>
/* Estilos adicionales específicos para tu componente, si es necesario */
</style>
