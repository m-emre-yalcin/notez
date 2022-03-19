import type { AppState, Note, DispatchProp } from './index.d'

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
    case 'SET_MAX':
      return {
        ...state,
        params: {
          ...state.params,
          isMax: action.payload,
        },
      }
    case 'SET_NEW_START':
      return {
        ...state,
        params: {
          ...state.params,
          start: action.payload,
        }
      }
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [action.payload, ...state.notes]
      }
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map((note: Note) => {
          if (note.id === action.payload.id) {
            return action.payload
          }
          return note
        })
      }
    case 'RESET':
      return {
        ...state,
        notes: [],
        params: {
          ...state.params,
          start: null,
          isMax: false,
        },
        loading: false
      }
    default:
      return state
  }
}