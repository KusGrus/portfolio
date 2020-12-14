import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit',
})
export class LineLimitPipe implements PipeTransform {
  transform(value: string, count: number = 35): string {
    if (value.length > count) {
      count = value.indexOf(' ', count);
      return count === -1 ? value : `${value.slice(0, count)}...`;
    }
    return value;
  }
}
