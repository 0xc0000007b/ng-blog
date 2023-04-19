import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './components/dashboard.page/dashboard.page.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [{ path: '', component: DashboardPageComponent }];

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
