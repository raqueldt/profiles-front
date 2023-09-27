<template>
	<div>
		<!-- {{ loggedUser }} -->
<!--
		<b-container fluid>
			<b-row>
				<b-col lg="2">11</b-col>
				<b-col lg="6">
				</b-col>
			</b-row>

		</b-container> -->

					<muroAll></muroAll>

		<!-- <pre> {{ userData }} </pre> -->


	</div>
</div></template>

<script>
import { mapGetters } from "vuex";
import muroAll from '../muro/muro.vue';
// import muroItem from '../muro/muroItem.vue';
export default {
	components: {
		// muroItem,
		muroAll
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
