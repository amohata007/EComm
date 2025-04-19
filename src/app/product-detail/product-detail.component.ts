import { Component, OnInit } from '@angular/core';
import { ProductService } from '../servies/product.service';
import { ActivatedRoute } from '@angular/router';
import { Cart_Data, Product_List } from '../data-type';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productData: undefined | Product_List;
  removeCart = false;
  cartData: Product_List | undefined;
  constructor(
    private _service: ProductService,
    private _activate: ActivatedRoute
  ) {}

  quantity: number = 1;

  incrementQty() {
    if (this.quantity < 9) this.quantity++;
  }

  decrementQty() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.quantity;

      if (!localStorage.getItem('user')) {
        this._service.addToCartItem(this.productData);
        this.removeCart = true;
      } else {
        let fetchUserId = localStorage.getItem('user');
        let userId = fetchUserId && JSON.parse(fetchUserId)[0].id;
        console.log('Userid', userId, fetchUserId);
        let cartData: Cart_Data = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        this._service.addToCart(cartData).subscribe((res) => {
          if (res) {
            this._service.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeToCart(prodId: string) {
    if (!localStorage.getItem('user')) {
      this._service.removeToCart(prodId);
    } else {
      let fetchUserId = localStorage.getItem('user');
      let userId = fetchUserId && JSON.parse(fetchUserId)[0].id;
      this.cartData &&
        this._service.removeListToCart(this.cartData.id).subscribe((res) => {
          if (res) {
            this._service.getCartList(userId);
          }
        });
    }
    this.removeCart = false;
  }

  ngOnInit(): void {
    let productId = this._activate.snapshot.paramMap.get('productId');
    productId &&
      this._service.getProductList(productId).subscribe((res) => {
        this.productData = res;

        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter((item: Product_List) => productId == item.id);
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }

        let fetchUserId = localStorage.getItem('user');
        if (fetchUserId) {
          let userId = fetchUserId && JSON.parse(fetchUserId)[0].id;
          this._service.getCartList(userId);
          this._service.cartData.subscribe((res) => {
            let item = res.filter(
              (item: Product_List) => productId === item.productId
            );
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          });
        }
      });
  }
}
