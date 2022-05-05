import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { DataServiceService } from '../dataService/data-service.service';

@Component({
  selector: 'app-body-component',
  templateUrl: './body-component.component.html',
  styleUrls: ['./body-component.component.css']
})
export class BodyComponentComponent implements OnInit {
  adminloginOrNot: any;
  customerloginOrNot: any;
  customerData: any;
  adminData: any;
  CartDetails: any;
  OrderOpenOrNot: any;
  BuyOrNot: any;
  CartOpenOrNot: any;
  BuyingCartDetail: any;
  OrderDetails: any;
  customerdataToAdmin: any;
  ErrorPage: any;
  NewData: any;

  constructor(private _dataService:DataServiceService) {
    this._dataService.adminloginOrNot.subscribe((res)=>{
      this.adminloginOrNot=res;
    });
    this._dataService.customerloginOrNot.subscribe((res)=>{
      this.customerloginOrNot=res;
      // console.log(res);
    });
    // this._dataService.customerData.subscribe((res)=>{
    //   this.customerData=res;
    // // });
    // this._dataService.adminData.subscribe((res)=>{
    //   this.adminData=res;
    // });
   
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
    // this._dataService.OrderDetails.subscribe((res)=>{
    //   this.OrderDetails=res;
    // });
    this._dataService.customerdataToAdmin.subscribe((res)=>{
      this.customerdataToAdmin=res;
    });
    this._dataService.getDataOfItems().subscribe((res)=>{
      this.CartDetails=res;
  });
  this._dataService.ErrorPage.subscribe((res:any)=>{
      this.ErrorPage=res;
    })
   } 
  ngOnInit(): void {
  }
  images = ["../../assets/imagesOfPizza/1.jpg","../../assets/imagesOfPizza/2.jpg","../../assets/imagesOfPizza/3.jpg","../../assets/imagesOfPizza/4.jpg"]
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;
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
}
