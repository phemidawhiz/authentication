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
    localStorage.removeItem("token");
  }

  isLoggedIn() {
    return false;
  }
}

