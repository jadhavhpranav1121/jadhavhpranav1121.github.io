import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../dataService/data-service.service';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {
  data: any | null;
  loginOrNot: any;
  loginData: any;
  adminData: any;


  constructor(private _dataService:DataServiceService,private router:Router) { }

  ngOnInit(): void {
    this._dataService.adminloginOrNot.subscribe((res)=>{
      this.loginOrNot=res;
    })
    this._dataService.adminData.subscribe((res)=>{
      this.adminData=res;
    })
  }
  verify(event:NgForm){
    this.data=localStorage.getItem("adminData");
    this.data=JSON.parse(this.data);
    if(this.data==null){
      alert("Username does not Exit");
    }
    else{
    for(let i=0;i<this.data.length;i++){
      if(this.data[i].mail==event.value.mail && this.data[i].password==event.value.password){
        this._dataService.adminloginOrNot.next(true);
        this.loginOrNot=this._dataService.adminloginOrNot;
        this._dataService.adminData.next({"name":event.value.mail,"password":event.value.password});
        this.router.navigate(['admin-home']);
      }
    }
    if(this.loginOrNot==false){
    alert("Please Enter Correct Email and Password");
    }
   }
  }
  
}
