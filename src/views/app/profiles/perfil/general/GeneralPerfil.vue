<template>
	<div>
		<!-- {{ loggedUser }}
    -->


		<b-container fluid>
			<b-row>
				<b-col md="6">
					<Card :title=datos.nombre_completo :imageSrc=currentUser.img :text=datos.cargo :adicional="[
						{ titulo: 'Identificación', texto: datos.identificacion },
						{ titulo: 'Contacto', texto: datos.numero_contacto },
						{ titulo: 'Título 3', texto: 'Texto 3' }
					]" />
					<b-row>
						<b-col>
							<CardBasic title="Departamento" :text=datos.departamento :svg="getPerfilById('users').svg" />
						</b-col>
						<b-col>
							<CardBasic title="Mi correo empresarial" :text=datos.email :svg="getPerfilById('correo').svg" />
						</b-col>

					</b-row>
				</b-col>
				<b-col md="6">
					<b-row>
						<b-col>
							<CardBasic title="Mi ingreso" :text=datos.fecha_ingreso_atc :svg="getPerfilById('date').svg" />
						</b-col>
						<b-col>
							<CardBasic title="Mi cumpleaños" :text=datos.fecha_nacimiento
								:svg="getPerfilById('birthday').svg" />
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

							<CardBasic title="Mi contrato" :text=datos.tipo_contrato_texto
								:svg="getPerfilById('contrato').svg" />
						</b-col>

					</b-row>
					<b-row>
						<b-col v-if="!datos.codigo_37">
							<CardBasic title="S37" :text=datos.extension :svg="getPerfilById('s37').svg" />
						</b-col>
						<b-col>
							<CardBasic title="Biométrico" :text=datos.id_biometrico
								:svg="getPerfilById('biometrico').svg" />
						</b-col>
						<b-col>
							<CardBasic title="Mi correo" :text=datos.email_personal :svg="getPerfilById('correo').svg" />
						</b-col>
					</b-row>
				</b-col>
			</b-row>
		</b-container>


		<pre> {{ datos }} </pre>
		<div class="container-fluid" hidden>





			<div class="row">
				<div class="col-6 m-1">
					<Card :title=datos.nombre_completo :imageSrc=currentUser.img :text=datos.cargo />

					<!-- {{ datos }} -->

					card
				</div>
			</div>
			<div class="col-6 m-1">
				<div class="row">
					<div class="col-md-4">

						<CardBasic title="Mi ingreso" :text=datos.fecha_ingreso_atc :svg="getPerfilById('date').svg" />

					</div>
					<div class="col-md-4">
						<CardBasic title="Mi cumpleaños" :text=datos.fecha_nacimiento
							:svg="getPerfilById('birthday').svg" />
					</div>
					<div class="col-md-4">
						<CardBasic title="Mi Extensión" :text=datos.extension :svg="getPerfilById('extension').svg" />
					</div>
				</div>
				<div class="card">
					dgdf
				</div>
			</div>
		</div>

	</div>
</div></template>

<script>
import perfilServices from "../../../../../services/profiles/perfil/perfilServices";
import { mapGetters } from "vuex";
import Card from '../../../../../components/UI/Card/Card.vue';
import CardBasic from '../../../../../components/UI/Card/CardBasic.vue';
import perfiles from '../../../../../components/UI/IndexSVG/svg';
export default {
	components: {
		Card,
		CardBasic
	},
	name: "GeneralPerfil",
	data() {
		return {
			users: [],
			otraVariable: null,
			datos: [],
			perfiles: perfiles,

		};
	},
	computed: {
		...mapGetters({
			currentUser: "currentUser"
		}),
		loggedUser: function () {
			return this.$store.state.user.currentUser["id"];
		}
	},
	methods: {

		async getInfo() {
			const params = {
				id: this.loggedUser
			};

			try {
				const response = await perfilServices.show(params);
				this.datos = response.data.data;
			} catch (error) {
				console.error("Error:", error);
			}
		},
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
		}
	},
	async mounted() {

		await this.getInfo();
	}
};
</script>
