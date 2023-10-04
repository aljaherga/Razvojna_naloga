import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient){}

  addPerson(personData: any): Observable<any>{
    return this.http.post('https://api4.allhours.com/api/v1/Users', personData);
  }
}