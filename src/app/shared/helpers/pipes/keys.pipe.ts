import { Pipe, PipeTransform } from '@angular/core';
import { Dictionary } from 'lodash';
import * as _ from 'lodash';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: Dictionary<any>): any {
    return _.keys(value);
  }

}
