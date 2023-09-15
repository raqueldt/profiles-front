<template>

	<div>
		<!-- v-b-modal="`modal-itinerary-${this.depId}-${this.itiId}`"      	   -->
		<template>
			<b-button @click="showModal()" variant="success" class="border-0 font-weight-bold" size="sm">
				<i class="fas fa-plus"></i> Agregar Carga Familiar
			</b-button>
		</template>

		<b-modal ref="itinerary-modal" centered :id="`modal-itinerary-${this.users_id}`"
			title="Añadir nueva carga familiar" ok-only ok-title="Close" header-bg-variant="light"
			header-class="p-3 justify-content" body-class="px-3 py-0" footer-class="p-3" size="lg">


			<form enctype="multipart/form-data" class="row p-2">

				<div class="col-lg-6 form-group">

					<label for="titulo" class="control-label">
						Nombres:
					</label>

					<input placeholder="Digita nombres y apellidos" v-model="formNombres" value="formNombres"
						name="formNombres" type="text" maxlength="75" id="formNombres" class="form-control" />
				</div>

				<div class="col-lg-6 form-group">

					<label for="titulo" class="control-label">

						Fecha Nacimiento:
					</label>
					<input placeholder="Selecciona tu día" v-model="formFechaNacimiento" value="formFechaNacimiento"
						name="formFechaNacimiento" type="date" id="formFechaNacimiento"
						class="form-control" />
				</div>


				<div class="col-md-6 form-group">
					<label for="users_id" class="control-label">
						Parentesco: </label>

					<select name="users_id" id="users_id" required="required" v-model="formParentezco"
						class="form-control" placeholder="Category">
						<option value="">-- Seleccione parentezco --</option>
						<option v-for="(option, index) in parentezcos" :key="index" v-bind:value="option.id">
							{{ option.valor }}
						</option>
					</select>
				</div>

				<div class="col-lg-6 form-group">

					<label for="titulo" class="control-label">
						Cédula:
					</label>
					<input placeholder="Digita su número de cédula" v-model="formCedula" value="formCedula"
						name="formCedula" type="text" maxlength="10" id="formCedula" class="form-control" />
				</div>

				<div class="col-md-6 form-group">
					<label for="users_id" class="control-label">
						<span class="text-light h3">*</span>Discapacidad:
					</label>

					<select name="users_id" id="users_id" required="required" v-model="formDiscapacidad"
						class="form-control" placeholder="Category">
						<option value="">-- Seleccione discapacidad --</option>
						<option v-for="(option, index) in condicionales" :key="index" v-bind:value="option.id">
							{{ option.text }}
						</option>
					</select>
				</div>


				<div class="col-md-6 form-group">
					<label for="users_id" class="control-label">

						Documento:
					</label>
					<div class="input-group mt-2">
						<div class="custom-file">
							<input type="file" class="custom-file-input" @change="onFileChanged" id="inputGroupFile01"
								aria-describedby="inputGroupFileAddon01">
							<label class="custom-file-label" for="inputGroupFile01">
								{{ Boolean(formDocumento) ?formDocumento: 'Adjunta documento' }}
							</label>
						</div>
					</div>
				</div>


				<button class="
                  btn btn-success
                  text_white
                  btn-block btn-md btn-responsive

                " :disabled="!this.enableSendButton()" @click.prevent="saveCargaFamiliar()">
					<i class="fas fa-save"></i> Registrar
				</button>
				<!-- :disabled="!this.enableSendButton() || this.errorHour != ''" -->


			</form>

		</b-modal>

	</div>

</template>

<script>
import CargasFamiliaresServices from "../../services/cargasfamiliares/CargasFamiliaresServices.js";
import CatalogosServices from "../../services/catalogos/CatalogosServices.js";
import moment from "moment-business-days";
import CxltToastr from "cxlt-vue2-toastr";

moment.locale("es");
Vue.use(CxltToastr);
var toastrConfigs = {
	position: "top right",
	showDuration: 2000,
};
Vue.use(CxltToastr, toastrConfigs);

export default {
	name: 'ItineraryInfoModal',
	props: {
		users_id: {
			type: Number,
			required: false,
			default: 0
		},
	},
	data() {

		return {
			isLoading: false,
			now: moment().format("YYYY-MM-DD"),
			parentezcos: [],
			condicionales: [{
				id: 1,
				text: 'SI'
			}, {
				id: 2,
				text: 'NO'
			}],

			formNombres: "",
			formFechaNacimiento: "",
			formParentezco: "",
			formCedula: "",
			formDiscapacidad: "",
			formDocumento: "",
			selectedFile: "",
			selectedFileName: "",
		}

	},
	computed: {
		itineraryTextLink: function () {
			return this.itiCode ? this.itiCode : this.itiName
		}
	},
	watch: {

	},
	mounted() {
		this.getParentezcos();
		this.clear();
	},
	created() {

	},
	methods: {
		enableSendButton() {
			if (
				this.formNombres != "" &&
				this.formFechaNacimiento != "" &&
				this.formParentezco != "" &&
				this.formCedula != "" &&
				this.selectedFile != ""
			) {
				return true;
			} else {
				return false;
			}
		},
		clear() {
			this.formNombres = "";
			this.formFechaNacimiento = "";
			this.formParentezco = "";
			this.formCedula = "";
			this.formDiscapacidad = "";
			this.formDocumento = "";
			this.selectedFile = "";
			this.selectedFileName = "";
		},
		getParentezcos() {
			var codigo = 17;
			CatalogosServices.getCatalogosByCodigo(codigo)
				.then((response) => {
					this.parentezcos = response.data.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		async showModal() {
			//await this.getSummaryItinerary()
			this.$refs['itinerary-modal'].show()
		},
		async closeModal() {
			//await this.getSummaryItinerary()
			this.$refs['itinerary-modal'].hide()
		},
		onFileChanged(event) {
			const file = event.target.files[0]
			this.selectedFile = event.target.files[0]
			this.selectedFileName = this.selectedFile.name
		},

		saveCargaFamiliar() {
			const formData = new FormData()
			if (this.selectedFile) formData.append('file', this.selectedFile, this.selectedFile.name)

			let data = {
				nombres: this.formNombres,
				fechaNacimiento: this.formFechaNacimiento,
				parentezco: this.formParentezco,
				cedula: this.formCedula,
				discapacidad: this.formDiscapacidad,
				documento_path: this.formDocumento,
				users_id: this.users_id,
			};

			formData.append('data', data)
			_.each(data, (value, key) => {
				formData.append(key, value)
			})
			CargasFamiliaresServices.createCargaFamiliar(formData)
				.then((response) => {
					this.displayMessage();
					this.closeModal();
					this.$parent.closeModal();
				})
				.catch((error) => {
					console.log(error);
				});

		},
		displayMessage() {
			this.$toast.success({
				title: "Success",
				message: "Carga Familiar añadida correctamente",
				progressBar: true,
				position: "top right",
				showDuration: 3000,
				timeOut: 4500,
			});
		},

	}

}

</script>
