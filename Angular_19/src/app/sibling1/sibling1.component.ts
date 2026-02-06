import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-sibling1',
  imports: [],
  templateUrl: './sibling1.component.html',
  styleUrl: './sibling1.component.scss'
})
export class Sibling1Component {

  @Output() sigbling1Event = new EventEmitter<any>();
  @Input() sibling1Property : string = "";

  onSubmit(data : any){
    this.sigbling1Event.emit(data);
  }
  
}
