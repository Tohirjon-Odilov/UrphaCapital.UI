import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../interfaces/common-models/responseModel';
import { Student } from '../../interfaces/student-interfaces/student';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { StudentUpdate } from '../../interfaces/student-interfaces/student-update';
import { StudentCreate } from '../../interfaces/student-interfaces/student-create';
import { Course } from '../../interfaces/course-interfaces/course';

@Injectable({
  providedIn: 'root',
})
export class StudentAuthService {
  constructor(private _http: HttpClient, private toastr: ToastrService) {}

  apiUrl = environment.apiUrl + 'Student/';

  registerStudent(stc: any): Observable<ResponseModel> {
    return this._http.post<ResponseModel>(this.apiUrl, stc);
  }

  deleteStudent(id: number): Observable<ResponseModel> {
    return this._http.delete<ResponseModel>(this.apiUrl + `${id}`);
  }

  getStudents(index: number, count: number): Observable<Student[]> {
    return this._http.get<Student[]>(`${this.apiUrl}${index}/${count}`);
  }


  getMyCourse(userId: string): Observable<Course[]> {
    return this._http.get<Course[]>(`${this.apiUrl}get-my-courses/${userId}`);
  }

  addCourseToStudent(data: any): Observable<ResponseModel> {
    return this._http.put<ResponseModel>(`${this.apiUrl}add-course?StudentId=${data.id}&CourseId=${data.courseIds}`, {});
  }

  getStudentById(id: string): Observable<Student> {
    return this._http.get<Student>(this.apiUrl + `${id}`);
  }

  loginStudent(data: FormData): Observable<any> {
    return this._http.post<any>(environment.apiUrl +'authController/'+ 'login', data);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      this.toastr.error('Token mavjud emas', 'Xatolik');
      return false; // Token mavjud emas
    }

    // const user = JSON.parse(token);
    // const token = user.access; // Tokenni olish

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Sekundlarda hozirgi vaqt

      if (decodedToken.exp < currentTime) {
        this.toastr.error('Token yaroqsiz', 'Xatolik');
        console.log('Token muddati tugagan');
        return false; // Token muddati tugagan
      }

      return true; // Token amal qilmoqda
    } catch (error) {
      this.toastr.error('Token dekodlashda xatolik', 'Xatolik');
      console.error('Token dekodlashda xatolik:', error);
      return false;
    }
  }

  updateStudent(data: any):Observable<ResponseModel>{
    return this._http.put<ResponseModel>(this.apiUrl, data);
  }
}
