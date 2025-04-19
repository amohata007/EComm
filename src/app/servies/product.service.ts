import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product_List } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<Product_List[] | []>();
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

  searchProducts(query: string) {
    return this._http.get<Product_List[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  addToCartItem(data: Product_List) {
    let cartData = [];
    let localCartData = localStorage.getItem('localCart');
    if (!localCartData) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localCartData);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeToCart(prodId: string) {
    let localCartData = localStorage.getItem('localCart');
    if (localCartData) {
      let items: Product_List[] = JSON.parse(localCartData);
      items = items.filter((item: Product_List) => prodId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
}
