<template>
	<div>
		<template v-if="getSelectedFile">

			<b-form-input type="text" class="text-class-form mt-3" v-model="search" autocomplete="off"
				placeholder="Search code"></b-form-input>
			<b-list-group class="mt-4 collection-header scroll-area ">

				<b-list-group-item class="p-1 border-0" hidden>
					<b-input-group>
						<div class="form-group w-100">
							<div class="row text-right">
								<div class="col">
									<i class="fa fa-circle fa-xs" aria-hidden="true" style="color:green;"></i>
									<small class="text-muted">Confirmed</small>
									<!-- </div>
								<div class="col"> -->
									<i class="fa fa-circle fa-xs" aria-hidden="true" style="color:red"></i>
									<small class="text-muted">Cancelled</small>
								</div>
							</div>
						</div>
					</b-input-group>
				</b-list-group-item>
				<!-- v-bind:class="{ 'active': isSelected(item.cofId) && (search = item.cofCodigo) }" -->
				<b-list-group-item v-for="item in fileManagerFilter" :key="item.cofId" v-on:click="selectFile(item.cofId)"
					v-bind:class="{ 'active': isSelected(item.cofId) }" style="cursor:  pointer; "
					class="py-2 px-2 border-1 text- row justify-content-center m-0 ">
					<span>
						<strong>
							<!-- PINTAR FILE CODE POR ESTADO DE CONFIRMACION | AM -->
							<span v-if="item.cofEstado == 1" v-tooltip="{
							}" class="badge bg-success status h4 text-white mt-1" title="Confirmed">{{ item.cofCodigo }}</span>
							<span v-else v-tooltip="{
							}" class="badge bg-danger status h4 text-white" title="Cancelled">{{ item.cofCodigo }}</span>
						</strong></span>
					<b-badge variant="light" class="float-right mt-1"> {{ item.subtotal | currency }} </b-badge>
				</b-list-group-item>
			</b-list-group>
		</template>
	</div>
</template>
<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
	name: "CollectionFileManagerFilter",
	components: {
	},

	data() {
		return {
			selected: 0,
			search: ''
		}
	},

	computed: {

		...mapGetters('fileManager', ['getFileManagerFilter', 'getSelectedFile']),

		fileManagerFilter() {
			return this.getFileManagerFilter(this.search)
		},

		fileIdCurrent() {
			const { f } = this.$route.query
			return parseInt(f)
		},

		clientIdCurrent() {
			const { c } = this.$route.query
			return parseInt(c)
		},

		startDateCurrent() {
			const { s } = this.$route.query
			return s
		},

		endDateCurrent() {
			const { e } = this.$route.query
			return e
		},
	},

	watch: {
		search() {
			if (this.search == '') {
				console.log("vacioo", this.search)
				this.selected = 0;
			}
		}
	},

	methods: {
		...mapMutations('fileManager', ['setSelectedFile']),

		isSelected: function (id) {
			return id === this.fileIdCurrent  //this.selected;
		},

		selectFile(id) {
			// establecer nuevos parametros para la url
			const queryParams = {
				c: this.clientIdCurrent,
				f: id,
				s: this.startDateCurrent,
				e: this.endDateCurrent
			}

			// update url
			this.$router.push({ name: 'collection-file-manager', query: { ...queryParams } })

			// update selected file
			this.updateSelectedFile()

		},

		updateSelectedFile() {
			const id = this.fileIdCurrent
			this.selected = id
			// establecer id selected
			this.setSelectedFile(id)
		}
	},


	created() {
		this.updateSelectedFile()
	}
};
</script>

<style lang="scss" scoped>
.list-group-item.active {
	color: whitesmoke !important;
	background-color: #F09A49;
}

.scroll-area {
	position: relative;
	margin: 0px;
	width: auto;
	height: 60vh;
	overflow: scroll;
	overflow-x: hidden;
}
</style>
