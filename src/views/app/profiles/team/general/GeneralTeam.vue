<template>
	<div>
		<b-card>
			<b-card-header>
				<b-row>
					<b-col lg="10">
						<h5>Tabla de Usuarios</h5>
					</b-col>
					<b-col>11</b-col>
				</b-row>


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

export default {
	components: {
		TableBasic
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
		}
	},
	async mounted() {
		await this.getInfo();
	}
};
</script>
