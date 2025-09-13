import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response';
import { handleRequest } from '../../../helper/handle-request';
import { UserDto } from '../../../core/models/auth.model';
import { SignatureToUpdateDto } from '../models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private _updateSignature(data: SignatureToUpdateDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/user/me`, data);
  }

  private _updateAvatar(file: File): Observable<UserDto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UserDto>(`${this.apiUrl}/user/me/avatar`, formData);
  }

  updateSignature(data: SignatureToUpdateDto): Observable<ApiResponse<UserDto>> {
    return handleRequest(this._updateSignature(data));
  }
  updateAvatar(file: File): Observable<ApiResponse<UserDto>> {
    return handleRequest(this._updateAvatar(file));
  }
}
