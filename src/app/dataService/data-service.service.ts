import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }
  signData=new BehaviorSubject<Array<Object>>([{}]);
  loginOrNot=new BehaviorSubject<boolean>(false);
  loginData=new BehaviorSubject<any>({});
  CartDetails=new BehaviorSubject<Array<Object>>([
    {
        "name": "Margherita",
        "images": "https://images.dominos.co.in/new_margherita_2502.jpg",
        "Pass": "Classic delight with 100% real mozzarella cheese",
        "count": 1,
        "price": 140
    },
    {
        "name": "Farmhouse",
        "images": "https://images.dominos.co.in/farmhouse.png",
        "Pass": "Delightful combination of onion, capsicum, tomato & grilled mushroom",
        "count": 1,
        "price": 212
    },
    {
        "name": "Peppy Paneer",
        "images": "https://images.dominos.co.in/new_peppy_paneer.jpg",
        "Pass": "Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika",
        "count": 1,
        "price": 234
    },
    {
        "name": "Veg Extravaganza",
        "images": "https://images.dominos.co.in/new_veg_extravaganza.jpg",
        "Pass": "Black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno & extra cheese",
        "count": 1,
        "price": 334
    },
    {
        "name": "Veggie Paradise",
        "images": "https://images.dominos.co.in/new_veggie_paradise.jpg",
        "Pass": "The awesome foursome! Golden corn, black olives, capsicum, red paprika",
        "count": 1,
        "price": 432
    },
    {
        "name": "Cheese n Corn",
        "images": "https://images.dominos.co.in/new_cheese_n_corn.jpg",
        "Pass": "A delectable combination of sweet & juicy golden corn",
        "count": 1,
        "price": 523
    },
    {
        "name": "Pepper Barbecue Chicken",
        "images": "https://images.dominos.co.in/new_pepper_barbeque_chicken.jpg",
        "Pass": "Pepper barbecue chicken for that extra zing",
        "count": 1,
        "price": 363
    },
    {
        "name": "Deluxe Veggie",
        "images": "https://images.dominos.co.in/new_deluxe_veggie.jpg",
        "Pass": "Veg delight - onion, capsicum, grilled mushroom, corn & paneer",
        "count": 1,
        "price": 532
    },
    {
        "name": "Chicken Sausage",
        "images": "https://images.dominos.co.in/new_chicken_sausage.jpg",
        "Pass": "American classic! Spicy, herbed chicken sausage on pizza",
        "count": 1,
        "price": 343
    }
  ])
}
