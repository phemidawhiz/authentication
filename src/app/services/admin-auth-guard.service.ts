import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate() {
    const user = this.authService.currentUser;
    if (user && user.class === 'admin') {
      return true;
    }

    this.router.navigate(['/no-access']);
    return false;
  }

}
