import { AuthHttp } from 'angular2-jwt';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  // Angular shortcut
  constructor(private authHttp: AuthHttp) {
  }

  getUsers() {
    return this.authHttp.get('http://localhost:3000/api/users/')
      .map(response => {
        response.json();
      });
  }

  // What's happening under the hood
  /* constructor(private http: Http) {
  }

  getUsers() {
    const headers = new Headers();
    headers.append('Authorisation', 'Bearer' + localStorage.getItem('token'));

    const options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:3000/api/users/', options)
      .map(response => {
        response.json();
      });
  } */
}
