import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpsService {

  apiUrl = environment.apiUrl + "Courses/";


  constructor(
    private http: HttpClient
  ) { }

  createHelp(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}Help`, data);
  }

  getHelps(index: number, count: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}Help/${index}/${count}`);
  }
  
}
