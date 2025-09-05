import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDto, RegisterDto, TokenResponseDto } from '../models/auth.model';
import { ApiResponse } from '../models/api-response';
import { handleRequest } from '../../helper/handle-request';
import { User } from '../../features/profile/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  private _isLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  private _currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient) {
    if (this.getToken()) {
      this._isLoggedIn.next(true);
      this._fetchCurrentUser().subscribe();
    }
  }

  private _login(data: LoginDto): Observable<TokenResponseDto> {
    return this.http.post<TokenResponseDto>(`${this.apiUrl}/auth/login`, data);
  }

  private _register(data: RegisterDto): Observable<RegisterDto> {
    return this.http.post<RegisterDto>(`${this.apiUrl}/auth/register`, data);
  }

  private _fetchCurrentUser(): Observable<User | null> {
    return this.http
      .get<User>(`${this.apiUrl}/user/me`)
      .pipe(tap((user) => this._currentUser.next(user)));
  }

  login(data: LoginDto): Observable<ApiResponse<TokenResponseDto>> {
    return handleRequest(this._login(data), (res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        this._isLoggedIn.next(true);
        this._fetchCurrentUser().subscribe();
      }
    });
  }

  register(data: RegisterDto): Observable<ApiResponse<RegisterDto>> {
    return handleRequest(this._register(data));
  }

  logout(): void {
    localStorage.removeItem('token');
    this._currentUser.next(null);
    this._isLoggedIn.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
