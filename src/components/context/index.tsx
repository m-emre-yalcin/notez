import type {ReactNode} from 'react';
export type {
  AppState,
  ContextParams,
  Note,
  ActionProps,
  DispatchActions,
  DispatchProp,
  User,
} from './index.d';
import {ContextProps} from './index.d';
import {useReducer, createContext} from 'react';
import reducer from './reducer';
import initialState from './state';
import actions from './actions';

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => {},
  actions,
});

export const AppContextProvider = ({children}: AppContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch, actions}}>
      {children}
    </AppContext.Provider>
  );
};
