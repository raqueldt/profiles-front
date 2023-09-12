<template>
	<b-card class="m-1">
		<div class="row ">
			<div class="col">
				<div class="text-left font-italic text-muted">
					<span> {{ text }} </span>
				</div>
				<div class="text-center">
					<b-img :src="imageSrc" alt="Card Image" thumbnail fluid
						class="rounded-circle border border-light mt-3 w-40" />
					<br>
					<h4>{{ title }}</h4>
					<label>{{ subtitle }} </label><br>
				</div>
				<hr>
				<div class="row">
					<b-col md="12" v-for="(item, index) in adicional" :key="index" class="text-left">
						<b-row>
							<b-col md="5">
								<label class="text-muted">{{ item.titulo }}</label>
							</b-col>
							<b-col>
								<label class="mb-0 text-center" v-if="item.texto == '1'">Si</label>
								<label class="mb-0 text-center" v-else-if="item.texto == '2'">No</label>
								<label class="mb-0 text-center" v-else>{{ item.texto }}</label>
							</b-col>
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
		subtitle: String,
		text: String,
		imageSrc: String,
		adicional: Array // Cambiado a un Array
	}
}
</script>

<style scoped>
/* Estilos adicionales específicos para tu componente, si es necesario */
</style>
