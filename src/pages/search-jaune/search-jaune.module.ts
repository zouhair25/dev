import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchJaunePage } from './search-jaune';

@NgModule({
  declarations: [
    SearchJaunePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchJaunePage),
  ],
})
export class SearchJaunePageModule {}
