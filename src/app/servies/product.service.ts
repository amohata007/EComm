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

  deleteProduct(id: string) {
    return this._http.delete(`http://localhost:3000/products/${id}`);
  }

  getProductList(id: string) {
    return this._http.get<Product_List>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(data: Product_List) {
    return this._http.put<Product_List>(
      `http://localhost:3000/products/${data.id}`,
      data
    );
  }

  popularProduct() {
    return this._http.get<Product_List[]>(
      'http://localhost:3000/products?_limit=3'
    );
  }

  trendyProducts() {
    return this._http.get<Product_List[]>(
      'http://localhost:3000/products?_limit=5'
    );
  }
}
