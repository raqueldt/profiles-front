<template>
	<div>
		<b-form @submit.prevent="nextStep" ref="myForm">
			<b-card>
				<b-row>
					<b-col cols="12" md="4">
						<b-form-group label-for="name">
							<label for="name">Nombre <span class="text-danger text-sm">*</span></label>
							<b-form-input v-model="formData.name" id="name" placeholder="Ingrese su nombre" required />
						</b-form-group>
					</b-col>

					<b-col cols="12" md="4">
						<b-form-group label-for="lastname">
							<label for="lastname">Apellido <span class="text-danger text-sm">*</span></label>
							<b-form-input v-model="formData.lastname" id="lastname" placeholder="Ingrese su apellido"
								required />
						</b-form-group>
					</b-col>

					<b-col cols="12" md="4">
						<b-form-group label-for="email">
							<label for="email">Correo <span class="text-danger text-sm">*</span></label>
							<b-form-input v-model="formData.email" id="email" placeholder="Ingrese su correo electrónico"
								required />
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col cols="12" md="6">
						<!-- <b-form-group label-for="roles">
							<label for="roles">Roles <span class="text-danger text-sm">*</span></label>
							<b-form-select v-model="formData.roles" id="roles" :options="roles" multiple filter class="mb-3"
								required />
						</b-form-group> -->
						<label for="roles">Roles <span class="text-danger text-sm">*</span></label>

						<MultiselectBasic :selected="formData.rolesDinamics" :options="rolesOptions"
							@update:selected="updateRoles" />
					</b-col>

					<b-col cols="12" md="3">
						<b-form-group label-for="username">
							<label for="username">Usuario <span class="text-danger text-sm">*</span></label>
							<b-form-input v-model="formData.username" id="username"
								placeholder="Ingrese su nombre de usuario" required />
						</b-form-group>
					</b-col>

					<b-col cols="12" md="3">
						<b-form-group label-for="password">
							<label for="password">Contraseña <span class="text-danger text-sm">*</span></label>
							<b-form-input v-model="formData.password" id="password" type="password"
								placeholder="Ingrese su contraseña" required />
						</b-form-group>
					</b-col>
				</b-row>
			</b-card>
			<div class="text-right">
				<b-button type="submit" :disabled="!isFormValid" variant="primary">
					Siguiente <i class="fa fa-arrow-right"></i>
				</b-button>
			</div>
		</b-form>
	</div>
</template>

<script>
import RolesServices from "../../../../../../src/services/profiles/roles/RolesServices"
import MultiselectBasic from '../../../../../components/UI/Multiselect/MultiselectBasic.vue';
export default {
	components: {
		MultiselectBasic, // Asegúrate de tener el nombre correcto aquí
	},
	props: {
		formData: {
			type: Object,
			default: () => ({ roles: [] }),
		},
		title: String,
	},
	data() {
		return {
			roles: [],
			rolesSave: [],
			isFormValid: false,

		};
	},
	methods: {
		nextStep() {
			if (this.isFormValid) {
				this.$emit('next');
			} else {
				// Manejar el caso en que el formulario no es válido
			}
		},
		getRoles() {
			RolesServices.getRoles()
				.then((response) => {
						this.roles = response.data.data.filter(rol => rol.tag === 'ATC').map((rol) => ({
						value: rol.id,
						text: rol.title,
					}));
				})
				.catch((error) => {
					console.log(error);
				});
		},
		validateForm() {


			if (
				this.formData.name !== '' &&
				this.formData.lastname !== '' &&
				this.formData.email !== '' &&
				this.formData.roles.length > 0 &&
				this.formData.username !== '' &&
				this.formData.password !== ''
			) {
				this.isFormValid = true;
			} else {
				this.isFormValid = false;
			}
		},
		updateRoles(newValue) {
			this.formData.roles = newValue;
			this.formData.rolesDinamics = newValue;
			const selectedRoles = Object.values(newValue).map(item => item.value);
			this.formData.roles = selectedRoles;
			console.log("roleee", this.formData.rolesDinamics)

		},

	},
	computed: {
		rolesOptions() {
			return this.roles.map(rol => ({
				value: rol.value,
				text: rol.text
			}));
		},
	},
	mounted() {
		this.getRoles();

		this.validateForm();


	},
	watch: {
		formData: {
			deep: true,
			handler: 'validateForm', // Llamar a la función de validación cuando cambie el formData
		},

	},
};
</script>
