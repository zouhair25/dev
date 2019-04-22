import { Component, ViewChild } from '@angular/core';
import { Platform,NavController,MenuController,AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpClient } from '@angular/common/http';
import { Diagnostic } from '@ionic-native/diagnostic';
import { DiagnosticService } from '../providers/Diagnostic.service';

declare let window: any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //tabsPage: any = TabsPage;
  tabsPage: any = 'SearchPage';
  searchPage: any = 'SearchPage';
  favorisPage: any = 'FavorisPage';
  historiquePage: any = 'HistoriquePage';
  appointmentPage: any = 'AppointmentPage';
  loginPage: any = 'LoginPage';
  optionsPage: any = 'OptionsPage';
  aboutPage: any = 'AboutPage';
  contactPage: any = 'ContactPage';

  
  version_actuell="7.0.0";
  version;
  mandatory;
  @ViewChild('content') content: NavController;

  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private http: HttpClient,
              private alertController: AlertController,
              private diagnostic: Diagnostic,
              private diagnosticService: DiagnosticService
              ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //Verification de gps enable ou disabled
       this.diagnosticService.enableLocation();
    });
          
          //recuperation de version
   this.http.get("https://www.telecontact.ma/trouver/version_mobile.php").subscribe((data)=>{
    this.version =data[0];
    this.mandatory =data[1];
    console.log('ver serv',data);
    
   });
  // test de version actuell et l'autre version
  setTimeout(()=>{

    if(this.version!=this.version_actuell && this.mandatory==0){

     this.alertNotObilgatoire();
    }
      if(this.version!=this.version_actuell && this.mandatory==1){

     this.alertIsObilgatoire();
    }
  },500)
  }

  //alert
   alertNotObilgatoire(){
     let alert=this.alertController.create({
       title: "Mise à jour",
       subTitle: "Voulez-vous faire la Mise à jour",
       buttons: [
       {
         text: 'Annuler',
         role: 'cancel',
         handler: ()=>{
            console.log('Cancel clicked');
         }
       },
       {
         text: 'Mise à jour',
         handler: ()=>{
           window.location.href='http://play.google.com/store/apps/details?id=com.telecontact.cover&hl=fr';
         //market: '//details?id=telecontact';
         }
       }
       ]
     });
     alert.present();
   }



     //alert
   alertIsObilgatoire(){
     let alert=this.alertController.create({
       title: "Mise à jour",
       subTitle: "Voulez-vous faire la Mise à jour",
       enableBackdropDismiss: false,
       buttons: [
       {
         text: 'Mise à jour',
         handler: ()=>{
           window.location.href='http://play.google.com/store/apps/details?id=com.telecontact.cover&hl=fr';
         //market: '//details?id=telecontact';
         }
       }
       ]
     });
     alert.present();
   }
    onNavigate(page: any) {
    this.content.setRoot(page);
    this.menuCtrl.close();
  }


 
 
}

