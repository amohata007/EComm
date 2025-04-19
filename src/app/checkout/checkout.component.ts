import { Component, OnInit } from '@angular/core';
import { ProductService } from '../servies/product.service';
import { Cart_Data, Order_Data } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  orderList: Cart_Data[] = [];
  cartData: Cart_Data[] = [];
  tax = 30;
  delivery = 20;
  discount = 5000;
  msg: string = '';

  constructor(private _service: ProductService, private _router: Router) {}

  ngOnInit(): void {
    this._service.currentCart().subscribe((res) => {
      this.cartData = res;
      this.orderList = res;
      console.log('Order', this.orderList);
    });
  }

  getTotal(): number {
    return this.orderList.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
  }

  getGrandTotal(): number {
    return this.getTotal() + this.tax + this.delivery - this.discount;
  }

  orderNow(data: Order_Data) {
    let fetchUserId = localStorage.getItem('user');
    let userId = fetchUserId && JSON.parse(fetchUserId)[0].id;

    if (this.getGrandTotal()) {
      let orderData = { ...data, price: this.getGrandTotal(), userId: userId };

      this.cartData.forEach((item) => {
        setTimeout(() => {
          this._service.deleteCartItems(item.id);
        }, 500);
      });

      this._service.addOrder(orderData).subscribe((res) => {
        if (res) {
          this.msg = 'Your order has been successfully placed..!!';

          setTimeout(() => {
            this._router.navigate(['my-orders']);
            this.msg = '';
          }, 3000);
        }
      });
    }
  }
}
