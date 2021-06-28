import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../dataService/data-service.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  data:any;
  loginOrNot:any;
  loginData: Object={};
  constructor(private router:Router,private _dataService:DataServiceService) { 
    
  }
  ispopUpShow:any;
  ngOnInit(): void {
    this._dataService.loginOrNot.subscribe((res)=>{
      this.loginOrNot=res;
    })
    this._dataService.loginData.subscribe((res)=>{
      this.loginData=res;
    })
  }
  closetoggle(){
    this.router.navigate(['']);
  }
  closePop() {
    this.ispopUpShow = false;
 }
 verify(event:NgForm){
  this.data=localStorage.getItem("logindata");
  this.data=JSON.parse(this.data);
  for(let i=0;i<this.data.length;i++){
    if(this.data[i].mail==event.value.mail && this.data[i].password==event.value.password){
      this._dataService.loginOrNot.next(true);
      this.loginOrNot=this._dataService.loginOrNot;
      this._dataService.loginData.next({"name":event.value.mail,"password":event.value.password});
      this.router.navigate(['']);
    }
  }
  if(this.loginOrNot==false){
  alert("Please Enter Correct Email and Password");
  }
 }

}
