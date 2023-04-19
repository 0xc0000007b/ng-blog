import { NgModule } from '@angular/core';
import { HeaderBlockComponent } from './components/header.block/header.block.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthStoreModule } from '@routing/auth/store/auth.store.module';

@NgModule({
  declarations: [HeaderBlockComponent],
  exports: [HeaderBlockComponent],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class HeaderModule {}
