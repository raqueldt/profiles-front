<template>
	<div>
		<b-card>
			<header>
				<h4>General</h4>
			</header>
			<b-row>
				<b-col lg="2" class="form-group">
					<label for="etnia" class="control-label">Etnia</label>
					<span class="text-danger">*</span>
					<b-form-select v-model="formData.etnia" id="etnia" :options="etniaOptions"
						style="width:100%"></b-form-select>
				</b-col>
				<b-col lg="2" class="form-group">
					<label for="tipo_sangre" class="control-label">Tipo de Sangre</label>
					<b-form-select v-model="formData.tipo_sangre" id="tipo_sangre" :options="tipoSangreOptions"
						style="width:100%"></b-form-select>
				</b-col>
				<b-col lg="2" class="form-group">
					<label for="lateralidad" class="control-label">Lateralidad</label>
					<b-form-select v-model="formData.lateralidad" id="lateralidad" :options="lateralidadOptions"
						style="width:100%"></b-form-select>
				</b-col>
				<b-col lg="2" class="form-group">
					<label for="uso_lentes" class="control-label">Uso de Lentes</label>
					<b-form-select v-model="formData.uso_lentes" id="uso_lentes" :options="condicionalOptions"
						style="width:100%"></b-form-select>
				</b-col>
				<b-col lg="2">
					<b-form-group label="Peso" label-for="peso">
						<b-form-input v-model="formData.peso" id="peso" type="number" placeholder="Ingrese el peso" />
					</b-form-group>
				</b-col>
				<b-col lg="2">
					<b-form-group label="Estatura" label-for="estatura">
						<b-form-input v-model="formData.estatura" id="estatura" type="number"
							placeholder="Ingrese la estatura" />
					</b-form-group>
				</b-col>
				<b-col lg="2" class="form-group">
					<label for="posee_discapacidad" class="control-label">Posee discapacidad</label>
					<span class="text-danger">*</span>
					<b-form-select v-model="formData.posee_discapacidad" id="posee_discapacidad"
						:options="condicionalOptions" style="width:100%"></b-form-select>
				</b-col>
				<b-col lg="2" class="form-group" v-if="formData.posee_discapacidad === 1">
					<label for="tipo_discapacidad" class="control-label">Tipo</label>
					<span class="text-danger">*</span>
					<b-form-select v-model="formData.tipo_discapacidad" id="tipo_discapacidad" :options="discapacidaOptions"
						style="width:100%"></b-form-select>
				</b-col>
				<b-col lg="2" class="form-group" v-if="formData.posee_discapacidad === 1">
					<label for="trabajador_sustituto" class="control-label">Trabajador sustituto</label>
					<span class="text-danger">*</span>
					<b-form-select v-model="formData.trabajador_sustituto" id="trabajador_sustituto"
						:options="condicionalOptions" style="width:100%"></b-form-select>
				</b-col>

			</b-row>
		</b-card>

		<!-- Agrega campos y contenido para este paso -->
		<div class="row justify-content-between m-1" v-if="!formData.users_id">
			<b-button @click="prevStep" variant="light">
				<i class="fa fa-arrow-left"></i>
				Anterior
			</b-button>
			<b-button @click="nextStep" variant="primary" :disabled="!isFormValid">
				Siguiente
				<i class="fa fa-arrow-right"></i>
			</b-button>
		</div>
	</div>
</template>

<script>
import CatalogoServices from "../../../../../../src/services/profiles/catalogos/catalogosServices"
export default {
	props: ['formData', 'title'],
	data() {
		return {
			etniaOptions: [],
			tipoSangreOptions: [],
			lateralidadOptions: [],
			condicionalOptions: [],
			discapacidaOptions: [],
			isFormValid: false, // Agrega esta propiedad
		}
	},
	methods: {
		prevStep() {
			this.$emit('prev');
		},
		nextStep() {
			if (this.isFormValid) {
				this.$emit('next');
			} else {
				// Manejar el caso en que el formulario no es válido
			}
		},
		getEtnias() {
			CatalogoServices.getCatalogosByCodigo(29)
				.then(response => {
					this.etniaOptions = response.data.data.map(etnia => ({
						value: etnia.id,
						text: etnia.valor,
					}));
				})
				.catch(error => {
					console.log(error);
				});
		},
		getTipoSangre() {
			CatalogoServices.getCatalogosByCodigo(28)
				.then(response => {
					this.tipoSangreOptions = response.data.data.map(tipo => ({
						value: tipo.id,
						text: tipo.valor,
					}));
				})
				.catch(error => {
					console.log(error);
				});
		},
		getLateralidad() {
			CatalogoServices.getCatalogosByCodigo(30)
				.then(response => {
					this.lateralidadOptions = response.data.data.map(lateralidad => ({
						value: lateralidad.id,
						text: lateralidad.valor,
					}));
				})
				.catch(error => {
					console.log(error);
				});
		},
		getCondicional() {
			CatalogoServices.getCatalogosByCodigo(16)
				.then(response => {
					this.condicionalOptions = response.data.data.map(lentes => ({
						value: lentes.id,
						text: lentes.valor,
					}));
				})
				.catch(error => {
					console.log(error);
				});
		},
		getDiscapacidades() {
			CatalogoServices.getCatalogosByCodigo(19)
				.then(response => {
					this.discapacidaOptions = response.data.data.map(discapacidad => ({
						value: discapacidad.id,
						text: discapacidad.valor,
					}));
				})
				.catch(error => {
					console.log(error);
				});
		},
		validateForm() {
			// Verifica si todos los campos requeridos están completos
			if (
				this.formData.etnia
			) {
				if (this.formData.posee_discapacidad === 1) {
					// Si forma_pago es igual a 1, llama a una función para validar campos adicionales
					this.validateAdditionalFields();
				} else {
					this.isFormValid = true;
				}
			} else {
				this.isFormValid = false;
			}
		},
		validateAdditionalFields() {
			// Valida campos adicionales si forma_pago es igual a 1
			if (
				this.formData.tipo_discapacidad && this.formData.trabajador_sustituto
			) {
				this.isFormValid = true;
			} else {
				this.isFormValid = false;
			}
		},
	},
	mounted() {
		this.getEtnias();
		this.getTipoSangre();
		this.getLateralidad();
		this.getCondicional();
		this.getDiscapacidades();
		this.validateForm();
	},
	watch: {
		formData: {
			deep: true,
			handler: 'validateForm', // Llama a la función de validación cuando cambie el formData
		},
	},

};
</script>
