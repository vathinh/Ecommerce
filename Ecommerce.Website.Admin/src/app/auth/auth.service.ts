import { UserAccountInfo } from '../models/users/user-account-info.model';
import { UserAccount } from '../models/users/user-account.model';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiAuthEndpoint: string = `${environment.end_points.auth_service}`;
  private _apiUserEndpoint: string = `${environment.end_points.user_service}`;

  constructor(private http: HttpClient) {}

  signIn(userAccount: UserAccount) {
    let url: string = `${this._apiAuthEndpoint}/signin`;

    return this.http.post(url, userAccount).toPromise();
  }

  signUp(userAccountInfo: UserAccountInfo) {
    let url: string = `${this._apiAuthEndpoint}/signup`;

    return this.http.post(url, userAccountInfo).toPromise();
  }

  getUserInfo(id: string | null) {
    let url: string = `${this._apiUserEndpoint}/${id}`;

    let authorizeToken = localStorage.getItem('authorizeToken');

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${authorizeToken}`,
      }),
    };

    return this.http.get(url, options).toPromise();
  }
}
