import { Component, OnInit } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { DataServiceService } from '../dataService/data-service.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {
  ErrorPage: any;
  constructor(private _dataService:DataServiceService,private router:Router) { 
    this._dataService.ErrorPage.subscribe((res:any)=>{
      this.ErrorPage=res;
    })
    this.router.events.subscribe((event:any) => {

      if (event instanceof NavigationEnd) {
          this._dataService.ErrorPage.next(false);
      }
  });
  }
  ngOnInit(): void {
    this._dataService.ErrorPage.next(true);
  }

}
