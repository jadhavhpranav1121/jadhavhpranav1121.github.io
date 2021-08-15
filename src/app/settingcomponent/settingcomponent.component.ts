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
  customerDatabaseData: any;
  customerloginOrNot:boolean=false;

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
      // console.log("database"+res);
  });
  this.getCustomerData();
  }
  getCustomerData(){
    this._dataservice.getDataOfCustomer().subscribe((res)=>{
      // console.log(res);
      this.customerDatabaseData=res;
  });
  }
  ngOnInit(): void {
    this.customerloginOrNot=(localStorage.getItem('token')==null)?false:true;
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
    this.getCustomerData();
    // console.log("sdfafasfwerw"+JSON.stringify(this.customerDatabaseData));
    this._dataservice.OrderOpenOrNot.next(false);
    this._dataservice.adminData.next({});
    this._dataservice.customerData.next({});
    // this.OrderOpenOrNot=false;
    
    this.router.navigate(['']);
  }
  deleteAccount(){
   if(confirm("Delete Your Account")){
    for(let i=0;i<this.OrderDetailsFromDatabase.length;i++){
        if(this.OrderDetailsFromDatabase[i]['email']==this.customerData['name']){
          this._dataservice.DeleteOrdersAccount(this.customerData['name']).subscribe((res:any)=>{
            this.getCustomerData();
          })
        }
    }
    this._dataservice.deleteCustomerInDataBase(this.customerData['id']).subscribe((res:any)=>{
      
    })
    this.getCustomerData();
    this._dataservice.customerData.next({});
    this.logout();  
  }
  // console.log("function is called");
  this.getCustomerData();
  }
}
