import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkInput',
})
export class CheckboxPipe implements PipeTransform {
  transform(value: number | string) {
    return value < 1 ? '' : `Выбраны ${value}`;
  }
}
