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
  dataarray: Array<any> = [];
  duplicateOrNot:any=false;
  ngOnInit(): void {
    this._dataServices.signData.subscribe((res:any)=>{
      this.dataarray=res;
   })
  }
  closetoggle(){
    this.router.navigate(['']);
  }
   
  
  data(event:NgForm){
    // console.log(event);
    const new1=event.value;
    this.dataarray=this._dataServices.signData.value;
    for(let i=0;i<this.dataarray.length;i++){
      if(event.value.mail==this.dataarray[i]['mail'] && event.value.password==this.dataarray[i]['password']){
        alert("Please Don't enter existing data");
        this.duplicateOrNot=true;
      }
    }
    if(this.duplicateOrNot==false){
       this.dataarray.push(new1);    
        localStorage.setItem("logindata",JSON.stringify(this._dataServices.signData.value));
        alert("Account is Created!");
        this.router.navigate(['']);   
  }
}
  
}
