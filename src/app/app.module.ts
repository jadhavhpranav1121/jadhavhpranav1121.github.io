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
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { Error404Component } from './error404/error404.component';
import { BodyComponentComponent } from './body-component/body-component.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SettingcomponentComponent } from './settingcomponent/settingcomponent.component';
import { MenuComponent } from './menu/menu.component';
import { SettingAdminComponent } from './setting-admin/setting-admin.component';  
import { ReactiveFormsModule } from '@angular/forms';
import { WindowService } from './dataService/window.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { AuthGuard } from './auth/auth.guard';
import { CookieService } from 'ngx-cookie-service';
const config = {
  apiKey: "AIzaSyB8AD5soww5Hlk_yZr-mYUN94zBUJ37B8w",
  authDomain: "fir-91088.firebaseapp.com",
  databaseURL: "https://fir-91088-default-rtdb.firebaseio.com",
  projectId: "fir-91088",
  storageBucket: "fir-91088.appspot.com",
  messagingSenderId: "673242040467",
  appId: "1:673242040467:web:df7cb767902086bc54e566"
};
@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    CustomerOrdersComponent,
    AdminSideOrdersComponent,
    AdminhomepageComponent,
    Error404Component,
    BodyComponentComponent,
    // TokenInterceptorService,
    SettingcomponentComponent,
    MenuComponent,
    SettingAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
     NgbAlertModule,
     NgbModule,
     HttpClientModule,
    //  TokenInterceptorService,
     NgxSpinnerModule,
     AngularFireModule.initializeApp(config),
     AngularFirestoreModule, // firestore
     AngularFireAuthModule, // auth
     AngularFireStorageModule // storage
  ],
  providers: [HttpClientModule,WindowService,AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  },CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
