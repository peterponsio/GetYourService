import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorInformsPage } from './error-informs.page';

const routes: Routes = [
  {
    path: '',
    component: ErrorInformsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorInformsPageRoutingModule {}
