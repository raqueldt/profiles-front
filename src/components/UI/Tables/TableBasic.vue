<template>
	<div>
		{{ selectedTab }}
		<!-- {{ items }} -->
		<b-table :items="displayedItems" :fields="fields" :per-page="perPage" :options="options" responsive bordered hover
			style="overflow-x: hidden;">

			<template v-slot:cell(edit)="data">
				<div class="row justify-content-center" v-if="selectedTab==0">
					<b-button @click="handleEditClick(data.item)" class="btn-sm"> <i class="iconsminds-pen"></i></b-button>
					<b-button @click="handleInactivarClick(data.item)" class="btn-sm ml-1"> <i
							class="fa fa-power-off text-danger"></i></b-button>
				</div>
				<div class="row justify-content-center" v-if="selectedTab==1">
					<b-button @click="handleActivarClick(data.item)" class="btn-sm ml-1"> <i
							class="fa fa-power-off text-success"></i></b-button>
				</div>
			<!-- </template>
			<template v-slot:cell(delete)="data"> -->
				<div class="row justify-content-center mt-1">
				</div>
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
		editButton: Boolean,
		selectedTab: String
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
			// alert("dsnglkds", item);
			this.$emit('editar-click', item);
		},
		handleInactivarClick(item) {
			// alert("dsnglkds", item);
			this.$emit('inactivar-click', item);
		},
		handleActivarClick(item) {
			// alert("dsnglkds", item);
			this.$emit('activar-click', item);
		}
	},
	mounted() {
		// Al montar el componente, inicialmente muestra los datos de la primera página
		this.updateDisplayedItems(this.currentPage);
	},
};
</script>

<style scoped>
/* Estilos CSS específicos para este componente de tabla según tu sistema de diseño */
</style>
