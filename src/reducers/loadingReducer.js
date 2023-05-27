import config from "../config"

const loadingReducer = (state, action) => {
  switch(action.type) {
    case config.RDX_LOADING:
      return {
        success: null,
        error: null,
        loading: true
      }
    case config.RDX_SUCCESS:
      return {
        success: action.payload || '',
        error: null,
        loading: false
      }
    case config.RDX_ERROR:
      return {
        success: null,
        error: action.payload || '',
        loading: false
      }
    default:
      return {
        success: null,
        error: null,
        loading: false
      }
  }
}

export default loadingReducer