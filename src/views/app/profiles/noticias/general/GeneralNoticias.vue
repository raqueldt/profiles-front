<template>
	<div>
		<!-- {{ loggedUser }}    -->

		<b-container fluid>
			<b-row>
				Administrador del Muro
			</b-row>

		</b-container>


		<!-- <pre> {{ userData }} </pre> -->


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

// import Pestana4Component from '../general/Pestana4Component.vue';


export default {
	components: {
		Card,
		CardBasic,
		ButtonBasic,
		TabsDinamicas,
		// Pestana4Component,

	},
	name: "GeneralPerfil",
	data() {
		return {
			perfiles: perfiles,
			nombreEmpresa: '',
			pestanas: [
				{ nombre: 'Infomación general', component: Pestana1Component },
				{ nombre: 'Mis Solicitudes', component: Pestana2Component },
				{ nombre: 'Mis Documentos', component: Pestana3Component },
				{ nombre: 'Mi reconocimientos', component: Pestana4Component },
			],
			userData: []
		};
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
		this.userData = this.currentUserVariable.perfilData;
		this.getEmpresa(this.userData.empresa);
	}
};
</script>
