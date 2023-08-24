import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _apiOrderEndpoint: string = `${environment.end_points.order_service}`;
  private authorizeToken = localStorage.getItem('authorizeToken');

  constructor(private http: HttpClient) {}

  getOrders() {
    let url: string = `${this._apiOrderEndpoint}`;

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

  getOrder(id: any) {
    let url: string = `${this._apiOrderEndpoint}/${id}`;

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

  updateProduct(data: any) {
    let url: string = `${this._apiOrderEndpoint}/${data.id}`;

    delete data.id;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${this.authorizeToken}`,
      }),
    };

    return this.http.put(url, data, options).toPromise();
  }

  createBrand(data: any) {
    let url: string = `${this._apiOrderEndpoint}`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${this.authorizeToken}`,
      }),
    };

    return this.http.post(url, data, options).toPromise();
  }
}
