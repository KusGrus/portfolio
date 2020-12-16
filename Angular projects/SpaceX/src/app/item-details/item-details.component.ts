import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Mission, ShipDetails } from '../interfaces';
import { BackendService } from '../shared/services/backend.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  public object: ShipDetails;
  private subscriptions: Array<Subscription> = [];
  constructor(private spacex: BackendService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.paramMap
        .pipe(
          map((params) => params.get('id') as string),
          switchMap((id) => this.spacex.getById(id))
        )
        .subscribe((value: ShipDetails) => {
          this.object = value;
        })
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length)
      this.subscriptions.forEach((item: Subscription) => item.unsubscribe());
  }

  arrayToString(array: Array<Mission>): string {
    return array.map((value) => value.name).join(', ');
  }
}
