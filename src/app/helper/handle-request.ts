import { catchError, map, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '../core/models/api-response';

export function handleRequest<T>(
  obs: Observable<T>,
  sideEffect?: (res: T) => void
): Observable<ApiResponse<T>> {
  return obs.pipe(
    tap((res) => sideEffect?.(res)),
    map((res) => ({ data: res, error: null })),
    catchError((err) => of({ data: null, error: err.error?.message ?? 'Une erreur est survenue' }))
  );
}
