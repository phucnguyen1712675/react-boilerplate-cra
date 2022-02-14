import { IAction } from 'interfaces';
import { createAction } from 'helpers';

const SET_AUTHENTICATED_ACTION_TYPE = 'SET_AUTH_STATUS';
const SET_LOADING_ACTION_TYPE = 'SET_LOADING';

// Reducer state type
export type AuthContextProviderState = {
  loading: boolean;
  error?: Error;
  authenticated: boolean;
};

// Action types
type SetAuthenticatedAction = IAction<
  typeof SET_AUTHENTICATED_ACTION_TYPE,
  boolean
>;
type SetLoadingAction = IAction<typeof SET_LOADING_ACTION_TYPE, boolean>;

// Union action
type AuthContextProviderActions = SetAuthenticatedAction | SetLoadingAction;

// Action creators
export const createSetAuthenticatedAction = (authenticated: boolean) =>
  createAction(SET_AUTHENTICATED_ACTION_TYPE, authenticated);
export const createSetLoadingAction = (loading: boolean) =>
  createAction(SET_LOADING_ACTION_TYPE, loading);

// Initial state
export const initialState = {
  loading: true,
  authenticated: false,
};

// Reducer
export const reducer = (
  state: AuthContextProviderState,
  action: AuthContextProviderActions
): AuthContextProviderState => {
  switch (action.type) {
    case SET_AUTHENTICATED_ACTION_TYPE:
      return {
        ...state,
        authenticated: action.payload as boolean,
      };
    case SET_LOADING_ACTION_TYPE:
      return {
        ...state,
        loading: action.payload as boolean,
      };

    default:
      return state;
  }
};
