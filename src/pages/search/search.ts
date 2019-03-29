import { Component } from '@angular/core';
import { Platform,IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as $ from 'jquery';
import xml2js from 'xml2js';
import { Injectable } from '@angular/core';
import { BlanchesPage } from '../blanches/blanches';
import { JaunesPage } from '../jaunes/jaunes';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { GoogleAnalyitcsService } from '../../providers/GoogleAnalyitcs.service';
import { DiagnosticService } from '../../providers/Diagnostic.service';

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
  constructor(platform: Platform, private navCtrl: NavController,
              public navParams: NavParams,
              private menuCtrl: MenuController,
              private geolocation: Geolocation,
              private googleAnalyitcsService: GoogleAnalyitcsService,
              private diagnosticService: DiagnosticService
              ) {
    
    this.getLocationReelTime();
 
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
      console.log('getLocation.lat',this.lat);
      console.log('getLocation.lng',this.lng);
    }).catch((error) => {
    });
    }
    getLocationReelTime(){
      let watch =this.geolocation.watchPosition();
       watch.subscribe((data)=>{
         this.lat = data.coords.latitude;
         this.lng = data.coords.longitude;
      console.log('this.lat',this.lat);
      console.log('this.lng',this.lng);
       })
    }

    ionViewDidEntrer(){
      if(!this.lat && !this.lng){
        setTimeout(()=>{
          this.getLocationReelTime();
        },50);
      }  
    }
  ionViewDidLoad() {
      if(!this.lat && !this.lng){
        setTimeout(()=>{
          this.getLocationReelTime();
        },1);
      }
      this.getLocation();
      this.go_build_pharmacie_garde();
      
      this.lat =this.navParams.get('lat');
      this.lng =this.navParams.get('lng');
      this.getLocationReelTime();
      console.log('this.lat',this.lat);
      console.log('this.lng',this.lng);




    //appel a google analytics
     this.googleAnalyitcsService.analyticsGoogles("Page d'accueil");
    //appel a firebase analytics
    this.googleAnalyitcsService.analyticsFirebase("Page d'accueil", {page: "Page d'accueil"});

  ////////////////////////////////////
  }




    onDisplayByCategory(name: string){
       let watch =this.geolocation.watchPosition();
       watch.subscribe((data)=>{
         this.lat = data.coords.latitude;
         this.lng = data.coords.longitude;
       console.log('this.lat',this.lat);
       console.log('this.lng',this.lng);
       })
       if(this.lat && this.lng){
        this.navCtrl.push('AproximitePage',{categorie: name,lat: this.lat,lng: this.lng});
       }else{
         if(!this.lat && !this.lng){
         this.diagnosticService.enableLocation();
       }
       setTimeout(()=>{
        this.navCtrl.push('AproximitePage',{categorie: name,lat: this.lat,lng: this.lng});
       },100);
       }
    }


    onToggleMenu(){
     this.menuCtrl.open();
    }
    

    onDisplayPharmacieGarde(list,lat,lng){
            let watch =this.geolocation.watchPosition();
       watch.subscribe((data)=>{
         this.lat = data.coords.latitude;
         this.lng = data.coords.longitude;
      console.log('this.lat',this.lat);
      console.log('this.lng',this.lng);
       })

      if(!this.lat && !this.lng){
        this.diagnosticService.enableLocation();
      }else{
        setTimeout(()=>{
        this.navCtrl.push('PharmacieGardePage',{list: this.list_ville,lat: this.lat,lng: this.lng});        
        },100);
      }
         }
    onDisplayPharmacieGardeAproximite(quiquoi,lat,lng){
      if(this.lat && this.lng){
        this.navCtrl.push('PharmacieGardeAproximitePage',{quiquoi,lat: this.lat,lng: this.lng})        
      }else{
        if(!this.lat && !this.lng){
          this.diagnosticService.enableLocation();
        }
         setTimeout(()=>{
          this.navCtrl.push('PharmacieGardeAproximitePage',{quiquoi,lat: this.lat,lng: this.lng})        
          },100);        
      }
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
