import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  async canActivate(@Inject(ActivatedRouteSnapshot) route: ActivatedRouteSnapshot,@Inject(RouterStateSnapshot) state: RouterStateSnapshot) {
    await this.authService.verifyUserToken();
    let isLogged =  this.authService.isLogged();
    if (isLogged) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
  

