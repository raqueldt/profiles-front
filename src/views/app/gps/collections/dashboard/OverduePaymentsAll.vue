<template>
	<div>
		<collection-header tag="gps.collections.overdue-payments"></collection-header>
		<b-card>
			<div class="row justify-content-between m-0" v-if="items">
				<div class="col-5">
					<h3 class="card-title">Pagos vencidos
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
				<b-table :fields="fields" :items="filtered">
					<template v-slot:head(cppMonto)="payment">
						<div class=" row justify-content-end mr-2">{{ payment.label }}</div>
					</template>
					<template v-slot:head(daysToBegin)="payment">
						<div class=" row justify-content-center">{{ payment.label }}</div>
					</template>
					<template v-slot:head(daysOverdue)="payment">
						<div class=" row justify-content-center">{{ payment.label }}</div>
					</template>
					<template v-slot:head(paymentType)="payment">
						<div class=" row justify-content-center">{{ payment.label }}</div>
					</template>

					<template #cell(cofCodigo)="payment">
						<div style="cursor: pointer; ">
							<span class="badge bg-success" @click="redFileManager(payment.item.cofCodigo)">
								<span class="text-white" style="font-size: 1.1em;">{{ payment.item.cofCodigo }}</span>
							</span>
						</div>
					</template>
					<template #cell(daysToBegin)="payment">
						<div class=" row justify-content-center">
							{{ payment.item.daysOverdue }}
						</div>
					</template>
					<template #cell(daysOverdue)="payment">
						<div class=" row justify-content-center">
							{{ payment.item.daysOverdue }}
						</div>
					</template>
					<template #cell(cppMonto)="payment">
						<div class=" row justify-content-end">
							{{ payment.item.cppMonto }}
						</div>
					</template>
					<template #cell(paymentType)="payment">
						<div v-if="payment.item.paymentType === 'Final payment'" class=" row justify-content-center">
							<div class="row justify-content-center">
								<div class="col-3">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green"
										class="bi bi-check-circle" viewBox="0 0 16 16">
										<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
										<path
											d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
									</svg>
								</div>
								<!-- <div class="col"><small>{{ payment.item.paymentType }}</small></div> -->
								<div class="col">{{ payment.item.paymentType }}</div>
							</div>

						</div>
						<div v-else class=" row justify-content-center">

							<div class="row justify-content-center">
								<div class="col-3">
									<!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ed7117"
										class="bi bi-check-circle" viewBox="0 0 16 16">
										<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
										<path
											d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
									</svg> -->
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ed7117"
										class="bi bi-currency-dollar" viewBox="0 0 16 16">
										<path
											d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
									</svg>
								</div>
								<!-- <div class="col"><small>{{ payment.item.paymentType }}</small></div> -->
								<div class="col">{{ payment.item.paymentType }}</div>
							</div>



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
	name: "RecentPaymentsAll",
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
				{ key: 'daysToBegin', label: 'Days to Begin', sortable: true },
				{ key: 'daysOverdue', label: 'Days Overdue', sortable: true },
				{ key: 'cppMonto', label: 'Monto', sortable: true },
				{ key: 'paymentType', label: 'Payment Type', sortable: true },
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

	computed: {
		filtered() {
			const filtered = this.items;
			return filtered.length > 0 ? filtered : []
		},
		rows() {
			return this.filtered.length
		}
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
			this.getOverduePayments()
		},

		buscador() {
			let self = this
			var resultadoBusqueda = this.filtered.filter(item => ((item.cofCodigo.toLowerCase().includes(self.buscador.toLowerCase())) || (item.daysOverdue.toLowerCase().includes(self.buscador.toLowerCase())) || (item.cppMonto.toLowerCase().includes(self.buscador.toLowerCase())) || (item.daysOverdue.toLowerCase().includes(self.buscador.toLowerCase())) || (item.cofInicio.toLowerCase().includes(self.buscador.toLowerCase())) || (item.cofFinal.toLowerCase().includes(self.buscador.toLowerCase())) || (item.paymentType.toLowerCase().includes(self.buscador.toLowerCase())) || (item.daysToBegin.toLowerCase().includes(self.buscador.toLowerCase()))))
			this.filtered = resultadoBusqueda
			this.items = resultadoBusqueda

			if (this.buscador == '') {
				this.getOverduePayments()
			}
		}
	},

	methods: {
		reload() {
			this.chosenYear = null;
			this.buscador = '';
			this.getOverduePayments()
		},

		async getOverduePayments() {
			const params = {
				start: moment(this.dateRange.startDate).format('YYYY-MM-DD'),
				end: moment(this.dateRange.endDate).format('YYYY-MM-DD')
			}

			this.isBusy = true
			var flag = 'all'
			const { data } = await CobranzasServices.getOverduePayments(flag)
			this.items = data
			this.isBusy = false

			const validar = this.items.filter((item) => (item.cofInicio = moment(item.cofInicio).format('YYYY-MM-DD'), item.daysOverdue = (item.daysOverdue).toString())),
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
	},

	created() {
		this.getOverduePayments()
	}
};
</script>

<style scoped></style>
