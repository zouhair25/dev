
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';
import xml2js from 'xml2js';
import { GoogleAnalyitcsService } from '../../providers/GoogleAnalyitcs.service';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-pharmacie-garde-aproximite',
  templateUrl: 'pharmacie-garde-aproximite.html',
})
export class PharmacieGardeAproximitePage {
  quiquoi; 
  ou;
  list;
  count;
  start =1;
  currentLat;
  currentLng;
  noResult: boolean = false; 
  isLocation: boolean= false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private googleAnalyitcsService: GoogleAnalyitcsService,
              private geolocation: Geolocation,
              
              ) {
  }

  ionViewDidLoad() {
        
        this.quiquoi =this.navParams.get('quiquoi');

  	    this.currentLat =this.navParams.get('lat');
        this.currentLng =this.navParams.get('lng');
        if(!this.currentLat && !this.currentLng){
       setTimeout(()=>{

        let watch =this.geolocation.watchPosition();
       watch.subscribe((data)=>{
         this.currentLat = data.coords.latitude;
         this.currentLng = data.coords.longitude;
      console.log('this.lat',this.currentLat);
      console.log('this.lng',this.currentLng);
       })
     },100)
        }
        
        if(this.currentLat && this.currentLng){
        this.list=this.go_build_quiquoi_approxy(this.quiquoi,this.currentLat,this.currentLng,this.start);        

        }else{
        setTimeout(()=>{
        this.list=this.go_build_quiquoi_approxy(this.quiquoi,this.currentLat,this.currentLng,this.start);        

        },200);
        }

    //appel a google analytics
    this.googleAnalyitcsService.analyticsGoogles('pharmacie de garde à proximité');

    //appel a firebase analytics
    this.googleAnalyitcsService.analyticsFirebase("pharmacie de garde à proximité", {page: "pharmacie de garde à proximité"});

  }
    
    onDisplayPro(pro: {rs_comp: string, adresse: string}){
      this.navCtrl.push('SingleProPage', {pro: pro,lat: this.currentLat, lng: this.currentLng})
    }
   
      // remplir la liste des resultats
   go_build_quiquoi_approxy(quiquoi,lat,lng,start){

       this.go_search_quiquoi_approxy(quiquoi,lat,lng,start).then((data)=>{
        this.list=data[0],this.count=data[1],
        this.noResult =data[2]
        console.log('datatattata',data);
        console.log('datatattata',this.noResult);

       })
    }
        //recuperer les scte a proximité
   go_search_quiquoi_approxy(quiquoi, lat, lng,start){
         let list: any = [];
         let count;
         let i;
         let noResult: boolean = false;
          return new Promise((resolve,  reject) =>{
            
            var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
            data_send += '  <methodcall>';
            data_send += '    <methodname call="pharmacies_approxy">'; 
            data_send += '      <params>';  
            data_send += '        <value>';
            data_send += '          <string>'+quiquoi+'</string>';
            data_send += '          <x>'+lat+'</x>';
            data_send += '          <y>'+lng+'</y>';
            data_send += '          <rayon>500000</rayon>';   
            data_send += '          <start>'+start+'</start>';
            data_send += '          <extract>200</extract>'; 
            data_send += '        </value>';
            data_send += '      </params>'; 
            data_send += '    </methodname>';
            data_send += '  </methodcall>';
        
            $.ajax({
              
              type       : "POST",
              url        : "https://www.telecontact.ma/WsMobTlC2014nVZA",
              /*headers: {accepts: '*'}:*/
              crossDomain: true,
              beforeSend : function() {$("#results_loading").append('<div class="noresults"><br /><br />Veuillez patienter<br /><br /><img src="media/images/home/load_result.gif" /></div>');/*$.mobile.loading('show')*/},
              complete   : function() {$("#results_loading").hide();/*$.mobile.loading('hide')*/},
              data       : {telecontact : data_send},
              dataType   : 'text',
              success    : function(response) {
                                     
                    response =response.replace(/&(?!(?:apos|quot|[gl]t|amp);|#)/g, '&amp;');
                                    
                let parser = new xml2js.Parser(
                       {
                          trim: true,
                          explicitArray: true
                       });

                   parser.parseString(response, function (err, result)
                  {
                       
                       if(result){
                        count =result.search_answers.search_answer[0].items[0].$.count;
                        
                       //count=result.search_answers.search_answer.items[0].$.count;
                   for(let answers of result.search_answers.search_answer) {                     
                         if (answers.items[0]=="      ") {
                                     list.push({'title': 'Aucun resultat'}); 
                               }else{
                     for(let item of answers.items){                             
                      if(item.$.count>0)  {
                       for(let i of item.item){            
                         for(let i_data of i.item_data){    
                              let d: any =[];
                           for(let data of i_data.data){
                              let   type=data.$.name;
                            //console.log('type', type);                              
                              d.push({[type]: data._});                         
                             //list.push({key: data.$.name, value: data._});
                             }
                            list.push({d});                                                           
                         }
                       }
                      }else{
                        count =-1;
                      } 
                     }
                 }
                   }
                   }else{
                    list.push();
                    noResult =true;
                    console.log('Pas de résultats à proximité de vous.');
                    console.log('Pas de résultats à proximité de vous.',noResult);

                  }
                   resolve([list,count,noResult]);
                   console.log('dd :',list);
                             //this.list=list;

                  });
              }, 
              error: function(error){
                console.log(error);
                reject();

              }
            });
          });

    
    }
}

