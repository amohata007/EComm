import { Component, OnInit } from '@angular/core';
import { ProductService } from '../servies/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product_List } from '../data-type';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productData: undefined | Product_List;
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
        console.log(this.productData, 'Data');
      }
    }
  }

  ngOnInit(): void {
    let productId = this._activate.snapshot.paramMap.get('productId');
    productId &&
      this._service.getProductList(productId).subscribe((res) => {
        this.productData = res;
      });
  }
}
