import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { orderScheme } from '../app-models/orderDetails.model';
import { DataServiceService } from '../dataService/data-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
  CartDetails: any;
  BuyOrNot: any;
  NewData: any;
  totalVariable:number;
  newItems: any;
  customterData: any;
  OrderDetailsFromDatabase: any;
  tempDataForCart:orderScheme[]=[];
  constructor(private _dataservice:DataServiceService,private router:Router,private SpinnerService:NgxSpinnerService) {
    
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
    });
    this._dataservice.customerData.subscribe((res)=>{
      this.customterData=res;
    })
    this._dataservice.BuyOrNot.subscribe((res)=>{
      this.BuyOrNot=res;
      
    })
    this._dataservice.CartDetails.subscribe((res)=>{
      this.CartDetails=res;
      // console.log(this.CartDetails); 
    })
    this.totalVariable=0;
    // console.log(this.totalVariable);
    // console.log(JSON.stringify(this.BuyingCartDetail));
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      this.totalVariable+=(this.BuyingCartDetail[i]['count']*(this.BuyingCartDetail[i]['price']));
    }
  }
  getDataOfPizza(){
    this._dataservice.getDataOfItems().subscribe((res)=>{
        this.newItems=res;
    });
  }

  ngOnInit(): void {
    this.customerloginOrNot=(localStorage.getItem('token')==null)?false:true;
    this.getDataOfPizza();
    this.getDataOfOrdersDetails();
    // console.log(this.BuyingCartDetail);
    // console.log("localstroage"+JSON.parse(localStorage.getItem('cart')|| "{}"));
    if(!!this.BuyingCartDetail){  
      // console.log("buy "+this.BuyingCartDetail);
      this.BuyingCartDetail=JSON.parse(localStorage.getItem('cart')|| "[]");
      this._dataservice.BuyingCartDetail.next(this.BuyingCartDetail);
    }
    this._dataservice.BuyingCartDetail.subscribe((res:any)=>{
      this.BuyingCartDetail=res;
    })
    // console.log(this.BuyingCartDetail);
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      this.BuyingCartDetail[i]['status']='Starting To delivery';
    }
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      this.BuyingCartDetail[i]['total']+=this.BuyingCartDetail[i]['count']*this.BuyingCartDetail[i]['price'];
    }
  }
  getDataOfOrdersDetails(){
    this._dataservice.getDataOfOrders().subscribe((res)=>{
        this.OrderDetailsFromDatabase=res;
        // console.log(res);
    });
  }
  goToHome(){
    this._dataservice.CartOpenOrNot.next(false);
    this.CartOpenOrNot=false;
    this._dataservice.OrderOpenOrNot.next(false);
    this.OrderOpenOrNot=false;
    // console.log(this._dataservice.CartDetails);
    this.router.navigate(['menu']);
  }
  deleteCartItems(i:any){
    this.SpinnerService.show();
    // console.log("buy8",this.BuyingCartDetail);

     setTimeout(()=>{
      this.NewData=this.BuyingCartDetail[i]['name'];
    for(let j=0;j<this.CartDetails.length;j++){
        if(this.CartDetails[j]['name']==this.NewData){
          this.totalVariable-=this.BuyingCartDetail[i]['count']*this.BuyingCartDetail[i]['price'];
         this.CartDetails[j]['count']=0;
         console.log(this.CartDetails[j]);
      }
    }
    this.BuyingCartDetail.splice(i,1);
    // console.log("CartDeatils",this.CartDetails);
    localStorage.setItem('cart',JSON.stringify(this.BuyingCartDetail));
    this._dataservice.CartDetails.next(this.CartDetails);
    // localStorage.setItem('cart',this.BuyingCartDetail);
    this._dataservice.BuyingCartDetail.next(this.BuyingCartDetail);
    // this.SpinnerService.show();
      // this._dataservice.CartDetails.subscribe((res:any)=>{
      //   this.CartDetails=res;
      // });
      
    this._dataservice.BuyingCartDetail.subscribe((res:any)=>{
      this.BuyingCartDetail=res;
    })
      this.SpinnerService.hide();
    },1000);
  }
  addToCustomerOrders(){
    this.SpinnerService.show();
    setTimeout(()=>{
      this.NewData=this.BuyingCartDetail;
      // console.log(this.OrderDetailsFromDatabase);
      for(let i=0;i<this.OrderDetailsFromDatabase.length;i++){
        if(this.OrderDetailsFromDatabase[i]['email']==localStorage.getItem('userDetails')){
          console.log(this.OrderDetailsFromDatabase[i]['email']);
          console.log(localStorage.getItem("userDetails"));
          for(let i=0;i<this.BuyingCartDetail.length;i++){
            this.tempDataForCart.push({"name":this.BuyingCartDetail[i].name,"count":this.BuyingCartDetail[i].count,"price":this.BuyingCartDetail[i].price,"Pass":this.BuyingCartDetail[i].Pass,"images":this.BuyingCartDetail[i].images,"status":this.BuyingCartDetail[i].status});
          } 
  
        }
      }
      this._dataservice.updateOrders(this.tempDataForCart,localStorage.getItem('userDetails')).subscribe((res)=>{
        // console.log(res);
      })
      localStorage.setItem('cart',JSON.stringify([]));
      this._dataservice.BuyingCartDetail.next([]);
      this.BuyingCartDetail=[]; 
      this.CartDetails=this.newItems;
      this._dataservice.CartDetails.next(this.CartDetails);
      this.router.navigate(['orders']);
    },200);
    
    
  }
  decrease(item:any){
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      if(this.BuyingCartDetail[i]['name']==item['name']){
        if(this.BuyingCartDetail[i]['count']>1){
        this.BuyingCartDetail[i]['count']--;
        this.totalVariable-=this.BuyingCartDetail[i]['price'];
        }
      }
    }
    localStorage.setItem('cart',JSON.stringify(this.BuyingCartDetail));
    this._dataservice.BuyingCartDetail.next(this.BuyingCartDetail);
  }
  increase(item:any){
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      if(this.BuyingCartDetail[i]['name']==item['name']){
        this.BuyingCartDetail[i]['count']++;
        this.totalVariable+=this.BuyingCartDetail[i]['price'];
      }
    }
    localStorage.setItem('cart',JSON.stringify(this.BuyingCartDetail));
    this._dataservice.BuyingCartDetail.next(this.BuyingCartDetail);
  }
}
