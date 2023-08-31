
<template  >
	<b-container fluid v-if="isLoading">
		<b-col class="text-center text-muted">
			<b-spinner style="width: 3rem; height: 3rem;" variant="primary"></b-spinner>

			<h5>Please wait</h5>
			<p>
				We're checking targets. <br>
				It'll just take a moment
			</p>
		</b-col>
	</b-container>
	<b-container fluid v-else>
		<b-row>
			<b-colxx xxs="1">
				<b-button @click="$router.go(-1)" variant="white" class="mt-0 text-danger" title="Return Targets">
					<span>
						<i class="glyph-icon simple-icon-arrow-left-circle m-1"></i>
					</span><a>Return</a>
				</b-button>
			</b-colxx>
			<b-colxx xxs="5">
				<span>
					<h1>Targets</h1>
					<ul class="nav pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
						<ol class="breadcrumb">
							<li class="breadcrumb-item">
								<a href="/app" class="active" target="_self">{{
									$t("menu.home")
								}}</a>
							</li>

							<li class="breadcrumb-item active" @click="$router.go(-1)">
								<span aria-current="location">Targets</span>
							</li>
							<li class="breadcrumb-item active">
								<span aria-current="location">Montly Progress Details</span>
							</li>

						</ol>
					</ul>
				</span>
			</b-colxx>
			<b-colxx xxs="6">
				<b-row>
					<b-col lg="2">
						<div class="progress mt-3" style="height: 15px; ">
							<div class="progress-bar bg-success" role="progressbar" style="width: 100%;" aria-valuenow="25"
								aria-valuemin="0" aria-valuemax="100"> Completed</div>
						</div>
					</b-col>
					<b-col lg="2">
						<div class="progress mt-3" style="height: 15px;  ">
							<div class="progress-bar" role="progressbar" style="width: 100%; background-color: #d6a779;"
								aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">Sales</div>
						</div>
					</b-col>
					<b-col lg="2">
						<div class="progress mt-3" style="height: 15px;">
							<div class="progress-bar" role="progressbar"
								style="width: 100%;  background-color: rgba(231, 82, 62, 0.1); color: black;"
								aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"><strong>Remaining</strong></div>
						</div>
					</b-col>
					<b-col lg="2">
						<div class="progress mt-3" style="height: 15px;">
							<div class="progress-bar" role="progressbar"
								style="width: 100%;  background-color: red; color: white;" aria-valuenow="25"
								aria-valuemin="0" aria-valuemax="100"><small><strong>Critical month</strong></small></div>
						</div>
					</b-col>
					<b-col lg="3">
						<b-form-select v-model="searchYear" :options="optionsYears" size="sm" class="m-0  ">
						</b-form-select>
					</b-col>
				</b-row>
			</b-colxx>

		</b-row>
		<b-row>
			<b-col lg="1" v-if="mostrarMeses">

				<b-row class="text-right m-2 h5">
					<b-col lg="12" style="color: transparent">
						<small>Mes</small>
					</b-col>
				</b-row>
				<b-row class="text-right h5" v-for="(itemDatos, index1) in buscarmeses" :key="index1">
					<b-col lg="12">
						<small>{{ itemDatos.value }}</small>
					</b-col>
				</b-row>


			</b-col>
			<b-col lg="11">
				<b-container fluid>
					<b-row>
						<b-col lg="3">
							<b-row class="justify-content-center">
								<h3 v-for="(datosCrucero1) in crucero1">
									<strong v-if="datosCrucero1.tgtMonth === 1">{{ datosCrucero1.cruName }}</strong>
								</h3>
								<b-col lg="12" v-for="(itemDatos, index) in crucero1" :key="index">
									<div v-if="itemDatos.variance > 0" class="progress m-1"
										style="height: 24px; background-color: whitesmoke; "
										:title="itemDatos.cruName + '      ' + itemDatos.tgtMonthName + '\n' + 'T: ' + formatValues(itemDatos.tgtValue) + '\n' + 'S: ' + formatValues(itemDatos.totalSales) + '\n' + 'R: ' + formatValues(itemDatos.variance)">
										<div class="progress-bar" role="progressbar" :style="porcentajeVentas(itemDatos)"
											style="cursor: pointer; background-color: #d6a779; color: black; "
											aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
											<strong> {{ porcentaje(itemDatos) }}% </strong>
										</div>
										<div class="progress-bar" role="progressbar"
											style="cursor: pointer; background-color:rgba(231, 82, 62, 0.1); color: black;"
											:style="porcentajeFaltante(itemDatos)" aria-valuenow="25" aria-valuemin="0"
											aria-valuemax="100">
											<!-- <strong>{{ porcentajeFaltanteSolo(itemDatos) }}</strong> -->
										</div>

									</div>
									<div v-else-if="itemDatos.tgtValue == 0" class="progress m-1"
										style="height: 24px; background-color: aqua;cursor: pointer;">
										<div class="progress-bar bg-info " role="progressbar" style="width: 100%; "
											aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
											:title="itemDatos.cruName + '      ' + itemDatos.tgtMonthName + '\n' + 'T: ' + formatValues(itemDatos.tgtValue)">
											<strong> No data </strong>
										</div>
									</div>
									<div v-else class="progress m-1"
										style="height: 24px; background-color: aqua;cursor: pointer;">
										<div class="progress-bar bg-success " role="progressbar" style="width: 100%; "
											aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
											:title="itemDatos.cruName + '      ' + itemDatos.tgtMonthName + '\n' + 'T: ' + formatValues(itemDatos.tgtValue)">
											<strong> 100 % </strong>
										</div>
									</div>
								</b-col>
							</b-row>
						</b-col>
						<b-col lg="3">
							<b-row class="justify-content-center">
								<h3 v-for="(datosCrucero1) in crucero2">
									<strong v-if="datosCrucero1.tgtMonth === 1">{{ datosCrucero1.cruName }}</strong>
								</h3>
								<b-col lg="12" v-for="(itemDatos, index) in crucero2" :key="index">
									<div v-if="itemDatos.variance > 0" class="progress m-1"
										style="height: 24px; background-color: whitesmoke; "
										:title="itemDatos.cruName + '      ' + itemDatos.tgtMonthName + '\n' + 'T: ' + formatValues(itemDatos.tgtValue) + '\n' + 'S: ' + formatValues(itemDatos.totalSales) + '\n' + 'R: ' + formatValues(itemDatos.variance)">
										<div class="progress-bar" role="progressbar" :style="porcentajeVentas(itemDatos)"
											style="cursor: pointer; background-color: #d6a779; color: black; "
											aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
											<!-- :title="itemDatos.tgtMonthName + ' : ' + porcentaje(itemDatos) + '%'"> -->
											<strong> {{ porcentaje(itemDatos) }}% </strong>
										</div>
										<div class="progress-bar" role="progressbar"
											style="cursor: pointer; background-color:rgba(231, 82, 62, 0.1); color: black;"
											:style="porcentajeFaltante(itemDatos)" aria-valuenow="25" aria-valuemin="0"
											aria-valuemax="100">
											<!-- <strong>{{ porcentajeFaltanteSolo(itemDatos) }}</strong> -->
										</div>

									</div>
									<div v-else-if="itemDatos.tgtValue == 0" class="progress m-1"
										style="height: 24px; background-color: aqua;cursor: pointer;">
										<div class="progress-bar bg-info " role="progressbar" style="width: 100%; "
											aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
											:title="itemDatos.cruName + '      ' + itemDatos.tgtMonthName + '\n' + 'T: ' + formatValues(itemDatos.tgtValue)">
											<strong> No data </strong>
										</div>
									</div>
									<div v-else class="progress m-1"
										style="height: 24px; background-color: aqua;cursor: pointer;">
										<div class="progress-bar bg-success " role="progressbar" style="width: 100%; "
											aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
											:title="itemDatos.cruName + '      ' + itemDatos.tgtMonthName + '\n' + 'T: ' + formatValues(itemDatos.tgtValue)">
											<strong> 100 % </strong>
										</div>
									</div>
								</b-col>
							</b-row>
						</b-col>
						<b-col lg="3">
							<b-row class="justify-content-center">
								<h3 v-for="(datosCrucero1) in crucero3">
									<strong v-if="datosCrucero1.tgtMonth === 1">{{ datosCrucero1.cruName }}</strong>
								</h3>
								<b-col lg="12" v-for="(itemDatos, index) in crucero3" :key="index">
									<div v-if="itemDatos.variance > 0" class="progress m-1"
										style="height: 24px; background-color: whitesmoke; "
										:title="itemDatos.cruName + '      ' + itemDatos.tgtMonthName + '\n' + 'T: ' + formatValues(itemDatos.tgtValue) + '\n' + 'S: ' + formatValues(itemDatos.totalSales) + '\n' + 'R: ' + formatValues(itemDatos.variance)">
										<div class="progress-bar" role="progressbar" :style="porcentajeVentas(itemDatos)"
											style="cursor: pointer; background-color: #d6a779; color: black; "
											aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
											<!-- :title="itemDatos.tgtMonthName + ' : ' + porcentaje(itemDatos) + '%'"> -->
											<strong> {{ porcentaje(itemDatos) }}% </strong>
										</div>
										<div class="progress-bar" role="progressbar"
											style="cursor: pointer; background-color:rgba(231, 82, 62, 0.1); color: black;"
											:style="porcentajeFaltante(itemDatos)" aria-valuenow="25" aria-valuemin="0"
											aria-valuemax="100">
											<!-- <strong>{{ porcentajeFaltanteSolo(itemDatos) }}</strong> -->
										</div>

									</div>
									<div v-else-if="itemDatos.tgtValue == 0" class="progress m-1"
										style="height: 24px; background-color: aqua;cursor: pointer;">
										<div class="progress-bar bg-info " role="progressbar" style="width: 100%; "
											aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
											:title="itemDatos.cruName + '      ' + itemDatos.tgtMonthName + '\n' + 'T: ' + formatValues(itemDatos.tgtValue)">
											<strong> No data </strong>
										</div>
									</div>
									<div v-else class="progress m-1"
										style="height: 24px; background-color: aqua;cursor: pointer;">
										<div class="progress-bar bg-success " role="progressbar" style="width: 100%; "
											aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
											:title="itemDatos.cruName + '      ' + itemDatos.tgtMonthName + '\n' + 'T: ' + formatValues(itemDatos.tgtValue)">
											<strong> 100 % </strong>
										</div>
									</div>
								</b-col>
							</b-row>
						</b-col>
						<b-col lg="3">
							<b-row class="justify-content-center">
								<h3 v-for="(datosCrucero1) in crucero4">
									<strong v-if="datosCrucero1.tgtMonth === 1">{{ datosCrucero1.cruName }}</strong>
								</h3>
								<b-col lg="12" v-for="(itemDatos, index) in crucero4" :key="index">
									<div v-if="itemDatos.variance > 0" class="progress m-1"
										style="height: 24px; background-color: whitesmoke; "
										:title="itemDatos.cruName + '      ' + itemDatos.tgtMonthName + '\n' + 'T: ' + formatValues(itemDatos.tgtValue) + '\n' + 'S: ' + formatValues(itemDatos.totalSales) + '\n' + 'R: ' + formatValues(itemDatos.variance)">
										<div class="progress-bar" role="progressbar" :style="porcentajeVentas(itemDatos)"
											style="cursor: pointer; background-color: #d6a779; color: black; "
											aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
											<!-- :title="itemDatos.tgtMonthName + ' : ' + porcentaje(itemDatos) + '%'"> -->
											<strong> {{ porcentaje(itemDatos) }}% </strong>
										</div>
										<div class="progress-bar" role="progressbar"
											style="cursor: pointer; background-color:rgba(231, 82, 62, 0.1); color: black;"
											:style="porcentajeFaltante(itemDatos)" aria-valuenow="25" aria-valuemin="0"
											aria-valuemax="100">
											<!-- <strong>{{ porcentajeFaltanteSolo(itemDatos) }}</strong> -->
										</div>

									</div>
									<div v-else-if="itemDatos.tgtValue == 0" class="progress m-1"
										style="height: 24px; background-color: aqua;cursor: pointer;">
										<div class="progress-bar bg-info " role="progressbar" style="width: 100%; "
											aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
											:title="itemDatos.cruName + '      ' + itemDatos.tgtMonthName + '\n' + 'T: ' + formatValues(itemDatos.tgtValue)">
											<strong> No data </strong>
										</div>
									</div>
									<div v-else class="progress m-1"
										style="height: 24px; background-color: aqua;cursor: pointer;">
										<div class="progress-bar bg-success " role="progressbar" style="width: 100%; "
											aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
											:title="itemDatos.cruName + '      ' + itemDatos.tgtMonthName + '\n' + 'T: ' + formatValues(itemDatos.tgtValue)">
											<strong> 100 % </strong>
										</div>
									</div>
								</b-col>
							</b-row>
						</b-col>
					</b-row>
				</b-container>
			</b-col>
		</b-row>
		<div class="separator m-1"></div>
		<b-row>
			<b-col lg="1" class="mt-2 text-center">
				<h4>
					<strong> {{ searchYear }} </strong>
				</h4>

			</b-col>
			<b-col lg="11">
				<b-row class="justify-content-center">
					<b-col lg="3">
						<div class="text-center" v-if="mostrarBarcos">
							<h3><strong>{{ totalCruise[0][0] }}</strong></h3>
						</div>
						<div class="progress m-1" style="height: 35px; background-color: whitesmoke; "
							:title="totalCruise[0][0] + '      ' + year + '\n' + 'T: ' + formatValues(totalCruise[0][1]) + '\n' + 'S: ' + formatValues(totalCruise[0][2]) + '\n' + 'R: ' + formatValues(totalCruise[0][3])">
							<div class="progress-bar" role="progressbar" :style="totalPorcentajeVentas(totalCruise[0])"
								style="cursor: pointer; background-color: green; color: white; " aria-valuenow="25"
								aria-valuemin="0" aria-valuemax="100">
								<span><strong> {{ totalPorcentaje(totalCruise[0]) }} % </strong></span>
							</div>
							<div class="progress-bar" role="progressbar"
								style="cursor: pointer; background-color:rgba(231, 82, 62, 0.1); color: black;"
								:style="totalPorcentajeFaltante(totalCruise[0])" aria-valuenow="25" aria-valuemin="0"
								aria-valuemax="100">
								<!-- <span><strong>{{ totalPorcentajeFaltanteSolo(totalCruise[0]) }}</strong></span> -->
							</div>

						</div>

					</b-col>
					<b-col lg="3">
						<div class="text-center" v-if="mostrarBarcos">
							<h3><strong>{{ totalCruise[1][0] }}</strong></h3>
						</div>
						<div class="progress m-1" style="height: 35px; background-color: whitesmoke; "
							:title="totalCruise[1][0] + '      ' + year + '\n' + 'T: ' + formatValues(totalCruise[1][1]) + '\n' + 'S: ' + formatValues(totalCruise[1][2]) + '\n' + 'R: ' + formatValues(totalCruise[1][3])">
							<div class="progress-bar" role="progressbar" :style="totalPorcentajeVentas(totalCruise[1])"
								style="cursor: pointer; background-color: green; color: white; " aria-valuenow="25"
								aria-valuemin="0" aria-valuemax="100">
								<span><strong> {{ totalPorcentaje(totalCruise[1]) }} % </strong></span>
							</div>
							<div class="progress-bar" role="progressbar"
								style="cursor: pointer; background-color:rgba(231, 82, 62, 0.1); color: black;"
								:style="totalPorcentajeFaltante(totalCruise[1])" aria-valuenow="25" aria-valuemin="0"
								aria-valuemax="100">
								<!-- <span><strong>{{ totalPorcentajeFaltanteSolo(totalCruise[1]) }}</strong></span> -->
							</div>

						</div>

					</b-col>
					<b-col lg="3">
						<div class="text-center" v-if="mostrarBarcos">
							<h3><strong>{{ totalCruise[2][0] }}</strong></h3>
						</div>
						<div class="progress m-1" style="height: 35px; background-color: whitesmoke; "
							:title="totalCruise[2][0] + '      ' + year + '\n' + 'T: ' + formatValues(totalCruise[2][1]) + '\n' + 'S: ' + formatValues(totalCruise[2][2]) + '\n' + 'R: ' + formatValues(totalCruise[2][3])">
							<div class="progress-bar" role="progressbar" :style="totalPorcentajeVentas(totalCruise[2])"
								style="cursor: pointer; background-color: green; color: white; " aria-valuenow="25"
								aria-valuemin="0" aria-valuemax="100">
								<span><strong> {{ totalPorcentaje(totalCruise[2]) }} % </strong></span>
							</div>
							<div class="progress-bar" role="progressbar"
								style="cursor: pointer; background-color:rgba(231, 82, 62, 0.1); color: black;"
								:style="totalPorcentajeFaltante(totalCruise[2])" aria-valuenow="25" aria-valuemin="0"
								aria-valuemax="100">
								<!-- <span><strong>{{ totalPorcentajeFaltanteSolo(totalCruise[2]) }}</strong></span> -->
							</div>

						</div>

					</b-col>
					<b-col lg="3">
						<div class="text-center" v-if="mostrarBarcos">
							<h3><strong>{{ totalCruise[3][0] }}</strong></h3>
						</div>
						<div class="progress m-1" style="height: 35px; background-color: whitesmoke; "
							:title="totalCruise[3][0] + '      ' + year + '\n' + 'T: ' + formatValues(totalCruise[3][1]) + '\n' + 'S: ' + formatValues(totalCruise[3][2]) + '\n' + 'R: ' + formatValues(totalCruise[3][3])">
							<div class="progress-bar" role="progressbar" :style="totalPorcentajeVentas(totalCruise[3])"
								style="cursor: pointer; background-color: green; color: white; " aria-valuenow="25"
								aria-valuemin="0" aria-valuemax="100">
								<span><strong> {{ totalPorcentaje(totalCruise[3]) }} % </strong></span>
							</div>
							<div class="progress-bar" role="progressbar"
								style="cursor: pointer; background-color:rgba(231, 82, 62, 0.1); color: black;"
								:style="totalPorcentajeFaltante(totalCruise[3])" aria-valuenow="25" aria-valuemin="0"
								aria-valuemax="100">
								<!-- <span><strong>{{ totalPorcentajeFaltanteSolo(totalCruise[3]) }}</strong></span> -->
							</div>

						</div>

					</b-col>
				</b-row>
			</b-col>


		</b-row>
	</b-container>
</template>

<script>
import moment from "moment";
import ReportsServices from '@/services/gps/reports/ReportsServices'
import CruiseServices from '@/services/gps/cruise/CruiseServices'
import { Console } from 'console';
export default {

	name: "Availability",


	data() {
		return {
			buscarmeses: [
				{ id: 1, valor: "Enero", value: "Jan" },
				{ id: 2, valor: "Febrero", value: "Feb" },
				{ id: 3, valor: "Marzo", value: "Mar" },
				{ id: 4, valor: "Abril", value: "Abr" },
				{ id: 5, valor: "Mayo", value: "May" },
				{ id: 6, valor: "Junio", value: "Jun" },
				{ id: 7, valor: "Julio", value: "Jul" },
				{ id: 8, valor: "Agosto", value: "Aug" },
				{ id: 9, valor: "Septiembre", value: "Sep" },
				{ id: 10, valor: "Octubre", value: "Oct" },
				{ id: 11, valor: "Noviembre", value: "Nov" },
				{ id: 12, valor: "Diciembre", value: "Dec" },
			],
			dataAllSalesTargets: [],
			originalDataAllSalesTargets: [],
			cruises: [],
			optionsYears: [],
			year: moment().format("YYYY"),
			initYear: "2022",
			searchYear: moment().format("YYYY"),
			searchCruise: null,
			searchMonths: null,
			meses: [],
			crucero1: [],
			crucero2: [],
			crucero3: [],
			crucero4: [],
			totalCruise: [[], [], [], []],
			windowWidth: window.innerWidth,
			mostrarMeses: true,
			mostrarBarcos: false,
			isLoading: true
		};
	},

	watch: {
		searchYear: function () {
			this.searchCruise = null;
			this.filterbyYear();
		},
		searchCruise: function () {
			this.filterByCruise();
		},
		searchMonths: function () {
			this.filterByMonth();
		},
		dataAllSalesTargets: function () {
			if (document.getElementById("canvasReportDetail")) {
				document.getElementById("canvasReportDetail").remove();
			}
			this.newReport(this.originalDataAllSalesTargets);
		},

	},

	methods: {
		verifySales(datos) {
			datos.porcentajeVentasTotal = (datos.totalSales * 100) / datos.tgtValue
			datos.porcentajeVentasTotal = datos.porcentajeVentasTotal.toFixed(2)
			datos.porcentajeVentasTotal = parseFloat(datos.porcentajeVentasTotal)
			if (datos.porcentajeVentasTotal < 40) {
				return "background-color:red; color: white"
			} else {
				return "background-color:lightgray; color: black"
			}
		},
		porcentaje(datos) {
			datos.porcentajeVentas = (datos.totalSales * 100) / datos.tgtValue
			datos.porcentajeVentas = datos.porcentajeVentas.toFixed(0)
			datos.porcentajeVentas = parseFloat(datos.porcentajeVentas)
			return datos.porcentajeVentas
		},
		porcentajeVentas(datos) {
			datos.porcentajeVentas = (datos.totalSales * 100) / datos.tgtValue
			datos.porcentajeVentas = datos.porcentajeVentas.toFixed(0)
			datos.porcentajeVentas = parseFloat(datos.porcentajeVentas)
			if (datos.porcentajeVentas < 35)
				return 'width:' + datos.porcentajeVentas + '%; background-color:red; color:white'
			else
				return 'width:' + datos.porcentajeVentas + '%'
		},
		porcentajeFaltante(datos) {
			datos.porcentajeFaltante = (datos.totalSales * 100) / datos.tgtValue
			datos.porcentajeFaltante = parseFloat(datos.porcentajeFaltante)
			datos.porcentajeFaltante = 100 - datos.porcentajeFaltante
			datos.porcentajeFaltante = datos.porcentajeFaltante.toFixed(0)
			return 'width:' + datos.porcentajeFaltante + '%'
		},
		porcentajeFaltanteNumber(datos, variance) {
			datos.porcentajeFaltante = (datos.totalSales * 100) / datos.tgtValue
			datos.porcentajeFaltante = parseFloat(datos.porcentajeFaltante)
			datos.porcentajeFaltante = 100 - datos.porcentajeFaltante
			datos.porcentajeFaltante = datos.porcentajeFaltante.toFixed(2)
			return datos.porcentajeFaltante + '%' + ': ' + variance
		},
		porcentajeFaltanteSolo(datos) {
			datos.porcentajeFaltante = (datos.totalSales * 100) / datos.tgtValue
			datos.porcentajeFaltante = parseFloat(datos.porcentajeFaltante)
			datos.porcentajeFaltante = 100 - datos.porcentajeFaltante
			datos.porcentajeFaltante = datos.porcentajeFaltante.toFixed(0)
			return datos.porcentajeFaltante + '%'
		},


		totalPorcentaje(datos) {
			datos.porcentajeVentas = (datos[2] * 100) / datos[1]
			datos.porcentajeVentas = datos.porcentajeVentas.toFixed(0)
			datos.porcentajeVentas = parseFloat(datos.porcentajeVentas)
			return datos.porcentajeVentas
		},
		totalPorcentajeVentas(datos) {
			datos.totalporcentajeVentas = (datos[2] * 100) / datos[1]
			datos.totalporcentajeVentas = datos.totalporcentajeVentas.toFixed(0)
			datos.totalporcentajeVentas = parseFloat(datos.totalporcentajeVentas)
			if (datos.totalporcentajeVentas < 30)
				return 'width:' + datos.totalporcentajeVentas + '%; background-color:red; color:white'
			else
				return 'width:' + datos.totalporcentajeVentas + '%'
		},
		totalPorcentajeFaltante(datos) {
			datos.totalporcentajeVentas = (datos[3] * 100) / datos[1]
			datos.totalporcentajeVentas = datos.totalporcentajeVentas.toFixed(0)
			datos.totalporcentajeVentas = parseFloat(datos.totalporcentajeVentas)

			return 'width:' + datos.totalporcentajeVentas + '%'
		},
		totalPorcentajeFaltanteSolo(datos) {
			datos.porcentajeFaltante = (datos[2] * 100) / datos[1]
			datos.porcentajeFaltante = parseFloat(datos.porcentajeFaltante)
			datos.porcentajeFaltante = 100 - datos.porcentajeFaltante
			datos.porcentajeFaltante = datos.porcentajeFaltante.toFixed(0)
			return datos.porcentajeFaltante + '%'
		},

		newReport(datos) {
			var self = this;
			self.crucero1 = datos.filter(f => f.cruName == 'Aqua');
			self.crucero2 = datos.filter(f => f.cruName == 'Solaris');
			self.crucero3 = datos.filter(f => f.cruName == 'Treasure');
			self.crucero4 = datos.filter(f => f.cruName == 'Archipel I');
			self.crucero1.forEach(function (element, index) {
				element.tgtMonth = parseInt(element.tgtMonth)
				if (element.tgtMonth == self.buscarmeses[index].id) {
					element.tgtMonthName = self.buscarmeses[index].value
				}
			});
			self.crucero2.forEach(function (element, index) {
				element.tgtMonth = parseInt(element.tgtMonth)
				if (element.tgtMonth == self.buscarmeses[index].id) {
					element.tgtMonthName = self.buscarmeses[index].value
				}
			});
			self.crucero3.forEach(function (element, index) {
				element.tgtMonth = parseInt(element.tgtMonth)
				if (element.tgtMonth == self.buscarmeses[index].id) {
					element.tgtMonthName = self.buscarmeses[index].value
				}
			});
			self.crucero4.forEach(function (element, index) {
				element.tgtMonth = parseInt(element.tgtMonth)
				if (element.tgtMonth == self.buscarmeses[index].id) {
					element.tgtMonthName = self.buscarmeses[index].value
				}
			});
			self.crucero1.forEach(function (e, i, array) {
				let totalTarget = array.reduce((total, item) => {
					return parseFloat(total) + parseFloat(item.tgtValue)
				}, 0).toFixed(2)
				let totalSales = array.reduce((total, item) => {
					return parseFloat(total) + parseFloat(item.totalSales)
				}, 0).toFixed(2)
				let totalVariance = array.reduce((total, item) => {
					return parseFloat(total) + parseFloat(item.variance)
				}, 0).toFixed(2);
				totalTarget = parseFloat(totalTarget)
				totalSales = parseFloat(totalSales)
				totalVariance = parseFloat(totalVariance)
				self.totalCruise[0][0] = array[0].cruName;
				self.totalCruise[0][1] = totalTarget;
				self.totalCruise[0][2] = totalSales;
				self.totalCruise[0][3] = totalVariance
			});
			self.crucero2.forEach(function (e, i, array) {
				let totalTarget = array.reduce((total, item) => {
					return parseFloat(total) + parseFloat(item.tgtValue)
				}, 0).toFixed(2)
				let totalSales = array.reduce((total, item) => {
					return parseFloat(total) + parseFloat(item.totalSales)
				}, 0).toFixed(2)
				let totalVariance = array.reduce((total, item) => {
					return parseFloat(total) + parseFloat(item.variance)
				}, 0).toFixed(2);
				totalTarget = parseFloat(totalTarget)
				totalSales = parseFloat(totalSales)
				totalVariance = parseFloat(totalVariance)
				self.totalCruise[1][0] = array[0].cruName;
				self.totalCruise[1][1] = totalTarget;
				self.totalCruise[1][2] = totalSales;
				self.totalCruise[1][3] = totalVariance
			});
			self.crucero3.forEach(function (e, i, array) {
				let totalTarget = array.reduce((total, item) => {
					return parseFloat(total) + parseFloat(item.tgtValue)
				}, 0).toFixed(2)
				let totalSales = array.reduce((total, item) => {
					return parseFloat(total) + parseFloat(item.totalSales)
				}, 0).toFixed(2)
				let totalVariance = array.reduce((total, item) => {
					return parseFloat(total) + parseFloat(item.variance)
				}, 0).toFixed(2);
				totalTarget = parseFloat(totalTarget)
				totalSales = parseFloat(totalSales)
				totalVariance = parseFloat(totalVariance)
				self.totalCruise[2][0] = array[0].cruName;
				self.totalCruise[2][1] = totalTarget;
				self.totalCruise[2][2] = totalSales;
				self.totalCruise[2][3] = totalVariance
			});
			self.crucero4.forEach(function (e, i, array) {
				let totalTarget = array.reduce((total, item) => {
					return parseFloat(total) + parseFloat(item.tgtValue)
				}, 0).toFixed(2)
				let totalSales = array.reduce((total, item) => {
					return parseFloat(total) + parseFloat(item.totalSales)
				}, 0).toFixed(2)
				let totalVariance = array.reduce((total, item) => {
					return parseFloat(total) + parseFloat(item.variance)
				}, 0).toFixed(2);
				totalTarget = parseFloat(totalTarget)
				totalSales = parseFloat(totalSales)
				totalVariance = parseFloat(totalVariance)
				self.totalCruise[3][0] = array[0].cruName;
				self.totalCruise[3][1] = totalTarget;
				self.totalCruise[3][2] = totalSales;
				self.totalCruise[3][3] = totalVariance
			});

			if (datos.length === 48)
				this.isLoading = false

		},

		formatValues(value) {
			var formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 2
			});
			return formatter.format(value);
		},

		filterbyYear() {
			this.getAllSalesOverview()
		},

		async getAllCruises() {
			await CruiseServices.getCruises()
				.then(response => {

					response.data.data.sort(
						(c1, c2) => c1.cruId > c2.cruId
					);
					this.cruises = response.data.data;
				})
				.catch(error => {
					console.log("Error: " + error);
				});
		},

		async getAllSalesOverview() {
			this.dataAllSalesTargets = [];
			this.originalDataAllSalesTargets = [];

			let cruisesList = this.cruises.map(x => ({
				cruId: x.cruId,
				cruName: x.cruName
			}));
			var self = this;
			await cruisesList.forEach(async (el) => {
				await ReportsServices.getCruiseSalesOverview(self.getParams(el.cruId))
					.then(response => {
						response.data.forEach(e => {
							e.cruId = el.cruId;
							e.cruName = el.cruName;
							e.tgtValue = Number(e.tgtValue).toFixed(2)
							e.totalSales = Number(e.totalSales).toFixed(2)
							e.variance = Number(e.variance).toFixed(2)

						})
						self.dataAllSalesTargets.push(...response.data)
						self.originalDataAllSalesTargets.push(...response.data)
					});
			});
			this.dataAllSalesTargets = this.dataAllSalesTargets.filter((item, index) => {
				return data.indexOf(item) === index;
			})
			this.originalDataAllSalesTargets = this.originalDataAllSalesTargets.filter((item, index) => {
				return data.indexOf(item) === index;
			})
		},

		getParams(cruiseId) {
			var params = {};
			return params = {
				inicio: moment(this.searchYear).startOf('year').format('YYYY-MM-DD'),
				fin: moment(this.searchYear).endOf('year').format('YYYY-MM-DD'),
				cruise: cruiseId
			}
		},
		yearArray() {
			var year = [];
			for (var i = this.initYear; i <= this.year; i++) {
				year.push(i.toString());
			}
			this.optionsYears = year;
		}
	},
	async mounted() {

		await this.getAllCruises();
		await this.getAllSalesOverview();
		await this.yearArray();
		window.onresize = () => {
			this.windowWidth = window.innerWidth
			if (this.windowWidth < 995) {
				this.mostrarMeses = false
				this.mostrarBarcos = true
			}
			else {
				this.mostrarMeses = true
				this.mostrarBarcos = false
			}
		}
	},
};
</script>
