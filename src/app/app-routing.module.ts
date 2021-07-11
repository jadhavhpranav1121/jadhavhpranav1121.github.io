import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSideOrdersComponent } from './admin-side-orders/admin-side-orders.component';
import { AdminhomepageComponent } from './adminhomepage/adminhomepage.component';
import { CartComponent } from './cart/cart.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { LogincustomerComponent } from './logincustomer/logincustomer.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { ModalSignupComponent } from './modal-signup/modal-signup.component';
import { SignupadminComponent } from './signupadmin/signupadmin.component';
import { SignupcustomerComponent } from './signupcustomer/signupcustomer.component';

const routes: Routes = [
  // {path:'',component:BodyComponent},
  {path:'login',component:ModalLoginComponent, children: [
    {path: 'customer', component: LogincustomerComponent}, 
    {path: 'admin', component:LoginadminComponent }, 
  ]},
  {path:'signup',component:ModalSignupComponent, children: [
    {path: 'customer', component: SignupcustomerComponent}, 
    {path: 'admin', component:SignupadminComponent }, 
  ]},
  {path:'carts',component:CartComponent},
  {path:'orders',component:CustomerOrdersComponent},
  {path:'Adminorders',component:AdminSideOrdersComponent},
  {path:'admin-home',component:AdminhomepageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
