import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreinforPage } from './moreinfor.page';

const routes: Routes = [
  {
    path: '',
    component: MoreinforPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreinforPageRoutingModule {}
