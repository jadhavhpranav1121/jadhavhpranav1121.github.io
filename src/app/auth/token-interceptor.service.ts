import { HttpInterceptor} from '@angular/common/http';
import { Injectable,Injector } from '@angular/core';
import { DataServiceService } from '../dataService/data-service.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }
  intercept(req:any,next:any){
    let authService=this.injector.get(DataServiceService)
    let tokenizedReq=req.clone({
      setHeaders:{
        Authorization:`Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
