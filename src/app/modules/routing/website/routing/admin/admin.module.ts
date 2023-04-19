import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './routing/dashboard/dashboard.module';
import { Route, RouterModule } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { HeaderModule } from '@view/header/header.module';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    component: AdminPageComponent,
    loadChildren: () =>
      import('./routing/dashboard/dashboard.module').then(
        (module) => module.DashboardModule,
      ),
  },
];
@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    DashboardModule,
    CommonModule,
    RouterModule.forChild(routes),
    HeaderModule,
  ],
})
export class AdminModule {}
