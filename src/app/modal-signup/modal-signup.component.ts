import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataServiceService } from '../dataService/data-service.service';
@Component({
  selector: 'app-modal-signup',
  templateUrl: './modal-signup.component.html',
  styleUrls: ['./modal-signup.component.css']
})
export class ModalSignupComponent implements OnInit {

  constructor(private router:Router,private _dataServices:DataServiceService) { }

  ngOnInit(): void {
    this._dataServices.signData.subscribe((res:any)=>{
      this._dataServices.signData.next(this.dataarray);
      // console.log(res);
   })
  }
  closetoggle(){
    this.router.navigate(['']);
  }
   dataarray: Array<Object> = [];
  
  data(event:NgForm){
    // console.log(event);
    const new1=event.value;
    this.dataarray=this._dataServices.signData.value;
    this.dataarray.push(new1);
    // console.log(this.dataarray);
    
    localStorage.setItem("logindata",JSON.stringify(this._dataServices.signData));
  }
  
}
