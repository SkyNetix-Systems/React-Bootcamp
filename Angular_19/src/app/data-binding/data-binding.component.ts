import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { SharedDataService } from '../Services/shared-data.service';

@Component({
  selector: 'app-data-binding',
  imports: [FormsModule],
  templateUrl: './data-binding.component.html',
  styleUrl: './data-binding.component.scss'
})
export class DataBindingComponent {

  dummyData : any;
  isEligible : boolean;
  constructor(private _sharedData : SharedDataService){
    this.dummyData = this._sharedData.userData;
    this.isEligible = this._sharedData.isEligibleForSubscription();
  }


  
  // name: string = "FEDLearning";
  // topic: string = "Data Binding";
  // image: string = "https://yt3.googleusercontent.com/fr2VOi_0xoR3JGdNGHRA5yaAf4KeXGZCWk0tl5oQ-m7pHgUh_iJCiNvmmxfEN0fNvjroIvKByw=s160-c-k-c0x00ffffff-no-rj";
  // random = "";

  // onSave() {
  //   alert("Data Saved Successfully.");
  // }
  // onChange(){
  //   alert("Country has changed.");
  // }
}
