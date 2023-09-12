<template>
	<b-row class="h-100">
		<b-colxx xxs="12" md="10" class="mx-auto my-auto">
			<b-card class="auth-card" no-body>
				<div class="position-relative image-side text-center">
					<p class="text-white h2">PROFILES</p>
					<!-- <p class="white mb-0">
                    Please use your credentials to login.
                    <br />If you are not a member, please
                    <router-link tag="a" to="/user/register" class="white">register</router-link>.
                </p> -->
				</div>
				<div class="form-side">
					<center>
						<router-link tag="a" to="/">
							<span class="logo-single" />
						</router-link>
					</center>

					<!-- <h6 class="mb-4">{{ $t('user.login-title')}}</h6> -->

					<b-form @submit.stop.prevent="formSubmit" class="av-tooltip tooltip-label-bottom">
						<b-form-group :label="$t('user.username')" class="has-float-label mb-4">
							<b-form-input type="text" v-model="$v.form.username.$model" :state="!$v.form.username.$error"
								autocomplete="off" @keyup.enter="formSubmit" />
							<b-form-invalid-feedback v-if="!$v.form.username.required">Please enter your
								username</b-form-invalid-feedback>
							<b-form-invalid-feedback v-else-if="!$v.form.username.minLength">Your username must be minimum 4
								characters</b-form-invalid-feedback>
						</b-form-group>

						<b-form-group :label="$t('user.password')" class="has-float-label mb-4">
							<b-form-input type="password" v-model="$v.form.password.$model"
								:state="!$v.form.password.$error" @keyup.enter="formSubmit" />
							<b-form-invalid-feedback v-if="!$v.form.password.required">Please enter your
								password</b-form-invalid-feedback>
							<b-form-invalid-feedback
								v-else-if="!$v.form.password.minLength || !$v.form.password.maxLength">Your password must be
								between 4 and 16 characters</b-form-invalid-feedback>
						</b-form-group>
						<div class="d-flex justify-content-center align-items-center">

							<center>
								<b-button type="submit" variant="primary" size="lg" :disabled="!validateUsernameAndPassword"
									:class="{
										'btn-multiple-state btn-shadow': true,
										'show-spinner': processing,
										'show-success': !processing && loginError === false,
										'show-fail': !processing && loginError
									}">
									<span class="spinner d-inline-block">
										<span class="bounce1"></span>
										<span class="bounce2"></span>
										<span class="bounce3"></span>
									</span>
									<span class="icon success">
										<i class="simple-icon-check"></i>
									</span>
									<span class="icon fail">
										<i class="simple-icon-exclamation"></i>
									</span>
									<span class="label">{{ $t('user.login-button') }}</span>
								</b-button>
							</center>

						</div>
					</b-form>
				</div>
			</b-card>
		</b-colxx>
	</b-row>
</template>

<script>
import authServices from '../../../src/services/auth/authServices.js';
import perfilServices from '../../../src/services/profiles/perfil/perfilServices';
import axios from 'axios';
import {
	mapGetters,
	mapActions,
	mapMutations
} from "vuex";
import {
	validationMixin
} from "vuelidate";
import { log } from 'console';
const {
	required,
	maxLength,
	minLength,
	email,
	username
} = require("vuelidate/lib/validators");

export default {
	data() {
		return {
			form: {
				email: "",
				username: "",
				password: ""
			},
		};
	},
	mixins: [validationMixin],
	validations: {
		form: {
			password: {
				required,
				maxLength: maxLength(16),
				minLength: minLength(4)
			},
			email: {
				required,
				email,
				minLength: minLength(4)
			},
			username: {
				required,
				minLength: minLength(4)
			}
		}
	},
	computed: {
		...mapGetters(["currentUser", "processing", "loginError"]),
		validateUsernameAndPassword() {
			if (Boolean(this.$v.form.username.$model) && Boolean(this.$v.form.password.$model)) return true
			else return false
		}
	},
	methods: {
		...mapActions(["login"]),
		...mapMutations('auth-module', ['setAuthenticatedUser']),
		formSubmit() {
			//this.$v.$touch();

			//this.$v.form.$touch();this.$router.push('/app/dashboard');
			this.login({
				email: this.form.email,
				username: this.form.username,
				password: this.form.password
			}).then(response => {



				let data = {
					username: this.form.username,
					password: this.form.password,
				}
				const token = response.data.accessToken;
				localStorage.setItem('access_token', token);


				/* ************************  OBTENGO DATOS DE USER METODO USERINFO ************************/
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
				authServices
					.userinfo(data)
					.then(async response => {
						const perfilParams = {
							id: response.data.id
						};
						console.log("iffff", perfilParams);

						try {
							const perfilResponse = await perfilServices.show(perfilParams);
							console.log("Perfil Response:", perfilResponse);

							var now = new Date();
							const item = {
								id: response.data.id,
								title: response.data.name + " " + response.data.lastname,
								fullname: response.data.name + " " + response.data.lastname,
								img: response.data.img,
								email: response.data.email,
								comisionVoyager: response.data.comisionVoyager,
								permitirVoyager: response.data.permitirVoyager,
								permissions: response.data.permissions,
								roles: response.data.roles,
								date: now,
								jaja: 'jajaj',
								perfilData: perfilResponse.data.data // Agregar los datos del perfil aquí
							};

							// Guardar en el state y local storage
							this.setAuthenticatedUser(item);
							localStorage.setItem('user', JSON.stringify(item));
							this.$store.commit('setUser', item);

							// Redirigir al dashboard
							if (Boolean(item)) {
								this.$router.replace({ name: "dashboard" }).catch(err => { });
							}
						} catch (error) {
							console.error("Error al obtener información del perfil:", error);
						}
					})
					.catch(error => {
						console.log("Error: " + error);
					});

				/* ************************  FIN OBTENGO DATOS DE USER METODO USERINFO ************************/

				this.$router.push('/app/dashboard')
				let respuesta = response.status;
				console.log("Respuesta inicial" + JSON.stringify(response));
				if (respuesta === 200) {
					this.$router.push('/app/dashboard').catch(err => {
						console.log("Error en la ruta=> " + err);
					})
					this.$router.replace({ name: "dashboard" });
					console.log("Respuesta exitosa codigo 200" + respuesta)
					this.$router.replace({ name: "dashboard" }).catch(err => { })
					this.$store.commit("setAuthentication", true);
				}
				console.log("Respuesta NO exitosa codigo 200: " + respuesta)
				this.$router.replace({ name: "dashboard" }).catch(err => { })

			}).catch(error => {
				if (Boolean(error)) {
					if (Boolean(error.response)) {
						let respuesta = error.response.status;
						if (respuesta === 401) {
							this.clearFields();
						}
					}
				}
			});
		},
		clearFields() {
			this.form.username = "";
			this.form.password = "";
		},
	},
	watch: {
		currentUser(val) {


			console.log("login watch current user", val);


			return

			if (val && val.uid && val.uid.length > 0) {
				setTimeout(() => {
					this.$router.push("/");
				}, 200);
			}
		},
		loginError(val) {
			if (val != null) {
				this.$notify("error filled", "Login Error", val, {
					duration: 3500,
					permanent: false
				});
			}
		},

	},
	created() {
		console.log("login created");
	},
	mounted() {
		console.log("login mounted");
	}
};
</script>
