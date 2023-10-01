import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  
  clients: any[] = [];
  vpis: any = {
    ClientId: '',
    ClientSecret: ''
  };

 constructor() { }
 
  
  zaVpis(): void{
    this.clients.push(this.vpis);
    localStorage.setItem('users', JSON.stringify(this.clients));
    this.vpis = {
      ClientId: '',
      ClientSecret: ''
    };
  };
}