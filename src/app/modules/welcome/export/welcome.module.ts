import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from '../welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  exports: [WelcomeComponent],
})
export class WelcomeModule {}
