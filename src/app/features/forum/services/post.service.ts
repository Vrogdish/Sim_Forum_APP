import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { handleRequest } from '../../../helper/handle-request';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { ResourceState } from '../../../core/models/resource-state.model';
import { PostDto } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = environment.apiUrl + '/post';

  constructor(private http: HttpClient) {}

  private _getPostsByThread(threadId: number) {
    return this.http.get<PostDto[]>(`${this.apiUrl}/thread/${threadId}`);
  }

  getPostsByThread(threadId: number): Observable<ResourceState<PostDto[]>> {
    return handleRequest(this._getPostsByThread(threadId)).pipe(
      map((res) => ({ loading: false, data: res.data, error: null })),
      startWith({ loading: true, data: null, error: null }),
      catchError((err) => of({ loading: false, data: null, error: err.message || 'Error' }))
    );
  }
}
