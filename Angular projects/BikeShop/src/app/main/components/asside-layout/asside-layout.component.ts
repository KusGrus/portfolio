import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-asside-layout',
  templateUrl: './asside-layout.component.html',
  styleUrls: ['./asside-layout.component.scss'],
})
export class AssideLayoutComponent {
  field: string;
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
}
