import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private _httpClinet : HttpClient) { }
}
