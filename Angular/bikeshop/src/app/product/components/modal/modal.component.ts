import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('back', [
      transition('void => *', [style({ opacity: 0 }), animate(850)]),
      transition('* => void', [animate(850, style({ opacity: 0 }))]),
    ]),
    trigger('box', [
      transition('void => *', [style({ opacity: 0 }), animate('850ms ease-out'),]),
      transition('* => void', [animate(850, style({ transform: 'scale3d(0.2, 0.2, 0.2)' })),]),
    ]),
  ],
})
export class ModalComponent {
  @Input() image;
  @Input() visible = false;
  @Output() closeModalRef = new EventEmitter<void>();

  closeModal(): void {
    this.visible = false;
    setTimeout(() => {
      this.closeModalRef.emit();
    }, 850);
  }
}
