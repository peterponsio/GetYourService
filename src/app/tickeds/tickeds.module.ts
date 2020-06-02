import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TickedsPageRoutingModule } from './tickeds-routing.module';

import { TickedsPage } from './tickeds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TickedsPageRoutingModule
  ],
  declarations: [TickedsPage]
})
export class TickedsPageModule {}
