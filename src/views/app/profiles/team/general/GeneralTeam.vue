<template>
	<div> jaja
{{ datos }}
</div>
</template>

<script>
import internoServices from "../../../../../services/profiles/interno/internoServices";
import { mapGetters } from "vuex";
import Card from '../../../../../components/UI/Card/Card.vue';
export default {
	components: {
		Card
	},
	name: "GeneralInterno",
	data() {
		return {
			datos: []
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
			try {
				const response = await internoServices.getAllUsers();
				this.datos = response.data.data;
			} catch (error) {
				console.error("Error:", error);
			}
		}
	},
	async mounted() {
		await this.getInfo();
	}
};
</script>
