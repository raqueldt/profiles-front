<template>
	<nav class="navbar fixed-top">
		<div class="container-fluid row justify-content-center m-1">

			<div class="row" style="width: 100%">


				<div class="content-vertical">
					<div class="vertical-word font-weight-bold text-muted">
						PROF
					</div>
				</div>
				<div class="col-2">
					<router-link class="navbar-logo ml-5" tag="a" :to="homeDefault">
						<span class=" d-none d-xs-block">
							<img src="/assets/logos/black.svg" alt="" height="45"></span>
						<span class="logo-mobile d-block d-xs-none"></span>
					</router-link>
				</div>
				<div class=" row justify-content-start ml-3 mr-5 mt-3 " style="position: relative; top: -1em;">
					<div v-for="(item, index) in  filteredMenuItems(menuItems) "
						:class="{ 'active': (selectedParentMenu === item.id && viewingParentMenu === '') || viewingParentMenu === item.id }"
						:key="`parent_${index}`" :data-flag="item.id">
						<a v-if="item.newWindow" :href="item.to" rel="noopener noreferrer" target="_blank">
							<i :class="item.icon" />
							{{ $t(item.label) }}

						</a>
						<router-link v-else @click.native="changeSelectedParentHasNoSubmenu(item.id)" :to="item.to">
							<div class="d-none d-xs-block text-center  " :style="{ 'top': '0em', 'position': 'relative' }">
								<button class="btn btn btn-block btn-sm  p-0" v-on:click="verificarSeleccion(item.id)"
									:style="[item.id == 'dashboard' ? { 'border-left-color': 'lightgray' } : '', item.id != 'dashboard' ? { 'border-right-color': 'lightgray' } : '']"
									style="border-radius: 0%; border-right-color: lightgray; color:gray"
									:class="{ 'bg-white text-secondary': (selectedParentMenu === item.id && viewingParentMenu === '') || viewingParentMenu === item.id }">
									<!-- {{ item.label }} -->
									<div v-if="item.icon == 'iconsminds-shop-4'" class="col" style="font-size: large; ">
										<i class="iconsminds-home"
											:style="[item.id == selectedParentMenu ? { 'color': '#ed7117' } : '', item.id != selectedParentMenu ? { 'color': 'lightgray' } : '']">
										</i>
									</div>
									<div v-else class="col" style="font-size: large; ">
										<i :class="item.icon"
											:style="[item.id == selectedParentMenu ? { 'color': '#ed7117' } : '', item.id != selectedParentMenu ? { 'color': 'lightgray' } : '']">
										</i>
									</div>
									<div class="col">
										<!-- <br> -->
										<label class="font-weight small mt-2"
											:class="{ 'text-primary': (selectedParentMenu === item.id && viewingParentMenu === '') || viewingParentMenu === item.id }">
											<!-- <span v-if="$t(item.id) == 'dashboard'">Home</span> -->

											<span>{{ $t(item.label) }}</span>

										</label>
										<span v-for="(subitem, index) in filteredMenuItems(submenuItemsreport)">
											<span v-if="$t(item.id) == subitem.id">
												<span v-if="seen && selectedParentMenu == item.id"
													:style="[item.id == selectedParentMenu ? { 'color': '#ed7117' } : '', item.id != selectedParentMenu ? { 'color': 'lightgray' } : '']"><b-icon-chevron-down></b-icon-chevron-down></span>
												<span v-if="!seen && selectedParentMenu == item.id"
													:style="[item.id == selectedParentMenu ? { 'color': '#ed7117' } : '', item.id != selectedParentMenu ? { 'color': 'lightgray' } : '']"><b-icon-chevron-up></b-icon-chevron-up></span>

											</span>
										</span>
										<span v-for="(subitem, index) in filteredMenuItems(submenuItemstthh)">
											<span v-if="$t(item.id) == subitem.id">
												<span v-if="seen2 && selectedParentMenu == item.id"
													:style="[item.id == selectedParentMenu ? { 'color': '#ed7117' } : '', item.id != selectedParentMenu ? { 'color': 'lightgray' } : '']"><b-icon-chevron-down></b-icon-chevron-down></span>
												<span v-if="!seen2 && selectedParentMenu == item.id"
													:style="[item.id == selectedParentMenu ? { 'color': '#ed7117' } : '', item.id != selectedParentMenu ? { 'color': 'lightgray' } : '']"><b-icon-chevron-up></b-icon-chevron-up></span>

											</span>
										</span>
									</div>
								</button>
								<!-- <small>{{ ruta }}</small><br>
								<small>{{ viewingParentMenu }}</small><br>
								<small>{{ selectedParentMenu }}</small> -->
								<div class="position-relative progress text-center">
									<div :class="{ 'progress-bar bg-primary': (ruta !== viewingParentMenu && selectedParentMenu === item.id && viewingParentMenu === '') || viewingParentMenu === item.id }"
										role="progressbar" style="width: 100%" aria-valuenow="25" aria-valuemin="0"
										aria-valuemax="100">
									</div>
								</div>
								<div class="div" v-for="(subitem, index) in filteredMenuItems(submenuItemsreport)">
									<div class="position-relative progress text-center">
										<!-- {{ subitem.id }} -->
										<div :class="{ 'progress-bar bg-primary': ruta !== viewingParentMenu && item.id == 'reports' && index == 0 && viewingParentMenu == '' }"
											role="progressbar" style="width: 100%" aria-valuenow="25" aria-valuemin="0"
											aria-valuemax="100">
										</div>

									</div>
								</div>
							</div>
							<!-- movil -->
							<div class="d-block d-xs-none">
								<div class="d-block d-xs-none "
									style="top: 1rem; position: relative;color: lightgray;font-size: small;   ">
									<button class="btn btn-sm" v-if="item.id !== 'dashboard'"
										:style="[item.id == 'dashboard' ? { 'border-left-color': 'lightgray' } : '', item.id != 'dashboard' ? { 'border-right-color': 'lightgray' } : '']"
										style="border-radius: 0%; border-right-color: lightgray; "
										:class="{ 'bg-white text-secondary': (selectedParentMenu === item.id && viewingParentMenu === '') || viewingParentMenu === item.id }">
										<div v-if="item.icon == 'iconsminds-shop-4'" style="font-size: small; ">
											<i class="iconsminds-home"
												:style="[item.id == selectedParentMenu ? { 'color': '#ed7117' } : '', item.id != selectedParentMenu ? { 'color': 'lightgray' } : '']">
											</i>
										</div>
										<div v-else style="font-size: small; ">
											<i :class="item.icon"
												:style="[item.id == selectedParentMenu ? { 'color': '#ed7117' } : '', item.id != selectedParentMenu ? { 'color': 'lightgray' } : '']">
											</i>
										</div>
									</button>
								</div>
							</div>

						</router-link>
					</div>
				</div>
				<div class="col d-none d-xs-block ml-5 text-right">
					<div class="position-relative d-none d-sm-inline-block">
						<div class="d-flex  border-light border-1 border-right">
							<!-- <div class="menu-button-mobile d-xs-block d-sm-block p-1 mt-2">
								<modal-snippets-copy-data> </modal-snippets-copy-data>
							</div> -->
							<div :class="{ 'search': true, 'mobile-view': isMobileSearch }" ref="searchContainer"
								@mouseenter="isSearchOver = true" @mouseleave="isSearchOver = false">

								<b-input :placeholder="$t('menu.search')" v-model="search" autocomplete="off" maxlength="15"
									@keyup.enter="handleSearch" />
								<span class="search-icon" @click="handleSearch">
									<i class="simple-icon-magnifier"></i>
								</span>
							</div>

							<div class="p-1 mt-2 ml-2">
								<router-link tag="a" :to="`${adminRoot}/instructivo`">
									<i class="glyph-icon iconsminds-files h6 m-0"
										v-tooltip="{ content: 'Instructivo', placement: 'top' }"></i>
								</router-link>
							</div>
							<div class="p-1 mt-2">
								<a variant="empty" class="header-icon btn-sm" @click="toggleFullScreen">
									<i style="color:gray"
										:class="{ 'd-inline-block': true, 'simple-icon-size-actual': fullScreen, 'simple-icon-size-fullscreen': !fullScreen }" />
								</a>
							</div>
						</div>

					</div>
				</div>

				<div class="row">

					<div class="user m-2 ">
						<b-dropdown class="dropdown-menu-right" right offset="25" variant="empty" toggle-class="p-0"
							menu-class="mt-1" no-caret>
							<template slot="button-content">
								<!-- <span class="name  fw-lighter medium"
									v-if="Boolean(currentUser)">{{ currentUser.fullname }}</span> -->
								<span v-if="Boolean(currentUser)">
									<img :alt="currentUser.title" :src="currentUser.img" style="margin-top: -10px" />
								</span>
							</template>
							<div>
								<b-dropdown-item>
									<router-link tag="a" :to="`${adminRoot}/perfil`">
										<div >
											{{ currentUser.fullname }}<br>
											<small>
												Mi perfil
											</small>
										</div>
									</router-link>
								</b-dropdown-item>
								<b-dropdown-item @click="logout">
									Sign out
								</b-dropdown-item>
							</div>
						</b-dropdown>
					</div>
					<div class="user m-2" hidden>

						<router-link tag="a" :to="`${adminRoot}/perfil`">
							{{ currentUser.fullname }}<br>
							<small>
								Colaborador
							</small>
						</router-link>

					</div>
				</div>
			</div>

			<b-card class="bg-light w-50" v-if="!seen2 && selectedParentMenu == 'tthh'">
				<div class=" justify-content-start ml-3 " style="position: relative; top: -1em;">
					<b-tabs content-class="mt-3 ">
						<b-tab :title=item.label :class="{ index: 0, 'active': 'active' }"
							v-for="( item, index ) in  filteredMenuItems(submenuItemstthh) ">
							<!-- {{ item }} -->
							<div class="row">
								<div class="col-md-4" v-for="( detail, index ) in  item.subs ">
									<span v-if="item.label == 'Publicación'"> <b-icon-check
											:class="{ 'bg-primary': ruta == detail.to }"></b-icon-check>

										<a :href=detail.to>{{ detail.label }}</a>

									</span>
									<span v-if="item.label == 'Actualización'"> <b-icon-arrow-right-short
											:class="{ 'bg-primary': ruta == detail.to }">
										</b-icon-arrow-right-short> <a :href=detail.to>
											<!-- Rol de pagos											{{ tthh=true }} -->
											{{ detail.label }}</a>
									</span>
									<span v-if="item.label == 'Descarga'"> <b-icon-arrow-right-short
											:class="{ 'bg-primary': ruta == detail.to }">
										</b-icon-arrow-right-short> <a :href=detail.to>
											<!-- Rol de pagos											{{ tthh=true }} -->
											{{ detail.label }}</a>
									</span>
								</div>
							</div>
						</b-tab>
					</b-tabs>
				</div>
			</b-card>
			<b-card class="bg-light w-40" v-if="!seen && selectedParentMenu == 'reports'">
				<div class=" justify-content-start ml-3 " style="position: relative; top: -1em;">
					<b-tabs content-class="mt-3 ">
						<!-- {{ report }} df -->
						<b-tab :title=item.label :class="{ index: 0, 'active': 'active' }"
							v-for="( item, index ) in  filteredMenuItems(submenuItemsreport) ">
							<div class="row">
								<div class="col-md-4" v-for="( detail, index ) in  item.subs ">
									<span v-if="item.label == 'Usuarios'"> <b-icon-check
											:class="{ 'bg-primary': ruta == detail.to }"></b-icon-check>

										<a :href=detail.to>{{ detail.label }}</a>

									</span>
									<span v-if="item.label == 'Procesos'"> <b-icon-arrow-right-short
											:class="{ 'bg-primary': ruta == detail.to }">
										</b-icon-arrow-right-short> <a :href=detail.to>
											<!-- {{ report=true }} -->
											{{ detail.label }}</a>
									</span>
								</div>
							</div>
						</b-tab>
					</b-tabs>
				</div>
			</b-card>

			<!-- {{ ruta }} ::::::: {{ viewingParentMenu }} -->
		</div>
	</nav>
</template>

<script>
import Switches from "vue-switches";
import notifications from "../../data/notifications";
import Horizontalbar from "./Horizontalbar";

import slots from './../../store/modules/gps/bookings/slots'

import { mapGetters, mapMutations, mapActions } from "vuex";
import { MenuIcon, MobileMenuIcon } from "../../components/Svg";
import {
	searchPath,
	menuHiddenBreakpoint,
	localeOptions,
	buyUrl,
	adminRoot
} from "../../constants/config";
import { getDirection, setDirection, getThemeColor, setThemeColor } from "../../utils";
import menuItems from "../../constants/menuHorizonal";
import submenuItemsreport from "../../constants/submenuReport";
import submenuItemstthh from "../../constants/submenuTalentoHumano";
export default {
	components: {
		"menu-icon": MenuIcon,
		"mobile-menu-icon": MobileMenuIcon,
		switches: Switches,
		Horizontalbar
	},
	data() {
		return {
			searchKeyword: "",
			isMobileSearch: false,
			isSearchOver: false,
			fullScreen: false,
			menuHiddenBreakpoint,
			searchPath,
			adminRoot,
			localeOptions,
			buyUrl,
			notifications,
			isDarkActive: false,
			menuItems,
			submenuItemsreport,
			submenuItemstthh,
			selectedParentMenu: "",
			mostrarIcono: false,
			homeDefault: '/app/dashboard',
			search: null,
			seen: true,
			seen2: true,
			ruta: '',
			report: '',
			tthh: ''
		};
	},
	methods: {
		verificarSubmenu() {
			// ruta == detail.to
			console.log("incial", this.ruta);
		},
		verificarSeleccion(item) {
			if (item == 'reports') {
				this.seen = !this.seen;
			} else if (item == 'tthh') {
				this.seen2 = !this.seen2;
			} else {
				this.seen = true;
			}
		},
		updatemoreFilter() {
			this.mostrarIcono = !this.mostrarIcono;
		},
		changeSelectedParentHasNoSubmenu(parentMenu) {
			this.selectedParentMenu = parentMenu;
			this.viewingParentMenu = parentMenu;
			this.verificarSubmenu();
			this.changeSelectedMenuHasSubItems(false);
			this.changeSideMenuStatus({
				step: 0,
				classNames: this.menuType,
				selectedMenuHasSubItems: false,
			});
			this.ruta = window.location.pathname;
		},
		openSubMenu(e, menuItem) {
			const selectedParent = menuItem.id;
			const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
			this.changeSelectedMenuHasSubItems(hasSubMenu);
			if (!hasSubMenu) {
				this.viewingParentMenu = selectedParent;
				this.selectedParentMenu = selectedParent;
				this.toggle();
			} else {
				const currentClasses = this.menuType
					? this.menuType.split(" ").filter((x) => x !== "")
					: "";

				if (!currentClasses.includes("menu-mobile")) {
					if (
						currentClasses.includes("menu-sub-hidden") &&
						(this.menuClickCount === 2 || this.menuClickCount === 0)
					) {
						this.changeSideMenuStatus({
							step: 3,
							classNames: this.menuType,
							selectedMenuHasSubItems: hasSubMenu,
						});
					} else if (
						currentClasses.includes("menu-hidden") &&
						(this.menuClickCount === 1 || this.menuClickCount === 3)
					) {
						this.changeSideMenuStatus({
							step: 2,
							classNames: this.menuType,
							selectedMenuHasSubItems: hasSubMenu,
						});
					} else if (
						currentClasses.includes("menu-default") &&
						!currentClasses.includes("menu-sub-hidden") &&
						(this.menuClickCount === 1 || this.menuClickCount === 3)
					) {
						this.changeSideMenuStatus({
							step: 0,
							classNames: this.menuType,
							selectedMenuHasSubItems: hasSubMenu,
						});
					}
				} else {
					this.addMenuClassname({
						classname: "sub-show-temporary",
						currentClasses: this.menuType,
					});
				}
				this.viewingParentMenu = selectedParent;
			}
		},
		filteredMenuItems(menuItems) {
			return menuItems
				? menuItems.filter(
					(x) =>
						!x.roles || (x.roles && x.roles.includes(this.currentUser.role))
				)
				: [];
		},
		handleSearch() {

			this.$router.push({
				path: '/collection-search',
				query: { q: this.search }
			}).catch(() => { });


		},

		...mapMutations(["changeSideMenuStatus", "changeSideMenuForMobile", "changeSelectedMenuHasSubItems"]),
		...mapActions(["setLang", "signOut", "destroyToken"]),
		/*search() {
		  this.$router.push(`${this.searchPath}?search=${this.searchKeyword}`);
		  this.searchKeyword = "";
		},*/
		searchClick() {
			if (window.innerWidth < this.menuHiddenBreakpoint) {
				if (!this.isMobileSearch) {
					this.isMobileSearch = true;
				} else {
					this.handleSearch();
					this.isMobileSearch = false;
				}
			} else {
				this.handleSearch();
			}
		},
		handleDocumentforMobileSearch() {
			if (!this.isSearchOver) {
				this.isMobileSearch = false;
				this.searchKeyword = "";
			}
		},

		changeLocale(locale, direction) {
			const currentDirection = getDirection().direction;
			if (direction !== currentDirection) {
				setDirection(direction);
			}

			this.setLang(locale);
		},
		logout() {
			// this.signOut().then(() => {
			//   this.$router.push("/user/login");
			// });
			this.signOut().then(() => {
				this.$router.push("/user/login");
			}).catch(error => {
				this.$router.push("/user/login");
			});
		},

		toggleFullScreen() {
			const isInFullScreen = this.isInFullScreen();

			var docElm = document.documentElement;
			if (!isInFullScreen) {
				if (docElm.requestFullscreen) {
					docElm.requestFullscreen();
				} else if (docElm.mozRequestFullScreen) {
					docElm.mozRequestFullScreen();
				} else if (docElm.webkitRequestFullScreen) {
					docElm.webkitRequestFullScreen();
				} else if (docElm.msRequestFullscreen) {
					docElm.msRequestFullscreen();
				}
			} else {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
			}
			this.fullScreen = !isInFullScreen;
		},
		isInFullScreen() {
			return (
				(document.fullscreenElement && document.fullscreenElement !== null) ||
				(document.webkitFullscreenElement &&
					document.webkitFullscreenElement !== null) ||
				(document.mozFullScreenElement &&
					document.mozFullScreenElement !== null) ||
				(document.msFullscreenElement && document.msFullscreenElement !== null)
			);
		},
		getRowDataChoosenByDepId(depId) {
			var dataFiltered = this.getRowDataChossen.filter((p) => p.depId == depId);
			return dataFiltered;
		}
	},
	computed: {
		...mapGetters({
			currentUser: "currentUser",
			menuType: "getMenuType",
			menuClickCount: "getMenuClickCount",
			selectedMenuHasSubItems: "getSelectedMenuHasSubItems",
		}),

		// Añado propiedad computada para leer datos de Slots seleccionados
		getRowDataChossen: {
			get() { return this.$store.getters.getAllRowDataChoosen },
		},
		rowDataHeaderAndSummarySlots: {
			get() { return this.$store.getters.getRowDataHeaderAndSummarySlots },
		},


		// Fin Añado propiedad computada para leer datos de Slots seleccionados

	},
	beforeDestroy() {
		document.removeEventListener("click", this.handleDocumentforMobileSearch);
	},
	created() {
		const color = getThemeColor();
		this.isDarkActive = color.indexOf("dark") > -1;
		// this.changeSelectedParentHasNoSubmenu(window.location.pathname);
		this.changeSelectedParentHasNoSubmenu();
		this.verificarSubmenu();
		this.ruta = window.location.pathname;
	},
	watch: {
		"$i18n.locale"(to, from) {
			if (from !== to) {
				this.$router.go(this.$route.path);
			}
		},
		isDarkActive(val) {
			let color = getThemeColor();
			let isChange = false;
			if (val && color.indexOf("light") > -1) {
				isChange = true;
				color = color.replace("light", "dark");
			} else if (!val && color.indexOf("dark") > -1) {
				isChange = true;
				color = color.replace("dark", "light");
			}
			if (isChange) {
				setThemeColor(color);
				setTimeout(() => {
					window.location.reload();
				}, 500);
			}
		},
		isMobileSearch(val) {
			if (val) {
				document.addEventListener("click", this.handleDocumentforMobileSearch);
			} else {
				document.removeEventListener(
					"click",
					this.handleDocumentforMobileSearch
				);
			}
		},
	}
};
</script>
<style>
.content-vertical {
	position: absolute;
	text-transform: uppercase;
	font-size: 12px;
}

.vertical-word {
	width: 12px;
	word-wrap: break-word;
	text-align: center;
	line-height: 12px;
}
</style>