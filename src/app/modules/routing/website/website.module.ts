import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuestGuard } from './guards/adming-guest.guard';
import { Route, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import {
  DEFAULT_ROUTER_FEATURENAME,
  routerReducer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./routing/home/home.module').then(
        (module) => module.HomeModule,
      ),
  },
  {
    path: 'admin/auth',
    loadChildren: () =>
      import('./routing/auth/auth.module').then(
        (module) => module.AuthModule,
      ),
    canLoad: [AdminGuestGuard],
    canActivate: [AdminGuestGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./routing/admin/admin.module').then(
        (module) => module.AdminModule,
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./routing/not-found/not-found.module').then(
        (module) => module.NotFoundModule,
      ),
  },
];
@NgModule({
  declarations: [],
  providers: [AuthGuard, AdminGuestGuard],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    StoreModule.forFeature(
      DEFAULT_ROUTER_FEATURENAME,
      routerReducer,
    ),
  ],
})
export class WebsiteModule {}
