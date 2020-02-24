import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MysqlService } from 'src/app/services/mysql.service';
import { FestivalInterface } from 'src/app/models/festival';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private festivals: FestivalInterface[];
  constructor(private auth: AuthService, private mysql: MysqlService) { }

  ngOnInit() {
    this.mysql.getFestivals().subscribe(
      festivals => {
        this.festivals = festivals;
      }
    );
  }

}
