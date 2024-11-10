import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Idea {
  id: number;
  pictureUrl: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class IdeasService {
  private apiUrl = 'https://app.urphacapital.uz/api/Ideas';

  constructor(private http: HttpClient) {}

  getIdeas(): Observable<Idea[]> {
    return this.http.get<Idea[]>(this.apiUrl);
  }
}