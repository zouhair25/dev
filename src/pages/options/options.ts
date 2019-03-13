import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams, private menuCtrl: MenuController,
) {
  }

   onToggleMenu(){
   this.menuCtrl.open();
  }

   ionViewDidLoad(){

 }




}
