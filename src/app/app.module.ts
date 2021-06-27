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

@NgModule({
  declarations: [
    AppComponent,
    LogincustomerComponent,
    SignupcustomerComponent,
    SignupadminComponent,
    LoginadminComponent,
    ModalLoginComponent,
    ModalSignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
