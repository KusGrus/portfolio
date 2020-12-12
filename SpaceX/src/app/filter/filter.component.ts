import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Filter, FilterOptions } from '../interfaces';
import { BackendService } from '../shared/services/backend.service';
import { FilterService } from '../shared/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() options: FilterOptions;
  public visible: boolean = false;
  public config: Filter;

  constructor(
    private eRef: ElementRef,
    private filterService: FilterService,
    private spacex: BackendService
  ) {}

  ngOnInit(): void {
    this.filterService.filter$.subscribe((value) => {
      this.config = value;
    });
  }

  @HostListener('document:click', ['$event']) clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.visible = false;
    }
  }

  handle(): void {
    this.filterService.changeFilter(this.config);
    this.spacex.changePage(1);
  }

  onCheckboxChange(event): void {
    let name = event.target.value;
    if (this.config.port.includes(name)) {
      this.config.port = this.config.port.filter((item) => item !== name);
    } else {
      this.config.port.push(name);
    }
    this.handle();
  }

  onRadioChange(event): void {
    this.config.type = event;
    this.handle();
  }
}
