<template>
	<div>
		<misreconocimientos :id="loggedUser" />
	</div>
</template>

<script>
import misreconocimientos from './../reconocimientos/MisReconocimientos.vue';
import { mapGetters } from "vuex";
export default {
	props: ['datosPestana1'],
	name: 'Pestana1Component',
	components: {
		misreconocimientos
	},
	data() {
		return {
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





	async mounted() {
		this.userData = this.currentUserVariable.perfilData;
	}

};
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>
