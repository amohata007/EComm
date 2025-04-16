import { Component, OnInit } from '@angular/core';
import { ProductService } from '../servies/product.service';
import { Product_List } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  public product_list: undefined | Product_List[];
  constructor(private _service: ProductService) {}

  ngOnInit(): void {
    this._service.getProduct().subscribe((res) => {
      console.log(res);
      this.product_list = res;
    });
  }
}
