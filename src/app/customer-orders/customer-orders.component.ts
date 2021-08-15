import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../dataService/data-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { isConstructorDeclaration } from 'typescript';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {
  OrderOpenOrNot: any;
  OrderDetails: Object[][] = [[]];
  adminloginOrNot: boolean | undefined;
  customerloginOrNot: boolean | undefined;
  CartOpenOrNot: boolean | undefined;
  customerdataToAdmin: Object[] = [];
  customerData: any;
  customerOrders: any;
  constructor(private _dataservice: DataServiceService, private router: Router,private SpinnerService:NgxSpinnerService) {
    this._dataservice.OrderOpenOrNot.subscribe((res) => {
      this.OrderOpenOrNot = res;
    });
    this._dataservice.OrderDetails.subscribe((res) => {
      this.OrderDetails = res;
    })
    this._dataservice.adminloginOrNot.subscribe((res) => {
      this.adminloginOrNot = res;
    })
    this._dataservice.customerloginOrNot.subscribe((res) => {
      this.customerloginOrNot = res;
    })
    this._dataservice.CartOpenOrNot.subscribe((res) => {
      this.CartOpenOrNot = res;
    });
    this._dataservice.customerdataToAdmin.subscribe((res) => {
      this.customerdataToAdmin = res;
    });
    this._dataservice.customerData.subscribe((res) => {
      this.customerData = res;
    });
     
    this._dataservice.OrderOpenOrNot.next(true);
  }
  getDataOfOrderFromDatabase(){
    this._dataservice.getDataOfOrders().subscribe((res) => {
     this.customerOrders = res;  
     console.log(this.customerOrders);
    //  console.log(this.customerOrders);
     for (let i = 0; i < this.customerOrders.length; i++) {
       if (this.customerOrders[i].email == localStorage.getItem('userDetails')) {
         this.OrderDetails = this.customerOrders[i].orders;
         this.customerData['_id']=this.customerOrders[i]['_id'];  
       }
     }
     
   },
   (err)=>{
       if(err instanceof HttpErrorResponse){
         if(err.status==401){
           this.router.navigate(['']);
         }
       }
  });
  }
  
  ngOnInit(): void {
    
    this.customerloginOrNot=(localStorage.getItem('token')==null)?false:true;
    // console.log(this.customerloginOrNot);
    this.SpinnerService.show(); 
    // console.log("sdf");
    this.getDataOfOrderFromDatabase();
    // console.log()
    console.log(JSON.stringify(this.OrderDetails));
    this.SpinnerService.hide(); 
  }
  cancelOrder(j:any){
    if(confirm("Are you sure to delete - Order No."+(j+1))){
      const data=this.OrderDetails[j];
      this.SpinnerService.show();
      setTimeout(()=>{
        this._dataservice.DeleteOrders(this.OrderDetails[j],localStorage.getItem('userDetails')).subscribe((res:any)=>{
          // console.log("Orders Deleted");
          this.getDataOfOrderFromDatabase();
        });
        this.SpinnerService.hide();
      },200); 
    }
  }
  goToHome() {
    this._dataservice.OrderOpenOrNot.next(false);
    this.OrderOpenOrNot = false;
    this._dataservice.CartOpenOrNot.next(false);
    this.CartOpenOrNot = false;
    this.router.navigate(['menu']);
  }
  calcTotalPrice(item: any) {
    let totalprice = 0;
    for (let i = 0; i < item.length; i++) {
      totalprice+=item[i]['count']*item[i]['price'];
    }
    return totalprice;
  }
}
