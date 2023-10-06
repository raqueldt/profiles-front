<template>
	<div>
		<b-card>
			<header>
				<h4>Dirección</h4>
			</header>
			<b-row>
				<b-col lg="2" class="form-group">
					<label for="region" class="control-label">Region</label>
					<span class="text-danger">*</span>
					<b-form-select v-model="formData.region" id="region" :options="regionOptions"
						style="width:100%"></b-form-select>
				</b-col>
				<b-col lg="4">
					<b-form-group label-for="direccion">
						<label for="direccion" class="control-label">Dirección</label>
						<span class="text-danger">*</span>
						<b-form-input v-model="formData.direccion" id="direccion" placeholder="Ingrese su dirección" />
					</b-form-group>
				</b-col>
				<b-col lg="4">
					<b-form-group label="Referencia" label-for="referencia_direccion">
						<b-form-input v-model="formData.referencia_direccion" id="referencia_direccion"
							placeholder="Ingrese una referencia" />
					</b-form-group>
				</b-col>
				<b-col lg="2" class="form-group">
					<label for="sector" class="control-label">Sector</label>
					<span class="text-danger">*</span>
					<b-form-select v-model="formData.sector" id="sector" :options="sectorOptions"
						style="width:100%"></b-form-select>
				</b-col>
			</b-row>


		</b-card>
		<b-card>
			<header>
				<h4>Contacto</h4>
			</header>
			<b-row>
				<b-col lg="3">
					<b-form-group label-for="numero_contacto">
						<label for="numero_contacto" class="control-label">Número de Contacto</label>
						<span class="text-danger">*</span>
						<b-form-input v-model="formData.numero_contacto" id="numero_contacto" type="number"
							placeholder="Ingrese el número de contacto" />
					</b-form-group>
				</b-col>
				<b-col lg="2">
					<b-form-group label="Teléfono Convencional" label-for="telefono_convencional">
						<b-form-input v-model="formData.telefono_convencional" id="telefono_convencional" type="number"
							placeholder="Ingrese el teléfono convencional" />
					</b-form-group>
				</b-col>
				<b-col lg="2">
					<b-form-group label="Celular de Oficina" label-for="celular_oficina">
						<b-form-input v-model="formData.celular_oficina" id="celular_oficina" type="number"
							placeholder="Ingrese el celular de oficina" />
					</b-form-group>
				</b-col>
				<b-col lg="2">
					<b-form-group label="Extensión" label-for="extension">
						<b-form-input v-model="formData.extension" id="extension" type="number"
							placeholder="Ingrese la extensión" />
					</b-form-group>
				</b-col>

			</b-row>
		</b-card>
		<b-card>
			<header>
				<h4>Contacto emergencia</h4>
			</header>
			<b-row>
				<b-col lg="4">
					<b-form-group label-for="contacto_emergencia">
						<label for="contacto_emergencia" class="control-label">Nombre de Emergencia</label>
						<span class="text-danger">*</span>
						<b-form-input v-model="formData.contacto_emergencia" id="contacto_emergencia" type="text"
							placeholder="Ingrese el nombre de emergencia" />
					</b-form-group>
				</b-col>
				<b-col lg="4">
					<b-form-group label-for="numero_emergencia">
						<label for="numero_emergencia" class="control-label">Número de Emergencia</label>
						<span class="text-danger">*</span>
						<b-form-input v-model="formData.numero_emergencia" id="numero_emergencia" type="number"
							placeholder="Ingrese el número de emergencia" />
					</b-form-group>
				</b-col>
				<b-col lg="4">
					<b-form-group label-for="direccion_emergencia">
						<label for="direccion_emergencia" class="control-label">Dirección de Emergencia</label>
						<span class="text-danger">*</span>
						<b-form-input v-model="formData.direccion_emergencia" id="direccion_emergencia" type="text"
							placeholder="Ingrese la dirección de emergencia" />
					</b-form-group>
				</b-col>


			</b-row>
		</b-card>
		<!-- Agrega campos y contenido para este paso -->
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
export default {
	props: ['formData', 'title'],
	data() {
		return {
			regionOptions: [],
			sectorOptions: [],
			isFormValid: false,
		}
	},
	methods: {
		prevStep() {
			this.$emit('prev');
		},
		nextStep() {
			if (this.isFormValid) {
				this.$emit('next');
			}
		},
		getRegiones() {
			CatalogoServices.getCatalogosByCodigo(18)
				.then(response => {
					this.regionOptions = response.data.data.map(empresa => ({
						value: empresa.id, // Utiliza "valor" como el valor de la opción
						text: empresa.valor, // Utiliza "valor" como el texto de la opción
					}));
				})
				.catch(error => {
					console.log(error);
				});
		},
		getSectores() {
			CatalogoServices.getCatalogosByCodigo(11)
				.then(response => {
					this.sectorOptions = response.data.data.map(sector => ({
						value: sector.id,
						text: sector.valor,
					}));
				})
				.catch(error => {
					console.log(error);
				});
		},
		validateForm() {
			if (
				this.formData.region &&
				this.formData.direccion &&
				this.formData.sector &&
				this.formData.numero_contacto &&
				this.formData.contacto_emergencia &&
				this.formData.numero_emergencia &&
				this.formData.direccion_emergencia

			) {
				this.isFormValid = true;
			} else {
				this.isFormValid = false;
			}
		},
	},
	mounted() {
		this.getRegiones();
		this.getSectores();
		this.validateForm();
	},
	watch: {
		formData: {
			deep: true,
			handler: 'validateForm', // Llama a la función de validación cuando cambie el formData
		},
	},
};
</script>
