import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAnnouncementsPageRoutingModule } from './my-announcements-routing.module';

import { MyAnnouncementsPage } from './my-announcements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAnnouncementsPageRoutingModule
  ],
  declarations: [MyAnnouncementsPage]
})
export class MyAnnouncementsPageModule {}
