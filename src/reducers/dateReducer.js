import config from "../config"

const getFulldate = (day, month, year) => {
  if(day) day = day.toString()
  if(month) month = month.toString()
  if(day && day.length === 1) day = "0" + day
  if(month && month.length === 1) month = "0" + month
  if(year === null) return null
  if(month === null) return year
  if(day === null) return year + "-" + month
  return year + "-" + month + "-" + day
}

const dateReducer = (state, action) => {
  switch(action.type) {
    case config.RDX_SETDAY:
      if(!action.payload) return state
      let day = parseInt(action.payload)
      if(day < 1 || day > 31) return state
      return {
        day: action.payload,
        month: state.month,
        year: state.year,
        fulldate: getFulldate(action.payload, state.month, state.year)
      }
    case config.RDX_SETMONTH:
      if(!action.payload) return state
      let month = parseInt(action.payload)
      if(month < 1 || month > 12) return state
      return {
        day: state.day,
        month: action.payload,
        year: state.year,
        fulldate: getFulldate(state.day, action.payload, state.year)
      }
    case config.RDX_SETYEAR:
      if(!action.payload) return state
      let year = parseInt(action.payload)
      if(year < 2021) return state
      return {
        day: state.day,
        month: state.month,
        year: action.payload,
        fulldate: getFulldate(state.day, state.month, action.payload)
      }
    case config.RDX_SETFULLDATE:
      if(!action.payload) return state
      let data = action.payload.split('-')
      return {
        day: data[2],
        month: data[1],
        year: data[0],
        fulldate: getFulldate(data[2], data[1], data[0])
      }
    case config.RDX_BACK:
      if(state.fulldate.length === 10) {
        let data = state.fulldate.slice(0, 7).split('-')
        return {
          day: null,
          month: data[1],
          year: data[0],
          fulldate: getFulldate(null, data[1], data[0])
        }
      }

      if(state.fulldate.length === 7) {
        let data = state.fulldate.slice(0, 4)
        return {
          day: null,
          month: null,
          year: data,
          fulldate: getFulldate(null, null, data)
        }
      }

      if(state.fulldate.length === 4) {
        return {
          day: null,
          month: null,
          year: null,
          fulldate: null
        }
      }

      return state
    default:
      return {
        day: null,
        month: null,
        year: null,
        fulldate: null
      }
  }
}

export default dateReducer