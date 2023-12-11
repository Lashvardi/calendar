import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/welcome/export/welcome.module').then(
        (m) => m.WelcomeModule
      ),
  },
  {
    path: 'Calendar',
    loadChildren: () =>
      import('./modules/calendar/exports/calendar.module').then(
        (m) => m.CalendarModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
