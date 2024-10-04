import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchQuery: string = '';
  options: string[] = ['Angular', 'React', 'Vue', 'Svelte']; // Example options
  filteredOptions: string[] = this.options;

  onSearch(): void {
    if (this.searchQuery) {
      this.filteredOptions = this.options.filter(option =>
        option.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredOptions = this.options;
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filteredOptions = this.options;
  }
}
