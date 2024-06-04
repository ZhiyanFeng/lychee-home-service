import { Routes } from '@angular/router';
import {
  ResidentialMovingDetailComponent
} from "./features/components/moving/residential-moving-detail/residential-moving-detail.component";

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
    path: 'residentialMovingAppointment',
    loadComponent: () => import('./features/components/moving/residential-moving-detail/residential-moving-detail.component')
      .then(mod=> mod.ResidentialMovingDetailComponent)
  },

  {
    path: 'smallMovingRequest',
    loadComponent: () => import('./features/components/moving/small-moving-detail/small-moving-detail.component')
      .then(mod=> mod.SmallMovingDetailComponent)
  },
  {
    path: 'thankyou',
    loadComponent: () => import('./shared/component/thank-you-page/thank-you-page.component').then(mod => mod.ThankYouPageComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./features/components/moving/home/home.component').then(mod => mod.HomeComponent)
  },
];
