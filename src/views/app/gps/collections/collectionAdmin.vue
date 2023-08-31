<template>
	<div>

		<b-row>
			<b-col>
				<filtros></filtros>
				<!-- <collection-admin-filter /> -->
			</b-col>
		</b-row>

		<b-container fluid>

			<b-row>

				<b-col lg="3" class="pr-2">

					<collection-admin-resume-client />

				</b-col>

				<b-col lg="9" class="pl-1">

					<collection-admin-summary />

					<collection-admin-table />

				</b-col>

			</b-row>

		</b-container>

	</div>
</template>


<script>
import filtros from './components/collectionHeader.vue'

export default {
	name: "collectionAdmin",
	components: {
		filtros
	},
	data() {
		return {
			sendDataFilters: {}
		};
	},
	methods: {
		sendFilter(params) {
			this.sendDataFilters = params;


		}
	},
	mounted() {

	},
};

</script>

<style scoped></style>
