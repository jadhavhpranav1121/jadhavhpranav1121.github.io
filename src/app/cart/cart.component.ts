import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../dataService/data-service.service';

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
  CartDetails: Object[]=[];
  BuyOrNot: any;
  NewData: any;

  constructor(private _dataservice:DataServiceService,private router:Router) {
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
    this._dataservice.CartDetails.subscribe((res)=>{
      this.CartDetails=res;
    })
    this._dataservice.BuyOrNot.subscribe((res)=>{
      this.BuyOrNot=res;
      
    })

   }

  ngOnInit(): void {
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      this.BuyingCartDetail[i]['status']='Starting To delivery';
    }
    this.BuyingCartDetail['total']=0;
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      this.BuyingCartDetail['total']+=this.BuyingCartDetail[i]['count']*this.BuyingCartDetail[i]['price'];
    }
  }
  goToHome(){
    this._dataservice.CartOpenOrNot.next(false);
    this.CartOpenOrNot=false;
    this._dataservice.OrderOpenOrNot.next(false);
    this.OrderOpenOrNot=false;
    this.router.navigate(['']);
  }
  deleteItems(i:any){
    // this.BuyingCartDetail.splice(i,1);
    this.NewData=this.BuyingCartDetail[i]['name'];
    for(let j=0;j<this.CartDetails.length;j++){
        if(this.CartDetails[j]['name']==this.NewData){
         this.CartDetails[j]['count']=0;
      }
    }
    this.BuyingCartDetail.splice(i,1);
    this._dataservice.CartDetails.next(this.CartDetails);
    this._dataservice.BuyingCartDetail.next(this.BuyingCartDetail);
  }
  addToCustomerOrders(){
    
    this.NewData=this.BuyingCartDetail;
    this.OrderDetails.push(this.NewData);
    this._dataservice.OrderDetails.next(this.OrderDetails);
    this._dataservice.BuyingCartDetail.next([]);
    this.BuyingCartDetail=[]; 
    this.CartDetails=[
{
          "name": "Margherita",
          "images": "https://images.dominos.co.in/new_margherita_2502.jpg",
          "Pass": "Classic delight with 100% real mozzarella cheese",
          "count": 0,
          "price": 140
      },
      {
          "name": "Farmhouse",
          "images": "https://images.dominos.co.in/farmhouse.png",
          "Pass": "Delightful combination of onion, capsicum, tomato & grilled mushroom",
          "count": 0,
          "price": 212
      },
      {
          "name": "Peppy Paneer",
          "images": "https://images.dominos.co.in/new_peppy_paneer.jpg",
          "Pass": "Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika",
          "count": 0,
          "price": 234
      },
      {
          "name": "Veg Extravaganza",
          "images": "https://images.dominos.co.in/new_veg_extravaganza.jpg",
          "Pass": "Black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno & extra cheese",
          "count": 0,
          "price": 334
      },
      {
          "name": "Veggie Paradise",
          "images": "https://images.dominos.co.in/new_veggie_paradise.jpg",
          "Pass": "The awesome foursome! Golden corn, black olives, capsicum, red paprika",
          "count": 0,
          "price": 432
      },
      {
          "name": "Cheese n Corn",
          "images": "https://images.dominos.co.in/new_cheese_n_corn.jpg",
          "Pass": "A delectable combination of sweet & juicy golden corn",
          "count": 0,
          "price": 523
      },
      {
          "name": "Pepper Barbecue Chicken",
          "images": "https://images.dominos.co.in/new_pepper_barbeque_chicken.jpg",
          "Pass": "Pepper barbecue chicken for that extra zing",
          "count": 0,
          "price": 363
      },
      {
          "name": "Deluxe Veggie",
          "images": "https://images.dominos.co.in/new_deluxe_veggie.jpg",
          "Pass": "Veg delight - onion, capsicum, grilled mushroom, corn & paneer",
          "count": 0,
          "price": 532
      },
      {
          "name": "Chicken Sausage",
          "images": "https://images.dominos.co.in/new_chicken_sausage.jpg",
          "Pass": "American classic! Spicy, herbed chicken sausage on pizza",
          "count": 0,
          "price": 343
      }
    ];
    this._dataservice.CartDetails.next(this.CartDetails);
    this.router.navigate(['orders']);
  }
  decrease(item:any){
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      if(this.BuyingCartDetail[i]['name']==item['name']){
        if(this.BuyingCartDetail[i]['count']>1){
        // this.BuyingCartDetail[i]['price']+=item['price']
        this.BuyingCartDetail[i]['count']--;
        }
      }
    }
    this.BuyingCartDetail['total']=0;
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      this.BuyingCartDetail['total']+=this.BuyingCartDetail[i]['count']*this.BuyingCartDetail[i]['price'];
    }
    this._dataservice.BuyingCartDetail.next(this.BuyingCartDetail);
  }
  increase(item:any){
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      if(this.BuyingCartDetail[i]['name']==item['name']){
        this.BuyingCartDetail[i]['count']++;
      }
    }
    this.BuyingCartDetail['total']=0;
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      this.BuyingCartDetail['total']+=this.BuyingCartDetail[i]['count']*this.BuyingCartDetail[i]['price'];
    }
    this._dataservice.BuyingCartDetail.next(this.BuyingCartDetail);
  }
  

}
