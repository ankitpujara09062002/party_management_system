import { Component, OnInit } from '@angular/core';
import { PartyManagementService } from '../../shared/services/party-management/party-management.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../shared/services/localstorage/localstorage.service';

declare var bootstrap: any; // Declare Bootstrap variable for modal handling

@Component({
  selector: 'app-party-management',
  templateUrl: './party-management.component.html',
  styleUrls: ['./party-management.component.scss']
})
export class PartyManagementComponent implements OnInit {
  partyListData: any = []; // Holds the list of party details
  isEditModalShown = false; // Flag to show edit modal
  editPartyDetails!: any; // Holds the details of the party being edited
  apiEndPoint = environment.apiEndPoint; // API endpoint from environment file
  isUserLoggedIn: boolean = false; // Flag to check if user is logged in

  constructor(
    private _partyManagementService: PartyManagementService,
    private toastr: ToastrService,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this._localStorageService.isUserLoggedIn(); // Check if user is logged in
    this.loadProducts(); // Load the party details when the component initializes
  }

  // Function to load party details from the API
  loadProducts() {
    this._partyManagementService.getEventList().subscribe({
      next: (res) => {
        this.partyListData = res; // Assign the response data to partyListData
      },
      error: (error) => {
        console.error('API call failed, error:', error);
        this.toastr.error(error?.error?.msg); // Show error message if the API call fails
      }
    });
  }

  // Function to open the modal for adding or editing party details
  openModal(partyData?: any) {
    if (partyData) {
      this.editPartyDetails = partyData; // Set the party data for editing
      this.isEditModalShown = true; // Show the edit modal
    } else {
      this.isEditModalShown = false; // Show the add modal
      this.editPartyDetails = undefined
    }
  }

  // Function to delete a party by its ID
  openDeleteParty(partyId: number) {
    this._partyManagementService.deleteEventById(partyId).subscribe({
      next: (res) => {
        this.loadProducts(); // Reload party data after deletion
        this.toastr.success('Party Details Deleted Successfully!'); // Show success message
      },
      error: (error) => {
        console.error('API call failed, error:', error);
        this.toastr.error(error?.error?.msg); // Show error message if deletion fails
      }
    });
  }

  // Function to handle closing of the modal
  onModalClose(event: any) {
    const modalElement = document.getElementById('staticBackdrop'); // Get modal element
    const modalInstance = bootstrap.Modal.getInstance(modalElement); // Get Bootstrap modal instance
    modalInstance.hide(); // Hide the modal
    this.loadProducts(); // Reload party data after closing the modal
  }
}
