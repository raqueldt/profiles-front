<template>
	<div>
		<b-card>

			<b-row>
				<b-col lg="2">
					<b-form-group label-for="id_biometrico">
						<label for="id_biometrico" class="control-label">ID Biometrico</label>
						<span class="text-danger">*</span>
						<b-form-input v-model="formData.id_biometrico" id="id_biometrico" type="number"
							placeholder="Ingrese el ID Biometrico" />
					</b-form-group>
				</b-col>
				<b-col lg="2">
					<b-form-group label="Código GPS" label-for="codigo_gps">
						<b-form-input v-model="formData.codigo_gps" id="codigo_gps" type="number"
							placeholder="Ingrese el código GPS" />
					</b-form-group>
				</b-col>

				<b-col lg="2">
					<b-form-group label="Código 37" label-for="codigo_37">
						<b-form-input v-model="formData.codigo_37" id="codigo_37" type="number"
							placeholder="Ingrese el código 37" />
					</b-form-group>
				</b-col>


				<b-col lg="6">
					<b-form-group label="Notas" label-for="notas">
						<b-form-textarea v-model="formData.notas" id="notas" placeholder="Ingrese notas adicionales" />
					</b-form-group>
				</b-col>
			</b-row>
		</b-card>
		<!-- Agrega campos y contenido para este paso -->
		<div class="row justify-content-between m-1">
			<b-button @click="prevStep" variant="light">
				<i class="fa fa-arrow-left"></i>
				Anterior
			</b-button>
			<b-button variant="success"  v-if="!formData.users_id" @click="submitForm" :disabled="!isFormValid"> <i class="fa fa-check"></i> Crear
				Usuario</b-button>
			<b-button variant="success"  v-if="formData.users_id" @click="submitFormEdit" :disabled="!isFormValid"> <i class="fa fa-check"></i> Actualizar
				Usuario</b-button>
		</div>
	</div>
</template>

<script>
export default {
	props: ['formData', 'title'],
	data() {
		return {
			isFormValid: false,
		}
	},
	methods: {
		prevStep() {

			this.$emit('prev');
		},
		submitForm() {
			if (this.isFormValid) {
				this.$emit('submit');
			}
		},
		submitFormEdit() {
			if (this.isFormValid) {
				this.$emit('submitEdit');
			}
		},
		validateForm() {
			if (
				this.formData.id_biometrico

			) {
				this.isFormValid = true;
			} else {
				this.isFormValid = false;
			}
		},
	},
	mounted() {
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
