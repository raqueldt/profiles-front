<template>
	<div>
		<TableComponent :data="rowdata" :columns="tableColumns" :options="options" />
		<!-- {{ rowdata }} -->
	</div>
</template>

<script>
import EmpresaServices from "../../../../../services/profiles/empresa/EmpresaServices";
import TableComponent from '../../../../../components/UI/Tables/TableAdvanced.vue';

export default {
	name: "empresa",
	components: {
		TableComponent
	},
	data() {
		return {
			rowdata: [],
			tableColumns: [],

			options: {
				perPage: 10,
				perPageValues: [5, 10, 25, 50],
				columns: {
					name: {
						label: 'Nombre Personalizado',
					},
					imagen: {
						label: 'Imagen Personalizada',
					},
					// pertenece: {
					// 	label: 'Pertenece a Personalizado',
					// },
					// pais: {
					// 	label: 'País Personalizado',
					// },
				},
				// filterable: ['name', 'imagen', 'pertenece', 'pais'],
				// css: {
				// 	table: 'table table-striped table-bordered', // Agrega clases CSS a la tabla
				// }
			}
		}
	},
	methods: {
		async getAll() {
			// EmpresaServices.getAll().then((response) => {
			// 	this.rowdata = response.data.data;
			// 	this.tableColumns = Object.keys(this.rowdata[0]).map(prop => ({ field: prop, label: prop }));
			// 	console.log("aaa", this.rowdata)
			// 	this.isLoadingRows = true;
			// }).catch((error) => {
			// 	console.log("errores" + error);
			// }).finally(() => {
			// });

			try {
				const response = await EmpresaServices.getAll()

				this.rowdata = response.data.data;
				console.log(this.datos);
			} catch (error) {
				console.error("Error:", error);
			}
		},
	},
	async mounted() {
		await this.getAll();
	},
}
</script>
