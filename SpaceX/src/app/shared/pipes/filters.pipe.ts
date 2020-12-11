import { Pipe, PipeTransform } from '@angular/core';
import { ShipList } from 'src/app/interfaces';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    array: Array<ShipList>,
    name: string = '',
    port: string = '',
    type: string = ''
  ): Array<ShipList> {
    array = array.filter((item) => {
      return item.name.toLowerCase().includes(name.toLowerCase());
    });
    if (port) {
      let temp = port.split('!~!').map((value) => value.toLowerCase());
      array = array.filter((item) => {
        return temp.includes(item.home_port.toLowerCase());
      });
    }
    array = array.filter((item) => {
      return item.type.toLowerCase().includes(type.toLowerCase());
    });
    return array;
  }
}
