import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class LoginAuthGuard implements CanActivate {

constructor(
    private router: Router,
    private authService: AuthService) { }

    canActivate() {
        if (!this.authService.isLoggedIn()) {
        return true;
    }

        this.router.navigate(['/']);
        return false;
    }
}
