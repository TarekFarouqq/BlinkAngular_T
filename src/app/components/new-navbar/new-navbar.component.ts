import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-navbar',
  imports: [RouterLink],
  templateUrl: './new-navbar.component.html',
  styleUrl: './new-navbar.component.css'
})
export class NewNavbarComponent implements OnInit{
  UserStatus!:boolean;
  constructor(private authServer:AuthService){}
  ngOnInit(): void {
    this.authServer.isLoggedIn$.subscribe(isLogged=>{
      this.UserStatus=isLogged;
    })
  }
  logoutCurrentUser(){
    this.authServer.Logout();
    this.authServer.userLogout();
  }
}
