
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddComponent } from './components/add/add.component';
import { DetailComponent } from './components/detail/detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'new', component: AddComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'item/:id', component: DetailComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: '**', redirectTo: '' }
];
