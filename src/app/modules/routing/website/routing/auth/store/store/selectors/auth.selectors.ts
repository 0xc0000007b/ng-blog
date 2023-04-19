import {
  createFeatureSelector,
  createSelector,
  props,
} from '@ngrx/store';
import { AUTH_FEATURENAME } from '../reducers/auth.reducer';
import { AuthState } from '../interfaces/authState.interface';
import { AuthData } from '@auth-store/interfaces/authData.interface';

const getFeature = createFeatureSelector<AuthState>(
  AUTH_FEATURENAME,
);
export const getLoading = createSelector(
  getFeature,
  (state: AuthState) => state.loading,
);
export const getLoaded = createSelector(
  getFeature,
  (state: AuthState) => state.loaded,
);
export const getAuthData = createSelector(
  getFeature,
  (state: AuthState) => state.authData,
);
export const getToken = createSelector(
  getAuthData,
  (authData) => authData && authData.token,
);
export const isAuth = createSelector(
  getToken,
  (token) => !!token,
);
export const getErrors = createSelector(
  getFeature,
  (state: AuthState) => state.serverError,
);
