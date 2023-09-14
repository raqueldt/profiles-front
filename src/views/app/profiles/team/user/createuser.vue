<template>
	<div>
		<b-progress :value="progress" animated></b-progress>
		<b-row class="justify-content-center">
			<b-col v-for="(step, index) in stepTitles" :key="index" class="text-center">
				<div :class="['step-indicator', { active: index === currentStep - 1 }]">
					<i v-if="index < currentStep - 1" class="text-primary fas fa-check"></i>
					<i v-else :class="' fa fa-' + getStepIcon(index + 1)"></i>
				</div>
				<p :class="['step-title', { 'text-primary': index === currentStep - 1 }]">{{ getStepTitle(index + 1) }}</p>
			</b-col>
		</b-row>

		<hr>
		<b-row class="justify-content-center">
			<b-col>
				<component :is="stepComponents[currentStep - 1]" :formData="formData" :title="getStepTitle(currentStep)"
					@prev="prevStep" @next="nextStep" @submit="submitForm" />
			</b-col>
		</b-row>
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
			formData: {
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
				cargo_id: '',
				tipo_contrato: '',
				sueldo: '',
				banda_salarial: '',
				acumula_decimos: '',
				operador_id: '',
				funciones: '',
				tipo_discapacidad: '',
				trabajador_sustituto: '',
				forma_pago: '',
				roles: []
			},
			currentStep: 1,
			totalSteps: 6,
			stepComponents: [Step1, Step2, Step3, Step4, Step5, Step6],
			stepTitles: [
				"Información Personal",
				"Personal",
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


				})
				.catch(error => {
					console.log(error);
				}).finally(() => this.clear());
		},
		getStepTitle(stepIndex) {
			return this.stepTitles[stepIndex - 1];
		},
		getStepIcon(stepIndex) {
			return 'fa fa-' + this.stepIcons[stepIndex - 1];
		}
	},
	mounted() {
		InternoServices.getAll()
			.then(response => {
				console.log("traer", response.data)
				// this.displayMessage();
			})
			.catch(error => {
				console.log(error);
			}).finally(() => this.clear());
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
	width: 30px;
	height: 30px;
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
