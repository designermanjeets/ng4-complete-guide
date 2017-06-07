import { Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const authenticated = this.authService.isAuthenticated();
        if (!authenticated) {
            this.router.navigate(['/signin']);
        }

        return authenticated;
    }
}
