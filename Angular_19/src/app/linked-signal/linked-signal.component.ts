import { Component, computed, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'app-linked-signal',
  imports: [],
  templateUrl: './linked-signal.component.html',
  styleUrl: './linked-signal.component.scss'
})
export class LinkedSignalComponent {

  quantitySignal = signal(1);
  price = 10;
  // total = computed(()=>{
  //   return this.quantitySignal() * this.price;
  // })

  // total = linkedSignal(()=>{
  //   return this.quantitySignal() * this.price;
  // })

  total = linkedSignal({
    source : this.quantitySignal,
    computation: () => this.quantitySignal() * this.price,
  })

  calculate(){
    this.quantitySignal.set(10);
  }
}
