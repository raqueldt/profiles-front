<template>
	<div>
		{{ loggedUser }}

		<b-container fluid>
			<b-row>
				Administrador del rol de pagos <br>

				VISTA: Carga masiva de registros de rol de pagos
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
	name: "GeneralPerfil",
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
