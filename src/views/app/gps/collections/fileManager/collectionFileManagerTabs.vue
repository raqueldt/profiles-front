<template>
	<div>

		<b-row>
			<b-col lg="11">
				<template v-if="getSelectedFile">
					<b-tabs nav-class="separator-tabs ml-1 mb-5 mt-2" content-class="tab-content-fluid" :no-fade="true"
						lazy>
						<!-- <template #tabs-end >
							<b-row>
								<b-colxx lg="4">
									<router-link :to="{ name: 'confirmations', params: { cofId: getSelectedFile } }">
										<b-button class="btn btn-sm  bg-light text-muted"> <b-icon icon="eye-fill"
												aria-hidden="true" title="View confirmation"></b-icon> </b-button>
									</router-link>
								</b-colxx>
							</b-row>
						</template> -->

						<b-tab :title="$t('gps.collections.records')">
							<b-row>
								<b-colxx lg="4" class="main-summary">
									<collection-file-manager-summary></collection-file-manager-summary>
								</b-colxx>
								<b-colxx lg="8" class="pl-0 main-summary">
									<collection-file-manager-records></collection-file-manager-records>
								</b-colxx>
							</b-row>

						</b-tab>


						<b-tab :title="$t('gps.collections.credit-notes')">
							<b-row>
								<b-colxx lg="4" class="main-summary">
									<collection-file-manager-summary></collection-file-manager-summary>
								</b-colxx>
								<b-colxx lg="8" class="pl-0 main-summary">
									<collection-file-manager-credit-notes></collection-file-manager-credit-notes>
								</b-colxx>
							</b-row>
						</b-tab>

						<b-tab :title="$t('gps.collections.compensations')">
							<b-row>
								<b-colxx lg="4" class="main-summary">
									<collection-file-manager-summary></collection-file-manager-summary>
								</b-colxx>
								<b-colxx lg="8" class="pl-0 main-summary">
									<collection-file-manager-compensation></collection-file-manager-compensation>
								</b-colxx>
							</b-row>
						</b-tab>





					</b-tabs>
				</template>

			</b-col>
			<b-col lg="1" v-if="getSelectedFile">
				<router-link :to="{ name: 'confirmations', params: { cofId: getSelectedFile } }">
					<b-button class="btn btn-sm  bg-light text-muted  ml-0 mb-5 mt-2"> <b-icon icon="eye-fill"
							aria-hidden="true" title="View confirmation"></b-icon> </b-button>
				</router-link>
			</b-col>
		</b-row>
	</div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

	name: 'collectionFileManagerTabs',

	data() {
		return {}
	},

	computed: {

		...mapGetters('fileManager', ['getFileManager', 'getSelectedFile'])

	},

	methods: {

	},

	mounted() {

	},

	created() {

	},
}
</script>

<style lang="scss" scoped></style>
