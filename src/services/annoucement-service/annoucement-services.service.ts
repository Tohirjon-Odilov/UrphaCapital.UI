import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface Announcement {
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementServicesService {
  private apiUrl = 'https://app.urphacapital.uz/api/Announcement';

  constructor(private http: HttpClient) {}

  getTitle(): Observable<any> {
    return this.http.get<Announcement>(this.apiUrl).pipe(
      map(
        (response) => {
          console.log(response)
          return response;
        }
      )
    );
  }
}
