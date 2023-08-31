<template >
	<b-card title="Year Progress" class="m-0 shadow p-0">
		<div v-if="isLoading" class="d-flex justify-content-center mb-3">
			<b-spinner style="width: 3rem; height: 3rem;" label="Loading..." variant="primary"></b-spinner>
		</div>
		<b-container v-else fluid class="row justify-content-center m-0">
			<span v-if="cruise" class="h5 text-muted m-0"> {{ cruise }}</span>
			<div class="col-lg-10">
				<div v-if="data">
					<div class="progress" style="height: 2em;background-color: rgba(231, 82, 62, 0.1);"
						:title=formatValues(ventaFaltante)>
						<div class="progress-bar progress-bar-animated text-center" role="progressbar" :style="porcentaje"
							aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"
							style="background-color: green; color: white;" :title=formatValues(ventaReal)>
							<span class="h5 m-1">{{ porcentaje.width }} </span>
						</div>
						<div v-if="porcentaje.width != '100%'" class="progress-bar text-center" role="progressbar"
							style=" background-color: transparent; color: black;" :style="porcentajeFaltante + '%'"
							aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
							<span class="h5 m-1 "> {{ porcentajeFaltante }} %</span>
						</div>
					</div>
				</div>
				<div v-else>
					<div class="progress" style="height: 2em;">
						<div class=" progress-bar" style="background-color: grey; width: 0%;" role="progressbar"
							aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
							<span class="h5 m-1">No data</span>
						</div>
					</div>

				</div>
				<!-- <div>porcentaje width: {{ porcentaje.width }}</div>
										<div>objetivo: {{ objetivo }}</div>
										<div>ventaReal: {{ ventaReal }}</div>
										<div>total porcentajeFaltante: {{ ventaFaltante }}</div>
										<div>total porcentajeFaltante: {{ porcentajeFaltante }}</div> -->
			</div>
		</b-container>
	</b-card>
</template>

<script>
import SmallLine from '../../../../../components/Charts/SmallLine.vue';
export default {
	components: { SmallLine },
	props: ["data"],
	data() {
		return {
			objetivo: 0,
			ventaReal: 0,
			porcentajeFaltante: 0,
			ventaFaltante: 0,
			nuevo: [],
			porcentaje: {
				width: '0%'
			},
			porcentajeVentas: 0,
			cruise: '',
			isLoading: true
		}
	},
	watch: {
		data: function () {
			this.reloadValues(this.data);
			this.getYearProgress(this.data);

		}
	},
	methods: {
		getYearProgress(datos) {
			var self = this;
			datos.forEach(element => {
				element.tgtValue = parseFloat(element.tgtValue)
				element.totalSales = parseFloat(element.totalSales)
				self.ventaReal += element.totalSales
				self.objetivo += element.tgtValue
				if (datos.length == 12) {
					self.cruise = element.cruName
				}
			});
			this.percentageProgress()
			if (datos.length == 48)
				this.isLoading = false
		},

		percentageProgress() {
			if (this.ventaReal != 0 && this.objetivo != 0) {
				this.objetivo = parseFloat(this.objetivo);
				this.ventaReal = parseFloat(this.ventaReal.toFixed(1))
				this.porcentajeVentas = (this.ventaReal * 100) / this.objetivo;
				this.porcentajeVentas = this.porcentajeVentas.toFixed(1);
				this.porcentajeFaltante = 100 - this.porcentajeVentas
				this.porcentajeFaltante = this.porcentajeFaltante.toFixed(1)
				this.porcentaje.width = this.porcentajeVentas + '%';
				this.ventaFaltante = this.objetivo - this.ventaReal;
				this.ventaFaltante = this.ventaFaltante.toFixed(1)
			}
		},
		reloadValues() {
			this.porcentajeVentas = 0;
			this.porcentajeFaltante = 0;
			this.ventaFaltante = 0;
			this.ventaReal = 0;
			this.objetivo = 0;
			this.cruise = ''
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
		this.getYearProgress(this.data);


	}
}

</script>

<style lang="scss" scoped></style>