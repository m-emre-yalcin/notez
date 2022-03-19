import type { AppState, DispatchProp } from './index.d'

export default (state: AppState, action: DispatchProp) => {
  switch (action.type) {
    case 'SET_NOTE':
      return {
        ...state,
        note: action.payload,
      }
    case 'SET_NOTES':
      return {
        ...state,
        notes: action.payload,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    case 'SET_NEW_START':
      return {
        ...state,
        params: {
          ...state.params,
          start: action.payload,
        }
      }
    case 'RESET':
      state.loading = false
      state.params.isMax = false
      state.params.start = null
      state.notes = []
      break;
    default:
      return state
  }
}