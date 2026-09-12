import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal',
  standalone: true
})
export class DecimalPipeFormat implements PipeTransform {

    transform(value: number, decimalPlaces: number = 2): string {
        if (typeof value === 'number' && !isNaN(value)) {
            return value.toFixed(decimalPlaces);
          }
          return '';
    }

}
