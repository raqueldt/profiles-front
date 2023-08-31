<template>
	<div>
		<collection-header tag="gps.collections.urgent-payments"></collection-header>
		<b-card>

			<div class="row justify-content-between m-0" v-if="items">
				<div class="col-5">
					<h3 class="card-title">Pagos urgentes
						| <small class="text-muted">Results: {{ items.length }}</small>
					</h3>
				</div>
				<div class="col-3">
					<date-picker v-model="chosenYear" placeholder="Select period (Fecha inicio)" :clearable="false"
						format="DD MMM YYYY" :editable="false" range :partialRange="true" class="mb-3"
						style="width: 100%; " />
				</div>
				<div class="col-2">
					<div class="row">
						<input type="search" class="form-control rounded" placeholder="Search all" aria-label="Search"
							v-model="buscador" />
						<button type="button" class="btn btn-light" v-if="habilitarX" @click="buscador = ''">X</button>
					</div>
				</div>
				<div class="col-1">
					<div class="row justify-content-end">

						<button class="btn btn-header-primary icon-button ml-4 pointer" @click="reload()"
							title="Clean filters"><i class="simple-icon-refresh"></i></button>
					</div>
				</div>

				<b-table :fields="fields" :items="filtered" :per-page="perPage" :current-page="currentPage">

					<template v-slot:head(saldoConfirmacion)="payment">
						<div class=" row justify-content-end mr-2">{{ payment.label }}</div>
					</template>
					<template v-slot:head(totalConfirmacion)="payment">
						<div class=" row justify-content-end mr-2">{{ payment.label }}</div>
					</template>

					<template #cell(cofCodigo)="payment">
						<div style="cursor: pointer; ">
							<span class="badge bg-success" @click="redFileManager(payment.item.cofCodigo)">
								<span class="text-white" style="font-size: 1.1em;">{{ payment.item.cofCodigo }}</span>
							</span>
						</div>
					</template>
					<template #cell(daysToBegin)="payment">
						<div v-if="payment.item.daysToBegin === '0 days'"  class="row justify-content-center">
							<span class="badge bg-danger">
								<span class="text-white" style="font-size: 1.1em;">{{ payment.item.daysToBegin }}</span>
							</span>
						</div>
						<div v-else class="row justify-content-center">
							<span class="badge bg-light">
								<span class="text-dark" style="font-size: 1.1em;">{{ payment.item.daysToBegin }}</span>
							</span>
						</div>
					</template>
					<template #cell(saldoConfirmacion)="payment">
						<div class=" row justify-content-end">
							{{ payment.item.saldoConfirmacion }}
						</div>
					</template>
					<template #cell(totalConfirmacion)="payment">
						<div class=" row justify-content-end">
							{{ payment.item.totalConfirmacion }}
						</div>
					</template>

				</b-table>
			</div>
			<b-card-body class="text-center" v-if="items.length === 0">
				<b-img src="/assets/img/atc/empty-state/no_result_found.png" fluid alt="No result found" width="400" />
				<b-card-title>
					<h1><strong>No results found</strong></h1>
				</b-card-title>

				<b-card-text>
					Try adjusting you search options to find what you're looking for
				</b-card-text>
			</b-card-body>
			<div v-if="items.length">
				<b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"
					size="sm" align="center"></b-pagination>
			</div>

		</b-card>
	</div>
</template>
<script>


import RecentPayments from '@/views/app/gps/collections/dashboard/RecentPayments.vue'
import DuePayments from '@/views/app/gps/collections/dashboard/DuePayments.vue'
import OverduePayments from '@/views/app/gps/collections/dashboard/OverduePayments.vue'
import UrgentPayments from '@/views/app/gps/collections/dashboard/UrgentPayments.vue'
import UrgentPaymentItem from "@/views/app/gps/collections/dashboard/UrgentPaymentItem.vue"
import CobranzasServices from "@/services/gps/cobranzas/CobranzasServices"
import moment from "moment"
import "vue-select/dist/vue-select.css";
import DateRangePicker from 'vue2-daterange-picker'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
	props: ['payment'],
	name: "UrgentPaymentAll",
	components: {
		RecentPayments,
		DuePayments,
		OverduePayments,
		UrgentPayments,
		UrgentPaymentItem,
		DatePicker,
		DateRangePicker
	},
	data() {
		return {
			isBusy: false,
			items: [],
			fields: [
				{ key: 'cofCodigo', label: 'Codigo', sortable: true },
				{ key: 'cofInicio', label: 'Fecha Inicio', sortable: true },
				{ key: 'cofFinal', label: 'Fecha Final', sortable: true },
				{ key: 'lastMinute', label: 'Last Minute', sortable: true },
				{ key: 'daysToBegin', label: 'Días para operar', sortable: true },
				{ key: 'saldoConfirmacion', label: 'Saldo confirmación', sortable: true },
				{ key: 'totalConfirmacion', label: 'Total Confirmación', sortable: true },
			],
			chosenYear: null,
			dateRange: {
				startDate: new Date(),
				endDate: new Date()
			},

			buscador: '',
			perPage: 15,
			currentPage: 1,
		};
	},
	watch: {
		chosenYear(newYear) {
			if (newYear.length) {
				this.dateRange.startDate = moment(newYear[0]).format("YYYY-MM-DD");
				this.dateRange.endDate = moment(newYear[1]).format("YYYY-MM-DD");

			} else {
				this.dateRange.startDate = moment(newYear[0]).startOf("year");
				this.dateRange.endDate = moment(newYear[1]).endOf("year");
			}
			this.getUrgentPayments()
		},

		buscador() {
			let self = this
			var resultadoBusqueda = this.filtered.filter(item => ((item.cofCodigo.toLowerCase().includes(self.buscador.toLowerCase())) || (item.cofInicio.toLowerCase().includes(self.buscador.toLowerCase())) || (item.cofFinal.toLowerCase().includes(self.buscador.toLowerCase())) || (item.saldoConfirmacion.toLowerCase().includes(self.buscador.toLowerCase())) || (item.totalConfirmacion.toLowerCase().includes(self.buscador.toLowerCase())) || (item.daysToBegin.toLowerCase().includes(self.buscador.toLowerCase())) || (item.lastMinute.toLowerCase().includes(self.buscador.toLowerCase()))))
			this.filtered = resultadoBusqueda
			this.items = resultadoBusqueda

			if (this.buscador == '') {
				this.getUrgentPayments()
			}
		}
	},
	computed: {
		filtered() {
			const filtered = this.items;
			return filtered.length > 0 ? filtered : []
		},
		rows() {
			return this.filtered.length
		},
	},
	methods: {

		reload() {
			this.chosenYear = null;
			this.buscador = '';
			this.getUrgentPayments()
		},
		async getUrgentPayments() {

			const params = {
				start: moment(this.dateRange.startDate).format('YYYY-MM-DD'),
				end: moment(this.dateRange.endDate).format('YYYY-MM-DD')
			}
			this.isBusy = true
			var flag = 'all'
			const { data } = await CobranzasServices.getUrgentPayments(flag)
			this.items = data
			this.isBusy = false
			console.log("ssssssss", this.items)
			const validar = this.items.filter((item) => (item.cofInicio = moment(item.cofInicio).format('YYYY-MM-DD'), item.cofInicio = moment(item.cofFinal).format('YYYY-MM-DD'), item.saldoConfirmacion = (item.saldoConfirmacion).toFixed(2), item.saldoConfirmacion = (item.saldoConfirmacion).toString(), item.totalConfirmacion = (item.totalConfirmacion).toFixed(2), item.totalConfirmacion = (item.totalConfirmacion).toString(), item.daysToBegin = (item.daysToBegin).toString() + ' days')),
				validarFiltrado = validar.filter((item) => (item.cofInicio >= params.start) && (item.cofInicio <= params.end))

			if (this.chosenYear)
				this.items = validarFiltrado
		},
		redFileManager(codeFile) {
			this.$router.push({ path: '/collection-search-file', query: { q: codeFile } })
		},

		formatValues(value) {
			var formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 2
			});

			return formatter.format(value);
		},

	}
	,

	created() {

		this.getUrgentPayments()

	}


};
</script>

<style scoped></style>
