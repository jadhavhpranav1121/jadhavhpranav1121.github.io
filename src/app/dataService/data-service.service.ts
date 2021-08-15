import { HttpClient,HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { customerScheme } from '../app-models/customerScheme.model';
import { dataScheme } from '../app-models/dataScheme.model';
import { itemScheme } from '../app-models/itemScheme.model';
import { orderScheme } from '../app-models/orderDetails.model';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  loginData: any;
  loginOrNot: any;
  OrdersOpenOrNot: any;

  urlOfAdmin="http://localhost:3000/admin";  
  urlOfCustomer="http://localhost:3000/customer";
  urlOfItems="http://localhost:3000/items";
  urlOfOrders="http://localhost:3000/orders";
  constructor(private http:HttpClient) { 
  }
  AddDataToAdmin(req:dataScheme){
    return this.http.post(this.urlOfAdmin,req);
  }
  AddDataToCustomer(req:dataScheme){
    return this.http.post(this.urlOfCustomer,req);
  }
  AddDataToItems(req:itemScheme){
    return this.http.post(this.urlOfItems,req);
  }
  AddDataToOrder(req:customerScheme){
    return this.http.post(this.urlOfOrders,req);
  }
  updateOrders(req:orderScheme[],name:any){
    return this.http.patch(this.urlOfOrders+"/"+name,req);
  }
  DeleteOrders(req:any,email:any){
    return this.http.patch(this.urlOfOrders+"/"+email+"/orders",req);
  }
  DeleteOrdersAccount(email:any){
    return this.http.delete(this.urlOfOrders+"/"+email);
  }
  deleteAdmin(id:any){
    return this.http.delete(this.urlOfAdmin+"/"+id);
  }
  updateStatus(req:any,id:any){
    return this.http.put(this.urlOfOrders+'/'+id,req);
  }
  getDataOfCustomer(){
      return this.http.get(this.urlOfCustomer);
  }
  getDataOfAdmin(){
    return this.http.get(this.urlOfAdmin);
  }
  getDataOfItems(){
    return this.http.get(this.urlOfItems);
  }
  getDataOfLoginAdmin(email:any){
    return this.http.get(this.urlOfAdmin+"/auth/"+email);
  }
  getDataOfLoginUser(email:any){
    return this.http.get(this.urlOfCustomer+"/auth/"+email);
  }
  getDataOfOrders(){
    return this.http.get(this.urlOfOrders);
  }
  deleteItemsInDataBase(name:any){
    
    return this.http.delete(this.urlOfItems+"/"+name);
  }
  deleteCustomerInDataBase(id:any){
    return this.http.delete(this.urlOfCustomer+"/"+id);
  }
  updateOrdersStatus(req:any,id:any){
    // console.log("ues");
    return this.http.patch(this.urlOfOrders+"/changingStatus/"+id,req);
  }
  findItemInDataBase(id:any){
    return this.http.get(this.urlOfItems,id);
  }
  updateItemInDataBase(req:any,id:any){
    return this.http.patch(this.urlOfItems+"/"+id,req);
  }
  loggedInOrNot(){
    return this.customerloginOrNot;
  }
  customerdataToAdmin=new BehaviorSubject<Array<Object>>([]);
  customerloginOrNot=new BehaviorSubject<boolean>(false);
  BuyOrNot=new BehaviorSubject<boolean>(false);
  adminloginOrNot=new BehaviorSubject<boolean>(false);
  CartOpenOrNot=new BehaviorSubject<any>(false);
  BuyingCartDetail=new BehaviorSubject<Array<Object>>([]);
  OrderOpenOrNot=new BehaviorSubject<boolean>(false);
  CartDetails=new BehaviorSubject<Array<Object>>([]);
  customerData=new BehaviorSubject<Object>({});
  OrderDetails=new BehaviorSubject<Array<Array<Object>>>([]);
  adminData=new BehaviorSubject<Object>({});
  ErrorPage=new BehaviorSubject<Boolean>(false);
  // customerAllData=new BehaviorSubject<Array<Object>>([]);
}










