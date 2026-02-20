
import { Injectable, signal, computed } from '@angular/core';

export interface Ad {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string;
  isFavorite: boolean;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private _ads = signal<Ad[]>([
    {
      id: 1,
      title: 'Guri qurxoon Muqdisho',
      price: 145000,
      location: 'Mogadishu, Banadir',
      image: 'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=600',
      isFavorite: false,
      category: 'Guryo',
    },
    {
      id: 2,
      title: 'Toyota Land Cruiser V8',
      price: 38500,
      location: 'Hargeisa, Somaliland',
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600',
      isFavorite: true,
      category: 'Gaadiid',
    },
    {
      id: 3,
      title: 'iPhone 15 Pro Max 256GB',
      price: 980,
      location: 'Garowe, Puntland',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
      isFavorite: false,
      category: 'Elektaroonig',
    },
    {
      id: 4,
      title: 'Geel Lab ah (Dhal)',
      price: 1200,
      location: 'Baydhabo, K/Galbeed',
      image: 'https://images.pexels.com/photos/325807/pexels-photo-325807.jpeg?auto=compress&cs=tinysrgb&w=600',
      isFavorite: false,
      category: 'Xoolo',
    }
  ]);

  ads = this._ads.asReadonly();
  favoriteAds = computed(() => this._ads().filter(ad => ad.isFavorite));

  toggleFavorite(ad: Ad): void {
    this._ads.update(ads =>
      ads.map(a =>
        a.id === ad.id ? { ...a, isFavorite: !a.isFavorite } : a
      )
    );
  }
}
