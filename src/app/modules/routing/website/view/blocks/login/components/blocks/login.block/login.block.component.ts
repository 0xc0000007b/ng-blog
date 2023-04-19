import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { loginAction } from '@auth-store/actions/auth.actions';
import {
  getLoaded,
  getLoading,
  getErrors,
} from '@auth-store/selectors/auth.selectors';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'login-block',
  templateUrl: './login.block.component.html',
  styleUrls: ['./login.block.component.scss'],
})
export class LoginBlockComponent {
  loading$: Observable<boolean> = this.store$.pipe(
    select(getLoading),
  );
  loaded$: Observable<boolean> = this.store$.pipe(
    select(getLoaded),
  );
  serverError$: Observable<string> = this.store$.pipe(
    select(getErrors),
  );
  loggingIn(value: { password: string; login: string }) {
    console.log('from block event', value);
    this.store$.dispatch(loginAction(value));
  }
  constructor(
    private store$: Store,
    private httpClient: HttpClient,
  ) {}

  testProfile() {
    this.httpClient
      .get('http://localhost:3000/auth/profile')
      .subscribe(console.log);
  }
}
