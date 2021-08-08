import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../dataService/data-service.service';

@Component({
  selector: 'app-settingcomponent',
  templateUrl: './settingcomponent.component.html',
  styleUrls: ['./settingcomponent.component.css']
})
export class SettingcomponentComponent implements OnInit {
  customerData: any;
  CartDetails: any;
  OrderDetails: any;
  OrderDetailsFromDatabase: any;

  constructor(private _dataservice:DataServiceService,private router:Router) { 
    this._dataservice.customerData.subscribe((res:any)=>{
      this.customerData=res;
    })
    this._dataservice.CartDetails.subscribe((res:any)=>{
      this.CartDetails=res;
    })
    this._dataservice.OrderDetails.subscribe((res:any)=>{
      this.OrderDetails=res;
    })
    this._dataservice.getDataOfOrders().subscribe((res)=>{
      this.OrderDetailsFromDatabase=res;
      console.log("database"+res);
  });
  }

  ngOnInit(): void {
  }
  logout(){
    this._dataservice.customerdataToAdmin.next([]);
    this._dataservice.BuyOrNot.next(false);
    this._dataservice.BuyingCartDetail.next([]);
    for(let i=0;i<this.CartDetails.length;i++){
       this.CartDetails[i]['count']=0;
    }
    this._dataservice.CartDetails.next(this.CartDetails);
    this._dataservice.customerData.next({});
    this._dataservice.OrderDetails.next([]);
    this._dataservice.adminData.next({});
    this._dataservice.customerloginOrNot.next(false);
    this._dataservice.adminloginOrNot.next(false);
    // this.CartOpenOrNot=false;
    this._dataservice.OrderOpenOrNot.next(false);
    this._dataservice.adminData.next({});
    this._dataservice.customerData.next({});
    // this.OrderOpenOrNot=false;
    // this.isModelUse=false;
    // this.isAdmin=false;
    // this.isCustomer=true;
    // this.isAdminSigup=false;
    // this.isCustomerSigup=true;
    // this._dataservice.CartOpenOrNot.next(false);
    this.router.navigate(['']);
  }
  deleteAccount(){
    for(let i=0;i<this.OrderDetailsFromDatabase.length;i++){
        if(this.OrderDetailsFromDatabase[i]['email']==this.customerData['name']){
          this._dataservice.DeleteOrdersAccount(this.customerData['name']).subscribe((res:any)=>{
            
          })
        }
    }
    this._dataservice.deleteCustomerInDataBase(this.customerData['id']).subscribe((res:any)=>{
      this.logout();
      this.router.navigate(['']);
    })
  }
}
