import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensaggesPageRoutingModule } from './mensagges-routing.module';

import { MensaggesPage } from './mensagges.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensaggesPageRoutingModule
  ],
  declarations: [MensaggesPage]
})
export class MensaggesPageModule {}
