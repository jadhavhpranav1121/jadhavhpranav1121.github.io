import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../dataService/data-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  CartOpenOrNot: any;
  BuyingCartDetail: any;
  adminloginOrNot:any;
  customerloginOrNot: any;
  OrderDetails: Object[][]=[[{}]];
  OrderOpenOrNot: boolean | undefined;

  constructor(private _dataservice:DataServiceService,private router:Router) {
    this._dataservice.CartOpenOrNot.subscribe((res)=>{
      this.CartOpenOrNot=res;
    });
    this._dataservice.BuyingCartDetail.subscribe((res)=>{
      this.BuyingCartDetail=res;
    });
    this._dataservice.adminloginOrNot.subscribe((res)=>{
      this.adminloginOrNot=res;
    });
    this._dataservice.customerloginOrNot.subscribe((res)=>{
      this.customerloginOrNot=res;
    });
    this._dataservice.OrderDetails.subscribe((res)=>{
      this.OrderDetails=res;
    });
    this._dataservice.OrderOpenOrNot.subscribe((res)=>{
      this.OrderOpenOrNot=res;
    })
    console.log(this._dataservice.customerdataToAdmin);
   }

  ngOnInit(): void {
  }
  goToHome(){
    this._dataservice.CartOpenOrNot.next(false);
    this.CartOpenOrNot=false;
    this._dataservice.OrderOpenOrNot.next(false);
    this.OrderOpenOrNot=false;
    this.router.navigate(['']);
  }
  deleteItems(i:any){
    this.BuyingCartDetail.splice(i,1);
    this._dataservice.BuyingCartDetail.next(this.BuyingCartDetail);
    console.log("sdfs");
  }
  addToCustomerOrders(){
    this.OrderDetails.push(this.BuyingCartDetail);
    this._dataservice.OrderDetails.next(this.OrderDetails);
    this._dataservice.BuyingCartDetail.next([]);
    this.BuyingCartDetail=[];
    console.log(this.OrderDetails);
    this.router.navigate(['orders']);
  }
  
}
