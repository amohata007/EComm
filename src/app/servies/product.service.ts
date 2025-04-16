import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product_List } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  addProduct(data: Product_List) {
    return this._http.post('http://localhost:3000/products', data);
  }

  getProduct() {
    return this._http.get<Product_List[]>('http://localhost:3000/products');
  }
}
