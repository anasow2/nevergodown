
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Ad, AdService } from '../../services/ad.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  imports: [CommonModule, RouterLink, NgOptimizedImage, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  private adService = inject(AdService);
  favoriteAds = this.adService.favoriteAds;

  toggleFavorite(ad: Ad): void {
    this.adService.toggleFavorite(ad);
  }
}
