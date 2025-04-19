import { Component, OnInit } from '@angular/core';
import { ProductService } from '../servies/product.service';
import { Order_Data } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orderData: Order_Data[] = [];

  constructor(private _service: ProductService) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined) {
    orderId &&
      this._service.deleteOrder(orderId).subscribe((res) => {
        this.getOrderList();
      });
  }

  getOrderList() {
    this._service.orderList().subscribe((res) => {
      this.orderData = res;
    });
  }
}
