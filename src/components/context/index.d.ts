import type { Firestore } from 'firebase/firestore';
export type AppState = {
  firestore?: Firestore;
  notes?: Array<Note>;
  loading?: boolean;
  params?: ContextParams;
  user?: User;
};

export type User = {
  name: string;
  email: string;
  avatar: string;
  password: string;
}

export type ContextParams = {
  start?: any;
  limit?: number;
  isMax?: boolean;
};

export type Note = {
  id: number;
  user: number | object;
  title: string;
  content: string;
  color: string;
  isPinned: boolean;
  isTrashed: boolean;
  isArchived: boolean;
  updated_at: number;
  created_at: number;
};

export type DispatchActions =
  'SET_NOTE' |
  'SET_NOTES' |
  'SET_LOADING' |
  'SET_NEW_START' |
  'RESET'

export type DispatchProp = {
  type: DispatchActions
  payload?: any,
}

export type ActionProps = {
  state: AppState
  dispatch: (action: DispatchProp) => void
}