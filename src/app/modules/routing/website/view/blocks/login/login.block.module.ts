import { NgModule } from '@angular/core';
import { LoginBlockComponent } from './components/blocks/login.block/login.block.component';
import { LoginFormComponent } from './components/ui/login.form/login.form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [LoginBlockComponent, LoginFormComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
  ],
  exports: [LoginBlockComponent],
})
export class LoginBlockModule {}
