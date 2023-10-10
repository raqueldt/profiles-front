<template>
	<div>
		<!-- {{ actionModalValue }}<br> -->
		<div class="row justify-content-between ml-2 mr-2" v-if="actionModalValue === 'editUser'">

			<h5 class="text-muted">Actualizar Usuario</h5>
			<h5>{{ formData.nombre_completo }}</h5>
		</div>
		<div class="row justify-content-between ml-2 mr-2" v-else>
			<h5 class="text-muted">Crear Usuario</h5>
		</div>
		<b-progress :value="progress" animated></b-progress>
		<b-row class="justify-content-center">
			<b-col v-for="(step, index) in stepTitles" :key="index" class="text-center">
				{{ index + 1 }}
				<div v-if="actionModalValue == 'editUser'" style="cursor: pointer;"
					:class="['step-indicator', { active: index === currentStep - 1 }]" @click="verificarSeccion(index + 1)">
					<i v-if="index < currentStep - 1" class="text-primary fas fa-check"></i>
					<i v-else :class="' fa fa-' + getStepIcon(index + 1)"></i>
				</div>
				<div v-else :class="['step-indicator', { active: index === currentStep - 1 }]">
					<i v-if="index < currentStep - 1" class="text-primary fas fa-check"></i>
					<i v-else :class="' fa fa-' + getStepIcon(index + 1)"></i>
				</div>
				<p :class="['step-title', { 'text-primary': index === currentStep - 1 }]">{{ getStepTitle(index + 1) }}</p>
			</b-col>
		</b-row>
		<b-row class="justify-content-center">
			<b-col>
				<component :is="stepComponents[currentStep - 1]" :formData="formData" :title="getStepTitle(currentStep)"
					@prev="prevStep" @next="nextStep" @submit="submitForm" @submitEdit="submitFormEdit" />
			</b-col>
		</b-row>
		<br>
		<b-row class="text-right" v-if="actionModalValue == 'editUser'">
			<b-col>
				<b-button variant="success" @click="submitFormEdit"> <i class="fa fa-check"></i> Actualizar
					Usuario</b-button></b-col>
		</b-row>

		<!-- Actual: {{ idUserModal }}<br>
		<div class="row">
			<div class="col-5">
				<pre>
			{{ formData }}
			</pre>
			</div>
			<div class="col">
				<pre>
			{{ formDataModal }}
			</pre>
			</div>
		</div> -->

		<!-- <pre>{{ formData }}</pre> -->
	</div>
</template>

<script>
import InternoServices from "../../../../../services/profiles/interno/internoServices";
import Step1 from './createuserStep1.vue';
import Step2 from './createuserStep2.vue';
import Step3 from './createuserStep3.vue';
import Step4 from './createuserStep4.vue';
import Step5 from './createuserStep5.vue';
import Step6 from './createuserStep6.vue';

export default {
	props: {
		actionModal: String,
		idUserModal: Number
	},
	components: {
		Step1,
		Step2,
		Step3,
		Step4,
		Step5,
		Step6,
	},
	data() {
		return {
			formDataModal: [],
			actionModalValue: this.actionModal,
			formData: {
				users_id: '',
				image: null,
				identificacion: '',
				nombre_completo: '',
				fecha_nacimiento: '',
				email_personal: '',
				estado_civil: '',
				fecha_ingreso_atc: '',
				notas: '',
				empresa: '',
				departamento_id: '',
				cargo_id: '', //F
				tipo_contrato: '',
				sueldo: '',
				banda_salarial: '', //F
				acumula_decimos: '',
				operador_id: '',
				funciones: '', //F
				tipo_discapacidad: '',
				trabajador_sustituto: '',
				forma_pago: '', //F
				//EDITAR
				name: '',
				lastname: '',
				email: '',
				username: '', //F
				password: '', //F
				dias_vacaciones: '', //F
				dias_feriado_carnaval: '', //F
				dias_feriado_difuntos: '', //F
				dias_descuento: '', //F
				region: '', //F
				direccion: '', //F
				referencia_direccion: '', //F
				sector: '', //F
				numero_contacto: '', //F
				telefono_convencional: '', //F
				celular_oficina: '', //F
				extension: '', //F
				contacto_emergencia: '', //F
				numero_emergencia: '', //F
				direccion_emergencia: '', //F
				etnia: '', //F
				tipo_sangre: '', //F
				lateralidad: '', //F
				uso_lentes: '', //F
				peso: '', //F
				estatura: '', //F
				posee_discapacidad: '', //F
				trabajador_sustituto: '', //F
				id_biometrico: '', //F
				codigo_gps: '', //F
				codigo_37: '', //F
				notas: '', //F
				numero_cuenta: '', //F
				tipo_cuenta: '', //F
				banco: '', //F
				roles: [],//F
			},


			currentStep: 1,
			totalSteps: 6,
			stepComponents: [Step2,Step1, Step3, Step4, Step5, Step6],
			stepTitles: [
				"General",
				"Accesos",
				"Salary / Position",
				"Location / Contact",
				"Health",
				"Aditional",
			],
			stepIcons: [
				"id-card",   // You can replace these with actual icon names
				"user",   // You can replace these with actual icon names
				"users",
				"location-arrow",
				"heart",
				"plus",
			],
		};
	},
	computed: {
		progress() {
			return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
		},
	},
	methods: {

		verificarSeccion(value) {
			this.currentStep = value;
			console.log("SELECICONADA", value)
		},
		getStepTitle(stepIndex) {
			return this.stepTitles[stepIndex - 1];
		},
		nextStep() {
			this.currentStep++;
		},
		prevStep() {
			this.currentStep--;
		},
		submitForm() {
			// Aquí puedes enviar los datos al servidor
			console.log("DATOS NUEVO USUARIO", this.formData);

			InternoServices.create(this.formData)
				.then(response => {
					console.log("usuario creado", response)
					this.$emit('usuario-creado'); // Emitir el evento
					this.$swal({
						title: 'USUARIO CREADO!',
						icon: 'success',
						timer: 2000,
						showConfirmButton: false,
					});
				})
				.catch(error => {
					console.log(error);
				}).finally(() => this.clear());
		},
		async submitFormEdit() {
			// Aquí puedes enviar los datos al servidor
			console.log("DATOS EDIT USUARIO", this.formData);
			console.log("DATOS EDIT USUARIO ID", this.formData.users_id);

			try {
				const response = await InternoServices.updateUser(this.formData); // Reemplaza "inactivarUsuario" por la función adecuada
				console.log("respuesta editar usuario", response.data);
				if (response.data) {
					this.$emit('usuario-creado'); // Emitir el evento
					// this.filterUsers(2);
					// const updatedResponse = await InternoServices.getAllUsers();
					// this.filteredUsers = updatedResponse.data.data;
					this.$swal({
						title: 'ACTUALIZADO!',
						icon: 'success',
						timer: 2000,
						showConfirmButton: false,
					});
				} else {
					this.$swal({
						title: 'Error',
						text: 'No se pudo inactivar el usuario.',
						icon: 'error',
					});
				}
			} catch (error) {
				console.error("Error:", error);
			}
		},
		getStepTitle(stepIndex) {
			return this.stepTitles[stepIndex - 1];
		},
		getStepIcon(stepIndex) {
			return 'fa fa-' + this.stepIcons[stepIndex - 1];
		},
		async consultarData(idUser) {
			console.log("recibe user", idUser);
			const perfilParams = {
				id: idUser
			};
			// try {
			// 	const perfilResponse = await InternoServices.show(perfilParams);
			// 	this.formDataModal = perfilResponse.data.data;

			// 	console.log("datos para agregar", this.formDataModal);
			// } catch (error) {

			// }
			try {
				const perfilResponse = await InternoServices.show(perfilParams);
				this.formDataModal = perfilResponse.data.data;

				console.log("datos para agregar", this.formDataModal);

				// Verificar si actionModalValue es "editUser" y copiar los valores de formDataModal a formData
				if (this.actionModalValue === 'editUser') {
					for (const key in this.formDataModal) {
						if (this.formDataModal.hasOwnProperty(key)) {
							// Verificar si la clave es 'roles'
							if (key === 'roles') {
								// Crear un nuevo array rolesDinamics con solo los valores 'id'
								this.formData['rolesDinamics'] = this.formDataModal[key].map(role => ({
									value: role.id, // o el valor adecuado
									text: role.rol, // o el valor adecuado
								}));
								// Modificar formData para que 'roles' contenga solo los valores 'id'
								this.formData['roles'] = this.formDataModal[key].map(role => role.id);
							} else {
								// Copiar otros valores directamente
								this.formData[key] = this.formDataModal[key];
							}
						}
					}
				}
			} catch (error) {
				console.error(error);
			}
		}
	},
	watch: {
		idUserModal: {
			immediate: true,
			handler(newValue) {
				if (this.actionModal == 'editUser') {
					this.consultarData(newValue);
				} else {
					this.idUserModal = '';
					this.formData.rolesDinamics = [];
				}
			}
		}
	},
	mounted() {


		console.log("DATOS ESTRUCTURA", this.formData)
	},
};
</script>

<style>
.progress {
	margin-bottom: 5px !important;
	height: 1px;
}

.step-indicators {
	display: flex;
	justify-content: center;
	margin-bottom: 20px;
}

.step-indicator {
	width: 25px;
	height: 25px;
	border-radius: 50%;
	border: 1px solid #ccc;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: lighter;
	background-color: white;
	margin: 0 65px;
}

.step-indicator.active {
	background-color: #007bff;
	color: white;
	border-color: #007bff;
}
</style>
