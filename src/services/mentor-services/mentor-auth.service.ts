import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Mentor } from '../../interfaces/mentor-interfaces/mentor';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../interfaces/common-models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class MentorAuthService {

  constructor(private _httpClient: HttpClient) { }
  apiUrl = environment.apiUrl + "Mentors/";

  getMentors(index: number, count: number): Observable<Mentor[]> {
    return this._httpClient.get<Mentor[]>(`${this.apiUrl}${index}/${count}`)
  }
  getMentorById(id: number): Observable<Mentor> {
    return this._httpClient.get<Mentor>(this.apiUrl + `${id}`);
  }

  getMentorSelectList(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.apiUrl}Select/get-mentors`);
  }

  deleteMentor(id: number): Observable<ResponseModel> {
    return this._httpClient.delete<ResponseModel>(this.apiUrl + `${id}`);
  }

  createMentor(data: FormData): Observable<ResponseModel> {
    return this._httpClient.post<ResponseModel>(`${this.apiUrl}`, data);
  }

  updateMentor(data: FormData): Observable<ResponseModel> {
    return this._httpClient.put<ResponseModel>(`${this.apiUrl}`, data);
  }
  loginMentor(data: FormData): Observable<ResponseModel> {
    return this._httpClient.post<ResponseModel>(`${this.apiUrl}`, data);
  }
}
