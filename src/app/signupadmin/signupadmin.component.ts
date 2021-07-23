import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataServiceService } from '../dataService/data-service.service';


@Component({
  selector: 'app-signupadmin',
  templateUrl: './signupadmin.component.html',
  styleUrls: ['./signupadmin.component.css']
})
export class SignupadminComponent implements OnInit {
  dataarray: any;
  duplicateOrNot: boolean | undefined;
  
  constructor(private router:Router,private _dataServices:DataServiceService,private http:HttpClient) { }

  ngOnInit(): void {  
    this._dataServices.signDataAdmin.subscribe((res:any)=>{
      this.dataarray=res;
   })
   
  }
  closetoggle(){
    this.router.navigate(['']);
  }

  data(event:NgForm){
    const new1=event.value;
    this.dataarray=this._dataServices.signDataAdmin.value;
    for(let i=0;i<this.dataarray.length;i++){
      if(event.value.mail==this.dataarray[i]['mail'] && event.value.password==this.dataarray[i]['password']){
        alert("Please Don't enter existing data");
        this.duplicateOrNot=true;
      }
    }
    if(this.duplicateOrNot==false){
       this.dataarray.push(new1);    
        // localStorage.setItem("adminData",JSON.stringify(this._dataServices.signDataAdmin.value));
        console.log(new1);
        this._dataServices.AddDataToAdmin({"first_name":event.value.first_name,"last_name":event.value.Last_name,"email":event.value.mail,"Pass":event.value.password,"phone_number":event.value.phonenumber,"address":event.value.address}).subscribe((res)=>{
          this._dataServices.signDataAdmin.next(this.dataarray);
        },
        (err)=>{
          console.log(err);
        }
        )
        alert("Account is Created!");
        this.router.navigate(['']);   
  }
  this.duplicateOrNot=false;
  
}


}
