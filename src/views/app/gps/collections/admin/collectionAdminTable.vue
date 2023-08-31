<template>
	<div>

		<template v-if="loadingActive">

			<b-skeleton-table :rows="5" :columns="6" :table-props="{ bordered: true, striped: true }"></b-skeleton-table>

		</template>

		<template v-else>

			<b-card class="collection-header filetable" v-if="isEmpty == false">

				<b-table hover empty-text="No data available" empty-filtered-text="0 records found" :busy.sync="isBusy"
					:items="filtered" :fields="fields" :per-page="perPage" :current-page="currentPage" caption-top>

					<template #cell(file_code)="data">
						<span v-if="data.item.cofEstado == 1" class="badge bg-success  m-1 ">
							<router-link tag="a" :to="{
								path: 'collection-file-manager',
								query: {
									c: data.item.id_client,
									f: data.item.cofId,
									s: data.item.sale_date,
									e: data.item.sale_date
								}
							}">
								<!-- <a v-if="data.item.cofEstado == 0">
									<svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="red"
										class="bi bi-circle-fill m-1 " viewBox="0 0 16 16">
										<circle cx="8" cy="8" r="8" />
									</svg>
								</a>
								<a v-if="data.item.cofEstado == 1">
									<svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="green"
										class="bi bi-circle-fill m-1 " viewBox="0 0 16 16">
										<circle cx="8" cy="8" r="8" />
									</svg>
								</a> -->
								<span class="text-white m-3">{{ data.item.file_code }}</span>
							</router-link>
						</span>
						<span v-else class="badge bg-danger m-1">
							<router-link tag="a" :to="{
								path: 'collection-file-manager',
								query: {
									c: data.item.id_client,
									f: data.item.cofId,
									s: data.item.sale_date,
									e: data.item.sale_date
								}
							}">
								<span class="text-white m-3">{{ data.item.file_code }}</span>

							</router-link>
						</span>
					</template>

					<template #cell(sale_date)="data">
						<span>
							{{ moment(data.item.sale_date).format("DD MMM YYYY, ddd ") }}
						</span>
					</template>

					<template #cell(start_date_file)="data">
						<span>
							{{ moment(data.item.start_date_file).format("DD MMM YYYY, ddd") }}
						</span>
					</template>

					<template #cell(totalFile)="data">
						<div class="text-right">
							{{ data.item.totalFile | currency }}
						</div>
					</template>

					<template #cell(percent_collection)="data">
						<!--div class="text-right text-muted">{{ data.item.percent_collection }}%</!--div-->
						<b-progress show-value>
							<b-progress-bar :value="data.item.percent_collection" variant="primary">
								<span class="m-1"> <strong>{{ data.item.percent_collection }}%</strong> </span>
							</b-progress-bar>
						</b-progress>
					</template>

					<template #cell(confirmations)="data">


						<div class="text-center">
							<router-link id="button" :to="{ name: 'confirmations', params: { cofId: data.item.cofId } }">

								<b-icon icon="eye-fill" aria-hidden="true"></b-icon>
							</router-link>
						</div>


					</template>
				</b-table>



				<div class="row" v-if="filtered.length === 0">
					<div class="col-12">
						<div class="card text-center">
							<div class="card-body">
								<h4 class="card-title"><strong>No results found</strong></h4>
								<p class="card-text">We couldn't find what you're looking for. Please try another way</p>
							</div>
						</div>
					</div>
				</div>


				<!-- PAGINACION -->
				<div v-if="rows > 5">
					<b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"
						size="sm" align="center"></b-pagination>
				</div>
				<!-- FIN PAGINACION -->


			</b-card>

		</template>



	</div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

	name: "collectionAdminTable",

	data() {
		return {
			isBusy: false,
			value: "",
			link: "#",

			fields: [
				{ key: 'file_code', label: 'File' },
				{ key: 'sale_date', label: 'Fecha venta' },
				{ key: 'start_date_file', label: 'Inicio tour' },
				{ key: 'client', label: 'Cliente' },
				{ key: 'totalFile', label: 'Total' },
				{ key: 'percent_collection', label: 'Cobranza' },
				{ key: 'confirmations', label: '' },
			],

			items: [],
			perPage: 15,
			currentPage: 1,
			messageNoData: "No results available. Please modify the filter and try again",
			startDateFilter: "",
			endDateFilter: "",
		}
	},

	watch: {

	},

	computed: {

		...mapGetters('collection-admin', ['getCollectionFiles', 'isEmpty', 'loadingActive']),


		//Paginación
		rows() {
			return this.filtered.length
		},

		filtered() {

			return this.getCollectionFiles

		},
	},
	methods: {

	},

	mounted() {
	}


};
</script>

<style lang="scss" scoped></style>