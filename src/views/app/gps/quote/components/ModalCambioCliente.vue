<!-- Componente :- Modal accion para editar el cliente -->
<template>
	<div>
		<b-row class="my-1">
			<b-col sm="2">
				<label for="input-small">Client:</label>
			</b-col>
			<b-col sm="10">
				<v-select v-model="header.headerCompany" :options="filterCompany" placeholder="Select client"
					label="razon_social" item-value="header.headerCompany" item-text="razon_social" />
			</b-col>
		</b-row>
		<br />
		<b-row>
			<b-col sm="5"> </b-col>
			<div>
				<b-button v-if="detallecotizacionheader.clienteName" @click="updateCliente" variant="primary"
					class="mr-1">{{ $t("gps.pax.save-button") }}</b-button>
			</div>
		</b-row>
	</div>
</template>
<script>
import CotizacionesServices from "../../../../../services/gps/cotizaciones/CotizacionesServices.js";
import BookingServices from "../../../../../services/gps/booking/BookingServices.js";
import { mapGetters, mapMutations } from "vuex";
import vSelect from "vue-select";
import moment from "moment";
export default {
	props: ["cotId"],
	components: {
		"v-select": vSelect,
	},
	data() {
		return {
			detallecotizacionheader: [],
			detallecotizacionbooking: [],
			header: {
				headerCompany: [],
			},
			holdAnotherMode: false,
		};
	},
	computed: {
		...mapGetters("cotizacion", ["getChangeHeaderQuote"]),
		userId() {
			return this.$root.$loggedUserId;
		},
		filterCompany: {
			get() {
				return this.$store.getters.getInitialCompanyList;
			},
			set(value) {
				this.value = value;
			}
		},
	},

	methods: {
		...mapMutations("cotizacion", ["setChangeHeaderQuote"]),
		currentDateTime() {
			return moment();
		},
		checkFromStore() {

			var filterCompanyList = this.$store.getters.getInitialCompanyList;
			if (filterCompanyList.length > 0) {
				this.filterCompany = filterCompanyList;
			} else {
				this.$store.dispatch("getComisionGPS").then(() => {
					this.filterCompany = this.$store.getters.getInitialCompanyList;
				});
			}

			/* 3. Reviso si existen valores guardados previamente en la tienda (Company, Percent y Comision)
				 y los traigo. No aplico metodos set() y get() porque son excluyentes*/
			var companyStore = this.$store.getters.getCompanySecondaryFilters;
			var percentStore = this.$store.getters.getPorcentSecondaryFilters;
			var comisionStore = this.$store.getters.getComisionSecondaryFilters;

			if (companyStore.length > 0) {
				this.selectedFilterCompany = companyStore;
			}
			if (percentStore) {
				this.selectedFilterPercent = percentStore;
			}
			if (comisionStore) {
				this.selectedComision = comisionStore;
			}
		},
		cotizaciondetalles() {
			CotizacionesServices.cotizacionesdetalles(this.cotId)
				.then((response) => {
					this.detallecotizacionheader = response.data;
					this.detallecotizacionheader = this.detallecotizacionheader.shift();
					this.detallecotizacionbooking = this.detallecotizacionheader["booking"];
				})
				.catch((error) => {
					console.log(error);
				});
		},
		async updateCliente() {
			let data = {
				clientId : this.header.headerCompany.id,
				usuarioId: this.userId,
				cotId: this.cotId,
			};

			await CotizacionesServices.updateCliente(data)
				.then(async (response) => {
					let mensaje = response.data;

					var responseBooking = await this.updateClientBooking(this.header.headerCompany.id);

					if (mensaje.data == 200 && responseBooking == 200) {
						var type = "success filled";
						var title = "Success";
						var message = "Reference was updated successfully";
						this.$notify(type, title, message, {
							duration: 3000,
							permanent: false,
						});

						
					} else {
						var type = "error filled";
						var title = "Titulo";
						var message = "No update";
						this.$notify(type, title, message, {
							duration: 3000,
							permanent: false,
						});
					}
					this.$emit("hideModal");
					this.setChangeHeaderQuote(1);
				})
				.catch((error) => {
					console.log(error);
				});
		},

		async updateClientBooking(newClientId) {

			const dataToUpdate = {
				newClienteId: newClientId,
				bokId: this.detallecotizacionheader.booking.bokId
			};

			const { data: { data } } = await BookingServices.updateClient(dataToUpdate)

			if (data != 200) {
				this.$notify("error filled", "Error", "Error in update client in Booking", {
					duration: 3000,
					permanent: false,
				});
			} else {
					return data;
			}

		},		
	},
	mounted() {
		this.cotizaciondetalles();
		this.checkFromStore();
	},
};
</script>