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
  private apiUrl = 'https://app.urphacapital.uz/api/Announcement/2';

  constructor(private http: HttpClient) {}

  getTitle(): Observable<{ title: string }> {
    return this.http.get<Announcement>(this.apiUrl).pipe(
      map(response => ({ title: response.title }))
    );
  }
}
