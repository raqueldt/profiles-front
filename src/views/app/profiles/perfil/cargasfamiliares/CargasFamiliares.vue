<template>
	<div>

		<!-- USER{{ users_id }}, {{userData}}, {{loggedUser}} -->
		<div class="row m-3">
			<div class="col-6">
				<h4 class="card-title mb-3">Cargas Familiares ({{ totalCargas }})</h4>
			</div>
			<div class="col text-right" v-if="rol == 'user'">
				<!-- <add-carga-familiar :users_id="users_id" @closeModal="closeModal"></add-carga-familiar> -->
			</div>
		</div>
		<div class="table-responsive-md">
			<table class="table text-left">
				<tr>
					<th>
						Verificación
					</th>
					<th>Cédula</th>
					<th>Parentesco / Nombre</th>
					<th>Nacimiento</th>
					<th>Edad</th>
					<th><i class="fa fa-wheelchair" aria-hidden="true"></i></th>
					<th>Acciones</th>
				</tr>
				<tr v-for="(cargaFamiliar, index) in cargas" :key="index">
					<td>
						<div class="text-center">
							<div v-if="cargaFamiliar.estado == 'Pendiente'" title="Pendiente">

								<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="gray"
									class="bi bi-check" viewBox="0 0 16 16">
									<path
										d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
								</svg>
								<small hidden>{{ cargaFamiliar.estado }}</small>
							</div>
							<div v-if="cargaFamiliar.estado == 'Aprobado'" title="Aprobado">
								<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green"
									class="bi bi-check-all" viewBox="0 0 16 16">
									<path
										d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
								</svg>
								<small hidden>{{ cargaFamiliar.estado }}</small>
							</div>
						</div>
					</td>
					<td>
						<p>{{ cargaFamiliar.cedula }}</p>
					</td>
					<td>
						<strong>{{ cargaFamiliar.parentezco }}</strong>
						<p>{{ cargaFamiliar.nombre }}</p>

					</td>
					<td>{{ cargaFamiliar.fecha_nacimiento }}</td>
					<td>
						<div v-if="cargaFamiliar.tiempo == 'anio'">
							<strong>{{ cargaFamiliar.edadActual }} años</strong>
						</div>
						<div v-if="cargaFamiliar.tiempo == 'mes' && cargaFamiliar.edadActual == 1">
							<strong>{{ cargaFamiliar.edadActual }} mes</strong>
						</div>
						<div
							v-if="cargaFamiliar.tiempo == 'mes' && cargaFamiliar.edadActual > 1 || cargaFamiliar.edadActual == 0">
							<strong>{{ cargaFamiliar.edadActual }} meses</strong>
						</div>
					</td>
					<td>{{ cargaFamiliar.discapacidad }}</td>
					<td>
						<div class="row">
							<div class="col" v-if="Boolean(cargaFamiliar.documento_path)">
								<button class="border-0 d-inline btn btn-success sm" size="sm"
									title="Haga click aquí para descargar el documento"
									@click="downloadFile(cargaFamiliar.documento_path)">
									<i class="fa fa-download"></i>
								</button>
							</div>
							<div class="col">
								<button v-if="cargaFamiliar.length != 0" class="btn btn-danger"
									@click="deleteConfirm(cargaFamiliar.id)">
									<i class="fa fa-trash" aria-hidden="true"></i>
								</button>
							</div>
						</div>
					</td>
				</tr>
			</table>


		</div>
	</div>
</template>

<script>
import CargasFamiliaresServices from "../../../../../services/profiles/cargasfamiliares/CargasFamiliaresServices";
// Vue.use(CxltToastr);
import { mapGetters } from "vuex";
import moment from 'moment'

export default {
	name: 'CargasFamiliares',
	props: ["users_id", "rol"],
	data() {
		return {
			now: moment().format("YYYY-MM-DD"),
			cargas: [],
			totalCargas: '',
			userData: ''
		}
	},
	computed: {
		...mapGetters({
			currentUser: "currentUser"
		}),

		loggedUser: function () {
			return this.$store.state.user.currentUser["id"];
		},
		currentUserVariable() {
			return this.currentUser;
		}
	},
	methods: {
		rowClass(item, type) {
			if (Boolean(item) && item.estado === 2) return 'table-success'
		},
		getCargasByUsersId() {
			CargasFamiliaresServices.getCargasByUsersId(this.loggedUser)
				.then(response => {
					this.cargas = response.data.data;
					this.totalCargas = this.cargas.length;
					var self = this;


					this.cargas.forEach(function (element) {
						let anio = Math.abs(moment(element.fecha_nacimiento).diff(moment(self.now), 'years'))
						let mes = Math.abs(moment(element.fecha_nacimiento).diff(moment(self.now), 'months'))
						if (anio > 0) {
							element.edadActual = anio
							element.tiempo = 'anio'
						} else {
							element.edadActual = mes
							element.tiempo = 'mes'
						}
					})
				})
				.catch(error => {
					console.log(error);
				});
		},
		closeModal() {
			this.getCargasByUsersId();
		},
		deleteConfirm(id) {
			this.$swal({
				title: "¿Estás seguro que deseas eliminar esta carga familiar?",
				text: "Por favor revisa que tus datos sean correctos",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Eliminar",
				cancelButtonText: "Cancelar",
				cancelButtonColor: "gray",
				confirmButtonColor: "#218838",
				// reverseButtons: true,
				focusConfirm: false,
				focusCancel: true,
			}).then(result => {
				if (result.isConfirmed) {

					this.deleteCargaFamiliar(id)
				} else if (
					result.dismiss === this.$swal.DismissReason.cancel
				) { }
			});
		},
		update(id) {
			this.$swal({
				title: "¿Estás seguro que deseas certificar  esta carga familiar?",
				text: "Por favor revisa que tus datos sean correctos",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Actualizar",
				cancelButtonText: "Cancelar",
				cancelButtonColor: "#C82333",
				confirmButtonColor: "#218838",
				reverseButtons: true,
				focusConfirm: false,
				focusCancel: true,
			}).then(result => {
				if (result.isConfirmed) {

					this.downloadCertificadoLaboral(id);
					this.updateCargaFamiliar(id)
				} else if (
					result.dismiss === this.$swal.DismissReason.cancel
				) { }
			});
		},
		deleteCargaFamiliar(id) {
			CargasFamiliaresServices.deleteCargaFamiliar(id)
				.then(() => {
					this.getCargasByUsersId()
				})
				.catch(error => console.log(error))
		},
		updateCargaFamiliar(id) {
			let data = {
				estado: 2,
			};
			CargasFamiliaresServices.updateEstadoCargaFamiliar(id, data)
				.then(() => {
					this.getCargasByUsersId()
				})
				.catch(error => console.log(error))
		},

		getDocumentsUrl(path) {
			// let url = "";
			// if (this.rol == 'admin') {
			// 	url = '../../../img/talento_humano/cargas_familiares/' + path;
			// } else if (this.rol == 'user') {
			// 	url = '../img/talento_humano/cargas_familiares/' + path;
			// }

			let url = '../../../img/talento_humano/cargas_familiares/' + path;
			return url;
		},
		downloadFile(path) {
			var url = this.getDocumentsUrl(path);
			window.open(url, '_blank');
		}
	},
	mounted() {
		this.userData = this.loggedUser;
		this.getCargasByUsersId();

	}
}

</script>


