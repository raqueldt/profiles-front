import firebase from 'firebase/app'
import 'firebase/auth'
import { currentUser, isAuthGuardActive } from '../../constants/config'
import { setCurrentUser, getCurrentUser } from '../../utils'

/* Importados */
import authServices from '../../../src/services/auth/authServices.js'
import axios from 'axios'
/* Fin Importados */

export default {
    state: {
        //currentUser: isAuthGuardActive ? getCurrentUser() : currentUser,
        currentUser: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null,
        loginError: null,
        processing: false,
        forgotMailSuccess: null,
        resetPasswordSuccess: null,
        token: null,
    },
    getters: {
        currentUser: state => state.currentUser,
        processing: state => state.processing,
        loginError: state => state.loginError,
        forgotMailSuccess: state => state.forgotMailSuccess,
        resetPasswordSuccess: state => state.resetPasswordSuccess,

        loggedIn(state) {
            return state.token !== null;
        }
    },
    mutations: {
        setUser(state, payload) {
            state.currentUser = payload
            state.processing = false
            state.loginError = null
        },
        setLogout(state) {
            state.currentUser = null
            state.processing = false
            state.loginError = null
        },
        setProcessing(state, payload) {
            state.processing = payload
            state.loginError = null
        },
        setError(state, payload) {
            state.loginError = payload
            state.currentUser = null
            state.processing = false
        },
        setForgotMailSuccess(state) {
            state.loginError = null
            state.currentUser = null
            state.processing = false
            state.forgotMailSuccess = true
        },
        setResetPasswordSuccess(state) {
            state.loginError = null
            state.currentUser = null
            state.processing = false
            state.resetPasswordSuccess = true
        },
        clearError(state) {
            state.loginError = null
        },

        // Tokens
        setToken(state, token) {
            state.token = token
        },
        destroyToken(state) {
            state.token = null
        }
    },
    actions: {

        login({ commit }, payload) {
            //************************************** METODO DEPRECATED ********************************************** */
            // Login.vue contiene la lógica para asignar datos del usuario a localstorage  */
            return new Promise((resolve, reject) => {
                let data = {
                    username: payload.username,
                    password: payload.password,
                }
                authServices.login(data)
                    .then(response => {
                        const token = response.data.accessToken;
                        localStorage.setItem('access_token', token);
                        /* ************************  OBTENGO DATOS DE USER METODO USERINFO ************************/
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                        authServices.userinfo(data)
                            .then(response => {
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
                                    date: now
                                }
                                localStorage.setItem('user', JSON.stringify(item))
                                commit('setUser', item)
                                return;
                            })
                            .catch(error => {
                                console.log("Error: " + error);
                                reject(error)
                            });
                        /* ************************  FIN OBTENGO DATOS DE USER METODO USERINFO ************************/

                        commit('setToken', { token: token })
                        resolve(response)
                    })
                    .catch(error => {
                        //commit('setError', error.message)
                        commit('setError', "Username or Password are incorrect. Please try again..!!")
                        console.log("Error en login: " + error);
                        reject(error)
                    });
            })
        },
        forgotPassword({ commit }, payload) {
            commit('clearError')
            commit('setProcessing', true)
            firebase
                .auth()
                .sendPasswordResetEmail(payload.email)
                .then(
                    user => {
                        commit('clearError')
                        commit('setForgotMailSuccess')
                    },
                    err => {
                        commit('setError', err.message)
                        setTimeout(() => {
                            commit('clearError')
                        }, 3000)
                    }
                )
        },
        resetPassword({ commit }, payload) {
            commit('clearError')
            commit('setProcessing', true)
            firebase
                .auth()
                .confirmPasswordReset(payload.resetPasswordCode, payload.newPassword)
                .then(
                    user => {
                        commit('clearError')
                        commit('setResetPasswordSuccess')
                    },
                    err => {
                        commit('setError', err.message)
                        setTimeout(() => {
                            commit('clearError')
                        }, 3000)
                    }
                )
        },

        // signOut({ commit }) {
        //     commit('destroyToken')
        //     setCurrentUser(null);
        // },
        signOut({ commit }) {

            commit('destroyToken')
            setCurrentUser(null);

            // ------------- Proceso para Logout  -------------
            var token = localStorage.getItem('access_token');
            if(Boolean(token)){
                    return new Promise((resolve, reject) => {
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                        authServices.logout()
                            .then(response => {
                                localStorage.setItem('access_token', null);
                                localStorage.clear();
                                resolve(response)
                            })
                            .catch(error => {
                                commit('setError', "Username or Password are incorrect. Please try again..!!")
                                console.log("Error en logout: " + error);
                                //window.location.reload();
                                reject(error)
                            });
                    })
            }else{
                this.$router.push("/user/login");
            }
                // ------------- Fin  Proceso para Logout  -------------
        },


    }
}