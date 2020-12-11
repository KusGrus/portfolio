import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BackendService } from '../shared/services/backend.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() itemPerPage: number;
  @Input() maximum: number;
  public subscribe: Subscription;
  public page: number = 1;
  public page$: BehaviorSubject<number>;

  constructor(private spacex: BackendService) {}

  ngOnInit(): void {
    this.subscribe = this.spacex.page$.subscribe((value) => (this.page = value));
  }

  decrement(): void {
    if (this.page == 1) {
      return;
    }
    this.page--;
    this.spacex.changePage(this.page);
  }

  increment(): void {
    if (this.itemPerPage * (this.page + 1) - this.maximum < this.itemPerPage) {
      this.page++;
      this.spacex.changePage(this.page);
    }
  }
  
  ngOnDestroy(): void {
    if (this.subscribe) this.subscribe.unsubscribe();
  }
}
