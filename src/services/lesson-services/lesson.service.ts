import { Lesson } from './../../interfaces/lesson-interfaces/lesson';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../interfaces/common-models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(private _httpClinet: HttpClient) {}
  apiUrl = environment.apiUrl + 'Lessons/';

  getLessonVideo(id: string): Observable<Blob> {
    return this._httpClinet.get(
      `https://app.urphacapital.uz/api/Lessons/getvideo?lessonId=${id}`,
      { responseType: 'blob' }
    );
  }

  getLessonById(id: string): Observable<Lesson> {
    return this._httpClinet.get<Lesson>(this.apiUrl + `${id}`);
  }

  getLessonByCourseId(
    id: string,
    index: number,
    count: number
  ): Observable<Lesson[]> {
    return this._httpClinet.get<Lesson[]>(
      this.apiUrl + `${id}/${index}/${count}`
    );
  }

  deleteLesson(id: string): Observable<ResponseModel> {
    return this._httpClinet.delete<ResponseModel>(this.apiUrl + `${id}`);
  }

  createLesson(data: FormData): Observable<any> {
    return this._httpClinet.post<any>(`${this.apiUrl}`, data, {
      // reportProgress: true,
      // observe: 'events',
    });
  }

  updateLesson(data: FormData): Observable<any> {
    return this._httpClinet.put<any>(`${this.apiUrl}`, data, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
