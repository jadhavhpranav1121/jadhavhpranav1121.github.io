import { HttpClient,HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { dataScheme } from '../app-models/dataScheme.model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  loginData: any;
  loginOrNot: any;
  OrdersOpenOrNot: any;

  urlOfAdmin="http://localhost:8000/admin";  
  urlOfCustomer="http://localhost:8000/customer";
  constructor(private http:HttpClient) { 
  }
  AddDataToAdmin(req:dataScheme){
    return this.http.post(this.urlOfAdmin,req);
  }
  AddDataToCustomer(req:dataScheme){
    return this.http.post(this.urlOfCustomer,req);
  }
  getDataOfCustomer(){
      return this.http.get(this.urlOfCustomer);
  }
  getDataOfAdmin(){
    return this.http.get(this.urlOfAdmin);
  }
  signDataCustomer=new BehaviorSubject<Array<Object>>([]);
  signDataAdmin=new BehaviorSubject<Array<Object>>([]);
  customerdataToAdmin=new BehaviorSubject<Array<Object>>([]);
  customerData=new BehaviorSubject<any>({});
  adminData=new BehaviorSubject<any>({});
  customerloginOrNot=new BehaviorSubject<boolean>(false);
  BuyOrNot=new BehaviorSubject<boolean>(false);
  adminloginOrNot=new BehaviorSubject<boolean>(false);
  CartOpenOrNot=new BehaviorSubject<any>(false);
  BuyingCartDetail=new BehaviorSubject<Array<Object>>([]);
  OrderDetails=new BehaviorSubject<Array<Array<Object>>>([]);
  OrderOpenOrNot=new BehaviorSubject<boolean>(false);
  CartDetails=new BehaviorSubject<Array<Object>>([
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
  ])
  
}
