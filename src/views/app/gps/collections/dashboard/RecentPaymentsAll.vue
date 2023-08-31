<template>
	<div>
		<collection-header tag="gps.collections.recent-payments-recorded"></collection-header>
		<b-card>
			<div class="row justify-content-between m-0" v-if="items">
				<div class="col-5">
					<h3 class="card-title">Cobros recientes
						| <small class="text-muted">Results: {{ items.length }}</small>
					</h3>
				</div>
				<div class="col-3">
					<date-picker v-model="chosenYear" placeholder="Select period" :clearable="false" format="DD MMM YYYY"
						:editable="false" range :partialRange="true" class="mb-3" style="width: 100%; " />
				</div>
				<div class="col-2">
					<div class="row">
						<input type="search" class="form-control rounded" placeholder="Search all" aria-label="Search"
							v-model="buscador" />
						<button type="button" class="btn btn-primary" v-if="habilitarX" @click="buscador = ''">X</button>
					</div>
				</div>
				<div class="col-1">
					<div class="row justify-content-end">
						<button class="btn btn-header-primary icon-button ml-4 pointer" @click="reload()"
							title="Clean filters"><i class="simple-icon-refresh"></i></button>
					</div>
				</div>
				<b-table :fields="fields" :items="filtered">
					<template v-slot:head(datosAbono.monto)="payment">
						<div class=" row justify-content-end mr-2">{{ payment.label }}</div>
					</template>
					<template v-slot:head(datosAbono.saldoActual)="payment">
						<div class=" row justify-content-end mr-2">{{ payment.label }}</div>
					</template>

					<template #cell(cofCodigo)="payment">
						<div style="cursor: pointer; ">
							<span class="badge bg-success" @click="redFileManager(payment.item.cofCodigo)">
								<span class="text-white" style="font-size: 1.1em;">{{ payment.item.cofCodigo }}</span>
							</span>
						</div>
					</template>
					<template #cell(datosAbono.monto)="payment">
						<div class=" row justify-content-end">
							{{ payment.item.datosAbono.monto }}
						</div>
					</template>
					<template #cell(datosAbono.saldoActual)="payment">
						<div class=" row justify-content-end">
							{{ payment.item.datosAbono.saldoActual }}
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
				{ key: 'cofCodigo', label: 'Código', sortable: true, },
				{ key: 'ccoFecha', label: 'Fecha Registro', sortable: true },
				{ key: 'user', label: 'Registrado por', sortable: true },
				{ key: 'datosAbono.monto', label: 'Abono', sortable: true },
				{ key: 'datosAbono.saldoActual', label: 'Saldo', sortable: true },

			],
			chosenYear: null,
			dateRange: {
				startDate: new Date(),
				endDate: new Date()
			},
			filters: {
				cofCodigo: '',
				cofReferencia: '',
				user: '',
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
		},
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
			this.getLatestPayments()
		},

		buscador() {
			let self = this
			var resultadoBusqueda = this.filtered.filter(item => ((item.cofCodigo.toLowerCase().includes(self.buscador.toLowerCase())) || (item.updated_at.toLowerCase().includes(self.buscador.toLowerCase())) || (item.user.toLowerCase().includes(self.buscador.toLowerCase())) || (item.datosAbono.monto.toLowerCase().includes(self.buscador.toLowerCase())) || (item.datosAbono.saldoActual.toLowerCase().includes(self.buscador.toLowerCase()))))
			this.filtered = resultadoBusqueda
			this.items = resultadoBusqueda

			if (this.buscador == '') {
				this.getLatestPayments()
			}
		}
	},

	methods: {

		reload() {
			this.chosenYear = null;
			this.buscador = '';
			this.getLatestPayments()
		},

		async getLatestPayments() {
			const params = {
				start: moment(this.dateRange.startDate).format('YYYY-MM-DD'),
				end: moment(this.dateRange.endDate).format('YYYY-MM-DD')
			}

			this.isBusy = true
			var flag = 'all'
			const { data } = await CobranzasServices.getLatestPayments(flag)
			this.items = data
			this.isBusy = false
			const validar = this.items.filter((item) => (item.updated_at = moment(item.updated_at).format('YYYY-MM-DD'), item.datosAbono.saldoActual = (item.datosAbono.saldoActual).toFixed(2), item.datosAbono.saldoActual = (item.datosAbono.saldoActual).toString())),
				validarFiltrado = validar.filter((item) => (item.updated_at >= params.start) && (item.updated_at <= params.end))

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
		this.getLatestPayments()
	}
};
</script>
