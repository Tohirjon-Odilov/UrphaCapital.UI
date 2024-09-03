import { Lesson } from './../../interfaces/lesson-interfaces/lesson';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../interfaces/common-models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private _httpClinet: HttpClient) { }
  apiUrl = environment.apiUrl + "Lessons/";


  getLessonById(id: number): Observable<Lesson> {
    return this._httpClinet.get<Lesson>(this.apiUrl + `${id}`);
  }

  getLessonByCourseId(id: number, index: number, count: number): Observable<Lesson[]> {
    return this._httpClinet.get<Lesson[]>(this.apiUrl + `${id}/${index}/${count}`);
  }


  deleteLesson(id: number): Observable<ResponseModel> {
    return this._httpClinet.delete<ResponseModel>(this.apiUrl + `${id}`);
  }

  createLesson(data: FormData): Observable<ResponseModel> {
    return this._httpClinet.post<ResponseModel>(`${this.apiUrl}`, data);
  }

  updateLesson(data: FormData): Observable<ResponseModel> {
    return this._httpClinet.put<ResponseModel>(`${this.apiUrl}`, data);
  }
}
