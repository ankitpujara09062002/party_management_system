import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartyManagementService } from '../../shared/services/party-management/party-management.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-party-management-dailog',
  templateUrl: './party-management-dailog.component.html',
  styleUrls: ['./party-management-dailog.component.scss']
})
export class PartyManagementDailogComponent implements OnInit, OnChanges {

  // Inputs to receive party details and modal open state from the parent component
  @Input() partyDetailsData: any;
  @Input() isEditModalOpen!: boolean;

  // Outputs event to notify parent component when the modal is closed
  @Output() onModalClose = new EventEmitter();

  // Form group to manage party details form state
  partyDetailsForm!: FormGroup;

  // Variables to store the file to upload and image URL for preview
  fileToUpload!: File;
  imageUrl!: string | null;

  constructor(private fb: FormBuilder, private partyManagementService: PartyManagementService, private toastr: ToastrService) { }

  // Getter for 'address' form array to manage multiple address entries
  get addressArray(): any {
    return this.partyDetailsForm.get('address') as FormArray;
  }

  // Getter for 'bank' form array to manage multiple bank details entries
  get bankDetailsArray(): any {
    return this.partyDetailsForm.get('bank') as FormArray;
  }

  // Initialize the form when the component is first loaded
  ngOnInit(): void {
    this.initForm();
  }

  // Handle changes in the @Input() properties to populate the form when party details data is available
  ngOnChanges(): void {
    if (this.partyDetailsData) {
      // Update form values with the incoming party details
      this.partyDetailsForm.patchValue({
        name: this.partyDetailsData.name,
        company_name: this.partyDetailsData.company_name,
        mobile_no: this.partyDetailsData.mobile_no,
        telephone_no: this.partyDetailsData.telephone_no,
        whatsapp_no: this.partyDetailsData.whatsapp_no,
        email: this.partyDetailsData.email,
        remark: this.partyDetailsData.remark,
        login_access: this.partyDetailsData.login_access,
        date_of_birth: this.partyDetailsData.date_of_birth,
        anniversary_date: this.partyDetailsData.anniversary_date,
        gstin: this.partyDetailsData.gstin,
        pan_no: this.partyDetailsData.pan_no,
        apply_tds: this.partyDetailsData.apply_tds,
        credit_limit: this.partyDetailsData.credit_limit
      });

      // Clear bank details array and repopulate it if data is available
      this.bankDetailsArray.clear();
      if (this.partyDetailsData?.bank_id && this.partyDetailsData?.bank_id?.length > 0) {
        this.partyDetailsData?.bank_id.forEach((bank: any) => {
          this.bankDetailsArray.push(this.addBankItems(bank));
        });
      }

      // Clear address array and repopulate it if data is available
      if (this.partyDetailsData?.address && this.partyDetailsData.address?.length > 0) {
        this.partyDetailsData.address.forEach((address: any) => {
          this.addressArray.push(this.addAddressItems(address));
        });
      }

      // Set the image URL for preview if an image is available
      if (this.partyDetailsData?.image) {
        this.imageUrl = environment.apiEndPoint + this.partyDetailsData?.image;
      }
    } else {
      // Initialize a new form when there's no party data (for adding a new entry)
      this.initForm();
    }
  }

  // Handle file input for image uploads and validate the file type
  handleFileInput(event: any) {
    const file = event.target.files?.item(0);
    if (file) {
      const validTypes = ['image/png', 'image/jpg', 'images/PNG', 'images/JPG'];
      if (!validTypes.includes(file.type)) {
        alert('Only PNG and JPG files are allowed.');
        return;
      }
      this.fileToUpload = file;

      // Read the file as data URL to show a preview of the selected image
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.fileToUpload);
    }
  }

  // Initialize the party details form with form controls and validators
  initForm() {
    this.partyDetailsForm = this.fb.group({
      name: ['', Validators.required],
      company_name: ['', Validators.required],
      mobile_no: ['', Validators.required],
      telephone_no: [''],
      whatsapp_no: [''],
      email: [''],
      remark: [''],
      login_access: [false, Validators.required],
      date_of_birth: [''],
      anniversary_date: [''],
      gstin: [''],
      pan_no: [''],
      apply_tds: [''],
      credit_limit: ['', [Validators.required]],
      image: [''],
      address: this.fb.array([]), // Empty address array initialized
      bank: this.fb.array([]) // Empty bank details array initialized
    });
  }

  // Create form group for a new bank detail item, with optional default data
  addBankItems(bankData: any = {}): FormGroup {
    return this.fb.group({
      bank_ifsc_code: [bankData.bank_ifsc_code || ''],
      bank_name: [bankData.bank_name || ''],
      branch_name: [bankData.branch_name || ''],
      account_no: [bankData.account_no || ''],
      account_holder_name: [bankData.account_holder_name || '']
    });
  }

  // Create form group for a new address item, with optional default data
  addAddressItems(addressData: any = {}): FormGroup {
    return this.fb.group({
      address_line_1: [addressData.address_line_1 || ''],
      address_line_2: [addressData.address_line_2 || ''],
      city: [addressData.city || ''],
      country: [addressData.country || ''],
      pincode: [addressData.pincode || ''],
      state: [addressData.state || '']
    });
  }

  // Add a new empty address form group to the form array
  onAddAddress() {
    this.addressArray.push(this.addAddressItems());
  }

  // Add a new empty bank detail form group to the form array
  onAddBankDetails() {
    this.bankDetailsArray.push(this.addBankItems());
  }

  // Remove an address form group from the address array by index
  removeAddress(i: number) {
    this.addressArray.removeAt(i);
  }

  // Remove a bank detail form group from the bank array by index
  removeBankDetails(i: number) {
    this.bankDetailsArray.removeAt(i);
  }

  // Handle form submission for adding or updating party details
  saveProduct() {
    if (this.partyDetailsForm.valid) {
      const productData = this.partyDetailsForm.getRawValue();
      const formData = new FormData();

      // Append form data to send via API
      formData.append('name', productData.name);
      formData.append('company_name', productData.company_name);
      formData.append('mobile_no', productData.mobile_no);
      formData.append('telephone_no', productData.telephone_no);
      formData.append('whatsapp_no', productData.whatsapp_no);
      formData.append('email', productData.email);
      formData.append('remark', productData.remark);
      formData.append('login_access', productData.login_access);
      formData.append('date_of_birth', productData.date_of_birth);
      formData.append('anniversary_date', productData.anniversary_date);
      formData.append('gstin', productData.gstin);
      formData.append('pan_no', productData.pan_no);
      formData.append('apply_tds', productData.apply_tds);
      formData.append('credit_limit', productData.credit_limit);
      formData.append('address', JSON.stringify(productData.address));
      formData.append('bank', JSON.stringify(productData.bank));

      // Add image file if selected
      if (this.fileToUpload) {
        formData.append('image', this.fileToUpload, this.fileToUpload.name);
      }

      // Call appropriate API method (add or update) based on whether partyDetailsData is available
      if (!this.partyDetailsData) {
        // Call API to add new party details
        this.partyManagementService.addEventDetails(formData).subscribe({
          next: (res) => {
            this.onModalClose.next(this.partyDetailsData?.id);
            this.toastr.success('Add New Party Details Successfully!');
          },
          error: (error) => {
            console.error('API call failed, error:', error);
            this.toastr.error(error?.error?.msg);
          }
        });
      } else {
        // Call API to update existing party details
        this.partyManagementService.updateEventPartiallyById(this.partyDetailsData?.id, formData).subscribe({
          next: (res) => {
            this.onModalClose.next(this.partyDetailsData?.id);
            this.toastr.success('Update Party Details Successfully!');
          },
          error: (error) => {
            console.error('API call failed, error:', error);
            this.toastr.error(error?.error?.msg);
          }
        });
      }
    }
  }
}
