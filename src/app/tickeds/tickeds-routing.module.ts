import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TickedsPage } from './tickeds.page';

const routes: Routes = [
  {
    path: '',
    component: TickedsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TickedsPageRoutingModule {}
