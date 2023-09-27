<template>
	<div class="container-fluid">
		<div class="justify-content-center">

			<div v-if="!loading" class="col-md-12 text-center text-danger">
				<i class="fa fa-spinner fa-spin fa-2x "></i><br />
				Cargando Información
			</div>
			<div class="row" v-else>
				<div class="col-lg-9">
					<!-- <MuroItem :item="item" :users_id="users_id"></MuroItem> -->
				</div>
				<!-- style="height: 355px; width:100%; overflow-y: scroll;" -->
				<div class="col-lg-3 card " style="height: 355px; width:100%; overflow-y: scroll;">

					<div>
						<b-tabs dark active-nav-item-class="font-weight-bold text-warning "
							active-tab-class="font-weight-bold " content-class="mt-3 " small nav-class="entradas">
							<b-tab @click="getAllRegistrosMuro" title="Total entradas" active></b-tab>
							<b-tab @click="getTodosRegistrosMuro" title="Últimas entradas"></b-tab>
						</b-tabs>

					</div>


					<div class="card-body  m-0">
						<div class="list-group mt-2" id="listGroup" v-for="(item, index) in registrosMuro" :key="index"
							:class="{ borderClassActive: selected === item.id }">
							<!-- <i class="fas fa-check text-success" v-if="selected && selected===item.id"></i> -->
							<a href="#" class="list-group-item titulo_atc" @click.prevent="selectedRow(item)">
								<!-- :class="{ active: isSelected(item.id) }" -->
								<div class="row">
									<div class="col-lg-3  align-self-center">
										<img :src="getUrl(item.adjunto)" @error="onImageLoadFailure($event)"
											class="rounded-circle mr-2" width="50px" height="50px" alt="ATC" />
									</div>
									<div class="col-lg-9 align-self-center">
										{{ item.titulo }}
									</div>
									<div class="col-lg-12 align-self-center">
										<footer class="blockquote-footer text-right">
											{{ item.autor }},
											<cite title="Source Title">{{
												formatDate(item.date)
											}}</cite>
										</footer>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
/* *** SERVICES *** */
import MuroServices from "../../../../../services/profiles/muro/MuroServices";
// import MuroItem from "./muroItem.vue";
import moment from "moment";
// Vue.use(require("vue-moment"));
/* *** SERVICES *** */

export default {
	components: {
		// MuroItem

	},
	name: "DeparturesSlots",
	props: ["users_id"],
	data() {
		return {
			hoy: moment().format("YYYY-MM-DD"),
			registrosMuro: [],
			isLoaded: false,
			isActive: false,
			selected: 0,
			item: "",
			urlImagen: MuroServices.urlImagenMuro,
			loading: false,
			message: "Todas las entradas"
		};
	},

	methods: {
		formatDate(fecha) {
			return moment(fecha).format("MMMM Do, YYYY");
		},
		toggle() {
			this.isActive = !this.enable;
		},
		getTodosRegistrosMuro() {
			MuroServices.getTodosRegistrosMuro()
				.then(response => {
					this.registrosMuro = response.data.data;


					// validar fechas de resta - GI 21/07/2022

					// let ultimo_registro = this.registrosMuro.shift();
					// let fecha_del_ultimo_registro= ultimo_registro['date'];
					// let fecha_actual = this.hoy;

					// let resta_fechas= fecha_actual- fecha_del_ultimo_registro;
					// console.log(fecha_actual);
					// console.log(resta_fechas);
					// console.log(fecha_actual.diff(fecha_del_ultimo_registro, 'hours'))

				})
				.catch(error => {
					console.log("errores: " + error);
				})
				.finally(() => (this.loading = true));
		},

		getAllRegistrosMuro() {

			MuroServices.getAllRegistrosMuro()
				.then(response => {
					this.registrosMuro = response.data.data;
					console.log(response.data.data)
				})
				.catch(error => {
					console.log("errores: " + error);
				})
				.finally(() => (this.loading = true));
			//console.log(item)


		},

		// changeEntradas(){

		//     this.message='Todas las entradas'

		// },


		isSelected(i) {
			return i === this.selected;
		},
		selectedRow(item) {
			this.selected = item.id;
			this.item = item;
		},
		getUltimoRegistroMuro() {
			MuroServices.getUltimoRegistroMuro()
				.then(response => {
					this.item = response.data.data;
				})
				.catch(error => {
					console.log("errores: " + error);
				})
				.finally(() => (this.isLoaded = true));
		},
		getUrl(adjunto) {
			return this.urlImagen + adjunto;
		},
		onImageLoadFailure(event) {
			event.target.src = this.urlImagen + "default/informativo-ATC.jpg";
		}
	},
	mounted() { },
	created() {
		this.getTodosRegistrosMuro();
		this.getUltimoRegistroMuro();
		this.getAllRegistrosMuro();
	}
};
</script>

<style scoped>
.list-group-item.active {
	z-index: 2;
	background-color: transparent;
	border-color: transparent;
}

.borderClassActive {
	border-right: solid 7px #B66126;
}

.card-body {
	padding: 0;
}

/*
.row {
  display: grid;
  grid-auto-flow: column;

}

.col {
  border: solid;
} */

/* Style Row */
</style>
