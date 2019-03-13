import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-pharmacie-garde',
  templateUrl: 'pharmacie-garde.html',
})
export class PharmacieGardePage {
  
  list;
  currentLat;
  currentLng
  constructor(public navCtrl: NavController, public navParams: NavParams,
              
              ) {
  }

  ionViewDidLoad() {
  	this.list = this.navParams.get('list');
    this.currentLat =this.navParams.get('lat');
    this.currentLng =this.navParams.get('lng');
      console.log('this.lat',this.currentLat);
      console.log('this.lng',this.currentLng);
          /////////////////////////////////////

  }

  onDisplayPharmacieGarde(list: {titre: string, numero: string},lat,lng){
    console.log('ionViewDidLoad PharmacieGardePage',this.list);
  	
  	this.navCtrl.push('PharmacieResultPage',{list: list,lat: this.currentLat,lng: this.currentLng});


  }

}
