import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { filter, first, map, Observable } from 'rxjs';
import { AuthService } from '@auth-store/services/auth.service';
import { select, Store } from '@ngrx/store';
import {
  getAuthData,
  isAuth,
} from '@auth-store/selectors/auth.selectors';

@Injectable()
export class AdminGuestGuard
  implements CanActivate, CanLoad
{
  constructor(
    private router: Router,
    private store$: Store,
  ) {}
  isAuth$ = this.store$.pipe(
    select(getAuthData),
    filter((authData) => authData !== undefined),
    map((authData) => !!authData),
  );
  isGuest$ = this.isAuth$.pipe(map((isAuth) => !isAuth));
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.isGuest$) {
      this.router.parseUrl('/admin/auth/login');
    }
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.isGuest$) {
      this.router.parseUrl('/admin/auth/login');
    }
    return true;
  }
}
