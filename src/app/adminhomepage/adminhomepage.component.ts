import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../dataService/data-service.service';

@Component({
  selector: 'app-adminhomepage',
  templateUrl: './adminhomepage.component.html',
  styleUrls: ['./adminhomepage.component.css']
})
export class AdminhomepageComponent implements OnInit {
  adminloginOrNot: boolean=false;

  constructor(private _dataService:DataServiceService) {
    this._dataService.adminloginOrNot.subscribe((res)=>{
      this.adminloginOrNot=res;
    })
   }

  ngOnInit(): void {
  }

}
