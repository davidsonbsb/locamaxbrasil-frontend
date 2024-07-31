import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatData',
  standalone: true
})
export class FormatDataPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
