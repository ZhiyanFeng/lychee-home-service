import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/components/moving/home/home.component').then(mod => mod.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./core/auth/login/login.component').then(mod => mod.LoginComponent)
  },

  {
    path: 'quotation',
    loadComponent: () => import('./features/components/moving/quotation/quotation.component').then(mod=> mod.QuotationComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./features/components/moving/home/home.component').then(mod => mod.HomeComponent)
  },
];
