<template>
	<div>
		<TableAdvanced :data="rowdata" :columns="tableColumns" :options="options" />
		{{ rowdata }}
	</div>
</template>

<script>
import EmpresaServices from "../../../../../services/profiles/empresa/EmpresaServices";
import TableAdvanced from '../../../../../components/UI/Tables/TableAdvanced.vue';

export default {
	name: "empresa",
	components: {
		TableAdvanced
	},
	data() {
		return {
			rowdata: [],
			tableColumns: [],

			options: {
				perPage: 10,
				perPageValues: [5, 10, 25, 50],
				columns: [
					// 'id',
					'name',

				],
				filterable: ['name'],
				// css: {
				// 	table: 'table table-striped table-bordered', // Agrega clases CSS a la tabla
				// }
			}
		}
	},
	methods: {
		async getAll() {


			try {
				const response = await EmpresaServices.getAll()

				this.rowdata = response.data.data;
				this.tableColumns = Object.keys(this.rowdata[0]);
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
