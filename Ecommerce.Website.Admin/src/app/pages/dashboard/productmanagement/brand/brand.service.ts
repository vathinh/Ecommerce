import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private _apiBrandEndpoint: string = `${environment.end_points.brand_service}`;
  private authorizeToken = localStorage.getItem('authorizeToken');

  constructor(private http: HttpClient) {}

  getBrands() {
    let url: string = `${this._apiBrandEndpoint}`;

    return this.http.get(url).toPromise();
  }

  createBrand(data: any) {
    let url: string = `${this._apiBrandEndpoint}`;

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

  delete(id: any) {
    let url: string = `${this._apiBrandEndpoint}/${id}`;

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
