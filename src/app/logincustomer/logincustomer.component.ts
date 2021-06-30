import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../dataService/data-service.service';

@Component({
  selector: 'app-logincustomer',
  templateUrl: './logincustomer.component.html',
  styleUrls: ['./logincustomer.component.css']
})
export class LogincustomerComponent implements OnInit {
  data:any;
  loginOrNot:any;
  loginData: Object={};
  customerData: any;
  constructor(private router:Router,private _dataService:DataServiceService) { 
    
  }
  ispopUpShow:any;
  ngOnInit(): void {
    this._dataService.customerloginOrNot.subscribe((res)=>{
      this.loginOrNot=res;
    })
this._dataService.customerData.subscribe((res)=>{
  this.customerData=res;
})
  }
  closetoggle(){
    this.router.navigate(['']);
  }
  closePop() {
    this.ispopUpShow = false;
 }
 verify(event:NgForm){
  this.data=localStorage.getItem("customerData");
  this.data=JSON.parse(this.data);
  if(this.data==null){
    alert("Username does not Exit");
  }
  for(let i=0;i<this.data.length;i++){
    if(this.data[i].mail==event.value.mail && this.data[i].password==event.value.password){
      this._dataService.customerloginOrNot.next(true);
      this.loginOrNot=this._dataService.customerloginOrNot;
      this._dataService.customerData.next({"name":event.value.mail,"password":event.value.password});
      this.router.navigate(['']);
    }
  }
  if(this.loginOrNot==false){
  alert("Please Enter Correct Email and Password");
  }
 }
  
}
