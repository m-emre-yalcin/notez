import type {ReactNode} from 'react';
export type {AppState, ContextParams, Note, ActionProps} from './index.d';
import {useReducer, createContext} from 'react';
import reducer from './reducer';
import initialState from './state';

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContext = createContext(initialState);
export const AppContextProvider = ({children}: AppContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
};
