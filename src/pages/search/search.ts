import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as $ from 'jquery';
import xml2js from 'xml2js';
import { Injectable } from '@angular/core';
import { BlanchesPage } from '../blanches/blanches';
import { JaunesPage } from '../jaunes/jaunes';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
@Injectable()
export class SearchPage {
  
  @ViewChild(Slides) slides: Slides;
  list;
  lat;
  lng;
  count;
  list_ville;
  bool: Boolean = true;
  constructor(private navCtrl: NavController, public navParams: NavParams,
              private menuCtrl: MenuController,
              private geolocation: Geolocation,) {
    this.getLocation();
  }
  
  goToSlide(){
    this.slides.slideTo(2,100);
  }
  onGoJaunesPage(t){
    this.navCtrl.push(JaunesPage,{type: 'pro',lat: this.lat,lng: this.lng});
  }
  onGoBlanchesPage(t){
    this.navCtrl.push(JaunesPage,{type: 'inv',lat: this.lat,lng: this.lng});
  }

  onShowList(){

  }
    getLocation(){
        this.geolocation.getCurrentPosition().then((resp)=>{
     this.lat = resp.coords.latitude;
     this.lng = resp.coords.longitude;
    }).catch((error) => {
   });
    }
    ionViewDidEntrer(){
      this.getLocation();
    }
  ionViewDidLoad() {
   
      this.go_build_pharmacie_garde();
      this.getLocation();
      this.lat =this.navParams.get('lat');
      this.lng =this.navParams.get('lng');
      console.log('this.lat',this.lat);
      console.log('this.lng',this.lng);


     let watch =this.geolocation.watchPosition();
       watch.subscribe((data)=>{
          /*console.log("Latitude ",data.coords.latitude)   ;
          console.log("longitude ",data.coords.longitude)   ; 
          console.log("altitude ",data.coords.altitude)   ;      
          console.log("accuracy ",data.coords.accuracy)   ;      
          console.log("altitudeAccuracy   ",data.coords.altitudeAccuracy  )   ;      
          console.log("heading   ",data.coords.heading  )   ;      
          console.log("speed   ",data.coords.speed  )   ;      
          console.log("timestamp   ",data.timestamp)   ; */     

       //this.onDisplayRaccourcis(data.coords.latitude,data.coords.longitude);
       })
       
   
  ////////////////////////////////////
  }




    onDisplayByCategory(name: string){
      this.navCtrl.push('AproximitePage',{categorie: name,lat: this.lat,lng: this.lng});
    }


    onToggleMenu(){
     this.menuCtrl.open();
    }
    

    onDisplayPharmacieGarde(list,lat,lng){
      this.navCtrl.push('PharmacieGardePage',{list: this.list_ville,lat: this.lat,lng: this.lng});
    }
    go_build_pharmacie_garde(){
       this.pharmacies_garde_load_city().then((data)=>{
         this.list_ville =data;
       });
      return this.list_ville;
    }
    pharmacies_garde_load_city(){
       let list: any =[];
       let noResult: boolean = false;
      return new Promise((resolve,reject)=>{
          var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
              data_send += '  <methodcall>';
              data_send += '    <methodname call="pharmacies_garde_villes">';  
              data_send += '      <params>';  
              data_send += '        <value>';
              data_send += '        </value>';
              data_send += '      </params>';  
              data_send += '    </methodname>';
              data_send += '  </methodcall>';
          $.ajax({
             type: "POST",
             url: "https://www.telecontact.ma/WsMobTlC2014nVZA",
             crossDomain: true,
             data: {telecontact: data_send},
             dataType: 'text',
             success: function(response){
                response =response.replace(/&(?!(?:apos|quot|[gl]t|amp);|#)/g, '&amp;');
                let parser =new xml2js.Parser({
                    trim: true,
                    explicitArray: true                  
                });

                parser.parseString(response,function(err,result){
               
                  if (result) {
                    for(let answers of result.search_answers.search_answer) { 
                      for(let item of answers.items){  
                        for(let i of item.item){   
                          for(let i_data of i.item_data){
                            list.push({titre: i_data.data[0]._,numero: i_data.data[1]._}); 

                              
                          } 
                        }
                      }
                    }
                  }else{
                    list.push();
                    noResult =true;
                  }
                 resolve(list);
                });
             }
          });
      });
    }
}
