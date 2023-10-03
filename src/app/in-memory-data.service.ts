import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService{

  /* constructor(private http:HttpClient) { }

  IskanjeImen(){
    let url="https://api4.allhours.com/api/v1/Users";
    return this.http.get(url);
  } */
}
