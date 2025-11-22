import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreadcrumbModel } from '../models/breadcrumb.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbs: BehaviorSubject<BreadcrumbModel[]> = new BehaviorSubject<BreadcrumbModel []>([]);


  getBreadcrumbs() {
    return this.breadcrumbs.asObservable();
  }
  setBreadcrumbs(breadcrumbs: BreadcrumbModel[]) {
    this.breadcrumbs.next(breadcrumbs);
  }

  clearBreadcrumbs() {
    this.breadcrumbs.next([]);
  }

}
