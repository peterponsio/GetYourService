import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensaggesPage } from './mensagges.page';

const routes: Routes = [
  {
    path: '',
    component: MensaggesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensaggesPageRoutingModule {}
