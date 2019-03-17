import { Component, OnInit } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';
import { Observable, Subject } from 'rxjs';
import * as $ from 'jquery';
import xml2js from 'xml2js';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleAnalyitcsService } from '../../providers/GoogleAnalyitcs.service';

@IonicPage()
@Component({
  selector: 'page-search-jaune',
  templateUrl: 'search-jaune.html',
})
export class SearchJaunePage implements OnInit{
  quiquoi; 
  ou;
  list;
  listScroll;
  count; count1; count2; count3;
  items = [];
  start =1;
  extract =10;
  pos;
  posScroll;
  extract_sd;
  first   ; 
  second  ; 
  third   ; 
  firstScroll   ; 
  secondScroll  ; 
  thirdScroll   ;
  i=0;
  reste =this.start;
  posTest;
  currentLat;
  currentLng;
  noResult: boolean = false; 
  arrScroll: any =[];
  private searchTerms = new Subject<string>();

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	          private geolocation: Geolocation,
              private googleAnalyitcsService: GoogleAnalyitcsService,

              ) {
    
  }
  
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
          console.log('this.list.push(data[0])',this.list.length);

      setTimeout(() => {

        if(this.extract!=10||this.start>this.count  ||   this.extract<0 || this.count<10 || (this.start-this.count<10 &&this.start-this.count>0)){
          
            infiniteScroll.enable(false);
                    console.log('this.start>this.count');
                  }   
        else{

          this.start=this.start+10;
          this.extract_sd=10;
           console.log('this.pos :', this.pos);
                                    
            this.i++;
            console.log('i :',this.i); 
            if(this.count-this.start<10 ){
              this.extract=this.count-this.start;
               console.log('this.extract',this.extract);
}
           

            if(!this.posScroll){
              this.posScroll=this.pos;
            }
            if(!this.firstScroll){
              this.firstScroll =this.first;
            }
            if(!this.secondScroll){
              this.secondScroll =this.second;
            }          
            if(!this.thirdScroll){
              this.thirdScroll =this.third;
            }
            //pour gerer le deuxieme panier
            if(this.firstScroll!='result' &&this.secondScroll=='result'){
              this.secondScroll='complet';
            console.log('second :', this.secondScroll);

            }
            console.log('posScroll :', this.posScroll);
            console.log('extract_sd :', this.extract_sd);
            console.log('first :', this.firstScroll);
            console.log('third :', this.thirdScroll); 
            this.onSubmitFormScroll(this.quiquoi,this.ou, this.start, this.extract,this.firstScroll,this.secondScroll,this.thirdScroll,this.posScroll,this.extract_sd);
infiniteScroll.complete();  
                       }
        

        
      },500);
   
  }
  ionViewDidLoad() {
   
     //appel a google analytics
     this.googleAnalyitcsService.analyticsGoogles('SearchJaunePage');


        this.quiquoi =this.navParams.get('quiquoi');
        this.ou =this.navParams.get('ou');
        this.currentLat =this.navParams.get('lat');
        this.currentLng =this.navParams.get('lng');
                  console.log('lat',this.currentLat);
        console.log('lng',this.currentLng);
        console.log('ou de recherche',this.ou);
         
        /* this.geolocation.getCurrentPosition().then((resp)=>{
        this.currentLat=resp.coords.latitude;
        this.currentLng=resp.coords.longitude;
        console.log('lat',this.currentLat);
        console.log('lng',this.currentLng);
         });*/

        if(this.quiquoi && this.ou){
          
          this.list = this.onSubmitForm(this.quiquoi,this.ou);
          console.log('je ss in Autour de moi:', this.ou);
          console.log('lat',this.currentLat);
          console.log('lng',this.currentLng);
       }  
  }


     onSubmitForm(quiquoi: string, ou: string){
        this.listesResultats(quiquoi,ou).then(
          (data)=>{this.list=data[0],
            this.count=data[1],
            this.pos =data[2],
            this.first =data[3],
            this.second =data[4],
            this.third =data[5],
          console.log('this.posScroll',this.pos);

          console.log('this.first',this.first);
          console.log('this.second',this.second);
          console.log('this.third',this.third);

        }
          );    
        //this.navCtrl.push(SearchJaunePage,{list: this.list});
        return this.list;      
    }

      onSubmitFormScroll(quiquoi: string, ou: string, start,extract,first,second,third,pos,extract_sd){
               
           console.log('posScroll scrollllll avant',this.posScroll);
        
       
        this.listesResultatsScroll(quiquoi,ou, start,extract,first,second,third,pos,extract_sd).then(
          (data)=>{
            this.posTest =this.posScroll;
            console.log('posScroll scrollllll avant',this.posScroll);
            this.posScroll=data[2];
           console.log('posScroll scrollllll',this.posScroll);

            this.firstScroll =data[3],
           console.log('firstScroll scrollllll',data[3]);

            this.secondScroll =data[4],
           console.log('secondScroll scrollllll',this.secondScroll);

            this.thirdScroll =data[5],
           console.log('thirdScroll scrollllll',this.thirdScroll);
          if(this.posTest ==this.posScroll && this.posTest!=1 && this.posScroll!=1){
           console.log('this.posTest ==this.posScroll');
     this.start=this.start-10;
          }else{
            for(let i=0 ; i<data[0].length;i++){
            this.list.push(data[0][i]);
    
            }
                       console.log('this.start--10');
       
          }          
        }
          );
         return this.list;      
    }
    

    onDisplayPro(pro: {rs_comp: string, adresse: string}){
      this.navCtrl.push('SingleProPage', {pro: pro,lat: this.currentLat, lng: this.currentLng})
    }

  ngOnInit(){

  }

      listesResultatsScroll(quiquoi,ou,start=1,extract,f,s,t,pos1,extract_sd ){
         let list: any = [];
         let count;
         let i, posScroll;
         let firstScroll,secondScroll, thirdScroll;
          return new Promise((resolve,  reject) =>{
            
          var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
          data_send += '  <methodcall>';
          data_send += '    <methodname call="hmida">';  
          data_send += '      <params>';  
          data_send += '        <value>';
          data_send += '          <string>'+quiquoi+'</string>';
          data_send += '          <ou>'+ou+'</ou>';
          data_send += '          <region>Rabat-Salé-Zemmour-Zaër</region>';
          data_send += '          <start>'+start+'</start>';
          data_send += '          <extract>'+extract+'</extract>';  
          data_send += '          <first>'+f+'</first>';  
          data_send += '          <second>'+s+'</second>';  
          data_send += '          <third>'+t+'</third>';
          data_send += '          <pos>'+pos1+'</pos>';
          data_send += '          <extract_sd>'+extract_sd+'</extract_sd>';
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
                       console.log('result', result);
                        posScroll = result.search_answers.search_answer[0].items[0].$.pos;
                        count =result.search_answers.search_answer[0].items[0].$.count;
                        firstScroll  = result.search_answers.search_answer[0].items[0].$.first;
                        secondScroll  = result.search_answers.search_answer[0].items[0].$.second;
                        thirdScroll  = result.search_answers.search_answer[0].items[0].$.third;
console.log('firstScroll', firstScroll);
console.log('secondScroll', secondScroll);
console.log('thirdScroll', thirdScroll);

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
                   resolve([list,count,posScroll,firstScroll,secondScroll,thirdScroll]);
                   console.log('dd :',list);
                             //this.list=list;
                 }
                  });
              }, 
              error: function(error){
                console.log(error);
                reject();

              }
            });
          });

    }
      listesResultats(quiqoui,ou){
         let list: any = [];
         let count,count1,count2,count3;
         let pos,extract_sd;
         let first,second, third;
          return new Promise((resolve,  reject) =>{

              var quiquoi = this.quiquoi; 
              var ou = this.ou; 

              var start   = '1'; 
              var f   = 'result'; 
              var s  ='result'; 
              var t   = 'result'; 
              var pos     = '0'; 
              var extract_sd   = '10'; 
              var extract ='10';


          var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
          data_send += '  <methodcall>';
          data_send += '    <methodname call="hmida">';  
          data_send += '      <params>';  
          data_send += '        <value>';
          data_send += '          <string>'+quiquoi+'</string>';
          data_send += '          <ou>'+ou+'</ou>';
          data_send += '          <region>Rabat-Salé-Zemmour-Zaër</region>';
          data_send += '          <start>'+start+'</start>';
          data_send += '          <extract>'+extract+'</extract>';  
          data_send += '          <first>'+f+'</first>';  
          data_send += '          <second>'+s+'</second>';  
          data_send += '          <third>'+t+'</third>';
          data_send += '          <pos>'+pos+'</pos>';
          data_send += '          <extract_sd>'+extract_sd+'</extract_sd>';
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
                       console.log('result', result.search_answers.search_answer[0].items[0].$.count);
                        count  = result.search_answers.search_answer[0].items[0].$.count;
                        count1 = result.search_answers.search_answer[0].items[0].count_section[0].$.count1;
                        count2 = result.search_answers.search_answer[0].items[0].count_section[0].$.count2;
                        count3 = result.search_answers.search_answer[0].items[0].count_section[0].$.count3;
                        pos  = result.search_answers.search_answer[0].items[0].$.pos;
                        first  = result.search_answers.search_answer[0].items[0].$.first;
                        second  = result.search_answers.search_answer[0].items[0].$.second;
                        third  = result.search_answers.search_answer[0].items[0].$.third;
console.log('first', first);
console.log('second', second);
console.log('third', third);
                       //count=result.search_answers.search_answer.items[0].$.count;
                     
                   for(let answers of result.search_answers.search_answer) {
                          

                         if (answers.items[0]=="      ") {

                                     list.push({'title': 'Aucun resultat'}); 
                               }else{

                     for(let item of answers.items){
                             console.log('i :',item.$.count);   
                      if(item.$.count>0)  {
                       for(let i of item.item){
            
                         for(let i_data of i.item_data){
    
                              let d: any =[];
                           for(let data of i_data.data){
                                                 //console.log(data.$);
                               //console.log('data',data);
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
                   resolve([list,count,pos,first,second,third]);
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
