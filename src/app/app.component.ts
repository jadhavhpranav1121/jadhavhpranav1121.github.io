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
  loginOrNot: any;
  loginData: any={};
  // imagesPathArray=["pizza1.jpg","pizza2.jpg","pizza3.jpg","pizza4.jpg"];
  NameOfItems=["Margherita","Farmhouse","Peppy Paneer","Veg Extravaganza","Veggie Paradise","Cheese n Corn","Pepper Barbecue Chicken","Deluxe Veggie","Chicken Sausage"];
  CartImages=["https://images.dominos.co.in/new_margherita_2502.jpg","https://images.dominos.co.in/farmhouse.png","https://images.dominos.co.in/new_peppy_paneer.jpg","https://images.dominos.co.in/new_veg_extravaganza.jpg","https://images.dominos.co.in/new_veggie_paradise.jpg","https://images.dominos.co.in/new_cheese_n_corn.jpg","https://images.dominos.co.in/new_pepper_barbeque_chicken.jpg","https://images.dominos.co.in/new_deluxe_veggie.jpg","https://images.dominos.co.in/new_chicken_sausage.jpg"];
  DetailsOfP=["Classic delight with 100% real mozzarella cheese","Delightful combination of onion, capsicum, tomato & grilled mushroom","Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika","Black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno & extra cheese","The awesome foursome! Golden corn, black olives, capsicum, red paprika","A delectable combination of sweet & juicy golden corn","Pepper barbecue chicken for that extra zing","Veg delight - onion, capsicum, grilled mushroom, corn & paneer","American classic! Spicy, herbed chicken sausage on pizza"];
  CartDetails: any[]=[{}];
  constructor(private router:Router,private _dataService:DataServiceService){
    this._dataService.loginOrNot.subscribe((res)=>{
      this.loginOrNot=res;
    });
    this._dataService.loginData.subscribe((res)=>{
      this.loginData=res;
    });
    this._dataService.CartDetails.subscribe((res)=>{
      this.CartDetails=res;
    })
  } 
  logout(){
    this._dataService.loginData.next({});
    this._dataService.loginOrNot.next(false);
    this.router.navigate(['']);
  }
  eventadder:any;   
  
}
