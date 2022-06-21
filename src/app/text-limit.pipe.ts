import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLimit'
})
export class TextLimitPipe implements PipeTransform {

  transform(value: string, limit = 14): string {
    return value.length > limit ? value.substring(0, limit) + "..." : value
  }

}
