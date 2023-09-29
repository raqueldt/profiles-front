<template>
	<div>
		<b-table striped responsive show-empty :items="filtered" :fields="fields">
			<template slot="top-row" slot-scope="{ fields }">
				<td v-for="field in fields" :key="field.key">
					<input v-model="filters[field.key]" v-if="field.key != 'actions' && field.key != 'departamento'"
						class="form-control" :placeholder="field.label">
					<b-select v-if="field.key == 'departamento'" class="form-control" v-model="filters[field.key]"
						:placeholder="field.label">
						<option value="">Seleccionar departamento</option>
						<option v-for="depto in uniqueDepartments" :value="depto">{{ depto }}</option>
					</b-select>
					<b-button v-if="field.key == 'actions'"> <i class="iconsminds-reload"></i></b-button>
				</td>
			</template>


			<template v-slot:cell(actions)="data">
				<div class="row justify-content-center" v-if="selectedTab == 0">
					<b-button @click="handleEditClick(actions.item)" class="btn-sm"> <i
							class="iconsminds-pen"></i></b-button>
					<b-button @click="handleInactivarClick(actions.item)" class="btn-sm ml-1"> <i
							class="fa fa-power-off text-danger"></i></b-button>
				</div>
				<div class="row justify-content-center" v-if="selectedTab == 1">
					<b-button @click="handleActivarClick(actions.item)" class="btn-sm ml-1"> <i
							class="fa fa-power-off text-success"></i></b-button>
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
			displayedItems: [], // Variable para mostrar los datos de la página actual
			searchTerm: '',
			filters: {
				id: '',
				issuedBy: '',
				issuedTo: ''
			},
			uniqueDepartments: []
			// items: [{ id: 1234, issuedBy: 'Operator', issuedTo: 'abcd-efgh' }, { id: 5678, issuedBy: 'User', issuedTo: 'ijkl-mnop' }]
		};
	},
	computed: {
		// Calcula el rango de índices de los elementos a mostrar en la página actual
		startIndex() {
			return (this.currentPage - 1) * this.perPage;
		},
		endIndex() {
			return this.currentPage * this.perPage;
		},
		filtered() {
			const filtered = this.items.map(item => {
				const { users_id, estado_id, ...filteredItem } = item; // Desestructura para excluir estado_id
				return filteredItem;
			}).filter(item => {
				return Object.keys(this.filters).every(key =>
					String(item[key]).toLowerCase().includes(this.filters[key].toLowerCase())
				);
			});
			return filtered.length > 0 ? filtered : [{
				id: '',
				issuedBy: '',
				issuedTo: ''
			}]
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
		handleSearch() {
			// Filtra los datos en función del término de búsqueda
			this.displayedItems = this.items.filter(item => {
				return item.nombre_completo.toLowerCase().includes(this.searchTerm.toLowerCase());
			});
		},
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
		},
		onPageChange(newPage) {
			this.currentPage = newPage;
			// Asegúrate de que la página actual sea válida
			if (this.currentPage < 1) {
				this.currentPage = 1;
			}
			if (this.currentPage > this.totalPages) {
				this.currentPage = this.totalPages;
			}
			// Actualiza los datos mostrados según la página actual
			this.updateDisplayedItems(this.currentPage);
		}
	},
	mounted() {
		// Al montar el componente, inicialmente muestra los datos de la primera página
		this.updateDisplayedItems(this.currentPage);
		const departments = new Set(this.items.map(item => item.departamento));
		this.uniqueDepartments = [...departments];
	},
};
</script>

<style scoped>
/* Estilos CSS específicos para este componente de tabla según tu sistema de diseño */
</style>
