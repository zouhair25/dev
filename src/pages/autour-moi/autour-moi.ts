import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';
import xml2js from 'xml2js';

@IonicPage()
@Component({
  selector: 'page-autour-moi',
  templateUrl: 'autour-moi.html',
})
export class AutourMoiPage {
  quiquoi; 
  ou;
  list;
  listScroll;
  count; count1; count2; count3;
  items = [];
  start =1;
  extract =10;

  i=0;
  reste =this.start;

  currentLat;
  currentLng;
  noResult: boolean = false; 

  constructor(public navCtrl: NavController, public navParams: NavParams,
              ) {
  }

  ionViewDidLoad() {
        this.quiquoi =this.navParams.get('quiquoi');

  	    this.currentLat =this.navParams.get('lat');
        this.currentLng =this.navParams.get('lng');
        this.list=this.go_build_quiquoi_approxy(this.quiquoi,this.currentLat,this.currentLng,this.start);


  }
    
    onDisplayPro(pro: {rs_comp: string, adresse: string}){
      this.navCtrl.push('SingleProPage', {pro: pro,lat: this.currentLat, lng: this.currentLng})
    }
    doInfinite(infiniteScroll) {
    console.log('Begin async operation');

      setTimeout(() => {
        

        if(this.start>this.count || this.extract<0 || this.count<10){
            infiniteScroll.enable(false);
                    console.log('this.start>this.count');
        }else{

          this.start=this.start+10;
           console.log('this.pos :', this.start);
                  
            infiniteScroll.complete();  
            this.i++;
            console.log('i :',this.i); 
            if(this.count-this.start<10 ){
              this.extract=this.count-this.start;
               console.log('this.extract',this.extract);
            }
            
          
            console.log('start :',this.start);
            console.log('extract_sd :');

            this.go_build_quiquoi_approxy_scroll(this.quiquoi,this.currentLat, this.currentLng,this.start);

           
        }

        
      }, 500);
   
  }
        // remplir la liste des resultats
   go_build_quiquoi_approxy_scroll(quiquoi,lat,lng,start){
       this.go_search_quiquoi_approxy(quiquoi,lat,lng,start).then((data)=>{
       	for(let i=0 ; i<data[0].length;i++){
          this.list.push(data[0][i])
        }
        console.log('datatattata',data);
        console.log('datatattata',this.noResult);

       })
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
            data_send += '    <methodname call="approxy">'; 
            data_send += '      <params>';  
            data_send += '        <value>';
            data_send += '          <string>'+quiquoi+'</string>';
            data_send += '          <x>'+lat+'</x>';
            data_send += '          <y>'+lng+'</y>';
            data_send += '          <rayon>50000</rayon>';   
            data_send += '          <start>'+start+'</start>';
            data_send += '          <extract>10</extract>'; 
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
                       console.log('result', result);
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
