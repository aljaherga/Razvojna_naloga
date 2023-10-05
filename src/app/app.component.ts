import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router'; 
import {InMemoryDataService} from './in-memory-data.service'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
  title = 'razvojna-app';
  


  constructor(private router: Router, private http: HttpClient, private tokenService: TokenService) {}
  
  clients = [];
  
  

  ngOnInit() {

    const savedData = localStorage.getItem('users');
    
    if (savedData) {
      const data = JSON.parse(savedData);
      var client_id = data[0].ClientId;
      var client_secret = data[0].ClientSecret;
    } 
    
    else {
      this.clients = [];
    } 
    


    let headers = new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded',
    });
    
    const body = 
    `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}&scope=api`;
    
    this.http.post<any>('https://login.allhours.com/connect/token', body,{
      headers: headers,
    }).subscribe(data=> {
        var token = data.access_token;
        this.tokenService.setToken(data.access_token);
        
    });
  }

  } 


