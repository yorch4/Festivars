import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  private errorMessage;
  private successMessage;
  private authService = AuthService;

  constructor() { }

  ngOnInit() {
  }

  tryRegister(value) {
    this.authService.doRegister(value).then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Tu cuenta ha sido creada";
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

}
