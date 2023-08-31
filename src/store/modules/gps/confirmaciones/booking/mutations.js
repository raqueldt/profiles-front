

export const setBooking = ( state, booking ) => {

  state.booking = booking

}

export const setEditMode = ( state, mode ) => {

  state.isEditMode = mode

}

export const updateSlotRate = ( state, slot ) => {

  const indice = state.booking.slots.map( e => e.bosId ).indexOf( slot.bosId )

  state.booking.slots[indice]['bosGrossRate'] = slot.bosGrossRate
  state.booking.slots[indice]['bosNetRate'] = slot.bosNetRate
  state.booking.slots[indice]['updated_at'] = slot.updated_at

}


export const updateChildrenDiscount = ( state, booking ) => {

  state.booking.booking.bokChildrenDiscount = booking.bokChildrenDiscount

}


/*
export const resetState = ( state ) => {

  state.booking = []
  state.slots = []
  state.slots = null
  state.isEditMode = false

}
*/
