import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { ModalSignupComponent } from './modal-signup/modal-signup.component';

const routes: Routes = [
  {path:'login',component:ModalLoginComponent},
  {path:'signup',component:ModalSignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
