import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CategoryDto, CategoryWithThreadsDto } from '../models/category.model';
import { handleRequest } from '../../../helper/handle-request';
import { ResourceState } from '../../../core/models/resource-state.model';
import { Observable, map, startWith, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = environment.apiUrl + '/category';

  constructor(private http: HttpClient) {}

  _getAllCategories() {
    return this.http.get<CategoryDto[]>(this.apiUrl);
  }

  _getAllCategoriesWithThreads() {
    return this.http.get<CategoryWithThreadsDto[]>(this.apiUrl + '/with-threads');
  }

  _getCategoryBySlug(slug: string) {
    return this.http.get<CategoryDto>(`${this.apiUrl}/${slug}`);
  }

  getCategoriesWithThreads(): Observable<ResourceState<CategoryWithThreadsDto[]>> {
    return handleRequest(this._getAllCategoriesWithThreads()).pipe(
      map((res) => ({ loading: false, data: res.data, error: null })),
      startWith({ loading: true, data: null, error: null }),
      catchError((err) => of({ loading: false, data: null, error: err.message || 'Error' }))
    );
  }

  getCategoryBySlug(slug: string): Observable<ResourceState<CategoryDto>> {
    return handleRequest(this._getCategoryBySlug(slug)).pipe(
      map((res) => ({ loading: false, data: res.data, error: null })),
      startWith({ loading: true, data: null, error: null }),
      catchError((err) => of({ loading: false, data: null, error: err.message || 'Error' }))
    );
  }
}
