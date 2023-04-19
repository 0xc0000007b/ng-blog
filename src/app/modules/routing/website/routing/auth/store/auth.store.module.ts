import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import {
  AUTH_FEATURENAME,
  AuthReducer,
} from '@auth-store/reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@auth-store/effects/auth.effects';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from '@angular/common/http';
import { AuthInterceptor } from '@routing/auth/store/interceptors/auth.interceptor';
import { initAuthAction } from '@auth-store/actions/auth.actions';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(AUTH_FEATURENAME, AuthReducer),
    EffectsModule.forFeature([AuthEffects]),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AuthStoreModule {
  constructor(store$: Store) {
    store$.dispatch(initAuthAction());
  }
}
