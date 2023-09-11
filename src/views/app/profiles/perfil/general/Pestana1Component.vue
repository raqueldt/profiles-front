<template>
	<div>
		<!-- {{ datos }} -->

		<b-row>
			<b-col>
				<CardBasic title="Mi ingreso" :text=datos.fecha_ingreso_atc :svg="getPerfilById('date').svg" />
			</b-col>
			<b-col>
				<CardBasic title="Mi cumpleaños" :text=datos.fecha_nacimiento :svg="getPerfilById('birthday').svg" />
			</b-col>
			<b-col md="3">
				<CardBasic title="Mi Ext." :text=datos.extension :svg="getPerfilById('extension').svg" />
			</b-col>
		</b-row>
		<b-row>

			<b-col>
				<CardBasic title="Días disponibles" :text="sumarValores({
					valor1: datos.dias_vacaciones,
					valor2: datos.dias_feriado_carnaval,
					valor3: datos.dias_feriado_difuntos,
					valor4: datos.dias_descuento
				})" :svg="getPerfilById('disponibles').svg" />
			</b-col>
			<b-col>

				<CardBasic title="Mi contrato" :text=datos.tipo_contrato_texto :svg="getPerfilById('contrato').svg" />
			</b-col>
			<b-col md="3" v-if="datos.codigo_37">
				<CardBasic title="S37" :text=datos.codigo_37 :svg="getPerfilById('s37').svg" />
			</b-col>

		</b-row>
		<b-row>
			<b-col>
				<CardBasic title="Biométrico" :text=datos.id_biometrico :svg="getPerfilById('biometrico').svg" />
			</b-col>
			<b-col md="6">
				<CardBasic title="Mi correo" :text=datos.email_personal :svg="getPerfilById('correo').svg" />
			</b-col>
			<b-col>
				<CardBasic title="Dirección" :text=datos.direccion :svg="getPerfilById('direccion').svg" />
			</b-col>

		</b-row>
		<div class="text-center bg-white m-1 text-muted">
			<span class="font-italic ">CONTACTO EMERGENCIA</span>
		</div>
		<b-row class="bg-white m-1 text-center">
			<b-col>
				<span>{{ datos.contacto_emergencia }}</span>
				<!-- <CardBasic title="Contacto" :text=datos.contacto_emergencia :svg="getPerfilById('llamada').svg" /> -->
			</b-col>
			<b-col>
				<span>{{ datos.direccion_emergencia }}</span>
				<!-- <CardBasic title="Dirección" :text=datos.direccion_emergencia :svg="getPerfilById('direccion').svg" /> -->
			</b-col>
			<b-col>
				<span>{{ datos.numero_emergencia }}</span>
				<!-- <CardBasic title="Número" :text=datos.numero_emergencia :svg="getPerfilById('llamada').svg" /> -->
			</b-col>

		</b-row>
	</div>
</template>

<script>
// import Card from '../../../../../components/UI/Card/Card.vue';
import CardBasic from '../../../../../components/UI/Card/CardBasic.vue';
import perfiles from '../../../../../components/UI/IndexSVG/svg';
export default {
	name: 'Pestana1Component',
	components: {
		CardBasic,
	},
	props: {
		datos: Object // Declaración de la prop datos
	},
	data() {
		return {
			perfiles: perfiles,
		}
	},
	methods: {
		getPerfilById(id) {
			return this.perfiles.find(perfil => perfil.id === id);
		},
		sumarValores(objeto) {
			const suma = parseFloat(objeto.valor1) + parseFloat(objeto.valor2) + parseFloat(objeto.valor3) + parseFloat(objeto.valor4);

			if (suma % 1 !== 0) {
				return suma.toFixed(2);
			} else {
				return suma.toString(); // Si es un número entero, devolver como string
			}
		},
	},
};
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>
