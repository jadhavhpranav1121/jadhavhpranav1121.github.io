import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataServiceService } from '../dataService/data-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  adminloginOrNot: any;
  customerloginOrNot: any;
  CartDetails: any;
  OrderOpenOrNot: any;
  BuyOrNot: any;
  CartOpenOrNot: any;
  BuyingCartDetailSub: Subscription=Subscription.EMPTY;
  BuyingCartDetail: any[] =[];
  customerdataToAdmin: any;
  ErrorPage: any;
  customerDatabaseData: any;
  data: any;
  DataOfAdmin: any;
  lengthVariable: any;
  isModelUse: any;
  isAdmin: any;
  isCustomer: any;
  isAdminSigup: any;
  isCustomerSigup: any;
  router: any;
  NewData: any;
  loginDetailFromLocalStorage!: string | null;

  constructor(private _dataService:DataServiceService) { 
    this._dataService.adminloginOrNot.subscribe((res)=>{
      this.adminloginOrNot=res;
    });
    
    this._dataService.customerloginOrNot.subscribe((res)=>{
      this.customerloginOrNot=res;
      // console.log(res);
    });
    this._dataService.customerloginOrNot.subscribe((res)=>{
      this.customerloginOrNot=res;
    })   
   
    this._dataService.OrderOpenOrNot.subscribe((res)=>{
      this.OrderOpenOrNot=res;
    });
    this._dataService.BuyOrNot.subscribe((res)=>{
      this.BuyOrNot=res;
    })
    this._dataService.CartOpenOrNot.subscribe((res)=>{
      this.CartOpenOrNot=res;
    });
    this.BuyingCartDetailSub=this._dataService.BuyingCartDetail.subscribe((res)=>{
      this.BuyingCartDetail=res;
      if(!this.BuyingCartDetail){
        this.BuyingCartDetail=JSON.parse(localStorage.getItem('cart') || "[]");
      }
      
    });
    this._dataService.CartDetails.subscribe((res)=>{
      this.CartDetails=res;
      

    });
    this._dataService.customerdataToAdmin.subscribe((res)=>{
      this.customerdataToAdmin=res;
    });
    
  this._dataService.ErrorPage.subscribe((res:any)=>{
    this.ErrorPage=res;
  });
  this._dataService.customerloginOrNot.subscribe((res)=>{
    this.customerloginOrNot=res;
  })
      for(let i=0;i<this.BuyingCartDetail.length;i++){
        for(let j=0;j<this.CartDetails.length;j++){
          if(this.CartDetails[j]['name']==this.BuyingCartDetail[i]['name']){
            this.CartDetails[j]['count']=this.BuyingCartDetail[i]['count'];
          }
        }
      }
  }

  ngOnInit(): void {
  

    // for(let i=0;i<this.BuyingCartDetail.length;i++){
    //   for(let j=0;j<this.CartDetails.length;j++){
    //     if(this.CartDetails[j]['name']==this.BuyingCartDetail[i]['name']){
    //       this.CartDetails[j]['count']=this.BuyingCartDetail[i]['count'];
    //     }
    //   }
    // }
    this._dataService.BuyingCartDetail.next(this.BuyingCartDetail);
    this.loginDetailFromLocalStorage=localStorage.getItem('userDetails');
    
  }
  getDataOfCustomerInLogin(){
    this._dataService.getDataOfCustomer().subscribe((res)=>{
        this.customerDatabaseData=res;
    });
    
   this._dataService.getDataOfAdmin().subscribe((res)=>{
    this.data=res;
});
  }
  getDataOfAdminFromDatabase(){
  this._dataService.getDataOfAdmin().subscribe((res)=>{
    this.DataOfAdmin=res;
    this.lengthVariable=this.DataOfAdmin.length;
});
  }

  logout(){
    this._dataService.customerdataToAdmin.next([]);
    this._dataService.BuyOrNot.next(false);
    this._dataService.BuyingCartDetail.next([]);
    for(let i=0;i<this.CartDetails.length;i++){
       this.CartDetails[i]['count']=0;
    }
    this._dataService.CartDetails.next(this.CartDetails);
    this._dataService.customerData.next({});
    this._dataService.OrderDetails.next([]);
    this._dataService.adminData.next({});
    this._dataService.customerloginOrNot.next(false);
    this._dataService.adminloginOrNot.next(false);
    this.CartOpenOrNot=false;
    this._dataService.OrderOpenOrNot.next(false);
    this._dataService.adminData.next({});
    this._dataService.customerData.next({});
    this.OrderOpenOrNot=false;
    this.isModelUse=false;
    this.isAdmin=false;
    this.isCustomer=true;
    this.isAdminSigup=false;
    this.isCustomerSigup=true;
    this._dataService.CartOpenOrNot.next(false);
    this.router.navigate(['']);
  }
  ChangeCartOpeningStatus(){
    this.CartOpenOrNot=true;
    this._dataService.CartOpenOrNot.next(this.CartOpenOrNot);
  }
  ChangeOrdersOpeningStatus(){
    this.OrderOpenOrNot=true;
    this._dataService.OrderOpenOrNot.next(this.OrderOpenOrNot);
  }
  AddToBuyingCart(Data:any){
      this.NewData=Data;
      this.BuyingCartDetail.push(this.NewData);
      this.BuyingCartDetail[this.BuyingCartDetail.length-1]['count']++;
      localStorage.setItem('cart',JSON.stringify(this.BuyingCartDetail));
      this._dataService.BuyingCartDetail.next(this.BuyingCartDetail);
  }
  clearItem(Data:any){
    this.NewData=Data;
    Data['count']=0;    
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      if(this.BuyingCartDetail[i]['name']==Data['name']){
        this.BuyingCartDetail.splice(i,1);
        localStorage.setItem('cart',JSON.stringify(this.BuyingCartDetail));
      }
    }
  }
  decrease(item:any){
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      if(this.BuyingCartDetail[i]['name']==item['name']){
        this.BuyingCartDetail[i]['count']--;
        // item['count']--;
        if(this.BuyingCartDetail[i]['count']<=0){
          this.BuyingCartDetail.splice(i,1);
        }
      }
    }
    localStorage.setItem('cart',JSON.stringify(this.BuyingCartDetail));
    this._dataService.BuyingCartDetail.next(this.BuyingCartDetail);
  }
  increase(item:any){
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      if(this.BuyingCartDetail[i]['name']==item['name']){
        this.BuyingCartDetail[i]['count']++;
        // item['count']++;
      }
    }
    localStorage.setItem('cart',JSON.stringify(this.BuyingCartDetail));
    this._dataService.BuyingCartDetail.next(this.BuyingCartDetail);
  }
  ngDestory(){
    this.BuyingCartDetailSub.unsubscribe();
  }
}
