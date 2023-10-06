<template>
	<div>
		<!-- {{ items }} -->
		<!-- {{ filters }} -->
		<b-table striped responsive show-empty :items="filtered" :fields="dynamicFields">
			<template slot="top-row" slot-scope="{ fields }">
				<td v-for="field in fields" :key="field.key">
					<input v-model="filters[field.key]" v-if="field.key != 'actions' && field.key != 'departamento'"
						class="form-control" :placeholder="field.label">
					<b-select v-if="field.key == 'departamento'" class="form-control" v-model="filters[field.key]"
						:placeholder="field.label">
						<option value="">Seleccionar departamento</option>
						<option v-for="depto in uniqueDepartments" :value="depto">{{ depto }}</option>
					</b-select>
					<b-button v-if="field.key == 'actions'" @click=""> <i class="iconsminds-reload"></i></b-button>
				</td>
			</template>


			<template v-slot:cell(actions)="data">
				<div class="row justify-content-center" v-if="selectedTab == 0">
					<b-button @click="handleEditClick(data.item)" class="btn-sm"> <i class="iconsminds-pen"></i></b-button>
					<b-button @click="handleInactivarClick(data.item)" class="btn-sm ml-1"> <i
							class="fa fa-power-off text-danger"></i></b-button>
				</div>
				<div class="row justify-content-center" v-if="selectedTab == 1">
					<b-button @click="handleActivarClick(data.item)" class="btn-sm ml-1"> <i
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
		items: Array,
		fields: Array,
		perPage: Number,
		options: Object,
		editButton: Boolean,
		selectedTab: Number
	},
	data() {
		return {
			currentPage: 1,
			displayedItems: [],
			searchTerm: '',
			filters: {
				id: '',
				nombre_completo: '',
				departamento: '',
				email: '',
				extension: '',
			},
			uniqueDepartments: [],
			selectedTabValue: this.selectedTab,
			lista: this.items
		};
	},
	computed: {

		startIndex() {
			return (this.currentPage - 1) * this.perPage;
		},
		endIndex() {
			return this.currentPage * this.perPage;
		},
		filtered() {
			const filtered = this.lista.map(item => {
				// const { users_id, estado_id, ...filteredItem } = item;
				const { ...filteredItem } = item;
				return filteredItem;
			}).filter(item => {
				return Object.keys(this.filters).every(key =>
					String(item[key]).toLowerCase().includes(this.filters[key].toLowerCase())
				);
			});
			return filtered.length > 0 ? filtered : [{
				id: '',
				departamento: ''
			}]
		},
		dynamicFields() {
			if (this.selectedTab === 0) {
				return [
					{ key: 'nombre_completo', label: 'Nombre', sortable: true, filterable: true },
					{ key: 'email', label: 'Correo', sortable: true, filterable: true },
					{ key: 'departamento', label: 'Departamento', sortable: true, filterable: true },
					// { key: 'cargo', label: 'Cargo', sortable: true, filterable: true },
					{ key: 'extension', label: 'Extension', sortable: true, filterable: true },
					{ key: 'actions', label: '' },
				];
			} else if (this.selectedTab === 1) {
				return [
					{ key: 'nombre_completo', label: 'Nombre', sortable: true, filterable: true },
					{ key: 'email', label: 'Correo', sortable: true, filterable: true },
					{ key: 'departamento', label: 'Departamento', sortable: true, filterable: true },
					{ key: 'cargo', label: 'Cargo', sortable: true, filterable: true },
					{ key: 'actions', label: '' },
				];
			} else {
				// Manejar otros casos si es necesario
				return [];
			}
		},
	},
	watch: {
		items() {
			this.updateDisplayedItems(1);
		},
		currentPage(newPage) {
			this.updateDisplayedItems(newPage);
		}
	},
	methods: {
		handleSearch() {
			this.displayedItems = this.items.filter(item => {
				return item.nombre_completo.toLowerCase().includes(this.searchTerm.toLowerCase());
			});
		},
		onPageChange(newPage) {
			this.currentPage = newPage;
		},
		updateDisplayedItems(newPage) {
			this.displayedItems = this.items.slice(this.startIndex, this.endIndex);
		},
		handleEditClick(item) {
			console.log("EDITAR", item);
			this.$emit('editar-click', 'editUser', item.users_id);
		},
		handleInactivarClick(item) {
			this.$emit('inactivar-click', item);
		},
		handleActivarClick(item) {
			this.$emit('activar-click', item);
		},
		onPageChange(newPage) {
			this.currentPage = newPage;
			if (this.currentPage < 1) {
				this.currentPage = 1;
			}
			if (this.currentPage > this.totalPages) {
				this.currentPage = this.totalPages;
			}
			this.updateDisplayedItems(this.currentPage);
		}
	},
	mounted() {
		this.updateDisplayedItems(this.currentPage);
		const departments = new Set(this.items.map(item => item.departamento));
		this.uniqueDepartments = [...departments];
	},
};
</script>
