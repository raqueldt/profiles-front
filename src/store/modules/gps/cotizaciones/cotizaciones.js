import axios from 'axios'
import moment from "moment";
import { apiUrl } from '../../../../constants/config'

import CotizacionDetalleServices from "../../../../services/gps/cotizaciondetalle/CotizacionDetalleServices.js";
import CotizacionesServices from "../../../../services/gps/cotizaciones/CotizacionesServices.js";
import ProductosServices from "../../../../services/gps/productos/ProductosServices.js";
import BookingSlotsServices from "../../../../services/gps/bookingslots/BookingSlotsServices.js";

const state = {
    rowProductos: [],
}

const getters = {
    getProductos: state => state.rowProductos,
}

const mutations = {
    setProductos(state, rowProductos) {
        state.rowProductos = rowProductos
    },
}

const actions = {

    addCotizacionDetalle({ commit }, data) {
      return new Promise((resolve, reject) => {
          CotizacionDetalleServices.addCotizacionDetalle(data).then((response) => {
              resolve({ data: response.data.data });
          }).catch((error) => {
              console.log("Error: " + error);
          });
      })
    },


    getCotizacionDetalleBygctId({ commit }, gctId) { // a) Consulto API para traer posibles datos de bosStatus
      if (gctId) {
          return new Promise((resolve, reject) => {
            CotizacionesServices.getCotizacionDetalleBygctId(gctId).then(response => {
                  resolve({ data: response.data.data });
              })
          })
      } else {
          console.log("No bookings for this gctId: " + reqId);
      }
  },

}

export default {
    state,
    getters,
    mutations,
    actions
}
