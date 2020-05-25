import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) {
   return this.http.post('http://localhost:3000/api/users/login',
      credentials).map( response => {
        const result = response.json();
        if ( result && result.token) {
          console.log('Token: ' + response.json().token);
          localStorage.setItem('token', result.token)
          return true
        }

        return false;
      });
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

