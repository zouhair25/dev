import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-historique',
  templateUrl: 'historique.html',
})
export class HistoriquePage {


  constructor(public navCtrl: NavController, public navParams: NavParams,
  	          private menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoriquePage');
  }

  onToggleMenu(){
   this.menuCtrl.open();
  }
}
