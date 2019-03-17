import { Injectable } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


@Injectable()
export class GoogleAnalyitcsService {
  
  constructor(private ga: GoogleAnalytics){
   
  }

  analyticsGoogles(page){
   this.ga.startTrackerWithId('UA-42266203-1').then(()=>{
      console.log('Google analytics is ready now');
      this.ga.trackView(page);
   }).catch(e => console.log('Error starting GoogleAnalytics', e));
  }
}