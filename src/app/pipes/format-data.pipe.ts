import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatData',
  standalone: true
})
export class FormatDataPipe implements PipeTransform {

    transform(value:  
        any, args?: any): any {
           if (!value)  
        {
             return '';
           }

           const data = new Date(value);

           const dia = data.getDate().toString().padStart(2, '0');
           const mes = (data.getMonth() + 1).toString().padStart(2, '0');
           const ano = data.getFullYear();  


           return `<span class="math-inline">\{dia\}/</span>{mes}/${ano}`;  

         }

}
