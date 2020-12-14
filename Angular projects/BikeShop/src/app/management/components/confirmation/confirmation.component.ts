import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  @Input() visible = true;
  @Input() bike = '';
  @Output() closeModalRef = new EventEmitter<void>();
  @Output() confirmDeleteRef = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  closeModal(): void {
    this.visible = false;
    this.closeModalRef.emit();
  }

  confirmation(): void {
    this.visible = false;
    this.confirmDeleteRef.emit();
  }
}
