import { environment } from './../../environments/environment';
import { DataService } from './data.service';
import { JwtHelper, tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService extends DataService {
  constructor(authHttp: AuthHttp, http: Http) {
    super(environment.baseAPIDomain + '/api/users/login', authHttp, http);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return tokenNotExpired(); // Angular short cut.

    // WHAT IS REALLY HAPPENING UNDER THE HOOD.
    /* const jwtHelper = new JwtHelper();
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);
    console.log("Token expiration date: ", expirationDate);
    return !isExpired; */
  }

  get currentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    const userData = new JwtHelper().decodeToken(token).result;

    return userData;
  }
}

