import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isConstructorDeclaration } from 'typescript';
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
    })
  }
  
  valueChange1(value:any,third:any,second:any,first:any){
    alert("Status Updated");
    third['status']=value;
    this._dataService.updateOrdersStatus(first['orders'],first['_id']).subscribe((res:any)=>{});
    // second['total']-=(third['count'])*(third['price']);
  }
  goToHome(){
    this._dataService.CartOpenOrNot.next(false);
    this.CartOpenOrNot=false;
    this._dataService.OrderOpenOrNot.next(false);
    this.OrderOpenOrNot=false;
    this.router.navigate(['admin-home']);
  }
}
