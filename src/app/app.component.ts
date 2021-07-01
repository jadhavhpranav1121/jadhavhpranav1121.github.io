import { Component } from '@angular/core';
import { Data, Router } from '@angular/router';
import { DataServiceService } from './dataService/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShoppingPureCss';
  loginData: any={};
  // imagesPathArray=["pizza1.jpg","pizza2.jpg","pizza3.jpg","pizza4.jpg"];
  NameOfItems=["Margherita","Farmhouse","Peppy Paneer","Veg Extravaganza","Veggie Paradise","Cheese n Corn","Pepper Barbecue Chicken","Deluxe Veggie","Chicken Sausage"];
  CartImages=["https://images.dominos.co.in/new_margherita_2502.jpg","https://images.dominos.co.in/farmhouse.png","https://images.dominos.co.in/new_peppy_paneer.jpg","https://images.dominos.co.in/new_veg_extravaganza.jpg","https://images.dominos.co.in/new_veggie_paradise.jpg","https://images.dominos.co.in/new_cheese_n_corn.jpg","https://images.dominos.co.in/new_pepper_barbeque_chicken.jpg","https://images.dominos.co.in/new_deluxe_veggie.jpg","https://images.dominos.co.in/new_chicken_sausage.jpg"];
  DetailsOfP=["Classic delight with 100% real mozzarella cheese","Delightful combination of onion, capsicum, tomato & grilled mushroom","Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika","Black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno & extra cheese","The awesome foursome! Golden corn, black olives, capsicum, red paprika","A delectable combination of sweet & juicy golden corn","Pepper barbecue chicken for that extra zing","Veg delight - onion, capsicum, grilled mushroom, corn & paneer","American classic! Spicy, herbed chicken sausage on pizza"];
  CartDetails: any[]=[{}];
  CartOpenOrNot: any;
  BuyingCartDetail: any;
  DuplicateBuyingOrNot: boolean | undefined;
  customerData: any;
  adminData: any;
  adminloginOrNot: any;
  customerloginOrNot: any;
  OrderOpenOrNot: boolean | undefined;
  OrderDetails: Object[][]=[];
  customerdataToAdmin: Object[]=[];
  DuplicateOrdertails: boolean=false;
  BuyOrNot: any;
  NewData: any;
  NewData1:any;
  
  constructor(private router:Router,private _dataService:DataServiceService){
    this._dataService.adminloginOrNot.subscribe((res)=>{
      this.adminloginOrNot=res;
    });
    this._dataService.customerloginOrNot.subscribe((res)=>{
      this.customerloginOrNot=res;
    });
    this._dataService.customerData.subscribe((res)=>{
      this.customerData=res;
    });
    this._dataService.adminData.subscribe((res)=>{
      this.adminData=res;
    });
   
    this._dataService.CartDetails.subscribe((res)=>{
      this.CartDetails=res;
    });
    this._dataService.OrderOpenOrNot.subscribe((res)=>{
      this.OrderOpenOrNot=res;
    });
    this._dataService.BuyOrNot.subscribe((res)=>{
      this.BuyOrNot=res;
    })
    this._dataService.CartOpenOrNot.subscribe((res)=>{
      this.CartOpenOrNot=res;
    });
    this._dataService.BuyingCartDetail.subscribe((res)=>{
      this.BuyingCartDetail=res;
    });
    this._dataService.OrderDetails.subscribe((res)=>{
      this.OrderDetails=res;
    });
    this._dataService.customerdataToAdmin.subscribe((res)=>{
      this.customerdataToAdmin=res;
    });
   
  } 
  

  logout(){
    for(let i=0;i<this.customerdataToAdmin.length;i++){
      if(this.customerdataToAdmin[i]['Customer Name']==this.customerData['name']){
        for(let j=0;j<this.OrderDetails.length;j++){
        this.customerdataToAdmin[i]['Data'].push(this.OrderDetails[j]);
        }
        this.DuplicateOrdertails=true;
      }
    }
    if(this.DuplicateOrdertails==false){
    this.customerdataToAdmin.push({"Customer Name":this.customerData["name"],"Data":this.OrderDetails});
    }
    this.DuplicateOrdertails=false;
    this._dataService.customerdataToAdmin.next(this.customerdataToAdmin);
    this._dataService.customerData.next({});
    this._dataService.customerloginOrNot.next(false);
    this._dataService.adminData.next({});
    this._dataService.adminloginOrNot.next(false);
    this.CartOpenOrNot=false;
    this._dataService.OrderDetails.next([]);
    this._dataService.OrderOpenOrNot.next(false);
    this.OrderOpenOrNot=false;
    this._dataService.CartOpenOrNot.next(this.CartOpenOrNot);
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
      this._dataService.BuyingCartDetail.next(this.BuyingCartDetail);
  }
  decrease(item:any){
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      if(this.BuyingCartDetail[i]['name']==item['name']){
        this.BuyingCartDetail[i]['count']--;
      }
    }
    this._dataService.BuyingCartDetail.next(this.BuyingCartDetail);
  }
  increase(item:any){
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      if(this.BuyingCartDetail[i]['name']==item['name']){
        this.BuyingCartDetail[i]['count']++;
      }
    }
    this._dataService.BuyingCartDetail.next(this.BuyingCartDetail);
  }
  
  
}
