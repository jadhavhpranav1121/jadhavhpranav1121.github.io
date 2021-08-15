import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSideOrdersComponent } from './admin-side-orders/admin-side-orders.component';
import { AdminhomepageComponent } from './adminhomepage/adminhomepage.component';
import { AuthGuard } from './auth/auth.guard';
import { BodyComponentComponent } from './body-component/body-component.component';
import { CartComponent } from './cart/cart.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { Error404Component } from './error404/error404.component';
import { MenuComponent } from './menu/menu.component';
import { SettingAdminComponent } from './setting-admin/setting-admin.component';
import { SettingcomponentComponent } from './settingcomponent/settingcomponent.component';
// ,canActivate:[AuthGuard]
const routes: Routes = [
  {path:'',component:BodyComponentComponent,pathMatch:'full'},
  {path:'carts',component:CartComponent,pathMatch:'full'},
  {path:'orders',component:CustomerOrdersComponent,pathMatch:'full'},
  {path:'Adminorders',component:AdminSideOrdersComponent,pathMatch:'full'},
  {path:'admin-home',component:AdminhomepageComponent,pathMatch:'full'},
  {path:'settings',component:SettingcomponentComponent,pathMatch:'full'},
  {path:'menu',component:MenuComponent,pathMatch:'full'},
  {path:'setting-admin',component:SettingAdminComponent,pathMatch:'full'},
  {path:'**',component:Error404Component}
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{
    // onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
