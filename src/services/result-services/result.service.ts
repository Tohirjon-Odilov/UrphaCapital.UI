import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  apiUrl = environment.apiUrl + "Results";


  constructor(
    private http: HttpClient
  ) { }
  // there is an issue in both the backend and frontend
  
  createResult(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }

  getResult(count: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${count}`);
  }

  deleteResult(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateResult(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, data);
  }
  
}
