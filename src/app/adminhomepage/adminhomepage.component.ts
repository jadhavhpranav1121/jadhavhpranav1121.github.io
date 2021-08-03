import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiceService } from '../dataService/data-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-adminhomepage',
  templateUrl: './adminhomepage.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./adminhomepage.component.css']
})
export class AdminhomepageComponent implements OnInit {
  adminloginOrNot: boolean=false;
  CartDetails:any;
  url:any;
  findThisItem: any;
  updateData: any;
  updateItems:Object={};
  constructor(private _dataService:DataServiceService,private modalService: NgbModal,private SpinnerService:NgxSpinnerService) {
    this._dataService.adminloginOrNot.subscribe((res)=>{
      this.adminloginOrNot=res;
    })
   
   }
   getItemsFromDatabase(){
    this._dataService.getDataOfItems().subscribe((res)=>{
      this.CartDetails=res;
    })
   }
  ngOnInit(): void {
    this.SpinnerService.show();
    this.getItemsFromDatabase();
    this.SpinnerService.hide();
  }
  // add(event:NgForm){
  //   
  // }
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
  openVerticallyCenteredUpdate(content:any,i:any){
    this.modalService.open(content, { centered: true });
    this.findThisItem=this.CartDetails[i]["_id"];
    console.log(this.findThisItem);
    this._dataService.findItemInDataBase(this.findThisItem).subscribe((res:any)=>{
      this.updateData=res;
    })
  }
  
  deleteItems(item:any) {
    if(confirm("Are you sure to delete" +item['_id'])) {
      this._dataService.deleteItemsInDataBase(item['_id']).subscribe((res)=>{
        this.getItemsFromDatabase();
      });
    }
  }
  data(event:NgForm){
    
    this._dataService.AddDataToItems({"name":event.value.name,"images":this.url,"Pass":event.value.Pass,"count":event.value.count,"price":event.value.price}).subscribe((res:any)=>{
          this.CartDetails.push(res);
          this._dataService.CartDetails.next(this.CartDetails);
        });
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
}
  updateItem(f:NgForm){
    this.updateItems["name"]=f.value.name;
    this.updateItems["images"]=this.url;
    this.updateItems["Pass"]=f.value.Pass;
    this.updateItems["count"]=0;
    this.updateItems["price"]=f.value.price;
    console.log(this.updateItems);
      this._dataService.updateItemInDataBase(this.updateItems,this.findThisItem).subscribe((res:any)=>{
        this.getItemsFromDatabase();
      });
      
  }
}

