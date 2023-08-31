<template>
	<b-card title="Montly Progress" class="mt-1 shadow p-0">
		<b-container fluid class="row justify-content-center mt-0">
			<div v-if="isLoading" class="d-flex justify-content-center mb-3">
				<b-spinner style="width: 3rem; height: 3rem;" label="Loading..." variant="primary"></b-spinner>
			</div>
			<div class="col-lg-12">
				<div class="row justify-content-start">
					<router-link :to="{ path: 'targetProgressDetails' }">
						<b-button variant="orange">
							<span class="text-success">
								Details
								<i class="glyph-icon simple-icon-arrow-right-circle m-1"></i>
							</span>
						</b-button>
					</router-link>
					<span v-if="cruise" class="h5 text-muted m-2"> {{ cruise }}</span>
				</div>
				<div id="estadistico" style="width: 100%; height: 370px;"></div>
			</div>
		</b-container>
	</b-card>
</template>

<script>
import Chart from 'chart.js'
import TargetsDetail from './TargetsMonthlyProgressDetails.vue'
export default {
	props: ["data"],
	components: {
		Chart,
		TargetsDetail
	},

	data() {
		return {
			months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
			totalArrayByMonth: [],
			totalTgtValue: '',
			totalSales: '',
			totalVentas: 0,
			totalVariance: '',
			totalPercentSales: '',
			filteredByMonth: [],
			arrayVariance: [],
			arrayTarget: [],
			arraySales: [],
			elemento: 0,
			colorSalesDef: '#d6a779',
			colorTargetDef: 'rgba(231, 82, 62, 0.1)',
			colorTarget: [
				this.colorTargetDef,
				this.colorTargetDef,
				this.colorTargetDef,
				this.colorTargetDef,
				this.colorTargetDef,
				this.colorTargetDef,
				this.colorTargetDef,
				this.colorTargetDef,
				this.colorTargetDef,
				this.colorTargetDef,
				this.colorTargetDef,
				this.colorTargetDef
			],
			colorSales: [
				this.colorSalesDef,
				this.colorSalesDef,
				this.colorSalesDef,
				this.colorSalesDef,
				this.colorSalesDef,
				this.colorSalesDef,
				this.colorSalesDef,
				this.colorSalesDef,
				this.colorSalesDef,
				this.colorSalesDef,
				this.colorSalesDef,
				this.colorSalesDef
			],
			cruise: '',
			isLoading: true
		}
	},
	watch: {
		data: function () {
			document.getElementById("canvasReport").remove();
			this.getMonthlyProgress(this.data);
		}
	},
	methods: {
		getMonthlyProgress(datos) {
			this.defaultValues();
			var self = this;

			this.months.forEach(month => {
				self.filteredByMonth = datos.filter(f => f.tgtMonth == month);
				self.filteredByMonth.forEach(function (e, i, array) {
					self.totalTgtValue = array.reduce((total, item) => {

						return parseFloat(total) + parseFloat(item.tgtValue)
					}, 0).toFixed(2)
					self.totalSales = array.reduce((total, item) => {
						return parseFloat(total) + parseFloat(item.totalSales)
					}, 0).toFixed(2)
					self.totalVariance = array.reduce((total, item) => {
						return parseFloat(total) + parseFloat(item.variance)
					}, 0).toFixed(2)
					self.totalPercentSales = ((self.totalSales * 100) / self.totalTgtValue).toFixed(2);
				});

				self.totalArrayByMonth.push({
					tgtMonth: month,
					tgtValue: self.totalTgtValue,
					totalSales: self.totalSales,
					variance: self.totalVariance,
					totalPercentSales: self.totalPercentSales
				})
			});

			self.totalArrayByMonth.filter(f => {
				self.arrayTarget.push(self.formatValues(f.tgtValue))
				// self.arraySales.push(f.totalSales)
				// self.arrayVariance.push(f.variance)
				self.arraySales.push(f.totalSales)
				self.arrayVariance.push(f.variance)
			})

			self.arrayVariance.forEach(function (element, index) {
				element = parseFloat(element);
				if (element < 0) {
					self.arrayVariance[index] = 0
				}
			})

			let meses = [
				['Jan', 'T ' + self.arrayTarget[0], 'S ' + self.formatValues(self.arraySales[0]), '', 'Rem.', self.formatValues(self.arrayVariance[0])],
				['Feb', 'T ' + self.arrayTarget[1], 'S ' + self.formatValues(self.arraySales[1]), '', 'Rem.', self.formatValues(self.arrayVariance[1])],
				['Mar', 'T ' + self.arrayTarget[2], 'S ' + self.formatValues(self.arraySales[2]), '', 'Rem.', self.formatValues(self.arrayVariance[2])],
				['Abr', 'T ' + self.arrayTarget[3], 'S ' + self.formatValues(self.arraySales[3]), '', 'Rem.', self.formatValues(self.arrayVariance[3])],
				['May', 'T ' + self.arrayTarget[4], 'S ' + self.formatValues(self.arraySales[4]), '', 'Rem.', self.formatValues(self.arrayVariance[4])],
				['Jun', 'T ' + self.arrayTarget[5], 'S ' + self.formatValues(self.arraySales[5]), '', 'Rem.', self.formatValues(self.arrayVariance[5])],
				['Jul', 'T ' + self.arrayTarget[6], 'S ' + self.formatValues(self.arraySales[6]), '', 'Rem.', self.formatValues(self.arrayVariance[6])],
				['Aug', 'T ' + self.arrayTarget[7], 'S ' + self.formatValues(self.arraySales[7]), '', 'Rem.', self.formatValues(self.arrayVariance[7])],
				['Sep', 'T ' + self.arrayTarget[8], 'S ' + self.formatValues(self.arraySales[8]), '', 'Rem.', self.formatValues(self.arrayVariance[8])],
				['Oct', 'T ' + self.arrayTarget[9], 'S ' + self.formatValues(self.arraySales[9]), '', 'Rem.', self.formatValues(self.arrayVariance[9])],
				['Nov', 'T ' + self.arrayTarget[10], 'S ' + self.formatValues(self.arraySales[10]), '', 'Rem.', self.formatValues(self.arrayVariance[10])],
				['Dec', 'T ' + self.arrayTarget[11], 'S ' + self.formatValues(self.arraySales[11]), '', 'Rem.', self.formatValues(self.arrayVariance[11])]


			]

			this.aplicarColor(self.arrayVariance, self.colorTarget, self.colorSales, meses)
			let reporte = document.createElement('canvas');
			reporte.setAttribute("id", "canvasReport");
			document.getElementById('estadistico').append(reporte)
			new Chart(
				document.getElementById('canvasReport'),
				{
					type: 'bar',
					data: {
						labels: meses,
						datasets: [
							{
								label: 'Sold',
								data: self.arraySales,
								backgroundColor: self.colorSales,
								borderColor: 'red',
								borderWidth: {
									top: 0
								},
								stack: 'stack'
							},
							{
								label: 'Remaining',
								data: self.arrayVariance,
								backgroundColor: self.colorTarget,
								borderColor: '#e7523e',
								borderWidth: {
									top: 0
								},
								stack: 'stack'
							},]
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						layout: {
							padding: {
								top: 1
							}
						},
						scales: {
							x: {
								stacked: true,
							},
							y: {
								stacked: true,
							}
						}
					}
				}
			);
			if (datos.length === 48)
				this.isLoading = false
		},
		defaultValues() {
			this.cruise = '';
			this.totalArrayByMonth = [];
			this.totalTgtValue = '';
			this.totalSales = '';
			this.totalVariance = '';
			this.totalPercentSales = '';
			this.filteredByMonth = [];
			this.arrayVariance = [];
			this.arrayTarget = [];
			this.arraySales = [],
				this.colorTarget = [
					this.colorTargetDef,
					this.colorTargetDef,
					this.colorTargetDef,
					this.colorTargetDef,
					this.colorTargetDef,
					this.colorTargetDef,
					this.colorTargetDef,
					this.colorTargetDef,
					this.colorTargetDef,
					this.colorTargetDef,
					this.colorTargetDef,
					this.colorTargetDef
				],
				this.colorSales = [
					this.colorSalesDef,
					this.colorSalesDef,
					this.colorSalesDef,
					this.colorSalesDef,
					this.colorSalesDef,
					this.colorSalesDef,
					this.colorSalesDef,
					this.colorSalesDef,
					this.colorSalesDef,
					this.colorSalesDef,
					this.colorSalesDef,
					this.colorSalesDef
				];
		},

		aplicarColor(datos, colorTarget, colorSales, meses) {
			var self = this;
			datos.filter(function (dato, indexDato) {
				dato = parseFloat(dato)
				if (dato == 0) {
					colorTarget[indexDato] = 'lightgreen'
					colorSales[indexDato] = 'green'
					let SalesPlus = dato * -1;
					// meses[indexDato].push(' ', 'PLUS', self.formatValues(SalesPlus))
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
	},


	async mounted() {
		await this.getMonthlyProgress(this.data);
	},
}
</script>

<style lang="scss" scoped>
.modal-xxl {
	max-width: 355px;

}
</style>