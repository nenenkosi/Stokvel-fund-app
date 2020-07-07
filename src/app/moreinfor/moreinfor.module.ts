import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreinforPageRoutingModule } from './moreinfor-routing.module';

import { MoreinforPage } from './moreinfor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreinforPageRoutingModule
  ],
  declarations: [MoreinforPage]
})
export class MoreinforPageModule {}
