import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PharmacieGardePage } from './pharmacie-garde';

@NgModule({
  declarations: [
    PharmacieGardePage,
  ],
  imports: [
    IonicPageModule.forChild(PharmacieGardePage),
  ],
})
export class PharmacieGardePageModule {}
