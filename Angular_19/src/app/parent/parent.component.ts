import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { Sibling1Component } from '../sibling1/sibling1.component';
import { Sibling2Component } from '../sibling2/sibling2.component';
import { ReusableComponent } from '../reusable/reusable.component';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent, Sibling1Component, Sibling2Component, ReusableComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent implements AfterViewInit {

  parentProperty: string = "This is the parent component data";
  receiveMessage: string = "";
  sibling1Data: any;
  sibling2Data: any;

  @ViewChild('reusable') reusableComp: ReusableComponent;

  ngAfterViewInit(): void {
    // this.reusableComp.childProperty = "Greeting from Parent Component."
  }

  receiveData(data: any) {
    this.receiveMessage = data;
  }

  receiveEvent1(data: any) {
    this.sibling1Data = data;
    console.log(this.sibling1Data);
  }

  receiveEvent2(data: any) {
    this.sibling2Data = data;
  }
}
