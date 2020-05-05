import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAnnouncementsPage } from './my-announcements.page';

const routes: Routes = [
  {
    path: '',
    component: MyAnnouncementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAnnouncementsPageRoutingModule {}
