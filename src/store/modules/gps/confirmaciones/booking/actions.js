

import BookingServices from "@/services/gps/booking/BookingServices"
import BookingSlotsServices from "@/services/gps/bookingslots/BookingSlotsServices"


// cargar detalles del booking
export const loadBooking = async ( { commit }, id ) => {

  const { data } = await BookingServices.getBookingDetails( id )

  commit('setBooking', data )

}

// update slot rate
export const updateSlotRate = async ( { commit }, params ) => {

  const { data } = await BookingSlotsServices.updateSlotRate( params )

  commit('updateSlotRate', { ...data } )

}

// update children discount
export const updateChildrenDiscount = async ( { commit }, params ) => {

  const { data } = await BookingServices.updateChildrenDiscount( params )

  commit('updateChildrenDiscount', { ...data } )

}

