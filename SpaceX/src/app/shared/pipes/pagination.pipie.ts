import { Pipe, PipeTransform } from '@angular/core';
import { ShipList } from 'src/app/interfaces';

@Pipe({
  name: 'pagination',
})
export class PaginationPipe implements PipeTransform {
  transform(value: Array<ShipList>, page: number, itemPerPage: number): Array<ShipList>{
    return value.filter((item, index) => {
      if (index < itemPerPage * page && index >= itemPerPage * (page - 1)) {
        return item;
      }
    });
  }
}
