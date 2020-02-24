import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FestivalInterface } from '../models/festival';

@Injectable({
  providedIn: 'root'
})
export class MysqlService {

  RUTA = "http://localhost/mysqlAngular/";

  constructor(private http: HttpClient) {}

  getFestivals() {
    return this.http.get<FestivalInterface[]>(`${this.RUTA}consulta.php`);
  }
}
