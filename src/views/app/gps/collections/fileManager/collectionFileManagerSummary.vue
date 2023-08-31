<template>
	<div>

		<b-card header-class="mt-0">


			<template #header>
				<div class="d-flex align-items-center">
					<div>
						<h6 class="mt-2"><strong>Cobranza realizada</strong></h6>
					</div>
					<div class="ml-auto">

						<radial-progress-bar :diameter="50" :strokeWidth="4" :completed-steps="paymentProgress"
							:innerStrokeWidth="3" :total-steps=100>
							{{ paymentProgressPercent | percent }}
						</radial-progress-bar>

					</div>

				</div>

			</template>


			<div v-if="summary">

				<b-list-group>
					<b-list-group-item
						class="d-flex justify-content-between align-items-center border-right-0 border-left-0">

						<!-- Total de la confirmaciòn -->
						<b-row>
							<b-col>
								<span>
									<small>Total</small> <br>
									<h6><strong>{{ summary.totalConfirmacion | currency }}</strong></h6>
								</span>
							</b-col>
						</b-row>

						<!-- Saldo pendiente de cobro -->
						<b-row>
							<b-col>
								<span>
									<small>Saldo</small> <br>
									<h6><strong>{{ summary.saldo | currency }}</strong></h6>
								</span>
							</b-col>
						</b-row>

					</b-list-group-item>

					<b-list-group-item
						class="d-flex justify-content-between align-items-center py-1 border-right-0 border-left-0">
						Total cobrado
						<span class="text-success">{{ summary.totalCobros | currency }}</span>
					</b-list-group-item>
					<b-list-group-item
						class="d-flex justify-content-between align-items-center py-1 border-right-0 border-left-0">
						Gastos bancarios
						<span class="text-danger">{{ summary.totalGastos | currency }}</span>
					</b-list-group-item>
					<b-list-group-item
						class="d-flex justify-content-between align-items-center py-1 border-right-0 border-left-0">
						NC aplicadas
						<span class="text-info">{{ summary.totalNotasCreditoAplicadas | currency }} </span>
					</b-list-group-item>
				</b-list-group>

				<b-list-group class="mt-5">
					<b-list-group-item
						class="d-flex justify-content-between align-items-center py-1 border-right-0 border-left-0">
						Notas de Crédito
						<span>{{ summary.totalNotasCredito | currency }} </span>
					</b-list-group-item>
					<b-list-group-item
						class="d-flex justify-content-between align-items-center py-1 border-right-0 border-left-0">
						Compensaciones
						<span>
							{{ summary.totalCompensaciones | currency }}
						</span>
					</b-list-group-item>
				</b-list-group>

			</div>



			<template v-if="planPagos && planPagos.length">

				<div class="mt-4 ml-3 mb-1">
					<span><strong>Plazos de vencimiento</strong></span>
				</div>

				<b-list-group>

					<b-list-group-item class="py-0 px-3 border-0">
						<div class="d-flex justify-content-between">
							<small><strong>#</strong></small>
							<small><strong>Fecha</strong></small>
							<small><strong>Monto</strong></small>
						</div>
					</b-list-group-item>

					<b-list-group-item v-for="item in planPagos" :key="item.cppId" class="py-0 px-3 border-0">

						<b-row>
							<b-col cols="3">
								<span><small>{{ item.indice }}</small></span>
							</b-col>
							<b-col cols="5">
								<span><small>{{ item.cppFecha }}</small></span>
							</b-col>
							<b-col class="text-right">
								<span><small>{{ item.cppMonto | currency }}</small></span>
							</b-col>
						</b-row>




					</b-list-group-item>

				</b-list-group>



			</template>

			<template v-else>

				<b-alert class="mb-0 mt-3" show variant="warning">
					<div class="text-center">
						<strong>Plazos de vencimiento</strong><br>
						<small>
							Este file no tiene términos de crédito ni plazos de vencimiento.
						</small>
					</div>
				</b-alert>

			</template>





		</b-card>
	</div>
</template>

<script>

import RadialProgressBar from 'vue-radial-progress'

import { mapActions, mapGetters } from 'vuex'

export default {

	name: "CollectionFileManagerSummary",

	components: {
		RadialProgressBar
	},

	data() {

		return {

			fields: [
				{ key: "indice", label: "#" },
				{ key: "cppFecha", label: "Date" },
				{ key: "cppMonto", label: "Amount", tdClass: 'text-right' },
			],

		}

	},

	computed: {

		...mapGetters('fileManager', ['getFileSummary', 'getSelectedFile']),

		fileIdCurrent() {

			const { f } = this.$route.query
			return parseInt(f)

		},

		summary() {
			return this.getFileSummary.summary
		},

		planPagos() {
			return this.getFileSummary.planPagos
		},

		paymentProgress() {

			if (!this.summary) return 0

			const totalPayments = this.summary.totalConfirmacion - this.summary.saldo
			const totalConfirmacion = this.summary.totalConfirmacion
			const progress = totalPayments * 100 / totalConfirmacion

			return progress
		},

		paymentProgressPercent() {

			if (!this.summary) return 0

			const totalPayments = this.summary.totalConfirmacion - this.summary.saldo
			const totalConfirmacion = this.summary.totalConfirmacion
			const progress = totalPayments / totalConfirmacion
			return progress
		}

	},

	watch: {

		getSelectedFile(newFile, oldFile) {
			//console.log("SUMMARY CHANGE FILE STORE", newFile, oldFile)
			this.loadFileSummary(this.fileIdCurrent)
		},

		fileIdCurrent(newFile, oldFile) {
			//console.log("SUMMARY CHANGE FILE URL", newFile, oldFile)
			this.loadFileSummary(this.fileIdCurrent)
		}

	},

	methods: {

		...mapActions('fileManager', ['loadFileSummary']),
	},

	mounted() {
		//console.log("MOUNTED SUMMARY",this.fileIdCurrent )
	},

	async created() {
		//console.log("CREATED SUMMARY",this.fileIdCurrent )
		this.loadFileSummary(this.fileIdCurrent)

	}

};
</script>

<style lang="scss" scoped></style>
