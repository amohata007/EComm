import { Component, OnInit } from '@angular/core';
import { ProductService } from '../servies/product.service';
import { Cart_Data } from '../data-type';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartDataList: Cart_Data[] = [];
  tax = 30;
  delivery = 20;
  discount = 5000;

  constructor(private _service: ProductService) {}

  ngOnInit(): void {
    this._service.currentCart().subscribe((res) => {
      console.log('Items,', res);
      this.cartDataList = res;
      console.log(this.cartDataList, 'dataa');
    });
  }

  getTotal(): number {
    return this.cartDataList.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
  }

  getGrandTotal(): number {
    return this.getTotal() + this.tax + this.delivery - this.discount;
  }

  getTextColor(bgColor: string): string {
    return bgColor.toLowerCase() === 'black' ? 'white' : 'black';
  }

  onQuantityChange(item: any) {
    if (item.quantity < 1) {
      item.quantity = 1;
    } else if (item.quantity > 9) {
      item.quantity = 9;
    }
  }
}
