import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TokenService } from '../token.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  apiResponseData: any = null;
  showResponseData = false;

  users: any[] = [];

  personForm: FormGroup;

  constructor(private http: HttpClient,
    private tokenService: TokenService,
    private userService: UserService,
    private fb: FormBuilder) {
      this.personForm = this.fb.group({
        firstName: ['', Validators.required], 
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]  
        
      });
    }

  ngOnInit(): void{
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>('https://api4.allhours.com/api/v1/Users', {headers: headers},).subscribe(
      (response)=>{
        this.apiResponseData=response;
        this.users=response;
      }
    );
    
  }
  toggleResponseVisibility() {
    this.showResponseData = !this.showResponseData; 
  }

  displayDetails: boolean = false;
  userDetails: any = {};
  
  searchFirstName: string = '';
  searchLastName: string = ''; 
  searchResults: any[] = []; 

  
  Search(firstName: string, lastName: string) {

    const user = this.users.find(user => user.FirstName === firstName && user.LastName === lastName);
    return user ? user.Id : undefined;
  }

  searchUser() {
    console.log('Searching for:', this.searchFirstName, this.searchLastName);
    const userId = this.Search(this.searchFirstName, this.searchLastName);
  if (userId) {
    
    return userId; 
    console.log('User ID:', userId);
  } else {
    console.log('User not found.');
    
  }
  }


  getUserDetailsById(userId: string): any | undefined {
    return this.users.find(user => user.Id === userId);
  } 

  

  startSearch(){
    const userIdToRead = this.searchUser();
    this.userDetails = this.getUserDetailsById(userIdToRead)
    console.log('User Details:', this.userDetails);
    this.displayDetails = true;
    
  } 
  
  addPerson(personData: any): void{
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    this.http.post('https://api4.allhours.com/api/v1/Users', personData, { headers }).subscribe(
      (response) => {
        console.log('Person added successfully:', response);

      },
      (error) => {
        console.error('Error adding person:', error);
      }
      );
  }

  
  

}

