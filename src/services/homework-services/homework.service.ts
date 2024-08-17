import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ResponseModel } from '../../interfaces/common-models/responseModel';
import { Observable } from 'rxjs';
import { Homework } from '../../interfaces/homework-interfaces/homework';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  constructor(private _httpClinet: HttpClient) { }
  apiUrl = environment.apiUrl + "Homeworks/";

  getAllHomeworks(): Observable<Homework[]> {
    return this._httpClinet.get<Homework[]>(this.apiUrl);
  }

  deleteHomework(id: number): Observable<ResponseModel> {
    return this._httpClinet.delete<ResponseModel>(this.apiUrl + `${id}`);
  }

  createHomework(data: FormData): Observable<ResponseModel> {
    return this._httpClinet.post<ResponseModel>(`${this.apiUrl}`, data);
  }

  updateHomework(data: FormData): Observable<ResponseModel> {
    return this._httpClinet.put<ResponseModel>(`${this.apiUrl}`, data);
  }

}
