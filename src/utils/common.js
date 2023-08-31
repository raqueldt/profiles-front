import moment from "moment"


// texto para vigencia de promociones
export const getDayHumanized = ( date, from, to  ) => {

  const currentDate = moment(date).format('YYYY-MM-DD')

  // date es mayor a fecha final
  if ( moment(currentDate).isAfter(to) ) {
    return `Expired ${moment(to).from(currentDate)}`
  }
  // date es menor a fecha inicial
  if ( moment(currentDate).isBefore(from)) {
    return `Starting ${moment(from).from(currentDate)}`
  }
  // date esta dentro de rango inclusive
  if ( moment(currentDate).isBetween(from, to, null, []) ) {

    if ( moment(currentDate).isSame(to)) return "Expires today"

    return `Expires ${moment(to).from(currentDate)}`

  }

  return "not available"

}

// calcula numero de dias desde una fecha hasta otra
export const daysAfterToday = ( futureDate ) => {

  const today = moment( new Date()).format("YYYY-MM-DD")

  const future = moment(futureDate).format("YYYY-MM-DD")

  const duration = moment.duration(  moment(future).diff(moment(today))).asDays()

  return duration

}


//  agregar días hábiles a una fecha

export const addBusinessDays = ( dateFrom, numDaysToAdd) =>{

  const originalDate = moment(dateFrom)

  const Sunday = 0
  const Saturday = 6


  let daysRemaining = numDaysToAdd

  const futureDate = originalDate.clone()

  while (daysRemaining > 0) {

    futureDate.add(1, 'days')

    if ( futureDate.day() !== Sunday && futureDate.day() !== Saturday )
      daysRemaining--

  }

  return futureDate.toDate()

}

// calcular fecha de timelimit segun proximidad de la salida
export const resolveTimeLimit = ( bookingDate, daysBeforeDeparture) => {

  const dateFrom = moment(bookingDate).format("YYYY-MM-DD")
  let timeLimit = null

  if ( daysBeforeDeparture >= 29 )
    timeLimit = addBusinessDays(dateFrom, 5)  // + 5 días laborables

  if ( daysBeforeDeparture >= 15 && daysBeforeDeparture <= 28)
    timeLimit = moment(dateFrom).add(3, 'days').toDate() //'+72 horas / 3 días'

  if ( daysBeforeDeparture >=0 && daysBeforeDeparture <= 14 )
    timeLimit = moment(dateFrom).add(1, 'days').toDate() //'+24 horas / 1 día'

  // validar que fecha de timelimit no sea sabado
  if ( moment(timeLimit).day() == 6 )
    timeLimit = moment(timeLimit).add(2, 'days').toDate()
  // validar que fecha de timelimit no sea domingo
  if ( moment(timeLimit).day() == 0 )
    timeLimit = moment(timeLimit).add(1, 'days').toDate()

  return timeLimit ?? moment(dateFrom).toDate()

}


// devuelve valor numerico entero o decimal
export const resolveFormatNumber = ( value ) => {

  const valueABS = Math.abs(Number(value))
  const decimal = valueABS - Math.floor(valueABS)

  if ( decimal ) return valueABS // si tiene parte decimal

  return parseInt(valueABS) // si no tiene parte decimal

}


// devuelve nombre estado CONFIRMACIONES
export const resolveStatusConfirmation = ( status ) => {

  const statusText = {
     '0': 'Cancelled',
     '1': 'Active'
  }

  return statusText[status] ?? 'No available'

}


// devuelve nombre estado COTIZACIONES

export const resolveStatusQuote = ( status ) => {

  const statusText = {
     '0': 'Cancelled',
     '1': 'Active',
     '2': 'Confirm',
     '3': 'Expired'
     

     
  }

  return statusText[status] ?? 'No available'

}


