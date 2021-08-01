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

const routes: Routes = [
  {path:'',component:BodyComponentComponent,pathMatch:'full'},
  {path:'carts',component:CartComponent,pathMatch:'full'},
  {path:'orders',component:CustomerOrdersComponent,pathMatch:'full'},
  {path:'Adminorders',component:AdminSideOrdersComponent,pathMatch:'full'},
  {path:'admin-home',component:AdminhomepageComponent,pathMatch:'full'},
  {path:'**',component:Error404Component}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
