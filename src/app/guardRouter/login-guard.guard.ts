import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataServiceService } from '../dataService/data-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  customerloginOrNot: boolean|undefined;
  constructor(private _dataService:DataServiceService){
    this._dataService.customerloginOrNot.subscribe((res)=>{
      this.customerloginOrNot=res;
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return (this.customerloginOrNot==false?false:true);
  }
}
