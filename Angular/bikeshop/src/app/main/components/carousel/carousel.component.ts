import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { Slide } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() items: Slide[] = [
    { title: 'forest', image: '../../../../assets/image/forest.jpg' },
    { title: 'mount', image: '../../../../assets/image/mount.jpg' },
    { title: 'desert', image: '../../../../assets/image/desert.svg' },
    { title: 'street', image: '../../../../assets/image/street.jpg' },
    { title: 'highway', image: '../../../../assets/image/highway.jpg' },
  ];
  public currentPosition = 0;
  subscribe: Subscription;
  constructor() {}

  ngOnInit(): void {
    this.initialization();
    this.startAuto();
  }

  initialization(): void {
    this.items.map((item, index) => {
      item.id = index;
      item.marginLeft = 0;
    });
  }

  startAuto(): void {
    this.subscribe = interval(5000).subscribe(() => this.setNext());
  }

  stopAuto(): void {
    this.subscribe.unsubscribe();
    setTimeout(() => {
      this.startAuto();
    }, 15000);
  }

  setCurrentPosition(position: number): void {
    this.currentPosition = position;
    this.items[0].marginLeft = -100 * position;
  }

  setNext(): void {
    let nextPosition = (this.currentPosition + 1) % this.items.length;
    this.currentPosition = nextPosition;
    this.items[0].marginLeft = -100 * nextPosition;
  }

  setBack(): void {
    let backPosition =
      this.currentPosition - 1 < 0
        ? this.items.length - 1
        : this.currentPosition - 1;
    this.currentPosition = backPosition;
    this.items[0].marginLeft = -100 * backPosition;
  }

  manualNext(): void {
    this.stopAuto();
    this.setNext();
  }

  manualBack(): void {
    this.stopAuto();
    this.setBack();
  }
  manualCurrentPosition(idx: number): void {
    this.stopAuto();
    this.setCurrentPosition(idx);
  }

  ngOnDestroy(): void {
    this.stopAuto();
  }
}
