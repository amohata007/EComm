import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart_Data, Order_Data, Product_List } from '../data-type';

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
      this.cartData.emit([data]);
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

  addToCart(cartData: Cart_Data) {
    return this._http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number) {
    return this._http
      .get<Product_List[]>('http://localhost:3000/cart?userId=' + userId)
      .subscribe((res) => {
        this.cartData.emit(res);
        console.warn(res, 'cartData');
      });
  }

  removeListToCart(cartId: string) {
    return this._http.delete('http://localhost:3000/cart/' + cartId);
  }

  currentCart() {
    let fetchUserId = localStorage.getItem('user');
    let userId = fetchUserId && JSON.parse(fetchUserId)[0].id;
    return this._http.get<Cart_Data[]>(
      'http://localhost:3000/cart/?userId=' + userId
    );
  }

  addOrder(data: Order_Data) {
    return this._http.post('http://localhost:3000/orders/', data);
  }

  orderList() {
    let fetchUserId = localStorage.getItem('user');
    let userId = fetchUserId && JSON.parse(fetchUserId)[0].id;
    return this._http.get<Order_Data[]>(
      'http://localhost:3000/orders/?userId=' + userId
    );
  }

  deleteCartItems(cartId: number) {
    return this._http
      .delete('http://localhost:3000/cart/' + cartId)
      .subscribe((res) => {
        if (res) {
          this.cartData.emit([]);
        }
      });
  }

  deleteOrder(orderId: number) {
    return this._http.delete('http://localhost:3000/orders/' + orderId);
  }
}
