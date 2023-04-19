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
import { getAuthData } from '@auth-store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private store$: Store,
    private adminAuthService: AuthService,
  ) {}
  isAuth = this.store$.pipe(
    select(getAuthData),
    filter((authData) => authData !== undefined),
    map((authData) => !!authData),
  );

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.isAuth) {
      this.router.parseUrl('/admin/');
    }
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[],
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.isAuth) {
      this.router.parseUrl('/admin/');
    }
    return true;
  }
}
