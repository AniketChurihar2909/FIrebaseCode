import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private http : HttpClient) { }

rootUrl ="https://api.covid19api.com/";


  getCountries() : Observable<any>{
const url = this.rootUrl + "countries"  ;
return this.http.get<any>(url);
}
getCovidRealTimeData(country : any) : Observable<any>{
  const url = this.rootUrl + "total/dayone/country/" + country ;
  return this.http.get<any>(url);

}

}
