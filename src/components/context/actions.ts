import {
  collection,
  query,
  orderBy,
  where,
  startAfter,
  limit,
  getDocs,
  setDoc,
  doc,
  // onSnapshot,
} from 'firebase/firestore';
import type { AppActions, Note } from './index.d';

export default {
  getNotes: ({ state, dispatch }) => {
    if (!state.params.isMax) {
      dispatch({ type: 'SET_LOADING', payload: true });
      let q;

      // set the query
      if (state.params.start) {
        q = query(
          collection(state.firestore, 'notes/'),
          where('isTrashed', '==', false),
          orderBy('created_at', 'desc'),
          limit(state.params.limit),
          startAfter(state.params.start),
        );
      }
      else {
        q = query(
          collection(state.firestore, 'notes/'),
          where('isTrashed', '==', false),
          orderBy('created_at', 'desc'),
          limit(state.params.limit),
        );
      }

      // get the notes
      getDocs(q).then((querySnapshot: any) => {
        const data = [...state.notes];

        querySnapshot.forEach((doc: any) => {
          data.push(doc.data());
          dispatch({ type: 'SET_NEW_START', payload: doc });
        });

        dispatch({ type: 'SET_NOTES', payload: data });

        if (querySnapshot.docs.length < state.params.limit) state.params.isMax = true;
        else state.params.isMax = false;

        console.log(querySnapshot.docs.length, 'notes fetched', 'ismax:', state.params.isMax);
        dispatch({ type: 'SET_LOADING', payload: false });
      }).catch((error: any) => {
        console.log('Error getting documents: ', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      });
    } else {
      console.log('max');
      return
    }
  },
  addNote: ({ state, dispatch }) => {
    const note: Note = {
      id: Date.now(),
      title: '',
      content: '',
      color: '#fff',
      created_at: Date.now(),
      updated_at: Date.now(),
      isArchived: false,
      isPinned: false,
      isTrashed: false,
      user: null,
    };
    const q = doc(state.firestore, `/notes/${note.id}`);

    // add the note
    return setDoc(q, note).then(() => {
      console.log('note added:', note.id);
      dispatch({ type: 'ADD_NOTE', payload: note });
      return note
    });
  },
  searchNotes: ({ state, dispatch, actions }, searchText: string) => {
    if (searchText.length > 0) {
      dispatch({ type: 'SET_MAX', payload: true });
      dispatch({ type: 'SET_LOADING', payload: true });
      const q = query(
        collection(state.firestore, 'notes/'),
        where('isTrashed', '==', false),
        where('content', '>=', searchText),
        where('content', '<=', searchText + "\uf8ff"),
        // orderBy('content', 'desc'),
        limit(state.params.limit),
      );

      // get the notes
      getDocs(q).then((querySnapshot: any) => {
        const data = [];

        querySnapshot.forEach((doc: any) => {
          data.push(doc.data());
        });

        dispatch({ type: 'SET_NOTES', payload: data });
        dispatch({ type: 'SET_LOADING', payload: false });
        console.log('search:', querySnapshot.docs.length, 'notes fetched');
      })
    } else {
      dispatch({ type: 'RESET' });
      setTimeout(() => {
        actions.getNotes({ state, dispatch, actions })
      }, 500);
    }
  }
} as AppActions