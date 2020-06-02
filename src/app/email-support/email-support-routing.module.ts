import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailSupportPage } from './email-support.page';

const routes: Routes = [
  {
    path: '',
    component: EmailSupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailSupportPageRoutingModule {}
