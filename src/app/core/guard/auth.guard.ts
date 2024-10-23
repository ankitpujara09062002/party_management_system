import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../shared/services/localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'  // Makes this guard service available throughout the application
})
export class AuthGuard implements CanActivate {

  // Injects LocalStorageService to check login status and Router for navigation
  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  // Method to determine if the route can be activated
  canActivate(
    route: ActivatedRouteSnapshot,    // Provides access to the information about the activated route
    state: RouterStateSnapshot        // Provides the router's state at the time of navigation
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if the user is logged in via LocalStorageService
    if (this.localStorageService.isUserLoggedIn()) {
      return true;  // Allow the route activation
    } else {
      // Redirect to the login page if the user is not logged in
      return this.router.navigate(['/login']);
    }
  }
}
