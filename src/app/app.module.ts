import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps } from "@ionic-native/google-maps";
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { TabsPage } from '../pages/tabs/tabs';
import { BlanchesPage } from '../pages/blanches/blanches';
import { JaunesPage } from '../pages/jaunes/jaunes';
import { Functions } from '../providers/functions';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Diagnostic } from '@ionic-native/diagnostic';
import { CallNumber } from '@ionic-native/call-number';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { GoogleAnalyitcsService } from '../providers/GoogleAnalyitcs.service';
import { DiagnosticService } from '../providers/Diagnostic.service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    JaunesPage,
    BlanchesPage,
  ],
  imports: [
    IonicStorageModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    JaunesPage,
    BlanchesPage,
  ],

  providers: [
    StatusBar,
    SplashScreen,
    Functions,
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    LaunchNavigator,
    Diagnostic,
    CallNumber,
    FirebaseAnalytics,
    GoogleAnalytics,
    GoogleAnalyitcsService,
    DiagnosticService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
