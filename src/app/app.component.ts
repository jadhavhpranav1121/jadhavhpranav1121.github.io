import { Component, ViewChild } from '@angular/core';
import { Data, Router } from '@angular/router';
import { DataServiceService } from './dataService/data-service.service';
import { NgbCarousel, NgbModal, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pranav Pizza Website';
  loginData: any={};
  validatingForm!: FormGroup;
  NameOfItems=["Margherita","Farmhouse","Peppy Paneer","Veg Extravaganza","Veggie Paradise","Cheese n Corn","Pepper Barbecue Chicken","Deluxe Veggie","Chicken Sausage"];
  CartImages=["https://images.dominos.co.in/new_margherita_2502.jpg","https://images.dominos.co.in/farmhouse.png","https://images.dominos.co.in/new_peppy_paneer.jpg","https://images.dominos.co.in/new_veg_extravaganza.jpg","https://images.dominos.co.in/new_veggie_paradise.jpg","https://images.dominos.co.in/new_cheese_n_corn.jpg","https://images.dominos.co.in/new_pepper_barbeque_chicken.jpg","https://images.dominos.co.in/new_deluxe_veggie.jpg","https://images.dominos.co.in/new_chicken_sausage.jpg"];
  DetailsOfP=["Classic delight with 100% real mozzarella cheese","Delightful combination of onion, capsicum, tomato & grilled mushroom","Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika","Black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno & extra cheese","The awesome foursome! Golden corn, black olives, capsicum, red paprika","A delectable combination of sweet & juicy golden corn","Pepper barbecue chicken for that extra zing","Veg delight - onion, capsicum, grilled mushroom, corn & paneer","American classic! Spicy, herbed chicken sausage on pizza"];
  CartDetails: any;
  CartOpenOrNot: any;
  BuyingCartDetail: any;
  DuplicateBuyingOrNot: boolean | undefined;
  customerData: any;
  adminData: any;
  adminloginOrNot: any;
  customerloginOrNot: any;
  OrderOpenOrNot: boolean | undefined;
  OrderDetails: Object[][]=[];
  customerdataToAdmin: Object[]=[];
  DuplicateOrdertails: boolean=false;
  BuyOrNot: any;
  NewData: any;
  NewData1:any;
  newItems: any;
  ErrorPage: any;  
  url: any;
  customerDatabaseData:any;
  dataarray: any;
  customerduplicateOrNot: any=false;
  adminduplicateOrNot:any=false;
  data: any;
  isCustomer=true;
  isAdmin=false;
  isCustomerSigup=true;
  isAdminSigup=false;
  ispopUpShow:any;
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

@ViewChild('carousel', { static: true })
carousel!: NgbCarousel;
  SpinnerService: any;
  constructor(private router:Router,private _dataService:DataServiceService,private modalService: NgbModal){
    this._dataService.adminloginOrNot.subscribe((res)=>{
      this.adminloginOrNot=res;
    });
    this._dataService.customerloginOrNot.subscribe((res)=>{
      this.customerloginOrNot=res;
      console.log(res);
    });
    this._dataService.customerloginOrNot.subscribe((res)=>{
      this.customerloginOrNot=res;
    })   
    this._dataService.CartDetails.subscribe((res)=>{
      this.CartDetails=res;
    });
    this._dataService.OrderOpenOrNot.subscribe((res)=>{
      this.OrderOpenOrNot=res;
    });
    this._dataService.BuyOrNot.subscribe((res)=>{
      this.BuyOrNot=res;
    })
    this._dataService.CartOpenOrNot.subscribe((res)=>{
      this.CartOpenOrNot=res;
    });
    this._dataService.BuyingCartDetail.subscribe((res)=>{
      this.BuyingCartDetail=res;
    });
    this._dataService.customerdataToAdmin.subscribe((res)=>{
      this.customerdataToAdmin=res;
    });
    this._dataService.getDataOfItems().subscribe((res)=>{
      this.CartDetails=res;
  });
  this._dataService.ErrorPage.subscribe((res:any)=>{
    this.ErrorPage=res;
  });
  this._dataService.customerloginOrNot.subscribe((res)=>{
    this.customerloginOrNot=res;
  })
  } 
  getDataOfCustomerInLogin(){
   
    this._dataService.getDataOfCustomer().subscribe((res)=>{
        this.customerDatabaseData=res;
    });
    
   this._dataService.getDataOfAdmin().subscribe((res)=>{
    this.data=res;
    console.log(this.data);
});
// this.SpinnerService.hide(); 
}

  ngOnInit(): void {
    this.getDataOfCustomerInLogin();
    
  }

  logout(){
    this._dataService.customerdataToAdmin.next([]);
    this._dataService.BuyOrNot.next(false);
    this._dataService.BuyingCartDetail.next([]);
  // this._dataService.CartDetails.next([]);
    this._dataService.customerData.next({});
    this._dataService.OrderDetails.next([]);
    this._dataService.adminData.next({});
    this._dataService.customerloginOrNot.next(false);
    this._dataService.adminloginOrNot.next(false);
    this.CartOpenOrNot=false;
    this._dataService.OrderOpenOrNot.next(false);
    this._dataService.adminData.next({});
    this._dataService.customerData.next({});
    this.OrderOpenOrNot=false;
    this.isAdmin=false;
    this.isCustomer=true;
    this.isAdminSigup=false;
    this.isCustomerSigup=true;
    this._dataService.CartOpenOrNot.next(false);
    this.router.navigate(['']);
  }
  ChangeCartOpeningStatus(){
    this.CartOpenOrNot=true;
    this._dataService.CartOpenOrNot.next(this.CartOpenOrNot);
  }
  ChangeOrdersOpeningStatus(){
    this.OrderOpenOrNot=true;
    this._dataService.OrderOpenOrNot.next(this.OrderOpenOrNot);
  }
  AddToBuyingCart(Data:any){
      this.NewData=Data;
      this.BuyingCartDetail.push(this.NewData);
      this.BuyingCartDetail[this.BuyingCartDetail.length-1]['count']++;
      this._dataService.BuyingCartDetail.next(this.BuyingCartDetail);
  }
  decrease(item:any){
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      if(this.BuyingCartDetail[i]['name']==item['name']){
        this.BuyingCartDetail[i]['count']--;
        if(this.BuyingCartDetail[i]['count']<=0){
          this.BuyingCartDetail.splice(i,1);
        }
      }
    }
    this._dataService.BuyingCartDetail.next(this.BuyingCartDetail);
  }
  increase(item:any){
    for(let i=0;i<this.BuyingCartDetail.length;i++){
      if(this.BuyingCartDetail[i]['name']==item['name']){
        this.BuyingCartDetail[i]['count']++;
      }
    }
    this._dataService.BuyingCartDetail.next(this.BuyingCartDetail);
  }



  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true,scrollable: true});
  }
    

changeStateAdmin(){
  this.isAdmin=true;
  this.isCustomer=false;
}
changeStateCustomer(){
  this.isAdmin=false;
  this.isCustomer=true;
}
changeStateCustomerSigup(){
  this.isAdminSigup=false;
  this.isCustomerSigup=true;
}
changeStateAdminSigup(){
  
  this.isCustomerSigup=false;
  this.isAdminSigup=true;
}
closetoggle(){
  this.router.navigate(['']);
}
closePop() {
  this.ispopUpShow = false;
}
verifyCustomer(event:NgForm){
  if(this.customerDatabaseData==null){
    alert("Username does not Exist");
  }
  for(let i=0;i<this.customerDatabaseData.length;i++){
    console.log("asd"+this.customerDatabaseData);
    if(this.customerDatabaseData[i].email==event.value.mail && this.customerDatabaseData[i].Pass==event.value.password){
    this._dataService.customerloginOrNot.next(true);
    this._dataService.customerData.next({
      "name":event.value.mail,
      "password":event.value.password
    });
    this.customerData={
      "name":event.value.mail,
      "password":event.value.password
    }
    this.customerloginOrNot=true;
    if(this.customerloginOrNot==true){
      this.modalService.dismissAll();
    }
    this.router.navigate(['']);
  }
}
if(this.customerloginOrNot==false){
  alert("Please Enter Correct Email and Password");
  }
}
verifyAdmin(event:NgForm){
  if(this.data==null){
    alert("Username does not Exit");
  }
  for(let i=0;i<this.data.length;i++){
    if(this.data[i].email==event.value.mail && this.data[i].Pass==event.value.password){
      this._dataService.adminloginOrNot.next(true);
      this.adminData={"name":event.value.mail,"password":event.value.password};
      this._dataService.adminData.next(this.adminData);
      this.adminloginOrNot=true;
      if(this.adminloginOrNot==true){
        this.modalService.dismissAll();
      }
      this.router.navigate(['admin-home']);
    }
  }
  if(this.adminloginOrNot==false){
  alert("Please Enter Correct Email and Password");
  }
}
dataCustomer(event:NgForm){
  const new1=event.value;
  // this.dataarray=this._dataService.signDataCustomer.value;
  for(let i=0;i<this.customerDatabaseData.length;i++){
    if(event.value.mail==this.customerDatabaseData[i]['email'] || event.value.password==this.customerDatabaseData[i]['password']){
      alert("Please Don't enter existing data");
      this.customerduplicateOrNot=true;
    }
  }
  if(this.customerduplicateOrNot==false){
    //  this.dataarray.push(new1);
     this._dataService.AddDataToCustomer({"first_name":event.value.first_name,"last_name":event.value.Last_name,"email":event.value.mail,"Pass":event.value.password,"phone_number":event.value.phonenumber,"address":event.value.address}).subscribe((res)=>{
      // this._dataService.signDataCustomer.next(this.dataarray);
      
    },
    (err)=>{
      console.log(err);
    })
    this._dataService.AddDataToOrder({"email":event.value.mail,"orders":[]}).subscribe((res)=>{
      console.log(res);
    });
    this.modalService.dismissAll();
      alert("Account is Created!");
      this.router.navigate(['']);   
}
this.customerduplicateOrNot=false;
}
dataAdmin(event:NgForm){
  for(let i=0;i<this.data.length;i++){
    if(event.value.mail==this.data[i]['email'] && event.value.password==this.data[i]['Pass']){
      alert("Please Don't enter existing data");
      this.adminduplicateOrNot=true;
    }
  }
  if(this.adminduplicateOrNot==false){
      this._dataService.AddDataToAdmin({"first_name":event.value.first_name,"last_name":event.value.Last_name,"email":event.value.mail,"Pass":event.value.password,"phone_number":event.value.phonenumber,"address":event.value.address}).subscribe((res)=>{}
      ,
      (err)=>{
        console.log(err);
      }
      )
      this.modalService.dismissAll();
      alert("Account is Created!");
      this.router.navigate(['']);   
}
this.adminduplicateOrNot=false;

}

loginAlert(){
}
 }
  
