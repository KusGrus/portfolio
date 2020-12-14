import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('bounce', [
      transition(':enter', [style({ opacity: 0, right: -5 + 'px' }), animate(300)]),
      transition(':leave', [animate(300, style({ opacity: 0, right: 5 + 'px' }))]),
    ]),
  ],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 2500;
  public message: string;
  public type: string;
  private timeout;
  subscribe: Subscription;
  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.initialization();
  }

  initialization() {
    this.subscribe = this.alertService.alert$.subscribe((alert) => {
      this.message = alert.text;
      this.type = alert.type;
      this.timeout = setTimeout(() => {
        this.message = '';
        clearTimeout(this.timeout);
      }, this.delay);
    });
  }

  closeAlert() {
    clearTimeout(this.timeout);
    this.message = '';
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      clearTimeout(this.timeout);
      this.subscribe.unsubscribe();
    }
  }
}
