<template>
	<div>
		<b-card>
			<b-row>
				<b-col cols="12" md="3">
					<b-form-group label-for="identificacion">
						<label for="identificacion">Identificación <span class="text-danger text-sm">*</span></label>
						<b-form-input v-model="formData.identificacion" id="identificacion" type="number"
							placeholder="Ingrese la identificación" required />
					</b-form-group>
				</b-col>
				<b-col cols="12" md="4">
					<b-form-group label-for="nombre_completo">
						<label for="nombre_completo">Nombres y Apellidos <span class="text-danger text-sm">*</span></label>
						<b-form-input v-model="formData.nombre_completo" id="nombre_completo"
							placeholder="Ingrese los nombres y apellidos" required />
					</b-form-group>
				</b-col>
				<b-col cols="12" md="3">
					<b-form-group label-for="fecha_nacimiento">
						<label for="nombre_completo">Fecha de Nacimiento<span class="text-danger text-sm">*</span></label>
						<b-form-input v-model="formData.fecha_nacimiento" id="fecha_nacimiento" type="date" required />
					</b-form-group>
				</b-col>
				<b-col cols="12" md="2">
					<b-form-group label-for="estado_civil">
						<label for="estado_civil">Estado Civil<span class="text-danger text-sm">*</span></label>
						<b-form-select v-model="formData.estado_civil" id="estado_civil" :options="listaEstadoCivil"
							style="width:100%" required />
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col cols="12" md="4">
					<b-form-group label-for="email_personal">
						<label for="email_personal">Correo Personal<span class="text-danger text-sm">*</span></label>
						<b-form-input v-model="formData.email_personal" id="email_personal"
							placeholder="Ingrese el correo personal" required />
					</b-form-group>
				</b-col>
				<b-col cols="12" md="3">
					<b-form-group label-for="fecha_ingreso_atc">
						<label for="fecha_ingreso_atc">Fecha de Ingreso ATC<span
								class="text-danger text-sm">*</span></label>
						<b-form-input v-model="formData.fecha_ingreso_atc" id="fecha_ingreso_atc" type="date" required />
					</b-form-group>
				</b-col>
				<b-col cols="12" md="3">
					<b-form-group label="Imagen" label-for="image">
						<b-form-file v-model="selectedImage" id="image" :state="Boolean(selectedImage)"
							placeholder="Seleccione un archivo" accept="image/*" @change="onImageChange" required />

					</b-form-group>
				</b-col>
				<b-col cols="12" md="2">
					<b-form-group>
						<div v-if="imagePreview" class="image-thumbnail">
							<b-img v-if="imagePreview" :src="imagePreview" fluid thumbnail alt="Imagen cargada"
								width="110px" height="110px" />
						</div>
						<span v-if="!imagePreview">
							Vista previa
						</span>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<!-- Otros campos si es necesario -->
			</b-row>
		</b-card>
		<div class="row justify-content-between m-1" v-if="!formData.users_id">
			<b-button @click="prevStep" variant="light">
				<i class="fa fa-arrow-left"></i>
				Anterior
			</b-button>
			<b-button @click="nextStep" :disabled="!isFormValid" variant="primary">
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
			selectedImage: null,
			listaEstadoCivil: [],
			isFormValid: false,
		};
	},
	computed: {
		imagePreview() {
			return this.formData.image ? URL.createObjectURL(this.formData.image) : null;
		},
	},
	methods: {
		prevStep() {
			this.$emit('prev');
		},
		nextStep() {
			this.$emit('next');
		},
		onImageChange(e) {
			const file = e.target.files[0];
			if (file) {
				console.log('Imagen seleccionada:', file);
				this.formData.image = file;
				console.log('formData IMAGEN:', this.formData.image);
			} else {
				console.log('Ninguna imagen seleccionada.');
				this.formData.image = null;
			}
		},
		getEstadoCivil() {
			CatalogoServices.getCatalogosByCodigo(10)
				.then(response => {
					this.listaEstadoCivil = response.data.data.map(civil => ({
						value: civil.id,
						text: civil.valor,
					}));
					this.formData.estado_civil = 1;
				})
				.catch(error => {
					console.log(error);
				});
		},
		validateForm() {
			if (
				this.formData.identificacion &&
				this.formData.nombre_completo &&
				this.formData.fecha_nacimiento &&
				this.formData.estado_civil &&
				this.formData.email_personal &&
				this.formData.fecha_ingreso_atc
				// && this.selectedImage
			) {
				this.isFormValid = true;
			} else {
				this.isFormValid = false;
			}
		},
	},
	mounted() {
		this.getEstadoCivil();
		this.validateForm();
	},
	watch: {
		formData: {
			deep: true,
			handler: 'validateForm',
		},
		selectedImage() {
			this.validateForm();
		},
	},
};
</script>
