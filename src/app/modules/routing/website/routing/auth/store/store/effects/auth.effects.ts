import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import {
  extractTokenAction,
  initAuthAction,
  loginAction,
  loginFailedAction,
  loginSuccessAction,
  logoutAction,
  logoutSuccessAction,
} from '../actions/auth.actions';
import {
  catchError,
  delay,
  delayWhen,
  distinctUntilChanged,
  filter,
  first,
  from,
  fromEvent,
  map,
  of,
  skip,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthData } from '@auth-store/interfaces/authData.interface';
import { select, Store } from '@ngrx/store';
import { isAuth } from '@auth-store/selectors/auth.selectors';

import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap((action) =>
        this.authService
          .login({
            login: action.login,
            password: action.password,
          })
          .pipe(
            map((authData) =>
              loginSuccessAction({ authData }),
            ),
            catchError((error) =>
              of(
                loginFailedAction({
                  serverError: error.message,
                }),
              ),
            ),
          ),
      ),
    ),
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccessAction),
      switchMap(({ authData }) =>
        timer(
          authData.exp
            ? authData.exp * 1000 - 60 * 1000 - Date.now()
            : 0,
        ),
      ),
      switchMap(() =>
        this.store$.pipe(
          select(isAuth),
          first(),
          filter((isAdminAuth) => isAdminAuth),
        ),
      ),
      switchMap(() => this.authService.refreshToken()),
      map((authData) => loginSuccessAction({ authData })),
    ),
  );

  saveAuthDataToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(({ authData }) => {
          localStorage.setItem(
            'authData',
            JSON.stringify(authData),
          );
        }),
      ),
    { dispatch: false },
  );

  extractLoginData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAuthAction, extractTokenAction),
      map(() => {
        const authDataString =
          localStorage.getItem('authData');
        if (!authDataString) {
          return logoutSuccessAction();
        }

        const authData: AuthData =
          JSON.parse(authDataString);

        if (
          (authData.exp
            ? authData.exp * 1000 - 60 * 1000 - Date.now()
            : 0) < 0
        ) {
          return logoutSuccessAction();
        }

        return loginSuccessAction({ authData });
      }),
    ),
  );

  listenStorageEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAuthAction),
      switchMap(() => fromEvent(window, 'storage')),
      map(() => extractTokenAction()),
    ),
  );
  listenAuthorizeEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(initAuthAction),
        switchMap(() => this.authService.isAuth$),
        distinctUntilChanged(),
        skip(1),
        tap((isAuthorized) => {
          console.log(isAuthorized);
          this.router.navigateByUrl(
            isAuthorized ? '/admin' : '/admin/auth/login',
          );
        }),
      ),
    { dispatch: false },
  );
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAction),
      map(() => {
        localStorage.removeItem('authData');
        return logoutSuccessAction();
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store$: Store,
    private router: Router,
  ) {}
}
