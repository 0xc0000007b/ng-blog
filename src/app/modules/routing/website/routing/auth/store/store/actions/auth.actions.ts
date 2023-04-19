import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from './ActionTypes';
import { AuthData } from '@auth-store/interfaces/authData.interface';

export const loginAction = createAction(
  AuthActionTypes.loginAction,
  props<{ login: string; password: string }>(),
);
export const loginSuccessAction = createAction(
  AuthActionTypes.loginSuccessAction,
  props<{ authData: AuthData }>(),
);

export const loginFailedAction = createAction(
  AuthActionTypes.loginFailedAction,
  props<{ serverError: string }>(),
);
export const initAuthAction = createAction(
  AuthActionTypes.initAuthAction,
);
export const logoutAction = createAction(
  AuthActionTypes.logoutAction,
);
export const logoutSuccessAction = createAction(
  AuthActionTypes.logoutSuccessAction,
);
export const extractTokenAction = createAction(
  AuthActionTypes.extractTokenAction,
);
