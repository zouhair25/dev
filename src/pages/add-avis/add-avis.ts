import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddAvisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-avis',
  templateUrl: 'add-avis.html',
})
export class AddAvisPage {
  code_firme;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
    this.code_firme= this.navParams.get('code_firme');
    console.log('ionViewDidLoad AddAvisPage',this.code_firme);
  }

}
