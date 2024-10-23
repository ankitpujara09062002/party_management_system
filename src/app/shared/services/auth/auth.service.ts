import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _localStorageService: LocalStorageService) { }

  // Retrieve the authentication token from local storage
  token = this._localStorageService.getItem('token');

  // Method to handle OAuth token login
  authenticate(oData: any): Observable<any> {
    return this.http.post(environment.apiEndPoint + 'login/', oData);
  }

  // Method to handle user logout
  signOut(): Observable<any> {
    return this.http.post(environment.apiEndPoint + 'logout/', {});
  }
}
