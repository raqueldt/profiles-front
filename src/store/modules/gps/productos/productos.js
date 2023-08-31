import axios from 'axios'
import moment from "moment";
import { apiUrl } from '../../../../constants/config'

import AvailabilitySlotsServices from "../../../../services/gps/availabilityslots/availabilityslotsServices.js";
import ProductosServices from "../../../../services/gps/productos/ProductosServices.js";
import BookingSlotsServices from "../../../../services/gps/bookingslots/BookingSlotsServices.js";

const state = {
    rowProductos: [],
}

const getters = {
    getProductosRow: state => state.rowProductos,
}

const mutations = {
    setProductos(state, rowProductos) {
        state.rowProductos = rowProductos
    },
}

const actions = {
    getProductos({ commit }) {
        return new Promise((resolve, reject) => {
            ProductosServices.getProductos().then(response => {
                if (response.data.data.length > 0) {
                    commit('setProductos', response.data.data);
                    resolve();
                }
            })
        })
    },

}

export default {
    state,
    getters,
    mutations,
    actions
}