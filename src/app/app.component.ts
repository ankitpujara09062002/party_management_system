import { Component, OnInit } from '@angular/core'; // Importing Component and OnInit from Angular core
import { LocalStorageService } from './shared/services/localstorage/localstorage.service'; // Importing LocalStorageService

@Component({
  selector: 'app-root', // The component's selector for use in HTML
  templateUrl: './app.component.html', // Path to the component's template file
  styleUrls: ['./app.component.scss'] // Path to the component's styles file
})
export class AppComponent implements OnInit { // Declaring the AppComponent class that implements OnInit
  isUserLoggedIn: boolean = false; // Property to track user login status

  constructor(private _localStorageService: LocalStorageService) { } // Injecting LocalStorageService

  ngOnInit(): void { // Lifecycle hook that runs after the component is initialized
    // Check if the user is logged in using the local storage service
    this.isUserLoggedIn = this._localStorageService.isUserLoggedIn();
  }
}
