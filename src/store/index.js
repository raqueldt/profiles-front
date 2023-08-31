import Vue from 'vue'
import Vuex from 'vuex'

import app from '../main'
import menu from './modules/menu'
import user from './modules/user'
import chat from './modules/chat'
import todo from './modules/todo'
import survey from './modules/survey'
import availability from './modules/gps/availability/availability'

import slots from './modules/gps/bookings/slots'

import bookingRequest from './modules/gps/bookingRequest/bookingRequest'
import productos from './modules/gps/productos/productos'
import cotizaciones from './modules/gps/cotizaciones/cotizaciones'
import confirmaciones from './modules/gps/confirmaciones/confirmaciones'
import grupocotizacion from './modules/gps/grupocotizacion/grupocotizacion'

import cobranzas from './modules/gps/cobranzas/file-manager/records'

import pasajeros from './modules/gps/pasajeros'

import cobranzasCreditNotes from './modules/gps/cobranzas/file-manager/credit-notes'
import fileManager from './modules/gps/cobranzas/file-manager'
import collectionAdmin from './modules/gps/cobranzas/admin'

import salesProgress from './modules/gps/reports/sales-progress'
import financialAnalysis from './modules/gps/reports/financial-analysis'
import financialAnalysisWeeks from './modules/gps/reports/financial-analysis-weeks'
import salesbyTravel from './modules/gps/reports/sales-by-travel'
import clientAnalysis from './modules/gps/reports/client-analysis'
import boatclientAnalysis from './modules/gps/reports/boat-client-analysis'
import passengerAnalysis from './modules/gps/reports/passenger-analysis'
import yearToDate from './modules/gps/reports/year-to-date'
import itineraryResults from './modules/gps/reports/itinerary-results'
import cotizacion from './modules/gps/cotizaciones/cotizacion'
import confirmacion from './modules/gps/confirmaciones/confirmacion'
import bookingPrice from './modules/gps/confirmaciones/booking'
//2022-09-16 | fg | state para booking create
import booking from './modules/gps/bookings/booking'
//2022-09-26 | fg | state para disponibilidad general
import availabilityModule from './modules/gps/availability/availability/index.js'
//2023-02-16 | fg | state para reporte cruise-sales-overview
import cruiseSalesOverview from './modules/gps/reports/cruise-sales-overview'
//2023-03-01 | fg | state para auth user
import auth from './modules/gps/auth'




import { setCurrentLanguage } from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {
        changeLang(state, payload) {
            app.$i18n.locale = payload
            setCurrentLanguage(payload);
        }
    },
    actions: {
        setLang({ commit }, payload) {
            commit('changeLang', payload)
        }
    },

    modules: {
        menu,
        user,
        chat,
        todo,
        survey,

        availability,
        slots,
        bookingRequest,
        productos,
        cotizaciones,
        confirmaciones,
        grupocotizacion,

        pasajeros,
        cobranzas,
        cobranzasCreditNotes,
        fileManager,
        'collection-admin': collectionAdmin,
        'sales-progress': salesProgress,
        'financial-analysis': financialAnalysis,
        'financial-analysis-weeks': financialAnalysisWeeks,
        salesbyTravel,
        'client-analysis': clientAnalysis,
        'boat-client-analysis': boatclientAnalysis,
        'passenger-analysis': passengerAnalysis,
        'year-to-date': yearToDate,
        'itinerary-results': itineraryResults,
        'cotizacion': cotizacion,
        'confirmacion': confirmacion,
        'booking-price': bookingPrice,
        'booking-module': booking,
        'availability-module': availabilityModule,
        'cruise-sales-overview': cruiseSalesOverview,
        'auth-module': auth

    }
})
