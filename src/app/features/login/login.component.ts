import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/localstorage/localstorage.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Form group for login
  loginForm!: FormGroup;
  // Variable to hold error messages
  errMsg!: string;
  // Flag to check if login form is submitted from browser extension
  isFromExtension: boolean = false;
  // Loading state for form submission
  loginFormLoading: boolean = false;
  // Variable to hold authentication token
  token: any;

  constructor(
    private fb: FormBuilder, // FormBuilder service for managing forms
    public _localStorageService: LocalStorageService, // Service for local storage operations
    private _router: Router, // Router for navigation
    private _authService: AuthService, // Service for authentication operations
    private toastr: ToastrService // Service for toast notifications
  ) { }

  ngOnInit(): void {
    this.init(); // Initialize component state on load
  }

  init() {
    // Check if user is already logged in
    if (this._localStorageService.isUserLoggedIn()) {
      this.checkUserLoggedIn(); // If logged in, redirect to party management
    } else {
      this.initForm(); // Otherwise, initialize the login form
    }
  }

  initForm() {
    // Initialize the login form with required validators
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Required username field
      password: ['', Validators.required], // Required password field
    });
  }

  checkUserLoggedIn() {
    // Redirect to party management if user is already logged in
    if (this._localStorageService.isUserLoggedIn()) {
      this._router.navigate(['/party-management']);
    }
  }

  submitForm(event: any) {
    // Prevent submission if form is invalid
    if (!this.loginForm.valid) {
      return;
    }
    this.loginFormLoading = true; // Set loading state to true
    this.loginForm.disable(); // Disable form during submission

    // Prepare payload for authentication API call
    const payload = {
      username: this.loginForm.controls['username'].value, // Get username from form
      password: this.loginForm.controls['password'].value // Get password from form
    };

    // Call the authenticate method from AuthService
    this._authService.authenticate(payload).subscribe({
      next: (res) => {
        // On successful login, show success message and store token
        this.toastr.success('Login Successful!');
        this._localStorageService.setAccessToken(res.token);
        this._localStorageService.setUserLoggedIn(true);
        this._router.navigate(['/party-management']); // Redirect to party management
      },
      error: (error) => {
        // Handle login error
        console.error('API call failed, error:', error);
        this.toastr.error(error?.error?.msg); // Show error message
        this.loginForm.enable(); // Re-enable form
        this._localStorageService.setUserLoggedIn(false); // Update logged in status
        this.loginFormLoading = false; // Reset loading state
      }
    });
  }
}
