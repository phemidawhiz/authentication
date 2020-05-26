import { BadRequestError } from './../common/bad-request-error';
import { NotFoundError } from './../common/not-found-error';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { AppError } from '../common/app-error';

@Injectable()
export class DataService {

   // Angular shortcut
  constructor(private url: any, private authHttp?: AuthHttp, private http?: Http) {}

  getAll() {
    return this.authHttp.get(this.url)
    .pipe(retry(1),
      catchError(this.handleError)
    );
  }

  // What's happening under the hood
  /* constructor(rivate url: any, private http: Http) {
  }

  getUsers() {
    const headers = new Headers();
    headers.append('Authorisation', 'Bearer' + localStorage.getItem('token'));

    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.url, options)
      .pipe(retry(1),
        catchError(this.handleError)
      );
  } */

  login(resource) {
    return this.http.post(this.url, resource)
    .pipe(retry(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadRequestError(error.json()));
    }

    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    return Observable.throw(new AppError(error))
  }
}
