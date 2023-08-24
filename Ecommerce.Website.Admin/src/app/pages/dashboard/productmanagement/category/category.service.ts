import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _apiCategoryEndpoint: string = `${environment.end_points.category_service}`;
  private authorizeToken = localStorage.getItem('authorizeToken');

  constructor(private http: HttpClient) {}

  getCategories() {
    let url: string = `${this._apiCategoryEndpoint}`;

    return this.http.get(url).toPromise();
  }

  getCategory(id: any) {
    let url: string = `${this._apiCategoryEndpoint}/${id}`;

    return this.http.get(url).toPromise();
  }

  deleteCategory(id: any) {
    let url: string = `${this._apiCategoryEndpoint}/${id}`;

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

  createCategory(data: any) {
    let url: string = `${this._apiCategoryEndpoint}`;

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

  updateCategory(data: any, id: any) {
    let url: string = `${this._apiCategoryEndpoint}/${id}`;

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
