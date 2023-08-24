import { UserAccountInfo } from './../models/users/user-account-info.model';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token = localStorage.getItem('authorizeToken');
    let userId = localStorage.getItem('userId');
    let userInfo: any;
    let adminRole: any = null;

    if (token == null || token == undefined) {
      this.router.navigate(['auth']);
    } else {
      sessionStorage.removeItem('userInfo');
      await this.authService.getUserInfo(userId).then((response) => {
        sessionStorage.setItem('userInfo', JSON.stringify(response));
      });

      userInfo = sessionStorage.getItem('userInfo');

      userInfo = JSON.parse(userInfo);

      adminRole = userInfo.roles.find(
        (role: { id: string; name: string }) =>
          role.id == 'e11f7947-d41d-461e-bc39-ccdf2164e7p1'
      );

      if (adminRole === null || adminRole === undefined) {
        this.router.navigate(['unauthorized']);
      }
    }
    return true;
  }
}
