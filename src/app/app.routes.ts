import { Routes } from '@angular/router';
import { DashboardComponent } from './core/pages/dashboard/dashboard.component';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';
import { IsAdminGuard } from './auth/guards/is-admin.guard';


export const routes: Routes = [

  {
    path:'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.authRoutes),
    canMatch: [NotAuthenticatedGuard ]
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./core/pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),

    children: [
      {
        path: 'data',
        loadComponent: () =>
          import('./core/pages/data-view/data-view.component').then(
            (m) => m.DataViewComponent
          )
      },
      {
        path: 'sensor',
        loadComponent: () =>
          import('./core/pages/sensor/sensor.component').then(
            (m) => m.SensorComponent
          ),
      },
      {
        path: 'setting',
        loadComponent: () =>
          import('./core/pages/setting/setting.component').then(
            (m) => m.SettingComponent
          ),
      },
      {
        path:'**',
        redirectTo: 'data',
      }
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
