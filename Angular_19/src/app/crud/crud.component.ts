import { Component, Inject, inject, OnInit } from '@angular/core';
import { CrudService } from '../Services/crud.service';
import { Iuser } from '../iuser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReusableComponent } from '../reusable/reusable.component';

@Component({
  selector: 'app-crud',
  imports: [CommonModule,ReusableComponent],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CRUDComponent implements OnInit {

  parentProperty : string = "CRUD Operations : Kindly find all users.";

  apiData: Iuser[]=[];

  constructor(private crud: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.crud.getData().subscribe(res => {
      this.apiData = res;
    })
  }

  // getAllData() {
  //   this.apiData = this.crud.rxResource;
  // }

  addNewUser() {
    this.router.navigateByUrl('adduser');
  }

  onUpdate(id: number) {
    this.router.navigate(['updateuser', id]);
  }

  onView(id: number) {
    this.router.navigate(['viewuser', id]);
  }
  onDelete(id: number) {
    this.crud.deleteData(id).subscribe(res => {
      alert("Record deleted successfully!");
      this.getAllData();
    })
  }
}
