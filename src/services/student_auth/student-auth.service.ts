import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../interfaces/common-models/responseModel';
import { Student } from '../../interfaces/student-interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentAuthService {

  constructor(private _http: HttpClient) { }

  apiUrl = environment.apiUrl + "Student/";


  // registerStudent(stc: StudentCreate): Observable<ResponseModel> {
  //   return this._http.post<ResponseModel>(this.apiUrl, stc);
  // }

  // updateStudent(stu: StudentUpdate): Observable<ResponseModel> {
  //   return this._http.put<ResponseModel>(this.apiUrl, stu)
  // }

  deleteStudent(id: number): Observable<ResponseModel> {
    return this._http.delete<ResponseModel>(this.apiUrl + `${id}`)
  }

  getStudents(index: number, count: number): Observable<Student[]> {
    return this._http.get<Student[]>(`${this.apiUrl}${index}/${count}`);
  }

  getStudentById(id: number): Observable<Student> {
    return this._http.get<Student>(this.apiUrl + `${id}`)
  }

  loginStudent(data: FormData): Observable<string> {
    return this._http.post<string>(this.apiUrl + "Login", data);
  }
}
