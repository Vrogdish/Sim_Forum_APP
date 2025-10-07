export interface ResourceState<T> {
  loading: boolean;
  data: T | null;
  error: string | null;
}
