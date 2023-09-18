<template>
	<div>
		<!-- <TableAdvanced :columns="columns" :options="options" :data="rowdata" /> -->

		<!-- {{ usuariosOperadores }} -->
		<!-- {{ rowdata[800] }} -->
		<v-client-table :columns="columns" :data="rowdata" :options="options" id="table_atc" ref="empresa">


			<!-- Child Row -->
			<div slot="child_row" slot-scope="props" class="row p-4 bg-white">

				<!-- LINK Ultima interaccion -->
				<div class="col-lg-6">
					<div v-if="props.row.ultimo_registro">
						<h5>Last Interaction:</h5>
						<a :href="goAnotaciones(props.row.id)"
							class="btn btn-xs btn-success btn-block text-white  shadow p-2" data-toggle="tooltip"
							data-placement="bottom" title="Click here to display your interactions">
							{{ formatDate(props.row.ultimo_registro) }}<br> ({{ props.row.titulo_ultimo_registro }}
							)
						</a>
					</div>
					<div v-else class="text-center">
						<h5>No Interactions</h5>
					</div>
				</div>
				<div class="col-lg-6">
					<h5>Important notes: (IVA information)</h5>
					<div class="text-muted" v-html="props.row.notas"> </div>
				</div>


			</div>
			<!-- Fin Child Row -->

			<template slot="pais" slot-scope="props">
				<div class="text-center">
					{{ props.row.pais }}
				</div>
			</template>

			<!-- LINK en nombre -->

			<!-- Fin LINK en nombre -->

			<!-- Formato en paises -->
			<template slot="pais" slot-scope="props">
				<div class="text-center">
					{{ props.row.pais }}
				</div>
			</template>
			<!-- Fin LINK en nombre -->

			<!-- LINK con Sales account -->
			<template slot="nombre_user_ventas" slot-scope="props">
				<div>

					<div v-if="props.row.nombre_user_ventas" class="text-left ml-2">
						<small class="text-info"><i class="fas fa-user-tag"></i> {{ props.row.nombre_user_ventas }}</small>
					</div>
					<div v-if="props.row.nombre_user_ventas1" class="text-left ml-2">
						<small class="text-info"><i class="fas fa-user-tag"></i> {{ props.row.nombre_user_ventas1 }}</small>
					</div>
					<div v-if="props.row.nombre_user_ventas2" class="text-left ml-2">
						<small class="text-info"><i class="fas fa-user-tag"></i> {{ props.row.nombre_user_ventas2 }}</small>
					</div>
				</div>
			</template>
			<!-- Fin LINK  Sales account-->

			<!-- LINK con Operator -->
			<template slot="nombre_user_operador" slot-scope="props">
				<div>
					<div v-if="props.row.nombre_user_operador" class="text-left ml-2">

						<small class="text-danger"><i class="fas fa-user-tag"></i>
							{{ props.row.nombre_user_operador }}</small>
					</div>
				</div>
			</template>
			<!-- Fin LINK Operator -->

			<!-- LINK con business developer -->
			<template slot="nombre_representante_marketing" slot-scope="props">

				<!-- <i class="iconos fa fa-user"></i> -->
				<div v-if="props.row.representante_marketing" class="text-left ml-2">

					<small class="text-secondary"><i class="fas fa-user-tag"></i>
						{{ props.row.nombre_representante_marketing }}</small>
				</div>
			</template>
			<!-- Fin LINK business developer -->


			<!-- Formato en status -->
			<template slot="status" slot-scope="props">
				<div class="text-center">
					{{ props.row.status }}
				</div>
			</template>
			<!-- Fin Formato en status -->


			<!-- LINK Ultima interaccion -->
			<template slot="ultimo_registro" slot-scope="props">
				<small v-if="props.row.ultimo_registro">
					<i class="fa fa-calendar"></i> {{ formatDate(props.row.ultimo_registro) }}
				</small>
			</template>
			<!-- Fin LINK Ultima interaccion -->

			<!-- Costumer care -->
			<template slot="contact_costumer_care" slot-scope="props">
				<center>
					<small v-if="Boolean(props.row.contact_costumer_care)" class="h4">
						<i class="fa fa-phone text-success"></i>
					</small>
					<small v-else class="h4">
						<i class="fa fa-phone-slash  text-danger"></i>
					</small>
				</center>
			</template>
			<!-- Costumer care -->


			<!-- LINK Ultima task -->
			<template slot="ultima_task" slot-scope="props">
				<div v-if="props.row.ultima_task">
					<!-- <i class="iconos fa fa-user"></i> -->
					<a :href="goTasks()" class="btn btn-xs btn-outline-secondary  btn-block text-interaction"
						data-toggle="tooltip" data-placement="bottom" title="Click here to display your tasks">
						{{ props.row.ultima_task }}<br> ( {{ props.row.titulo_ultima_task }} )
					</a>
				</div>
			</template>
			<!-- Fin LINK Ultima task -->

			<!-- LINK con Operator -->
			<template slot="land_operator_name" slot-scope="props">
				<div class="text-center">
					{{ props.row.land_operator_name }}
				</div>
			</template>
			<!-- Fin LINK Operator -->

			<!-- potencial_ventas -->
			<template slot="potencial_ventas" slot-scope="props">
				<div class="text-center">
					{{ props.row.potencial_ventas }}
				</div>
			</template>
			<!-- Fin potencial_ventas -->

			<!-- telefono_emergencia -->
			<template slot="telefono_emergencia" slot-scope="props">
				<div class="text-center" v-if="props.row.telefono_emergencia">
					<i class="fas fa-mobile-alt"></i> {{ props.row.telefono_emergencia }}<br>
					<small>{{ props.row.detalles_sos_emergencia }}</small>
				</div>
			</template>
			<!-- telefono_emergencia -->

			<!-- comision_voyager -->
			<template slot="comision_voyager" slot-scope="props">
				<div class="text-center" v-if="props.row.comision_voyager">
					{{ props.row.comision_voyager }}%<br>
				</div>
			</template>
			<!-- comision_voyager -->

			<!-- volumen -->
			<template slot="volumen" slot-scope="props">
				<div class="text-center" v-if="props.row.volumen">
					{{ props.row.volumen }}<br>
				</div>
			</template>
			<!-- volumen -->


			<!-- carga -->
			<template slot="carga" slot-scope="props">
				<div class="text-center" :class="props.row.carga > 0 ? 'text-success' : ''" v-if="props.row.carga">
					{{ props.row.carga > 0 ? props.row.carga : '0' }}
				</div>
			</template>
			<!-- carga -->

			<!-- carga -->
			<template slot="feedback_form" slot-scope="props">
				<div class="text-center" v-if="props.row.carga">
					{{ props.row.feedback_form ? props.row.feedback_form : '-' }}
				</div>
			</template>
			<!-- carga -->




			<!-- Handover -->
			<template slot="hand_full_name" slot-scope="props">
				<div class="text-center" v-if="props.row.hand_full_name">
					<small>{{ props.row.hand_full_name }}</small><br>
					<small>({{ formatDate(props.row.hand_fecha_registro) }})</small>
				</div>
			</template>
			<!-- Handover -->

			<!-- Multiselect -->
			<template slot="selected" slot-scope="props">
				<div class="text-center">
					<!-- <div v-if="rol === 'admin'"> -->
					<input type="checkbox" :value="props.row.id" v-model="selected">
					<!-- </div> -->
				</div>
			</template>
			<!-- Fin Multiselect -->

			<div slot="beforeTable" class="mb-2" v-if="selected.length > 0">
				<!-- <div v-if="rol === 'admin'"> -->
				<button type="button" class="btn btn-xs btn-danger" @click="deleteAll()">Delete
					All
				</button>
				<a class="btn btn-success btn-xs text-center text-white" type="button" @click="openModal()"
					title="Click here to show more details">
					<i class="fa fa-plus"></i> Asign team
				</a>

				<!-- </div> -->
			</div>

			<div slot="beforeTable" class="mb-2">
				<a class="btn btn-info btn-xs text-center text-white" type="button" @click="checkFilteredRegisters()"
					title="Click here to show more details">
					<i class="fa fa-plus"></i> Selected filtered
				</a>
			</div>

			<!-- Filtro Multiselect -->
			<!-- <div v-if="rol === 'admin'"> -->
			<div slot="filter__selected" class="text-center m-1">

				<!-- <div v-if="rol === 'admin'">                   -->
				<input type="checkbox" v-model="selectAll" @click="select">
				<!-- </div> -->
			</div>

			<!-- </div> -->
			<!-- Filtro Multiselect  -->

			<!-- ************************** -->
			<!-- FILTROS PERSONALIZADOS -->
			<!-- ************************** -->

			<!-- Filtro por status -->
			<div slot="filter__status">
				<select id="status" name="status" @change="searchByStatus()" class="form-control" v-model="keywordStatus">
					<option value="">Select All</option>
					<option v-for="sub in status" :value="sub.id" :key="sub.id">{{ sub.status }}
					</option>
				</select>
			</div>

			<!-- Fin Filtro status -->


			<!-- Filtro por substatus -->
			<div slot="filter__substatus">
				<select id="departamento" name="departamento" @change="searchBySubstatus($event)" class="form-control"
					v-model="keywordSubstatus">
					<option value="">Select All</option>
					<option v-for="sub in substatus" :value="sub.code" :key="sub.code">
						{{ sub.substatus }}
					</option>
				</select>
			</div>
			<!-- Fin Filtro substatus -->

			<!-- Filtro por fecha ultima task -->
			<div slot="filter__ultima_task">
				<input value="" type="date" id="ultima_task" name="ultima_task" data-date-format="YYYY MMMM DD"
					@change="searchByFechaMax($event)" class="form-control" v-model="keywordFechaMax" />
			</div>
			<!-- Filtro por fecha ultima task -->

			<!-- Filtro por fecha ultimo registro -->
			<div slot="filter__ultimo_registro">
				<input value="" type="date" id="filter__ultimo_registro" name="filter__ultimo_registro"
					data-date-format="YYYY MMMM DD" @change="searchByFechaUltimoRegistro($event)" class="form-control"
					v-model="keywordFechaUltimoRegistro" />
			</div>
			<!-- Filtro por fecha ultimo registro -->

			<!-- Filtro por Vendedor -->
			<div slot="filter__nombre_user_ventas">
				<div>
					<select id="nombre_user_ventas" name="nombre_user_ventas" @change="searchByVendedor($event)"
						class="form-control" v-model="keywordVendedor">
						<option value="">Select All Sellers</option>
						<option v-for="seller in usuariosVentas" :value="seller.users_id" :key="seller.users_id">
							{{ seller.nombre_completo }}
						</option>
					</select>
				</div>
			</div>
			<!-- Fin Filtro Vendedor -->

			<!-- Filtro por Operador -->
			<div slot="filter__nombre_user_operador">
				<!-- <div> -->
				<select id="nombre_user_operador" name="nombre_user_operador" @change="searchByOperador($event)"
					class="form-control" v-model="keywordOperador">
					<option value="">Select All Operators</option>
					<option v-for="sub in usuariosOperadores" :value="sub.users_id" :key="sub.users_id">
						{{ sub.nombre_completo }}
					</option>
				</select>
				<!-- </div> -->
			</div>
			<!-- Fin Filtro Operador -->

			<!-- Filtro por Marketing -->
			<div slot="filter__nombre_representante_marketing">
				<div>
					<select id="nombre_representante_marketing" name="nombre_representante_marketing"
						@change="searchByMarketing($event)" class="form-control" v-model="keywordMarketing">
						<option value="">Select All Developers</option>
						<option v-for="sub in usuariosMarketing" :value="sub.users_id" :key="sub.users_id">
							{{ sub.nombre_completo }}
						</option>
					</select>
				</div>
			</div>
			<!-- Fin Filtro Marketing -->

			<!-- Filtro por Land Operador -->
			<div slot="filter__land_operator_name">
				<select id="land_operator_name" name="land_operator_name" @change="searchByLandOperator($event)"
					class="form-control" v-model="keywordLandOperator">
					<option value="">Select All</option>
					<option v-for="sub in landOperators" :value="sub.id" :key="sub.id">
						{{ sub.name }}
					</option>
				</select>
			</div>
			<!-- Fin Filtro Land Operador -->

			<!-- ************************** -->
			<!--  FIN FILTROS PERSONALIZADOS -->
			<!-- ************************** -->

		</v-client-table>
	</div>
</template>

<script>
import EmpresaServices from "../../../../../services/profiles/empresa/EmpresaServices";
import InternoServices from "../../../../../services/profiles/interno/internoServices";
import TableAdvanced from '../../../../../components/UI/Tables/TableAdvanced.vue';
import moment from "moment";
export default {
	name: "empresa",
	components: {
		TableAdvanced
	},
	data() {
		return {
			showModalAsignacion: false,
			initialFilter: 2,
			isLoadingRows: false,
			selected: [],
			usuariosOperadores: [],
			usuariosVentas: [],
			usuariosMarketing: [],
			landOperators: [],
			selectAll: false,
			substatus: [{
				code: 'ATC Yates',
				substatus: 'ATC Yates'
			},
			{
				code: 'ATC Yates + Land',
				substatus: 'ATC Yates + Land'
			},
			{
				code: 'Full DMC',
				substatus: 'Full DMC'
			},
			{
				code: 'Exclusive DMC',
				substatus: 'Exclusive DMC'
			},
			],
			status: [{
				id: 1,
				status: 'Lead'
			},
			{
				id: 2,
				status: 'Client'
			},
			],
			users_id: '',
			source: [],
			yearFilter: '',
			detalle: '',
			rowdata: [],
			rowdataFiltered: [],
			tipo_anotaciones: [],
			anotaciones: [],
			keywordTipo_anotaciones_id: '',
			keywordFechaMax: '',
			keywordFechaUltimoRegistro: '',
			keywordSubstatus: '',
			//keywordStatus: 2,
			keywordStatus: '',
			keywordVendedor: '',
			keywordMarketing: '',
			keywordOperador: '',
			keywordLandOperator: '',
			formatter2: '${value}',
			routeEmpresa: "../admin/empresa/",
			routeAnotacion: "../admin/anotaciones/",
			routeTask: "../admin/tasks/",
			routeImage: "/img/enterprise/",
			routeMailManager: "../admin/interno/",
			showCountRows: '',
			value: null,
			options: {
				highlightMatches: true,
				sortable: true,
				editable: true,
				striped: true,
				columnsDropdown: true,
				columnHidden: {
					status: localStorage.getItem('status') || false,
				},
				footerHeadings: false,
				//perPage:2,
				texts: {
					filter: "Filter:",
					filterBy: 'Filter by {column}',
					columns: "Más columnas",
					count: 'Showing {from} to {to} of {count} records|{count} records|One record ',
					limit: "",
					page: "Page:",
					noResults: "No matching records",
					loading: 'Loading...',
					defaultOption: 'Select {column}',
				},
				filterByColumn: true,
				groupBy: 'user',
				noDataMsg: 'No data to show',
				customFilters: [
					{
						name: "filterByFechaInteraction",
						callback: function (row, query) {
							return row.ultimo_registro === query;
						}
					},
					{
						name: "filterByFechaMax",
						callback: function (row, query) {
							return row.ultima_task === query;
						}
					},
					{
						name: "filterBySubstatus",
						callback: function (row, query) {
							return row.substatus === query;
						}
					},
					{
						name: "filterByStatus",
						callback: function (row, query) {
							return row.status_id == query;
						}
					},
					{
						name: "filterByOperador",
						callback: function (row, query) {
							return row.operador_id == query;
						}
					},
					{
						name: "filterByVendedor",
						callback: function (row, query) {
							return row.ventas_user_id == query;
						}
					},
					{
						name: "filterByMarketing",
						callback: function (row, query) {
							return row.representante_marketing == query;
						}
					},
					{
						name: "filterByLandOperator",
						callback: function (row, query) {
							return row.land_operator == query;
						}
					},

				],
				//customFilters:['producto'],
				//initFilters:{status_id: '1'},
				//toMomentFormat: true,
				emptyResultsMsg: 'No results for this filter',
				noDataMsg: 'No data to show',
				loadingMsg: 'Loading ...',
				perPageValues: [5, 10, 25, 50, 100, 200, 300],
				sortIcon: {
					base: 'fa',
					up: 'fa fa-angle-up',
					down: 'fa fa-angle-down'
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
					nav: 'fixed',
					edge: false,
					align: 'center',
				},
				headings: {
					selected: '',
					name: 'Business Name',
					pais: 'Country',
					codigos: 'ATC Codes',
					comision_voyager: 'Comm. Oniric',
					nombre_user_ventas: 'Sales account',
					nombre_user_operador: "Operator",
					nombre_representante_marketing: 'Business Developer',
					status: 'Status',
					ultimo_registro: "Last interaction",
					ultima_task: "Last task",
					substatus: "Substatus",
					carga: "Charge",
					volumen: "Sales Volumen",
					potencial_ventas: "Sales Potential",
					land_operator_name: "Land Operator",
					telefono_emergencia: "SOS emergency",
					hand_full_name: "Handover"
				},
				filterable: [
					'name',
					'pais',
					'codigos',
					'comision_voyager',
					'correo_cuenta',
					//'status',
					//'substatus',
					// 'status_id',
					'volumen',
					'potencial_ventas',
					'feedback_form'
				],
			},
			columns: [
				// 'id',
				'selected',
				'name',
				'codigos',
				'comision_voyager',
				'pais',
				// Deprecated: 'nombre_correo_cuenta',
				'nombre_user_ventas',
				'nombre_user_operador',
				'nombre_representante_marketing',
				'status',
				'substatus',
				//'carga',
				'volumen',
				'potencial_ventas',
				'land_operator_name',

				'telefono_emergencia',
				'ultimo_registro',
				'contact_costumer_care',
				'carga',

				// 'hand_users_id',
				//'hand_fecha_registro',
				'hand_full_name',
				'feedback_form'
			],
		}
	},

	computed: {
		fileextension() {
			if (this.rowdata.adjunto) {
				console.log('imagen' + this.rowdata.adjunto.substring(0, 8));
			}
		},
	},
	methods: {
		checkFilteredRegisters() {
			var dataFiltered = this.$refs.empresa.allFilteredData;
			var dataFilteredIds = dataFiltered.map(a => a.id);

			for (let i in dataFiltered) {
				const index = this.selected.findIndex(item => item === dataFiltered[i].id)
				if (index > -1) this.selected.splice(index, 1);
				else this.selected.push(dataFiltered[i].id);

			}

			//console.log({allFilteredData: this.$refs.empresa.allFilteredData});
			//this.$refs.json_dump.value = JSON.stringify(this.$refs.countries.allFilteredData);
		},
		// Modal de asignación
		formatDate(fecha) {
			return moment(fecha).format('MMMM Do, YYYY -  h:mm')
		},
		openModal() {
			this.showModalAsignacion = true;
		},
		closeModal() {
			this.showModalAsignacion = false;
		},
		closeModalAfterSendPermission() {
			this.reload();
			this.showModalAsignacion = false;
			this.selected = [];
		},
		// Fin Modal de asignación
		select() {
			this.selected = [];
			if (!this.selectAll) {
				for (let i in this.rowdata) {
					this.selected.push(this.rowdata[i].id);
				}
			}
		},
		deleteAll() {
			if (confirm("Would you like to delete selected items?")) {
				let data = this.selected;
				EmpresaServices.deleteAll(data).then((response) => {
					this.selected = [];
					this.$toast.success({
						title: "Success",
						message: "Register deleted correctly",
						progressBar: true,
						position: "top right",
						showDuration: 3000,
						timeOut: 4500
					});
					this.getAll();
				}).catch((error) => {
					console.log("Error al eliminar" + error);
					//console.log(error.response);
				});
			}
		},
		goTo(id) {
			return this.routeEmpresa + id;
		},
		goImage(name) {
			return Conf.server + this.routeImage + name;
		},
		goMailManager(id) {
			return this.routeMailManager + id;
		},
		goUser(id) {
			return this.routeMailManager + mail;
		},
		goAnotaciones(id) {
			return this.routeAnotacion + id;
		},
		goTasks() {
			return this.routeTask;
		},
		getAll() {
			EmpresaServices.getAll().then((response) => {
				let row = response.data.data;
				// row.sort(function (a, b) {
				//     return a.name.localeCompare(b.name);
				// });
				this.rowdata = response.data.data;
				this.isLoadingRows = true;
			}).catch((error) => {
				console.log("errores" + error);
				//console.log(error.response);
			}).finally(() => {
				this.uncheckInitialFilters();
				this.searchByStatus();
			}
			);
		},

		reload() {
			this.getAll();
		},

		/**** Filtros personalizados *** */
		searchByFechaUltimoRegistro(event) {
			this.keywordFechaUltimoRegistro = event.target.value;
			// Event.$emit("vue-tables.filter::filterByFechaInteraction", this.keywordFechaUltimoRegistro);
		},

		searchByFechaMax(event) {
			this.keywordFechaMax = event.target.value;
			// Event.$emit("vue-tables.filter::filterByFechaMax", this.keywordFechaMax);
		},
		searchBySubstatus(event) {
			this.keywordSubstatus = event.target.value;
			// Event.$emit("vue-tables.filter::filterBySubstatus", this.keywordSubstatus);
		},
		searchByStatus() {
			this.keywordStatus = event.target.value;
			// Event.$emit("vue-tables.filter::filterByStatus", this.keywordStatus);
		},
		searchByVendedor(event) {
			this.keywordVendedor = event.target.value;
			// Event.$emit("vue-tables.filter::filterByVendedor", this.keywordVendedor);
		},
		searchByOperador(event) {
			console.log("buscar operador", event.target.value);
			console.log("total registros", this.rowData);

			if (event.target.value) {
				this.rowData = this.rowData.filter(item => {
					return item.land_operator.find(operator => operator.includes(event.target.value));
				});
			}

			console.log("total filtrados", this.rowData);
		},
		searchByMarketing(event) {
			this.keywordMarketing = event.target.value;
			// Event.$emit("vue-tables.filter::filterByMarketing", this.keywordMarketing);
		},
		searchByLandOperator(event) {
			this.keywordLandOperator = event.target.value;
			// Event.$emit("vue-tables.filter::filterByLandOperator", this.keywordLandOperator);
		},

		/**** Fin Filtros personalizados *** */

		// getAllTipoAnotaciones() {
		// 	AnotacionesServices.getAllTipoAnotaciones().then((response) => {
		// 		this.tipo_anotaciones = response.data.data;
		// 	}).catch((error) => {
		// 		console.log("errores" + error);
		// 	});
		// },
		async getAllByDepId() {
			try {
				const response = await InternoServices.getAllUsers();
				const usuarios = response.data.data;
				console.log("OBTENER USUARUOIS", usuarios)
				// Usuarios Operadores:
				this.usuariosOperadores = usuarios
					.filter(item => item.departamento_id === 6)
					.map(x => ({
						users_id: x.users_id,
						nombre_completo: x.nombre_completo
					}));

				// Usuarios Ventas:
				this.usuariosVentas = usuarios
					.filter(item => item.departamento_id === 3)
					.map(x => ({
						users_id: x.users_id,
						nombre_completo: x.nombre_completo
					}));

				// Usuarios Marketing:
				this.usuariosMarketing = usuarios
					.filter(item => item.departamento_id === 5)
					.map(x => ({
						users_id: x.users_id,
						nombre_completo: x.nombre_completo
					}));
			} catch (error) {
				console.log("errores" + error);
			}
		},


		getAllLandOperators() {
			EmpresaServices.getAllLandOperators().then((response) => {
				this.landOperators = response.data.data;
			}).catch((error) => {
				console.log("errores" + error);
				//console.log(error.response);
			});
		},
		uncheckInitialFilters() {
			var columns = [
				"pais",
				"status",
				"volumen",
				"potencial_ventas",
				"land_operator_name",
				"substatus",
				"ultimo_registro",
				"contact_costumer_care",
				"carga",
				"hand_full_name",
				"feedback_form"
			]
			var inputs = document.getElementsByTagName('input');
			for (var i = 0; i < inputs.length; i++) {
				if (inputs[i].type == "checkbox") {
					if (columns.includes(inputs[i].value)) {
						inputs[i].click();
					}
				}
			}
		}
	},
	created() {

	},
	async mounted() {

		await this.getAll();
		await this.getAllByDepId();
		// await this.getAllTipoAnotaciones();
		await this.getAllLandOperators();

	},



}
</script>
