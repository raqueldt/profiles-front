import axios from 'axios'
import moment from "moment";
import { apiUrl } from '../../../../constants/config'

import CotizacionDetalleServices from "../../../../services/gps/cotizaciondetalle/CotizacionDetalleServices.js";
import CotizacionesServices from "../../../../services/gps/cotizaciones/CotizacionesServices.js";
import ProductosServices from "../../../../services/gps/productos/ProductosServices.js";
import BookingSlotsServices from "../../../../services/gps/bookingslots/BookingSlotsServices.js";

const state = {
    rowConfirmaciones: "",
    selectedConfirmacionFechaInicio: null,
}

const getters = {
    getConfirmaciones: state => state.rowConfirmaciones,

    // getSelectedConfirmacionFechaInicio: state => state.selectedConfirmacionFechaInicio,

}

const mutations = {
    setConfirmaciones(state, rowConfirmaciones) {
        state.rowConfirmaciones = rowConfirmaciones
    },

    // setSelectedConfirmacionFechaInicio( state, fecha ) {   
    //     state.selectedCotizacionFechaInicio = fecha     
    // }    
    
}

const actions = {

 

   

}

export default {
    state,
    getters,
    mutations,
    actions
}
