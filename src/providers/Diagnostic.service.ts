import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AlertController  } from 'ionic-angular';
@Injectable()
export class DiagnosticService {

	constructor(private diagnostic: Diagnostic,
		       private alertController: AlertController,
		       ){

	}
    
    enableLocation(){
    	this.diagnostic.isLocationEnabled().then((isAvailable)=>{
         if(isAvailable){
          
         }else{
            this.alertEnableLocalisation();
         }
      },function(error){
       
      });
    }

    alertEnableLocalisation(){
	     let alert =this.alertController.create({
	       title: "Votre position ne peut être déterminée.",
	       subTitle: "Pour continuer, activer la localision de l'appareil, qui utilise le service de localisation",
	       enableBackdropDismiss: false,
	       buttons:[
	        /*{
	          text: 'NON, MERCI',
	          role: 'cancel',
	        },*/
	        {
	          text: 'Paramètres',
	          handler: ()=>{
	            this.diagnostic.switchToLocationSettings();
	          }
	        }
	       ]
	     });
	      alert.present();
   }

}