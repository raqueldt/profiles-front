<template>
	<div>
		<filtros></filtros>
		<template v-if="loadingActive">

			<b-skeleton type="input"></b-skeleton>
			<b-card>
				<b-skeleton animation="fade" width="85%"></b-skeleton>
				<b-skeleton animation="fade" width="55%"></b-skeleton>
				<b-skeleton animation="fade" width="70%"></b-skeleton>
			</b-card>

		</template>

		<template v-else>

			<component :is="filtered.length > 12 ? 'vue-perfect-scrollbar' : 'div'"
				:class='filtered.length > 12 ? "scroll-area" : ""'
				:settings="{ suppressScrollX: true, wheelPropagation: false }" v-if="isEmpty == false">

				<b-list-group>

					<b-form-input v-model="searchedString" placeholder="Buscar..."></b-form-input>

					<b-list-group-item v-for="client in filtered" :key="client.id"
						class="d-flex justify-content-between align-items-center p-2"
						@click.prevent="handleFilterClient(client.id)" :active="isActiveItem(client.id)"
						style="cursor: pointer">
						<small>{{ client.client }}</small>
						<b-badge variant="light">{{ client.total | currency }}</b-badge>
					</b-list-group-item>

				</b-list-group>

			</component>

		</template>


	</div>
</template>

<script>


import { mapGetters, mapMutations } from 'vuex'

import filtros from './collectionAdminFilter.vue'

export default {

	name: 'collectionAdminResumeByClient',
	components: {
		filtros
	},

	data() {
		return {
			searchedString: null,
			link: "#",
			messageNoData: "No results available. Please modify the filter and try again",
		}
	},

	watch: {
	},

	computed: {

		...mapGetters('collection-admin', ['getCollectionFiles', 'getSelectedClient', 'isEmpty', 'loadingActive']),
		//Paginación
		rows() {
			return this.filtered.length
		},

		filtered() {

			const searchedString = this.searchedString

			const clients = this.groupedArray(this.getCollectionFiles)

			if (searchedString && searchedString.length)
				return clients.filter(cliente => cliente.client.toLowerCase().includes(searchedString.toLowerCase()))

			return clients

		},

	},

	methods: {

		...mapMutations('collection-admin', ['setSelectedClient']),

		groupedArray(array) {

			const result = []

			array.reduce(function (res, value) {

				if (!res[value.client]) {

					res[value.client] = {
						id: value.id_client,
						client: value.client,
						total: 0
					}

					result.push(res[value.client])

				}

				res[value.client].total += parseFloat(value.totalFile)

				return res

			}, {})

			return result.sort((a, b) => b.total - a.total)

		},

		handleFilterClient(client) {

			this.setSelectedClient(client)
			this.searchedString = null

		},

		isActiveItem(client) {

			return this.getSelectedClient == client

		}
	},

	mounted() {

	}
}
</script>

<style lang="scss">
.scroll-area {
	position: relative;
	margin: 0px;
	width: auto;
	height: 100vh;
}

.list-group-item.active {
	color: whitesmoke !important;
	background-color: #F09A49;
	border: none;
}
</style>

