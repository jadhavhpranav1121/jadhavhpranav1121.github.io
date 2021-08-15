import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { DataServiceService } from '../dataService/data-service.service';
import {map,take} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  CustomerLoginOrNot:any;
  constructor(private _dataService:DataServiceService){
  
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Observable<boolean> | Promise<boolean> | boolean {
      return this._dataService.customerloginOrNot.pipe(
        // take(1),
        map(res=>{
          console.log(res);
          return res;
        })
        )
    }
}

