import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/components/home/home.component').then(mod => mod.HomeComponent)
  },

  {
    path: 'quotation',
    loadComponent: () => import('./features/components/quotation/quotation.component').then(mod=> mod.QuotationComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./features/components/home/home.component').then(mod => mod.HomeComponent)
  },
];
