import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  constructor(private router:Router) { }
  ispopUpShow:any;
  ngOnInit(): void {
  }
  closetoggle(){
    this.router.navigate(['']);
  }
  closePop() {
    this.ispopUpShow = false;
 }


}
