<template>
	<div>
		<!-- <b-progress :value="progress" animated></b-progress> -->
		<!-- <b-row class="justify-content-center">
			<b-col v-for="(step, index) in stepTitles" :key="index" class="text-center">
				<div :class="['step-indicator', { active: index === currentStep - 1 }]">
					<i v-if="index < currentStep - 1" class="text-primary fas fa-check"></i>
					<i v-else :class="' fa fa-' + getStepIcon(index + 1)"></i>
				</div>
				<p :class="['step-title', { 'text-primary': index === currentStep - 1 }]">{{ getStepTitle(index + 1) }}</p>
			</b-col>
		</b-row> -->
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
import EmpresaServices from "../../../../../services/profiles/empresa/EmpresaServices";
import Step1 from './createCompanyStep1.vue';
import Step6 from './createCompanyStep6.vue';

export default {
	components: {
		Step1,
		Step6,
	},
	data() {
		return {
			formData: {
				name: '',
				email: '',
				username: '',
				password: '',
				roles: []
			},
			currentStep: 1,
			totalSteps: 6,
			stepComponents: [Step1, Step6],
			stepTitles: [
				"General",

				"Aditional",
			],
			stepIcons: [
				"id-card",   // You can replace these with actual icon names

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
			console.log("DATOS NUEVO empresa", this.formData);
			EmpresaServices.createCompany(this.formData)
				.then(response => {
					console.log("empresa creado", response)
					this.$emit('empresa-creada'); // Emitir el evento
				})
				.catch(error => {
					console.log(error);
				});
		},
		getStepTitle(stepIndex) {
			return this.stepTitles[stepIndex - 1];
		},
		getStepIcon(stepIndex) {
			return 'fa fa-' + this.stepIcons[stepIndex - 1];
		}
	},
	mounted() {

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
