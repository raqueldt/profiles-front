<template>
	<div>
		<!-- ENCABEZADO -->
		<b-row>
			<b-colxx xxs="12">
				<div class="d-flex justify-content-between">
					<div>
						<span>
							<h1 class="m-2">{{ $t("menu.collections") }}</h1> |
							<ul class="nav pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
								<ol class="breadcrumb">
									<!-- <li class="breadcrumb-item">
										<a href="/app" class="active" target="_self">{{
											$t("menu.home")
										}}</a>
									</li>  <li class="breadcrumb-item active">
										<span>{{ $t(tag) }}</span>
									</li> -->
									<li>
										<div class=" text-muted mr-3 " v-for="(item, index) in menuItems" :key="index">
											<span v-if="cambiar === item.rute">{{ item.name }}</span>
										</div>
									</li>
								</ol>
							</ul>
						</span>

						<div class="search-sm d-inline-block">
							<b-input placeholder="File search code" v-model="search" autocomplete="off" maxlength="50"
								@keyup.enter="handleSearch" />
						</div>

					</div>

					<!-- <div class="align-self-center">

					<b-dropdown
                          size="sm"
                          variant="link"
                          toggle-class="text-decoration-none"
                        >
                          <template #button-content>
                             <i class="glyph-icon simple-icon-settings" style="color:gray"></i>
                          </template>
                          <b-dropdown-item
                            href="#"
                            @click="showModalAdministrator()"
                            >Preferencias de Cobranzas
							</b-dropdown-item>
							<b-dropdown-item
                            href="#"
                            @click="showModalCuentasBancarias()"
                            >Cuentas Bancarias
							</b-dropdown-item>
                        </b-dropdown>
					</div> -->

					<div class="align-self-center">

						<span>
							<ul class="nav pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
								<ol class="breadcrumb">
									<li v-for="(item, index) in menuItems" class="m-2" :class="{ 'active': item.name }"
										:key="`parent_${index}`" :data-flag="item.id">
										<span v-if="item.rute == '/collection-dashboard'">
											<a :href="item.rute" target="_self">{{ item.name }}</a>
											<b-dropdown size="sm" variant="light">
												<b-dropdown-item :href="subitem.rute"
													v-for="(subitem, index) in submenuItems" key="index">
													{{ subitem.name }}
												</b-dropdown-item>
											</b-dropdown>
										</span>
										<span v-else>
											<a :href="item.rute" target="_self">{{ item.name }}</a>
										</span>
										<div class="progress" v-if="cambiar == item.rute">
											<div class="progress-bar" role="progressbar"
												style="width: 100%;background-color:#ed7117" aria-valuenow="25"
												aria-valuemin="0" aria-valuemax="100">
											</div>
										</div>

									</li>
								</ol>
							</ul>
						</span>


						<b-button class="border-0" variant="outline-primary" size="sm" @click="showModalAdministrator()">
							<i class="glyph-icon simple-icon-settings"></i>
						</b-button>



						<!-- MODAL ADMINISTRADOR DE COBRANZAS -->
						<b-modal ref="modal-administrator" size="md" title="Preferencias de cobranzas" ok-only
							ok-variant="secondary" ok-title="Close">
							<ModalCollectionAdministrator></ModalCollectionAdministrator>
						</b-modal>
						<!-- FIN MODAL ADMINISTRADOR DE COBRANZAS -->


					</div>
				</div>

				<div class="separator mb-2"></div>
			</b-colxx>
		</b-row>
		<!-- FIN ENCABEZADO -->

	</div>
</template>
<script>
import ModalCollectionAdministrator from '@/views/app/gps/collections/ModalCollectionAdministrator.vue'
import CuentasBancarias from '@/views/app/gps/collections/cuentasBancarias/CuentasBancarias.vue'

export default {

	props: ["tag"],
	components: {


		ModalCollectionAdministrator
	},

	data() {

		return {

			search: null,
			seleccionar1: false,
			menuItems: [
				{ name: "Dashboard", rute: "/collection-dashboard" },
				{ name: "Administrator", rute: "/collection-admin" },
				{ name: "File Manager", rute: "/collection-file-manager" },
				{ name: "Notas de crédito", rute: "/collection-notas-credito" }
			],
			submenuItems: [
				{ name: "Cobros recientes", rute: "/collection-recent-payments" },
				{ name: "Próximos vencimientos", rute: "/collection-payments-due" },
				{ name: "Pagos vencidos", rute: "/collection-overdue-payments" },
				{ name: "Pagos urgentes", rute: "/collection-urgent-payments" }
			],

			cambiar: ''
		}
	},

	methods: {

		handleSearch() {
			this.$router.push({ path: '/collection-search-file', query: { q: this.search } })
		},
		showModalAdministrator() {
			this.showAdministrator = true;
			this.$refs["modal-administrator"].show();
		},
		hideModal() {
			this.$refs["modal-administrator"].hide();
		},

		showModalAdministrator() {

			this.$refs["modal-administrator"].show();
		},
		hideModal() {
			this.$refs["modal-administrator"].hide();
		},

	},
	created() {
		this.cambiar = window.location.pathname
	},

};
</script>

<style></style>