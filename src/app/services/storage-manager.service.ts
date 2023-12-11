import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageManagerService {
  constructor() {}

  // Save data to local storage
  save(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  }

  // Retrieve data from local storage
  get(key: string): any {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error('Error getting data from local storage', error);
      return null;
    }
  }

  // Remove data from local storage
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from local storage', error);
    }
  }

  // Clear all data from local storage
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing local storage', error);
    }
  }
}
