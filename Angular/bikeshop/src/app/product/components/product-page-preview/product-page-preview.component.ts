import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/shared/interfaces';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-product-page-preview',
  templateUrl: './product-page-preview.component.html',
  styleUrls: ['./product-page-preview.component.scss'],
})
export class ProductPagePreviewComponent implements OnInit {
  @Input() bike: Product;
  @ViewChild('image') mainImage: ElementRef;
  @ViewChild('modal', { read: ViewContainerRef }) refDir;
  public activeColor;
  public activeImage;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.initialization();
  }

  initialization(): void {
    this.activeColor = this.bike.color[0];
    this.activeImage = this.bike.images[0];
  }

  showModal(): void {
    this.refDir.clear();
    const modalFactoryRef = this.resolver.resolveComponentFactory(
      ModalComponent
    );
    const component = this.refDir.createComponent(modalFactoryRef);
    component.instance.image = this.mainImage.nativeElement.src;
    component.instance.visible = true;
    component.instance.closeModalRef.pipe(take(1)).subscribe(() => {
      this.refDir.clear();
    });
  }

  changeImage(event): void {
    this.mainImage.nativeElement.src = event.target.src;
    this.activeImage = event.target.src;
  }

  changeColor(color): void {
    this.activeColor = color;
  }
}
