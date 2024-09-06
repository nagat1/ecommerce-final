import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayofobject:any[],word:string): any[] {
    return arrayofobject.filter((item) =>item.title.toLowerCase().includes(word.toLowerCase()));
  }

}
