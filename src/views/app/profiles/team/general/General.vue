<template>
	<div>
		<ModalBasic :showModal="modalVisible" :modal-size="modalSize" @close="closeModal" title="crear">
			<template v-if="modalContent.component">
				<component :is="modalContent.component" @usuario-creado="closeModal" :actionModal=actionModal
					:idUserModal=idUserModal></component>
			</template>
		</ModalBasic>

		<b-card>
			<b-card-header>
				<div class="d-flex justify-content-between align-items-center mb-3">
					<h5 class="m-0" v-if="filteredUsers">Usuarios <small>| {{ filteredUsers.length }}</small>
						<!-- {{ usersDefault.length }} -->
					</h5>
					<ButtonBasic variant="primary" text="New User" @click="handleClick('addUser')" />
				</div>
			</b-card-header>
			<!-- {{ usersDefault }} -->
			<!-- {{ selectedTab }} -->
			<!-- {{ tabs[0].statusCode }} -->
			<b-tabs v-model="selectedTab">
				<!-- DEFAULT: {{ usersDefault.length }}
				<br> -->
				<!-- FILTRADO: {{ filteredUsers.length }} -->

				<b-tab v-for="(tab, index) in tabs" :key="index" :title="tab.title" @click="filterUsers(tab.statusCode)">
					<TableBasic :items="filteredUsers" :fields="fields" :perPage="5" :options="opciones" :editButton="true"
						@editar-click="handleEditarClick" @inactivar-click="handleInactivarClick"
						@activar-click="handleActivarClick" :selectedTab="selectedTab" />

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
			filteredUsers: [],
			actionModal: '',
			datos: [],
			selectedTab: 0,
			usersDefault: [],
			showActivos: true,
			usersPasivos: [],
			modalVisible: false,
			idUserModal: [],
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
				{ key: 'nombre_completo', label: 'Nombre', sortable: true, filterable: true },
				{ key: 'email', label: 'Correo', sortable: true, filterable: true },
				{ key: 'departamento', label: 'Departamento', sortable: true, filterable: true },
				{ key: 'cargo', label: 'Cargo', sortable: true, filterable: true },
				{ key: 'extension', label: 'Extension', sortable: true, filterable: true },
				{ key: 'actions', label: '' },
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

				console.log("defaut", response.data.data)
				//  this.usersDefault = response.data.data;
				this.usersDefault = response.data.data.map(item => {
					return {
						users_id: item.users_id,
						nombre_completo: item.nombre_completo,
						email: item.email,
						departamento: item.departamento,
						extension: item.extension,
						estado: item.estado,
						cargo: item.cargo,
					};
				});
				// this.filteredUsers = this.usersDefault;

			} catch (error) {
				console.error("Error:", error);
			}
		},
		// Método para aplicar el filtro según el estado_id
		filterUsers(statusCode) {
			console.log("code", statusCode);
			if (statusCode === 1) {
				this.filteredUsers = [];
				this.filteredUsers = this.usersDefault.filter(user => user.estado === 1);
			} else if (statusCode === 2) {
				this.filteredUsers = [];
				this.filteredUsers = this.usersDefault.filter(user => user.estado === 2);
			}
			console.log("filterred", this.filteredUsers)
		},
		// ... (resto de los métodos) ...


		openModal() {
			this.modalVisible = true;
		},
		handleClick(action) {
			this.actionModal = action;
			this.modalVisible = true;
			this.modalContent.component = User;
		},

		closeModal() {
			this.modalVisible = false;
		},
		async handleEditarClick(action, item) {
			console.log('Se hizo clic en Editar en el elemento:', action);
			console.log('ItemID:', item);

			this.idUserModal = item;

			// Aquí puedes acceder al 'item' enviado desde TableBasic
			this.handleClick(action);
		},
		handleInactivarClick(item) {
			console.log("quitar usuario", item);
			this.$swal({
				title: "¿Deseas inactivar Usuario?",
				text: '' + item.nombre_completo + '',
				icon: 'warning',
				showCancelButton: false,
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'Si, inactivar'
			}).then(async (result) => { // Marcar la función como async aquí
				if (result.isConfirmed) {
					try {
						const response = await internoServices.updateStatus(item.users_id); // Reemplaza "inactivarUsuario" por la función adecuada
						console.log("respuesta quitar usuario", response.data);
						if (response.data) {
							this.filterUsers(2);
							const updatedResponse = await internoServices.getAllUsers();
							this.filteredUsers = updatedResponse.data.data;
							this.$swal({
								title: 'Inactivado!',
								icon: 'success',
								timer: 2000,
								showConfirmButton: false,
							});
						} else {
							this.$swal({
								title: 'Error',
								text: 'No se pudo inactivar el usuario.',
								icon: 'error',
							});
						}
					} catch (error) {
						console.error("Error:", error);
					}
				}
			});
		},

		handleActivarClick(item) {

			console.log("quitar usuario", item)
			this.$swal({
				title: "¿Deseas activar usuario?",
				text: '' + item.nombre_completo + '',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',

				confirmButtonText: 'Si, activar!'
			}).then(async (result) => {

				if (result.isConfirmed) {
					try {
						const response = await internoServices.updateStatus(item.users_id); // Reemplaza "inactivarUsuario" por la función adecuada
						console.log("respuesta quitar usuario", response.data);
						if (response.data) {
							this.filterUsers(1);
							const updatedResponse = await internoServices.getAllUsers();
							this.filteredUsers = updatedResponse.data.data;
							this.$swal({
								title: 'Activado!',
								icon: 'success',
								timer: 2000,
								showConfirmButton: false,
							});
						} else {
							this.$swal({
								title: 'Error',
								text: 'No se pudo inactivar el usuario.',
								icon: 'error',
							});
						}
					} catch (error) {
						console.error("Error:", error);
					}
				}
			})
			console.log('Se hizo clic en Editar en el elemento:', item);
		},


	},
	async mounted() {
		await this.loadUsers();
		this.tabs = [
			{ title: "Activos", statusCode: 1 },
			{ title: "Inactivos", statusCode: 2 },
		];
		this.filterUsers(1);
	},
};
</script>
