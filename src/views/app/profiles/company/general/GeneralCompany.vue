<template>
	<div>
		<ModalBasic :show-modal="modalVisible" :modal-size="modalSize" @close="closeModal">
			<template v-if="modalContent.component">
				<component :is="modalContent.component" @empresa-creada="closeModal"></component>
			</template>
		</ModalBasic>

		<b-card>
			<b-card-header>
				<div class="d-flex justify-content-between align-items-center mb-3">
					<h5 class="m-0">Usuarios | <small> {{ datos.length }} </small>
					</h5>
					<ButtonBasic variant="primary" text="New Company" @click="handleClick" />
				</div>
			</b-card-header>
			<empresa></empresa>
		</b-card>
		<b-card hidden>
			<!-- <TableBasic :items="datos" :fields="datos" :perPage="5" :options="opciones" /> -->
		</b-card>

	</div>
</template>

<script>
import internoServices from "../../../../../services/profiles/empresa/EmpresaServices";
import { mapGetters } from "vuex";
import TableBasic from '../../../../../components/UI/Tables/TableBasic.vue';
import empresa from '../empresa/empresa.vue';
import ModalBasic from '../../../../../components/UI/Modal/ModalBasic.vue';
import ButtonBasic from '../../../../../components/UI/Button/ButtonBasic.vue';
import Company from '../create/createCompany.vue';
export default {
	components: {
		TableBasic,
		ButtonBasic,
		empresa,
		ModalBasic,
		Company

	},
	name: "GeneralCompany",
	data() {
		return {
			modalSize: 'm',
			modalVisible: false,
			modalContent: {
				title: 'Título del Modal',
				text: 'Contenido del Modal'
			},
			datos: [],
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
		async getInfo() {
			try {
				const response = await internoServices.getAll()

				this.datos = response.data.data;
				console.log(this.datos);
			} catch (error) {
				console.error("Error:", error);
			}
		},
		openModal() {
			this.modalVisible = true;
		},
		handleClick() {
			this.modalVisible = true;
			this.modalContent.component = Company;
		},

		closeModal() {
			this.modalVisible = false;
		},
	},
	async mounted() {
		await this.getInfo();
	}
};
</script>
