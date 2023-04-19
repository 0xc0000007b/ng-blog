import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoutAction } from '@auth-store/actions/auth.actions';

@Component({
  selector: 'header-block',
  templateUrl: './header.block.component.html',
  styleUrls: ['./header.block.component.scss'],
})
export class HeaderBlockComponent {
  constructor(private store$: Store) {}

  logOut() {
    this.store$.dispatch(logoutAction());
  }
}
