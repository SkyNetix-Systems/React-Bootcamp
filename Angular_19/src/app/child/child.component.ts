import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent {

  @Input() childInputProperty : string = "";
  @Output() childOutputProperty = new EventEmitter<any>();

  sendData(){
    this.childOutputProperty.emit("This is the child component data");
  }
}
