import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

    transform(values: any[], arg: string): any[] {
        if(arg == null){
            return values;
        }
        return values.filter(t => t.pk.indexOf(arg) != -1);
      }
}