import { AuthState } from '../interfaces/authState.interface';
import { createReducer, on } from '@ngrx/store';
import {
  loginAction,
  loginFailedAction,
  loginSuccessAction,
  logoutAction,
} from '../actions/auth.actions';
import { AuthData } from '../interfaces/authData.interface';
export const AUTH_FEATURENAME = 'auth';
const initialState: AuthState = {
  loading: false,
  loaded: true,
  serverError: '',
};

export const AuthReducer = createReducer(
  initialState,
  on(
    loginAction,
    (state): AuthState => ({
      ...state,
      loading: true,
    }),
  ),
  on(
    loginSuccessAction,
    (state, { authData }): AuthState => ({
      ...state,
      loading: false,
      loaded: true,
      serverError: '',
      authData,
    }),
  ),
  on(
    loginFailedAction,
    (state, { serverError }): AuthState => ({
      ...state,
      loaded: true,
      loading: false,
      authData: null,
      serverError,
    }),
  ),
  on(
    logoutAction,
    (): AuthState => ({
      ...initialState,
      authData: null,
    }),
  ),
);
