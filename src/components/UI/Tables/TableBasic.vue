<template>
	<div>
		<b-table :items="displayedItems" :per-page="perPage" :options="options" responsive bordered hover>
			<!-- Otras columnas... -->
			<b-table-column label="Columna Estática">
				<template v-slot="data">
					Contenido Estático
				</template>
			</b-table-column>
			<!-- Columna de botón de editar -->
			<template v-if="editButton">
				<b-table-column label="Editar">
					<template v-slot="data">
						<b-button @click="handleEditClick(data.item)">Editar</b-button>
					</template>
				</b-table-column>
			</template>
		</b-table>
		<b-pagination v-model="currentPage" :total-rows="items.length" :per-page="perPage" align="center"
			@change="onPageChange"></b-pagination>
	</div>
</template>

<script>
export default {
	name: 'TableBasic',
	props: {
		items: Array, // Los datos de la tabla original
		fields: Array, // Los campos de la tabla
		perPage: Number, // Número de elementos por página
		options: Object, // Las opciones personalizadas
		editButton: Boolean
	},
	data() {
		return {
			currentPage: 1,
			displayedItems: [] // Variable para mostrar los datos de la página actual
		};
	},
	computed: {
		// Calcula el rango de índices de los elementos a mostrar en la página actual
		startIndex() {
			return (this.currentPage - 1) * this.perPage;
		},
		endIndex() {
			return this.currentPage * this.perPage;
		}
	},
	watch: {
		items() {
			this.updateDisplayedItems(1);
		},
		// Observa los cambios en la página actual y actualiza los datos mostrados
		currentPage(newPage) {
			this.updateDisplayedItems(newPage);
		}
	},
	methods: {
		onPageChange(newPage) {
			this.currentPage = newPage;
		},
		// Actualiza los datos mostrados según la página actual
		updateDisplayedItems(newPage) {
			this.displayedItems = this.items.slice(this.startIndex, this.endIndex);
		},
		handleEditClick(item) {
			// Lógica para manejar el clic en el botón de editar
			// Puedes emitir un evento para notificar a GeneralTeam que se hizo clic en editar
			this.$emit('editar-click', item);
		}
	},
	mounted() {
		// Al montar el componente, inicialmente muestra los datos de la primera página
		this.updateDisplayedItems(this.currentPage);
		// this.onPageChange(this.currentPage);
	},

}
</script>

<style scoped>
/* Estilos CSS específicos para este componente de tabla según tu sistema de diseño */
</style>
