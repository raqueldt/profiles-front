<template>
	<div>
		{{ loggedUser }}

		<b-container fluid>
			<b-row>
				RESULTADOS BUSQUEDA <br>

				VISTA: BSUQUEDA USUARIOS O EMPRESAS
			</b-row>
			buscar
			<search></search>
		</b-container>

		<!-- <pre> {{ userData }} </pre> -->


	</div>
</div></template>

<script>
import { mapGetters } from "vuex";
import search from "../collectionSearch/collectionSearch.vue"

export default {
	components: {
		search
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
