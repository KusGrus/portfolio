import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(array: Product[], search: string = ''): Product[] {
    if (!search.trim()) {
      return array;
    }
    return array.filter(item=>{
        return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
