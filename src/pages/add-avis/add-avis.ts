import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-add-avis',
  templateUrl: 'add-avis.html',
})
export class AddAvisPage {
  code_firme;
  rating: number = 4;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	           public events: Events) {
     events.subscribe('star-rating:changed', (starRating) => {
       console.log(starRating);
       this.rating = starRating;
     }); 
  }

  ionViewDidLoad() {
    
    this.code_firme= this.navParams.get('code_firme');
    console.log('ionViewDidLoad AddAvisPage',this.code_firme);
  }

}
