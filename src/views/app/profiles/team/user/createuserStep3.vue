<template>
	<div>
		<b-card>
			<header>
				<h4>General</h4>
			</header>
			<b-row>
				<b-col lg="12" class="form-group">
					<b-row>

						<b-col lg="5" class="form-group">
							<label for="empresa" class="control-label">Enterprise</label>
							<span class="text-danger">*</span>
							<b-form-select v-model="formData.empresa" id="empresa" :options="empresaOptions"
								style="width:100%"></b-form-select>
						</b-col>
						<b-col lg="" class="form-group">
							<label for="departamento_id" class="control-label">Department</label>
							<span class="text-danger">*</span>
							<b-form-select v-model="formData.departamento_id" id="departamento_id"
								:options="departamentosOptions" style="width:100%"
								@change="filterPositions"></b-form-select>
						</b-col>
						<b-col lg="3" class="form-group" v-if="formData.departamento_id == 3">
							<label for="operador_id" class="control-label">Operador</label> <span
								class="text-danger">*</span>
							<b-form-select v-model="formData.operador_id" id="operador_id" :options="operadoresOptions"
								style="width:100%"></b-form-select>
						</b-col>
					</b-row>
					<b-row>
						<b-col lg="5" class="form-group">
							<label for="cargo_id" class="control-label">Position</label>
							<span class="text-danger">*</span>
							<b-form-select v-model="formData.cargo_id" id="cargo_id" :options="filteredCargosOptions"
								style="width:100%"></b-form-select>
						</b-col>
						<b-col lg="2" class="form-group">
							<label for="tipo_contrato" class="control-label">Contract</label><span
								class="text-danger">*</span>
							<b-form-select v-model="formData.tipo_contrato" id="tipo_contrato"
								:options="tipoContratoOptions" style="width:100%"></b-form-select>
						</b-col>

						<b-col lg="2">
							<b-form-group label="Salary" label-for="sueldo">
								<b-form-input v-model="formData.sueldo" id="sueldo" type="number"
									placeholder="Ingrese el salario" />
							</b-form-group>
						</b-col>
						<b-col lg="3" class="form-group">
							<label for="banda_salarial" class="control-label">Scale</label><span
								class="text-danger">*</span>
							<b-form-select v-model="formData.banda_salarial" id="banda_salarial"
								:options="bandaPuestosOptions" style="width:100%"></b-form-select>
						</b-col>


					</b-row>

				</b-col>
				<b-col lg="12" md="2">
					<b-form-group label="Funciones" label-for="Funciones">
						<b-form-textarea v-model="formData.funciones" id="funciones"
							placeholder="Ingrese funciones adicionales" :rows="4" />
					</b-form-group>
				</b-col>
			</b-row>

		</b-card>

		<b-card>
			<header>
				<h4>Remuneración</h4>
			</header>
			<b-row>
				<b-col lg="3" class="form-group">
					<label for="forma_pago" class="control-label">Forma Pago</label><span class="text-danger">*</span>
					<b-form-select v-model="formData.forma_pago" id="forma_pago" :options="formaPagoOptions"
						style="width:100%"></b-form-select>
				</b-col>

				<b-col lg="3" v-if="formData.forma_pago == 1" class="form-group">
					<label for="banco" class="control-label">Banco</label><span class="text-danger">*</span>
					<b-form-select v-model="formData.banco" id="banco" :options="bancosOptions"
						style="width:100%"></b-form-select>
				</b-col>
				<b-col lg="2" v-if="formData.forma_pago == 1" class="form-group">
					<label for="tipo_cuenta" class="control-label">Tipo cuenta</label><span class="text-danger">*</span>
					<b-form-select v-model="formData.tipo_cuenta" id="tipo_cuenta" :options="tipoCuentaOptions"
						style="width:100%"></b-form-select>
				</b-col>
				<b-col lg="3" v-if="formData.forma_pago == 1">
					<b-form-group label-for="numero_cuenta">
						<label for="numero_cuenta" class="control-label">Número de cuenta</label><span
							class="text-danger">*</span>
						<b-form-input v-model="formData.numero_cuenta" id="numero_cuenta" type="number"
							placeholder="Ingrese el número de cuenta" />
					</b-form-group>
				</b-col>
			</b-row>
		</b-card>

		<b-card>
			<header>
				<h4>Laboral benefits</h4>
			</header>
			<b-row>
				<b-col lg="" class="form-group">
					<label for="acumula_decimos" class="control-label">Acumula décimos</label>
					<span class="text-danger">*</span>
					<b-form-select v-model="formData.acumula_decimos" id="acumula_decimos"
						:options="condicionalDecimosOptions" style="width:100%"></b-form-select>
				</b-col>
				<b-col lg="">
					<b-form-group label="Días de Vacaciones" label-for="dias_vacaciones">
						<b-form-input v-model="formData.dias_vacaciones" id="dias_vacaciones" type="number"
							placeholder="Ingrese los días de vacaciones" />
					</b-form-group>
				</b-col>
				<b-col lg="">
					<b-form-group label="Días de Feriado Carnaval" label-for="dias_feriado_carnaval">
						<b-form-input v-model="formData.dias_feriado_carnaval" id="dias_feriado_carnaval" type="number"
							placeholder="Ingrese los días de feriado de Carnaval" />
					</b-form-group>
				</b-col>
				<b-col lg="">
					<b-form-group label="Días de Feriado Difuntos" label-for="dias_feriado_difuntos">
						<b-form-input v-model="formData.dias_feriado_difuntos" id="dias_feriado_difuntos" type="number"
							placeholder="Ingrese los días de feriado de Difuntos" />
					</b-form-group>
				</b-col>
				<b-col lg="">
					<b-form-group label="Días de Descuento" label-for="dias_descuento">
						<b-form-input v-model="formData.dias_descuento" id="dias_descuento" type="number"
							placeholder="Ingrese los días de descuento" />
					</b-form-group>
				</b-col>

			</b-row>
		</b-card>
		<div class="row justify-content-between m-1" v-if="!formData.users_id">
			<b-button @click="prevStep" variant="light">
				<i class="fa fa-arrow-left"></i>
				Anterior
			</b-button>
			<b-button @click="nextStep" variant="primary" :disabled="!isFormValid">
				Siguiente
				<i class="fa fa-arrow-right"></i>
			</b-button>
		</div>
	</div>
</template>

<script>
import CatalogoServices from "../../../../../../src/services/profiles/catalogos/catalogosServices"
import DepartamentoService from "../../../../../../src/services/profiles/departamento/DepartamentoServices"
import PositionService from "../../../../../../src/services/profiles/posiciondepartamento/PosicionDepartamentoServices"
import BancosService from "../../../../../../src/services/profiles/bancos/BancosServices"
export default {
	props: ['formData', 'title'],
	data() {
		return {
			empresaOptions: [],
			departamentosOptions: [],
			cargosOptions: [],
			tipoContratoOptions: [],
			bandaPuestosOptions: [],
			operadoresOptions: [],
			condicionalDecimosOptions: [],
			formaPagoOptions: [],
			bancosOptions: [],
			tipoCuentaOptions: [],
			filteredCargos: [],
			isFormValid: false, // Agrega esta propiedad
		};
	},
	computed: {
		filteredCargosOptions() {
			return this.filteredCargos;
		},
	},
	methods: {
		prevStep() {
			this.$emit('prev');
		},
		nextStep() {
			if (this.isFormValid) {
				this.$emit('next');
			} else {
				// Manejar el caso en que el formulario no es válido
			}
		},
		getEmpresas() {

			CatalogoServices.getCatalogosByCodigo(13)
				.then(response => {
					this.empresaOptions = response.data.data.map(empresa => ({
						value: empresa.id, // Utiliza "valor" como el valor de la opción
						text: empresa.valor, // Utiliza "valor" como el texto de la opción
					}));
				})
				.catch(error => {
					console.log(error);
				});
		},
		getDepartamentos() {

			DepartamentoService.getEstructuraOrganizacional()
				.then(response => {
					this.departamentosOptions = response.data.data.map(empresa => ({
						value: empresa.id, // Utiliza "valor" como el valor de la opción
						text: empresa.departamento, // Utiliza "valor" como el texto de la opción
					}));
				})
				.catch(error => {
					console.log(error);
				});
		},
		getPositions() {

			PositionService.getPosicionDepartamento()
				.then(response => {
					this.cargosOptions = response.data.data.map(empresa => ({
						value: empresa.id, // Utiliza "valor" como el valor de la opción
						text: empresa.posicion, // Utiliza "valor" como el texto de la opción
						departamento_id: empresa.departamento_id, // Utiliza "valor" como el texto de la opción
						departamento: empresa.departamento, // Utiliza "valor" como el texto de la opción
					}))
					if (this.formData.cargo_id !== null && this.formData.cargo_id !== undefined) {
						this.filterPositions(); // Llama a filterPositions para filtrar las opciones de cargo
					};
				})
				.catch(error => {
					console.log(error);
				});
		},
		getTipoContrato() {

			CatalogoServices.getCatalogosByCodigo(12)
				.then(response => {
					this.tipoContratoOptions = response.data.data.map(contrato => ({
						value: contrato.id, // Utiliza "valor" como el valor de la opción
						text: contrato.valor, // Utiliza "valor" como el texto de la opción
					}));
				})
				.catch(error => {
					console.log(error);
				});
		},
		getBandaSalarial() {

			CatalogoServices.getCatalogosByCodigo(8)
				.then(response => {
					this.bandaPuestosOptions = response.data.data.map(puesto => ({
						value: puesto.id, // Utiliza "valor" como el valor de la opción
						text: puesto.valor, // Utiliza "valor" como el texto de la opción
					}));
				})
				.catch(error => {
					console.log(error);
				});
		},
		getCondicionDecimos() {

			CatalogoServices.getCatalogosByCodigo(16)
				.then(response => {
					this.condicionalDecimosOptions = response.data.data.map(decimos => ({
						value: decimos.id, // Utiliza "valor" como el valor de la opción
						text: decimos.valor, // Utiliza "valor" como el texto de la opción
					}));
				})
				.catch(error => {
					console.log(error);
				});
		},
		getOperadores() {

			DepartamentoService.getColaboradores()
				.then(response => {
					const filteredOperadores = response.data.data.filter(operador => operador.departamento_id === 6);

					this.operadoresOptions = filteredOperadores.map(operador => ({
						value: operador.id,
						text: operador.nombre_colaborador,
					}));
				})
				.catch(error => {
					console.log(error);
				});
		},
		getBancos() {

			BancosService.getBancos()
				.then(response => {

					this.bancosOptions = response.data.data.map(bancos => ({
						value: bancos.id,
						text: bancos.banco,
					}));
				})
				.catch(error => {
					console.log(error);
				});
		},
		getFormaPagos() {

			CatalogoServices.getCatalogosByCodigo(22)
				.then(response => {
					this.formaPagoOptions = response.data.data.map(pagos => ({
						value: pagos.id, // Utiliza "valor" como el valor de la opción
						text: pagos.valor, // Utiliza "valor" como el texto de la opción
					}));
				})
				.catch(error => {
					console.log(error);
				});
		},
		getTipoCuenta() {

			CatalogoServices.getCatalogosByCodigo(24)
				.then(response => {
					this.tipoCuentaOptions = response.data.data.map(pagos => ({
						value: pagos.id, // Utiliza "valor" como el valor de la opción
						text: pagos.valor, // Utiliza "valor" como el texto de la opción
					}));
				})
				.catch(error => {
					console.log(error);
				});
		},
		filterPositions() {
			const selectedDepartamentoId = this.formData.departamento_id;
			if (selectedDepartamentoId) {
				// Filtra las posiciones basadas en el departamento seleccionado
				this.filteredCargos = this.cargosOptions.filter(cargo => cargo.departamento_id === selectedDepartamentoId);
			} else {
				// Si no se ha seleccionado un departamento, muestra todas las posiciones
				this.filteredCargos = this.cargosOptions;
			}
		},
		validateForm() {
			// Verifica si todos los campos requeridos están completos
			if (
				this.formData.empresa &&
				this.formData.departamento_id &&
				this.formData.cargo_id &&
				this.formData.tipo_contrato &&
				this.formData.banda_salarial &&
				this.formData.forma_pago
			) {
				if (this.formData.forma_pago === 1) {
					// Si forma_pago es igual a 1, llama a una función para validar campos adicionales
					this.validateAdditionalFields();
				} else {
					this.isFormValid = true;
				}
			} else {
				this.isFormValid = false;
			}
		},
		validateAdditionalFields() {
			// Valida campos adicionales si forma_pago es igual a 1
			if (
				this.formData.banco &&
				this.formData.tipo_cuenta &&
				this.formData.numero_cuenta
			) {
				this.isFormValid = true;
			} else {
				this.isFormValid = false;
			}
		},
	},
	mounted() {
		this.getEmpresas();
		this.getDepartamentos();
		this.getPositions();
		this.getTipoContrato();
		this.getBandaSalarial();
		this.getCondicionDecimos();
		this.getOperadores();
		this.getFormaPagos();
		this.getBancos();
		this.getTipoCuenta();

		this.validateForm();
	},
	watch: {
		formData: {
			deep: true,
			handler: 'validateForm',
		},
	},
};
</script>
