import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/moving/components/home/home.component').then(mod => mod.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./core/auth/login/login.component').then(mod => mod.LoginComponent)
  },

  {
    path: 'residentialMovingAppointment',
    loadComponent: () => import('./features/moving/components/residential-moving/residential-moving.component')
      .then(mod=> mod.ResidentialMovingComponent)
  },

  {
    path: 'smallMovingRequest',
    loadComponent: () => import('./features/moving/components/small-moving/small-moving.component')
      .then(mod=> mod.SmallMovingComponent)
  },
  {
    path: 'thankyou',
    loadComponent: () => import('./shared/component/thank-you-page/thank-you-page.component').then(mod => mod.ThankYouPageComponent)
  },
  {
    path: 'upload',
    loadComponent: () => import('./shared/component/file-upload/file-upload.component').then(mod => mod.FileUploadComponent)
  },
  {
    path: 'data-table',
    loadComponent: () => import('./features/moving/components/data-table/data-table.component').then(mod => mod.DataTableComponent)
  },
  {
    path: 'test',
    loadComponent: () => import('./shared/component/test/test.component').then(mod => mod.TestComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./features/moving/components/home/home.component').then(mod => mod.HomeComponent)
  }
];
