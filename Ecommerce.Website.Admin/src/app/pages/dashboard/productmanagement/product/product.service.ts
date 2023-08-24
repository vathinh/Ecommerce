import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _apiProductEndpoint: string = `${environment.end_points.product_service}`;
  private _apiImageEndpoint: string = `${environment.end_points.image_service}`;
  private authorizeToken = localStorage.getItem('authorizeToken');

  constructor(private http: HttpClient) {}

  getProducts() {
    let url: string = `${this._apiProductEndpoint}`;

    return this.http.get(url).toPromise();
  }

  uploadImage(data: any) {
    let url: string = `${this._apiImageEndpoint}`;

    return this.http.post(url, data).toPromise();
  }

  createProduct(data: any) {
    let url: string = `${this._apiProductEndpoint}`;

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

  deleteProduct(id: any) {
    let url: string = `${this._apiProductEndpoint}/${id}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${this.authorizeToken}`,
      }),
    };

    return this.http.delete(url, options);
  }

  getProduct(slug: any) {
    let url: string = `${this._apiProductEndpoint}/${slug}`;

    return this.http.get(url).toPromise();
  }

  updateProduct(data: any, slug: any) {
    let url: string = `${this._apiProductEndpoint}/${slug}`;

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
}
