import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../dataService/data-service.service';

@Component({
  selector: 'app-admin-side-orders',
  templateUrl: './admin-side-orders.component.html',
  styleUrls: ['./admin-side-orders.component.css']
})
export class AdminSideOrdersComponent implements OnInit {
  // customerdataToAdmin: Object[]=[];
  CartOpenOrNot: boolean | undefined;
  OrderOpenOrNot: boolean | undefined;
  allDetailsOfOrders: any;
  customerdataToAdmin: any;

  constructor(private _dataService:DataServiceService,private router:Router) { }

  ngOnInit(): void {
    this._dataService.getDataOfOrders().subscribe((res)=>{
      this.customerdataToAdmin=res;
      console.log(res);
      console.log(this.customerdataToAdmin.length);   
    })
  }
  valueChange(value:any,third:any){
    // console.log(third['_id']);
    // this._dataService.updateStatus(value,"second._id/orders/third._id").subscribe((res)=>{
    //   console.log(res);
    // })
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
