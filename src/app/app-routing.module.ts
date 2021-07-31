import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSideOrdersComponent } from './admin-side-orders/admin-side-orders.component';
import { AdminhomepageComponent } from './adminhomepage/adminhomepage.component';
import { BodyComponentComponent } from './body-component/body-component.component';
import { CartComponent } from './cart/cart.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { Error404Component } from './error404/error404.component';
import { AdminGuardGuard } from './guardRouter/admin-guard.guard';
import { LoginGuardGuard } from './guardRouter/login-guard.guard';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { LogincustomerComponent } from './logincustomer/logincustomer.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { ModalSignupComponent } from './modal-signup/modal-signup.component';
import { SignupadminComponent } from './signupadmin/signupadmin.component';
import { SignupcustomerComponent } from './signupcustomer/signupcustomer.component';

const routes: Routes = [
  {path:'',component:BodyComponentComponent,pathMatch:'full'},
  // pathMatch:'full',redirectTo:'/login/customer',
  {path: 'customer', component: LogincustomerComponent}, 
  {path: 'admin', component:LoginadminComponent}, 
  {path:'signup',component:ModalSignupComponent, children: [
    {path: 'customer',component: SignupcustomerComponent}, 
    {path: 'admin', component:SignupadminComponent }, 
  ]},
  {path:'carts',component:CartComponent,pathMatch:'full',canActivate:[LoginGuardGuard]},
  {path:'orders',component:CustomerOrdersComponent,pathMatch:'full',canActivate:[LoginGuardGuard]},
  {path:'Adminorders',component:AdminSideOrdersComponent,pathMatch:'full',canActivate:[AdminGuardGuard]},
  {path:'admin-home',component:AdminhomepageComponent,pathMatch:'full',canActivate:[AdminGuardGuard]},
  {path:'**',component:Error404Component}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
