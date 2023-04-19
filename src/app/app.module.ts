import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebsiteModule } from './modules/routing/website/website.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthStoreModule } from '@routing/auth/store/auth.store.module';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './modules/routing/website/guards/auth.guard';
import { AdminGuestGuard } from './modules/routing/website/guards/adming-guest.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    WebsiteModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    AuthStoreModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: (request) => request as any,
      },
    }),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
