import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = "https://api4.allhours.com/api/v1/Users"; 
  private accessToken = 'https://login.allhours.com/connect/token';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`,
      'content-type': 'application/json'
    });
    return this.http.get<any[]>(this.apiUrl, {headers});
  } 
}