import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './components/not-found.page/not-found.page.component';
const routes: Route[] = [{ path: '**', component: NotFoundPageComponent }];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NotFoundModule {}
