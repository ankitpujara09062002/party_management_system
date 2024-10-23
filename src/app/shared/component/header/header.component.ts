import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/localstorage/localstorage.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Perform initialization if necessary
  }

  // Method to handle user logout
  onLogout() {
    this.authService.signOut().subscribe({
      next: (res) => {
        // Display success message and navigate to login
        this.toastr.success('Logout successfully!');
        this.router.navigate(['/login']);

        // Clear local storage and update login status
        this.localStorageService.setUserLoggedIn(false);
        this.localStorageService.removeItem('token');
      },
      error: (error) => {
        console.error('API call failed, error:', error);
        this.toastr.error(error?.error?.msg);
      }
    });
  }
}
