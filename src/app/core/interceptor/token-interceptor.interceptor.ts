import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from '../../shared/services/localstorage/localstorage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storageService: LocalStorageService) { }

  // Method to intercept outgoing HTTP requests
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the authentication token from local storage
    const token = this.storageService.getItem('token');

    // If a token is found, clone the request and add the Authorization header
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`
        }
      });
    }

    // Pass the modified request to the next handler
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle errors if necessary
        console.error('HTTP Error:', error);
        throw error;
      })
    );
  }
}
