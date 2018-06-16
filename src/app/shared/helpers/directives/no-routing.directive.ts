import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[knnl-no-routing]'
})
export class NoRoutingDirective {

  @HostListener('click', ['$event'])
  onClick($event: Event) {
    $event.stopPropagation();
    return false;
  }

}
