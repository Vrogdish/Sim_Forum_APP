import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response';
import { handleRequest } from '../../../helper/handle-request';
import { UserDto } from '../../../core/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  private _updateProfile(id: string, data: any): Observable<UserDto> {
    return this.http.put<UserDto>(`/api/user/${id}`, data);
  }

  updateProfile(id: string, data: any): Observable<ApiResponse<UserDto>> {
    return handleRequest(this._updateProfile(id, data));
  }
}
