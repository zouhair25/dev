import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  search = 'SearchPage';
  about = AboutPage;
  contact = ContactPage;
  historique = 'HistoriquePage';
  favoris = 'FavorisPage';
  appointment =   'AppointmentPage';
  login = 'LoginPage';

  constructor() {

  }
}
