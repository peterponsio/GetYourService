import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEditUserPage } from './modal-edit-user.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEditUserPageRoutingModule {}
