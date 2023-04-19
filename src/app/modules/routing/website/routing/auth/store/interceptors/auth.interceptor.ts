import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  catchError,
  EMPTY,
  first,
  flatMap,
  Observable,
} from 'rxjs';
import { AuthService } from '@auth-store/services/auth.service';
import { select, Store } from '@ngrx/store';
import { getToken } from '@auth-store/selectors/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store$: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return this.store$.pipe(
      select(getToken),
      first(),
      flatMap((token) => {
        const authReq = token
          ? request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            })
          : request;
        return next.handle(authReq).pipe(
          catchError((err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                console.log('Redirect on Login');
                return EMPTY;
              }
            }
            throw err;
          }),
        );
      }),
    );
  }
}
