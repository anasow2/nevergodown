
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Ad, AdService } from '../../services/ad.service';

interface Category {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule, RouterLink, NgOptimizedImage, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private adService = inject(AdService);
  private allAds = this.adService.ads;

  categories: Category[] = [
    { name: 'Guryo', icon: 'home' },
    { name: 'Gaadiid', icon: 'directions_car' },
    { name: 'Elektaroonig', icon: 'laptop_mac' },
    { name: 'Xoolo', icon: 'pets' },
    { name: 'Shaqooyin', icon: 'work' },
  ];

  // Filter state
  isFilterOpen = signal(false);
  
  // Temporary filter state
  private tempSelectedCategory = signal<string | null>(null);
  private tempSelectedMaxPrice = signal<number>(0);

  // Active filter state
  private activeSelectedCategory = signal<string | null>(null);
  private activeSelectedMaxPrice = signal<number>(0);

  readonly maxPriceValue = computed(() => {
    if (!this.allAds().length) return 100000;
    return Math.max(...this.allAds().map(ad => ad.price));
  });

  filteredAds = computed(() => {
    const category = this.activeSelectedCategory();
    const maxPrice = this.activeSelectedMaxPrice();
    
    return this.allAds().filter(ad => {
      const categoryMatch = category ? ad.category === category : true;
      const priceMatch = maxPrice > 0 ? ad.price <= maxPrice : true;
      return categoryMatch && priceMatch;
    });
  });

  areFiltersActive = computed(() => 
    this.activeSelectedCategory() !== null || (this.activeSelectedMaxPrice() > 0 && this.activeSelectedMaxPrice() < this.maxPriceValue())
  );
  
  constructor() {
    this.activeSelectedMaxPrice.set(this.maxPriceValue());
  }

  openFilterPanel(): void {
    // Sync temp state with active state when opening
    this.tempSelectedCategory.set(this.activeSelectedCategory());
    this.tempSelectedMaxPrice.set(this.activeSelectedMaxPrice());
    this.isFilterOpen.set(true);
  }

  closeFilterPanel(): void {
    this.isFilterOpen.set(false);
  }
  
  applyFilters(): void {
    this.activeSelectedCategory.set(this.tempSelectedCategory());
    this.activeSelectedMaxPrice.set(this.tempSelectedMaxPrice());
    this.closeFilterPanel();
  }

  resetFilters(): void {
    this.tempSelectedCategory.set(null);
    this.tempSelectedMaxPrice.set(this.maxPriceValue());
  }

  onPriceChange(event: Event): void {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.tempSelectedMaxPrice.set(value);
  }
  
  toggleFavorite(ad: Ad): void {
    this.adService.toggleFavorite(ad);
  }

  selectCategory(categoryName: string): void {
    if (this.tempSelectedCategory() === categoryName) {
      this.tempSelectedCategory.set(null); // Deselect if already selected
    } else {
      this.tempSelectedCategory.set(categoryName);
    }
  }
}
