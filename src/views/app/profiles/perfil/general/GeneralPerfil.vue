<template>
	<div>
		<!-- {{ loggedUser }}
    -->

		{{ empresa }}
		<b-container fluid>
			<b-row>
				<b-col md="5">
					<Card :title=datos.nombre_completo :imageSrc=currentUser.img :subtitle=datos.cargo :text=nombreEmpresa
						:adicional="[
							{ titulo: 'Departamento', texto: datos.departamento },
							{ titulo: 'Identificación', texto: datos.identificacion },
							{ titulo: 'Correo', texto: datos.email },
							{ titulo: 'Contacto', texto: datos.numero_contacto },
							{ titulo: 'Acumula décimos', texto: datos.acumula_decimos },
							{ titulo: 'Discapacidad', texto: datos.posee_discapacidad },
						]" />

					<b-card class="m-1">
						<b-row>
							<b-col class="text-center">
								<ButtonBasic variant="light" text="Editar" @click="handleClick" />
							</b-col>
						</b-row>
					</b-card>

				</b-col>
				<b-col md="7">

				<TabsDinamicas :tabs="pestanas" :datos="datos" />


				</b-col>
			</b-row>
		</b-container>


		<pre> {{ datos }} </pre>


	</div>
</div></template>

<script>
import perfilServices from "../../../../../services/profiles/perfil/perfilServices";
import catalogosServices from "../../../../../services/profiles/catalogos/catalogosServices";
import { mapGetters } from "vuex";
import Card from '../../../../../components/UI/Card/Card.vue';
import CardBasic from '../../../../../components/UI/Card/CardBasic.vue';
import ButtonBasic from '../../../../../components/UI/Button/ButtonBasic.vue';
import TabsDinamicas from '../../../../../components/UI/Tab/TabsDinamicas.vue';
import perfiles from '../../../../../components/UI/IndexSVG/svg';

import Pestana1Component from '../general/Pestana1Component.vue';


export default {
	components: {
		Card,
		CardBasic,
		ButtonBasic,
		TabsDinamicas,
		Pestana1Component
	},
	name: "GeneralPerfil",
	data() {
		return {
			datos: [],
			perfiles: perfiles,
			nombreEmpresa: '',
			pestanas: [
				{ nombre: 'Infomación general', component: Pestana1Component },
				{ nombre: 'Permisos', component: Pestana1Component },
				{ nombre: 'Documentos', component: Pestana1Component },
			]

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
				this.getEmpresa(this.datos.empresa);
			} catch (error) {
				console.error("Error:", error);
			}
		},
		async getEmpresa(idEmpresa) {
			try {
				const response = await catalogosServices.getCatalogosByCodigo(13);
				const empresaEncontrada = response.data.data.find(item => item.id === idEmpresa);

				if (empresaEncontrada) {
					this.nombreEmpresa = empresaEncontrada.valor;
					return empresaEncontrada.valor;
				} else {
					return null;
				}
			} catch (error) {
				console.error("Error:", error);
				throw error;
			}
		},

		getPerfilById(id) {
			return this.perfiles.find(perfil => perfil.id === id);
		},

		handleClick() {
			alert("Botón personalizado clicado");
		},
	},
	async mounted() {

		await this.getInfo();
		await this.getCatalogosByCodigo(this.datos.empresa);
	}
};
</script>
