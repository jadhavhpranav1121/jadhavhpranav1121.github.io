import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogincustomerComponent } from './logincustomer/logincustomer.component';
import { SignupcustomerComponent } from './signupcustomer/signupcustomer.component';
import { SignupadminComponent } from './signupadmin/signupadmin.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { ModalSignupComponent } from './modal-signup/modal-signup.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { AdminSideOrdersComponent } from './admin-side-orders/admin-side-orders.component';
import { AdminhomepageComponent } from './adminhomepage/adminhomepage.component';
import {NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { Error404Component } from './error404/error404.component';
import { BodyComponentComponent } from './body-component/body-component.component';
@NgModule({
  declarations: [
    AppComponent,
    LogincustomerComponent,
    SignupcustomerComponent,
    SignupadminComponent,
    LoginadminComponent,
    ModalLoginComponent,
    ModalSignupComponent,
    CartComponent,
    CustomerOrdersComponent,
    AdminSideOrdersComponent,
    AdminhomepageComponent,
    Error404Component,
    BodyComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbPaginationModule,
     NgbAlertModule,
     NgbModule,
     HttpClientModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
