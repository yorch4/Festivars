import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

declare const validate: any;


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authError: any;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
      validate();
    })
  }

  createUser(frm) {
    this.auth.createUser(frm.value);
  }

}
