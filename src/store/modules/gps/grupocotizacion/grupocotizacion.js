import axios from 'axios'
import moment from "moment";
import { apiUrl } from '../../../../constants/config'

import CotizacionDetalleServices from "../../../../services/gps/cotizaciondetalle/CotizacionDetalleServices.js";
import CotizacionesServices from "../../../../services/gps/cotizaciones/CotizacionesServices.js";
import ProductosServices from "../../../../services/gps/productos/ProductosServices.js";
import BookingSlotsServices from "../../../../services/gps/bookingslots/BookingSlotsServices.js";

const state = {
    rowGrupoCotizacion: "",
}

const getters = {
    getGrupoCotizacion: state => state.rowGrupoCotizacion,
}

const mutations = {
    setGrupoCotizacion(state, rowGrupoCotizacion) {
        state.rowGrupoCotizacion = rowGrupoCotizacion
    },
    
}

const actions = {

 

   

}

export default {
    state,
    getters,
    mutations,
    actions
}
