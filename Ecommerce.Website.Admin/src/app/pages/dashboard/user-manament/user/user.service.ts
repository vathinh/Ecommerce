import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _apiUserEndpoint: string = `${environment.end_points.user_service}`;
  private _apiAuthEndpoint: string = `${environment.end_points.auth_service}`;
  private authorizeToken = localStorage.getItem('authorizeToken');

  constructor(private http: HttpClient) {}

  getUsers() {
    let url: string = `${this._apiUserEndpoint}`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${this.authorizeToken}`,
      }),
    };
    return this.http.get(url, options).toPromise();
  }

  getUser(id: any) {
    let url: string = `${this._apiUserEndpoint}/${id}`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${this.authorizeToken}`,
      }),
    };
    return this.http.get(url, options).toPromise();
  }

  createUser(data: any) {
    let url: string = `${this._apiAuthEndpoint}/signup`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${this.authorizeToken}`,
      }),
    };

    return this.http.post(url, data).toPromise();
  }

  deleteUser(id: any) {
    let url: string = `${this._apiUserEndpoint}/${id}`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${this.authorizeToken}`,
      }),
    };

    return this.http.delete(url, options).toPromise();
  }
}
