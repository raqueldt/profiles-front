<template>
	<div>

		<template v-if="loadingActive">

		</template>

		<template v-else>

			<b-card no-body v-if="isEmpty == false" style="padding:0px">

				<div class="row justify-content-between text-center m-2">
					<div class="row col">
						<div class="col m-1">
							<span class="text-muted"><small><strong>VENTAS</strong></small></span><br>
							<h2><strong style="color: #003260;">{{ totalVentas | currency }}</strong></h2>
						</div>

						<div class="col m-1">

							<span class="text-muted"><small><strong>COBRANZA</strong></small>
							</span><br>
							<h2><strong class="text-muted">{{ totalCobranza | currency }}</strong></h2>

						</div>

						<div class="col m-1">
							<span class="text-muted"><small><strong>PENDIENTE</strong></small></span><br>
							<h2><span style="color: maroon"><strong>{{ totalPendiente | currency }}</strong></span></h2>
						</div>

					</div>
					<div class="col-2  mt-1">
						<div id="estadisticoMini" style="width: auto; height: 45px; "> </div>
					</div>
					<div class="col-1 mt-3">

						<button type="button" v-b-toggle.collapse-1 class="btn btn-primary btn-sm" title="View report"
							v-on:click="seen = !seen">
							<span class="text-white">
								<!-- Charts &nbsp; -->

								<span v-if="seen" id="hide">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
										<path
											d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
									</svg>
								</span>
								<span v-else id="hide">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
										<path
											d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
									</svg>
								</span>
							</span>
						</button>


					</div>
				</div>
				<b-progress variant="darkblue" class="mb-0" :title="'COBRANZA: ' + (cobranzaPorcentaje).toFixed(2) + '%'"
					:style="{ height: '10px' }">
					<b-progress-bar :style="{ 'background-color': 'gray', }" :value="cobranzaPorcentaje"></b-progress-bar>
				</b-progress>

				<b-row>
					<b-col cols="12" hidden>
						<b-button v-b-toggle.collapse-1 variant="primary m-1 btn-sm">
							<small>Report</small>
						</b-button>

					</b-col>
					<b-col cols="12">
						<b-collapse id="collapse-1" class="m-0">
							<b-card>
								<div id="estadistico" style="width: 100%; height: 200px; "> </div>
							</b-card>
						</b-collapse></b-col>
				</b-row>


				<div class="d-flex justify-content-center p-1">
					<b-col cols="1" v-for="month in months" :key="month.number" class="p-1">

						{{ sumarValoresFile(month.number, verificarMes()) }}
						{{ sumarValoresCobranza(month.number, verificarMes()) }}
						{{ sumarValoresPendiente(month.number, verificarMes()) }}
						<b-button v-if="valorSuma[1] === month.number"
							variant="btn default font-weight-bold border-2 border p-0 border-light" block
							style="border-style: dotted ; border-color: gray;" @click="mostrarMesSeleccionado(month)">
							<!-- <div v-if="arrayComparativo">
							</div> -->
							<strong>
								<div class="bg font-weight-bold text-secondary"
									v-if="(formatValues(valorFile) === formatValues(valorSuma[0])) && valorSuma[1] === month.number">

									<strong>{{ month.name }}</strong>

									<div class="progress">
										<div class="progress-bar" role="progressbar"
											style="width: 100%; background-color: #347ce4;" aria-valuenow="25"
											aria-valuemin="0" aria-valuemax="100"></div>
									</div>


								</div>
								<div v-else class="bg-light font-weight-bold text-dark">
									{{ month.name }}
								</div>
								<small v-if="valorSuma[1] === month.number" :title="formatValues(valorSuma[0])">
									<span class="bg-light font-weight-bold text-dark p-0"
										v-if="formatValues(valorFile) === formatValues(valorSuma[0])">
										<span v-if="valorSuma[0] == 0" class="text-white">.</span>
										<span v-if="valorSuma[0] != 0"
											style="color:#003260">{{ formatValuesReduce(valorSuma[0]) }}</span>
									</span>
									<span v-else class="font-weight-bold" style="color: #003260;">
										{{ formatValuesReduce(valorSuma[0]) }}
									</span>

								</small>
								<small v-else>
									<span class="font-weight-bold text-white">. </span>
								</small>

							</strong>
							<br>
							<strong>
								<small v-if="valorCobranza[1] === month.number" :title="formatValues(valorCobranza[0])">
									<span class="font-weight-bold text-muted">
										<span v-if="valorCobranza[0] == 0" class="text-white">.</span>
										<span v-if="valorCobranza[0] != 0">{{ formatValuesReduce(valorCobranza[0])
										}}</span>
									</span>
								</small>

								<small v-else>
									<span class="font-weight-bold text-white">.</span>
								</small>

							</strong>
							<br>
							<strong>
								<small v-if="valorPendiente[1] === month.number" :title="formatValues(valorPendiente[0])">
									<span class="font-weight-bold"
										style="color:maroon;">{{ formatValuesReduce(valorPendiente[0]) }}</span>
								</small>
								<small v-else>
									<span class="font-weight-bold text-white">.</span>
								</small>

							</strong>
						</b-button>
						<b-button v-else disabled variant="btn default font-weight-bold border-2 border p-0 border-light"
							block style="border-style: dotted ; border-color: gray;" @click="mostrarMesSeleccionado(month)">
							<!-- <div v-if="arrayComparativo">
							</div> -->
							<strong>
								<div class="bg font-weight-bold text-secondary"
									v-if="(formatValues(valorFile) === formatValues(valorSuma[0])) && valorSuma[1] === month.number">

									<strong>{{ month.name }}</strong>

									<div class="progress">
										<div class="progress-bar" role="progressbar"
											style="width: 100%; background-color: #347ce4;" aria-valuenow="25"
											aria-valuemin="0" aria-valuemax="100"></div>
									</div>


								</div>
								<div v-else class="bg-light font-weight-bold text-dark">
									{{ month.name }}
								</div>
								<small v-if="valorSuma[1] === month.number" :title="formatValues(valorSuma[0])">
									<span class="bg-light font-weight-bold text-dark p-0"
										v-if="formatValues(valorFile) === formatValues(valorSuma[0])">
										<span v-if="valorSuma[0] == 0" class="text-white">.</span>
										<span v-if="valorSuma[0] != 0"
											style="color:#003260">{{ formatValuesReduce(valorSuma[0]) }}</span>
									</span>
									<span v-else class="font-weight-bold" style="color: #003260;">
										{{ formatValuesReduce(valorSuma[0]) }}
									</span>

								</small>
								<small v-else>
									<span class="font-weight-bold text-white">.</span>
								</small>

							</strong>
							<br>
							<strong>
								<small v-if="valorCobranza[1] === month.number" :title="formatValues(valorCobranza[0])">
									<span class="font-weight-bold text-muted">
										<span v-if="valorCobranza[0] == 0" class="text-white">.</span>
										<span v-if="valorCobranza[0] != 0">{{ formatValuesReduce(valorCobranza[0])
										}}</span>
									</span>
								</small>

								<small v-else>
									<span class="font-weight-bold text-white">.</span>
								</small>

							</strong>
							<br>
							<strong>
								<small v-if="valorPendiente[1] === month.number" :title="formatValues(valorPendiente[0])">
									<span class="font-weight-bold"
										style="color:maroon;">{{ formatValuesReduce(valorPendiente[0]) }}</span>
								</small>
								<small v-else>
									<span class="font-weight-bold text-white">.</span>
								</small>

							</strong>
						</b-button>

					</b-col>
				</div>

			</b-card>
		</template>


	</div>
</template>

<script>

import { months } from 'moment'
import moment from "moment"
import Chart from 'chart.js'
import RadialProgressBar from 'vue-radial-progress'

import { mapActions, mapMutations, mapGetters } from 'vuex'
import { Console } from 'console'

export default {


	name: "collectionAdminSummary",

	components: {
		RadialProgressBar,
		Chart
	},

	data() {

		return {
			valorSuma: [],
			valorCobranza: [],
			valorPendiente: [],
			arrayComparativo: [],
			arrayComparativoCobranza: [],
			contador: 0,
			valorFile: 0,
			meses: [],
			seen: true,
			arrayBorder: [],
			arrayColor: [],
			deshabilitar: 0
		}

	},

	computed: {

		...mapGetters('collection-admin', ['getCollectionFiles', 'isEmpty', 'loadingActive']),

		cobranzaPorcentaje() {
			if (!this.totalCobranza) return 0
			return this.totalCobranza / this.totalVentas * 100
		},

		totalCobranza() {
			const sumaTotalCobranza = this.getCollectionFiles.map(file => Number(file.totalCobranza)).reduce((valorAnterior, valorActual) => valorAnterior + valorActual, 0)


			return sumaTotalCobranza
		},

		totalVentas() {
			const sumaTotalFile = this.getCollectionFiles.map(file => Number(file.totalFile)).reduce((valorAnterior, valorActual) => valorAnterior + valorActual, 0)
			return sumaTotalFile
		},

		totalPendiente() {

			const sumaTotalPending = this.getCollectionFiles.map(file => Number(file.totalPending)).reduce((valorAnterior, valorActual) => valorAnterior + valorActual, 0)
			return sumaTotalPending

		},
		months() {

			const months = moment.monthsShort().map(function (month, index) {
				return { 'name': month, 'number': index + 1 }
			})

			return months
		},
	},

	watch: {
		getCollectionFiles() {


			if (this.getCollectionFiles.length < 1000) {
				this.arrayComparativo = [];
				// this.arrayComparativoCobranza = [];
				this.valorFile = 0;
			} else {
				this.bestMonth()
			}
		},
		valorFile() {
			this.grafico(this.arrayComparativo, this.arrayComparativoCobranza)
		},


	},

	methods: {

		...mapMutations('collection-admin', ['setSelectedMonth']),


		updatemoreFilter() {
			this.mostrarIcono = !this.mostrarIcono;
		},
		mostrarMesSeleccionado(mesSeleccionado) {

			this.grafico(this.arrayComparativo, this.arrayComparativoCobranza)
			this.setSelectedMonth(mesSeleccionado.number);
		},

		verificarMes() {

			const mes = this.getCollectionFiles.map(f => f)
			mes.forEach((lista) => {
				let fecha = new Date(lista.start_date_file)
				lista.monthReport = fecha.getMonth() + 1
			})

			return mes
		},
		sumarValoresFile(mesRecibido, collection) {
			const sumaTotalFile = collection.filter(file => {
				const monthFile = moment(file.start_date_file).month() + 1
				return monthFile == mesRecibido

			}).map(file => Number(file.totalFile)).reduce((valorAnterior, valorActual) => valorAnterior + valorActual, 0)

			const sumaTotalCobranza = collection.filter(file => {
				const monthFile = moment(file.start_date_file).month() + 1
				return monthFile == mesRecibido

			}).map(file => Number(file.totalCobranza)).reduce((valorAnterior, valorActual) => valorAnterior + valorActual, 0)

			const mes = collection.map(f => f.monthReport)
			mes.forEach((lista) => {
				if (lista === mesRecibido) {
					this.valorSuma[0] = sumaTotalFile
					this.valorSuma[0] = this.valorSuma[0].toFixed(2)
					this.valorSuma[1] = mesRecibido
					this.valorCobranza[0] = sumaTotalCobranza
					this.valorCobranza[0] = this.valorCobranza[0].toFixed(2)
					this.valorCobranza[1] = mesRecibido
					for (let i = 1; i < 13; i++) {
						if (this.valorSuma[1] === i) {
							this.arrayComparativo[0] = 1
							this.arrayComparativo[i] = parseFloat(this.valorSuma[0])
						}
						if (this.arrayComparativo[i] == undefined) {
							this.arrayComparativo[i] = 0
						}
					}
					for (let i = 1; i < 13; i++) {
						if (this.valorCobranza[1] === i) {
							this.arrayComparativoCobranza[0] = 1
							this.arrayComparativoCobranza[i] = parseFloat(this.valorCobranza[0])
						}
						if (this.arrayComparativo[i] == undefined) {
							this.arrayComparativoCobranza[i] = 0
						}
					}
				}
			})

			if (this.arrayComparativo.length < 14) {
				this.valorFile = Math.max(...this.arrayComparativo)
			}
		},
		sumarValoresCobranza(mesRecibido, collection) {
			const sumatotalCobranza = collection.filter(file => {
				const monthFile = moment(file.start_date_file).month() + 1
				return monthFile == mesRecibido

			}).map(file => Number(file.totalCobranza)).reduce((valorAnterior, valorActual) => valorAnterior + valorActual, 0)
			const mes = collection.map(f => f.monthReport)
			mes.forEach((lista) => {
				if (lista === mesRecibido) {
					this.valorCobranza[0] = sumatotalCobranza
					this.valorCobranza[0] = this.valorCobranza[0].toFixed(2)
					this.valorCobranza[1] = mesRecibido
				}
			})
		},
		sumarValoresPendiente(mesRecibido, collection) {
			const sumaTotalPending = collection.filter(file => {
				const monthFile = moment(file.start_date_file).month() + 1
				return monthFile == mesRecibido

			}).map(file => Number(file.totalPending)).reduce((valorAnterior, valorActual) => valorAnterior + valorActual, 0)
			const mes = collection.map(f => f.monthReport)
			mes.forEach((lista) => {
				if (lista === mesRecibido) {
					this.valorPendiente[0] = sumaTotalPending
					this.valorPendiente[0] = this.valorPendiente[0].toFixed(2)
					this.valorPendiente[1] = mesRecibido
				}
			})
		},
		formatValues(value) {
			var formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 2
			});

			return formatter.format(value);
		},
		formatValuesReduce(value) {
			var formatter = new Intl.NumberFormat('en-GB', {
				notation: "compact",
				compactDisplay: "short",
			});
			return formatter.format(value);
		},


		bestMonth(valor1, valor2) {
			if (valor1 === valor2 && valor1) {
				return 'bg-success text-light'
			} else {
				return 'bg-light text-dark'
			}
		},
		grafico(datos, cobro) {
			if (datos.length === 13) {
				datos = datos.filter(file => file !== 1)
				cobro = cobro.filter(file => file !== 1)
			}

			if (document.getElementById("canvasReport") == null) {
			} else {
				document.getElementById("canvasReport").remove()
			}
			if (document.getElementById("canvasReportMini") == null) {
			} else {
				document.getElementById("canvasReportMini").remove()
			}

			let reporte = document.createElement('canvas');
			reporte.setAttribute("id", "canvasReport");
			document.getElementById('estadistico').append(reporte);
			new Chart(
				document.getElementById('canvasReport'), {
				type: 'bar',
				data: {
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dic"],
					datasets: [{
						data: datos,
						label: 'Ventas',
						fill: false,
						borderColor: this.borderColorMini(datos),
						backgroundColor: this.colorMini(datos),
						borderWidth: 0
					},
					{
						type: 'line',
						label: 'Cobranza',
						data: cobro
					}]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						display: false
					},
					title: {
						display: false
					},
					plugins: {
						datalabels: {
							display: true,
						}
					},
					scales: {
						yAxes: [{
							ticks: {
								fontSize: 10
							}
						}],
						xAxes: [{
							ticks: {
								fontSize: 10
							}
						}],

					}
				}
			});
			let reportemini = document.createElement('canvas');
			reportemini.setAttribute("id", "canvasReportMini");
			document.getElementById('estadisticoMini').append(reportemini);
			new Chart(
				document.getElementById('canvasReportMini'), {
				type: 'line',
				data: {
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dic"],
					datasets: [{
						data: datos,
						label: 'Ventas',
						fill: false,
						borderColor: this.borderColorMini(datos),
						backgroundColor: this.colorMini(datos),
						borderWidth: 0
					},
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						display: false
					},
					title: {
						display: false
					},
					plugins: {
						datalabels: {
							display: true,
						}
					},
					scales: {
						yAxes: [{
							ticks: {
								fontSize: 0
							},
							gridLines: {
								color: "white"
							}
						}],
						xAxes: [{
							ticks: {
								fontSize: 0
							},
							gridLines: {
								color: "white"
							}
						}],

					}
				}
			});

		},
		borderColorMini(datos) {
			let self = this;
			datos.forEach(function (element, index) {
				if (element == 0) {
					self.arrayBorder[index] = 'transparent'
					if (element !== 0) {
						self.arrayBorder[index] = 'white'
					}
					if (element === self.valorFile) {
						self.arrayBorder[index] = '#003260'
					}
				}
			})

			return self.arrayBorder
		},
		colorMini(datos) {
			let self = this;
			datos.forEach(function (element, index) {
				if (element == 0)
					self.arrayColor[index] = 'whitesmoke'

				if (element !== 0)
					self.arrayColor[index] = '#003260'

				if (element === self.valorFile)
					self.arrayColor[index] = '#347ce4'

			})
			return self.arrayColor
		},


	},

	mounted() {
		this.verificarMes(this.getCollectionFiles);
		if (this.arrayComparativo.length === 0) {
			this.arrayComparativo = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			this.grafico(this.arrayComparativo, this.arrayComparativoCobranza)
		} else {
			this.grafico(this.arrayComparativo, this.arrayComparativoCobranza)
		}


	}

}
</script>

<style lang="scss" scoped></style>