import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartyManagementService {

  constructor(private http: HttpClient, private _localStorageService: LocalStorageService) { }

  // Retrieve the authentication token from local storage
  token = this._localStorageService.getItem('token');

  // Method to retrieve the list of parties or events
  getEventList(): Observable<any> {
    return this.http.get(environment.apiEndPoint + 'party/');
  }

  // Method to add details for a new event or party
  addEventDetails(eventData: any): Observable<any> {
    return this.http.post(environment.apiEndPoint + 'party/', eventData);
  }

  // Method to delete an event or party by ID
  deleteEventById(id: number): Observable<any> {
    return this.http.delete(environment.apiEndPoint + `party/?id=${id}`);
  }

  // Method to update specific fields of an event or party by ID (partial update)
  updateEventPartiallyById(id: number, eventData: any): Observable<any> {
    return this.http.patch(environment.apiEndPoint + `party/?id=${id}`, eventData);
  }

  // Method to completely update event or party details by ID
  updateEventCompletelyById(id: number, eventData: any): Observable<any> {
    return this.http.put(environment.apiEndPoint + `party/?id=${id}`, eventData);
  }
}
