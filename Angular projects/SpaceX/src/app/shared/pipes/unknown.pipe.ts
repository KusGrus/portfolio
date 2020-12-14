import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unknown',
})
export class UnknownPipe implements PipeTransform {
  transform(value: string | number, type: string = ''): string | number {
    return value ? `${value} ${type}`: 'Нет данных';
  }
}
