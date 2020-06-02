import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserIdeasPage } from './user-ideas.page';

const routes: Routes = [
  {
    path: '',
    component: UserIdeasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserIdeasPageRoutingModule {}
