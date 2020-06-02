import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailSupportPageRoutingModule } from './email-support-routing.module';

import { EmailSupportPage } from './email-support.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailSupportPageRoutingModule
  ],
  declarations: [EmailSupportPage]
})
export class EmailSupportPageModule {}
