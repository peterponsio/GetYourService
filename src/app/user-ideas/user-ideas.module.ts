import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserIdeasPageRoutingModule } from './user-ideas-routing.module';

import { UserIdeasPage } from './user-ideas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserIdeasPageRoutingModule
  ],
  declarations: [UserIdeasPage]
})
export class UserIdeasPageModule {}
