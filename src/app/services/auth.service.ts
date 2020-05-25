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
        console.log("Token: " + response.json().token);
        let result = response.json().token;
        if( result && result.token) {
          localStorage.setItem("token", result.token)
          return true
        }

        return false;
      });
  }

  logout() {
  }

  isLoggedIn() {
    return false;
  }
}

