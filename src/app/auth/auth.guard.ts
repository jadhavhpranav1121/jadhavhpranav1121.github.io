import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { DataServiceService } from '../dataService/data-service.service';
import {map,take} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  CustomerLoginOrNot:any;
  constructor(private _dataService:DataServiceService,private router:Router){
  
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Observable<boolean> | Promise<boolean> | boolean {
      if(this._dataService.loggedInOrNot()){
        return true;
      }
      else{
        this.router.navigate[''];
        return false;
      }
    }
}

