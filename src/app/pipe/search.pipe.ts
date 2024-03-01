import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(books:any[] , term:string): any[] {
    return books.filter((item)=>item.name.toLowerCase().includes(term.toLowerCase()));
  }

}
