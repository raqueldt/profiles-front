import axios from 'axios'
import moment from "moment";
import { apiUrl } from '../../../../constants/config'

import AvailabilitySlotsServices from "../../../../services/gps/availabilityslots/availabilityslotsServices.js";
import BookingServices from "../../../../services/gps/booking/BookingServices.js";
import BookingSlotsServices from "../../../../services/gps/bookingslots/BookingSlotsServices.js";
import BookingRequestServices from "../../../../services/gps/bookingsRequest/bookingRequestServices.js";
import MailServices from "../../../../services/gps/mail/MailServices.js";

const state = {
    rowBookingsByCliIdAndReqId: [],
    requestCliId: "",
}

const getters = {
    getBookingsByCliIdAndReqId: state => state.rowBookingsByCliIdAndReqId,
    getRequestCliId: state => state.requestCliId,
}

const mutations = {
    setBookingsByCliIdAndReqId(state, rowBookingsByCliIdAndReqId) {
        state.rowBookingsByCliIdAndReqId = rowBookingsByCliIdAndReqId
    },
    setRequestCliId(state, requestCliId) {
        state.requestCliId = requestCliId
    },
    cleanRequestCliId(state, requestCliId) {
        state.requestCliId = ""
    },
}

const actions = {
    getBookingsByClientIdAndReqId({ commit }, reqId) { // a) Consulto API para traer posibles datos de bosStatus
        if (reqId) {
            return new Promise((resolve, reject) => {
                BookingRequestServices.getBookingsByClientIdAndReqId(reqId).then(response => {
                    resolve({ data: response.data.data });
                })
            })
        } else {
            console.log("No bookings for this reqId: " + reqId);
        }
    },

    getRequestByRequId({ commit }, reqId) {
        if (reqId) {
            return new Promise((resolve, reject) => {
                BookingRequestServices.getRequestByRequId(reqId).then(response => {
                    resolve({ data: response.data.data });
                })
            })
        } else {
            console.log("No request bye reqId: ");
        }
    },

    getBookingsSlotsByBokId({ commit }, bokId) { // a) Consulto API para traer posibles datos de bosStatus
        if (bokId) {
            return new Promise((resolve, reject) => {
                BookingRequestServices.getBookingsByClientIdAndReqId(bokId).then(response => {
                    resolve({ data: response.data.data });
                })
            })
        } else {
            console.log("No hay bookings: ");
        }
    },
    // Envio de Correo:
    sendQuotes({ commit }, rowBookingSlots) { // a) Consulto API para traer posibles datos de bosStatus
        return new Promise((resolve, reject) => {
            MailServices.sendQuotes(rowBookingSlots).then(response => {
                resolve({ data: response.data.data });
            })
        })
    },

    sendHold({ commit }, rowBookingSlots) { // a) Consulto API para traer posibles datos de bosStatus
        return new Promise((resolve, reject) => {
            MailServices.sendHold(rowBookingSlots).then(response => {
                resolve({ data: response.data.data });
            })
        })
    },

    updateStatusQuote({ commit }, reqId) { // a) Consulto API para traer posibles datos de bosStatus
        return new Promise((resolve, reject) => {
            BookingRequestServices.updateStatusQuote(reqId).then(response => {
                resolve({ data: response.data.data });
            })
        })
    },

    // Método para traer datos de tabla Bookings, y en AvailabilityDepartures habilitar botón para ir a QuoteAdmin
    getBookingsByReqId({ commit }, reqId) { // a) Consulto API para traer posibles datos de bosStatus
        if (reqId) {
            return new Promise((resolve, reject) => {
                BookingRequestServices.getBookingsByReqId(reqId).then(response => {
                    resolve({ data: response.data.data });
                })
            })
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}