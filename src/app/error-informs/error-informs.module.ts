import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErrorInformsPageRoutingModule } from './error-informs-routing.module';

import { ErrorInformsPage } from './error-informs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErrorInformsPageRoutingModule
  ],
  declarations: [ErrorInformsPage]
})
export class ErrorInformsPageModule {}
