import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'builder',
    loadComponent: () => import('./function-components/form-builder/form-builder.component').then(c => c.FormBuilderComponent)
  },
  {
    path: 'answers',
    loadComponent: () => import('./function-components/form-answers/form-answers.component').then(c => c.FormAnswersComponent)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'builder',
  }
];
