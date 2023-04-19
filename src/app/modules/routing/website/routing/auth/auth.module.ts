import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login.page/login.page.component';
import { Route, RouterModule } from '@angular/router';
import { LoginBlockModule } from '@view/login/login.block.module';
import {
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginPageComponent },
];
@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LoginBlockModule,
    HttpClientModule,
  ],
  providers: [HttpClient],
})
export class AuthModule {}
