import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddImgPageRoutingModule } from './add-img-routing.module';

import { AddImgPage } from './add-img.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddImgPageRoutingModule
  ],
  declarations: [AddImgPage]
})
export class AddImgPageModule {}
