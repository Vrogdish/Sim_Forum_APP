import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResourceState } from '../../../core/models/resource-state.model';
import { ThreadDto } from '../models/thread.model';
import { handleRequest } from '../../../helper/handle-request';
import { ApiResponse } from '../../../core/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  private apiUrl = environment.apiUrl + '/thread';
  constructor(private http: HttpClient) {}

  _getThreadsByCategory(categoryId: number) {
    return this.http.get<ThreadDto[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  getThreadsByCategory(categoryId: number): Observable<ResourceState<ThreadDto[]>> {
    return handleRequest(this._getThreadsByCategory(categoryId)).pipe(
      map((res) => ({ loading: false, data: res.data, error: null })),
      startWith({ loading: true, data: null, error: null }),
      catchError((err) => of({ loading: false, data: null, error: err.message || 'Error' }))
    );
  }
}
