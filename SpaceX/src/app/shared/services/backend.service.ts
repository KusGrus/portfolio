import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ShipDetailsGQL, ShipsGQL, TotalCountGQL } from './graphql.service';

@Injectable({ providedIn: 'root' })
export class BackendService {
  public page$ = new BehaviorSubject<number>(1);
  constructor(
    private shipList: ShipsGQL,
    private totalList: TotalCountGQL,
    private shipDetails: ShipDetailsGQL
  ) {}

  changePage(id: number): void {
    this.page$.next(id);
  }

  getCount(): any {
    return this.totalList
      .fetch()
      .pipe(map((res) => res.data.shipsResult.result.totalCount));
  }

  getPage(page: number, itemPerPage: number): any {
    return this.shipList
      .fetch({ limit: itemPerPage, offset: (page - 1) * itemPerPage })
      .pipe(map((res) => res.data.ships));
  }

  getAll(items: number): any {
    return this.shipList
      .fetch({ limit: items })
      .pipe(map((res) => res.data.ships));
  }

  getById(id: string): any {
    return this.shipDetails.fetch({ id }).pipe(map((res) => res.data.ship));
  }
}
