import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { handleRequest } from '../../../helper/handle-request';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  private _requestPasswordReset(email: string) {
    return this.http.post(`${this.apiUrl}/user/forgot-password`, { email });
  }

  private _resetPassword(password: string, token: string) {
    return this.http.post(`${this.apiUrl}/user/reset-password`, { password, token });
  }

  requestPasswordReset(email: string) {
    return handleRequest(this._requestPasswordReset(email));
  }

  resetPassword(password: string, token: string) {
    return handleRequest(this._resetPassword(password, token));
  }
}
