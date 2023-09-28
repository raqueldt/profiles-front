<template>
	<div>
		<ModalBasic :show-modal="modalVisible" :modal-size="modalSize" @close="closeModal" title="crear">
			<template v-if="modalContent.component">
				<component :is="modalContent.component" @usuario-creado="closeModal" actionModal="jaja"></component>
			</template>
		</ModalBasic>

		<b-card>
			<b-card-header>
				<div class="d-flex justify-content-between align-items-center mb-3">
					<h5 class="m-0" v-if="filteredUsers">Usuarios <small>| {{ filteredUsers.length }} </small> </h5>
					<ButtonBasic variant="primary" text="New User" @click="handleClick" />
				</div>
			</b-card-header>
			<!-- {{ usersDefault }} -->
			<!-- {{ selectedTab }} -->
			<b-tabs v-model="selectedTab">
				<b-tab v-for="(tab, index) in tabs" :key="index" :title="tab.title" @click="filterUsers(tab.statusCode)">
					<TableBasic :items="filteredUsers" :fields="fields" :perPage="5" :options="opciones" :editButton="true"
						@editar-click="handleEditarClick" @eliminar-click="handleEliminarClick"
						:selectedTab="selectedTab" />
				</b-tab>
			</b-tabs>


		</b-card>
	</div>
</template>

<script>
import internoServices from "../../../../../services/profiles/interno/internoServices";
import { mapGetters } from "vuex";
import TableBasic from '../../../../../components/UI/Tables/TableBasic.vue';
import TableBasicEdit from '../../../../../components/UI/Tables/TableBasicEdit.vue';
import ButtonBasic from '../../../../../components/UI/Button/ButtonBasic.vue';
import ModalBasic from '../../../../../components/UI/Modal/ModalBasic.vue';
import User from '../user/createuser.vue';
import TabsEstaticas from '../../../../../components/UI/Tab/TabsEstaticas.vue';

export default {
	components: {
		TableBasic,
		TableBasicEdit,
		ButtonBasic,
		ModalBasic,
		User,
		TabsEstaticas
	},
	name: "General",
	data() {
		return {
			datos: [],
			selectedTab: 'Activos',
			usersDefault: [], // Array para usuarios cargados inicialmente
			showActivos: true,
			usersPasivos: [],
			modalVisible: false,
			modalContent: {
				title: 'Título del Modal',
				text: 'Contenido del Modal'
			},
			pestanas: [
				{ nombre: 'Infomación general', component: TableBasic },
				{ nombre: 'Mis Solicitudes', component: TableBasic },
			],
			tabs: [],

			modalSize: 'xl',
			opcionesEdit: {},
			datosEstaticos: [
				{ id: 1, nombre: 'Ejemplo 1', edad: 30 },
				{ id: 2, nombre: 'Ejemplo 2', edad: 25 },
			],
			campos: ['id', 'nombre', 'edad'], // Definición de los campos
			fields: [
				// Definir las columnas de la tabla
				{ key: 'nombre_completo', label: 'Nombre' },
				{ key: 'email', label: 'Correo' },
				{ key: 'departamento', label: 'Departamento' },
				{ key: 'extension', label: 'Extension' },
				 { key: 'edit', label: '' },
				// { key: 'delete', label: '' },
			],
			opciones: {
				highlightMatches: true,
				sortable: true,
				editable: true,
				striped: true,
				columnsDropdown: true,
				footerHeadings: false,
				texts: {
					filter: "Filter:",
					filterBy: "Filter by {column}",
					count: "Showing {from} to {to} of {count} records|{count} records|One record ",
					limit: "Records:",
					page: "Page:",
					noResults: "No matching records",
					loading: "Loading...",
					defaultOption: "Select {column}",
					columns: "Columns"
				},
				filterByColumn: true,
				noDataMsg: "No data to show",
				customFilters: [{
					name: "filterByDepartamento",
					callback: function (row, query) {
						return row.departamento === query;
					}
				}],
				emptyResultsMsg: "No results for this filter",
				noDataMsg: "No data to show",
				loadingMsg: "Loading ...",
				perPageValues: [5, 10, 25, 50, 100, 200, 300],
				sortIcon: {
					base: "fa",
					up: "fa fa-angle-up",
					down: "fa fa-angle-down"
				},
				collapseGroups: true,
				preserveState: true,
				skin: "table-hover table-stripped table-bordered",
				perPage: 25,
				orderBy: {
					ascending: true
				},
				childRowTogglerFirst: true,
				pagination: {
					chunk: 10,
					dropdown: false,
					nav: "fixed",
					edge: false,
					align: "center"
				},
				headings: {
					selected: "",
					nombre: "Name",
					email: "E-mail",
					extension: "Extension",
					celular_oficina: "Office Mobile",
					departamento: "Department"
				},
				filterable: [
					"nombre",
					"email",
					"extension",
					"celular_oficina"
				]
			}
		};
	},
	computed: {
		...mapGetters({
			currentUser: "currentUser"
		}),
		loggedUser: function () {
			return this.$store.state.user.currentUser["id"];
		}
	},
	methods: {


		async loadUsers() {
			try {
				const response = await internoServices.getAllUsers();
				this.usersDefault = response.data.data.map(item => {
					return {
						users_id: item.users_id,
						nombre_completo: item.nombre_completo,
						email: item.email,
						departamento: item.departamento,
						extension: item.extension,
						estado_id: item.estado_id,
					};
				});
				// Inicialmente, los usuarios filtrados serán los mismos que los usuarios cargados
				this.filteredUsers = [...this.usersDefault];
			} catch (error) {
				console.error("Error:", error);
			}
		},
		// Método para aplicar el filtro según el estado_id
		filterUsers(statusCode) {
			if (statusCode === 1) {
				this.filteredUsers = [];
				this.filteredUsers = this.usersDefault.filter(user => user.estado_id === 1);
			} else if (statusCode === 2) {
				this.filteredUsers = [];
				// Filtrar usuarios inactivos
				this.filteredUsers = this.usersDefault.filter(user => user.estado_id === 2);
			}
		},
		// ... (resto de los métodos) ...


		openModal() {
			this.modalVisible = true;
		},
		handleClick() {
			this.modalVisible = true;
			this.modalContent.component = User;
		},

		closeModal() {
			this.modalVisible = false;
		},
		handleEditarClick(item) {
			this.handleClick();
			console.log('Se hizo clic en Editar en el elemento:', item);
		},
		handleEliminarClick(item) {

			console.log("quitar usuario", item)
			this.$swal({
				title: "¡Atención!",
				text: '¿Esta seguro de inactivar a ' + item.nombre_completo + ' ?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',

				confirmButtonText: 'Si, eliminar'
			}).then((result) => {
				if (result.isConfirmed) {
					this.$swal({
						title: 'Inactivado!',

						icon: 'success',
						timer: 2000,
						showConfirmButton: false,
					});
				}
			})
			console.log('Se hizo clic en Editar en el elemento:', item);
		},


	},
	async mounted() {
		await this.loadUsers(); // Cargar usuarios iniciales
		this.tabs = [
			{ title: "Activos", statusCode: 1 },
			{ title: "Inactivos", statusCode: 2 },
		];
	},
};
</script>
