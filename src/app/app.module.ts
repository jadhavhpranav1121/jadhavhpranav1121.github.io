import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { AdminSideOrdersComponent } from './admin-side-orders/admin-side-orders.component';
import { AdminhomepageComponent } from './adminhomepage/adminhomepage.component';
import {NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { Error404Component } from './error404/error404.component';
import { BodyComponentComponent } from './body-component/body-component.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SettingcomponentComponent } from './settingcomponent/settingcomponent.component';
import { MenuComponent } from './menu/menu.component';  
@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    CustomerOrdersComponent,
    AdminSideOrdersComponent,
    AdminhomepageComponent,
    Error404Component,
    BodyComponentComponent,
    SettingcomponentComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbPaginationModule,
     NgbAlertModule,
     NgbModule,
     HttpClientModule,
     NgxSpinnerModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
