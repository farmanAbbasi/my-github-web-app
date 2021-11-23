import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  
  //base github api
  BASE_GITHUB_API_URL:string="https://api.github.com";
  //global var for searchTerm
  search:string="farmanAbbasi";
  //global var to make sure when transition happens from history route
  fromHistory:boolean=false;

  constructor(public http: HttpClient) { }

  //Get req and return a promise
  getReq(url){
    return this.http.get(url).toPromise();  
  }


}
