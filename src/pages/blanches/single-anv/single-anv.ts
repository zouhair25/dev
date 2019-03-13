

import { Component,ViewChild,ElementRef, HostBinding } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import * as $ from 'jquery';
import xml2js from 'xml2js';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng,
  Environment
} from '@ionic-native/google-maps';
import {  trigger,  state,
        style,  animate,  transition,} from '@angular/animations';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
selector: 'page-single-anv',
  templateUrl: 'single-anv.html',
     animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '30%',
      })),
      state('closed', style({
        height: '400px',
      })),
      
    transition('open <=> closed', [
      animate('0.5s')
    ]),
    transition ('* => open', [
      animate ('1s',
        style ({ opacity: '*' }),
      ),
    ]),
    transition('* => *', [
      animate('1s')
    ])
    ]),
  ],
})
export class SingleAnvPage {
    map: GoogleMap;
    @ViewChild('map') mapElement: ElementRef;
    private location: LatLng; 
   
    //pro;
    rs_comp;
    
    rs_abr1;
    rs_abr2;
    rs_abr3;
    code_firme;
    logo1;
    logo2;
    logo3;
    logo4;

    adresse0;
    adresse1;
    adresse2;

    ville0;
    ville1;
    ville2;
    ville3;

    telephone;
    telephone2;


    fax0;
    fax1;
    fax2;
    fax3;

    email;


    web;
    rubrique0;
    rubrique1;
    rubrique2;
    rubrique3;
    rubrique4;
    rubrique5;
    rubrique6;
    rubrique7;
    rubrique8;
    rubrique9;
    rubrique10;


    texte1;
    texte2;

    longitude0;
    longitude1;
    longitude2;
    longitude3;
    longitude4;
    longitude5;
    longitude6;
    longitude7;
    longitude8;
    longitude9;
    longitude10;
    longitude11;


    
    latitude0;
    latitude1;
    latitude2;
    latitude3;
    latitude4;
    latitude5;
    latitude6;
    latitude7;
    latitude8;
    latitude9;
    latitude10;
    latitude11;




    module0;
    module1;
    module2;
    module3;
    module4;
    module5;
    module6;
    module7;
    module8;
    module9;

    
    video;
    poids;
    region;
    webinfo_link1;
    webinfo_link2;
    webinfo_link3;
    webinfo_link4;
    webinfo_link5;
    webinfo_link6;
    webinfo_link7;

    web1;
    web2;
    web3;
    web4;

    webinfo_link_orig1;
    webinfo_link_orig2;    
    webinfo_link_orig3;
    webinfo_link_orig4;
    webinfo_link_orig5;    
    webinfo_link_orig6;    
    webinfo_link_orig7;


    motcle;
    
    locateExiste: boolean =false;
    listPrestations: any = [];
    isOpen =true;
    
    currentLat;
    currentLng;
    destinationLat;
    destinationLng;
    telAppeler;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private geolocation: Geolocation, private googleMaps: GoogleMaps,
              private platform: Platform,
              private launchNavigator: LaunchNavigator,
              private callNumber: CallNumber,) {
     
  }

   //for y aller
   navigateLocation(){
     let options: LaunchNavigatorOptions = {
     start: [this.currentLat,this.currentLng],
     app: this.launchNavigator.APP.GOOGLE_MAPS
      };

      this.launchNavigator.navigate([this.destinationLat,this.destinationLng],options)
       .then(success =>{
        console.log(success);
        },error=>{
        console.log(error);
      })
       console.log('success');
   }
   callNumbers(){

     this.callNumber.callNumber(this.telephone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
      }
     callNumbers2(){

     this.callNumber.callNumber(this.telephone2, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
      }
  //for up and down div map
  toggle(){
    this.isOpen = !this.isOpen;
  }
        addMarker(){
          let title;
            title =this.rs_comp;          
        this.map.addMarker({
           title: title,
           icon: '#ffdd00',
           animation: 'Drop',
           position: {
             lat: this.location.lat,
             lng: this.location.lng
           }
        }).then(marker =>{
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(()=>{
            alert('marker clicked');
          });
        })
      }
 

     go_build_Ann_Inv(code_firme){
     	this.ann_Invers_by_cd(this.code_firme).then((data)=>{
             console.log('xxxxx',data[0].d[1].rs_comp);
     		if(data[0].d[1].rs_comp){
              this.rs_comp=data[0].d[1].rs_comp;
            }else{
              this.rs_comp=data[0].d[2].rs_comp;
            }

              this.logo1=data[0].d[2].logo;
              this.logo2=data[0].d[3].logo;

              this.adresse0=data[0].d[2].adresse;
              this.adresse1=data[0].d[3].adresse;
              this.adresse2=data[0].d[4].adresse;

              this.ville0=data[0].d[3].ville;
              this.ville1=data[0].d[4].ville;
              this.ville2=data[0].d[5].ville;
              this.ville3=data[0].d[6].ville; 

            if(data[0].d[4].telephone1){
              this.telephone=data[0].d[4].telephone1;
            }else if(data[0].d[5].telephone1) {
              this.telephone=data[0].d[5].telephone1;
            }else if(data[0].d[6].telephone1){
              this.telephone=data[0].d[6].telephone1;
            }else if (data[0].d[7].telephone1){
              this.telephone=data[0].d[7].telephone1;
            }else if(data[0].d[8].telephone1){
              this.telephone=data[0].d[8].telephone1;
            }else {
              this.telephone=data[0].d[9].telephone1;
            }

            if(data[0].d[4].telephone2){
              this.telephone2=data[0].d[4].telephone2;
            }else if(data[0].d[5].telephone2) {
              this.telephone2=data[0].d[5].telephone2;
            }else if(data[0].d[6].telephone2){
              this.telephone2=data[0].d[6].telephone2;
            }else if (data[0].d[7].telephone2){
              this.telephone2=data[0].d[7].telephone2;
            }else if(data[0].d[8].telephone2){
              this.telephone2=data[0].d[8].telephone2;
            }

              if(data[0].d.length>9) {
                if(data[0].d[9].telephone2){
                 this.telephone2=data[0].d[9].telephone2;
                }
              }
              this.fax0=data[0].d[5].fax;
              this.fax1=data[0].d[6].fax;
              this.fax2=data[0].d[7].fax;
              this.fax3=data[0].d[8].fax; 

            if(data[0].d[5].email){
              this.email=data[0].d[5].email;
            }
            else if(data[0].d[6].email){
              this.email=data[0].d[6].email;
            }
            else if(data[0].d[7].email){
              this.email=data[0].d[7].email;
            }else if(data[0].d[8].email){
              this.email=data[0].d[8].email;
            }else{
              if(data[0].d.length>9) {
              this.email=data[0].d[9].email;
            }
            }   

   this.longitude11=data[0].d[6].longitude;
   this.latitude11=data[0].d[7].latitude;
  
           console.log('longitude11',this.longitude11);
           console.log('latitude11',this.latitude11); 
   this.longitude9=data[0].d[7].longitude;
   this.latitude9=data[0].d[8].latitude;

   this.web=data[0].d[8].web;
   

    this.rubrique0=data[0].d[6].rubrique;
   
  
    this.rubrique1=data[0].d[7].rubrique;
   
    this.rubrique2=data[0].d[8].rubrique;
   
   if(data[0].d.length>9) {
     this.rubrique3=data[0].d[9].rubrique;
     this.longitude0=data[0].d[9].longitude;
     this.latitude8=data[0].d[9].latitude;
   }
   this.longitude8=data[0].d[8].longitude;
   
   console.log('longitude8 ',this.longitude8);
   console.log('latitude8 ',this.latitude8);

   

   this.web2=data[0].d[7].web;
   if(data[0].d.length>9) {
     if(data[0].d[9].module){
        this.module0=data[0].d[9].module;
        console.log('this.module12',this.module0);
     }
   }
   if(data[0].d[8].web){
     this.web1=data[0].d[8].web;
   }
     if(data[0].d.length>9) {
        if(data[0].d[9].web){
         this.web1=data[0].d[9].web;     
       }
     }
 console.log('weeee',data[0].d.length);
  
   
   if(data[0].d.length>10){
     this.texte1=data[0].d[10].texte;
     this.web3=data[0].d[10].web;
     this.latitude0=data[0].d[10].latitude;
     this.longitude7=data[0].d[10].longitude;
     console.log('this.latitude0 10',this.latitude0);

     this.rubrique4=data[0].d[10].rubrique;
     if(data[0].d[10].module){
      this.module0=data[0].d[10].module;
      console.log('this.module12',this.module0);
     }
   }
   if(data[0].d.length>11) {
      this.rubrique5=data[0].d[11].rubrique;
      this.texte2=data[0].d[11].texte;
      this.longitude1=data[0].d[11].longitude;
      this.latitude7=data[0].d[11].latitude;
      console.log('this.longitude1',this.latitude7);
      this.module6=data[0].d[11].module;

   }
    if(data[0].d.length>9) {
      this.web1=data[0].d[9].web;
    }
   if(data[0].d.length>12) {
      this.longitude2=data[0].d[12].longitude;
      this.rubrique6=data[0].d[12].rubrique;
      this.latitude1=data[0].d[12].latitude;
      if(data[0].d[12].module){
        this.module0=data[0].d[12].module;
      }
     
   }
   if(data[0].d.length>13) {
      this.latitude2=data[0].d[13].latitude;
      this.longitude3=data[0].d[13].longitude;
      if(data[0].d[13].module){
        this.module0=data[0].d[13].module;
      }
      this.rubrique7=data[0].d[13].rubrique;
      
   }
   if(data[0].d.length>14) {
      this.video=data[0].d[14].video;
      this.module1=data[0].d[14].module;
      this.longitude4=data[0].d[14].longitude;
      this.latitude3=data[0].d[14].latitude;
      this.rubrique8=data[0].d[14].rubrique;
      console.log('rubrique 6',this.rubrique6);

   }
      if(data[0].d.length>15) {
      this.poids=data[0].d[15].poids;
      this.motcle=data[0].d[15].motcle;
      this.module2=data[0].d[15].module;
      this.latitude4=data[0].d[15].latitude;
      this.longitude5=data[0].d[15].longitude;
      this.rubrique9=data[0].d[15].rubrique;
      console.log('rubrique 7',this.rubrique7);      

   }
   
      if(data[0].d.length>16) {
      this.region=data[0].d[16].region;
      this.module3=data[0].d[16].module;
      this.longitude6=data[0].d[16].longitude;  
      this.latitude5=data[0].d[16].latitude;
      this.longitude6=data[0].d[16].longitude; 
      this.webinfo_link6=data[0].d[16].webinfo_link;

      this.rubrique10=data[0].d[16].rubrique;

      this.webinfo_link_orig6=data[0].d[16].webinfo_link;

    if(this.webinfo_link6){
        let l=this.webinfo_link6.length;
      if((this.webinfo_link6.includes('http://www.'))){
        this.webinfo_link6 =this.webinfo_link6.substring(11,l);
         console.log('http');
      }
      if((this.webinfo_link6.includes('https://www.'))){
        this.webinfo_link6 =this.webinfo_link6.substring(12,l);
         console.log('https');
      }
      if(this.webinfo_link6.includes('/index.html')){
        this.webinfo_link6 =this.webinfo_link6.substring(0,l-22);
        console.log('/index.html');
      }
    }
      console.log('module 2:',this.module3);
   }

      if(data[0].d.length>17){
      this.longitude10=data[0].d[17].longitude;  

      this.latitude6=data[0].d[17].latitude;
      this.module5=data[0].d[17].module;
      this.webinfo_link5=data[17].webinfo_link;
      this.webinfo_link_orig5=data[17].webinfo_link;

    if(this.webinfo_link5){
        let l=this.webinfo_link5.length;
      if((this.webinfo_link5.includes('http://www.'))){
        this.webinfo_link5 =this.webinfo_link5.substring(11,l);
         console.log('http');
      }
      if((this.webinfo_link5.includes('https://www.'))){
        this.webinfo_link5 =this.webinfo_link5.substring(12,l);
         console.log('https');
      }
      if(this.webinfo_link5.includes('/index.html')){
        this.webinfo_link5 =this.webinfo_link5.substring(0,l-22);
        console.log('/index.html');
      }
    }
   }
      if(data[0].d.length>18){
      this.module4=data[18].module;

      this.webinfo_link4=data[0].d[18].webinfo_link;
      this.webinfo_link_orig4=data[0].d[18].webinfo_link;
         console.log('webinfo_link4',this.webinfo_link4);
      this.latitude10=data[0].d[18].latitude;
     
    if(this.webinfo_link4){
        let l=this.webinfo_link4.length;
      if((this.webinfo_link4.includes('http://www.'))){
        this.webinfo_link4 =this.webinfo_link4.substring(11,l);
         console.log('http');
      }
      if((this.webinfo_link4.includes('https://www.'))){
        this.webinfo_link4 =this.webinfo_link4.substring(12,l);
         console.log('https');
      }
      if(this.webinfo_link4.includes('/index.html')){
        this.webinfo_link4 =this.webinfo_link4.substring(0,l-22);
        console.log('/index.html');
      }
    }
   }
      if(data[0].d.length>19) {
      this.webinfo_link1=data[0].d[19].webinfo_link;
      this.webinfo_link_orig1=data[0].d[19].webinfo_link;
      this.module7=data[0].d[19].module;


    if(this.webinfo_link1){
            let l=this.webinfo_link1.length;
      if((this.webinfo_link1.includes('http://www.'))){
        this.webinfo_link1 =this.webinfo_link1.substring(11,l);
         console.log('http');
      }
      if((this.webinfo_link1.includes('https://www.'))){
        this.webinfo_link1 =this.webinfo_link1.substring(12,l);
         console.log('https');
      }
      if(this.webinfo_link1.includes('/index.html')){      
        this.webinfo_link1 =this.webinfo_link1.substring(0,l-22);
        console.log('/index.html');

      }
    }
   } 

     if(data[0].d.length>20) {
      this.webinfo_link2=data[0].d[20].webinfo_link;
      this.webinfo_link_orig2=data[0].d[20].webinfo_link;


    if(this.webinfo_link2){
            let l=this.webinfo_link2.length;
      if((this.webinfo_link2.includes('http://www.'))){
        this.webinfo_link2 =this.webinfo_link2.substring(11,l);
         console.log('http');
      }
      if((this.webinfo_link2.includes('https://www.'))){
        this.webinfo_link2 =this.webinfo_link2.substring(12,l);
         console.log('https');
      }
      if(this.webinfo_link2.includes('/index.html')){
        
        this.webinfo_link2 =this.webinfo_link2.substring(0,l-22);
        console.log('/index.html');

      }
    }
   }  
      if(data[0].d.length>21) {
      this.webinfo_link3=data[21].webinfo_link;
      this.webinfo_link_orig3=data[21].webinfo_link;


    if(this.webinfo_link3){
        let l=this.webinfo_link3.length;
      if((this.webinfo_link3.includes('http://www.'))){
        this.webinfo_link3 =this.webinfo_link3.substring(11,l);
         console.log('http');
      }
      if((this.webinfo_link3.includes('https://www.'))){
        this.webinfo_link3 =this.webinfo_link3.substring(12,l);
         console.log('https');
      }
      if(this.webinfo_link3.includes('/index.html')){
        this.webinfo_link3 =this.webinfo_link3.substring(0,l-22);
        console.log('/index.html');
      }
    }
   }


   if(data[0].d.length>25){
      this.webinfo_link7=data[25].webinfo_link;
      this.webinfo_link_orig7=data[25].webinfo_link;

    if(this.webinfo_link7){
        let l=this.webinfo_link7.length;
      if((this.webinfo_link7.includes('http://www.'))){
        this.webinfo_link7 =this.webinfo_link7.substring(11,l);
         console.log('http');
      }
      if((this.webinfo_link7.includes('https://www.'))){
        this.webinfo_link7 =this.webinfo_link7.substring(12,l);
         console.log('https');
      }
      if(this.webinfo_link7.includes('/index.html')){
        this.webinfo_link7 =this.webinfo_link7.substring(0,l-22);
        console.log('/index.html');
      }
    }
      console.log('webinfo_link7 :',this.webinfo_link7);
   }
           console.log('ddd',data);
     	});
     }


  ionViewDidLoad() {

    // this.loadMap();


     //recuperation des infos depuis la page search-jaune
     //this.pro= this.navParams.get('pro');
     this.currentLat=this.navParams.get('lat');
     this.currentLng=this.navParams.get('lng');
     this.code_firme=this.navParams.get('code_firme');

     console.log('single pro',this.code_firme);
     console.log('single pro lng',this.currentLng);
      this.go_build_Ann_Inv(this.code_firme);
    //this.loadmap();
    //console.log('loadmap',this.loadmap());





    this.platform.ready().then(()=>{
      let element = this.mapElement.nativeElement;
      this.map =this.googleMaps.create('map');
      // this.map = GoogleMaps.create('map', options);
      this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
        
        // le test sur l'existance de longitude et latitude
        if(this.longitude0 && this.latitude0){
          this.location =new LatLng(+this.latitude0,+this.longitude0);
          this.destinationLat=+this.latitude0;
          this.destinationLng=+this.longitude0;

        }
        else if(this.longitude1 && this.latitude1){
          this.location =new LatLng(+this.latitude1,+this.longitude1);
          this.destinationLat=+this.latitude1;
          this.destinationLng=+this.longitude1;          
        }else if(this.longitude2 && this.latitude2){
           this.location =new LatLng(+this.latitude2,+this.longitude2);
           this.destinationLat=+this.latitude2;
           this.destinationLng=+this.longitude2;           
        }else if(this.longitude3 && this.latitude3){
           this.location =new LatLng(+this.latitude3,+this.longitude3);
           this.destinationLat=+this.latitude3;
           this.destinationLng=+this.longitude3;          
        } else if(this.longitude4 && this.latitude4){
           this.location =new LatLng(+this.latitude4,+this.longitude4);
           this.destinationLat=+this.latitude4;
           this.destinationLng=+this.longitude4;          
        }
         else if(this.longitude5 && this.latitude5){
           this.location =new LatLng(+this.latitude5,+this.longitude5);
           this.destinationLat=+this.latitude5;
           this.destinationLng=+this.longitude5;           
        }
         else if(this.longitude6 && this.latitude6){
           this.location =new LatLng(+this.latitude6,+this.longitude6);
           this.destinationLat=+this.latitude6;
           this.destinationLng=+this.longitude6;          
        }
        else if(this.longitude7 && this.latitude7){
           this.location =new LatLng(+this.latitude7,+this.longitude7);
           this.destinationLat=+this.latitude7;
           this.destinationLng=+this.longitude7;           
        }else if(this.longitude8 && this.latitude8){
           this.location =new LatLng(+this.latitude8,+this.longitude8);
           this.destinationLat=+this.latitude8;
           this.destinationLng=+this.longitude8;           
        }
        else if(this.longitude9 && this.latitude9){
           this.location =new LatLng(+this.latitude9,+this.longitude9);
           this.destinationLat=+this.latitude9;
           this.destinationLng=+this.longitude9;           
        }
        else if(this.longitude10 && this.latitude10){
           this.location =new LatLng(+this.latitude10,+this.longitude10);
           this.destinationLat=+this.latitude10;
           this.destinationLng=+this.longitude10;           
        }
        else if(this.longitude11 && this.latitude11){
           this.location =new LatLng(+this.latitude11,+this.longitude11);
           this.destinationLat=+this.latitude11;
           this.destinationLng=+this.longitude11;   
           console.log('destinationLat',this.destinationLat);
           console.log('destinationLng',this.destinationLng);        

        }
        else{
          this.locateExiste =true;
        }

        //this.location =new LatLng(+this.latitude2,+this.longitude2);
        //this.location =new LatLng(33.512609,-7.659389);

        let options ={
          target: this.location,
          zoom: 16
        };
        this.map.moveCamera(options);
        setTimeout(()=>{this.addMarker()},2000);
      });

    });
      
      // recuperation des prestation et passer le code firme
      setTimeout(()=>{
      this.listPrestations=this.prestation_dispaly(this.code_firme);
    },500)
  }

  //suite recuperation et affectation au listpresta
  prestation_dispaly(code_firme){
    this.prestation(code_firme).then((data)=>{
       this.listPrestations=data;
      console.log('this',this.listPrestations);

    })
     return this.listPrestations;  
  }
  // pour recuperer les prestation par code firme
 prestation(code_firme){
       let list: any = [];
       return new Promise((resolve,  reject) =>{
       let  start_files_sec =1;
       //let code_firme =;
       var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
          data_send += '  <methodcall>';
          data_send += '    <methodname call="get_prestation_by_cf">';  
          data_send += '      <params>';  
          data_send += '        <value>';
          data_send += '          <string>'+code_firme+'</string>';
          data_send += '          <extract>5</extract>';  
          data_send += '        </value>';
          data_send += '      </params>';  
          data_send += '    </methodname>';
          data_send += '  </methodcall>';
       $.ajax({
              
              type       : "POST",
              url        : "https://www.telecontact.ma/WsMobTlC2014nVZA",
              //headers: {accepts: '*'},
              crossDomain: true,
              beforeSend : function() {$("#results_loading").append('<div class="noresults"><br /><br />Veuillez patienter<br /><br /><img src="media/images/home/load_result.gif" /></div>');/*$.mobile.loading('show')*/},
              complete   : function() {$("#results_loading").hide();/*$.mobile.loading('hide')*/},
              data       : {telecontact : data_send},
              dataType   : 'text',
              success    : function(response) {
        
                              
                 
                let parser = new xml2js.Parser(
                       {
                          trim: true,
                          explicitArray: true
                       });
              parser.parseString(response, function (err, result){
                
               // console.log('response ville',result);

                for(let answers of result.search_answers.search_answer) {
                                  console.log('answers ddd',answers.items[0].length);  

                             if (answers.items[0].length==3) {
                                  console.log('answers nulll',answers);  
                                     //yyy.push({'title': 'Aucun resultat'}); 
                               }else{
 console.log('else',answers.items);
                 
                     for(let item of answers.items){
                        if(item !=null)  {
                           console.log('itemitemitemitemitemitem ',item);
                       for(let i of item.item){
                         //console.log('item d',i);
                         list.push({'title': i.name[0]});
      //console.log('this.listPrestations',list);

                       }
                     }else{
                     list.push({'title': 'Aucun resultat3'}); 
                           console.log('itemitemitemitemitemitem 2',item);

                     }
                     }
                   }
                 }
                 resolve(list);
                });
              }
       });
    });
     }

      ann_Invers_by_cd(code_firme){
       let list: any = [];
       return new Promise((resolve,  reject) =>{
       let  start_files_sec =1;
		var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
		data_send += '	<methodcall>';
		data_send += '		<methodname call="get_one">';
		//data_send += '		<methodname call="get_one_web">';	
		data_send += '			<params>';	
		data_send += '				<value>';
		data_send += '					<codefirme>'+code_firme+'</codefirme>';
		data_send += '				</value>';
		data_send += '			</params>';	
		data_send += '		</methodname>';
		data_send += '	</methodcall>';
       $.ajax({
              
              type       : "POST",
              url        : "https://www.telecontact.ma/WsMobTlC2014nVZA",
              //headers: {accepts: '*'},
              crossDomain: true,
              beforeSend : function() {$("#results_loading").append('<div class="noresults"><br /><br />Veuillez patienter<br /><br /><img src="media/images/home/load_result.gif" /></div>');/*$.mobile.loading('show')*/},
              complete   : function() {$("#results_loading").hide();/*$.mobile.loading('hide')*/},
              data       : {telecontact : data_send},
              dataType   : 'text',
              success    : function(response) {
        
                              
                 
                let parser = new xml2js.Parser(
                       {
                          trim: true,
                          explicitArray: true
                       });
              parser.parseString(response, function (err, result){
                
              

                for(let answers of result.search_answers.search_answer) {
                                  console.log('answers ddd',answers.items[0].length);  

                             if (answers.items[0].length==3) {
                                  console.log('answers nulll',answers);  
                                     //yyy.push({'title': 'Aucun resultat'}); 
                               }else{
                      console.log('else',answers.items);
                 
                     for(let item of answers.items){

                        if(item !=null)  {
                       for(let i of item.item){
                         for(let i_data of i.item_data){
                              let d: any =[];
                           for(let data of i_data.data){
                              let   type=data.$.name;
                            //console.log('type', type);                              
                              d.push({[type]: data._});                         
                             //list.push({key: data.$.name, value: data._});
                             }
                             console.log('lllllll',d);
                            list.push({d});  
                        }
                       }
                     }else{
                     list.push({'title': 'Aucun resultat3'}); 
                           console.log('itemitemitemitemitemitem 2',item);

                     }
                     }
                   }
                 }
                 resolve(list);
                });
              }
       });
    });
     }

}
