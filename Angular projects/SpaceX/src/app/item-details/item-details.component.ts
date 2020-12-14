import { Component } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Mission } from '../interfaces';
import { BackendService } from '../shared/services/backend.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent {
  constructor(private spacex: BackendService, private route: ActivatedRoute) {}

  public stream$ = this.route.paramMap.pipe(
    map((params) => params.get('id') as string),
    switchMap((id) => this.spacex.getById(id))
  );

  arrayToString(array: Array<Mission>): string {
    return array.map((value) => value.name).join(', ');
  }
}
