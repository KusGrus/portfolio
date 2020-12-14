import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class FilterService {
  public filter$ = new BehaviorSubject<Filter>({
    name: '',
    port: [],
    type: '',
  });

  changeFilter(options: Filter): void {
    this.filter$.next(options);
  }
}
