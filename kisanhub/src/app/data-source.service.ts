import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  dataSource= new BehaviorSubject(null);
  // dataList : Observable<any> = this.dataSource.asObservable();
  constructor(private httpClient:HttpClient) { }
  country : any;
  whether : any;
  getCountry(country){
    this.country=country;
    this.getData();
  }

  getWhether(whether){
    this.whether=whether;
    this.getData();
  }

  getData(){
    if(this.country != null && this.whether != null){
      let url="https://s3.eu-west-2.amazonaws.com/interview-question-data/metoffice/"+this.whether+"-"+this.country+".json";
        this.httpClient.get(url).subscribe((response)=>{  
          this.dataSource.next(response);
        })
    }
  }
}
