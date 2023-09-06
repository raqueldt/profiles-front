<template>
	<div>
		<b-card>
			<b-card-header>
				<div class="d-flex justify-content-between align-items-center mb-3">
					<h5 class="m-0">Usuarios</h5>
					<ButtonBasic variant="primary" text="New User" @click="handleClick" />
				</div>


			</b-card-header>
			<TableBasic :items="datos" :fields="datos" :perPage="7" :options="opciones" />
			<b-card-footer>
				<p>Pie de página de la tabla</p>
			</b-card-footer>
		</b-card>
	</div>
</template>

<script>
import internoServices from "../../../../../services/profiles/interno/internoServices";
import { mapGetters } from "vuex";
import TableBasic from '../../../../../components/UI/Tables/TableBasic.vue';
import ButtonBasic from '../../../../../components/UI/Button/ButtonBasic.vue';

export default {
	components: {
		TableBasic,
		ButtonBasic
	},
	name: "GeneralInterno",
	data() {
		return {
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
				const response = await internoServices.getAllUsersActive();
				const data = response.data.data;
				const filteredData = data.map(item => {
					return {
						nombre_completo: item.nombre_completo,
						email: item.email,
						departamento: item.departamento,
						extension: item.extension,
					};
				});
				this.datos = filteredData;
			} catch (error) {
				console.error("Error:", error);
			}
		},
		handleClick() {
			alert("Botón personalizado clicado");
		},
	},
	async mounted() {
		await this.getInfo();
	}
};
</script>
