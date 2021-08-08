import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../dataService/data-service.service';

@Component({
  selector: 'app-setting-admin',
  templateUrl: './setting-admin.component.html',
  styleUrls: ['./setting-admin.component.css']
})
export class SettingAdminComponent implements OnInit {
  CartDetails: any;
  adminData: any;

  constructor(private _dataservice:DataServiceService,private router:Router) { 
    this._dataservice.CartDetails.subscribe((res:any)=>{
      this.CartDetails=res;
    })
    this._dataservice.adminData.subscribe((res:any)=>{
      this.adminData=res;
    })
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
  deleteAccountFromAdmin(){
    this._dataservice.deleteAdmin(this.adminData['id']).subscribe((res:any)=>{
      if(confirm("Delete Account")){
        this.logout();
       this.router.navigate(['']);
      }
    })
  }
}
