import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../interfaces/common-models/responseModel';
import { Course } from '../../interfaces/course-interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private _httpClinet: HttpClient) { }
  apiUrl = environment.apiUrl + "Courses/";

  getCourseById(id: number): Observable<Course> {
    return this._httpClinet.get<Course>(this.apiUrl + `GetById/${id}`);
  }

  getCourses(index: number, count: number): Observable<Course[]> {
    return this._httpClinet.get<Course[]>(`${this.apiUrl}${index}/${count}`);
  }

  getCoursesByMenthorId(mentorId: number, index: number, count: number): Observable<Course[]> {
    return this._httpClinet.get<Course[]>(`${this.apiUrl}GetAllByMentorId/${mentorId}/${index}/${count}`);
  }


  deleteCourse(id: number): Observable<ResponseModel> {
    return this._httpClinet.delete<ResponseModel>(this.apiUrl + `${id}`);
  }

  createCourse(data: FormData): Observable<ResponseModel> {
    return this._httpClinet.post<ResponseModel>(`${this.apiUrl}`, data);
  }

  updateCourse(data: FormData): Observable<ResponseModel> {
    return this._httpClinet.put<ResponseModel>(`${this.apiUrl}`, data);
  }
}
