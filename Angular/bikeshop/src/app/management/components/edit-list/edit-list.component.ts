import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/shared/interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
})
export class EditListComponent implements OnInit {
  @ViewChild('confirm', { read: ViewContainerRef }) refDir;
  public store$: Observable<Product[]>;
  public page;
  constructor(
    private store: StoreService,
    private resolver: ComponentFactoryResolver,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.store$ = this.store.getAll();
  }

  onEdit():void {}

  onDelete(item): void {
    this.refDir.clear();
    const modalFactoryRef = this.resolver.resolveComponentFactory(
      ConfirmationComponent
    );
    const component = this.refDir.createComponent(modalFactoryRef);
    component.instance.visible = true;
    component.instance.bike = item.name;
    component.instance.confirmDeleteRef.pipe(take(1)).subscribe(() => {
      this.store
        .delte(item.id)
        .pipe(take(1))
        .subscribe(
          () => {},
          () => {},
          () => {
            this.alert.success('The product was successfully deleted!');
            this.store$ = this.store.getAll();
          }
        );
    });
    component.instance.closeModalRef.pipe(take(1)).subscribe(() => {
      this.refDir.clear();
    });
  }
}
