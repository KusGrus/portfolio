import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Filter, FilterOptions, ShipList } from '../interfaces';
import { BackendService } from '../shared/services/backend.service';
import { FilterService } from '../shared/services/filter.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit, OnDestroy {
  public page: number = 1;
  public options: FilterOptions;
  public itemPerPage: number = 5;
  public filter: Filter;
  private subscribe: Subscription;
  public stream$: Observable<Array<ShipList>>;

  constructor(
    private spacex: BackendService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.initialization();
  }

  initialization(): void {
    this.stream$ = this.spacex.getAll(50).pipe(
      tap((value: Array<ShipList>) => {
        this.options = {
          port: [...new Set(value.map((v) => v.home_port))],
          type: [...new Set(value.map((v) => v.type))],
        };
      })
    );
    this.spacex.page$.subscribe((value) => (this.page = value));
    this.filterService.filter$.subscribe((value) => {
      this.filter = value;
      this.filter.port = [...value.port];
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe) this.subscribe.unsubscribe();
  }
}
