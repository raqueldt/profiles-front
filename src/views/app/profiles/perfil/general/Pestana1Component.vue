<template>
	<div>

		<b-row>
			<b-col>
				<CardBasic title="Mi ingreso" :text=userData.fecha_ingreso_atc :svg="getPerfilById('date').svg" />
			</b-col>
			<b-col>
				<CardBasic title="Mi cumpleaños" :text=userData.fecha_nacimiento :svg="getPerfilById('birthday').svg" />
			</b-col>
			<b-col md="3">
				<CardBasic title="Mi Ext." :text=userData.extension :svg="getPerfilById('extension').svg" />
			</b-col>
		</b-row>
		<b-row>

			<b-col>
				<CardBasic title="Días disponibles" :text="sumarValores({
					valor1: userData.dias_vacaciones,
					valor2: userData.dias_feriado_carnaval,
					valor3: userData.dias_feriado_difuntos,
					valor4: userData.dias_descuento
				})" :svg="getPerfilById('disponibles').svg" />
			</b-col>
			<b-col>

				<CardBasic title="Mi contrato" :text=userData.tipo_contrato_texto :svg="getPerfilById('contrato').svg" />
			</b-col>
			<b-col md="3" v-if="userData.codigo_37">
				<CardBasic title="S37" :text=userData.codigo_37 :svg="getPerfilById('s37').svg" />
			</b-col>

		</b-row>
		<b-row>
			<b-col>
				<CardBasic title="Biométrico" :text=userData.id_biometrico :svg="getPerfilById('biometrico').svg" />
			</b-col>
			<b-col md="6">
				<CardBasic title="Mi correo" :text=userData.email_personal :svg="getPerfilById('correo').svg" />
			</b-col>
			<b-col>
				<CardBasic title="Dirección" :text=userData.direccion :svg="getPerfilById('direccion').svg" />
			</b-col>

		</b-row>
		<div class="text-center bg-white m-1 text-muted">
			<span class="font-italic ">CONTACTO EMERGENCIA</span>
		</div>
		<b-row class="bg-white m-1 text-center">
			<b-col>
				<span>{{ userData.contacto_emergencia }}</span>
			</b-col>
			<b-col>
				<span>{{ userData.direccion_emergencia }}</span>
			</b-col>
			<b-col>
				<span>{{ userData.numero_emergencia }}</span>
			</b-col>

		</b-row>
	</div>
</template>


<script>
import CardBasic from '../../../../../components/UI/Card/CardBasic.vue';
import perfiles from '../../../../../components/UI/IndexSVG/svg';
import { mapGetters } from "vuex";
export default {
	props: ['datosPestana1'],
	name: 'Pestana1Component',
	components: {
		CardBasic,
	},
	data() {
		return {
			perfiles: perfiles,
			userData: [],
			nombreEmpresa: ''
		}
	},

	computed: {
		...mapGetters({
			currentUser: "currentUser"
		}),

		loggedUser: function () {
			return this.$store.state.user.currentUser["id"];
		},
		currentUserVariable() {
			return this.currentUser;
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
	async mounted() {
		this.userData = this.currentUserVariable.perfilData;
	}

};
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>
