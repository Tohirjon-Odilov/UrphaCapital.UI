import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AdminCreate } from '../../interfaces/admin-interfaces/AdminCreate';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../interfaces/common-models/responseModel';
import { Admin } from '../../interfaces/admin-interfaces/admin';
import { AdminUpdate } from '../../interfaces/admin-interfaces/AdminUpdate';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private _httpClient: HttpClient) { }
  apiUrl = environment.apiUrl + "Admins/";

  createAdmin(data: AdminCreate): Observable<ResponseModel> {
    return this._httpClient.post<ResponseModel>(this.apiUrl, data)
  }
  getAdminsById(id: number): Observable<Admin> {
    return this._httpClient.get<Admin>(this.apiUrl + `${id}`);
  }

  deleteAdmins(id: number): Observable<ResponseModel> {
    return this._httpClient.delete<ResponseModel>(this.apiUrl + `${id}`);
  }
  updateAdmin(data: AdminUpdate): Observable<ResponseModel> {
    return this._httpClient.put<ResponseModel>(`${this.apiUrl}`, data);
  }
  loginAdmin(data: any): Observable<string> {
    return this._httpClient.post<string>(`${this.apiUrl}`, data);
  }
  getAdmins(index: number, count: number): Observable<Admin[]> {
    return this._httpClient.get<Admin[]>(`${this.apiUrl}${index}/${count}`);
  }
  requestToAdmin(data: any): Observable<ResponseModel> {  
    return this._httpClient.post<ResponseModel>(`${this.apiUrl}request-to-admin`, data);
  }
}
