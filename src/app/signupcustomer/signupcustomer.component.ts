import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../dataService/data-service.service';

@Component({
  selector: 'app-signupcustomer',
  templateUrl: './signupcustomer.component.html',
  styleUrls: ['./signupcustomer.component.css']
})
export class SignupcustomerComponent implements OnInit {
  dataarray: any;
  duplicateOrNot: boolean | undefined;

  constructor(private router:Router,private _dataServices:DataServiceService) { }

  ngOnInit(): void {
    this._dataServices.signDataCustomer.subscribe((res:any)=>{
      this.dataarray=res;
   })
  }
  closetoggle(){
    this.router.navigate(['']);
  }
   
  
  data(event:NgForm){
    const new1=event.value;
    this.dataarray=this._dataServices.signDataCustomer.value;
    for(let i=0;i<this.dataarray.length;i++){
      if(event.value.mail==this.dataarray[i]['mail'] && event.value.password==this.dataarray[i]['password']){
        alert("Please Don't enter existing data");
        this.duplicateOrNot=true;
      }
    }
    if(this.duplicateOrNot==false){
       this.dataarray.push(new1);
        localStorage.setItem("customerData",JSON.stringify(this._dataServices.signDataCustomer.value));
        alert("Account is Created!");
        this.router.navigate(['']);   
  }
  this.duplicateOrNot=false;
}


}
