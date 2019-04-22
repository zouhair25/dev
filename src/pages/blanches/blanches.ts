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
  tel ;
  count;
  lat;
  lng;
  noResult: boolean = false; 
  rs_comp;
  pro;
  ville;
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

            
         this.list=this.listeResultatTelToArray(this.tel);




   
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

            /*if(this.list[0].d[1].rs_comp){
              this.rs_comp=this.list[0].d[1].rs_comp;
            }else if(this.list[0].d[2].rs_comp){
              this.rs_comp=this.list[0].d[2].rs_comp;
            }*/

            if(this.list[0].d[3].ville){
              this.ville=this.list[0].d[3].ville;
            }else if(this.list[0].d[4].ville) {
              this.ville=this.list[0].d[4].ville; 
            }else if(this.list[0].d[5].ville) {
              this.ville=this.list[0].d[5].ville;
            }else{
              this.ville=this.list[0].d[6].ville;
            }
          
         /* setTimeout(()=>{
            console.log('yes nows ssss',this.rs_comp);
            if(this.ville && this.rs_comp){
          

              this.searchByRs_compToArray(this.rs_comp,this.ville);
            } 
          },300);*/

        });
       return this.list;
    }
    
    searchByRs_compToArray(quiquoi,ou){
       this.searchByRs_comp(quiquoi,ou).then(
          (data)=>{this.pro=data[0],this.count=data[1],
            this.noResult=data[2];

          console.log('yes nows ssss',this.pro[0].d);
        });
       return this.pro;
    }

      onDisplayAnv(pro,lat, lng){
            console.log('ddd',pro)
            if(pro[1].rs_comp){

              this.rs_comp=pro[1].rs_comp;
              this.searchByRs_compToArray(this.rs_comp,this.ville);
              console.log('ddd',this.rs_comp)

            }else if(pro[2].rs_comp){
              this.rs_comp=pro[2].rs_comp;
              this.searchByRs_compToArray(this.rs_comp,this.ville);
              console.log('yes nows ssss',this.rs_comp);
            }
            
            setTimeout(()=>{
              this.navCtrl.push('SingleProPage', {pro: this.pro[0].d,lat: this.lat, lng: this.lng})
            },200);
      }


    searchByRs_comp(quiquoi,ou){

         let list: any = [];
         let count;
         let noResult: boolean = false;
          return new Promise((resolve,  reject) =>{

            //var tel = '0522777100';
          var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
          data_send += '  <methodcall>';
          data_send += '    <methodname call="hmida">';  
          data_send += '      <params>';  
          data_send += '        <value>';
          data_send += '          <string>'+quiquoi+'</string>';
          data_send += '          <ou>'+ou+'</ou>';
          data_send += '          <region>Rabat-Salé-Zemmour-Zaër</region>';
          data_send += '          <start>1</start>';
          data_send += '          <extract>10</extract>';  
          data_send += '          <first>result</first>';  
          data_send += '          <second>result</second>';  
          data_send += '          <third>result</third>';
          data_send += '          <pos>0</pos>';
          data_send += '          <extract_sd>10</extract_sd>';
          data_send += '        </value>';
          data_send += '      </params>';  
          data_send += '    </methodname>';
          data_send += '  </methodcall>';
        
            $.ajax({
              
              type       : "POST",
              url        : "https://www.telecontact.ma/WsMobTlC2014nVZA",
              /*headers: {accepts: '*'}:*/
              crossDomain: true,
              beforeSend : function() {$("#results_loading").append('<div class="noresults"><br /><br />Veuillez patienter<br /><br /><img src="media/images/home/load_result.gif" /></div>');},
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
                      if(item.item)  {
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
}
