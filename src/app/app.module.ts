import { NgModule } from '@angular/core'; // Importing Angular core module
import { BrowserModule } from '@angular/platform-browser'; // Importing BrowserModule to run the app in the browser

import { AppRoutingModule } from './app-routing.module'; // Importing the app's routing module
import { AppComponent } from './app.component'; // Root component of the application
import { LoginComponent } from './features/login/login.component'; // Component for the login feature
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Modules to handle template-driven and reactive forms
import { LocalStorageService } from './shared/services/localstorage/localstorage.service'; // Service to interact with local storage
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Importing modules to handle HTTP requests and interceptors
import { TokenInterceptor } from './core/interceptor/token-interceptor.interceptor'; // Custom interceptor to attach token to HTTP requests
import { ToastrModule } from 'ngx-toastr'; // Third-party library for toast notifications
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Browser animations module to support animations
import { PartyManagementComponent } from './features/party-management/party-management.component'; // Component for managing party data
import { PartyManagementDailogComponent } from './features/party-management-dailog/party-management-dailog.component'; // Dialog component for party management
import { HeaderComponent } from './shared/component/header/header.component'; // Shared header component used across the app

@NgModule({
  declarations: [
    AppComponent, // Declaring root component
    LoginComponent, // Declaring login component
    PartyManagementComponent, // Declaring party management component
    PartyManagementDailogComponent, // Declaring party management dialog component
    HeaderComponent // Declaring shared header component
  ],
  imports: [
    BrowserModule, // Importing module to run the app in the browser
    AppRoutingModule, // Importing the routing module to handle app navigation
    BrowserAnimationsModule, // Module for handling animations in the app
    FormsModule, // Importing for template-driven forms
    ReactiveFormsModule, // Importing for reactive forms
    ToastrModule.forRoot({
      timeOut: 2000, 
      closeButton: true, // Show close button on the toast
      progressBar: true, // Display a progress bar on the toast
    }),
    HttpClientModule // Module to make HTTP requests from the app
  ],
  providers: [
    LocalStorageService, // Providing the LocalStorageService for dependency injection
    {
      provide: HTTP_INTERCEPTORS, // Providing custom interceptor
      useClass: TokenInterceptor, // The interceptor class for handling tokens
      multi: true // Allowing multiple interceptors in the app
    }
  ],
  bootstrap: [AppComponent] // Bootstrapping the root component
})
export class AppModule { }
