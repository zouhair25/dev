import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://www.telecontact.ma/WsMobTlC2014nVZA';

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {}

  getApiUrl(){
    return this.url;
  }

  getHeaders(){
    return new HttpHeaders({
      //Accept: "application/json"
      "Content-Type": "application/xml",
      Accept: "text/plain",
      'Access-Control-Allow-Origin':'*',
      //"Content-Type": "application/x-www-form-urlencoded"
    });
  }

  async getHeadersWithAuthorization(){
    let accessToken;
    await this.storage.get('accessToken').then((val) => {
      accessToken = val;
    });
    return new HttpHeaders({
      Authorization: accessToken,
      Accept: "application/json"
    });  
  }

  get(endpoint: string, reqOpts?: any) {
    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}