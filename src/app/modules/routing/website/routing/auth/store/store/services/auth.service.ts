import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthData } from '@auth-store/interfaces/authData.interface';
import { select, Store } from '@ngrx/store';
import {
  getAuthData,
  isAuth,
} from '@auth-store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth$ = this.store$.pipe(
    select(getAuthData),
    filter((authData) => authData !== undefined),
    map((authData) => !!authData),
  );

  isGuest$ = this.isAuth$.pipe(map((isAuth) => !isAuth));
  private baseUrl: string = 'http://localhost:3000';
  login(body: {
    login: string;
    password: string | null;
  }): Observable<AuthData> {
    const url: string = this.baseUrl + '/auth/login';

    return this.httpClient
      .post<{ token: string }>(url, body)
      .pipe(
        map((res) => ({
          ...res,
          ...this.jwtHelper.decodeToken(res.token),
        })),
      );
  }
  refreshToken(): Observable<AuthData> {
    const url: string = this.baseUrl + '/auth/refresh';
    return this.httpClient
      .post<{ token: string }>(url, {})
      .pipe(
        map((res) => ({
          ...res,
          ...this.jwtHelper.decodeToken(res.token),
        })),
      );
  }
  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    private store$: Store,
  ) {}
}
