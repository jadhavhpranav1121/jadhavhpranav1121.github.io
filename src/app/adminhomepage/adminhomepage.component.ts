import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiceService } from '../dataService/data-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-adminhomepage',
  templateUrl: './adminhomepage.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./adminhomepage.component.css']
})
export class AdminhomepageComponent implements OnInit {
  adminloginOrNot: boolean=false;
  CartDetails:any;
  constructor(private _dataService:DataServiceService,private modalService: NgbModal) {
    this._dataService.adminloginOrNot.subscribe((res)=>{
      this.adminloginOrNot=res;
    })
    this._dataService.getDataOfItems().subscribe((res)=>{
      this.CartDetails=res;
    })
    
   }
  ngOnInit(): void {
  }
  // add(event:NgForm){
  //   
  // }
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
    
  data(event:NgForm){
    
    this._dataService.AddDataToItems({"name":event.value.name,"images":event.value.images,"Pass":event.value.Pass,"count":event.value.count,"price":event.value.price}).subscribe((res:any)=>{
          this.CartDetails.push(res);
          this._dataService.CartDetails.next(this.CartDetails);
        });
  }


}

