<template>
	<div>
		{{ loggedUser }}

		<b-container fluid>
			<b-row>
				Administrador FORMULARIOS 107<br>

				VISTA:SUBIR FORMULARIO 107 Y LISTA FORMS  107 POR Colaborador
			</b-row>

		</b-container>


		<!-- <pre> {{ userData }} </pre> -->


	</div>
</div></template>

<script>
import { mapGetters } from "vuex";

export default {
	components: {

	},
	name: "General",
	data() {
		return {
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


	},

	async mounted() {
		this.userData = this.currentUserVariable.perfilData;
	}
};
</script>
