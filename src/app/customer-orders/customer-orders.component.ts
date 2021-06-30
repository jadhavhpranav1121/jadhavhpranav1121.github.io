import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../dataService/data-service.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {
  OrderOpenOrNot: any;
  OrderDetails: Object[][]=[[]];
  adminloginOrNot: boolean | undefined;
  customerloginOrNot: boolean | undefined;
  CartOpenOrNot: boolean | undefined;

  constructor(private _dataservice:DataServiceService,private router:Router) {
    this._dataservice.OrderOpenOrNot.subscribe((res)=>{
      this.OrderOpenOrNot=res;
    });
    this._dataservice.OrderDetails.subscribe((res)=>{
      this.OrderDetails=res;
    })
    this._dataservice.adminloginOrNot.subscribe((res)=>{
      this.adminloginOrNot=res;
    })
    this._dataservice.customerloginOrNot.subscribe((res)=>{
      this.customerloginOrNot=res;
    })
    this._dataservice.CartOpenOrNot.subscribe((res)=>{
      this.CartOpenOrNot=res;
    })
    this._dataservice.OrderOpenOrNot.next(true);
   }

  ngOnInit(): void {
  }

  goToHome(){
    this._dataservice.OrderOpenOrNot.next(false);
    this.OrderOpenOrNot=false;
    this._dataservice.CartOpenOrNot.next(false);
    this.CartOpenOrNot=false;
    this.router.navigate(['']);
  }


}
