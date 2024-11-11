// import { environment } from './../../environments/environment';
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

  getCourseById(id: string): Observable<Course> {
    return this._httpClinet.get<Course>(this.apiUrl + `GetById/${id}`);
  }

  getCourses(index: number, count: number): Observable<Course[]> {
    return this._httpClinet.get<Course[]>(`${this.apiUrl}${index}/${count}`);
  }

  getCoursesByMenthorId(mentorId: number, index: number, count: number): Observable<Course[]> {
    return this._httpClinet.get<Course[]>(`${this.apiUrl}GetAllByMentorId/${mentorId}/${index}/${count}`);
  }

  selectCourse(): Observable<any> {
    return this._httpClinet.get<any>(`${environment.apiUrl}Select/get-courses`);
  }


  deleteCourse(id: string): Observable<ResponseModel> {
    return this._httpClinet.delete<ResponseModel>(this.apiUrl + `${id}`);
  }

  createCourse(data: FormData): Observable<ResponseModel> {
    return this._httpClinet.post<ResponseModel>(`${this.apiUrl}`, data);
  }

  updateCourse(data: FormData): Observable<ResponseModel> {
    return this._httpClinet.put<ResponseModel>(`${this.apiUrl}`, data);
  }
  
  getCourseByUserId(userId: string): Observable<Course[]> {
    return this._httpClinet.get<Course[]>(`${this.apiUrl}GetById/${userId}`);
  }

  buyCourse(id: any, price: any, userid: any) {
    console.log(userid)
    return this._httpClinet.get<any>(`${environment.apiUrl}clickUrlGeneration/generate-click-link?studentId=${userid}&orderId=${id}&amount=${price}`);
  }
}

//https://app.urphacapital.uz/api/clickUrlGeneration/generate-click-link?studentId=3&orderId=1&amount=1000'
