import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleAnalyitcsService } from '../../providers/GoogleAnalyitcs.service';


@IonicPage()
@Component({
  selector: 'page-pharmacie-garde',
  templateUrl: 'pharmacie-garde.html',
})
export class PharmacieGardePage {
  
  list;
  currentLat;
  currentLng
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private googleAnalyitcsService: GoogleAnalyitcsService,
              
              ) {
  }

  ionViewDidLoad() {
    //appel a google analytics
    this.googleAnalyitcsService.analyticsGoogles('Pharmacie de garde');

    //appel a firebase analytics
    this.googleAnalyitcsService.analyticsFirebase("Pharmacie de garde", {page: "Pharmacie de garde"});

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
