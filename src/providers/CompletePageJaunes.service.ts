import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
//import xmlrpc from 'xmlrpc';
import * as $ from 'jquery';
import xml2js from 'xml2js';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
//@Injectable({ providedIn: 'root' })
export class CompletePageJaunes implements OnInit{
  quiquoi$: Observable<any>; 
  private searchTerms = new Subject<string>();
  private url = 'https://www.telecontact.ma/WsMobTlC2014nVZA';
  private extractData(res: Response) {
        let body = res;
        return body || { };
   }
   constructor(private http: HttpClient){}
   

  /*search(term: string): void{
    this.searchTerms.next(term);
  }*/
  
  ngOnInit(){
    /*
    this.quiquoi$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.autocomplete_quiquoi(term)));*/
  }

  


}