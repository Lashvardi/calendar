import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WelcomeModule } from './modules/welcome/export/welcome.module';
import { CalendarComponent } from './modules/calendar/calendar.component';
import { CalendarModule } from './modules/calendar/exports/calendar.module';
import { CalendarRoutingModule } from './modules/calendar/exports/calendar-routing.module';
import { WelcomeRoutingModule } from './modules/welcome/export/welcome-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,

    // Custom modules
    WelcomeModule,
    CalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
