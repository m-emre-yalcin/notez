import type { AppState } from './index.d'
import { firestore } from '../../services/firebase'

// Main state
export default {
  firestore,
  notes: [],
  loading: false,
  params: {
    start: null,
    limit: 8,
    isMax: false,
  },
} as AppState