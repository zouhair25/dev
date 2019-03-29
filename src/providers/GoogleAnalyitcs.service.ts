import { Injectable } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';


@Injectable()
export class GoogleAnalyitcsService {
  
  constructor(private ga: GoogleAnalytics,
              private firebaseAnalytics: FirebaseAnalytics){
   
  }

  analyticsGoogles(page){
   this.ga.startTrackerWithId('UA-42266203-1').then(()=>{
      this.ga.trackView(page);
   }).catch(e => console.log('Error starting GoogleAnalytics', e));
  }

  analyticsFirebase(page_view,page){
	  this.firebaseAnalytics.logEvent(page_view,page)
	  .then((res: any) => console.log(res))
	  .catch((error: any) => console.error(error));
  }
}