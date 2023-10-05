import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TokenService } from '../token.service';


@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.scss']
})
export class AbsencesComponent {
  absentPeople: any[] = []; 
  selectedDate: string = '';
  dates: any[] = [];
  smthng: any = null;

  filteredData: any[] = [];

  constructor(private http: HttpClient,
    private tokenService: TokenService
    ) {}



  getDateRange(fromDate: Date, toDate: Date): Date[]{
    const dateRange: Date[] = [];
    const currentDate = new Date(fromDate);

    while (currentDate <= toDate) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateRange;
  }
  formatDateToCustomFormat(date: Date): string {
    const isoString = date.toISOString();
    const formattedDate = isoString.slice(0, -5); 
    const timezoneOffset = '+00:00';
    return formattedDate + timezoneOffset;
  }





  searchAbsentPeople() {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const requestDate= {
       date: this.selectedDate+'T00:00:00+00:00'
    }

    this.http.get<any[]>('https://api4.allhours.com/api/v1/Absences',  { headers:headers }).subscribe(data => {
      
      this.smthng = data;
      const matchingAbsentPeople = [];

      

      for (let every in this.smthng){
        const dateRange = this.getDateRange(new Date(this.smthng[every].PartialTimeFrom), new Date(this.smthng[every].PartialTimeTo));
        const formattedDates: string[] = dateRange.map((date) => this.formatDateToCustomFormat(date));
        console.log(dateRange);
        console.log(formattedDates);
        console.log(requestDate.date === '2023-10-20T00:00:00+00:00');
        console.log(this.smthng[every].PartialTimeFrom);
        
        
        if (formattedDates.includes(requestDate.date)){
          console.log(dateRange);
          console.log(formattedDates);
          matchingAbsentPeople.push({
            FirstName: this.smthng[every].FirstName,
            LastName: this.smthng[every].LastName,
            Reason: this.smthng[every].AbsenceDefinitionName
          });
        }   
      }
      
      this.absentPeople = matchingAbsentPeople;
      
    });
  } 
}

