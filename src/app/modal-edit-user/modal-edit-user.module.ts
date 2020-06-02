import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEditUserPageRoutingModule } from './modal-edit-user-routing.module';

import { ModalEditUserPage } from './modal-edit-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditUserPageRoutingModule
  ],
  declarations: [ModalEditUserPage]
})
export class ModalEditUserPageModule {}
