import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  constructor(private _httpClinet: HttpClient) { }
  apiUrl = environment.apiUrl + "Courses/";
}