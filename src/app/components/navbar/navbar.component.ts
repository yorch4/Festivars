import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: firebase.User;

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.auth.getUserState()
    .subscribe( user => {
      this.user = user;
    })
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
  }

}
