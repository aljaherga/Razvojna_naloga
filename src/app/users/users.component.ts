import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TokenService } from '../token.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface ApiResponse {
  Id: string;
  Name: string;
}



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent{

  OneisHidden = false;
  OneVisibility() {
    this.OneisHidden = !this.OneisHidden;
  }
  TwoisHidden = false;
  TwoVisibility() {
    this.TwoisHidden = !this.TwoisHidden;
  }
  ThreeisHidden = false;
  ThreeVisibility() {
    this.ThreeisHidden = !this.ThreeisHidden;
  }
  FourisHidden = false;
  FourVisibility() {
    this.FourisHidden = !this.FourisHidden;
  }




  apiResponseData: any = null;
  showResponseData = false;

  users: any[] = [];
  
  allUsers: any[] = [];

  personForm: FormGroup;
  absenceForm: FormGroup;

  fromDate: string = '';     
  toDate: string = '';       
  firstName: string = '';    
  lastName: string = '';  
  userId: string = '';   
  selectedOption: string = '';

  currentTimestamp: number;

  constructor(private http: HttpClient,
    private tokenService: TokenService,
    private userService: UserService,
    private fb: FormBuilder) {
      this.personForm = this.fb.group({
        firstName: ['', Validators.required], 
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]  
      }),

      this.absenceForm = this.fb.group({
        firstname: ['', Validators.required], 
        lastname: ['', Validators.required],
        from: ['', Validators.required],
        to: ['', Validators.required],
      });
      this.currentTimestamp = Date.now();
    }

    

  AllOfTheUsers(showUsers: boolean): void{
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>('https://api4.allhours.com/api/v1/Users', {headers: headers},).subscribe(
      (response)=>{
        this.apiResponseData=response;
        this.users=response;
        if (showUsers){
          this.showResponseData = !this.showResponseData;
        }
        
        this.allUsers=response;
      }
    );
    
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
    const userId = this.Search(this.searchFirstName, this.searchLastName);
  if (userId) {
    return userId; 
  } 
  }


  getUserDetailsById(userId: string): any | undefined {
    return this.users.find(user => user.Id === userId);
  } 

  

  startSearch(){
    const userIdToRead = this.searchUser();
    this.userDetails = this.getUserDetailsById(userIdToRead)
    this.displayDetails = true;
    
  } 
  
  addPerson(personData: any): void{
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    this.http.post('https://api4.allhours.com/api/v1/Users', personData, { headers }).subscribe(
      (response) => {},);
  }



  
  names: string[] = [];
  selectedName: string = '';

  twoResponseData: any = null;
  showtwoResponseData = false;

  AllAbsences(): void{
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.get<ApiResponse[]>('https://api4.allhours.com/api/v1/AbsenceDefinitions', {headers: headers},).subscribe(
      (response)=>{
        this.twoResponseData=response;
        this.showtwoResponseData = !this.showtwoResponseData; 
        this.names = this.twoResponseData.map( (item: any) => item.Name);
      }
    );
  }


  
  onSubmit(){
    
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    if (this.fromDate && this.toDate && this.userId && this.selectedName) {
    
      const date = new Date(this.currentTimestamp);
      const formattedDate = date.toISOString();
    const requestData = {
      PartialTimeFrom: this.fromDate+'T00:00:00+00:00',
      PartialTimeTo: this.toDate+'T00:00:00+00:00',
      Timestamp: formattedDate,
      UserId: this.userId,
      AbsenceDefinitionId: this.selectedName,
      Origin: 0,
      Comment: 'string',
      PartialTimeDuration: 0,
      IsPartial: true,
      OverrideHolidayAbsence: true,

    };


    this.http.post('https://api4.allhours.com/api/v1/Absences', JSON.stringify(requestData), { headers }).subscribe(
        (response) => { }); 
    }

    else {
      console.log('Please fill out all fields.');
    } 

  }



  triResponseData: any = null;
  showtriResponseData = false;

  Absences(): void{
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.get<ApiResponse[]>('https://api4.allhours.com/api/v1/Absences', {headers: headers},).subscribe(
      (response)=>{
        this.triResponseData=response;
        this.showtriResponseData = !this.showtwoResponseData; 
      }
    );
  }

}

