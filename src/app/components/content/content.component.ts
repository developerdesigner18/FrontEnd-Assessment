import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Reward, RewardResponse } from '../../models/reward';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnInit {
  searchQuery: string = '';
  isSidenav: boolean = false;
  selectedSortOrder: 'asc' | 'desc' | null = null;
  allProducts: Reward[] = [];
  displayedProducts: Reward[] = [];
  placeHolderImage: string = 'assets/images/elementor-placeholder-image.webp';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.dataService.getProductsData().subscribe((response: RewardResponse) => {
      this.allProducts = response.data;
      this.displayedProducts = [...this.allProducts];
    });
  }

  applySearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase().trim();
    if (query) {
      this.displayedProducts = this.allProducts.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
    } else {
      this.displayedProducts = [...this.allProducts];
      this.applySort();
    }
  }

  toggleSortSidebar() {
    this.isSidenav = !this.isSidenav;
  }

  setSortOrder(order: 'asc' | 'desc'): void {
    this.selectedSortOrder = order;
  }

  resetSort(): void {
    this.selectedSortOrder = null;
    this.displayedProducts = [...this.allProducts];
    this.isSidenav = false;
  }

  applySort(): void {
    if (this.selectedSortOrder) {
      this.displayedProducts.sort((a, b) => {
        if (this.selectedSortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }
    this.isSidenav = false;
  }
}
