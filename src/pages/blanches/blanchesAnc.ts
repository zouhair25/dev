import { Component,HostListener } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';
import xml2js from 'xml2js';
import { JaunesPage } from '../jaunes/jaunes';
import { GoogleAnalyitcsService } from '../../providers/GoogleAnalyitcs.service';

@Component({
  selector: 'page-blanches',
  templateUrl: 'blanches.html',
})
export class BlanchesPage {
  
  quiquoi: string='';
  list;
  tel;
  count;
  lat;
  lng;
  noResult: boolean = false; 
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private googleAnalyitcsService: GoogleAnalyitcsService,
              ) {
  }

  ionViewDidLoad() {
     //appel a google analytics
     this.googleAnalyitcsService.analyticsGoogles('Annuaire inversé');
            this.tel =this.navParams.get('tel');
            this.lat =this.navParams.get('lat');
            this.lng =this.navParams.get('lng');

            
         console.log('tel o:', this.tel);
         this.list=this.listeResultatTelToArray(this.tel);
          console.log('tel o:', this.list);
  
  }
      
  onGoJaunesPage(){
    this.navCtrl.push(JaunesPage);
  }

      listeResultatTel(tel){
         let list: any = [];
         let count;
        let noResult: boolean = false;
          return new Promise((resolve,  reject) =>{

            //var tel = '0522777100';
            var start='1' 
            var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
            data_send += '  <methodcall>';
            data_send += '    <methodname call="ann_inv">';  
            data_send += '      <params>';  
            data_send += '        <value>';
            data_send += '          <numero>'+tel+'</numero>';
            data_send += '          <start>'+start+'</start>';
            data_send += '          <extract>30</extract>';  
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
                    if (result) {
                       console.log('result', result);
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
                              //console.log('data', data);

                             }
                            list.push({d});                                                           
                         }
                       }
                      }else{
                         list.push({'title': 'Aucun resultat'}); 
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

    listeResultatTelToArray(tel: string){
       this.listeResultatTel(tel).then(
          (data)=>{this.list=data[0],this.count=data[1],
            this.noResult=data[2];  
          console.log('yes nows ssss',this.count);
        });
       return this.list;
    }
    

       onDisplayAnv(code_firme,lat, lng){
      this.navCtrl.push('SingleAnvPage', {code_firme: code_firme,lat: this.lat, lng: this.lng})
    }
}
