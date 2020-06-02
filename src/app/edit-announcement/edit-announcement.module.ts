import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAnnouncementPageRoutingModule } from './edit-announcement-routing.module';

import { EditAnnouncementPage } from './edit-announcement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAnnouncementPageRoutingModule
  ],
  declarations: [EditAnnouncementPage]
})
export class EditAnnouncementPageModule {}
