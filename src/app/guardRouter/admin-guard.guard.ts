import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataServiceService } from '../dataService/data-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  adminloginOrNot: boolean|undefined;
  constructor(private _dataService:DataServiceService){
    this._dataService.adminloginOrNot.subscribe((res)=>{
      this.adminloginOrNot=res;
    })

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return (this.adminloginOrNot==false?false:true);
  }
  
}
