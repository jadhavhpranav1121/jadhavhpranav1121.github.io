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

  urlOfAdmin="https://pizza-hunter-01.herokuapp.com/admin";  
  urlOfCustomer="https://pizza-hunter-01.herokuapp.com/customer";
  urlOfItems="https://pizza-hunter-01.herokuapp.com/items";
  urlOfOrders="https://pizza-hunter-01.herokuapp.com/orders";
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
  getDataOfLoginUser(res:any){
    return this.http.post(this.urlOfCustomer+"/auth/",res);
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
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  sendOTP(req:any){
    return this.http.post("https://pizza-hunter-01.herokuapp.com/sendOTP",req);
  }
  verifyOTP(req:any){
    return this.http.post("https://pizza-hunter-01.herokuapp.com/verifyOTP",req);
  }
  refreshOTP(req:any){
    return this.http.post("https://pizza-hunter-01.herokuapp.com/refresh",req);
  }
  logoutCookie(){
    return this.http.get("https://pizza-hunter-01.herokuapp.com/logout");
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










