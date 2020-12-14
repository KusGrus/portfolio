import { Pipe, PipeTransform } from '@angular/core';
import { ShipList } from 'src/app/interfaces';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    array: Array<ShipList>,
    name: string,
    port: Array<string>,
    type: string
  ): Array<ShipList> {
    array = array.filter((item) => {
      return item.name.toLowerCase().includes(name.toLowerCase());
    });
    if (port.length) {
      let temp = port.map((item) => item.toLowerCase());
      array = array.filter((item) =>
        temp.includes(item.home_port.toLowerCase())
      );
    }
    if (type) {
      array = array.filter((item) => {
        return item.type.toLowerCase().includes(type.toLowerCase());
      });
    }
    return array;
  }
}
