<template>
	<b-card class="m-1">
		<div class="row ">
			<div class="col-4">
				<b-img :src="imageSrc" alt="Card Image" thumbnail fluid class="rounded-circle border border-light mt-3" />
				<br>
				<div class="text-center font-italic text-muted m-1 ">
					<span> {{ text }} </span>
				</div>
			</div>

			<div class="col">
				<div class="text-right">
					<h3>{{ title }}</h3>
					<span>{{ subtitle }} </span><br>

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
