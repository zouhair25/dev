import { Component, OnInit, ElementRef,ViewChild  } from '@angular/core';
import { NavController, NavParams,Searchbar  } from 'ionic-angular';
import * as $ from 'jquery';
import xml2js from 'xml2js';
import { BlanchesPage } from '../blanches/blanches';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-jaunes',
  templateUrl: 'jaunes.html',
})
export class JaunesPage{
  @ViewChild('searchBox') searchBox;
  @ViewChild('searchVil') searchVil;
  @ViewChild('searchTel') searchTel;
  xmlItems$;
  xmlOu$;
  list;
  searchTerm = new Subject<string>();
  searchTermOu = new Subject<string>();
  quiquoi: string='';
  ou: string ='';
  //tel: string ='0522777100';
  tel: string ='';
  searching: any =false;
  showBlanches: boolean = false;
  showJaune: boolean = false;
  lat;
  lng;
  //pro ou inv
  type: string;

  storageVille: any =[{icon: 'locate',ville: 'Autour de moi'}];
  hasFocus: boolean =false;
 // @ViewChild('searchbar') searchBox: Searchbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private el: ElementRef,
              private geolocation: Geolocation,
              private storage: Storage,
              ) {

  }

   getLocation(){
        this.geolocation.getCurrentPosition().then((resp)=>{
     console.log('Location', resp);
     this.lat = resp.coords.latitude;
     this.lng = resp.coords.longitude;
    }).catch((error) => {
     console.log('Error getting location', error);
   });
    }

     

    getHistoriqueVille(){
        this.storage.get('storeVil').then((val) => {
            this.storageVille=val;
           console.log('Your age is', this.storageVille);
   
  });
       return this.storageVille;
    }
    onGoBlanchesPage(){
      this.showBlanches = true;
      this.showJaune = false;
      setTimeout(()=>{
        this.searchTel.setFocus();
      },500);
    }

    onGoJaunesPage(){
      this.showBlanches = false;
      this.showJaune = true;
      
      setTimeout(() => {
        this.searchBox.setFocus();

      },500);
    }
    search(term: string): void {
      this.searchTerm.next(term);    
    }

    searchVille(term: string): void {
      this.searchTermOu.next(term);
    }
    back(lat,lng){
      this.navCtrl.push('SearchPage',{lat: this.lat,lng: this.lng});
    }
 
    ionViewDidLoad() {

      setTimeout(() => {
        this.searchBox.setFocus();

      },100);
      this.getLocation();
           // recuperation de type pro ou inv pour savoir quel est à afficher
           this.type=this.navParams.get('type');
           this.lat =this.navParams.get('lat');
           this.lng =this.navParams.get('lng');
           // ici le test sur pro ou inv 
           if(this.type==="inv"){
            this.onGoBlanchesPage();
            console.log('onGoBlanchesPage');
           }else{
            this.onGoJaunesPage();
            console.log('onGoJaunesPage');
           } 
           this.searching = false;
           this.xmlItems$ = this.searchTerm.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            switchMap((term: string) => this.auto_quiquoiLoadXML(term)),
           );
            this.xmlOu$ =this.searchTermOu.pipe(
           debounceTime(100),
           distinctUntilChanged(),
           switchMap((term: string)=> this.auto_ouLoadXML(term)),
            );
           
          
    }

    selectValueQuiquoi(item){
          console.log(item);
          this.quiquoi = item.title;
          this.xmlItems$ = this.searchTerm.pipe(
          debounceTime(1500),
          distinctUntilChanged(),
          switchMap((term: string) => this.auto_quiquoiLoadXML(term)));
    }
    selectValueOu(item){

      this.storageVille.push({icon: 'refresh',ville: item.title});
      this.storage.set('storeVil',this.storageVille);
      console.log('iieiei',item);
           this.ou=item.title;
           this.xmlOu$ =this.searchTermOu.pipe(
           debounceTime(1000),
           distinctUntilChanged(),
           switchMap((term: string)=> this.auto_ouLoadXML(term)),
           );
    }
        selectValueOuHistorique(item){
            console.log('iieiei',item);
            this.ou=item.ville;
            this.storageVille=[];
           //this.storage.set('storeVille',item.storeVille);
    }
   //pour initialiser la liste de resultats quiquoi
    onClearQuiquoi(){
          this.xmlItems$ = this.searchTerm.pipe(
          debounceTime(1500),
          distinctUntilChanged(),
          switchMap((term: string) => this.auto_quiquoiLoadXML(term)),
         );
    }
       //pour initialiser la liste de resultats ou
    onClearOu(){
           this.xmlOu$ =this.searchTermOu.pipe(
           debounceTime(1000),
           distinctUntilChanged(),
           switchMap((term: string)=> this.auto_ouLoadXML(term)),
           );
    }
    onSearchInput(){
        this.searching = true;
    }
     checkFocusQuiquoi(){
        //pour ne pas initialiser la liste des villes par autour de moi
        this.hasFocus=false;
     }
        checkFocus(){
          this.xmlItems$ = this.searchTerm.pipe(
          debounceTime(1500),
          distinctUntilChanged(),
          switchMap((term: string) => this.auto_quiquoiLoadXML(term)),
         );
           //pour  initialiser la liste des villes par autour de moi
          this.hasFocus=true;
          //storage recuperer value d historique
         console.log('fff',this.storageVille);
    }
    
    /* onSubmitForm(quioui: string, ou: string){
      
    }*/

        // permet de tester si quiquoi ou ville est vide sinon il redirege vers la page search-jaune
    onDisplay(quiquoi, ou,lat,lng){
               console.log('itemitemitemitem');
               this.quiquoi =this.quiquoi.toLowerCase();
               this.ou =this.ou.toLowerCase();

           if(this.quiquoi=='' || this.quiquoi==null){        
               setTimeout(() => {
                this.searchBox.setFocus();
               },10);
           }else if(this.ou=='' || this.ou==null){    
               setTimeout(() => {
                this.searchVil.setFocus();
                console.log('Focus',this.searchVil);
               },10);
           }else if(this.ou=='autour de moi' || this.ou=="Autour de moi"){
              this.navCtrl.push('AutourMoiPage',{ou: this.ou, quiquoi: this.quiquoi,lat: this.lat,lng: this.lng})
          console.log('AutourMoiPage oui');
           }
           else if(this.quiquoi=='pharmacie de garde' || this.quiquoi=='pharmacie garde'
                   || this.quiquoi=='pharmacies garde'|| this.quiquoi=='pharmacies de garde'
                   ){
             if(this.ou=='casa'){
               this.ou='casablanca'
             }
             this.navCtrl.push('PharmacieResultPage',{ou: this.ou,lat: this.lat,lng: this.lng});
  console.log('pharmacie de garde',this.quiquoi);
           }else{
         this.navCtrl.push('SearchJaunePage',{ou: this.ou, quiquoi: this.quiquoi,lat: this.lat,lng: this.lng})
          console.log('SearchJaunePage oui');
            console.log('pharmacie de garde',this.quiquoi.toLowerCase());
          
           }
    }


    

  
      onDisplayBlanches(tel,lat,lng){
        if(this.tel=='' || this.tel==null){
          setTimeout(()=>{
            this.searchTel.setFocus();
          },10);
         
        }else{
         this.navCtrl.push(BlanchesPage, {tel: this.tel,lat: this.lat,lng: this.lng});         
           //this.navCtrl.push(BlanchesPage);         
         
        }
         console.log('Focus ccc');        
      }


    auto_quiquoiLoadXML(term: string){
      
      return this.auto_quiquoiParseXML(term);      
    }

    auto_ouLoadXML(term: string){
   
      return this.auto_ouParseXML(term);      
    }


    auto_quiquoiParseXML(quiquoi){
         let yyy: any = [];
        return new Promise((resolve,  reject) =>{

          var autocomplete_quiquoi = quiquoi; 
          var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
          data_send += '  <methodcall>';
          data_send += '    <methodname call="ann_sug">';  
          data_send += '      <params>';  
          data_send += '        <value>';
          data_send += '          <string>'+autocomplete_quiquoi+'</string>';
          data_send += '          <extract>5</extract>';  
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
                    
                        
                     
                       console.log('result',result);
                       console.log('err',err);


                   for(let answers of result.search_answers.search_answer) {
                        // console.log('answers d',answers.items[0].$.count);
                       
                           if (answers.items[0].item) {
                          console.log('result resultat');
                         for(let item of answers.items){
                                          
                           for(let i of item.item){
                             
                           yyy.push({'title': i.name[0]});                     
                             /*for(let i_data of i.item_data){
                                //console.log(i_data.data[1]._, i_data.data[1].$.name);
                                yyy.push({'title': i_data.data[1]._});
                               for(let data of i_data.data){
                                
                                 yyy.push({key: data.$.name, value: data._});
                                 
                               }
                             }*/
                           }
                         }

                            }
                   }
                   resolve(yyy);
             
                  });
              }, 
              error: function(error){
                console.log(error);
                reject();

              }
            });
        });
    }

    auto_ouParseXML(ou){
         let yyy: any = [];
          return new Promise((resolve,  reject) =>{

            var autocomplete_ou = ou; 
            var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
              data_send += '  <methodcall>';
              data_send += '    <methodname call="ann_sug">';  
              data_send += '      <params>';  
              data_send += '        <value>';
              data_send += '          <ou>'+autocomplete_ou+'</ou>';
              data_send += '          <extract>5</extract>';  
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
                    
                let parser = new xml2js.Parser(
                       {
                          trim: true,
                          explicitArray: true
                       });
                   parser.parseString(response, function (err, result)
                  {
                    
                              
                   for(let answers of result.search_answers.search_answer) {
                                          console.log('answers d',answers);  

                         if (answers.items[0].item) {
                 
                     for(let item of answers.items){
                       
                       for(let i of item.item){
                         
                         //for(let i_data of i.item_data){
                            //console.log(i_data.data[1]._, i_data.data[1].$.name);
                            yyy.push({'title': i.name[0]});
                          /* for(let data of i_data.data){
                            
                             yyy.push({key: data.$.name, value: data._});
                             
                           }*/
                         //}
                       }
                     }
                 }
                   }
                   resolve(yyy);
               
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
