import {
  createContext,
  useReducer,
  useContext,
  useMemo,
  ReactNode,
} from 'react';
import {
  AuthContextProviderState,
  reducer,
  initialState,
  createSetAuthenticatedAction,
  createSetLoadingAction,
} from 'services/auth/reducer';

interface IAuthContextType extends AuthContextProviderState {
  setAuthenticated: (_authenticated: boolean) => void;
  setLoading: (_loading: boolean) => void;
}

const AuthContext = createContext<IAuthContextType>({
  ...initialState,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAuthenticated: (_authenticated: boolean) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLoading: (_loading: boolean) => {},
});

type Props = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setAuthenticated = (status: boolean) =>
    dispatch(createSetAuthenticatedAction(status));

  const setLoading = (loading: boolean) =>
    dispatch(createSetLoadingAction(loading));

  const value = useMemo(
    () => ({
      ...state,
      setAuthenticated,
      setLoading,
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
