import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../dataService/data-service.service';

@Component({
  selector: 'app-admin-side-orders',
  templateUrl: './admin-side-orders.component.html',
  styleUrls: ['./admin-side-orders.component.css']
})
export class AdminSideOrdersComponent implements OnInit {
  customerdataToAdmin: Object[]=[];
  CartOpenOrNot: boolean | undefined;
  OrderOpenOrNot: boolean | undefined;

  constructor(private _dataService:DataServiceService,private router:Router) { 
      this._dataService.customerdataToAdmin.subscribe((res)=>{
        this.customerdataToAdmin=res;
      })
      // console.log(this.customerdataToAdmin);
  }

  ngOnInit(): void {
  }
  valueChange(value:any,third:any){
    third['status']=value;
    alert("Status Updated");
  }
  valueChange1(value:any,third:any,second:any){
    alert("Status Updated");
    third['status']=value;
    second['total']-=(third['count'])*(third['price']);
  }
  goToHome(){
    this._dataService.CartOpenOrNot.next(false);
    this.CartOpenOrNot=false;
    this._dataService.OrderOpenOrNot.next(false);
    this.OrderOpenOrNot=false;
    this.router.navigate(['admin-home']);
  }
}
