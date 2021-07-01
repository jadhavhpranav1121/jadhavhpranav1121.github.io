import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../dataService/data-service.service';

@Component({
  selector: 'app-admin-side-orders',
  templateUrl: './admin-side-orders.component.html',
  styleUrls: ['./admin-side-orders.component.css']
})
export class AdminSideOrdersComponent implements OnInit {
  customerdataToAdmin: Object[]=[];

  constructor(private _dataService:DataServiceService) { 
      this._dataService.customerdataToAdmin.subscribe((res)=>{
        this.customerdataToAdmin=res;
      })
  }

  ngOnInit(): void {
  }
  valueChange(value:any,third:any){
    third['status']=value;
  }
  valueChange1(value:any,third:any,second:any){
    third['status']=value;
    second['total']-=(third['count'])*(third['price']);
  }

}
