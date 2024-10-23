import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  // Method to retrieve an item from localStorage, with an optional default value
  getItem(key: string, defaultValue?: any): any {
    const storedItem = localStorage.getItem(key);

    if (storedItem) {
      try {
        // Try to parse the stored item as JSON
        const parsedData = JSON.parse(storedItem);
        return parsedData;
      } catch (error) {
        // If parsing fails, return an empty string
        console.error('Error parsing localStorage item:', error);
        return '';
      }
    }

    // Return the default value if the item does not exist
    return defaultValue;
  }

  // Method to store an item in localStorage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Method to remove an item from localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Method to store the access token
  setAccessToken(token: string): void {
    this.setItem('token', token);
  }

  // Method to set the user's login status in localStorage
  setUserLoggedIn(isLoggedIn: boolean = false): void {
    this.setItem('is_logged_in', isLoggedIn);
  }

  // Method to check if the user is logged in
  isUserLoggedIn(): boolean {
    return this.getItem('is_logged_in', false);
  }
}
